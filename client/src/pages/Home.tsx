import { Hero } from '../components/Hero';
import classes from './Home.module.css'; // <-- Importando o novo estilo modular

export default function Home() {
  return (
    <main className={classes.homeLayout}>
      <Hero />
    </main>
  );
}