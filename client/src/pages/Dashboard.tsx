// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Space, Loader, Center, Text, Paper } from '@mantine/core';
import api from '../services/api';
import { MetricCard } from '../components/MetricCard';
import ProductTable from '../components/ProductTable';


interface DashboardResponse {
  metricas: {
    margemMedia: number;
    cubagemGeral: number;
    anunciosCriticos: number;
  };
  produtos: ProdutoData[];
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [dados, setDados] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    const buscarDadosDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Dispara o GET enviando o Bearer Token no cabeçalho de autorização
        const response = await api.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDados(response.data);
      } catch (err: any) {
        console.error(err);
        setErro('Não foi possível carregar os dados do painel.');
      } finally {
        setLoading(false);
      }
    };

    buscarDadosDashboard();
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0b0c0d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader color="red" size="xl" type="bars" />
      </div>
    );
  }

  if (erro || !dados) {
    return (
      <div style={{ backgroundColor: '#0b0c0d', minHeight: '100vh', padding: '40px' }}>
        <Center>
          <Paper p="md" withBorder style={{ backgroundColor: '#141517', borderColor: '#e03131' }}>
            <Text c="red.4" fw={500}>{erro || 'Erro inesperado.'}</Text>
          </Paper>
        </Center>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0b0c0d', minHeight: '100vh', color: '#ffffff', paddingBottom: '40px' }}>
      <Container size="lg" pt="xl">
        <Title order={1} style={{ fontWeight: 800 }}>
          Painel de Controle
        </Title>
        <Text c="dimmed" size="sm" mt={4}>
          Visão geral da cubagem e lucratividade da sua conta do Mercado Livre.
        </Text>

        <Space h="xl" />

        {/* Grade Responsiva de Cartões de Métrica */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} gap="md">
          <MetricCard 
            title="Margem Média Geral" 
            value={`${dados.metricas.margemMedia.toFixed(1)}%`} 
            description="Lucro líquido médio estimado" 
          />
          <MetricCard 
            title="Cubagem Total Alocada" 
            value={`${dados.metricas.cubagemGeral.toFixed(2)} $m^3$`} 
            description="Volume total de estoque em metros cúbicos" 
          />
          <MetricCard 
            title="Anúncios Críticos" 
            value={dados.metricas.anunciosCriticos} 
            description="Produtos com margem abaixo de 15%" 
            isAlert={dados.metricas.anunciosCriticos > 0}
          />
        </SimpleGrid>

        <Space h="xl" />
        <Space h="md" />

        <Title order={2} style={{ fontWeight: 700, fontSize: '22px' }}>
          Análise de Cubagem por Anúncio
        </Title>
        
        {/* Passa a lista recebida do Axios direto para o componente visual */}
        <ProductTable produtos={dados.produtos} />
      </Container>
    </div>
  );
}