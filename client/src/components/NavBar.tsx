// src/components/NavBar.tsx
import { Menu, Avatar, UnstyledButton } from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { ThemeToggle } from './ThemeToggler';
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
        <Link to="/" className={classes.logoLink}>
          Meli<span className={classes.logoSpan}>Helper</span>
        </Link>
      </div>

      <div className={classes.navContent}>
        <div className={classes.navLinks}>
          {isLogado ? (
            <>
              {LINKS_LOGADO.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  className={`${classes.link} ${isActive(href) ? classes.activeLink : ''
                    }`}
                >
                  {label}
                </Link>
              ))}
            </>
          ) : (
            <>
              {LINKS_DESLOGADO.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  className={`${classes.link} ${isActive(href) ? classes.activeLink : ''
                    }`}
                >
                  {label}
                </Link>
              ))}
            </>
          )}
        </div>

        <div className={classes.actions}>
          <ThemeToggle />

          {isLogado && (
            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className={classes.userButton}>
                  <Avatar
                    src={user?.avatar || null}
                    radius="xl"
                    size="sm"
                    color="brandBlue"
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
          )}
        </div>
      </div>
    </nav>
  );
}