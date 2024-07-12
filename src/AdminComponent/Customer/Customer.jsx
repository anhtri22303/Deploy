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

  return (
    <Box>
      <Card className="mt-1" sx={{ padding: 2, margin: 2 }}>
        <TableContainer component={Paper}>
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem' }}>Customer Management</div>

          <Table aria-label="customer table">
            <TableHead sx={{ backgroundColor: "#0B4CBB"  }}>
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
                {/* <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Actions
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{item.fullname}</TableCell>
                  <TableCell align="right">{item.mobile}</TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">{item.point}</TableCell>
                  {/* <TableCell align="right">
                    <IconButton
                      onClick={() => handleUpdateClick(item)}
                      aria-label="update"
                      sx={{ color: "red" }}
                    >
                      Update
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              ))}
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
