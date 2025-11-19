import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Topbar({ dark, setDark, toggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setAnchorEl(null);
  };

  const goSettings = () => {
    navigate("/settings");
    setAnchorEl(null);
  };
  const goProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };
  const goRegister = () => {
    navigate("/register");
    setAnchorEl(null);
  };
  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar>
        <IconButton sx={{ mr: 2 }} onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Dashboard
        </Typography>

        <IconButton onClick={() => setDark(!dark)}>
          {dark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Notification bell (Zoho style) */}
        <IconButton sx={{ mx: 1, "&:hover": { color: "#6A5ACD" } }}>
          <NotificationsOutlinedIcon />
        </IconButton>

        {/* Settings icon */}
        <IconButton sx={{ mx: 1, "&:hover": { color: "#6A5ACD" } }}>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            ml: 1,
            "&:hover": { transform: "scale(1.05)", transition: "0.2s" },
          }}
        >
          <Avatar sx={{ bgcolor: "#6A5ACD" }}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={goProfile}>Profile</MenuItem>
          <MenuItem onClick={goSettings}>Settings</MenuItem>

          {!user && <MenuItem onClick={goRegister}>Register</MenuItem>}

          {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
