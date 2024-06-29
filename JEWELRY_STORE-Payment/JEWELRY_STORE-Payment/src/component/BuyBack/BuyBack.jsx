import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BuyBack = () => {
  return (
    <Box textAlign="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Choose an Option:
      </Typography>
      <Box m={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/buy"
          sx={{
            bgcolor: '#4CAF50', // Green color
            color: 'white', // Text color
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#388E3C', // Darker green on hover
            },
          }}
        >
          Buy
        </Button>
        <Box mx={2} />
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/exchange"
          sx={{
            bgcolor: '#F44336', // Red color
            color: 'white', // Text color
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#D32F2F', // Darker red on hover
            },
          }}
        >
          Exchange
        </Button>
      </Box>
    </Box>
  );
};

export default BuyBack;
