// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createTheme,
  MantineProvider,
  MantineColorsTuple,
} from '@mantine/core';

import '@mantine/core/styles.css';
import './globals.css';

import App from './App';

const brandBlue: MantineColorsTuple = [
  '#eff6ff',
  '#dbeafe',
  '#bfdbfe',
  '#93c5fd',
  '#60a5fa',
  '#3b82f6',
  '#2563eb',
  '#1d4ed8',
  '#1e40af',
  '#1e3a8a',
];

const theme = createTheme({
  fontFamily: 'Inter, system-ui, sans-serif',

  primaryColor: 'brandBlue',

  colors: {
    brandBlue,
  },

  defaultRadius: 'md',

  black: '#0f1115',

  white: '#ffffff',

  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.05)',
    sm: '0 2px 4px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.12)',
    lg: '0 8px 24px rgba(0,0,0,0.16)',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },

      styles: {
        root: {
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
      },
    },

    Paper: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
        p: 'md',
      },
    },

    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },

    Input: {
      defaultProps: {
        radius: 'md',
        size: 'md',
      },
    },

    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },

    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
    },

    Modal: {
      defaultProps: {
        radius: 'lg',
        centered: true,
      },
    },

    AppShell: {
      styles: {
        main: {
          backgroundColor: '#0f1115',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);