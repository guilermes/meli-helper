import { useState, FormEvent, useEffect } from 'react';
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
  Divider,
  Loader,
  Notification
} from '@mantine/core';
import classes from './Profile.module.css';
import api from '../services/api';

interface UserProfile {
  nome: string;
  nomeLoja: string;
  email: string;
}

interface Marketplaces {
  mercadoLivre: boolean;
  shopee: boolean;
}

export default function Profile() {
  // Estado dos dados cadastrais vindo do backend
  const [formData, setFormData] = useState<UserProfile>({
    nome: '',
    nomeLoja: '',
    email: '',
  });

  // O estado do avatar guardará a string Base64 ou null se não houver foto
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Estado das integrações de marketplaces (Simulação local sustentada)
  const [integracoes, setIntegracoes] = useState<Marketplaces>({
    mercadoLivre: true,
    shopee: false,
  });

  const [carregando, setCarregando] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  // Função auxiliar para converter o arquivo binário selecionado em String Base64
  const converterParaBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = (error) => reject(error);
    });
  };

  // 🔍 BUSCAR DADOS DO PERFIL (Ao carregar a página)
  useEffect(() => {
    const buscarDadosPerfil = async () => {
      try {
        setCarregando(true);
        const response = await api.get('/profile');

        setFormData({
          nome: response.data.nome || '',
          nomeLoja: response.data.nomeLoja || '',
          email: response.data.email || '',
        });

        // Se o banco de dados já possuir uma string Base64 salva, injeta no estado
        if (response.data.avatar) {
          setAvatarUrl(response.data.avatar);
        }
      } catch (error: any) {
        setMensagem({
          tipo: 'erro',
          texto: error.response?.data?.erro || 'Erro ao carregar dados do perfil.'
        });
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosPerfil();
  }, []);

  // 📸 PROCESSAR A ESCOLHA DA FOTO
  const lidarComFoto = async (file: File | null) => {
    if (file) {
      try {
        const base64String = await converterParaBase64(file);
        setAvatarUrl(base64String); // Atualiza o preview e guarda o Base64 para enviar no submit
      } catch (error) {
        setMensagem({ tipo: 'erro', texto: 'Erro ao processar o arquivo de imagem.' });
      }
    }
  };

  // 💾 SALVAR ALTERAÇÕES (Texto + Foto Base64)
  const lidarComSalvarPerfil = async (e: FormEvent) => {
    e.preventDefault();
    setMensagem(null);

    try {
      const response = await api.put('/update-profile', {
        nome: formData.nome,
        nomeLoja: formData.nomeLoja,
        avatar: avatarUrl // Envia a string Base64 (ou null caso não tenha)
      });

      setMensagem({
        tipo: 'sucesso',
        texto: response.data.mensagem || 'Perfil atualizado com sucesso!'
      });

      // Limpa a notificação de sucesso após 4 segundos
      setTimeout(() => setMensagem(null), 4000);
    } catch (error: any) {
      setMensagem({
        tipo: 'erro',
        texto: error.response?.data?.erro || 'Falha ao atualizar o perfil.'
      });
    }
  };

  // Alternar o vínculo do marketplace (Simulação visual de tela)
  const alternarMarketplace = (plataforma: keyof Marketplaces) => {
    setIntegracoes((prev) => ({
      ...prev,
      [plataforma]: !prev[plataforma],
    }));
  };

  if (carregando) {
    return (
      <Group justify="center" style={{ height: '50vh' }}>
        <Loader color="red" size="lg" />
      </Group>
    );
  }

  return (
    <>
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

        {/* NOTIFICAÇÃO DE FEEDBACK */}
        {mensagem && (
          <Notification
            color={mensagem.tipo === 'sucesso' ? 'green' : 'red'}
            onClose={() => setMensagem(null)}
            mb="md"
          >
            {mensagem.texto}
          </Notification>
        )}

        <Grid gap="xl">

          {/* ================= COLUNA ESQUERDA: FOTO E INTEGRAÇÕES ================= */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">

              {/* CARD DA FOTO */}
              <Card shadow="sm" radius="md" withBorder className={classes.avatarContainer}>
                {/* 🌟 Fallback automático: Se avatarUrl for null, exibe a primeira letra com fundo Red */}
                <Avatar
                  src={avatarUrl}
                  size={120}
                  radius={120}
                  mx="auto"
                  mb="md"
                  color="red"
                >
                  {formData.nome?.charAt(0).toUpperCase()}
                </Avatar>

                <Title order={4} fw={600}>
                  {formData.nome || 'Usuário'}
                </Title>
                <Text size="sm" c="dimmed" mb="lg">
                  {formData.nomeLoja || 'Sem Loja Vinculada'}
                </Text>

                <FileButton onChange={lidarComFoto} accept="image/png,image/jpeg">
                  {(props) => (
                    <Button {...props} variant="light" color="red" size="xs" fullWidth>
                      Alterar Foto
                    </Button>
                  )}
                </FileButton>
              </Card>

              {/* CARD DE MARKETPLACES (Recuperado) */}
              <Card shadow="sm" radius="md" withBorder className={classes.integrationCard}>
                <Text fw={600} size="md" mb="xs" c="red">
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
                      color="red"
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
                      color="red"
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
            <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.integrationCard}>

              <Text fw={600} size="lg" c="red" mb="md">
                Dados Cadastrais
              </Text>
              <Divider mb="lg" />

              <form onSubmit={lidarComSalvarPerfil}>
                <Grid gap="md">

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
                      value={formData.email}
                      disabled
                    />
                  </Grid.Col>

                  <Grid.Col span={12} mt="md">
                    <Group justify="flex-end">
                      <Button type="submit" color="red" px="xl">
                        Salvar Alterações
                      </Button>
                    </Group>
                  </Grid.Col>

                </Grid>
              </form>
            </Card>
          </Grid.Col>

        </Grid>
      </Container>
    </>
  );
}