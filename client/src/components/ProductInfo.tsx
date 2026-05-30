// src/components/productForm/InfoSection.tsx
import { Grid, TextInput, Text } from '@mantine/core';
import classes from './ProductInfo.module.css';

// Mantendo exatamente a assinatura original que o seu ProductCreate espera
interface ProductFormData {
  idMercadoLivre: string;
  nome: string;
  marca: string;
}

interface InfoSectionProps {
  data: ProductFormData;
  onChange: (campo: keyof ProductFormData, valor: string) => void;
}

export function InfoSection({ data, onChange }: InfoSectionProps) {
  // Objeto utilitário para não repetir classNames em todos os inputs
  const inputStyles = {
    input: classes.input,
    label: classes.inputLabel,
  };

  return (
    <div className={classes.sectionWrapper}>
      <Text className={classes.sectionTitle}>
        1. Informações do Anúncio
      </Text>
      
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label="ID Mercado Livre"
            placeholder="Ex: MLB1234567890 (opcional)"
            value={data.idMercadoLivre}
            onChange={(e) => onChange('idMercadoLivre', e.currentTarget.value)}
            classNames={inputStyles}
          />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label="Nome do Produto"
            placeholder="Ex: Kit Amamentação Bebê Premium"
            required
            value={data.nome}
            onChange={(e) => onChange('nome', e.currentTarget.value)}
            classNames={inputStyles}
          />
        </Grid.Col>
        
        <Grid.Col span={12}>
          <TextInput
            label="Marca"
            placeholder="Ex: Huggies, Fisher-Price"
            required
            value={data.marca}
            onChange={(e) => onChange('marca', e.currentTarget.value)}
            classNames={inputStyles}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}