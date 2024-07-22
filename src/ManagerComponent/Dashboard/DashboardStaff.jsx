import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, Grid, TextField, Button, Box } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getDashboardBuybackStatsByArea, getDashboardStatsByArea } from '../../component/State/DashBoard/Action';
import { getAreaByUserId } from '../../component/State/Area/Action';
import { getUser } from '../../component/State/Authentication/Action';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [SDate] = useState(dayjs());
    const [EDate] = useState(dayjs().add(1, 'day'));
    const [errors, setErrors] = useState({});

    const { dashboard } = useSelector(store => store);
    const loading = useSelector((state) => state.dashboard.loading);
    const { area } = useSelector(store => store);
    const { auth } = useSelector(store => store);

    useEffect(() => {
        const formattedStartDate = dayjs(SDate).format('YYYY-MM-DD');
        const formattedEndDate = dayjs(EDate).format('YYYY-MM-DD');
        dispatch(getDashboardStatsByArea(formattedStartDate, formattedEndDate, area.userArea.id, jwt));
        dispatch(getDashboardBuybackStatsByArea(formattedStartDate, formattedEndDate, area.userArea.id, jwt));
    }, [dispatch, jwt, SDate, EDate]);

    const validateDates = (newValue, field) => {
        if (field === "startDate" && newValue && endDate && newValue > endDate) {
            setErrors((prev) => ({
                ...prev,
                startDate: "Ngày bắt đầu phải trước ngày kết thúc.",
            }));
        } else if (field === "endDate" && newValue && startDate && newValue < startDate) {
            setErrors((prev) => ({
                ...prev,
                endDate: "Ngày kết thúc phải sau ngày bắt đầu.",
            }));
        } else {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        validateDates(date, "startDate");
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        validateDates(date, "endDate");
    };

    useEffect(() => {
        if (jwt) {
            dispatch(getAreaByUserId(jwt));
        }
    }, [dispatch, jwt]);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt && !auth.user) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(getUser(user));
        }
    }, [auth.user, dispatch]);

    const handleSearch = () => {
        if (!errors.startDate && !errors.endDate && startDate && endDate) {
            const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
            const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');
            dispatch(getDashboardStatsByArea(formattedStartDate, formattedEndDate, area.userArea.id, jwt));
            dispatch(getDashboardBuybackStatsByArea(formattedStartDate, formattedEndDate, area.userArea.id, jwt));
        }
    };

    const orderData = [
        { name: 'Total Orders', value: dashboard.area?.totalOrders ?? 0 },
        { name: 'Total Amount', value: dashboard.area?.totalAmount ?? 0 },
        { name: 'Total Sold Items', value: dashboard.area?.totalItems ?? 0 },
    ];

    const buybackData = [
        { name: 'Total Buybacks', value: dashboard.buybackArea?.totalBuybacks ?? 0 },
        { name: 'Total Amount', value: dashboard.buybackArea?.totalAmount ?? 0 },
        { name: 'Total Sold Items', value: dashboard.buybackArea?.totalItems ?? 0 },
    ];

    const lineChartData = [
        {
            name: 'Total Amount',
            'Order Amount': dashboard.area?.totalAmount ?? 0,
            'Buy Back Amount': dashboard.buybackArea?.totalAmount ?? 0,
        },
    ];

    const barChartData = [
        { name: 'Total Orders', value: dashboard.area?.totalOrders ?? 0 },
        { name: 'Total Buybacks', value: dashboard.buybackArea?.totalBuybacks ?? 0 },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 3, color: '#3f51b5' }}>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Ngày bắt đầu
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Chọn ngày bắt đầu"
                                value={startDate}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField {...params} error={!!errors.startDate} helperText={errors.startDate} />}
                                inputFormat="YYYY-MM-DD"
                            />
                        </LocalizationProvider>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Ngày kết thúc
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Chọn ngày kết thúc"
                                value={endDate}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField {...params} error={!!errors.endDate} helperText={errors.endDate} />}
                                inputFormat="YYYY-MM-DD"
                            />
                        </LocalizationProvider>
                    </Paper>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleSearch} disabled={!!errors.startDate || !!errors.endDate || !startDate || !endDate}>
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Typography variant="h4" color="textSecondary">
                    {auth.user ? auth.user.areaName : ''}
                </Typography>
            </Grid>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#3f51b5' }}>
                    Order
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#e0f7fa' }}>
                            <Typography variant="h6" gutterBottom>
                                Total Orders
                            </Typography>
                            <Typography variant="h4">
                                {loading ? 'Loading...' : dashboard.area?.totalOrders ?? 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#e0f7fa' }}>
                            <Typography variant="h6" gutterBottom>
                                Total Amount
                            </Typography>
                            <Typography variant="h4">
                                {loading ? 'Loading...' : dashboard.area?.totalAmount ?? 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#e0f7fa' }}>
                            <Typography variant="h6" gutterBottom>
                                Total Sold Items
                            </Typography>
                            <Typography variant="h4">
                                {loading ? 'Loading...' : dashboard.area?.totalItems ?? 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#4caf50' }}>
                    Buy Back
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f1f8e9' }}>
                            <Typography variant="h6" gutterBottom>
                                Total Buybacks
                            </Typography>
                            <Typography variant="h4">
                                {loading ? 'Loading...' : dashboard.buybackArea?.totalBuybacks ?? 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f1f8e9' }}>
                            <Typography variant="h6" gutterBottom>
                                Total Amount
                            </Typography>
                            <Typography variant="h4">
                                {loading ? 'Loading...' : dashboard.buybackArea?.totalAmount ?? 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f1f8e9' }}>
                            <Typography variant="h6" gutterBottom>
                                Total Sold Items
                            </Typography>
                            <Typography variant="h4">
                                {loading ? 'Loading...' : dashboard.buybackArea?.totalItems ?? 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#f44336' }}>
                    Comparison
                </Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Order Amount" stroke="#4caf50" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Buy Back Amount" stroke="#f44336" />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#3f51b5' }}>
                    Bar Chart
                </Typography>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#3f51b5" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>
        </Box>
    );
};

export default Dashboard;
