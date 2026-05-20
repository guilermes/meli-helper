// src/components/Footer.tsx
import { Container, Text, Group, Anchor } from '@mantine/core';

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-6 mt-auto">
      <Container size="lg">
        {/* Distribui o texto de copyright e links extras de forma responsiva */}
        <Group justify="space-between" className="flex-col sm:flex-row gap-4">
          
          <Text size="sm" c="slate.400" ta={{ base: 'center', sm: 'left' }}>
            &copy; {anoAtual} <span className="text-teal-400 font-medium">Meli Helper</span>. Todos os direitos reservados.
          </Text>

          {/* Links úteis do rodapé (Opcional, mas dá um visual super profissional) */}
          <Group gap="xl" justify="center">
            <Anchor 
              href="https://github.com" 
              target="_blank" 
              size="sm" 
              c="gray.5" 
              className="hover:text-teal-400 transition-colors"
            >
              Documentação
            </Anchor>
            <Anchor 
              href="#" 
              size="sm" 
              c="gray.5" 
              className="hover:text-teal-400 transition-colors"
            >
              Suporte
            </Anchor>
          </Group>

        </Group>
      </Container>
    </footer>
  );
}