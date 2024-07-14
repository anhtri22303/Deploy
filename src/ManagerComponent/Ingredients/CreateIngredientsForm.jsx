import {
  Alert,
  Button,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComponent } from "../../component/State/Components/Action";

const CreateIngredientsForm = () => {
  const dispath = useDispatch();
  const [formData, setFormData, ] = useState({
    name: "",
    price: "",
    pricebuyback: "",
  });
  const [error, setError] = useState('');
  const jwt = localStorage.getItem("jwt");

  const validateForm = () => {
    if (!formData.name || !formData.price || !formData.pricebuyback) {
      setError('All fields are required.');
      return false;
    }
    if (isNaN(formData.price) || isNaN(formData.pricebuyback)) {
      setError('Price and Price Buyback must be numbers.');
      return false;
    }
    if (formData.price <= 0 || formData.pricebuyback <= 0) {
      setError('Price and Price Buyback must be positive numbers.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      name: formData.name,
      price: formData.price,
      pricebuyback: formData.pricebuyback,
    };

    dispath(createComponent({ data, jwt }));
    console.log(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div className="p-5">
        <h1
          className="text-black text-center text-xl pb-10"
          style={{ fontSize: "30px" }}
        >
          Create Ingredient
        </h1>
        {error && <Alert severity="error">{error}</Alert>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "gray",
              },
            }}
          />
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.price}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "gray",
              },
            }}
          />
          <TextField
            fullWidth
            id="pricebuyback"
            name="pricebuyback"
            label="Price Buyback"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.pricebuyback}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "gray",
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              mt: 2,
              bgcolor: "#0B4CBB",
              color: "white",
              fontWeight: "bold",
              height: "40px", // Adjust height as needed
              padding: "8px",
              "&:hover": {
                bgcolor: "darkorange",
              },
              "&:focus": {
                bgcolor: "black",
              },
            }}
          >
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientsForm;
