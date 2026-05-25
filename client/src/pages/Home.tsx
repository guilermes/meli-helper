// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Paper,
  Group,
  Stack
} from '@mantine/core';

export default function Home() {

  return (
    <Container size="lg" py="xl" mt={30} className="flex-grow">

      <Paper
        p="xl"
        radius="md"
        className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 mb-12 text-center sm:text-left"
      >
        <GridOrStackContainer />


      </Paper>
    </Container>


  );
}


export function GridOrStackContainer() {
  return (
    <Group justify="space-between" align="center" className="flex-col sm:flex-row gap-6 p-4">
      <Stack gap="xs" className="max-w-xl">
        <Title order={1} className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
          Bem-vindo ao <span className="text-teal-400">Meli Helper</span>
        </Title>
        < Text size="lg" c="slate.300">
          Sua ferramenta definitiva para gerenciar dimensões, calcular cubagem de frete e maximizar sua margem de lucro no Mercado Livre.
        </Text>
      </Stack>

      <Button
        component={Link}
        to="/login"
        size="lg"
        color="teal"
        className="shadow-lg shadow-teal-950/50"
      >
        Acessar Painel
      </Button>
    </Group>
  );
}