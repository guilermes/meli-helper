import { useState } from 'react';
import { Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { SignupForm } from '../components/SignupForm';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const lidarComCadastro = async (nome: string, nomeLoja: string, email: string, 
    password: string, nicho: string, nivelSeller: string) => {
    setLoading(true);
    setErro(null);

    try {
      const response = await api.post('/register', { nome, nomeLoja, email, password, nicho, nivelSeller });
      console.log('Usuário criado com sucesso:', response.data);
      
      // Cadastro feito com sucesso? Empurra para o login!
      navigate('/login'); 
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErro(err.response.data.message || 'Erro ao realizar o cadastro.');
      } else {
        setErro('Não foi possível conectar ao servidor. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Estilização direta de layout estrutural na página
    <div style={{ backgroundColor: '#0b0c0d', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container size="xs" py="xl" style={{ width: '100%' }}>
        <SignupForm 
          onSubmit={lidarComCadastro} 
          loading={loading} 
          erro={erro} 
        />
      </Container>
    </div>
  );
}