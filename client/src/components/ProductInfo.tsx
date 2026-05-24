// src/components/productForm/InfoSection.tsx
import { Grid, TextInput, Text } from '@mantine/core';
import { ProductFormData } from '../../pages/ProductCreate';

interface InfoSectionProps {
  data: ProductFormData;
  onChange: (campo: keyof ProductFormData, valor: string) => void;
}

export function InfoSection({ data, onChange }: InfoSectionProps) {
  return (
    <div>
      <Text fw={600} c="blue.4" size="sm" mb="md" className="uppercase tracking-wider">
        1. Informações do Anúncio
      </Text>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label="ID Mercado Livre"
            placeholder="Ex: MLB1234567890 (opcional)"
            value={data.idMercadoLivre}
            onChange={(e) => onChange('idMercadoLivre', e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label="Nome do Produto"
            placeholder="Ex: Kit Amamentação Bebê Premium"
            required
            value={data.nome}
            onChange={(e) => onChange('nome', e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Marca"
            placeholder="Ex: Huggies, Fisher-Price"
            required
            value={data.marca}
            onChange={(e) => onChange('marca', e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}