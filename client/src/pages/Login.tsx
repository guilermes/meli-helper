// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Container } from '@mantine/core';
import { LoginForm } from '../components/LoginForm';
import classes from './Login.module.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const executarLogin = async (email: string, senha: string) => {
    setLoading(true);
    setErro(null);

    try {
      const res = await fetch('https://meli-helper-eahf03gej-guilermes-projects.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.erro || 'Falha ao realizar login');
      }

      const data = await res.json();

      // 🌟 Passa os dados do usuário para o contexto — alimenta avatar e nome na NavBar
      login(data.user);
      navigate('/dashboard');

    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <Container size="xs" className={classes.container}>
        <LoginForm
          onSubmit={executarLogin}
          loading={loading}
          erro={erro}
        />
      </Container>
    </div>
  );
}