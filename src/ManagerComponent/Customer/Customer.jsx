import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCustomers,
  getAllCustomers,
} from "../../component/State/Customer/Action";
import UpdateCustomerForm from "./UpdateCustomerForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Customer = () => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNoItemAlert, setShowNoItemAlert] = useState(false); // State for showing no item alert

  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllCustomers(jwt));
  }, [dispatch, jwt]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleUpdateClick = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      setShowNoItemAlert(false);
    } else {
      const found = customers.some(
        (customer) => customer.fullname.toLowerCase().includes(searchTerm)
      );
      setShowNoItemAlert(!found);
    }
  };

  return (
    <Box>
      <Card className="mt-1" sx={{ padding: 2, margin: 2 }}>
        <CardHeader
          title={"Customer"}
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            onChange={handleSearch}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="customer table">
            <TableHead sx={{ backgroundColor: "#0B4CBB" }}>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Phone Number
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Điểm Tích Luỹ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .filter((customer) =>
                  customer.fullname.toLowerCase().includes(searchTerm)
                )
                .map((customer, index) => (
                  <TableRow key={customer.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{customer.fullname}</TableCell>
                    <TableCell align="right">{customer.mobile}</TableCell>
                    <TableCell align="right">{customer.email}</TableCell>
                    <TableCell align="right">{customer.point}</TableCell>
                  </TableRow>
                ))}
              {/* Show message if no items found */}
              {searchTerm !== "" &&
                customers
                  .filter((customer) =>
                    customer.fullname.toLowerCase().includes(searchTerm)
                  ).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Alert severity="warning">
                          No customers found with the provided name.
                        </Alert>
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateCustomerForm
            customer={selectedCustomer}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Customer;
