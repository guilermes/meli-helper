import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  Text,
  Title,
  TextInput,
  Button,
  Group,
  Stack,
  Avatar,
  FileButton,
  Badge,
  Divider,
} from '@mantine/core';
import classes from './Profile.module.css';

interface UserProfile {
  nome: string;
  nomeLoja: string;
  email: string;
  telefone: string;
}

interface Marketplaces {
  mercadoLivre: boolean;
  shopee: boolean;
}

export default function Profile() {
  // Estado dos dados cadastrais
  const [formData, setFormData] = useState<UserProfile>({
    nome: 'Guilherme Silva',
    nomeLoja: 'Meli Helper Store',
    email: 'guilherme@email.com',
    telefone: '(15) 99999-9999',
  });

  // Estado da foto de perfil (inicia com uma string vazia ou placeholder)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Estado das integrações de marketplaces
  const [integracoes, setIntegracoes] = useState<Marketplaces>({
    mercadoLivre: true, // Começa simulando que o Mercado Livre já está conectado
    shopee: false,
  });

  const [mensagem, setMensagem] = useState<string>('');

  // Manipulador para o upload da foto (Gera um preview local)
  const lidarComFoto = (file: File | null) => {
    if (file) {
      const urlPreview = URL.createObjectURL(file);
      setAvatarUrl(urlPreview);
      setMensagem('Foto de perfil atualizada localmente!');
      setTimeout(() => setMensagem(''), 3000);
    }
  };

  // Salvar dados do formulário
  const lidarComSalvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('Alterações de perfil salvas com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  // Alternar o vínculo do marketplace (Simulação)
  const alternarMarketplace = (plataforma: keyof Marketplaces) => {
    setIntegracoes((prev) => ({
      ...prev,
      [plataforma]: !prev[plataforma],
    }));
  };

  return (
    <Container size="lg" py="xl">
      
      {/* ================= HEADER ================= */}
      <Stack gap={2} mb="xl">
        <Title order={3} fw={600}>
          Meu Perfil
        </Title>
        <Text size="sm" c="dimmed">
          Gerencie suas informações pessoais, dados da loja e conexões com marketplaces
        </Text>
      </Stack>

      <Grid gutter="xl">
        
        {/* ================= COLUNA ESQUERDA: FOTO E INTEGRAÇÕES ================= */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="lg">
            
            {/* CARD DA FOTO */}
            <Card shadow="sm" radius="md" withBorder className={classes.avatarContainer}>
              <Avatar
                src={avatarUrl}
                size={120}
                radius={120}
                mx="auto"
                mb="md"
                color="blue"
              >
                {formData.nome.charAt(0)}
              </Avatar>
              
              <Title order={4} fw={600}>
                {formData.nome}
              </Title>
              <Text size="sm" c="dimmed" mb="lg">
                {formData.nomeLoja}
              </Text>

              <FileButton onChange={lidarComFoto} accept="image/png,image/jpeg">
                {(props) => (
                  <Button {...props} variant="light" color="blue" size="xs" fullWidth>
                    Alterar Foto
                  </Button>
                )}
              </FileButton>
            </Card>

            {/* CARD DE MARKETPLACES */}
            <Card shadow="sm" radius="md" withBorder className={classes.integrationCard}>
              <Text fw={600} size="md" mb="xs" c="blue">
                Marketplaces Vinculados
              </Text>
              <Text size="xs" c="dimmed" mb="md">
                Conecte suas contas para sincronizar anúncios automaticamente
              </Text>

              <Stack gap="sm">
                
                {/* MERCADO LIVRE */}
                <Group justify="space-between" className={classes.marketplaceRow}>
                  <Stack gap={0}>
                    <Text size="sm" fw={600}>Mercado Livre</Text>
                    <Text size="xs" c="dimmed">Sincronização de anúncios</Text>
                  </Stack>
                  <Button
                    size="xs"
                    variant={integracoes.mercadoLivre ? 'light' : 'filled'}
                    color={integracoes.mercadoLivre ? 'red' : 'blue'}
                    onClick={() => alternarMarketplace('mercadoLivre')}
                  >
                    {integracoes.mercadoLivre ? 'Desconectar' : 'Conectar'}
                  </Button>
                </Group>

                {/* SHOPEE */}
                <Group justify="space-between" className={classes.marketplaceRow}>
                  <Stack gap={0}>
                    <Text size="sm" fw={600}>Shopee</Text>
                    <Text size="xs" c="dimmed">Painel de envios externos</Text>
                  </Stack>
                  <Button
                    size="xs"
                    variant={integracoes.shopee ? 'light' : 'filled'}
                    color={integracoes.shopee ? 'red' : 'blue'}
                    onClick={() => alternarMarketplace('shopee')}
                  >
                    {integracoes.shopee ? 'Desconectar' : 'Conectar'}
                  </Button>
                </Group>

              </Stack>
            </Card>

          </Stack>
        </Grid.Col>

        {/* ================= COLUNA DIREITA: FORMULÁRIO DE DADOS ================= */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            
            <Text fw={600} size="lg" c="blue" mb="md">
              Dados Cadastrais
            </Text>
            <Divider mb="lg" />

            <form onSubmit={lidarComSalvarPerfil}>
              <Grid gutter="md">
                
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Seu Nome"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Nome da Loja"
                    placeholder="Ex: Minha Loja E-commerce"
                    value={formData.nomeLoja}
                    onChange={(e) => setFormData({ ...formData, nomeLoja: e.target.value })}
                    required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="E-mail"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Telefone / WhatsApp"
                    placeholder="Ex: (15) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  />
                </Grid.Col>

                <Grid.Col span={12} mt="md">
                  <Group justify="flex-end">
                    <Button type="submit" color="blue" px="xl">
                      Salvar Alterações
                    </Button>
                  </Group>
                </Grid.Col>

              </Grid>
            </form>

            {/* FEEDBACK DE SUCESSO */}
            {mensagem && (
              <Text c="green" fw={600} ta="center" mt="md">
                {mensagem}
              </Text>
            )}

          </Card>
        </Grid.Col>

      </Grid>
    </Container>
  );
}