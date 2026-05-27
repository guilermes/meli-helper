import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Group, Badge } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <div className={classes.heroWrapper}>
      <Container size="md" className={classes.container}>
        <div className={classes.inner}>

          <Badge
            variant="filled"
            className={classes.badge}
            size="lg"
          >
            Mercado Livre Inteligente
          </Badge>

          <Title className={classes.title}>
            Sua ferramenta definitiva para gerenciar{' '}
            <span className={classes.highlight}>dimensões</span> e maximizar seu{' '}
            <span className={classes.highlight}>lucro</span>.
          </Title>

          <Text className={classes.description} size="xl" mt="xl">
            Calcule a cubagem de frete com precisão, evite cobranças abusivas
            e proteja sua margem de lucro na maior plataforma de e-commerce da América Latina.
          </Text>

          <Group className={classes.controls} mt={35}>
            <Button
              size="lg"
              className={classes.controlPrimary}
              radius="md"
              component={Link}
              to="/cadastro"
            >
              Começar Agora Grátis
            </Button>
            <Button
              component={Link}
              to="/about" // ou "/sobre"
              size="lg"
              variant="outline"
              className={classes.controlSecondary}
              radius="md"
            >
              Conhecer Recursos
            </Button>
        </Group>

    </div>
      </Container >
    </div >
  );
}