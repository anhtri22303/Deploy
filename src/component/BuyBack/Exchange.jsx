import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Modal, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getMenuItemByCode } from "../../component/State/Menu/Action";
import { calculateBuybackPrice } from "../../component/State/Valuation/Action";
import { Formik, Form, Field } from "formik";
import { createBuyback } from "../State/Buyback/Action"; // Adjust path as necessary
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Buy = () => {
  const [productCode, setProductCode] = useState("");
  const [productDetail, setProductDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu, valuation } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [jewelryImage, setJewelryImage] = useState("");

  const handlePriceCalculation = async () => {
    try {
      await dispatch(getMenuItemByCode({ code: productCode, jwt }));
      const jewelry = menu.search;
      await dispatch(calculateBuybackPrice({ jewelry, jwt }));
      const imageUrl = jewelry.images[0];
      setJewelryImage(imageUrl);
      setProductDetail(menu.search);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Incorect Product code!");
    }
  };

  const handleSubmit = async (values, actions) => {
    setIsModalOpen(true);
    actions.setSubmitting(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    fullname: "",
    mobile: "",
    email: "",
  };

  const handleFinalSubmit = async (values, actions) => {
    const buybackRequest = {
      fullname: values.fullname,
      mobile: values.mobile,
      email: values.email,
    };
    await dispatch(createBuyback(buybackRequest, productCode, jwt));
    actions.setSubmitting(false);
    handleCloseModal();
    navigate("/buyback-success", {
      state: { buyback: buybackRequest, product: productDetail, valuation },
    });
  };

  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    p={3}
    mt={8}
    mb={8}
    maxWidth="1000px"
    mx="auto"
    sx={{ padding: 3,marginTop: "120px", marginBottom: "400px", backgroundColor: '#f0f0f0' }} // Replace with your desired shade of gray
  >
    <ToastContainer />
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Buyback in Store
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <TextField
              label="Product Code"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              required
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
            <Box mt={2}>
              <Button
                onClick={handlePriceCalculation}
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  bgcolor: 'orange',
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
                }}
              > 
                Pricing
              </Button>
            </Box>
            {productDetail && (
              <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={jewelryImage}
                alt={productDetail.name}
                sx={{ maxHeight: 200, objectFit: 'contain', borderRadius: 2 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thông tin chi tiết sản phẩm
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1"><strong>Tên sản phẩm:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">{productDetail.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1"><strong>Loại:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">{productDetail.jewelryCategory.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1"><strong>Giá mua lại:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">{valuation.totalPrice} đồng</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!productDetail || isSubmitting}
                sx={{
                  mt: 2,
                  bgcolor: 'orange',
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
                }}
              >
                BUY BACK
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            thông tin khách hàng
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleFinalSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="fullname"
                      label="Full Name"
                      fullWidth
                      variant="outlined"
                      required
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
                    <Field
                      as={TextField}
                      name="mobile"
                      label="Mobile"
                      fullWidth
                      variant="outlined"
                      required
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
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      required
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
                    <Button
                      variant="outlined"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        mt: 2,
                        bgcolor: 'orange',
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
                      }}
                    >
                      Buy Back
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default Buy;
