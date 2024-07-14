import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, Grid } from '@mui/material';
import { getTotalOrdersByStatus, getTotalAmountByStatus, getTotalSoldItemsByStatus, getTotalOrdersByAreaAndStatus, getTotalAmountByAreaAndStatus, getTotalItemsByAreaAndStatus } from '../../component/State/DashBoard/Action'; // Adjust the import path as needed
import { getAllAreaAction } from '../../component/State/Area/Action';

const Dashboard = () => {
    const dispatch = useDispatch();
    const jwt =  localStorage.getItem("jwt")
    

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
            dispatch(getTotalOrdersByAreaAndStatus(1,'COMPLETED', jwt));
            dispatch(getTotalAmountByAreaAndStatus(1,'COMPLETED', jwt));
            dispatch(getTotalItemsByAreaAndStatus(1,'COMPLETED', jwt));
        }
    }, [dispatch, jwt]);


    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Orders
                        </Typography>
                        <Typography variant="h3" component="div">
                            {totalOrders}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Amount
                        </Typography>
                        <Typography variant="h3" component="div">
                            ${totalAmount}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Sold Items
                        </Typography>
                        <Typography variant="h3" component="div">
                            {totalSoldItems}
                        </Typography>
                    </Paper>
                </Grid>  
            </Grid>
            <div>
            <h1>QUẦY SỐ 1</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Orders
                        </Typography>
                        <Typography variant="h3" component="div">
                            {totalOrdersArea}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Amount
                        </Typography>
                        <Typography variant="h3" component="div">
                            ${totalAmountArea}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Sold Items
                        </Typography>
                        <Typography variant="h3" component="div">
                            {totalSoldItemsArea}
                        </Typography>
                    </Paper>
                </Grid>  
            </Grid>
            
        </div>
        </div>  
    );
};


export default Dashboard;

