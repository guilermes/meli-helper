// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, SimpleGrid, Space, Loader, Center, Text, Paper, Button, Stack, Group } from '@mantine/core';
import api from '../services/api';

// 🌟 IMPORTAÇÕES AJUSTADAS: Apontando para as pastas corretas conforme seus arquivos
import { MetricCard } from '../components/MetricCard';
import ProductTable, { Product } from '../components/ProductTable';
import classes from './Dashboard.module.css';

interface MetricasDashboard {
  margemMedia: number;
  cubagemGeral: number;
  anunciosCriticos: number;
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
  });

  // Funções de Handler para a tabela (stubs para evitar erros e permitir expansão futura)
  const handleProductUpdated = (updatedProduct: Product) => {
    setProdutos((prevProducts) =>
      prevProducts.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );
  };

  const handleExcluirProduto = (id: string) => {
    console.log('Disparar modal de exclusão para o ID:', id);
    // Aqui no futuro você pode colocar o api.delete ou um modal do Mantine
  };

  useEffect(() => {
    const buscarEProcessarDados = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/anuncios', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Validação defensiva do retorno da API
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
          // Cálculo da cubagem total em m³
          const cubagemTotal = listaProdutos.reduce((acc, prod) => {
            const volumeItem = (prod.largura * prod.altura * prod.comprimento) / 1000000;
            return acc + volumeItem;
          }, 0);

          // Filtro de anúncios com margem crítica (< 15%)
          const criticos = listaProdutos.filter((prod) => prod.margemPorcentagem < 15).length;

          // Cálculo da média aritmética das margens
          const somaMargens = listaProdutos.reduce((acc, prod) => acc + prod.margemPorcentagem, 0);
          const mediaMargem = somaMargens / listaProdutos.length;

          setMetricas({
            margemMedia: mediaMargem,
            cubagemGeral: cubagemTotal,
            anunciosCriticos: criticos,
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

        {/* Cabeçalho superior com botão dinâmico */}
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

            {/* ⚙️ BOTÃO DE CONFIGURAÇÃO (O que estamos adicionando) */}
            <Button
              variant="light"
              color="gray"
              onClick={() => navigate('/config')} // 👈 Troque pelo caminho exato da sua rota de configuração
            >
              Configurações
            </Button>
            {produtos?.length > 0 && (
              <Button
                className={classes.btnCriarAnuncio}
                onClick={() => navigate('/anuncios/novo')}
              >
                Novo Anuncio
              </Button>
            )}
          </Group>
        </Group>

        {produtos?.length === 0 ? (
          /* Estado Vazio (Sem anúncios cadastrados) */
          <Paper withBorder p="xl" radius="md" className={classes.emptyStateCard} mt="xl">
            <Stack align="center" gap="md">
              <Text className={classes.emptyStateTitle}>Nenhum anúncio encontrado</Text>
              <Text className={classes.emptyStateText} size="sm" ta="center">
                Sua conta ainda não possui anúncios cadastrados no sistema. Comece a publicar seus produtos para monitorar os custos de frete, cubagem e margens de lucro em tempo real!
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
          /* Estado Populado (Exibe os novos MetricCards e a ProductTable) */
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
                isAlert={metricas.anunciosCriticos > 0} // Acende o card em vermelho se houver algum crítico
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
          </>
        )}
      </Container>
    </div>
  );
}