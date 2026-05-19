// src/components/ProductTable.tsx
import { Table, ScrollArea, Paper, Button, Group, ActionIcon, Badge } from '@mantine/core';

// 1. Definimos a interface do Produto com as medidas e valores do seu e-commerce
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
  preco: number;
  frete: number;
  lucro: number;
  margemPorcentagem: number;
}

interface ProductTableProps {
  produtos: Product[];
  onEditar?: (produto: Product) => void;
  onExcluir?: (id: string) => void;
}

export default function ProductTable({ produtos, onEditar, onExcluir }: ProductTableProps) {
  
  // 2. Mapeamos os dados recebidos do backend para gerar as linhas da tabela dinamicamente
  const rows = produtos.map((prod) => {
    // Cálculo de cor para a margem de lucro (ex: se for menor que 15%, fica laranja, senão verde)
    const corMargem = prod.margemPorcentagem < 15 ? 'orange' : 'teal';

    return (
      <Table.Tr key={prod.id} className="hover:bg-slate-800/50 transition-colors">
        <Table.Td className="text-slate-400 text-xs">{prod.id}</Table.Td>
        <Table.Td className="font-semibold text-white">{prod.nome}</Table.Td>
        <Table.Td className="text-slate-300">{prod.marca}</Table.Td>
        <Table.Td>{prod.largura}cm</Table.Td>
        <Table.Td>{prod.altura}cm</Table.Td>
        <Table.Td>{prod.comprimento}cm</Table.Td>
        <Table.Td>{prod.peso}kg</Table.Td>
        <Table.Td>{prod.pesoUsado}kg</Table.Td>
        <Table.Td>R$ {prod.custo.toFixed(2)}</Table.Td>
        <Table.Td className="text-teal-400 font-medium">R$ {prod.preco.toFixed(2)}</Table.Td>
        <Table.Td className="text-slate-400">R$ {prod.frete.toFixed(2)}</Table.Td>
        <Table.Td className="text-green-400 font-bold">R$ {prod.lucro.toFixed(2)}</Table.Td>
        <Table.Td>
          <Badge color={corMargem} variant="light">
            {prod.margemPorcentagem.toFixed(1)}%
          </Badge>
        </Table.Td>
        <Table.Td>
          {/* Botões de Ação discretos */}
          <Group gap="xs" justify="center">
            <Button 
              size="xs" 
              variant="light" 
              color="blue" 
              onClick={() => onEditar?.(prod)}
            >
              Editar
            </Button>
            <Button 
              size="xs" 
              variant="light" 
              color="red" 
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
    <Paper withBorder p="md" radius="md" className="bg-slate-900 border-slate-800">
      {/* O ScrollArea impede que colunas sumam em telas de celular, criando um scroll horizontal elegante */}
      <ScrollArea>
        <Table 
          horizontalSpacing="md" 
          verticalSpacing="sm" 
          textAlign="center"
          className="text-slate-200"
        >
          {/* Cabeçalho fixado com estilo dark moderno */}
          <Table.Thead className="bg-slate-950 border-b border-slate-800 text-slate-300">
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Nome</Table.Th>
              <Table.Th>Marca</Table.Th>
              <Table.Th>L</Table.Th>
              <Table.Th>A</Table.Th>
              <Table.Th>C</Table.Th>
              <Table.Th>Peso</Table.Th>
              <Table.Th>P. Usado</Table.Th>
              <Table.Th>Custo</Table.Th>
              <Table.Th>Preço</Table.Th>
              <Table.Th>Frete</Table.Th>
              <Table.Th>Lucro</Table.Th>
              <Table.Th>%</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>

          {/* Corpo da Tabela */}
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={14} className="text-slate-500 py-6">
                  Nenhum produto cadastrado ou monitorado no momento.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

