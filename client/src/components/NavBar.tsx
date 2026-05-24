// src/components/NavBar.tsx
import { Group, Text, Container, Box } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box 
      component="nav" 
      style={{ 
        backgroundColor: '#090d16', 
        borderBottom: '1px solid #1e293b' 
      }}
      h={60}>

      <Container size="lg" h="100%">
        <Group justify="space-between" h="100%">
          <Text 
            component={Link} 
            to="/" 
            fw={800} 
            c="white" 
            size="lg" 
            className="no-underline tracking-tight"
          >
            Meli <span className="text-teal-400">Helper</span>
          </Text>
          
          <Group gap="md">
            <Link to="/produtos" className="text-sm font-medium text-gray-900 hover:text-white no-underline transition-colors">
              Anúncios
            </Link>
            <Link to="/login" className="text-sm font-medium text-gray-900 hover:text-white no-underline transition-colors">
              Acessar
            </Link>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}