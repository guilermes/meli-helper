import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

import {
  IconMoon,
  IconSun,
} from '@tabler/icons-react';

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme('dark');

  const isDark = computedColorScheme === 'dark';

  return (
    <ActionIcon
      onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
      variant="subtle"
      color="brandBlue"
      radius="xl"
      size="lg"
      aria-label="Alternar tema"
    >
      {isDark ? (
        <IconSun size={18} stroke={1.8} />
      ) : (
        <IconMoon size={18} stroke={1.8} />
      )}
    </ActionIcon>
  );
}
