import { useState, FormEvent } from 'react';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Select,
  PasswordInput,
  Button,
  Stack
} from '@mantine/core';
import classes from './SignupForm.module.css';

interface SignupFormProps {
  onSubmit: (nome: string, nomeLoja: string, email: string, password: string, nicho: string, nivelSeller: string) => void;
  loading: boolean;
  erro: string | null;
}

export function SignupForm({ onSubmit, loading, erro }: SignupFormProps) {
  const [nome, setNome] = useState('');
  const [nomeLoja, setNomeLoja] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nicho, setNicho] = useState('');
  const [nivelSeller, setNivelSeller] = useState(''); // Seu estado se chama nivelSeller
  const [erroLocal, setErroLocal] = useState<string | null>(null);

  const lidarComSubmissao = (e: FormEvent) => {
    e.preventDefault();
    setErroLocal(null);

    if (senha !== confirmarSenha) {
      setErroLocal('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    // CORREÇÃO AQUI: Trocado 'nivel' por 'nivelSeller' para bater com o estado e a assinatura
    onSubmit(nome, nomeLoja, email, senha, nicho, nivelSeller);
  };

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
            label="Nome"
            placeholder="Nome"
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.currentTarget.value)}
            disabled={loading}
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
            }}
          />
          <TextInput
            label="Nome da Loja"
            placeholder="Nome da Loja"
            type="text"
            required
            value={nomeLoja}
            onChange={(e) => setNomeLoja(e.currentTarget.value)}
            disabled={loading}
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
            }}
          />
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
            value={senha}
            onChange={(e) => setSenha(e.currentTarget.value)}
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
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.currentTarget.value)}
            disabled={loading}
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
              innerInput: classes.innerInput,
            }}
          />
          <Select
            label="Nicho:"
            placeholder="Selecione"
            data={['Automotivo', 'Beleza', 'Casa', 'Eletrônicos', 'Esportes', 'Moda', 'Pet Shop']}
            clearable
            value={nicho}
            onChange={(value) => setNicho(value || '')}
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
            }}
          />
          <Select
            label="Nível:"
            placeholder="Selecione"
            data={['Iniciante', 'Intermediário', 'Avançado']}
            clearable
            value={nivelSeller}
            onChange={(value) => setNivelSeller(value || '')}
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
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
            color="brandBlue"
          >
            Cadastrar e Começar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}