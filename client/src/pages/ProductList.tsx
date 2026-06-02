import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Title, Text, SimpleGrid, Space, Loader, Center,
  Paper, Button, Group, Stack, TextInput, Pagination,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks'; // 💎 Hook essencial para busca server-side
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

  // ── ESTADOS DE PAGINAÇÃO E BUSCA ──
  const [busca, setBusca] = useState('');
  const [buscaDebounced] = useDebouncedValue(busca, 400); // Aguarda 400ms após digitar para buscar
  const [paginaAtiva, setPaginaAtiva] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);

  const [resumo, setResumo] = useState<ResumoAnuncios>({
    total: 0,
    ruins: 0,
    lucroMedio: 0,
    margemMedia: 0,
    melhorLucro: 0,
  });

  const handleProductUpdated = (updatedProduct: Product) => {
    setProdutos((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );
  };

  const handleExcluirProduto = (id: string) => {
    setProdutos((prev) => prev.filter((item) => item.id !== id));
  };

  // 💎 Reseta para a primeira página sempre que o usuário iniciar uma nova busca
  useEffect(() => {
    setPaginaAtiva(1);
  }, [buscaDebounced]);

  // 💎 Effect principal: dispara quando a página muda OU quando a busca consolidada muda
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        setLoading(true);

        // Envia os parâmetros exatos que o seu anuncioController.js espera
        const response = await api.get('/anuncios', {
          withCredentials: true,
          params: {
            page: paginaAtiva,
            limit: 10,
            search: buscaDebounced
          }
        });

        // Mapeia a estrutura vinda do res.json({ data: ..., pagination: ... })
        const lista: Product[] = response.data?.data || [];
        const paginacao = response.data?.pagination;

        setProdutos(lista);
        if (paginacao) {
          setTotalPaginas(paginacao.totalPages || 1);
        }

        // 📊 Cálculos do Resumo baseados na página/busca atual
        if (lista.length > 0) {
          const ruins = lista.filter((p) => (p.margemPorcentagem ?? 0) < 15).length;
          const lucroMedio = lista.reduce((acc, p) => acc + (p.lucro ?? 0), 0) / lista.length;
          const margemMedia = lista.reduce((acc, p) => acc + (p.margemPorcentagem ?? 0), 0) / lista.length;
          const melhorLucro = Math.max(...lista.map((p) => p.lucro ?? 0));

          setResumo({
            total: paginacao ? paginacao.total : lista.length, // Total absoluto do banco
            ruins,
            lucroMedio,
            margemMedia,
            melhorLucro
          });
        } else {
          setResumo({
            total: paginacao ? paginacao.total : 0,
            ruins: 0,
            lucroMedio: 0,
            margemMedia: 0,
            melhorLucro: 0
          });
        }
      } catch (err: any) {
        console.error('Erro ao carregar anúncios:', err);
        setErro('Não foi possível carregar os anúncios.');
      } finally {
        setLoading(false);
      }
    };

    buscarProdutos();
  }, [paginaAtiva, buscaDebounced]); // Re-executa ao mudar de página ou digitação consolidada

  if (loading && produtos.length === 0) {
    return (
      <div className={classes.loadingContainer}>
        <Loader color="red" size="xl" type="bars" />
      </div>
    );
  }

  if (erro) {
    return (
      <div className={classes.pageWrapper}>
        <Center>
          <Paper p="md" withBorder className={classes.errorCard}>
            <Text fw={500}>{erro}</Text>
          </Paper>
        </Center>
      </div>
    );
  }

  return (
    <div className={classes.pageWrapper}>
      <Container size="lg" pt="xl">

        {/* ── CABEÇALHO ── */}
        <Group justify="space-between" align="flex-start" wrap="wrap" mb="xl">
          <Stack gap={4}>
            <Title order={1} className={classes.pageTitle}>Meus Anúncios</Title>
            <Text size="sm" className={classes.pageSubtitle}>
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

        {/* 💡 Mudamos para verificar o total absoluto vindo do resumo da paginação */}
        {resumo.total === 0 && !busca.trim() ? (
          <Paper withBorder p="xl" radius="md" className={classes.emptyStateCard} mt="xl">
            <Stack align="center" gap="md">
              <Text className={classes.emptyStateTitle}>Nenhum anúncio cadastrado</Text>
              <Text size="sm" ta="center" className={classes.emptyStateText}>
                Você ainda não tem anúncios. Comece cadastrando seu primeiro produto!
              </Text>
              <Button className={classes.btnNovo} onClick={() => navigate('/anuncios/novo')}>
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
                pointerEvents: loading ? 'none' : 'all' // Impede cliques duplos enquanto carrega
              }}
            >
              {/* ── CARDS DE RESUMO ── */}
              <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} gap="md">
                <MetricCard
                  title="Total de Anúncios"
                  value={resumo.total}
                  description="Total na base de dados"
                />
                <MetricCard
                  title="Anúncios Ruins"
                  value={resumo.ruins}
                  description="Margem < 15% na página"
                  isAlert={resumo.ruins > 0}
                />
                <MetricCard
                  title="Lucro Médio"
                  value={`R$ ${resumo.lucroMedio.toFixed(2)}`}
                  description="Média da página atual"
                  isAlert={resumo.lucroMedio < 0}
                />
                <MetricCard
                  title="Margem Média"
                  value={`${resumo.margemMedia.toFixed(1)}%`}
                  description="Média da página atual"
                  isAlert={resumo.margemMedia < 15}
                />
                <MetricCard
                  title="Melhor Lucro"
                  value={`R$ ${resumo.melhorLucro.toFixed(2)}`}
                  description="Melhor da página atual"
                />
              </SimpleGrid>

              <Space h="xl" />

              {/* ── BUSCA (Agora integrada ao Back-end) ── */}
              <TextInput
                placeholder="Pesquisar por Título, Marca ou ID do Mercado Livre..."
                value={busca}
                onChange={(e) => setBusca(e.currentTarget.value)}
                className={classes.searchInput}
                size="md"
                radius="md"
                leftSection={<span style={{ fontSize: 16 }}>🔍</span>}
              />

              <Space h="md" />

              {/* ── RESULTADO DA BUSCA ── */}
              {busca.trim() && (
                <Text size="sm" className={classes.searchResult} mb="sm">
                  {produtos.length === 0
                    ? 'Nenhum anúncio encontrado para os termos digitados.'
                    : `Exibindo resultados encontrados no sistema`}
                </Text>
              )}

              {/* ── TABELA ── */}
              {produtos.length > 0 ? (
                <Stack gap="md">
                  <ProductTable
                    prod={produtos} // Passa diretamente a lista vinda do back
                    onRefresh={(lista) => {
                      if (typeof lista === 'function') {
                        setProdutos(lista);
                      } else {
                        setProdutos(lista);
                      }
                    }}
                    onProductUpdated={handleProductUpdated}
                    onProductDelete={handleExcluirProduto}
                  />

                  {/* ── 💎 CONTROLADOR DE PAGINAÇÃO DO MANTINE V7 ── */}
                  {totalPaginas > 1 && (
                    <Group justify="center" mt="xl" pt="lg" pb="xl" style={{ borderTop: '1px solid #2c2e33' }}>
                      <Pagination
                        value={paginaAtiva}
                        onChange={setPaginaAtiva}
                        total={totalPaginas}
                        radius="md"
                        withEdges
                        /* 🔗 Vincula as sub-classes do CSS Module aos seletores internos do Mantine */
                        classNames={{
                          control: classes.paginationControl,
                          dots: classes.paginationDots,
                        }}
                      />
                    </Group>
                  )}
                </Stack>
              ) : (
                busca.trim() && (
                  <Center style={{ height: '20vh' }}>
                    <Text c="dimmed">Nenhum anúncio encontrado para "{busca}".</Text>
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