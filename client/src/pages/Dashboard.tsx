import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  Text,
  Title,
  Group,
  Stack,
  Loader,
  Button,
  NumberInput,
} from '@mantine/core';
import classes from './Dashboard.module.css';
import KpiCards from '../components/KPICards';
import AlertasOperacionais from '../components/AlertasOperacionais';
import RankingMargem from '../components/RankingMargem';
import InsightsOperacionais from '../components/InsightsOperacionais';
import api from '../services/api';

// 📝 Estrutura exata entregue pelo Back-end
interface DashboardData {
  kpis: {
    totalProdutos: number;
    mediaClassico: number;
    mediaPremium: number;
    ruinsPremium: number;
    bonsPremium: number;
    freteMedio: number;
  };
  alertas: Array<{ id: number; tipo: 'error' | 'warning' | 'info'; mensagem: string }>;
  rankingMargem: Array<{ id: string | number; nome: string; margem: number }>;
  insights: string[];
}

export default function Dashboard() {
  const [dados, setDados] = useState<DashboardData | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    const buscarDadosDashboard = async () => {
      try {
        setCarregando(true);
        const response = await api.get('/dashboard');
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da dashboard:', error);
      } finally {
        setCarregando(false);
      }
    };
    buscarDadosDashboard();
  }, []);

  if (carregando || !dados) {
    return (
      <Group justify="center" align="center" style={{ height: '70vh' }}>
        <Loader color="blue" size="lg" type="dots" />
      </Group>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap={2} mb="xl">
        <Title order={2} fw={600}>Dashboard Inteligente</Title>
        <Text size="sm" c="dimmed">Monitoramento completo da operação Mercado Livre</Text>
      </Stack>

      {/* Grid de Cards Operacionais */}
      <KpiCards kpis={dados.kpis} />

      {/* Bloco do Meio: Alertas + Calculadora */}
      <Grid gutter="lg" mb="lg" mt="md">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <AlertasOperacionais alertas={dados.alertas} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <InsightsOperacionais insights={dados.insights} />
          
        </Grid.Col>
      </Grid>

      {/* Bloco de Baixo: Ranking + Insights */}
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <RankingMargem ranking={dados.rankingMargem} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <CalculadoraFrete />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

function CalculadoraFrete() {
  const [preco, setPreco] = useState<number | string>('');
  const [peso, setPeso] = useState<number | string>('');
  const [largura, setLargura] = useState<number | string>('');
  const [altura, setAltura] = useState<number | string>('');
  const [comprimento, setComprimento] = useState<number | string>('');
  const [resultado, setResultado] = useState<string>('Informe os dados para calcular.');

  const calcular = () => {
    if (!preco || !peso) {
      setResultado('Preço de Venda e Peso são obrigatórios.');
      return;
    }
    const contaFicticia = Number(peso) * 4.5 + 18.90;
    setResultado(`Frete Estimado: R$ ${contaFicticia.toFixed(2)} (Prazo: 2 a 4 dias úteis)`);
  };

  return (
    <Card className={classes.card}>
      <Group mb="md"><Text fw={600} size="md">📟 Calculadora Rápida de Frete</Text></Group>
      <Grid gutter="xs">
        {/* 💎 Todos os inputs agora herdam o focus azul brilhante e background do CSS Module */}
        <Grid.Col span={6}><NumberInput label="Preço Venda" prefix="R$ " decimalScale={2} placeholder="0.00" value={preco} onChange={setPreco} className={classes.calcInput} /></Grid.Col>
        <Grid.Col span={6}><NumberInput label="Peso" suffix=" kg" placeholder="0" value={peso} onChange={setPeso} className={classes.calcInput} /></Grid.Col>
        <Grid.Col span={4}><NumberInput label="Largura" suffix=" cm" placeholder="cm" value={largura} onChange={setLargura} className={classes.calcInput} /></Grid.Col>
        <Grid.Col span={4}><NumberInput label="Altura" suffix=" cm" placeholder="cm" value={altura} onChange={setAltura} className={classes.calcInput} /></Grid.Col>
        <Grid.Col span={4}><NumberInput label="Comprimento" suffix=" cm" placeholder="cm" value={comprimento} onChange={setComprimento} className={classes.calcInput} /></Grid.Col>
        <Grid.Col span={12} mt="xs"><Button fullWidth color="blue" onClick={calcular}>Calcular Frete</Button></Grid.Col>
        <Grid.Col span={12}>
          {/* 💎 Bloco de resultado utilizando a identidade dark e fonte monoFont */}
          <div className={classes.alertInfo} style={{ marginTop: '4px' }}>
            <span className={classes.monoFont} style={{ fontSize: '0.85rem' }}>{resultado}</span>
          </div>
        </Grid.Col>
      </Grid>
    </Card>
  );
}