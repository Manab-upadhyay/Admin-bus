import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

const buses = [
  {
    id: "1",
    driver: "Sunil Joshi",
    route: "Route A",
    status: "On Time",
    statusColor: "success.main",
    fuelConsumption: "30",
  },
  {
    id: "2",
    driver: "Andrew McDownland",
    route: "Route B",
    status: "Delayed",
    statusColor: "warning.main",
    fuelConsumption: "45",
  },
  {
    id: "3",
    driver: "Christopher Jamil",
    route: "Route C",
    status: "Maintenance",
    statusColor: "error.main",
    fuelConsumption: "20",
  },
  {
    id: "4",
    driver: "Nirav Joshi",
    route: "Route D",
    status: "On Time",
    statusColor: "success.main",
    fuelConsumption: "25",
  },
];

const BusPerformance = () => {
  return (
    <BaseCard title="Bus Performance">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Bus ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Driver
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Route
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Fuel Consumption (L)
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {bus.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {bus.driver}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {bus.route}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: bus.statusColor,
                      color: "#fff",
                    }}
                    size="small"
                    label={bus.status}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{bus.fuelConsumption}L</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default BusPerformance;
