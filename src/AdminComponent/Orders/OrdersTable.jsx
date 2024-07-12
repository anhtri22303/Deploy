import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, IconButton, MenuItem, FormControl, InputLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getALLsOrders } from '../../component/State/Order/Action';

export default function OrdersTable({ filter }) {
    const { orders } = useSelector((state) => state.order); // Assuming state has 'order' slice with 'orders' array
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const [filterStatus, setFilterStatus] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getALLsOrders(jwt));
    }, [dispatch, jwt]);

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = orders.filter((order) =>
        (filterStatus === "ALL" || order.orderStatus.toUpperCase() === filterStatus) &&
        (order.customer.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Box sx={{ padding: 2 }}>
            <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardHeader
                    title="All Orders"
                    sx={{
                        pt: 2,
                        pb: 1,
                        textAlign: 'center',
                        backgroundColor: '#f5f5f5',
                        borderBottom: '1px solid #e0e0e0'
                    }}
                    titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl component="fieldset" sx={{ minWidth: 200 }}>
                            <RadioGroup
                                row
                                aria-label="filter-status"
                                name="filter-status"
                                value={filterStatus}
                                onChange={handleFilterChange}
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <FormControlLabel value="ALL" control={<Radio />} label="All" />
                                <FormControlLabel value="PENDING" control={<Radio />} label="Pending" />
                                <FormControlLabel value="COMPLETED" control={<Radio />} label="Completed" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            id="search-input"
                            label="Search"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={handleSearchChange}
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
                        <IconButton
                            aria-label="search"
                            onClick={() => console.log('Search clicked')} // Replace with actual search functionality
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#0B4CBB' }}>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                        Customer
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                        Price
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                        Stall
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                        Status
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                        '&:hover': { backgroundColor: '#e0e0e0' }
                                    }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                        {order.id}
                                    </TableCell>
                                    <TableCell align="center">{order.customer.fullname}</TableCell>
                                    <TableCell align="center">{order.totalPrice}</TableCell>
                                    <TableCell align="center">{order.areaName}</TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: order.orderStatus === 'COMPLETED' ? 'green' : 'red' }}>
                                            {order.orderStatus}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}
