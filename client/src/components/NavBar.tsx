// src/components/NavBar.tsx
import { Menu, Avatar, UnstyledButton } from '@mantine/core';
import { useAuth } from '../context/authContext'; // 🌟 Importe o Hook
import classes from './NavBar.module.css';

export default function NavBar() {
  // 🌟 Agora o estado vem do contexto global!
  const { isLogado, logout } = useAuth();

  const lidarComLogout = () => {
    logout(); // Limpa o estado e o localStorage
    window.location.href = '/login'; 
  };

  return (
    <nav className={classes.navBar}>
      <div className={classes.logo}>
        <a href="/" className={classes.logoLink}>Meli<span className={classes.logoSpan}>Helper</span></a>
      </div>
      
      <div className={classes.navLinks}>
        {isLogado ? (
          <>
            <a href="/dashboard" className={classes.link}>Dashboard</a>
            <a href="/config" className={classes.link}>Configurações</a>
            
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className={classes.userButton}>
                  <Avatar radius="xl" size="sm" color="blue">G</Avatar>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Minha Conta</Menu.Label>
                <Menu.Item component="a" href="/perfil">Meu Perfil</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" onClick={lidarComLogout}>Sair da Conta</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <>
            <a href="/login" className={`${classes.link} ${classes.activeLink}`}>Login</a>
            <a href="/cadastro" className={classes.link}>Cadastre-se</a>
            <a href="/sobre" className={classes.link}>Sobre</a>
          </>
        )}
      </div>
    </nav>
  );
}