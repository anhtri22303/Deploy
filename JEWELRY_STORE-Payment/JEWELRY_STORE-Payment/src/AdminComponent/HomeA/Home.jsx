import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Our Jewelry Store
        </Typography>
        <img src="https://via.placeholder.com/600x400" alt="Jewelry" style={{ width: '100%', height: 'auto' }} />
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Explore Collection
          </Button>
          <Button variant="outlined" color="secondary">
            Contact Us
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
