import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const initialValue = {
    image: "",
    name: "",
    code: "",
    discountPercentage: "",
    startedAt: null,
    endsAt: null
};

export const Events = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formValue, setFormValue] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit ", formValue);
        setFormValue(initialValue);
    };

    const handleFormChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newValue, field) => {
        setFormValue({ ...formValue, [field]: newValue });
    };

    return (
        <div>
            <div className='p-5'>
                <Button onClick={handleOpen} variant='contained'>Create New Event</Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="image"
                                        label="Image URL"
                                        variant="outlined"
                                        fullWidth
                                        value={formValue.image}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={formValue.name}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="code"
                                        label="GIFT_CODE"
                                        variant="outlined"
                                        fullWidth
                                        value={formValue.code}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    name="code"
                                    label="DISCOUNT RATE"
                                    variant="outlined"
                                    fullWidth
                                    value={formValue.discountPercentage}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Start Date and Time"
                                            value={formValue.startedAt}
                                            onChange={(newValue) =>
                                                handleDateChange(newValue, "startedAt")
                                            }
                                            inputFormat="MM/DD/YYYY hh:mm a"
                                            className="w-full"
                                            sx={{ width: "100%" }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="End Date and Time"
                                            value={formValue.endsAt}
                                            onChange={(newValue) =>
                                                handleDateChange(newValue, "endsAt")
                                            }
                                            inputFormat="MM/DD/YYYY hh:mm a"
                                            className="w-full"
                                            sx={{ width: "100%" }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Create Event
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};
