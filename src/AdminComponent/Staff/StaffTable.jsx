import { Delete } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaffUser, deleteStaffUser } from "../../component/State/Authentication/Action";

export default function StaffTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllStaffUser(jwt));
  }, [dispatch, jwt]);

  const handleDelete = (username) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      console.log(`Attempting to delete user ${username}`);
      dispatch(deleteStaffUser(jwt, username));
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Staff
            </Typography>
          }
          sx={{
            pt: 2,
            pb: 1,
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
          }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Full Name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Gender
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Role
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Area
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Email
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Delete
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auth.users && auth.users.length > 0 ? (
                auth.users.map((row) => (
                  <TableRow
                    key={row.username}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fullname}
                    </TableCell>
                    <TableCell align="right">
                      {row.gender}
                    </TableCell>
                    <TableCell align="right">
                      {row.role}
                    </TableCell>
                    <TableCell align="right">
                      {row.areaName}
                    </TableCell>
                    <TableCell align="right">
                      {row.email}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(row.username)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No staff data available
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
