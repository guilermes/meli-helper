import { Container, Title, Text, SimpleGrid, Paper, Button, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './About.module.css';

export default function About() {
  return (
    <div className={classes.pageWrapper}>
      <Container size="lg" py={60}>
        
        {/* Seção de Introdução */}
        <div className={classes.heroSection}>
          <Title className={classes.mainTitle}>
            Sobre o Meli<span className={classes.highlight}>Helper</span>
          </Title>
          <Text size="xl" className={classes.leadText} mt="md">
            Nascemos com a missão de empoderar os vendedores do Mercado Livre, transformando a complexidade do cálculo de frete e cubagem em pura margem de lucro.
          </Text>
        </div>

        {/* Grade de Recursos (O que o projeto faz) */}
        <Title order={2} className={classes.sectionTitle} mt={50} mb="xl">
          Nossos Pilares e Recursos
        </Title>
        
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          <Paper withBorder p="xl" radius="md" className={classes.card}>
            <Text className={classes.cardIcon}>📦</Text>
            <Text fw={700} size="lg" className={classes.cardTitle} mt="md">
              Gestão de Dimensões
            </Text>
            <Text size="sm" className={classes.cardDescription} mt="sm">
              Cadastre e monitore as medidas exatas ($L, A, C$) e o peso de cada produto de forma centralizada e sem complicações.
            </Text>
          </Paper>

          <Paper withBorder p="xl" radius="md" className={classes.card}>
            <Text className={classes.cardIcon}>📐</Text>
            <Text fw={700} size="lg" className={classes.cardTitle} mt="md">
              Cálculo de Cubagem
            </Text>
            <Text size="sm" className={classes.cardDescription} mt="sm">
              Descubra o peso cubado real dos seus anúncios e evite cobranças abusivas ou desalinhadas nas tabelas de frete da plataforma.
            </Text>
          </Paper>

          <Paper withBorder p="xl" radius="md" className={classes.card}>
            <Text className={classes.cardIcon}>💰</Text>
            <Text fw={700} size="lg" className={classes.cardTitle} mt="md">
              Margem de Lucro Real
            </Text>
            <Text size="sm" className={classes.cardDescription} mt="sm">
              Monitore a lucratividade líquida de cada venda. O sistema alerta você automaticamente quando um anúncio estiver operando com margens críticas.
            </Text>
          </Paper>
        </SimpleGrid>

        {/* Quem Somos */}
        <Paper withBorder p="xl" radius="md" className={classes.aboutUsCard} mt={50}>
          <Stack gap="md">
            <Title order={3} className={classes.aboutUsTitle}>
              Quem Somos
            </Title>
            <Text size="md" className={classes.aboutUsText}>
              O **MeliHelper** foi idealizado por especialistas em e-commerce que sentiram na pele a dor de perder dinheiro com surpresas na fatura de frete. Desenvolvemos esta ferramenta para ser o braço direito do seller, trazendo clareza matemática e automação para o seu dia a dia operacional.
            </Text>
          </Stack>
        </Paper>

        {/* Chamada para Ação Inferior */}
        <div className={classes.ctaSection} >
          <Title order={3} className={classes.ctaTitle}>
            Pronto para proteger sua operação?
          </Title>
          <Button 
            component={Link} 
            to="/signup" 
            size="lg" 
            className={classes.ctaButton}
            mt="md"
            radius="md"
          >
            Criar Minha Conta Grátis
          </Button>
        </div>

      </Container>
    </div>
  );
}