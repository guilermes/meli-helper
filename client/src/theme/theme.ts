import { createTheme } from '@mantine/core';

import { goldYellow } from './colors.ts';
import { typography } from './typography.ts';
import { radius } from './radius.ts';
import { shadows } from './shadows.ts';
import { components } from './components.ts';

export const theme = createTheme({
  primaryColor: 'goldYellow',

  primaryShade: {
    light: 5,
    dark: 5,
  },

  colors: {
    goldYellow,
  },

  black: '#0b0c0d',

  defaultRadius: 'md',

  fontFamily: typography.fontFamily,

  headings: typography.headings,

  radius,

  shadows,

  components,
});