import { useState } from 'react';
import { Container, Paper, Title, Text, Button, Stack, Divider } from '@mantine/core';
import { Product } from '../components/ProductTable';
import { InfoSection } from '../components/ProductInfo'; // Corrigido o caminho conforme a estrutura
import { DimensionsSection } from '../components/Dimensions';
import { FinanceSection } from '../components/Finance';
import classes from './ProductCreate.module.css';

// Exportando o tipo corrigido e flexível para que InfoSection, DimensionsSection e FinanceSection herdem corretamente
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

  // Handler genérico perfeitamente alinhado com a assinatura dos filhos
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
    <div className={classes.pageWrapper}>
      <Container size="md" py="xl" className={classes.container}>
        <Paper withBorder shadow="xl" p="xl" radius="md" className={classes.card}>
          
          <div className={classes.header}>
            <Title order={2} className={classes.title}>Cadastrar Anúncio</Title>
            <Text size="sm" className={classes.subtitle} mt={4}>
              Gerenciador de Estoque e Precificação
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            <Stack gap="xl">
              
              {/* Seções Isoladas */}
              <InfoSection data={formData} onChange={handleFieldChange} />
              <Divider className={classes.divider} />
              <DimensionsSection data={formData} onChange={handleFieldChange} className={classes.input}/>
              <Divider className={classes.divider} />              
              <FinanceSection data={formData} onChange={handleFieldChange} className={classes.input}/>

              <Button 
                type="submit" 
                size="lg" 
                fullWidth 
                mt="md" 
                loading={loading}
                className={classes.buttonSubmit}
              >
                Cadastrar Anúncio
              </Button>

              {feedback && (
                <Text fw={600} ta="center" className={classes.feedbackText}>
                  {feedback}
                </Text>
              )}

            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}