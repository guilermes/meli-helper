import { Table, ScrollArea, Paper, Button, Group, Badge, Text } from '@mantine/core';
import classes from './ProductTable.module.css';

// 1. Mantendo a sua interface original intacta para compatibilidade com o Backend
export interface Product {
  id: string;
  nome: string;
  marca: string;
  largura: number; // L
  altura: number;  // A
  comprimento: number; // C
  peso: number;
  pesoUsado: number;
  custo: number;
  precoVenda: number;
  freteCalculado: number;
  lucro: number;
  margemPorcentagem: number;
}

interface ProductTableProps {
  produtos: Product[];
  onEditar?: (produto: Product) => void;
  onExcluir?: (id: string) => void;
}

export default function ProductTable({ produtos, onEditar, onExcluir }: ProductTableProps) {
  
  // 2. Mapeamento das linhas com os estilos do CSS Module
  const rows = produtos.map((prod) => {
    // Alerta se a margem for menor que 15%
    const margemCritica = prod.margemPorcentagem < 15;

    return (
      <Table.Tr key={prod.id} className={classes.row}>
        <Table.Td className={classes.textId}>{prod.id}</Table.Td>
        <Table.Td className={classes.textName}>{prod.nome}</Table.Td>
        <Table.Td className={classes.textDimmed}>{prod.marca}</Table.Td>
        <Table.Td className={classes.textMain}>{prod.largura}cm</Table.Td>
        <Table.Td className={classes.textMain}>{prod.altura}cm</Table.Td>
        <Table.Td className={classes.textMain}>{prod.comprimento}cm</Table.Td>
        <Table.Td className={classes.textMain}>{prod.peso}kg</Table.Td>
        <Table.Td className={classes.textMain}>{prod.pesoUsado}kg</Table.Td>
        <Table.Td className={classes.textMain}>R$ {prod.custo.toFixed(2)}</Table.Td>
        <Table.Td className={classes.textMain}>R$ {prod.precoVenda.toFixed(2)}</Table.Td>
        <Table.Td className={classes.textDimmed}>R$ {prod.freteCalculado.toFixed(2)}</Table.Td>
        <Table.Td className={classes.textLucro}>R$ {prod.lucro.toFixed(2)}</Table.Td>
        <Table.Td>
          <Badge 
            variant={margemCritica ? 'filled' : 'outline'}
            className={margemCritica ? classes.badgeAlert : classes.badgeNormal}
          >
            {prod.margemPorcentagem.toFixed(1)}%
          </Badge>
        </Table.Td>
        <Table.Td>
          <Group gap="xs" justify="center" wrap="nowrap">
            <Button 
              size="xs" 
              variant="subtle" 
              className={classes.btnEditar}
              onClick={() => onEditar?.(prod)}
            >
              Editar
            </Button>
            <Button 
              size="xs" 
              variant="subtle" 
              className={classes.btnExcluir}
              onClick={() => onExcluir?.(prod.id)}
            >
              Excluir
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper withBorder p="md" radius="md" className={classes.paperContainer}>
      <ScrollArea>
        <Table 
          horizontalSpacing="md" 
          verticalSpacing="sm" 
          className={classes.table}
        >
          <Table.Thead className={classes.thead}>
            <Table.Tr>
              <Table.Th className={classes.th}>ID</Table.Th>
              <Table.Th className={classes.th}>Nome</Table.Th>
              <Table.Th className={classes.th}>Marca</Table.Th>
              <Table.Th className={classes.th}>L</Table.Th>
              <Table.Th className={classes.th}>A</Table.Th>
              <Table.Th className={classes.th}>C</Table.Th>
              <Table.Th className={classes.th}>Peso</Table.Th>
              <Table.Th className={classes.th}>P. Usado</Table.Th>
              <Table.Th className={classes.th}>Custo</Table.Th>
              <Table.Th className={classes.th}>Preço</Table.Th>
              <Table.Th className={classes.th}>Frete</Table.Th>
              <Table.Th className={classes.th}>Lucro</Table.Th>
              <Table.Th className={classes.th}>%</Table.Th>
              <Table.Th className={`${classes.th} ${classes.thCenter}`}>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={14}>
                  <Text className={classes.emptyText}>
                    Nenhum produto cadastrado ou monitorado no momento.
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}