import React from "react";
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

const users = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    joined: "2024-06-01",
    avatar: "/path/to/avatar1.jpg",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    joined: "2024-06-02",
    avatar: "/path/to/avatar2.jpg",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    joined: "2024-06-03",
    avatar: "/path/to/avatar3.jpg",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@example.com",
    joined: "2024-06-04",
    avatar: "/path/to/avatar4.jpg",
  },
];

const UsersJoined = () => {
  return (
    <BaseCard title="Users Joined">
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
                  Joined Date
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
              <TableRow key={user.id}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {user.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {user.name}
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
                    {user.joined}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.name} />
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
