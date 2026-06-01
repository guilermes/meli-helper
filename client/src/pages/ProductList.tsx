// src/pages/Anuncios.tsx
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Title, Text, SimpleGrid, Space, Loader, Center,
  Paper, Button, Group, Stack, TextInput,
} from '@mantine/core';
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
  const [busca, setBusca] = useState('');

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

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await api.get('/anuncios', {
          withCredentials: true,
        });

        let lista: Product[] = [];
        if (Array.isArray(response.data)) {
          lista = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          lista = response.data.data;
        } else if (response.data && Array.isArray(response.data.anuncios)) {
          lista = response.data.anuncios;
        }

        setProdutos(lista);

        if (lista.length > 0) {
          const ruins = lista.filter((p) => (p.margemPorcentagem ?? 0) < 15).length;
          const lucroMedio = lista.reduce((acc, p) => acc + (p.lucro ?? 0), 0) / lista.length;
          const margemMedia = lista.reduce((acc, p) => acc + (p.margemPorcentagem ?? 0), 0) / lista.length;
          const melhorLucro = Math.max(...lista.map((p) => p.lucro ?? 0));

          setResumo({ total: lista.length, ruins, lucroMedio, margemMedia, melhorLucro });
        }
      } catch (err: any) {
        console.error('Erro ao carregar anúncios:', err);
        setErro('Não foi possível carregar os anúncios.');
      } finally {
        setLoading(false);
      }
    };

    buscarProdutos();
  }, []);

  // 🔍 Filtro por ID do Mercado Livre (client-side)
  const produtosFiltrados = useMemo(() => {
    if (!busca.trim()) return produtos;
    const termo = busca.trim().toLowerCase();
    return produtos.filter((p) =>
      (p.idMercadoLivre ?? '').toLowerCase().includes(termo)
    );
  }, [produtos, busca]);

  if (loading) {
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

        {produtos.length === 0 ? (
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
            {/* ── CARDS DE RESUMO ── */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} gap="md">
              <MetricCard
                title="Total de Anúncios"
                value={resumo.total}
                description="Anúncios cadastrados"
              />
              <MetricCard
                title="Anúncios Ruins"
                value={resumo.ruins}
                description="Margem abaixo de 15%"
                isAlert={resumo.ruins > 0}
              />
              <MetricCard
                title="Lucro Médio"
                value={`R$ ${resumo.lucroMedio.toFixed(2)}`}
                description="Média de lucro por anúncio"
                isAlert={resumo.lucroMedio < 0}
              />
              <MetricCard
                title="Margem Média"
                value={`${resumo.margemMedia.toFixed(1)}%`}
                description="Margem líquida média"
                isAlert={resumo.margemMedia < 15}
              />
              <MetricCard
                title="Melhor Lucro"
                value={`R$ ${resumo.melhorLucro.toFixed(2)}`}
                description="Produto mais lucrativo"
              />
            </SimpleGrid>

            <Space h="xl" />

            {/* ── BUSCA ── */}
            <TextInput
              placeholder="Pesquisar por ID do Mercado Livre..."
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
                {produtosFiltrados.length === 0
                  ? 'Nenhum anúncio encontrado para esse ID.'
                  : `${produtosFiltrados.length} anúncio(s) encontrado(s)`}
              </Text>
            )}

            {/* ── TABELA ── */}
            {produtosFiltrados.length > 0 ? (
              <ProductTable
                prod={produtosFiltrados}
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
            ) : (
              busca.trim() && (
                <Center style={{ height: '20vh' }}>
                  <Text c="dimmed">Nenhum anúncio encontrado para "{busca}".</Text>
                </Center>
              )
            )}
          </>
        )}
      </Container>
    </div>
  );
}