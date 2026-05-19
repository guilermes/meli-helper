// src/pages/Login.tsx
import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Title, 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack 
} from '@mantine/core';

export default function Login() {
  // Criamos os estados do React para controlar o formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Aqui entrará a chamada da sua API futuramente
    console.log('Dados enviados:', { email, password });

    // Simula uma resposta do backend após 1.5 segundos
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    // Container centraliza o formulário na tela com tamanho controlado ('xs' = extra small)
    <Container size="xs" py="xl" mt={60}>
      <Paper 
        withBorder 
        shadow="md" 
        p="xl" 
        radius="md" 
        className="bg-slate-900 border-slate-800"
      >
        <Title order={2} ta="center" c="white" mb="xl">
          Login
        </Title>

        <form onSubmit={handleSubmit}>
          {/* Stack distribui um espaçamento vertical uniforme entre os elementos */}
          <Stack gap="md">
            <TextInput
              label="E-mail"
              placeholder="seu@email.com"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />

            <PasswordInput
              label="Senha"
              placeholder="Sua senha secreta"
              required
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <Button 
              type="submit" 
              color="teal" 
              fullWidth 
              mt="md"
              loading={loading} // Se estiver true, mostra um spinner de carregamento automático!
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}