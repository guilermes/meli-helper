// src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mantine/core';
import { AxiosError } from 'axios';

import { useAuth } from '../context/authContext';
import { LoginForm } from '../components/LoginForm';
import api from '../services/api';

import classes from './Login.module.css';

interface LoginResponse {
  user: {
    id: number;
    nome: string;
    nomeLoja?: string;
    email: string;
    avatar?: string;
  };

  mensagem?: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const navigate = useNavigate();

  const { login } = useAuth();

  const executarLogin = async (
    email: string,
    senha: string
  ) => {
    try {
      setLoading(true);
      setErro(null);

      const res = await api.post<LoginResponse>(
        '/login',
        {
          email,
          senha,
        }
      );

      const data = res.data;

      console.log('LOGIN RESPONSE:', data);

      // 🌟 Cookie HttpOnly já é salvo automaticamente pelo navegador
      // Não usamos mais localStorage nem token manual

      // Salva usuário no contexto
      login(data.user);

      // Redireciona para dashboard
      navigate('/dashboard');

    } catch (error) {
      const err = error as AxiosError<{
        erro?: string;
        message?: string;
      }>;

      const mensagemErro =
        err.response?.data?.erro ||
        err.response?.data?.message ||
        'Não foi possível realizar login.';

      setErro(mensagemErro);

      console.error('ERRO LOGIN:', err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <Container
        size={420}
        className={classes.container}
      >
        <LoginForm
          onSubmit={executarLogin}
          loading={loading}
          erro={erro}
        />
      </Container>
    </div>
  );
}