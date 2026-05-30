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

  // 🌟 PASSO 1: Puxa a função de login de dentro do nosso Contexto Global
  const { login } = useAuth();

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

      // 🌟 PASSO 2: Substituímos o localStorage manual pela função do contexto.
      // Ela vai guardar o token com a chave correta E avisar a NavBar imediatamente!
      login(data.token);
      
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