import { useState } from 'react';
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
  Alert,
} from '@mantine/core';
import classes from "./Config.module.css";

// Definição da interface para manter o TypeScript feliz
interface ConfigData {
  imposto: number;
  custoOperacional: number;
}

export default function Config() {
  // Estado do formulário (o que o usuário digita)
  const [formValores, setFormValores] = useState<ConfigData>({
    imposto: 6.0,
    custoOperacional: 5.0,
  });

  // Estado consolidado (o que já foi salvo)
  const [valoresSalvos, setValoresSalvos] = useState<ConfigData>({
    imposto: 6.0,
    custoOperacional: 5.0,
  });

  const [mensagem, setMensagem] = useState<string>('');

  const lidarComSalvar = (e: React.FormEvent) => {
    e.preventDefault(); // Evita o recarregamento padrão do form HTML
    setValoresSalvos(formValores);
    setMensagem('Configurações salvas com sucesso no sistema!');

    setTimeout(() => setMensagem(''), 3000);
  };

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
                  label="Imposto (%)"
                  placeholder="Ex: 6"
                  decimalScale={2}
                  fixedDecimalScale
                  leftSection={<Text size="sm" c="dimmed">%</Text>}
                  value={formValores.imposto}
                  onChange={(val) => setFormValores(prev => ({ ...prev, imposto: Number(val) }))}
                />

                {/* INPUT CUSTO OPERACIONAL */}
                <NumberInput
                  label="Custo Operacional"
                  placeholder="Ex: 5"
                  decimalScale={2}
                  fixedDecimalScale
                  leftSection={<Text size="sm" c="dimmed">R$</Text>}
                  value={formValores.custoOperacional}
                  onChange={(val) => setFormValores(prev => ({ ...prev, custoOperacional: Number(val) }))}
                />

                {/* BOTÃO SALVAR */}
                <Button
                  type="submit"
                  fullWidth
                  mt="md"
                >
                  Salvar Configuração
                </Button>

              </Stack>
            </form>

            {/* FEEDBACK DE SUCESSO */}
            {mensagem && (
              <Text c="green" fw={600} ta="center" mt="md" className={classes.successFeedback}>
                {mensagem}
              </Text>
            )}

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
                <Group gap="xs">
                  <Text size="sm" fw={500}>Imposto</Text>
                </Group>
                <Badge color="orange" size="lg" variant="light">
                  {valoresSalvos.imposto.toFixed(2)}%
                </Badge>
              </Group>

              {/* STATUS CUSTO OPERACIONAL */}
              <Group justify="space-between" p="sm" className={classes.statusRow}>
                <Group gap="xs">
                  <Text size="sm" fw={500}>Custo Operacional</Text>
                </Group>
                <Badge color="green" size="lg" variant="light">
                  R$ {valoresSalvos.custoOperacional.toFixed(2)}
                </Badge>
              </Group>

            </Stack>

            {/* ALERTA INFORMATIVO */}
            <Alert
              variant="light"
              color="blue"
              mt="xl"
              radius="md"
            >
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