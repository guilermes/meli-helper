import React from 'react';
import classes from './NavBar.module.css'; // Importação do CSS Module

export default function NavBar() {
  return (
    <nav className={classes.navBar}>
      <div className={classes.logo}>
        <a href="/" className={` ${classes.logoLink}`}>Meli<span className={classes.logoSpan}>Helper</span></a>
      </div>
      
      <div className={classes.navLinks}>
        <a href="/login" className={`${classes.link} ${classes.activeLink}`}>Login</a>
        <a href="/cadastro" className={classes.link}>Cadastre-se</a>
        <a href="/sobre" className={classes.link}>Sobre</a>
      </div>
    </nav>
  );
}