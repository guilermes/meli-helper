// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  SimpleGrid, 
  Paper, 
  Group, 
  Stack 
} from '@mantine/core';

export default function Home() {
  // Dados fictícios de resumo que futuramente virão de um endpoint de agregação no seu backend
  const metricasResumo = [
    { titulo: 'Total de Anúncios', valor: '142', subtexto: 'Produtos monitorados', cor: 'blue' },
    { titulo: 'Preço Médio de Venda', valor: 'R$ 134,50', subtexto: 'Baseado no catálogo', cor: 'teal' },
    { titulo: 'Margem de Lucro Média', valor: '24.8%', subtexto: 'Meta ideal > 20%', cor: 'green' },
  ];

  return (
    <Container size="lg" py="xl" mt={30} className="flex-grow">
      
      {/* SEÇÃO HERO / BOAS-VINDAS */}
      <Paper 
        p="xl" 
        radius="md" 
        className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 mb-12 text-center sm:text-left"
      >
        <GridOrStackContainer />
      </Paper>

      {/* PAINEL DE MÉTRICAS RÁPIDAS */}
      <Title order={3} c="white" mb="md" className="tracking-wide">
        Visão Geral da Operação
      </Title>

      {/* O SimpleGrid lida com as colunas responsivas de forma nativa e sem esforço */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        {metricasResumo.map((item, index) => (
          <Paper 
            key={index}
            withBorder 
            p="lg" 
            radius="md" 
            className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all"
          >
            <Stack gap="xs">
              <Text size="xs" c="slate.400" fw={700} className="uppercase tracking-wider">
                {item.titulo}
              </Text>
              <Group align="flex-end" gap="xs">
                <Text size="2rem" fw={700} c={`${item.cor}.4`}>
                  {item.valor}
                </Text>
              </Group>
              <Text size="xs" c="slate.500">
                {item.subtexto}
              </Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>

    </Container>
  );
}

// Componente interno auxiliar para deixar o código do Hero limpo
function GridOrStackContainer() {
  return (
    <Group justify="space-between" align="center" className="flex-col sm:flex-row gap-6 p-4">
      <Stack gap="xs" className="max-w-xl">
        <Title order={1} className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
          Bem-vindo ao <span className="text-teal-400">Meli Helper</span>
        </Title>
        <Text size="lg" c="slate.300">
          Sua ferramenta definitiva para gerenciar dimensões, calcular cubagem de frete e maximizar sua margem de lucro no Mercado Livre.
        </Text>
      </Stack>

      <Button 
        component={Link} 
        to="/login" 
        size="lg" 
        color="teal" 
        className="shadow-lg shadow-teal-950/50"
      >
        Acessar Painel
      </Button>
    </Group>
  );
}