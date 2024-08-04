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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('http://localhost:6969/api/getUsers');
        const result = await res.json();

        // Sort users by lastLogin date, assuming it's a valid date string
        const sortedUsers = result.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));

        setUsers(sortedUsers);
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
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Avatar
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}> {/* Use _id if your MongoDB schema uses _id */}
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {user._id} {/* Use _id if your MongoDB schema uses _id */}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {user.username}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {user.lastLogin}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.username} />
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
