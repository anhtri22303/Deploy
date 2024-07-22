import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

const MenuCart = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showDialog, setShowDialog] = useState(false);

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      jwt: localStorage.getItem("jwt"),
      cartItem: {
        jewelryId: item.id,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("req Data", reqData);
  };

  const handleImageClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Card
        elevation={3}
        sx={{
          mb: 2,
          borderRadius: "10px",
          overflow: "hidden",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
          <img
            src={item.images[0]}
            alt={item.name}
            style={{
              width: isSmallScreen ? "4rem" : "5rem",
              height: isSmallScreen ? "4rem" : "5rem",
              objectFit: "cover",
              borderRadius: "10%",
              marginRight: "1rem",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              noWrap
              sx={{ fontWeight: "bold" }}
            >
              {item.code}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, color: "primary.main", fontWeight: "bold" }}
            >
              {item.price} USD
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ padding: "1rem" }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {item.name}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Button
            variant="contained"
            onClick={handleAddItemToCart}
            fullWidth
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            sx={{ fontWeight: "bold" }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>{item.code}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            {item.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuCart;
