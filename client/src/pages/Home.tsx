// src/pages/Home.tsx
import { Hero } from '../components/Hero';
import classes from './Home.module.css';

export default function Home() {
  return (
    <main className={classes.homeLayout}>
      <Hero />
    </main>
  );
}