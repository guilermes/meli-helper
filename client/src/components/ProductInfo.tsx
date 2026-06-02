// src/components/productForm/InfoSection.tsx
import { Grid, TextInput, Text, Select, NumberInput, Divider, Stack } from '@mantine/core';
import classes from './ProductInfo.module.css';

export interface ProductFormData {
  id: string;
  idMercadoLivre?: string;
  tipoAnuncio?: string;
  nome: string;
  marca: string;
  largura: number;
  altura: number;
  comprimento: number;
  peso: number;
  pesoUsado?: number;
  custo: number;
  precoVenda: number;
  freteCalculado: number;
}

interface UnifiedFormProps {
  data: ProductFormData;
  onChange: (campo: keyof ProductFormData, valor: string | number) => void;
}

export function InfoSection({ data, onChange }: UnifiedFormProps) {
  const inputStyles = {
    input: classes.input,
    label: classes.inputLabel,
  };

  // 🌟 FUNÇÃO DE CONVERSÃO SEGURA: Converte strings numéricas em Numbers reais antes de enviar ao estado
  const handleNumberChange = (campo: keyof ProductFormData, val: string | number) => {
    if (typeof val === 'number') {
      onChange(campo, val);
    } else {
      // Se vier como string, troca vírgula por ponto e tenta converter
      const stringLimpa = String(val).replace(',', '.').trim();
      const numeroConvertido = parseFloat(stringLimpa);
      onChange(campo, isNaN(numeroConvertido) ? 0 : numeroConvertido);
    }
  };

  return (
    <Stack gap="xl" className={classes.formContainer}>
      
      {/* SEÇÃO 1: INFORMAÇÕES DO ANÚNCIO */}
      <div className={classes.sectionWrapper}>
        <Text className={`${classes.sectionTitle} ${classes.titleRed}`}>
          1. Informações do Anúncio
        </Text>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="ID Mercado Livre"
              placeholder="Ex: MLB1234567890 (opcional)"
              value={data.idMercadoLivre || ''}
              onChange={(e) => onChange('idMercadoLivre', e.currentTarget.value)}
              classNames={inputStyles}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Select
              label="Tipo do Anúncio"
              placeholder="Selecione a exposição"
              required
              data={[
                { value: 'CLASSICO', label: 'Clássico (Taxa padrão)' },
                { value: 'PREMIUM', label: 'Premium (Exposição máxima)' },
              ]}
              value={data.tipoAnuncio || ''}
              onChange={(value) => onChange('tipoAnuncio', value || '')}
              classNames={inputStyles}
              comboboxProps={{ dropdownPadding: 4 }}
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
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
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

      <Divider className={classes.divider} />

      {/* SEÇÃO 2: DIMENSÕES E LOGÍSTICA */}
      <div className={classes.sectionWrapper}>
        <Text className={`${classes.sectionTitle} ${classes.titleOrange}`}>
          2. Dimensões e Logística (cm / kg)
        </Text>
        <Grid gutter="md">
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <NumberInput
              label="Largura"
              suffix=" cm"
              min={0}
              decimalScale={1}
              required
              value={data.largura}
              onChange={(val) => handleNumberChange('largura', val)}
              classNames={inputStyles}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <NumberInput
              label="Altura"
              suffix=" cm"
              min={0}
              decimalScale={1}
              required
              value={data.altura}
              onChange={(val) => handleNumberChange('altura', val)}
              classNames={inputStyles}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <NumberInput
              label="Comprimento"
              suffix=" cm"
              min={0}
              decimalScale={1}
              required
              value={data.comprimento}
              onChange={(val) => handleNumberChange('comprimento', val)}
              classNames={inputStyles}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <NumberInput
              label="Peso"
              suffix=" kg"
              min={0}
              decimalScale={3}
              required
              value={data.peso}
              onChange={(val) => handleNumberChange('peso', val)}
              classNames={inputStyles}
            />
          </Grid.Col>
        </Grid>
      </div>

      <Divider className={classes.divider} />

      {/* SEÇÃO 3: VALORES FINANCEIROS */}
      <div className={classes.sectionWrapper}>
        <Text className={`${classes.sectionTitle} ${classes.titleGreen}`}>
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
              onChange={(val) => handleNumberChange('custo', val)}
              classNames={inputStyles}
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
              value={data.precoVenda}
              onChange={(val) => handleNumberChange('precoVenda', val)}
              classNames={inputStyles}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <NumberInput
              label="Frete Calculado"
              prefix="R$ "
              min={0}
              decimalScale={2}
              fixedDecimalScale
              required
              value={data.freteCalculado}
              onChange={(val) => handleNumberChange('freteCalculado', val)}
              classNames={inputStyles}
            />
          </Grid.Col>
        </Grid>
      </div>

    </Stack>
  );
}