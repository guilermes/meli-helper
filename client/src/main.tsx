// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';

// Lembre-se de sempre importar os estilos antes do app rodar!
import '@mantine/core/styles.css';
import './globals.css'; 

import App from './App';

const theme = createTheme({
  primaryColor: 'teal',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);