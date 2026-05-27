import React from 'react';
import classes from './Footer.module.css'; // Importação do CSS Module

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <span className={classes.copyright}>
          © {new Date().getFullYear()} MeuApp. Todos os direitos reservados.
        </span>
        
        <div className={classes.footerLinks}>
          <a href="#" className={classes.footerLink}>Termos de Uso</a>
          <a href="#" className={classes.footerLink}>Privacidade</a>
          <a href="#" className={classes.footerLink}>Suporte</a>
        </div>
      </div>
    </footer>
  );
}