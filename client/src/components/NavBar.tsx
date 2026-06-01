// src/components/NavBar.tsx
import { Menu, Avatar, UnstyledButton } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import classes from './NavBar.module.css';

const LINKS_DESLOGADO = [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Cadastre-se' },
  { href: '/sobre', label: 'Sobre' },
];

const LINKS_LOGADO = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/anuncios', label: 'Anúncios' },
  { href: '/config', label: 'Configurações' },
];

export default function NavBar() {
  const { isLogado, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => location.pathname === href;

  // Iniciais para fallback do avatar
  const iniciais = user?.nome
    ? user.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <nav className={classes.navBar}>
      <div className={classes.logo}>
        <a href="/" className={classes.logoLink}>
          Meli<span className={classes.logoSpan}>Helper</span>
        </a>
      </div>

      <div className={classes.navLinks}>
        {isLogado ? (
          <>
            {LINKS_LOGADO.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`${classes.link} ${isActive(href) ? classes.activeLink : ''}`}
              >
                {label}
              </a>
            ))}

            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className={classes.userButton}>
                  <Avatar
                    src={user?.avatar || null}
                    radius="xl"
                    size="sm"
                    color="red"
                    className={classes.avatar}
                  >
                    {iniciais}
                  </Avatar>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown className={classes.menuDropdown}>
                <Menu.Label className={classes.menuLabel}>
                  {user?.nome || 'Minha Conta'}
                </Menu.Label>
                <Menu.Item
                  className={classes.menuItem}
                  onClick={() => navigate('/perfil')}
                >
                  Meu Perfil
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  className={classes.menuItemRed}
                  onClick={logout}
                >
                  Sair da Conta
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <>
            {LINKS_DESLOGADO.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`${classes.link} ${isActive(href) ? classes.activeLink : ''}`}
              >
                {label}
              </a>
            ))}
          </>
        )}
      </div>
    </nav>
  );
}