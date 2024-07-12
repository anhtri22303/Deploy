import { Box, Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PageviewIcon from '@mui/icons-material/Pageview'; // Import the PageviewIcon
import OrdersTable from './OrdersTable';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" }
];

export const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // Implement the search functionality here
    console.log('Search query:', searchQuery);
    // You can also filter the OrdersTable based on the searchQuery here
  };

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Card sx={{ padding: '2rem', marginBottom: '2rem' }}>
        <Typography variant='h5' sx={{ paddingBottom: '1rem', fontWeight: 'bold', color: 'black' }}>
          Order Status
        </Typography>

      </Card>
      <OrdersTable filter={filterValue} searchQuery={searchQuery} />
    </Box>
  );
};
