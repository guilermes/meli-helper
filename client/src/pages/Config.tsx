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
  NumberInput,
  Button,
  Group,
  Stack,
  Notification,
  Loader,
  Alert,
} from '@mantine/core';
import classes from "./Config.module.css";
import api from '../services/api'; // 🌟 Importando a sua instância do Axios

interface ConfigData {
  imposto: number;
  custoOperacional: number;
}

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

  // 🔍 BUSCAR CONFIGURAÇÕES DO BANCO (Ao montar o componente)
  useEffect(() => {
    const buscarConfiguracoes = async () => {
      try {
        setCarregando(true);
        const response = await api.get('/');
        
        // Se o usuário já tiver configurações salvas no banco
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
  const lidarComSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotificacao(null);

    try {
      const response = await api.post('/config/set', formValores);

      // Sincroniza o painel visual com os novos valores validados vindos do backend
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

      // Esconde a notificação de sucesso após 3 segundos
      setTimeout(() => setNotificacao(null), 3000);
    } catch (error: any) {
      setNotificacao({
        tipo: 'erro',
        texto: error.response?.data?.erro || 'Falha ao salvar configurações.'
      });
    }
  };

  // Se estiver buscando dados do banco, exibe o Loader centralizado
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

      {/* NOTIFICAÇÃO MANTINE (Mais polida que o texto bruto) */}
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

      {/* ================= COMISSÕES FIXAS ================= */}
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

      {/* ================= CONFIG + RESUMO ================= */}
      <Grid gutter="xl">

        {/* LADO ESQUERDO: FORMULÁRIO */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="xl" gap="xs">
              <Text fw={600} size="lg" c="blue">
                Configurações da Operação
              </Text>
            </Group>

            <form onSubmit={lidarComSalvar}>
              <Stack gap="md">

                {/* INPUT IMPOSTO */}
                <NumberInput
                  className={classes.numberInput} // 🌟 CORREÇÃO: Corrigido o erro de sintaxe do Mantine
                  label="Imposto (%)"
                  placeholder="Ex: 6"
                  decimalScale={2}
                  fixedDecimalScale
                  leftSection={<Text size="sm" c="dimmed">%</Text>}
                  value={formValores.imposto}
                  onChange={(val) => setFormValores(prev => ({ ...prev, imposto: Number(val) }))}
                  min={0}
                />

                {/* INPUT CUSTO OPERACIONAL */}
                <NumberInput
                  className={classes.numberInput} // 🌟 CORREÇÃO: Corrigido o erro de sintaxe do Mantine
                  label="Custo Operacional"
                  placeholder="Ex: 5"
                  decimalScale={2}
                  fixedDecimalScale
                  leftSection={<Text size="sm" c="dimmed">R$</Text>}
                  value={formValores.custoOperacional}
                  onChange={(val) => setFormValores(prev => ({ ...prev, custoOperacional: Number(val) }))}
                  min={0}
                />

                <Button type="submit" fullWidth mt="md" color="blue">
                  Salvar Configuração
                </Button>
              </Stack>
            </form>
          </Card>
        </Grid.Col>

        {/* LADO DIREITO: RESUMO */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="xl" gap="xs">
              <Text fw={600} size="lg" c="green">
                Configuração Atual
              </Text>
            </Group>

            <Stack gap="xs">
              {/* STATUS IMPOSTO */}
              <Group justify="space-between" p="sm" className={classes.statusRow}>
                <Text size="sm" fw={500}>Imposto</Text>
                <Badge color="orange" size="lg" variant="light">
                  {valoresSalvos.imposto.toFixed(2)}%
                </Badge>
              </Group>

              {/* STATUS CUSTO OPERACIONAL */}
              <Group justify="space-between" p="sm" className={classes.statusRow}>
                <Text size="sm" fw={500}>Custo Operacional</Text>
                <Badge color="green" size="lg" variant="light">
                  R$ {valoresSalvos.custoOperacional.toFixed(2)}
                </Badge>
              </Group>
            </Stack>

            <Alert variant="light" color="blue" mt="xl" radius="md">
              <Text size="xs" c="dimmed">
                As comissões de anúncios Clássico e Premium são aplicadas automaticamente pelo sistema.
              </Text>
            </Alert>
          </Card>
        </Grid.Col>

      </Grid>
    </Container>
  );
}