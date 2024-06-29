import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

const MenuCart = ({ item }) => {
  const dispatch = useDispatch();

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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2x1">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>{item.price} USD</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="pt-3">
          <Button
            onClick={handleAddItemToCart}
            variant="contained"
            disabled={false} // Adjust disabled condition based on your logic
          >
            Add to Cart
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCart;