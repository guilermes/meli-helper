// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; 
import './globals.css'; 

import App from './App';

const theme = createTheme({
  // Define a fonte padrão (Inter, que você já usava)
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',

  // Define a cor primária dos botões e destaques (Apontando para a paleta vermelha)
  primaryColor: 'brandRed',

  // Customização da escala de cores
  colors: {
    // Criamos uma paleta de vermelhos minimalistas (do mais claro ao mais escuro)
    brandRed: [
      '#fff5f5', // 0
      '#ffe3e3', // 1
      '#ffc9c9', // 2
      '#ffa8a8', // 3
      '#ff8787', // 4
      '#ff6b6b', // 5
      '#fa5252', // 6
      '#e03131', // 7 - Cor padrão de destaque (Vermelho elegante, não muito vivo)
      '#c92a2a', // 8 - Hover do botão
      '#b01e1e', // 9
    ],
    // Sobrescrevemos ou usamos os cinzas do Mantine que já são excelentes
  },

  // Ajustes de componentes globais para o estilo minimalista
  components: {
    Button: {
      defaultProps: {
        radius: 'md', // Bordas ligeiramente arredondadas, mas limpas
      },
    },
    Input: {
      defaultProps: {
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);