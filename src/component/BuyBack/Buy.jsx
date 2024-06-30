import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const Buy = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [goldWeight, setGoldWeight] = useState('');
  const [diamondWeight, setDiamondWeight] = useState('');
  const [goldPrice, setGoldPrice] = useState(''); // State for gold price
  const [diamondPrice, setDiamondPrice] = useState(''); // State for diamond price
  const [calculatedTotal, setCalculatedTotal] = useState(''); // State for calculated total price
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., sending data to a server
    const formData = {
      customerName,
      customerEmail,
      reason,
      type,
      category,
      goldWeight,
      diamondWeight,
      goldPrice,
      diamondPrice,
      images
    };
    console.log(formData);
    // Reset form fields after submission if needed
    resetForm();
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setReason('');
    setType('');
    setCategory('');
    setGoldWeight('');
    setDiamondWeight('');
    setGoldPrice('');
    setDiamondPrice('');
    setCalculatedTotal('');
    setImages([]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const selectedImages = files.map((file) => URL.createObjectURL(file));
    setImages(selectedImages);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    // Reset diamond weight when category changes
    if (selectedCategory !== 'diamond') {
      setDiamondWeight('');
      setDiamondPrice(''); // Reset diamond price when category changes
    }
  };

  const handleGoldPriceChange = (e) => {
    const price = e.target.value;
    setGoldPrice(price);
    // Calculate total price when gold price changes
    calculateTotal(price, diamondPrice);
  };

  const handleDiamondPriceChange = (e) => {
    const price = e.target.value;
    setDiamondPrice(price);
    // Calculate total price when diamond price changes
    calculateTotal(goldPrice, price);
  };

  const calculateTotal = (goldPrice, diamondPrice) => {
    const gold = parseFloat(goldPrice);
    const diamond = parseFloat(diamondPrice);
    if (!isNaN(gold) && !isNaN(diamond)) {
      const total = gold + diamond;
      const totalWithDiscount = total * 0.7; // Calculate 70% of the total price
      setCalculatedTotal(totalWithDiscount.toFixed(2)); // Round to 2 decimal places
    } else if (!isNaN(gold)) {
      setCalculatedTotal((gold * 0.7).toFixed(2)); // Calculate 70% of gold price
    } else if (!isNaN(diamond)) {
      setCalculatedTotal((diamond * 0.7).toFixed(2)); // Calculate 70% of diamond price
    } else {
      setCalculatedTotal('');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      maxWidth="800px" // Increased width for better display
      mx="auto"
    >
      <Typography variant="h4" gutterBottom>
        Customer Information
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          {/* Left Side - Name, Email, Reason */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              type="email"
              required
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reason for Return/Exchange"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
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
          </Grid>
          {/* Right Side - Category, Type, Image, Định Giá, Submit Button */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                sx={{ color: 'gray' }} // Set text color to gray
              >
                <MenuItem value="earning">Earning</MenuItem>
                <MenuItem value="ring">Ring</MenuItem>
                <MenuItem value="pendant">Pendant</MenuItem>
                <MenuItem value="shake">Shake</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                required
                sx={{ color: 'gray' }} // Set text color to gray
              >
                <MenuItem value="18k">18k</MenuItem>
                <MenuItem value="24k">24k</MenuItem>
                <MenuItem value="diamond">Diamond</MenuItem>
              </Select>
            </FormControl>
            {category === 'diamond' && (
              <>
                <TextField
                  label="Diamond Weight"
                  value={diamondWeight}
                  onChange={(e) => setDiamondWeight(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
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
                  label="Diamond Price"
                  value={diamondPrice}
                  onChange={handleDiamondPriceChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="number"
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
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gold Weight"
              value={goldWeight}
              onChange={(e) => setGoldWeight(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              required
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gold Price"
              value={goldPrice}
              onChange={handleGoldPriceChange}
              fullWidth
              variant="outlined"
              margin="normal"
              type="number"
              required
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
          </Grid>
          <Grid item xs={12}>
            {calculatedTotal && (
              <Typography variant="body1" gutterBottom>
                Định Giá: {calculatedTotal}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </Grid>
          <Grid item xs={12}>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index}`} style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary"  sx={{
          bgcolor: 'green', // Initial background color
          color: 'white', // Text color
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: 'red', // Background color on hover
          },
          '&:focus': {
            bgcolor: 'black', // Background color on focus
          },
        }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Buy;
