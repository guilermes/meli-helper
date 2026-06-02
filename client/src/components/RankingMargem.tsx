import { Card, Group, Text, Table } from '@mantine/core';
import classes from './RankingMargem.module.css'; // 👈 Importação local do CSS isolado!

interface RankingItem {
  id: string | number;
  nome: string;
  margem: number;
}

interface RankingMargemProps {
  ranking: RankingItem[];
}

export default function RankingMargem({ ranking }: RankingMargemProps) {
  return (
    <Card className={classes.card}>
      <Group mb="md">
        <Text fw={600} size="md">🏆 Ranking de Margem</Text>
      </Group>
      
      <Table className={classes.rankingTable}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th>Produto</Table.Th>
            <Table.Th>Margem</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {ranking.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td className={classes.monoFont}>{index + 1}</Table.Td>
              <Table.Td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.nome}
              </Table.Td>
              <Table.Td>
                <span className={item.margem >= 12 ? classes.badgeSuccess : classes.badgeDanger}>
                  {item.margem.toFixed(1)}%
                </span>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}