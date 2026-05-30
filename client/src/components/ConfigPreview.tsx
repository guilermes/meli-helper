// src/components/ConfigPreview.tsx
import { Paper, Title, Stack, Group, Text, Badge } from '@mantine/core';
import { ConfigData } from './ConfigForm';

interface ConfigPreviewProps {
  valoresSalvos: ConfigData;
}

export function ConfigPreview({ valoresSalvos }: ConfigPreviewProps) {
  return (
    <Paper withBorder p="xl" radius="md" className="bg-slate-900 border-slate-800">
      <Title order={4} c="blue" mb="lg">
        Configuração Atual
      </Title>

      <Stack gap="sm">
        {/* Item: Comissão */}
        <Group justify="space-between" className="border-b border-slate-800 pb-2">
          <Text c="slate.300">Comissão</Text>
          <Badge size="lg" color="blue">
            {valoresSalvos.comissao.toFixed(2)}%
          </Badge>
        </Group>

        {/* Item: Imposto */}
        <Group justify="space-between" className="border-b border-slate-800 pb-2">
          <Text c="slate.300">Imposto</Text>
          <Badge size="lg" color="yellow" c="dark">
            {valoresSalvos.imposto.toFixed(2)}%
          </Badge>
        </Group>

        {/* Item: Custo Operacional */}
        <Group justify="space-between" className="pb-2">
          <Text c="slate.300">Custo Operacional</Text>
          <Badge size="lg" color="green">
            R$ {valoresSalvos.custoOperacional.toFixed(2)}
          </Badge>
        </Group>
      </Stack>
    </Paper>
  );
}