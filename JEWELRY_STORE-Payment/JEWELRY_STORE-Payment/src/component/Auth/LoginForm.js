import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from "../State/Authentication/Action";

const initialValues = {
    username: "",
    password: ""
};

const LoginForm = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }))
            .then(() => {
                toast.error("Login failed");
               // toast.success("Login successful!");
                // Optionally, redirect to a different page after a successful login
                // navigate("/some-page");
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    toast.error(`Login failed: ${error.response.data.message}`);
                } else {
                    toast.error("Login failed. Please try again.");
                }
            });
    };

    return (
        <div
            style={{
                backgroundImage: 'url("https://images.pexels.com/photos/5442446/pexels-photo-5442446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <img src="https://cdn.pnj.io/images/logo/pnj.com.vn.png" alt="Logo" style={{ width: '100px' }} />
                </div>
                <Typography variant="h5" className="text-center" style={{ color: 'black' }}>
                    Login
                </Typography>
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    <Form>
                        <Field
                            as={TextField}
                            name="username"
                            label="Username"
                            fullWidth
                            variant="outlined"
                            margin="normal"
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
                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
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
                        <Button
                            sx={{
                                mt: 2,
                                padding: "1rem",
                                background: "linear-gradient(to right, gray, yellow)",
                                color: "white",
                            }}
                            className="mt-5"
                            fullWidth
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                    </Form>
                </Formik>
                <Typography variant="body2" align="center" sx={{ mt: 3, color: 'black' }}>
                    Don't have an account?
                    <Button size="big" onClick={() => navigate("/register")} sx={{ color: '' }}>
                        Register
                    </Button>
                </Typography>
                <ToastContainer />
            </div>
        </div>
    );
}

export default LoginForm;