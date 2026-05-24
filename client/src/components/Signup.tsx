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

export default function Signup() {
  // Estados para controlar os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados para gerenciar feedback visual
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validação básica: as senhas precisam ser idênticas
    if (password !== confirmPassword) {
      setErro('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    setLoading(true);

    // Aqui entrará a chamada de criação de usuário do seu backend (ex: POST /api/signup)
    console.log('Criando conta com:', { email, password });

    // Simulando o tempo de resposta do servidor
    setTimeout(() => {
      setLoading(false);
      // Aqui você poderia redirecionar o usuário para o /login usando o useNavigate() do React Router
    }, 1500);
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
              // O Mantine aceita uma prop de erro integrada. Se houver erro, o input fica vermelho automaticamente!
              error={!!erro} 
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            />

            {/* Mensagem de erro amigável caso as senhas estejam diferentes */}
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