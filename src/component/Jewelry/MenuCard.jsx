import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

const MenuCart = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
    <Card elevation={3} sx={{ mb: 2 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <img
              src={item.images[0]}
              alt={item.name}
              style={{
                width: isSmallScreen ? "4rem" : "5rem",
                height: isSmallScreen ? "4rem" : "5rem",
                objectFit: "cover",
                borderRadius: "10%",
                marginRight: "1rem",
              }}
            />
            <div style={{ flex: 1 }}>
              <Typography variant="h6" component="h2" noWrap>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {item.price} USD
              </Typography>
              <Typography variant="body2" color="textSecondary" noWrap>
                {item.description}
              </Typography>
            </div>
            <Tooltip title="Add to Cart">
              <IconButton onClick={handleAddItemToCart} color="primary">
                <AddShoppingCartIcon />
              </IconButton>
            </Tooltip>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            <Typography variant="body1">{item.details}</Typography>
          </CardContent>
          <CardActions>
          <Button
      variant="contained"
      onClick={handleAddItemToCart}
      fullWidth
      color="primary"  // Thay đổi màu thành primary để có màu xanh dương
      startIcon={<AddShoppingCartIcon />}
    >
      Add to Cart
    </Button>
  
          </CardActions>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default MenuCart;
