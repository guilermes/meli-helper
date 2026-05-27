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
    <Paper withBorder radius="md" p="md" className={classes.card}>
      <Text size="xs" c="dimmed" className={classes.title}>
        {title}
      </Text>
      
      <Group justify="space-between" align="flex-end" mt="sm">
        <Text className={`${classes.value} ${isAlert ? classes.alertValue : ''}`}>
          {value}
        </Text>
      </Group>

      <Text size="xs" c="dimmed" mt="sm">
        {description}
      </Text>
    </Paper>
  );
}