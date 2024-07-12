import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../component/State/Authentication/Action';
import StaffTable from './StaffTable';
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
  fullname: '',
  username: '',
  password: '',
  gender: '',
  email: '',
  role: '',
};

const Teams = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValue, setFormValue] = useState(initialValue);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullname = formValue.fullname ? "" : "Full Name is required.";
    tempErrors.username = formValue.username ? "" : "Username is required.";

    // Password validation
    if (formValue.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
  } else if (formValue.password.length > 15) {
      tempErrors.password = "Password must not exceed 15 characters";
  } else if (!/[A-Z]/.test(formValue.password)) {
      tempErrors.password = "Password must contain at least one uppercase letter";
  } else if (!/\d/.test(formValue.password)) { // Check for at least one digit
      tempErrors.password = "Password must contain at least one number";
  } else {
      tempErrors.password = "";
  }

    tempErrors.email = /$^|.+@.+..+/.test(formValue.email) ? "" : "Email is not valid.";
    tempErrors.gender = formValue.gender ? "" : "Gender is required.";
    tempErrors.role = formValue.role ? "" : "Role is required.";
    
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('submit ', formValue);
    setFormValue(initialValue);
    const reqdata = formValue
    dispatch(createUser(reqdata ,jwt))
    handleClose(); // Close modal after submit
  };

  const handleFormChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained' sx={{
                        mt: 2,
                        bgcolor: "#0B4CBB",
                        color: 'white',
                        fontWeight: 'bold',
                        height: '40px', // Adjust height as needed
                        padding: '8px',
                        '&:hover': {
                          bgcolor: 'darkorange',
                        },
                        '&:focus': {
                          bgcolor: 'black',
                        },
                      }}>Create Account</Button>

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
                  name="fullname"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={formValue.fullname}
                  onChange={handleFormChange}
                  error={!!errors.fullname}
                  helperText={errors.fullname}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={formValue.username}
                  onChange={handleFormChange}
                  error={!!errors.username}
                  helperText={errors.username}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formValue.password}
                  onChange={handleFormChange}
                  error={!!errors.password}
                  helperText={errors.password}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="gender"
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  value={formValue.gender}
                  onChange={handleFormChange}
                  error={!!errors.gender}
                  helperText={errors.gender}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formValue.email}
                  onChange={handleFormChange}
                  error={!!errors.email}
                  helperText={errors.email}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="role"
                  label="Role"
                  variant="outlined"
                  fullWidth
                  value={formValue.role}
                  onChange={handleFormChange}
                  error={!!errors.role}
                  helperText={errors.role}
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
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" sx={{
                        mt: 2,
                        bgcolor: "#0B4CBB",
                        color: 'white',
                        fontWeight: 'bold',
                        height: '40px', // Adjust height as needed
                        padding: '8px',
                        '&:hover': {
                          bgcolor: 'darkorange',
                        },
                        '&:focus': {
                          bgcolor: 'black',
                        },
                      }}>
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <div>
      <StaffTable/>
      </div>
    </div>
  );
};

export default Teams;