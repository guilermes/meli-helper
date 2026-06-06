// src/components/ProductEditModal.tsx
import { Modal, Stack, Text, Grid, TextInput, NumberInput, Divider, Group, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Product } from './ProductTable';
import api from '../services/api';
import classes from './EditModal.module.css';

interface ProductEditModalProps {
  opened: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

export default function ProductEditModal({ opened, onClose, product, onSave }: ProductEditModalProps) {
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // Sincroniza o estado interno sempre que o produto selecionado mudar
  useEffect(() => {
    if (product) setEditedProduct({ ...product });
  }, [product]);

  if (!editedProduct) return null;

  const handleChange = (campo: keyof Product, valor: string | number) => {
    setEditedProduct((prev) => prev ? { ...prev, [campo]: valor } : null);
  };

  // 🌟 Função assíncrona para salvar as alterações no banco de dados (SQLite + Prisma)
  const handleSaveConfirm = async () => {
    if (!editedProduct) return;
    setSaveLoading(true);

    try {
      // Envia a atualização para a rota correta usando o ID do anúncio
      await api.put(`/anuncios/${editedProduct.id}`, editedProduct, {
        withCredentials: true, // Garante que os cookies sejam enviados junto com a requisição
        
      });

      // Se deu certo na API, executa a função de callback para atualizar a tela
      onSave(editedProduct);
    } catch (error) {
      console.error('Erro ao atualizar o anúncio:', error);
      alert('Não foi possível salvar as alterações. Verifique os dados e tente novamente.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar Anúncio"
      size="lg"
      centered
      classNames={{
        content: classes.modalContent,
        header: classes.modalHeader,
      }}
    >
      <Stack gap="xl" mt="md">
        {/* SEÇÃO 1: INFORMAÇÕES */}
        <div>
          <Text fw={600} c="blue.4" className={classes.sectionTitle}>
            Informações Gerais
          </Text>
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Nome do Produto"
                value={editedProduct.nome}
                onChange={(e) => handleChange('nome', e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Marca"
                value={editedProduct.marca}
                onChange={(e) => handleChange('marca', e.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
        </div>

        <Divider className={classes.divider} />

        {/* SEÇÃO 2: DIMENSÕES */}
        <div>
          <Text fw={600} c="orange.4" className={classes.sectionTitle}>
            Dimensões do Pacote
          </Text>
          <Grid gutter="sm">
            <Grid.Col span={3}>
              <NumberInput
                label="L (cm)"
                value={editedProduct.largura}
                onChange={(val) => handleChange('largura', typeof val === 'number' ? val : 0)}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="A (cm)"
                value={editedProduct.altura}
                onChange={(val) => handleChange('altura', typeof val === 'number' ? val : 0)}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="C (cm)"
                value={editedProduct.comprimento}
                onChange={(val) => handleChange('comprimento', typeof val === 'number' ? val : 0)}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="Peso (kg)"
                decimalScale={3}
                value={editedProduct.peso}
                onChange={(val) => handleChange('peso', typeof val === 'number' ? val : 0)}
              />
            </Grid.Col>
          </Grid>
        </div>

        <Divider className={classes.divider} />

        {/* SEÇÃO 3: VALORES */}
        <div>
          <Text fw={600} c="green.4" className={classes.sectionTitle}>
            Custos e Precificação
          </Text>
          <Grid gutter="md">
            <Grid.Col span={4}>
              <NumberInput
                label="Custo"
                prefix="R$ "
                decimalScale={2}
                value={editedProduct.custo}
                onChange={(val) => handleChange('custo', typeof val === 'number' ? val : 0)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Preço Venda"
                prefix="R$ "
                decimalScale={2}
                value={editedProduct.precoVenda}
                onChange={(val) => handleChange('precoVenda', typeof val === 'number' ? val : 0)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Frete"
                prefix="R$ "
                decimalScale={2}
                value={editedProduct.freteCalculado}
                onChange={(val) => handleChange('freteCalculado', typeof val === 'number' ? val : 0)}
              />
            </Grid.Col>
          </Grid>       
        </div>

        {/* AÇÕES */}
        <Group justify="flex-end" mt="xl" className={classes.actionsGroup}>
          <Button variant="subtle" color="gray" onClick={onClose} disabled={saveLoading}>
            Cancelar
          </Button>
          <Button color="green" onClick={handleSaveConfirm} loading={saveLoading}>
            Salvar Alterações
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}