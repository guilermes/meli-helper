// src/components/ConfigForm.tsx
import { Paper, Title, NumberInput, Button, Stack } from '@mantine/core';
import classes from './ConfigForm.module.css'; // 🌟 Importação dos novos estilos

export interface ConfigData {
  imposto: number;
  custoOperacional: number;
}

interface ConfigFormProps {
  valores: ConfigData;
  onChangeValores: (novosValores: ConfigData) => void;
  onSalvar: () => void;
}

export function ConfigForm({ valores, onChangeValores, onSalvar }: ConfigFormProps) {
  
  const handleChange = (campo: keyof ConfigData, valor: number | string) => {
    const valorNumerico = valor === '' ? 0 : Number(valor);
    onChangeValores({
      ...valores,
      [campo]: valorNumerico
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar();
  };

  return (
    <Paper withBorder p="xl" radius="md" className={classes.card}>
      <Title order={4} c="teal" mb="lg" className={classes.title}>
        ⚙️ Regras de Precificação
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <NumberInput
            label="Imposto"
            suffix="%"
            decimalScale={2}
            fixedDecimalScale
            value={valores.imposto}
            onChange={(val) => handleChange('imposto', val)}
            className={classes.inputField}
          />

          <NumberInput
            label="Custo Operacional"
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            value={valores.custoOperacional}
            onChange={(val) => handleChange('custoOperacional', val)}
            className={classes.inputField}
          />

          <Button 
            type="submit" 
            color="teal" 
            fullWidth 
            mt="md" 
            className={classes.submitButton}
          >
            Salvar Configuração
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}