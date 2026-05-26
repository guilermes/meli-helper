// src/pages/Signup.tsx
import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Title, 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack,
  Text
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function SignupForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (password !== confirmPassword) {
      setErro('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    setLoading(true);

    try {
      // O Axios já faz o JSON.stringify() por baixo dos panos e envia para baseURL + '/register'
      const response = await api.post('/register', { email, password });

      console.log('Usuário criado com sucesso:', response.data);
      
      // Redireciona para o login após o sucesso
      navigate('/login'); 
      
    } catch (err: any) {
      // O Axios armazena a resposta do servidor em err.response
      if (err.response && err.response.data) {
        // Captura a mensagem de erro que você configurou no backend (ex: res.status(400).json({ message: "..." }))
        setErro(err.response.data.message || 'Erro ao realizar o cadastro.');
      } else {
        setErro('Não foi possível conectar ao servidor. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" py="xl" mt={60}>
      <Paper 
        withBorder 
        shadow="md" 
        p="xl" 
        radius="md" 
        className="bg-slate-900 border-slate-800"
      >
        <Title order={2} ta="center" c="white" mb="xl">
          Criar Conta
        </Title>

        <form onSubmit={handleSubmit}>
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
              placeholder="Crie uma senha forte"
              required
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <PasswordInput
              label="Confirmar Senha"
              placeholder="Repita a senha anterior"
              required
              error={!!erro} 
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            />

            {erro && (
              <Text c="red.4" size="sm" fw={500} ta="center">
                {erro}
              </Text>
            )}

            <Button 
              type="submit" 
              color="teal" 
              fullWidth 
              mt="md"
              loading={loading}
            >
              Cadastrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}