import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { calculateBuybackPriceOut } from "../State/Valuation/Action";
import { Formik, Form, Field } from "formik";
import { createBuybackOut } from "../State/Buyback/Action";
import { v4 as uuidv4 } from "uuid"; // Ensure you have the correct import path
import { uploadImageToCloudinary } from "../../AdminComponent/util/UploadToCloudinary"; // Import your image upload utility function

const Buy = () => {
  const dispatch = useDispatch();
  const { valuation } = useSelector((store) => store); // Lấy giá trị valuation từ Redux store
  const [Name, setName] = useState("");
  const [type, setType] = useState("");
  const [goldWeight, setGoldWeight] = useState("");
  const [diamondWeight, setDiamondWeight] = useState("");
  const [components, setComponents] = useState([]);
  const [images, setImages] = useState([]);
  const [buybackPrice, setBuybackPrice] = useState(null);
  const jwt = localStorage.getItem("jwt");

  const [isCustomerInfoModalOpen, setIsCustomerInfoModalOpen] = useState(false); // State for managing customer info modal open state
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false); // State for managing code modal open state
  const [code, setCode] = useState(""); // State for the code

  const handleOpenCustomerInfoModal = () => setIsCustomerInfoModalOpen(true);
  const handleCloseCustomerInfoModal = () => setIsCustomerInfoModalOpen(false);

  const handleOpenCodeModal = () => setIsCodeModalOpen(true);
  const handleCloseCodeModal = () => setIsCodeModalOpen(false);

  const initialValues = { fullname: "", mobile: "", email: "" };

  const handleCalculateBuybackPriceClick = async () => {
    await handleCalculateBuybackPrice();
    handleSetBuybackPrice();
  };

  const handleCalculateBuybackPrice = async () => {
    await dispatch(
      calculateBuybackPriceOut(goldWeight, diamondWeight, components, jwt)
    );
  };

  const handleSetBuybackPrice = () => {
    if (valuation.totalPrice !== undefined) {
      setBuybackPrice(valuation.totalPrice);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImages([]); // Reset images array

    for (const file of files) {
      const url = await uploadImageToCloudinary(file);
      setImages((prevImages) => [...prevImages, { url, id: uuidv4() }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      Name,
      type,
      goldWeight,
      diamondWeight,
      components: components.filter(Boolean),
      images: images.map((image) => image.url),
    };
    console.log(formData);

    await handleCalculateBuybackPrice();
    handleSetBuybackPrice();
  };

  useEffect(() => {
    if (!isCustomerInfoModalOpen) {
      // Reset buybackPrice when modal is closed
      setBuybackPrice(null);
    }
  }, [isCustomerInfoModalOpen]);

  useEffect(() => {
    if (valuation.totalPrice !== undefined) {
      setBuybackPrice(valuation.totalPrice);
    }
  }, [valuation.totalPrice]);

  const handleCodeSubmit = () => {
    // Handle code verification logic here
    if (code) {
      handleCloseCodeModal();
      handleOpenCustomerInfoModal();
    }
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
      sx={{
        padding: 3,
        marginTop: "120px",
        marginBottom: "400px",
        backgroundColor: "#f0f0f0",
      }} // Replace with your desired shade of gray
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Validation
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
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
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                inputProps={{ style: { color: "gray" } }}
              >
                <MenuItem value="Vòng Tay">Vòng Tay</MenuItem>
                <MenuItem value="Nhẫn">Nhẫn</MenuItem>
                <MenuItem value="Dây Chuyền">Dây Chuyền</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Component 1</InputLabel>
              <Select
                value={components[0] || ""}
                onChange={(e) => setComponents([e.target.value, components[1]])}
                sx={{ color: "gray" }}
              >
                <MenuItem value="gold 18k">Gold 18k</MenuItem>
                <MenuItem value="gold 24k">Gold 24k</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Component 2</InputLabel>
              <Select
                value={components[1] || ""}
                onChange={(e) => setComponents([components[0], e.target.value])}
                sx={{ color: "gray" }}
              >
                <MenuItem value="natural diamond">Natural Diamond</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Gold Weight"
              value={goldWeight}
              onChange={(e) => setGoldWeight(e.target.value)}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Diamond Weight"
              value={diamondWeight}
              onChange={(e) => setDiamondWeight(e.target.value)}
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
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "orange",
                color: "white",
                fontWeight: "bold",
                height: "40px", // Adjust height as needed
                padding: "8px",
                "&:hover": {
                  bgcolor: "darkorange",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              Upload Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </Button>

            <Box
              display="flex"
              flexWrap="wrap"
              gap={2}
              mt={2}
              justifyContent="center"
              alignItems="center"
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  width="100px"
                  height="100px"
                  overflow="hidden"
                  sx={{
                    boxShadow: 1,
                    borderRadius: 1,
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "background.paper",
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Upload Preview ${index}`}
                    width="100%"
                    style={{ borderRadius: "4px" }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "orange",
                color: "white",
                fontWeight: "bold",
                height: "40px", // Adjust height as needed
                padding: "8px",
                "&:hover": {
                  bgcolor: "darkorange",
                },
                "&:focus": {
                  bgcolor: "black",
                },
              }}
            >
              Định Giá
            </Button>
          </Grid>
        </Grid>
      </form>
      {buybackPrice && (
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Tổng Giá: {buybackPrice} VNĐ
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleOpenCodeModal}
        sx={{
          mt: 2,
          bgcolor: "orange",
          color: "white",
          fontWeight: "bold",
          height: "40px", // Adjust height as needed
          padding: "8px",
          "&:hover": {
            bgcolor: "darkorange",
          },
          "&:focus": {
            bgcolor: "black",
          },
        }}
      >
        Confirm Purchase
      </Button>
      <Modal
        open={isCustomerInfoModalOpen}
        onClose={handleCloseCustomerInfoModal}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={3}
          mt={8}
          mb={8}
          maxWidth="500px"
          mx="auto"
          sx={{
            padding: 3,
            marginTop: "120px",
            marginBottom: "400px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Customer Information
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <Field
                  as={TextField}
                  name="fullname"
                  label="Full Name"
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
                  name="mobile"
                  label="Mobile"
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
                  name="email"
                  label="Email"
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
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    marginTop: 2,
                    bgcolor: "orange",
                    color: "white",
                    fontWeight: "bold",
                    height: "40px",
                    padding: "8px",
                    "&:hover": {
                      bgcolor: "darkorange",
                    },
                    "&:focus": {
                      bgcolor: "black",
                    },
                  }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal open={isCodeModalOpen} onClose={handleCloseCodeModal}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={3}
          mt={8}
          mb={8}
          maxWidth="500px"
          mx="auto"
          sx={{
            padding: 3,
            marginTop: "120px",
            marginBottom: "400px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Enter Code
          </Typography>
          <TextField
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCodeSubmit}
            sx={{
              marginTop: 2,
              mt: 2,
              bgcolor: "orange",
              color: "white",
              fontWeight: "bold",
              height: "40px", // Adjust height as needed
              padding: "8px",
              "&:hover": {
                bgcolor: "darkorange",
              },
              "&:focus": {
                bgcolor: "black",
              },
            }}
          >
            Verify Code
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Buy;
