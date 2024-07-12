import React from "react";
import { Dashboard } from '@mui/icons-material';
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  NotificationsActive as NotificationsActiveIcon,
  Event as EventIcon,
  Logout as LogoutIcon,
  AddReaction as AddReactionIcon,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
export const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Buyback", icon: <ShoppingCartCheckoutIcon/>,path: "/buyback" },
  { title: "Event", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },

];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={isSmallScreen ? open : true}
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? "50vw" : "20vw",
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 5 }}
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src="https://cdn.pnj.io/images/logo/pnj.com.vn.png"
          alt="Logo"
          style={{ width: "50%", marginBottom: 16 }}
        />
      </Box>
      <List sx={{ pt: 2 }}>
        {menu.map((item, i) => (
          <React.Fragment key={item.title}>
            <ListItem
              button
              onClick={() => handleNavigate(item)}
              sx={{
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#0B4CBB", fontSize: "3rem" }}>
                {React.cloneElement(item.icon, { fontSize: "inherit" })}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
            {i !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default ProfileNavigation;
