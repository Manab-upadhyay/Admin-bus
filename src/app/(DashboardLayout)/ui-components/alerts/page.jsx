'use client';
import {
    Paper,
    Grid,
    Stack,
    Alert,
    AlertTitle
} from '@mui/material';
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { useEffect, useState } from 'react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function getAlerts() {
      const response = await fetch('http://localhost:6969/alert');
      const result = await response.json();
      setAlerts(result);
      console.log(result);
    }
    getAlerts();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Alerts">
          <Stack spacing={2}>
            {alerts.length > 0 ? alerts.map((alert, index) => (
              <Alert key={index} severity={alert?.Type}>
                <AlertTitle>{formatDate(alert?.timestamp)}</AlertTitle>
                {alert?.Message}
              </Alert>
            )) : (
              <Alert severity="info">No alerts available</Alert>
            )}
          </Stack>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Alerts;
