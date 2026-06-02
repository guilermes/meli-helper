// src/pages/ProductCreate.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Title, Text, Button, Stack } from '@mantine/core';
import api from '../services/api';
import {freteApi} from '../services/freteApi';
import { Product } from '../components/ProductTable';
import { InfoSection } from '../components/ProductInfo';
import classes from './ProductCreate.module.css';

export type ProductFormData = Omit<Product, 'lucro' | 'margemPorcentagem'> & {
  idMercadoLivre?: string;
  tipoAnuncio?: string;
};

export default function ProductCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    idMercadoLivre: '',
    tipoAnuncio: '',
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
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError] = useState(false);

  // 🌟 Ref para o debounce — evita chamada a cada tecla digitada
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 🌟 Calcula o frete automaticamente quando os campos relevantes mudam
  useEffect(() => {
    const { largura, altura, comprimento, peso, precoVenda } = formData;

    // Só dispara se todos os campos necessários tiverem valor
    if (!largura || !altura || !comprimento || !peso || !precoVenda) return;

    // Debounce de 600ms para não chamar a API a cada digitação
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setCalculandoFrete(true);
      try {
        const { data } = await freteApi.post(
          '/calcular',
          { largura, altura, comprimento, peso, precoVenda },
        );

        setFormData((prev) => ({
          ...prev,
          freteCalculado: data.frete ?? 0,
          pesoUsado: data.pesoUtilizado ?? peso,
        }));
      } catch (error) {
        console.error('Erro ao calcular frete:', error);
      } finally {
        setCalculandoFrete(false);
      }
    }, 600);

    // Limpa o timeout se o componente desmontar
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    formData.largura,
    formData.altura,
    formData.comprimento,
    formData.peso,
    formData.precoVenda,
  ]);

  const handleFieldChange = (campo: keyof ProductFormData, valor: string | number) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');
    setIsError(false);

    try {
      const payloadFinal = {
        ...formData,
        pesoUsado: formData.pesoUsado || formData.peso,
      };

      await api.post('/anuncios', payloadFinal, {
        withCredentials: true,
      });

      setFeedback('Anúncio cadastrado com sucesso!');
      setTimeout(() => navigate('/dashboard'), 1200);

    } catch (error: any) {
      console.error('Erro ao cadastrar anúncio:', error);
      setIsError(true);
      const mensagemErro =
        error.response?.data?.erro ||
        error.response?.data?.message ||
        'Não foi possível cadastrar o anúncio. Verifique os dados.';
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

              <InfoSection data={formData} onChange={handleFieldChange} />

              {/* 🌟 Feedback visual enquanto o frete está sendo calculado */}
              {calculandoFrete && (
                <Text size="xs" ta="center" c="dimmed">
                  Calculando frete...
                </Text>
              )}

              <Button
                type="submit"
                size="lg"
                fullWidth
                mt="md"
                loading={loading}
                disabled={calculandoFrete} // Impede salvar enquanto calcula
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