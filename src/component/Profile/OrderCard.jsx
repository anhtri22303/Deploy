import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../State/AreaOrder/Action";
import { getUsersOrders } from "../State/Order/Action";

import {
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Menu,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  IconButton,
} from "@mui/material";

export default function OrderCard() {
  const { order } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const orderStatus = [
    { label: "PENDING", value: "PENDING" },
    { label: "COMPLETED", value: "COMPLETED" },
  ];

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [dispatch, jwt]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleUpdateOrder = (orderstatus) => {
    dispatch(updateOrderStatus({ orderId: selectedOrderId, orderstatus, jwt }))
      .then(() => {
        dispatch(getUsersOrders(jwt));
      })
      .catch((error) => {
        console.error("Failed to update order status", error);
      });
    handleClose();
  };

  useEffect(() => {
    if (order.orders) {
      handleSearch();
    }
  }, [order.orders, filterStatus, searchTerm]);

  const handleSearch = () => {
    const filtered = order.orders?.filter(
      (order) =>
        (filterStatus === "ALL" || order.orderStatus === filterStatus) &&
        order.customer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardHeader
          title={"All Orders"}
          sx={{
            pt: 2,
            pb: 1,
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            backgroundColor: "#0B4CBB",
            color: "#fff",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <RadioGroup
            row
            aria-label="filter-status"
            name="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControlLabel value="ALL" control={<Radio />} label="All" />
            <FormControlLabel value="PENDING" control={<Radio />} label="Pending" />
            <FormControlLabel value="COMPLETED" control={<Radio />} label="Completed" />
          </RadioGroup>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 2 }}>
          <TextField
            id="search-input"
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
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
          <IconButton aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "White" }}
                  >
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "White" }}
                  >
                    Customer
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "White" }}
                  >
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "White" }}
                  >
                    Stall
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "White" }}
                  >
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "White" }}
                  >
                    Update
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>{order.id}</TableCell>
                    <TableCell align="center">
                      {order.customer.fullname}
                    </TableCell>
                    <TableCell align="center">{order.totalPrice}</TableCell>
                    <TableCell align="center">{order.areaName}</TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color:
                            order.orderStatus === "COMPLETED" ? "green" : "red",
                        }}
                      >
                        {order.orderStatus}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleClick(event, order.id)}
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          backgroundColor: "#0B4CBB",
                          "&:hover": {
                            backgroundColor: "#1976d2",
                          },
                        }}
                      >
                        Update
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open && selectedOrderId === order.id}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {orderStatus.map((status) => (
                          <MenuItem
                            key={status.value}
                            onClick={() => handleUpdateOrder(status.value)}
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No orders found with the given search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
