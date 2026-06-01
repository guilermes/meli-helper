// src/components/ConfigPreview.tsx
import { Paper, Title, Stack, Group, Text, Badge } from '@mantine/core';
import { ConfigData } from './ConfigForm';
import classes from './ConfigPreview.module.css'; // 🌟 Importação dos novos estilos

interface ConfigPreviewProps {
  valoresSalvos: ConfigData;
}

export function ConfigPreview({ valoresSalvos }: ConfigPreviewProps) {
  return (
    <Paper withBorder p="xl" radius="md" className={classes.card}>
      <Title order={4} c="blue" mb="lg" className={classes.title}>
        Configuração Atual
      </Title>

        {/* Item: Imposto */}
        <Group justify="space-between" className={classes.row}>
          <Text className={classes.label}>Imposto</Text>
          <Badge size="lg" color="yellow" autoContrast className={classes.badgeValue}>
            {valoresSalvos.imposto.toFixed(2)}%
          </Badge>
        </Group>

        {/* Item: Custo Operacional */}
        <Group justify="space-between" className={classes.row}>
          <Text className={classes.label}>Custo Operacional</Text>
          <Badge size="lg" color="green" className={classes.badgeValue}>
            R$ {valoresSalvos.custoOperacional.toFixed(2)}
          </Badge>
        </Group>
    </Paper>
  );
}