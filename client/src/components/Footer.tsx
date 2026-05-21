// src/components/Footer.tsx
import { Text, Container, Group, Box } from '@mantine/core';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      style={{ 
        backgroundColor: '#090d16', 
        borderTop: '1px solid #1e293b',
        marginTop: 'auto' // Crucial para o Flexbox empurrar para o rodapé
      }}
    >
      <Container size="lg" py="md">
        <Group justify="space-between" className="flex-col sm:flex-row gap-2">
          <Text size="sm" style={{ color: '#94a3b8' }}>
            &copy; {new Date().getFullYear()} Meli Helper. Todos os direitos reservados.
          </Text>
          <Text size="xs" style={{ color: '#64748b' }} fw={500}>
            FATEC Votorantim &bull; DSM
          </Text>
        </Group>
      </Container>
    </Box>
  );
}