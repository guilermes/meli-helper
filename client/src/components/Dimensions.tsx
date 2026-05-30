// src/components/productForm/DimensionsSection.tsx
import { Grid, NumberInput, Text } from '@mantine/core';
import { ProductFormData } from '../../pages/ProductCreate';

interface DimensionsSectionProps {
  data: ProductFormData;
  onChange: (campo: keyof ProductFormData, valor: number) => void;
}

export function DimensionsSection({ data, onChange }: DimensionsSectionProps) {
  return (
    <div>
      <Text fw={600} c="orange.4" size="sm" mb="md" className="uppercase tracking-wider">
        2. Dimensões e Logística (cm / kg)
      </Text>
      <Grid gutter="sm">
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <NumberInput
            label="Largura"
            suffix=" cm"
            min={0}
            decimalScale={1}
            value={data.largura}
            onChange={(val) => onChange('largura', typeof val === 'number' ? val : 0)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <NumberInput
            label="Altura"
            suffix=" cm"
            min={0}
            decimalScale={1}
            value={data.altura}
            onChange={(val) => onChange('altura', typeof val === 'number' ? val : 0)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <NumberInput
            label="Comprimento"
            suffix=" cm"
            min={0}
            decimalScale={1}
            value={data.comprimento}
            onChange={(val) => onChange('comprimento', typeof val === 'number' ? val : 0)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <NumberInput
            label="Peso"
            suffix=" kg"
            min={0}
            decimalScale={3}
            value={data.peso}
            onChange={(val) => onChange('peso', typeof val === 'number' ? val : 0)}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}