import React, { useState } from "react";
import {
  Divider,
  Button,
  Card,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { CartItem } from "./CartItem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import { toast, ToastContainer } from "react-toastify";
import {
  addItemToCartByCode,
  applyCoupon,
  clearCartAction,
} from "../State/Cart/Action";

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
  const [productCode, setProductCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [customInvoicePercentage, setCustomInvoicePercentage] = useState("");

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

  const handleAddToCart = async () => {
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

    try {
      await dispatch(addItemToCartByCode(reqData));
      setProductCode("");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`${error.response.data}`); // Show specific error message
      } else {
        toast.error("Wrong code. Please try again."); // Fallback error message
      }
      console.error("error:", error);
    }
  };

  const handleApplyCoupon = async () => {
    if (couponCode.trim() === "") {
      alert("Please enter a coupon code.");
      return;
    }

    try {
      await dispatch(
        applyCoupon(cart.cart.id, couponCode, localStorage.getItem("jwt"))
      );
      toast.success("COUPON APPLIDED SUCCESSFULLY!"); // Show success message
      setCouponCode("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`${error.response.data.message}`); // Show specific error message
      } else {
        toast.error("Failed to apply coupon. Please try again."); // Fallback error message
      }
      console.error("Coupon apply error:", error);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCartAction());
    window.location.reload(); // This should ideally be handled better in a SPA
  };

  const calculateTotal = () => {
    if (cart.cartItems.length === 0) {
      return 0;
    }

    const itemTotal = cart.cart?.total || 0;
    const totalBeforeDiscount = itemTotal;
    const customPercent = parseFloat(customInvoicePercentage);

    if (isNaN(customPercent)) {
      return totalBeforeDiscount;
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

            {/* Clear Cart Button */}
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClearCart}
              sx={{
                color: "red",
                borderColor: "red",
                fontWeight: "bold",
                width: "120px",
                marginTop: "10px",
                "&:hover": {
                  borderColor: "darkred",
                  backgroundColor: "lightcoral",
                },
              }}
            >
              Clear Cart
            </Button>

            {/* Bill Details */}
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  {cart.cart?.coupon ? (
                    <p>{cart.cart?.totalamount}</p>
                  ) : (
                    <p>{calculateTotal()}</p>
                  )}
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Discount</p>
                  {cart.cart?.coupon ? (
                    <p>{cart.cart.coupon.discountPercentage}%</p>
                  ) : (
                    <p>No coupon applied</p>
                  )}
                </div>
                <Divider />
                <div className="flex justify-between text-gray-400">
                  <p>Total Pay</p>
                  <p>{calculateTotal()}</p>
                </div>

                {/* Custom Invoice Percentage Input */}
                {/* <div className="flex justify-between py-3">
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
                </div> */}
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

        {/* Modal for Address */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 id="modal-modal-title" className="text-xl font-semibold">
              Enter Address
            </h2>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="space-y-3 mt-5">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </div>

      <ToastContainer />
    </>
  );
};

export default Cart;
