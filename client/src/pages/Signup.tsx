import { useState } from 'react';
import { Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { SignupForm } from '../components/SignupForm';
import classes from './Signup.module.css';

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const lidarComCadastro = async (
    nome: string,
    nomeLoja: string,
    email: string,
    senha: string,
    nicho: string,
    nivelSeller: string
  ) => {
    try {
      setLoading(true);
      setErro(null);

      const response = await api.post('/register', {
        nome,
        nomeLoja,
        email,
        senha,
        nicho,
        nivelSeller,
      });

      console.log('Usuário criado com sucesso:', response.data);

      navigate('/login');
    } catch (err: any) {
      const mensagemErro =
        err?.response?.data?.message ||
        'Não foi possível realizar o cadastro.';

      setErro(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Container size={420} className={classes.container}>
        <SignupForm
          onSubmit={lidarComCadastro}
          loading={loading}
          erro={erro}
        />
      </Container>
    </div>
  );
}