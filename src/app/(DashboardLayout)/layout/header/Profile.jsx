"use client"
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import jwt from "jsonwebtoken";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stack } from "@mui/system";
import {
  IconChevronDown,
  IconCreditCard,
  IconCurrencyDollar,
  IconMail,
  IconShield,
} from "@tabler/icons-react";
import Modal from "../../ui-components/buttons/modal";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [model, setModel] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token);
        console.log(decodedToken);
        if (decodedToken && decodedToken.admin.name) {
          setName(decodedToken.admin.name);
          console.log(name)
        }
      }
    };
    getToken();
  }, []);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logout = () => {
    setModel(true);
  };

  const handleClose = () => {
    setModel(false);
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      toast.success("Logged out");
      window.location.reload();
    } else {
      console.log("No token found");
    }
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const error = theme.palette.error.main;
  const errorlight = theme.palette.error.light;
  const success = theme.palette.success.main;
  const successlight = theme.palette.success.light;

  /* Profile data */
  const profileData = [
    {
      href: "/",
      title: "My Profile",
      subtitle: "Account Settings",
      icon: <IconCurrencyDollar width="20" height="20" />,
      color: primary,
      lightcolor: primarylight,
    },
    {
      href: "/",
      title: "My Inbox",
      subtitle: "Messages & Emails",
      icon: <IconShield width="20" height="20" />,
      color: success,
      lightcolor: successlight,
    },
    {
      href: "/",
      title: "My Tasks",
      subtitle: "To-do and Daily Tasks",
      icon: <IconCreditCard width="20" height="20" />,
      color: error,
      lightcolor: errorlight,
    },
  ];

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/users/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi, {name}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          ></Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt: 0,
          },
        }}
      >
        <Box pt={0}></Box>
        <Divider />
        <Box mt={2}>
          <Button fullWidth variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        </Box>
        <Modal show={model} handleClose={handleClose} handleConfirm={handleLogout}>
          <p>Do you want to log out?</p>
        </Modal>
      </Menu>
      <ToastContainer />
    </Box>
  );
};

export default Profile;
