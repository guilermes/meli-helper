import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  MantineProvider,
  ColorSchemeScript,
  localStorageColorSchemeManager,
} from '@mantine/core';

import '@mantine/core/styles.css';
import './styles/globals.css';

import App from './App';
import { theme } from './theme/theme.ts';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'meli-helper-color-scheme',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="dark" />

    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      colorSchemeManager={colorSchemeManager}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
