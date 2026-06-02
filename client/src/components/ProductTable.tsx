// src/components/ProductTable.tsx
import { useState } from 'react';
import { Table, Group, ActionIcon, Modal, Button, Text, Stack, Badge, Paper } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import api from '../services/api';
import ProductEditModal from './EditModal';
import classes from './ProductTable.module.css';

export interface Product {
  id: string;
  idMercadoLivre?: string;
  tipoAnuncio?: string;
  nome: string;
  marca: string;
  largura: number;
  altura: number;
  comprimento: number;
  peso: number;
  pesoUsado?: number;
  custo: number;
  precoVenda: number;
  freteCalculado: number;
  lucro?: number;
  margemPorcentagem?: number;
}

interface ProductTableProps {
  prod: Product[];
  onRefresh: () => void;
  onProductUpdated: (updatedProduct: Product) => void;
}

// 🌟 DEFESA 1: Definimos que se 'products' não vier, ele assume um array vazio [] por padrão
export default function ProductTable({ prod = [], onRefresh, onProductUpdated }: ProductTableProps) {
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setDeleteLoading(true);

    try {
      const tokenRaw = localStorage.getItem('token');
      const token = tokenRaw ? tokenRaw.replace(/^"(.*)"$/, '$1') : '';

      await api.delete(`/anuncios/${productToDelete.id}`, {
        withCredentials: true, // Garante que os cookies sejam enviados junto com a requisição
        headers: { Authorization: `Bearer ${token}` },
      });

      setProductToDelete(null);
      onRefresh();
    } catch (error) {
      console.error('Erro ao deletar anúncio:', error);
      alert('Não foi possível excluir o anúncio. Tente novamente.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Paper className={classes.paperContainer}>
        <Table verticalSpacing="sm" className={classes.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tipo</Table.Th>
              <Table.Th>Nome</Table.Th>
              <Table.Th>Marca</Table.Th>
              <Table.Th>Preço Venda</Table.Th>
              <Table.Th>Custo</Table.Th>
              <Table.Th>Frete</Table.Th>
              <Table.Th>Lucro</Table.Th>
              <Table.Th>Margem</Table.Th>
              <Table.Th style={{ textAlign: 'center' }}>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {/* 🌟 DEFESA 2: Usamos o '?.' para garantir que o React não quebre se a lista sumir por um instante */}
            {prod?.map((prod) => (
              <Table.Tr key={prod.id} className={classes.row}>
                <Table.Td>
                  <Badge className={prod.tipoAnuncio === 'CLASSICO' ? classes.badgeClassic : classes.badgePremium}>
                    {prod.tipoAnuncio}
                  </Badge>
                </Table.Td>
                <Table.Td fw={500}>{prod.nome}</Table.Td>
                <Table.Td c="dimmed">{prod.marca}</Table.Td>
                <Table.Td>R$ {prod.precoVenda?.toFixed(2) ?? '0,00'}</Table.Td>
                <Table.Td>R$ {prod.custo?.toFixed(2) ?? '0,00'}</Table.Td>
                <Table.Td>R$ {prod.freteCalculado?.toFixed(2) ?? '0,00'}</Table.Td>
                <Table.Td c={prod.lucro && prod.lucro > 0 ? 'green.4' : 'red.4'}>
                  R$ {prod.lucro?.toFixed(2) ?? '0,00'}
                </Table.Td>
                <Table.Td>{prod.margemPorcentagem?.toFixed(1) ?? '0.0'}%</Table.Td>

                <Table.Td>
                  <Group gap="xs" justify="center">
                    <ActionIcon
                      variant="subtle"
                      color="brandBlue"
                      title="Editar Anúncio"
                      onClick={() => setProductToEdit(prod)}
                    >
                      <IconEdit size={18} stroke={1.8} />
                    </ActionIcon>

                    <ActionIcon
                      variant="subtle"
                      color="red"
                      title="Excluir Anúncio"
                      onClick={() => setProductToDelete(prod)}
                    >
                      <IconTrash size={18} stroke={1.8} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {productToEdit && (
        <ProductEditModal
          opened={!!productToEdit}
          onClose={() => setProductToEdit(null)}
          product={productToEdit}
          onSave={(updatedProduct) => {
            // 🌟 O GRANDE TRUQUE:
            onProductUpdated(updatedProduct); // 1. Atualiza o React localmente (Instantâneo)
            setProductToEdit(null);
          }}
        />
      )}

      <Modal
        opened={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Confirmar Exclusão"
        centered
        radius="md"
        size="sm"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Stack gap="lg" pt="xs">
          <Text size="sm">
            Tem certeza que deseja excluir o anúncio <strong>{productToDelete?.nome}</strong>?
            Esta ação é permanente e não poderá ser desfeita no banco de dados.
          </Text>

          <Group justify="flex-end" gap="sm">
            <Button
              variant="light"
              color="gray"
              onClick={() => setProductToDelete(null)}
              disabled={deleteLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="filled"
              color="red"
              onClick={handleDeleteConfirm}
              loading={deleteLoading}
            >
              Excluir Anúncio
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}