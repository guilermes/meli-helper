import { MantineThemeOverride } from '@mantine/core';

export const components: MantineThemeOverride['components'] = {
  Button: {
    defaultProps: {
      radius: 'md',
    },

    styles: () => ({
      root: {
        fontWeight: 600,

        transition:
          'transform 0.2s ease, box-shadow 0.2s ease',

        '&:hover': {
          transform: 'translateY(-1px)',
        },
      },
    }),
  },

  Card: {
    defaultProps: {
      radius: 'lg',
      withBorder: true,
      padding: 'lg',
    },

    styles: () => ({
      root: {
        transition:
          'transform 0.2s ease, border-color 0.2s ease',

        '&:hover': {
          transform: 'translateY(-2px)',
        },
      },
    }),
  },

  Input: {
    defaultProps: {
      radius: 'md',
    },
  },

  Textarea: {
    defaultProps: {
      radius: 'md',
    },
  },

  Select: {
    defaultProps: {
      radius: 'md',
    },
  },

  Paper: {
    defaultProps: {
      radius: 'lg',
    },
  },

  Modal: {
    defaultProps: {
      radius: 'lg',
    },
  },
};