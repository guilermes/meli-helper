// src/components/InsightsInteligentes.tsx
import { Paper, Text, Stack, Group } from '@mantine/core';
import classes from './InsightCard.module.css'; 

interface InsightsInteligentesProps {
  ticketMedio: number;
  produtoMaisPesado: { nome: string; peso: number } | null;
  melhorMargem: { nome: string; margem: number } | null;
}

export function InsightCard({ ticketMedio, produtoMaisPesado, melhorMargem }: InsightsInteligentesProps) {
  return (
    <Paper withBorder p="lg" radius="md" className={classes.card}>
      <Text fw={700} mb="md" className={classes.title}>
        💡 Insights Inteligentes
      </Text>
      
      <Stack gap="sm">
        <Group className={classes.metricRow}>
          <Text size="sm" className={classes.label}>🟩 Ticket médio dos produtos:</Text>
          <Text size="sm" fw={700} className={classes.value}>
            R$ {ticketMedio.toFixed(2)}
          </Text>
        </Group>

        <Group className={classes.metricRow}>
          <Text size="sm" className={classes.label}>🟨 Produto mais pesado:</Text>
          <Text size="sm" fw={700} className={classes.value}>
            {produtoMaisPesado
              ? `${produtoMaisPesado.nome} (${produtoMaisPesado.peso.toFixed(2)}kg)`
              : '—'}
          </Text>
        </Group>

        <Group className={classes.metricRow}>
          <Text size="sm" className={classes.label}>🏆 Melhor margem:</Text>
          <Text size="sm" fw={700} className={classes.value}>
            {melhorMargem
              ? `${melhorMargem.nome} (${melhorMargem.margem.toFixed(2)}%)`
              : '—'}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}