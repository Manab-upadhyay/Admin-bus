'use client';
import {
    Paper,
    Grid,
    Stack,
    Alert,
    AlertTitle
} from '@mui/material';
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import Modal from '../buttons/modal';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [model, setModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    async function getAlerts() {
      const response = await fetch('http://localhost:6969/alert');
      const result = await response.json();
      setAlerts(result);
      console.log(result);
    }
    getAlerts();
  }, []);
  
  function handleDelete() {
   console.log("clicked")
    setModel(true);
    console.log(model)
  }

  async function handleConfirm() {
    try {
      const res = await fetch("http://localhost:6969/api/delete/alert", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
      const result = await res.json();
      console.log(result);

      setModel(false);
      setAlerts('');
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    setModel(false);
   
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Grid container spacing={3}>
      <Grid  item xs={12} lg={12}>
      
        <BaseCard title="Alerts">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MdDelete
              className="cursor-pointer"
              onClick={handleDelete}
              style={{ marginBottom: '16px', fontSize: '24px' }}
            />
          </div>
          <Stack spacing={2}>
            {alerts.length > 0 ? alerts.map((alert, index) => (
              <Alert key={index} severity={alert?.Type}>
                <AlertTitle>
                  {formatDate(alert?.timestamp)}
                
                </AlertTitle>
                {alert?.Message}
              </Alert>
            )) : (
              <Alert severity="info">No alerts available</Alert>
            )}
          </Stack>
        </BaseCard>
      </Grid>
      <Modal show={model} handleClose={handleClose} handleConfirm={handleConfirm}>

     {alerts.length>0&&<p>Want to delete all alerts</p>}
    {alerts.length==0 &&<p>No allerts vailable</p>}
      </Modal>
    </Grid>
  );
};

export default Alerts;
