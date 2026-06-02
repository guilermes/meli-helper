import { createTheme, MantineColorsTuple } from '@mantine/core';

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

export const theme = createTheme({
  primaryColor: 'brandBlue',
  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, sans-serif',
  colors: {
    brandBlue,
  },
  black: '#0f1115',
});
