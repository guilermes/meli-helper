// src/components/MetricCard/MetricCard.tsx
import { Paper, Text, Group } from '@mantine/core';
import classes from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  isAlert?: boolean;
}

export function MetricCard({ title, value, description, isAlert }: MetricCardProps) {
  return (
    <Paper 
      withBorder 
      radius="md" 
      p="md" 
      className={`${classes.card} ${isAlert ? classes.cardAlert : ''}`} // 🌟 Aplica o estilo de alerta no card todo
    >
      <Text className={classes.title}>
        {title}
      </Text>
      
      <Group justify="space-between" align="flex-end" mt="sm">
        <Text className={`${classes.value} ${isAlert ? classes.alertValue : ''}`}>
          {value}
        </Text>
      </Group>

      <Text className={classes.description} mt="xs">
        {description}
      </Text>
    </Paper>
  );
}