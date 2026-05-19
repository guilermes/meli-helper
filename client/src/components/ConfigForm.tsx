// src/components/ConfigForm.tsx
import { Paper, Title, NumberInput, Button, Stack } from '@mantine/core';

// Definimos a estrutura dos dados que o formulário vai manipular
export interface ConfigData {
  comissao: number;
  imposto: number;
  custoOperacional: number;
}

interface ConfigFormProps {
  valores: ConfigData;
  onChangeValores: (novosValores: ConfigData) => void;
  onSalvar: () => void;
}

export function ConfigForm({ valores, onChangeValores, onSalvar }: ConfigFormProps) {
  
  // Função para atualizar apenas um campo específico mantendo os outros idênticos
  const handleChange = (campo: keyof ConfigData, valor: number | string) => {
    onChangeValores({
      ...valores,
      [campo]: typeof valor === 'number' ? valor : 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar();
  };

  return (
    <Paper withBorder p="xl" radius="md" className="bg-slate-900 border-slate-800">
      <Title order={4} c="teal" mb="lg" className="flex items-center gap-2">
        Regras de Precificação
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <NumberInput
            label="Comissão"
            suffix="%"
            decimalScale={2}
            fixedDecimalScale
            value={valores.comissao}
            onChange={(val) => handleChange('comissao', val)}
          />

          <NumberInput
            label="Imposto"
            suffix="%"
            decimalScale={2}
            fixedDecimalScale
            value={valores.imposto}
            onChange={(val) => handleChange('imposto', val)}
          />

          <NumberInput
            label="Custo Operacional"
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            value={valores.custoOperacional}
            onChange={(val) => handleChange('custoOperacional', val)}
          />

          <Button type="submit" color="teal" fullWidth mt="md">
            Salvar Configuração
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}