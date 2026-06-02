import { SimpleGrid, Card, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import classes from './KPICards.module.css'; // 👈 Agora importa o arquivo local da mesma pasta!

interface KpiCardsProps {
  kpis: {
    totalProdutos: number;
    mediaClassico: number;
    mediaPremium: number;
    ruinsPremium: number;
    bonsPremium: number;
    freteMedio: number;
  };
}

export default function KpiCards({ kpis }: KpiCardsProps) {
  const itens = [
    { label: 'Produtos', valor: kpis.totalProdutos, emoji: '📦', cor: 'blue.9' },
    { label: 'Média Clássico', valor: `${kpis.mediaClassico}%`, emoji: '📈', cor: 'green.9' },
    { label: 'Média Premium', valor: `${kpis.mediaPremium}%`, emoji: '✨', cor: 'blue.9' },
    { label: 'Ruins Premium', valor: kpis.ruinsPremium, emoji: '⚠️', cor: 'red.9' },
    { label: 'Bons Premium', valor: kpis.bonsPremium, emoji: '🥇', cor: 'green.9' },
    { label: 'Frete Médio', valor: `R$ ${kpis.freteMedio.toFixed(2)}`, emoji: '🚚', cor: 'yellow.9' },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 6 }} spacing="md">
      {itens.map((item, idx) => (
        <Card key={idx} className={classes.cardInteractive}>
          <Group justify="space-between" align="center">
            <Stack gap={2}>
              <Text className={classes.kpiTitle}>{item.label}</Text>
              <Text className={classes.kpiValue}>{item.valor}</Text>
            </Stack>
            <ThemeIcon size="xl" radius="md" color={item.cor} variant="light" style={{ fontSize: '1.2rem' }}>
              {item.emoji}
            </ThemeIcon>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
}