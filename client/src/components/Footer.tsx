// src/components/Footer.tsx
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <span className={classes.logo}>
          Meli<span className={classes.logoSpan}>Helper</span>
        </span>

        <span className={classes.copyright}>
          © {new Date().getFullYear()} MeliHelper. Projeto acadêmico — uso educacional.
        </span>

        <div className={classes.footerLinks}>
          <a href="/sobre" className={classes.footerLink}>Sobre</a>
          <a href="/login" className={classes.footerLink}>Login</a>
          <a href="/signup" className={classes.footerLink}>Cadastre-se</a>
        </div>
      </div>
    </footer>
  );
}