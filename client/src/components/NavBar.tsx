// src/components/NavBar.tsx
import { Group, Button, Text, Container } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar(){
  // O useLocation nos diz em qual rota o usuário está neste momento (ex: "/" ou "/config")
  const location = useLocation();

  return (
    <header className="bg-slate-950 border-b border-slate-800 p-4">
      {/* Container para manter o menu alinhado com as margens do resto da página */}
      <Container size="lg" className="flex justify-between items-center">
        
        {/* BRAND / LOGO: Direciona para a Home */}
        <Text 
          component={Link} 
          to="/" 
          className="text-white font-bold text-xl tracking-wide cursor-pointer hover:text-teal-400 transition-colors"
        >
          Meli Helper
        </Text>

        {/* LISTA DE LINKS: Organizados horizontalmente usando o Group do Mantine */}
        <Group gap="sm">
          {/* Link para a Home */}
          <Button 
            component={Link} 
            to="/" 
            variant="subtle"
            // Se a URL do navegador for exatamente "/", destaca o botão
            color={location.pathname === '/' ? 'white' : 'gray'}
          >
            Home
          </Button>

          {/* Link para as Configurações */}
          <Button 
            component={Link} 
            to="/config" 
            variant="subtle"
            color={location.pathname === '/config' ? 'white' : 'gray'}
          >
            Config
          </Button>

          {/* Link para o Login (Botão com visual de destaque) */}
          <Button 
            component={Link} 
            to="/login" 
            variant={location.pathname === '/login' ? 'filled' : 'light'} 
            color="teal"
          >
            Login
          </Button>
        </Group>

      </Container>
    </header>
  );
}