import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Buy = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [reason, setReason] = useState('');
  const [productCode, setProductCode] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const handlePriceCalculation = () => {
    // Calculate price based on selected duration
    if (duration === '24h') {
      setPrice(0.95 * 100); // Assuming 95% of the product price
    } else if (duration === '1w') {
      setPrice(0.9 * 100); // Assuming 90% of the product price
    } else if (duration === '1m') {
      setPrice(0.8 * 100); // Assuming 80% of the product price
    } else {
      setPrice(''); // Reset price if duration is not selected
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., sending data to a server
    console.log({ customerName, customerEmail, reason, productCode, duration, price });
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      p={3}
      maxWidth="400px"
      mx="auto"
    >
      <Typography variant="h4" gutterBottom>
        Customer Information
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
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
        <TextField
          label="Product Code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Duration</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            variant="outlined"
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
          >
            <MenuItem value="24h">24 hours</MenuItem>
            <MenuItem value="1w">1 week</MenuItem>
            <MenuItem value="1m">1 month</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button onClick={handlePriceCalculation} variant="contained" color="primary" fullWidth sx={{
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
            Định Giá
          </Button>
        </Box>
        {price !== '' && (
          <Typography variant="body1" align="center" mt={2}>
            Calculated Price: {price} USD
          </Typography>
        )}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{
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
        </Box>
      </form>
    </Box>
  );
};

export default Buy;
