import React, { useState } from "react";
import {
  Divider,
  Button,
  Card,
  Modal,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { CartItem } from "./CartItem";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import {
  addItemToCartByCode,
  applyCoupon,
  clearCartAction,
} from "../State/Cart/Action";
import { checkOrCreateCustomer } from "../State/Customer/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  fullname: "",
  mobile: "",
  email: "",
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [productCode, setProductCode] = useState(""); // State for product code
  const [couponCode, setCouponCode] = useState(""); // State for coupon code
  const [customInvoicePercentage, setCustomInvoicePercentage] = useState(""); // State for custom invoice percentage input

  const { cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        staffId: cart.cart?.staff?.id,
        fullname: values.fullname,
        mobile: values.mobile,
        email: values.email,
        items: cart.cartItems.map((item) => ({
          productId: item.jewelry.id,
          quantity: item.quantity,
          price: item.totalPrice,
        })),
      },
    };
    dispatch(createOrder(data));
    dispatch(clearCartAction());
    setOpen(false);
  };

  const handleOpenAddressModal = () => setOpen(true);

  const handleAddToCart = () => {
    if (productCode.trim() === "") {
      alert("Please enter a product code.");
      return;
    }

    const reqData = {
      jwt: localStorage.getItem("jwt"),
      cartItem: {
        code: productCode,
        quantity: 1,
      },
    };

    dispatch(addItemToCartByCode(reqData));
    setProductCode("");
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      alert("Please enter a coupon code.");
      return;
    }

    dispatch(
      applyCoupon(cart.cart.id, couponCode, localStorage.getItem("jwt"))
    );
    setCouponCode("");
  };

  const calculateTotal = () => {
    const itemTotal = cart.cart?.total || 0;
    const gstCharges = 33;
    const tax = 10;
    const totalBeforeDiscount = itemTotal + gstCharges + tax;
    const customPercent = parseFloat(customInvoicePercentage);
    if (isNaN(customPercent)) {
      return totalBeforeDiscount; // Return total without additional percentage if input is invalid
    } else {
      const invoiceAmount = totalBeforeDiscount * (customPercent / 100);
      return totalBeforeDiscount + invoiceAmount;
    }
  };

  const handleCustomInvoiceChange = (e) => {
    setCustomInvoicePercentage(e.target.value);
  };

  return (
    <>
      <div>
        <main className="lg:flex justify-between">
          <section className="lg:w-[40%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item, index) => (
              <CartItem key={`${item.id}-${index}`} item={item} />
            ))}

            <Divider />
            {/* Product Code Input */}
            <Card className="flex gap-5 w-96 p-5 mt-5">
              <TextField
                label="Product Code"
                variant="outlined"
                fullWidth
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
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
                variant="outlined"
                fullWidth
                onClick={handleAddToCart}
                sx={{
                  color: "green",
                  borderColor: "green",
                  fontWeight: "bold",
                  width: "120px",
                  "&:hover": {
                    borderColor: "darkyellow",
                    backgroundColor: "lightyellow",
                  },
                }}
              >
                Add
              </Button>
            </Card>

            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  <p>{cart.cart?.total}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>GST and restaurant charges</p>
                  <p>$33</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Tax</p>
                  <p>$10</p>
                </div>
                <Divider />
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Total Pay</p>
                <p>{calculateTotal()}</p>
              </div>

              {/* Custom Invoice Percentage Input */}
              <div className="flex justify-between py-3">
                <TextField
                  label="Custom Invoice Percentage"
                  variant="outlined"
                  fullWidth
                  value={customInvoicePercentage}
                  onChange={handleCustomInvoiceChange}
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
              </div>
            </div>

            {/* Coupon Code Input */}
            <Card className="flex gap-5 w-96 p-5 mt-5">
              <TextField
                label="Coupon Code"
                variant="outlined"
                fullWidth
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
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
                variant="outlined"
                fullWidth
                onClick={handleApplyCoupon}
                sx={{
                  color: "green",
                  borderColor: "green",
                  fontWeight: "bold",
                  width: "120px",
                  "&:hover": {
                    borderColor: "darkyellow",
                    backgroundColor: "lightyellow",
                  },
                }}
              >
                Coupon
              </Button>
            </Card>
          </section>
          <Divider orientation="vertical" flexItem />
          <section className="lg:w-[60%] flex justify-center px-5 pb-0 lg:pb-0">
            <div>
              <h1 className="text-center font-semibold text-2xl py-10">
                Enter Information
              </h1>
              <div className="flex gap-5 flex-wrap justify-center">
                <Card className="flex gap-5 w-64 p-5">
                  <PersonAddIcon />
                  <div className="space-y-3 text-gray-500">
                    <p> Customer Information </p>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleOpenAddressModal}
                      sx={{
                        color: "green",
                        borderColor: "green",
                        fontWeight: "bold",
                        "&:hover": {
                          borderColor: "darkyellow",
                          backgroundColor: "lightyellow",
                        },
                      }}
                    >
                      ADD
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="fullname"
                      label="Full Name"
                      fullWidth
                      variant="outlined"
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
                      sx={{
                        color: "green",
                        borderColor: "green",
                        fontWeight: "bold",
                        width: "120px",
                        "&:hover": {
                          borderColor: "darkyellow",
                          backgroundColor: "lightyellow",
                        },
                      }}
                    >
                      Pay
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Cart;
