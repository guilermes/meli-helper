import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  SimpleGrid,
  Card,
  Text,
  Title,
  Badge,
  Divider,
  Group,
  Stack,
  Notification,
  Loader,
} from '@mantine/core';
import classes from "./Config.module.css";
import api from '../services/api';

// 🌟 IMPORTAÇÕES DOS SEUS NOVOS COMPONENTES
// (Ajuste o caminho '../components/' caso este arquivo esteja em outra pasta, como 'src/pages')
import { ConfigForm, ConfigData } from '../components/ConfigForm';
import { ConfigPreview } from '../components/ConfigPreview';

export default function Config() {
  // Estado do formulário (o que o usuário digita/altera)
  const [formValores, setFormValores] = useState<ConfigData>({
    imposto: 0,
    custoOperacional: 0,
  });

  // Estado consolidado (o que está atualmente salvo no banco)
  const [valoresSalvos, setValoresSalvos] = useState<ConfigData>({
    imposto: 0,
    custoOperacional: 0,
  });

  const [carregando, setCarregando] = useState<boolean>(true);
  const [notificacao, setNotificacao] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  // 🔍 BUSCAR CONFIGURAÇÕES DO BANCO
  useEffect(() => {
    const buscarConfiguracoes = async () => {
      try {
        setCarregando(true);
        const response = await api.get('/config');
        
        if (response.data) {
          const dadosMapeados = {
            imposto: response.data.imposto ?? 0,
            custoOperacional: response.data.custoOperacional ?? 0,
          };
          setFormValores(dadosMapeados);
          setValoresSalvos(dadosMapeados);
        }
      } catch (error: any) {
        setNotificacao({
          tipo: 'erro',
          texto: error.response?.data?.erro || 'Erro ao carregar as configurações da operação.'
        });
      } finally {
        setCarregando(false);
      }
    };

    buscarConfiguracoes();
  }, []);

  // 💾 SALVAR CONFIGURAÇÕES NO BACKEND
  // 🌟 ALTERADO: Removido o parâmetro 'e: React.FormEvent' pois o ConfigForm já trata isso!
  const lidarComSalvar = async () => {
    setNotificacao(null);

    try {
      const response = await api.post('/config/set', formValores);

      const dadosAtualizados = {
        imposto: response.data.config.imposto,
        custoOperacional: response.data.config.custoOperacional
      };
      
      setValoresSalvos(dadosAtualizados);
      setFormValores(dadosAtualizados);
      
      setNotificacao({ 
        tipo: 'sucesso', 
        texto: response.data.mensagem || 'Configurações salvas com sucesso no sistema!' 
      });

      setTimeout(() => setNotificacao(null), 3000);
    } catch (error: any) {
      setNotificacao({
        tipo: 'erro',
        texto: error.response?.data?.erro || 'Falha ao salvar configurações.'
      });
    }
  };

  if (carregando) {
    return (
      <Group justify="center" style={{ height: '50vh' }}>
        <Loader color="blue" size="lg" />
      </Group>
    );
  }

  return (
    <Container size="lg" py="xl">

      {/* ================= HEADER ================= */}
      <Stack gap={2} mb="xl">
        <Title order={3} fw={600}>
          Configurações
        </Title>
        <Text size="sm" c="dimmed">
          Configure impostos e custos operacionais da sua operação
        </Text>
      </Stack>

      {/* NOTIFICAÇÃO MANTINE */}
      {notificacao && (
        <Notification
          color={notificacao.tipo === 'sucesso' ? 'green' : 'red'}
          onClose={() => setNotificacao(null)}
          mb="md"
          className={classes.successFeedback}
        >
          {notificacao.texto}
        </Notification>
      )}

      {/* ================= COMISSÕES FIXAS (Mantidos como solicitado) ================= */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} mb="xl" spacing="md">
        
        {/* CARD CLÁSSICO */}
        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.cardHover}>
          <Group justify="space-between" align="flex-start">
            <Stack gap={2}>
              <Text size="xs" c="dimmed" fw={500}>
                Comissão Mercado Livre
              </Text>
              <Title order={4} fw={700} c="blue">
                Clássico
              </Title>
            </Stack>
            <Badge color="blue" size="lg" variant="light">
              12%
            </Badge>
          </Group>
          <Divider my="sm" />
          <Text size="sm" c="dimmed">
            Exposição média, sem parcelamento sem juros. Ideal para produtos de ticket mais baixo.
          </Text>
        </Card>

        {/* CARD PREMIUM */}
        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.cardHover}>
          <Group justify="space-between" align="flex-start">
            <Stack gap={2}>
              <Text size="xs" c="dimmed" fw={500}>
                Comissão Mercado Livre
              </Text>
              <Title order={4} fw={700} c="orange">
                Premium
              </Title>
            </Stack>
            <Badge color="orange" size="lg" variant="light">
              18%
            </Badge>
          </Group>
          <Divider my="sm" />
          <Text size="sm" c="dimmed">
            Alta exposição e parcelamento sem juros. Ideal para produtos de ticket mais alto.
          </Text>
        </Card>

      </SimpleGrid>

      {/* ================= CONFIG + RESUMO REFATORADO ================= */}
      <Grid gap="xl">

        {/* LADO ESQUERDO: FORMULÁRIO COMPONENTIZADO */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ConfigForm 
            valores={formValores} 
            onChangeValores={setFormValores} 
            onSalvar={lidarComSalvar} 
          />
        </Grid.Col>

        {/* LADO DIREITO: RESUMO COMPONENTIZADO */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ConfigPreview valoresSalvos={valoresSalvos} />
        </Grid.Col>

      </Grid>
    </Container>
  );
}