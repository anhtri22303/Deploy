import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Typography } from '@mui/material';
import React from 'react';

const orders = [
    {
        id: 1,
        image: 'https://via.placeholder.com/40',
        customer: 'anhtri@gmail.com',
        price: '$100',
        name: 'Ring',
        ingredients: 'Gold, Diamond',
        status: 'Completed'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/40',
        customer: 'john.doe@example.com',
        price: '$200',
        name: 'Necklace',
        ingredients: 'Silver, Emerald',
        status: 'Pending'
    },
    // Add more order objects as needed
];

export default function OrdersTable({ filter }) {
    const filteredOrders = orders.filter(order => {
        if (filter === "ALL") return true;
        return order.status.toUpperCase() === filter;
    });

    return (
        <Box sx={{ padding: 2 }}>
            <Card sx={{ mt: 2, boxShadow: 3 }}>
                <CardHeader
                    title={"All Orders"}
                    sx={{ pt: 2, alignItems: "center", textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Customer</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Ingredients</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#e0e0e0' } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Avatar src={order.image} alt="Product Image" />
                                    </TableCell>
                                    <TableCell align="center">{order.customer}</TableCell>
                                    <TableCell align="center">{order.price}</TableCell>
                                    <TableCell align="center">{order.name}</TableCell>
                                    <TableCell align="center">{order.ingredients}</TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" sx={{ color: order.status === 'Completed' ? 'green' : 'red' }}>
                                            {order.status}
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
