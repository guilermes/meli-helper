import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Space,
  Loader,
  Center,
  Paper,
  Button,
  Group,
  Stack,
  TextInput,
  Pagination,
} from '@mantine/core';

import { useDebouncedValue } from '@mantine/hooks';

import api from '../services/api';

import { MetricCard } from '../components/MetricCard';
import ProductTable, { Product } from '../components/ProductTable';

import classes from './ProductList.module.css';

interface ResumoAnuncios {
  total: number;
  ruins: number;
  lucroMedio: number;
  margemMedia: number;
  melhorLucro: number;
}

export default function Anuncios() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [produtos, setProdutos] = useState<Product[]>([]);

  // ─────────────────────────────
  // Busca + paginação
  // ─────────────────────────────

  const [busca, setBusca] = useState('');
  const [buscaDebounced] = useDebouncedValue(busca, 400);

  const [paginaAtiva, setPaginaAtiva] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [resumo, setResumo] = useState<ResumoAnuncios>({
    total: 0,
    ruins: 0,
    lucroMedio: 0,
    margemMedia: 0,
    melhorLucro: 0,
  });

  // ─────────────────────────────
  // Atualização local do produto
  // ─────────────────────────────

  const handleProductUpdated = (updatedProduct: Product) => {
    setProdutos((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      )
    );
  };

  // ─────────────────────────────
  // Função reutilizável de refresh
  // ─────────────────────────────

  const refreshProdutos = async () => {
    try {
      setLoading(true);

      const response = await api.get('/anuncios', {
        withCredentials: true,
        params: {
          page: paginaAtiva,
          limit: 10,
          search: buscaDebounced,
        },
      });

      const lista: Product[] = response.data?.data || [];
      const paginacao = response.data?.pagination;

      setProdutos(lista);

      if (paginacao) {
        setTotalPaginas(paginacao.totalPages || 1);
      }

      // ─────────────────────────────
      // Resumo estatístico
      // ─────────────────────────────

      if (lista.length > 0) {
        const ruins = lista.filter(
          (p) => (p.margemPorcentagem ?? 0) < 15
        ).length;

        const lucroMedio =
          lista.reduce((acc, p) => acc + (p.lucro ?? 0), 0) /
          lista.length;

        const margemMedia =
          lista.reduce(
            (acc, p) => acc + (p.margemPorcentagem ?? 0),
            0
          ) / lista.length;

        const melhorLucro = Math.max(
          ...lista.map((p) => p.lucro ?? 0)
        );

        setResumo({
          total: paginacao ? paginacao.total : lista.length,
          ruins,
          lucroMedio,
          margemMedia,
          melhorLucro,
        });
      } else {
        setResumo({
          total: paginacao ? paginacao.total : 0,
          ruins: 0,
          lucroMedio: 0,
          margemMedia: 0,
          melhorLucro: 0,
        });
      }
    } catch (err) {
      console.error('Erro ao carregar anúncios:', err);

      setErro('Não foi possível carregar os anúncios.');
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────
  // Reset paginação ao pesquisar
  // ─────────────────────────────

  useEffect(() => {
    setPaginaAtiva(1);
  }, [buscaDebounced]);

  // ─────────────────────────────
  // Atualiza ao trocar página/busca
  // ─────────────────────────────

  useEffect(() => {
    refreshProdutos();
  }, [paginaAtiva, buscaDebounced]);

  // ─────────────────────────────
  // Loading inicial
  // ─────────────────────────────

  if (loading && produtos.length === 0) {
    return (
      <div className={classes.loadingContainer}>
        <Loader color="brandBlue" size="xl" />
      </div>
    );
  }

  // ─────────────────────────────
  // Estado de erro
  // ─────────────────────────────

  if (erro) {
    return (
      <div className={classes.pageWrapper}>
        <Center>
          <Paper
            p="md"
            withBorder
            className={classes.errorCard}
          >
            <Text fw={500}>{erro}</Text>
          </Paper>
        </Center>
      </div>
    );
  }

  return (
    <div className={classes.pageWrapper}>
      <Container size="lg" pt="xl">

        {/* ───────────────────────────── */}
        {/* Header */}
        {/* ───────────────────────────── */}

        <Group
          justify="space-between"
          align="flex-start"
          wrap="wrap"
          mb="xl"
        >
          <Stack gap={4}>
            <Title
              order={1}
              className={classes.pageTitle}
            >
              Meus Anúncios
            </Title>

            <Text
              size="sm"
              className={classes.pageSubtitle}
            >
              Gerencie, pesquise e acompanhe todos os seus anúncios.
            </Text>
          </Stack>

          <Button
            className={classes.btnNovo}
            onClick={() => navigate('/anuncios/novo')}
          >
            + Novo Anúncio
          </Button>
        </Group>

        {/* ───────────────────────────── */}
        {/* Estado vazio */}
        {/* ───────────────────────────── */}

        {resumo.total === 0 && !busca.trim() ? (
          <Paper
            withBorder
            p="xl"
            radius="md"
            className={classes.emptyStateCard}
            mt="xl"
          >
            <Stack align="center" gap="md">
              <Text className={classes.emptyStateTitle}>
                Nenhum anúncio cadastrado
              </Text>

              <Text
                size="sm"
                ta="center"
                className={classes.emptyStateText}
              >
                Você ainda não tem anúncios.
                Comece cadastrando seu primeiro produto!
              </Text>

              <Button
                className={classes.btnNovo}
                onClick={() => navigate('/anuncios/novo')}
              >
                Criar Meu Primeiro Anúncio
              </Button>
            </Stack>
          </Paper>
        ) : (
          <>
            <div
              style={{
                opacity: loading ? 0.6 : 1,
                transition: 'opacity 0.2s ease',
                pointerEvents: loading ? 'none' : undefined,
              }}
            >
              {/* ───────────────────────────── */}
              {/* Cards */}
              {/* ───────────────────────────── */}

              <SimpleGrid
                cols={{ base: 1, sm: 2, md: 5 }}
                spacing="md"
              >
                <MetricCard
                  title="Total de Anúncios"
                  value={resumo.total}
                  description="Total na base de dados"
                />

                <MetricCard
                  title="Anúncios Ruins"
                  value={resumo.ruins}
                  description="Margem < 15%"
                  isAlert={resumo.ruins > 0}
                />

                <MetricCard
                  title="Lucro Médio"
                  value={`R$ ${resumo.lucroMedio.toFixed(2)}`}
                  description="Média da página"
                  isAlert={resumo.lucroMedio < 0}
                />

                <MetricCard
                  title="Margem Média"
                  value={`${resumo.margemMedia.toFixed(1)}%`}
                  description="Média da página"
                  isAlert={resumo.margemMedia < 15}
                />

                <MetricCard
                  title="Melhor Lucro"
                  value={`R$ ${resumo.melhorLucro.toFixed(2)}`}
                  description="Melhor resultado"
                />
              </SimpleGrid>

              <Space h="xl" />

              {/* ───────────────────────────── */}
              {/* Busca */}
              {/* ───────────────────────────── */}

              <TextInput
                placeholder="Pesquisar anúncios..."
                value={busca}
                onChange={(e) =>
                  setBusca(e.currentTarget.value)
                }
                className={classes.searchInput}
                size="md"
                radius="md"
                leftSection={
                  <span style={{ fontSize: 16 }}>
                    🔍
                  </span>
                }
              />

              <Space h="md" />

              {/* ───────────────────────────── */}
              {/* Resultado */}
              {/* ───────────────────────────── */}

              {busca.trim() && (
                <Text
                  size="sm"
                  className={classes.searchResult}
                  mb="sm"
                >
                  {produtos.length === 0
                    ? 'Nenhum anúncio encontrado.'
                    : 'Resultados encontrados no sistema'}
                </Text>
              )}

              {/* ───────────────────────────── */}
              {/* Tabela */}
              {/* ───────────────────────────── */}

              {produtos.length > 0 ? (
                <Stack gap="md">

                  <ProductTable
                    prod={produtos}
                    onRefresh={refreshProdutos}
                    onProductUpdated={handleProductUpdated}
                  />

                  {totalPaginas > 1 && (
                    <Group
                      justify="center"
                      mt="xl"
                      pt="lg"
                      pb="xl"
                      style={{
                        borderTop:
                          '1px solid var(--mantine-color-dark-4)',
                      }}
                    >
                      <Pagination
                        value={paginaAtiva}
                        onChange={setPaginaAtiva}
                        total={totalPaginas}
                        radius="md"
                        withEdges
                        classNames={{
                          control:
                            classes.paginationControl,
                          dots:
                            classes.paginationDots,
                        }}
                      />
                    </Group>
                  )}
                </Stack>
              ) : (
                busca.trim() && (
                  <Center style={{ height: '20vh' }}>
                    <Text c="dimmed">
                      Nenhum anúncio encontrado para "{busca}".
                    </Text>
                  </Center>
                )
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
```
