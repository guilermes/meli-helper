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
import classes from './LoginForm.module.css';

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
      shadow="xl" 
      p="xl" 
      radius="md" 
      className={classes.card}
    >
      <Stack gap="xs" align="center" mb="lg">
        <Title order={2} className={classes.title}>
          Meli<span className={classes.highlight}>Helper</span>
        </Title>
        <Text size="sm" className={classes.subtitle}>
          Entre com suas credenciais para acessar o painel
        </Text>
      </Stack>

      {/* Caixa de feedback de erro customizada */}
      {erro && (
        <Paper p="xs" mb="md" radius="sm" className={classes.errorBox}>
          <Text size="xs" fw={500} ta="center">
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
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
            }}
          />

          <PasswordInput
            label="Senha"
            placeholder="Sua senha secreta"
            required
            value={senha}
            onChange={(e) => setSenha(e.currentTarget.value)}
            disabled={loading}
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
              innerInput: classes.innerInput,
            }}
          />

          <Button 
            type="submit" 
            fullWidth 
            mt="md"
            loading={loading}
            className={classes.buttonSubmit}
            radius="md"
            size="md"
          >
            Entrar no Sistema
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}