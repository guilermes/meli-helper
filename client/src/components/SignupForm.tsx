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
import classes from './SignupForm.module.css';

interface SignupFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  erro: string | null;
}

export function SignupForm({ onSubmit, loading, erro }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erroLocal, setErroLocal] = useState<string | null>(null);

  const lidarComSubmissao = (e: FormEvent) => {
    e.preventDefault();
    setErroLocal(null);

    if (password !== confirmPassword) {
      setErroLocal('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    onSubmit(email, password);
  };

  // Prioriza o erro vindo da API/Pai, se não houver, mostra o erro de validação local
  const erroExibido = erro || erroLocal;

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
          Criar Conta no Meli<span className={classes.highlight}>Helper</span>
        </Title>
        <Text size="sm" className={classes.subtitle}>
          Comece a gerenciar suas dimensões e proteger seu lucro
        </Text>
      </Stack>

      {/* Caixa de feedback de erro customizada */}
      {erroExibido && (
        <Paper p="xs" mb="md" radius="sm" className={classes.errorBox}>
          <Text size="xs" fw={500} ta="center">
            {erroExibido}
          </Text>
        </Paper>
      )}

      <form onSubmit={lidarComSubmissao}>
        <Stack gap="md">
          <TextInput
            label="E-mail"
            placeholder="seu@email.com"
            type="email"
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
            placeholder="Crie uma senha forte"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            disabled={loading}
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
              innerInput: classes.innerInput,
            }}
          />

          <PasswordInput
            label="Confirmar Senha"
            placeholder="Repita a senha anterior"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
            Cadastrar e Começar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}