// src/components/LoginForm.tsx
import { useState, FormEvent } from 'react';
import { 
  Paper, 
  Title, 
  Text, 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack 
} from '@mantine/core';

// Definimos o contrato do que o componente precisa receber para funcionar
interface LoginFormProps {
  onSubmit: (email: string, senha: string) => void;
  loading: boolean;
  erro: string | null;
}

export function LoginForm({ onSubmit, loading, erro }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const lidarComSubmissao = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email, senha);
  };

  return (
    <Paper 
      withBorder 
      shadow="md" 
      p="xl" 
      radius="md" 
      className="bg-slate-900 border-slate-800"
    >
      <Stack gap="xs" align="center" mb="lg">
        <Title order={2} c="white" className="tracking-tight">
          Meli Helper
        </Title>
        <Text size="sm" c="slate.400">
          Entre com suas credenciais para acessar o painel
        </Text>
      </Stack>

      {/* Caixa de feedback de erro */}
      {erro && (
        <Paper p="xs" mb="md" radius="sm" className="bg-red-950/40 border border-red-800/60">
          <Text size="xs" c="red.4" fw={500} ta="center">
            {erro}
          </Text>
        </Paper>
      )}

      <form onSubmit={lidarComSubmissao}>
        <Stack gap="md">
          <TextInput
            label="E-mail"
            placeholder="seu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            disabled={loading}
          />

          <PasswordInput
            label="Senha"
            placeholder="Sua senha secreta"
            required
            value={senha}
            onChange={(e) => setSenha(e.currentTarget.value)}
            disabled={loading}
          />

          <Button 
            type="submit" 
            color="teal" 
            fullWidth 
            mt="md"
            loading={loading}
          >
            Entrar no Sistema
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}