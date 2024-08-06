import React, { useEffect, useState } from "react";
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

const BusPerformance = () => {
  const [bus, setBus] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:6969/api/bus-data");
        const result = await res.json();
        setBus(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Running":
        return "success.main"; 
      case "Stopped":
      case "Cancelled":
        return "error.main"; 
      default:
        return "default"; 
    }
  };

  return (
    <BaseCard title="Bus Performance">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
          maxHeight: 400, // Set a maximum height for the container
          overflowY: 'auto', // Enable vertical scrolling
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
                  Starting
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Destination
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Timing
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
            {bus?.map((buses,index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {buses?.busId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {buses?.driverName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {buses?.starting}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {buses?.destination}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {buses?.timing}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: getStatusColor(buses?.status),
                      color: "#fff",
                    }}
                    size="small"
                    label={buses?.status}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{buses?.fuelConsumption}L</Typography>
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
