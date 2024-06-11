'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

import BusPerformanceOverview from '@/app/(DashboardLayout)/components/dashboard/functionoverview';
import DailyActivity from '@/app/(DashboardLayout)/components/dashboard/DailyActivity';
import BusPerformance from '@/app/(DashboardLayout)/components/dashboard/busperformance';
import UsersJoined from './components/dashboard/userjoined';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BusPerformanceOverview />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <BusPerformance />
        </Grid>
        <Grid item xs={12} lg={8}>
         <UsersJoined/>
        </Grid>
        <Grid item xs={12} lg={12}>
         
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}

export default Dashboard;
