import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mantine/core';
import { LoginForm } from '../components/LoginForm';
import classes from './Login.module.css'; // <-- Importando o estilo modular

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

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

      localStorage.setItem("token", data.token);
      navigate('/produtos');

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