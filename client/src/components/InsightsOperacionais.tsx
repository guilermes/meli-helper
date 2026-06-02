import { Card, Group, Stack, Text } from '@mantine/core';
import classes from './InsightsOperacionais.module.css'; // 👈 Importação local do CSS isolado!

interface InsightsOperacionaisProps {
  insights: string[];
}

export default function InsightsOperacionais({ insights }: InsightsOperacionaisProps) {
  return (
    <Card className={classes.card} style={{ height: '100%' }}>
      <Group mb="md">
        <Text fw={600} size="md">💡 Insights Inteligentes</Text>
      </Group>
      
      {/* Removemos os styles inline e passamos o controle de padding/margin para o CSS */}
      <Stack component="ul" gap={0} style={{ padding: 0, margin: 0 }}>
        {insights.map((insight, idx) => (
          <li key={idx} className={classes.insightItem}>
            <span>⚡</span>
            <Text size="sm" style={{ color: 'inherit', lineHeight: 'inherit' }}>
              {insight}
            </Text>
          </li>
        ))}
      </Stack>
    </Card>
  );
}