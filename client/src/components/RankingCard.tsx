// src/components/RankingMargem.tsx
import { Paper, Text } from '@mantine/core';
import classes from './RankingCard.module.css'; // 🌟 Importando os novos estilos

interface RankingItem {
  nome: string;
  margem: number;
}

interface RankingMargemProps {
  ranking: RankingItem[];
}

export function RankingCard({ ranking }: RankingMargemProps) {
  return (
    <Paper withBorder p="lg" radius="md" className={classes.card}>
      <Text fw={700} mb="md" className={classes.title}>
        🏆 Ranking de Margem
      </Text>
      
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th} style={{ width: '60px' }}>#</th>
            <th className={classes.th}>Produto</th>
            <th className={classes.th} style={{ width: '100px' }}>Margem</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((p, i) => {
            // Define a cor da margem dinamicamente via classe CSS
            const marginClass = p.margem > 0 ? classes.positive : classes.negative;

            return (
              <tr key={i} className={classes.tr}>
                <td className={`${classes.td} ${classes.rank}`}>
                  #{i + 1}
                </td>
                <td className={classes.td}>
                  {p.nome}
                </td>
                <td className={`${classes.td} ${classes.marginValue} ${marginClass}`}>
                  {p.margem.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Paper>
  );
}