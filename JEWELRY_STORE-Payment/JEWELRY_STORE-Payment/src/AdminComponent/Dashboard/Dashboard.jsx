import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const Dashboard = () => {
    // Replace with actual logic to fetch or calculate data
    const totalBill = 1500; // Example total bill
    const totalSales = 5000; // Example total sales

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Bill Today
                        </Typography>
                        <Typography variant="h3" component="div">
                            ${totalBill}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Total Sales Today
                        </Typography>
                        <Typography variant="h3" component="div">
                            ${totalSales}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
