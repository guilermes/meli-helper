// src/pages/ProductCreate.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Title, Text, Button, Stack } from '@mantine/core';
import api from '../services/api';
import { Product } from '../components/ProductTable';
import { InfoSection } from '../components/ProductInfo';
import classes from './ProductCreate.module.css';

// Definição do tipo estendido para o formulário de cadastro
export type ProductFormData = Omit<Product, 'lucro' | 'margemPorcentagem'> & {
  idMercadoLivre?: string;
  tipoAnuncio?: string; // 🌟 Propriedade adicionada para suportar a nova seleção
};

export default function ProductCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    idMercadoLivre: '',
    tipoAnuncio: '', // 🌟 Inicializado como string vazia para o componente Select controlado
    nome: '',
    marca: '',
    largura: 0,
    altura: 0,
    comprimento: 0,
    peso: 0,
    pesoUsado: 0,
    custo: 0,
    precoVenda: 0,
    freteCalculado: 0,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError] = useState(false);


  const handleFieldChange = (campo: keyof ProductFormData, valor: string | number) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');
    setIsError(false);

    try {
      const token = localStorage.getItem('token');

      // 🌟 AJUSTE: Cria o payload final e espelha o 'peso' dentro de 'pesoUsado' para a API receber preenchido
      const payloadFinal = {
        ...formData,
        pesoUsado: formData.pesoUsado || formData.peso
      };

      console.log("🚀 Enviando payload corrigido e tipado:", payloadFinal);

      // Dispara usando o objeto tratado com números reais
      await api.post('/anuncios', payloadFinal, {
        withCredentials: true, // Garante que os cookies sejam enviados junto com a requisição
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedback('Anúncio cadastrado com sucesso!');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);

    } catch (error: any) {
      console.error('Erro ao cadastrar anúncio no banco:', error);
      setIsError(true);
      const mensagemErro = error.response?.data?.message || 'Não foi possível cadastrar o anúncio. Verifique os dados.';
      setFeedback(mensagemErro);
    } finally {
      setLoading(false);
    }
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

              {/* 🌟 O componente único que engloba Dados cadastrais, Dimensões e Financeiro */}
              <InfoSection data={formData} onChange={handleFieldChange} />

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
                <Text
                  fw={600}
                  ta="center"
                  style={{ color: isError ? '#ff8787' : '#40c057' }}
                >
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