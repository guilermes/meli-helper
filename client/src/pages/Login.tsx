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
    id: number,
    nome: string;
    email: string;
    avatar?: string;
  };

  token?: string;
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

      // Caso exista token
      if (data.token) {
        localStorage.setItem(
          'token',
          data.token
        );
      }

      // Salva usuário no contexto
      login(data.user);
      api.get('/dashboard'); // Testa se token é válido
      navigate('/dashboard');

    } catch (error) {
      const err = error as AxiosError<{
        message?: string;
      }>;

      const mensagemErro =
        err.response?.data?.message ||
        'Não foi possível realizar login.';

      setErro(mensagemErro);

      console.error(err);

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