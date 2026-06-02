import { Paper, Text, Group, ThemeIcon } from '@mantine/core';
import {
  IconTrendingUp,
  IconAlertTriangle,
} from '@tabler/icons-react';

import classes from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  isAlert?: boolean;
}

export function MetricCard({
  title,
  value,
  description,
  isAlert,
}: MetricCardProps) {
  return (
    <Paper
      withBorder
      radius="lg"
      p="lg"
      className={`${classes.card} ${isAlert ? classes.cardAlert : ''}`}
    >
      <Group justify="space-between" align="flex-start">
        <Text className={classes.title}>
          {title}
        </Text>

        <ThemeIcon
          variant="light"
          color={isAlert ? 'red' : 'brandBlue'}
          radius="xl"
          size="lg"
        >
          {isAlert ? (
            <IconAlertTriangle size={18} stroke={1.8} />
          ) : (
            <IconTrendingUp size={18} stroke={1.8} />
          )}
        </ThemeIcon>
      </Group>

      <Text
        className={`${classes.value} ${isAlert ? classes.alertValue : ''}`}
        mt="md"
      >
        {value}
      </Text>

      <Text className={classes.description} mt="xs">
        {description}
      </Text>
    </Paper>
  );
}
