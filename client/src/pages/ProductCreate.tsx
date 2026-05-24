// src/pages/ProductCreate.tsx
import { useState } from 'react';
import { Container, Paper, Title, Text, Button, Stack, Divider } from '@mantine/core';
import { Product } from '../components/Table';
import { InfoSection } from '../components/ProductInfo';
import { DimensionsSection } from '../components/Dimensions';
import { FinanceSection } from '../components/Finance';

export type ProductFormData = Omit<Product, 'lucro' | 'margemPorcentagem'> & {
  idMercadoLivre?: string;
};

export default function ProductCreate() {
  const [formData, setFormData] = useState<ProductFormData>({
    id: '', idMercadoLivre: '', nome: '', marca: '',
    largura: 0, altura: 0, comprimento: 0, peso: 0, pesoUsado: 0,
    custo: 0, precoVenda: 0, freteCalculado: 0,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Handler genérico que atende todos os componentes filhos de forma tipada
  const handleFieldChange = (campo: keyof ProductFormData, valor: string | number) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    console.log('Enviando dados do Meli Helper:', formData);

    setTimeout(() => {
      setLoading(false);
      setFeedback('Anúncio cadastrado com sucesso!');
      setFormData({
        id: '', idMercadoLivre: '', nome: '', marca: '',
        largura: 0, altura: 0, comprimento: 0, peso: 0, pesoUsado: 0,
        custo: 0, precoVenda: 0, freteCalculado: 0,
      });
    }, 1500);
  };

  return (
    <Container size="md" py="xl">
      <Paper withBorder shadow="md" p="xl" radius="md" className="bg-slate-900 border-slate-800">
        
        <div className="text-center mb-6">
          <Title order={2} c="white">Cadastrar Anúncio</Title>
          <Text size="sm" c="slate.400" mt={4}>Gerenciador de Estoque e Precificação</Text>
        </div>

        <form onSubmit={handleSubmit}>
          <Stack gap="xl">
            
            {/* Seções Isoladas e Limpas */}
            <InfoSection data={formData} onChange={handleFieldChange} />
            <Divider className="border-slate-800" />
            
            <DimensionsSection data={formData} onChange={handleFieldChange} />
            <Divider className="border-slate-800" />
            
            <FinanceSection data={formData} onChange={handleFieldChange} />

            <Button type="submit" color="green" size="lg" fullWidth mt="md" loading={loading}>
              Cadastrar Anúncio
            </Button>

            {feedback && (
              <Text c="green.4" fw={600} ta="center" className="animate-pulse">
                {feedback}
              </Text>
            )}

          </Stack>
        </form>
      </Paper>
    </Container>
  );
}