import { Delete } from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import { Box, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMenuItem} from '../../component/State/Menu/Action';


const orders = [
    {
        id: 1,
        image: 'https://via.placeholder.com/40',
        title: 'Jewelry 1',
        ingredients: 'Gold, Diamond',
        price: '$1000',
        availability: 'Available'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/40',
        title: 'Jewelry 2',
        ingredients: 'Silver, Ruby',
        price: '$800',
        availability: 'Out of Stock'
    },
    // Add more order objects as needed
];

export default function MenuTable() {
    const navigate = useNavigate();
    return (
        <Box sx={{ padding: 2 }}>
            <Card sx={{ mt: 2, boxShadow: 3 }}>
                <CardHeader
                    action={
                        <IconButton onClick={() => navigate("/admin/jewelry/add-menu")} aria-label="add menu">
                            <CreateIcon />
                        </IconButton>
                    }
                    title={"Menu"}
                    sx={{ pt: 2, alignItems: "center", textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="menu table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Ingredients</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Availability</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#e0e0e0' } }}
                                >
                                    <TableCell align="center">
                                        <Avatar src={order.image} alt="Product Image" />
                                    </TableCell>
                                    <TableCell align="center">{order.title}</TableCell>
                                    <TableCell align="center">{order.ingredients}</TableCell>
                                    <TableCell align="center">{order.price}</TableCell>
                                    <TableCell align="center">{order.availability}</TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            <Delete />
                                        </IconButton>
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
