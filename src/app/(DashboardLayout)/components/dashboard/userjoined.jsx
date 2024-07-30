import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

const UsersJoined = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('http://localhost:6969/api/getUsers');
        const result = await res.json();
    
        setUser(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getData();
  }, []); // Dependency array added here

  return (
    <BaseCard title="Users Joined">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
          maxHeight: 400,
          overflowY: 'auto'
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
                  User ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                 Last login
                </Typography>
              </TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((users) => (
              <TableRow key={users._id}> {/* Use _id if your MongoDB schema uses _id */}
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {users._id} {/* Use _id if your MongoDB schema uses _id */}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {users.username}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {users.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {users.lastLogin}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Avatar src={users.avatar} alt={users.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default UsersJoined;
