// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mantine/core';
import { LoginForm } from '../components/LoginForm';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  // Esta função será injetada e disparada de dentro do LoginForm
  const executarLogin = async (email: string, senha: string) => {
    setLoading(true);
    setErro(null);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.erro || 'Falha ao realizar login');
      }

      // 🔐 Armazena o token JWT da sessão
      localStorage.setItem("token", data.token);

      // Redireciona o usuário de forma limpa via SPA
      navigate('/produtos');

    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" my={80}>
      {/* 
        Invocamos o componente de apresentação passando os dados necessários
        e a função que lida com a chamada da API (o contrato das Props)
      */}
      <LoginForm 
        onSubmit={executarLogin} 
        loading={loading} 
        erro={erro} 
      />
    </Container>
  );
}