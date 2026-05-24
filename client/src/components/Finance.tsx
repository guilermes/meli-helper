// src/components/productForm/FinanceSection.tsx
import { Grid, NumberInput, Text } from '@mantine/core';
import { ProductFormData } from '../../pages/ProductCreate';

interface FinanceSectionProps {
  data: ProductFormData;
  onChange: (campo: keyof ProductFormData, valor: number) => void;
}

export function FinanceSection({ data, onChange }: FinanceSectionProps) {
  return (
    <div>
      <Text fw={600} c="green.4" size="sm" mb="md" className="uppercase tracking-wider">
        3. Valores e Custos Financeiros
      </Text>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <NumberInput
            label="Custo do Produto"
            prefix="R$ "
            min={0}
            decimalScale={2}
            fixedDecimalScale
            required
            value={data.custo}
            onChange={(val) => onChange('custo', typeof val === 'number' ? val : 0)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <NumberInput
            label="Preço de Venda"
            prefix="R$ "
            min={0}
            decimalScale={2}
            fixedDecimalScale
            required
            value={data.preco}
            onChange={(val) => onChange('preco', typeof val === 'number' ? val : 0)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <NumberInput
            label="Frete Cobrado"
            prefix="R$ "
            min={0}
            decimalScale={2}
            fixedDecimalScale
            value={data.frete}
            onChange={(val) => onChange('frete', typeof val === 'number' ? val : 0)}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}