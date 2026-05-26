import React from 'react';
import { Container, Title, Text, Anchor } from '@mantine/core';
import SignupForm from '../components/SignupForm'; // Ajuste o caminho conforme sua estrutura

export default function RegisterPage() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2} fw={900}>
        Criar nova conta
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Já tem uma conta?{' '}
        <Anchor size="sm" component="button" type="button">
          Faça login
        </Anchor>
      </Text>

      {/* Renderização do componente de formulário isolado */}
      <SignupForm />
    </Container>
  );
}