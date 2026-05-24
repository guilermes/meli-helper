// src/components/ProductEditModal.tsx
import { Modal, Stack, Text, Grid, TextInput, NumberInput, Divider, Group, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Product } from './Table';

interface ProductEditModalProps {
  opened: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

export function ProductEditModal({ opened, onClose, product, onSave }: ProductEditModalProps) {
  // Estado interno para controlar a edição local sem afetar a tabela antes da hora
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  // Toda vez que o modal abrir com um produto novo, atualiza o estado interno
  useEffect(() => {
    if (product) setEditedProduct({ ...product });
  }, [product]);

  if (!editedProduct) return null;

  const handleChange = (campo: keyof Product, valor: string | number) => {
    setEditedProduct((prev) => prev ? { ...prev, [campo]: valor } : null);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar Anúncio"
      size="lg"
      centered
      styles={{
        content: { backgroundColor: '#1e293b', color: '#fff' },
        header: { backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }
      }}
    >
      <Stack gap="xl" mt="md">
        {/* SEÇÃO 1: INFORMAÇÕES */}
        <div>
          <Text fw={600} c="blue.4" size="xs" mb="sm" className="uppercase tracking-wider">
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

        <Divider className="border-slate-700" />

        {/* SEÇÃO 2: DIMENSÕES */}
        <div>
          <Text fw={600} c="orange.4" size="xs" mb="sm" className="uppercase tracking-wider">
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

        <Divider className="border-slate-700" />

        {/* SEÇÃO 3: VALORES */}
        <div>
          <Text fw={600} c="green.4" size="xs" mb="sm" className="uppercase tracking-wider">
            Custos e Precificação
          </Text>
          {/* Trecho dos inputs de Precificação dentro do seu ProductEditModal.tsx */}
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
        <Group justify="flex-end" mt="xl" className="pt-4 border-t border-slate-700">
          <Button variant="subtle" color="gray" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="green" onClick={() => onSave(editedProduct)}>
            Salvar Alterações
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}