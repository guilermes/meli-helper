import { Card, Group, Stack, Text } from '@mantine/core';
import classes from './AlertasOperacionais.module.css'; // 👈 Importação do arquivo de estilos local!

interface Alerta {
  id: number;
  tipo: 'error' | 'warning' | 'info';
  mensagem: string;
}

interface AlertasOperacionaisProps {
  alertas: Alerta[];
}

export default function AlertasOperacionais({ alertas }: AlertasOperacionaisProps) {
  return (
    <Card className={classes.card} style={{ height: '100%' }}>
      <Group mb="md">
        <Text fw={600} size="md">🔔 Alertas Inteligentes</Text>
      </Group>
      <Stack gap="sm">
        {alertas.length === 0 ? (
          <Text size="sm" c="dimmed">
            Nenhum alerta pendente no momento.
          </Text>
        ) : (
          alertas.map((alerta) => (
            <div 
              key={alerta.id} 
              className={alerta.tipo === 'warning' || alerta.tipo === 'error' ? classes.alertWarning : classes.alertInfo}
            >
              <span style={{ marginRight: '4px' }}>
                {alerta.tipo === 'info' ? 'ℹ️' : '⚠️'}
              </span>
              {alerta.mensagem}
            </div>
          ))
        )}
      </Stack>
    </Card>
  );
}