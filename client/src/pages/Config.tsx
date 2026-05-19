// src/pages/Config.tsx
import { useState } from 'react';
import { Container, Grid, Text } from '@mantine/core';
import { ConfigForm, ConfigData } from '../components/ConfigForm';
import { ConfigPreview } from '../components/ConfigPreview';

export default function Config() {
  // Estado que monitora o que está sendo digitado no formulário
  const [formValores, setFormValores] = useState<ConfigData>({
    comissao: 0,
    imposto: 0,
    custoOperacional: 0,
  });

  // Estado que guarda as configurações consolidadas (após clicar em Salvar)
  const [valoresSalvos, setValoresSalvos] = useState<ConfigData>({
    comissao: 5.5, // Valores fictícios iniciais para simular dados vindos do backend
    imposto: 12.0,
    custoOperacional: 1500.0,
  });

  const [mensagem, setMensagem] = useState<string>('');

  const lidarComSalvar = () => {
    // Atualiza o painel de exibição com os dados digitados
    setValoresSalvos(formValores);
    setMensagem('Configurações salvas com sucesso no sistema!');
    
    // Limpa a mensagem após 3 segundos
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <Container size="lg" py="xl">
      {/* Sistema de Grid nativo do Mantine, sem usar classes externas */}
      <Grid gutter="xl">
        
        {/* Lado Esquerdo: Formulário */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ConfigForm 
            valores={formValores} 
            onChangeValores={setFormValores} 
            onSalvar={lidarComSalvar}
          />
          
          {/* Exibição condicional da mensagem de feedback */}
          {mensagem && (
            <Text c="green" fw={600} ta="center" mt="md" className="animate-pulse">
              {mensagem}
            </Text>
          )}
        </Grid.Col>

        {/* Lado Direito: Preview atual dos dados */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ConfigPreview valoresSalvos={valoresSalvos} />
        </Grid.Col>

      </Grid>
    </Container>
  );
}