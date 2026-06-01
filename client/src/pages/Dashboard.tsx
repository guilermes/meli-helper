// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, SimpleGrid, Space, Loader, Center, Text, Paper, Button, Stack, Group } from '@mantine/core';
import api from '../services/api';
import { RankingCard } from '../components/RankingCard';
import { InsightCard } from '../components/InsightCard';
import { MetricCard } from '../components/MetricCard';
import ProductTable, { Product } from '../components/ProductTable';
import classes from './Dashboard.module.css';

interface MetricasDashboard {
  margemMedia: number;
  cubagemGeral: number;
  anunciosCriticos: number;
  ticketMedio: number;
  produtoMaisPesado: { nome: string; peso: number } | null;
  melhorMargem: { nome: string; margem: number } | null;
  rankingMargem: { nome: string; margem: number }[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [metricas, setMetricas] = useState<MetricasDashboard>({
    margemMedia: 0,
    cubagemGeral: 0,
    anunciosCriticos: 0,
    ticketMedio: 0,
    produtoMaisPesado: null,
    melhorMargem: null,
    rankingMargem: [],
  });

  const handleProductUpdated = (updatedProduct: Product) => {
    setProdutos((prevProducts) =>
      prevProducts.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );
  };

  const handleExcluirProduto = (id: string) => {
    console.log('Disparar modal de exclusão para o ID:', id);
  };

  useEffect(() => {
    const buscarEProcessarDados = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/anuncios', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let listaProdutos: Product[] = [];
        if (Array.isArray(response.data)) {
          listaProdutos = response.data;
        } else if (response.data && Array.isArray(response.data.anuncios)) {
          listaProdutos = response.data.anuncios;
        } else if (response.data && Array.isArray(response.data.data)) {
          listaProdutos = response.data.data;
        }

        setProdutos(listaProdutos);

        if (listaProdutos?.length > 0) {
          const cubagemTotal = listaProdutos.reduce((acc, prod) => {
            const volumeItem = (prod.largura * prod.altura * prod.comprimento) / 1000000;
            return acc + volumeItem;
          }, 0);

          const criticos = listaProdutos.filter((prod) => (prod.margemPorcentagem ?? 0) < 15).length;

          const somaMargens = listaProdutos.reduce((acc, prod) => acc + (prod.margemPorcentagem ?? 0), 0);
          const mediaMargem = somaMargens / listaProdutos.length;

          // ✅ CORREÇÃO: trocado prod.preco por prod.precoVenda
          const ticketMedio = listaProdutos.reduce((acc, prod) => acc + prod.precoVenda, 0) / listaProdutos.length;

          const produtoMaisPesado = listaProdutos.reduce<{ nome: string; peso: number } | null>(
            (maisPesado, prod) =>
              !maisPesado || prod.peso > maisPesado.peso
                ? { nome: prod.nome, peso: prod.peso }
                : maisPesado,
            null
          );

          const melhorMargem = listaProdutos.reduce<{ nome: string; margem: number } | null>(
            (melhor, prod) =>
              !melhor || (prod.margemPorcentagem ?? 0) > melhor.margem
                ? { nome: prod.nome, margem: prod.margemPorcentagem ?? 0 }
                : melhor,
            null
          );

          const rankingMargem = [...listaProdutos]
            .sort((a, b) => (b.margemPorcentagem ?? 0) - (a.margemPorcentagem ?? 0))
            .slice(0, 5)
            .map((prod) => ({ nome: prod.nome, margem: prod.margemPorcentagem ?? 0 }));

          setMetricas({
            margemMedia: mediaMargem,
            cubagemGeral: cubagemTotal,
            anunciosCriticos: criticos,
            ticketMedio,
            produtoMaisPesado,
            melhorMargem,
            rankingMargem,
          });
        }

      } catch (err: any) {
        console.error('Erro ao carregar dados da dashboard:', err);
        setErro('Não foi possível carregar os dados do painel.');
      } finally {
        setLoading(false);
      }
    };

    buscarEProcessarDados();
  }, [navigate]);

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

        <Group justify="space-between" align="flex-start" wrap="wrap" mb="xl">
          <Stack gap={4}>
            <Title order={1} className={classes.pageTitle}>
              Painel de Controle
            </Title>
            <Text className={classes.pageSubtitle} size="sm">
              Visão geral da cubagem e lucratividade da sua conta do Mercado Livre.
            </Text>
          </Stack>
          <Group gap="sm">
            <Button
              variant="light"
              color="gray"
              onClick={() => navigate('/config')}
            >
              Configurações
            </Button>
            {produtos?.length > 0 && (
              <Button
                className={classes.btnCriarAnuncio}
                onClick={() => navigate('/anuncios/novo')}
              >
                Novo Anúncio
              </Button>
            )}
          </Group>
        </Group>

        {produtos?.length === 0 ? (
          <Paper withBorder p="xl" radius="md" className={classes.emptyStateCard} mt="xl">
            <Stack align="center" gap="md">
              <Text className={classes.emptyStateTitle}>Nenhum anúncio encontrado</Text>
              <Text className={classes.emptyStateText} size="sm" ta="center">
                Sua conta ainda não possui anúncios cadastrados no sistema. Comece a publicar seus
                produtos para monitorar os custos de frete, cubagem e margens de lucro em tempo real!
              </Text>
              <Button
                size="md"
                className={classes.btnCriarAnuncio}
                onClick={() => navigate('/anuncios/novo')}
              >
                Criar Meu Primeiro Anúncio
              </Button>
            </Stack>
          </Paper>
        ) : (
          <>
            <SimpleGrid cols={{ base: 1, sm: 3 }} gap="md">
              <MetricCard
                title="Margem Média Geral"
                value={`${metricas.margemMedia.toFixed(1)}%`}
                description="Lucro líquido médio estimado"
              />
              <MetricCard
                title="Cubagem Total Alocada"
                value={`${metricas.cubagemGeral.toFixed(2)} m³`}
                description="Volume total de estoque em metros cúbicos"
              />
              <MetricCard
                title="Anúncios Críticos"
                value={metricas.anunciosCriticos}
                description="Produtos com margem abaixo de 15%"
                isAlert={metricas.anunciosCriticos > 0}
              />
            </SimpleGrid>

            <Space h="xl" />
            <Space h="md" />

            <Title order={2} className={classes.sectionTitle}>
              Análise de Cubagem por Anúncio
            </Title>

            {!erro && produtos?.length > 0 ? (
              <ProductTable
                prod={produtos}
                onRefresh={setProdutos}
                onProductUpdated={handleProductUpdated}
                onProductDelete={handleExcluirProduto}
              />
            ) : (
              <Center style={{ height: '20vh', flexDirection: 'column' }}>
                <Text c="dimmed" mb="sm">Nenhum anúncio encontrado no banco de dados.</Text>
              </Center>
            )}

            <Space h="xl" />

            <SimpleGrid cols={{ base: 1, sm: 2 }} gap="md">
              <RankingCard ranking={metricas.rankingMargem} />
              <InsightCard
                ticketMedio={metricas.ticketMedio}
                produtoMaisPesado={metricas.produtoMaisPesado}
                melhorMargem={metricas.melhorMargem}
              />
            </SimpleGrid>
          </>
        )}
      </Container>
    </div>
  );
}