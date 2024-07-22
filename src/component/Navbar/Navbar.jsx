import React, { useState } from "react";
import { Avatar, Box, IconButton, Button, Badge, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from '../State/Authentication/Action';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import logo from '../../assets/logo.png';
export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    if (auth.user.role === "ROLE_STAFF") {
      navigate("/staff/jewelry/my-profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleNavigateToArea = (name, id) => {
    navigate(`/staff/jewelry/area/${name}/${id}`);
  };

  return (
    <Box className="navbar-container">
      <div className="logo-container" onClick={() => navigate("/staff/jewelry/Home")}>
        <img
          alt="Image"
          src={logo}
          className="logo"
        />
      </div>
      <div className="navbar-buttons">
        {["Sale", "BuyBack", "StockGold", "Guarantee"].map((item) => (
          <Button
            key={item}
            onClick={
              item === "Sale"
                ? () => handleNavigateToArea("sale",1) // Call handleNavigateToArea with appropriate parameters
                : () => navigate(`/staff/jewelry/${item.toLowerCase()}`)
            }
            sx={{
              color: "Black",
              fontWeight: "bold",
              fontSize: "20px",
              "&:hover": {
                bgcolor: "Black",
                color: "White",
              },
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="navbar-icons">
        <div className="avatar-container">
          {auth.user ? (
            <>
              <Avatar
                onClick={handleAvatarClick}
                sx={{
                  bgcolor: "white",
                  color: grey.A400,
                  cursor: "pointer",
                }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleAccountClick}>Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              onClick={handleLogout}
              sx={{ color: "white", cursor: "pointer" }}
            >
              <PersonIcon />
            </IconButton>
          )}
        </div>
        <IconButton onClick={() => navigate("/staff/jewelry/cart")}>
          <Badge badgeContent={cart.cart?.items.length} color="secondary">
            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "black" }} />
          </Badge>
        </IconButton>
      </div>
    </Box>
  );
};
