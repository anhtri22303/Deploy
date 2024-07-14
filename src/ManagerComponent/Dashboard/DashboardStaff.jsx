import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTotalOrdersByStatus, getTotalAmountByStatus, getTotalSoldItemsByStatus, getTotalOrdersByAreaAndStatus, getTotalAmountByAreaAndStatus, getTotalItemsByAreaAndStatus } from '../../component/State/DashBoard/Action'; // Adjust the import path as needed

const Dashboard = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const totalOrders = useSelector((state) => state.dashboard.totalOrders);
    const totalAmount = useSelector((state) => state.dashboard.totalAmount);
    const totalSoldItems = useSelector((state) => state.dashboard.totalSoldItems);
    const totalOrdersArea = useSelector((state) => state.dashboard.totalOrdersArea);
    const totalAmountArea = useSelector((state) => state.dashboard.totalAmountArea);
    const totalSoldItemsArea = useSelector((state) => state.dashboard.totalSoldItemsArea);
    const loading = useSelector((state) => state.dashboard.loading);
    const error = useSelector((state) => state.dashboard.error);

    useEffect(() => {
        if (jwt) {
            dispatch(getTotalOrdersByStatus('COMPLETED', jwt));
            dispatch(getTotalAmountByStatus('COMPLETED', jwt));
            dispatch(getTotalSoldItemsByStatus('COMPLETED', jwt));
        }
    }, [dispatch, jwt]);

    useEffect(() => {
        if (jwt) {
            dispatch(getTotalOrdersByAreaAndStatus(1, 'COMPLETED', jwt));
            dispatch(getTotalAmountByAreaAndStatus(1, 'COMPLETED', jwt));
            dispatch(getTotalItemsByAreaAndStatus(1, 'COMPLETED', jwt));
        }
    }, [dispatch, jwt]);

    if (loading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    }

    if (error) {
        return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}><b>Error:</b> {error}</Typography>;
    }

    const ordersData = [
        {
            name: 'Total Orders',
            Global: totalOrders,
            Area1: totalOrdersArea,
        },
        {
            name: 'Total Sold Items',
            Global: totalSoldItems,
            Area1: totalSoldItemsArea,
        },
    ];

    const amountData = [
        {
            name: 'Total Amount',
            Global: totalAmount,
            Area1: totalAmountArea,
        },
    ];

    return (
        <Box sx={{ px: 3, py: 4 }}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={3} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            <b>Total Orders</b>
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
                            {totalOrders}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            <b>Total Amount</b>
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
                            {totalAmount}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            <b>Total Sold Items</b>
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
                            {totalSoldItems}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
                <b>My Area</b>
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            <b>Total Orders</b>
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
                            {totalOrdersArea}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            <b>Total Amount</b>
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
                            {totalAmountArea}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            <b>Total Sold Items</b>
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
                            {totalSoldItemsArea}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
                <b>Statistics Bar Chart - Orders and Items</b>
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={ordersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Global" fill="#8884d8" />
                    <Bar dataKey="Area1" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 5, mb: 3, textAlign: 'center' }}>
                <b>Statistics Bar Chart - Amount</b>
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={amountData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Global" fill="#8884d8" />
                    <Bar dataKey="Area1" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Dashboard;
