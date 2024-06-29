import React from "react";
import { Avatar, Box, IconButton, Button, Badge } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";

export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user.role === "ROLE_STAFF") {
      navigate("/my-profile");
    } else {
      navigate("/admin/jewelry");
    }
  };

  const handleSaleClick = () => {
    const orderHereSection = document.getElementById("order-here");
    if (orderHereSection) {
      orderHereSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className="navbar-container">
      <div className="logo-container" onClick={() => navigate("/")}>
        <img
          src="https://cdn.pnj.io/images/logo/pnj.com.vn.png"
          alt="PNJ Logo"
          className="logo"
        />
      </div>
      <div className="navbar-buttons">
        {["Sale", "BuyBack", "StockGold", "Guarantee"].map((item) => (
          <Button
            key={item}
            onClick={
              item === "Sale"
                ? handleSaleClick // Chỉ định handleSaleClick cho nút "Sale"
                : () => navigate(`/${item.toLowerCase()}`)
            }
            sx={{
              color: "Black",
              fontWeight: "bold",
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
            <Avatar
              onClick={handleAvatarClick}
              sx={{
                bgcolor: "white",
                color: blue.A400,
                cursor: "pointer",
              }}
            >
              {auth.user?.fullname[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton
              onClick={() => navigate("/account/login")}
              sx={{ color: "white", cursor: "pointer" }}
            >
              <PersonIcon />
            </IconButton>
          )}
        </div>
        <IconButton onClick={() => navigate("/cart")}>
          <Badge badgeContent={cart.cart?.items.length} color="secondary">
            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "black" }} />
          </Badge>
        </IconButton>
      </div>
    </Box>
  );
};
