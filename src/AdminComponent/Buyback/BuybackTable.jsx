import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBuyback } from "../../component/State/Buyback/Action";
import {
  Box,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import format from "date-fns/format";
import SearchIcon from '@mui/icons-material/Search';

export default function BuyBackTable() {
  const { buyback } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllBuyback({ jwt }));
  }, [dispatch, jwt]);

  const filteredBuybacks = buyback?.buybacks.filter((buybackItem) =>
    buybackItem.customer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <TextField
            label="Search by Customer Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              mx: 5,
              width: '100%',
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
        </Box>
        <TableContainer component={Paper}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
            BuyBack Records
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Customer
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Date
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBuybacks &&
                filteredBuybacks.map((buybackItem) => (
                  <TableRow
                    key={buybackItem.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: 'black' }}>
                      {buybackItem.id}
                    </TableCell>
                    <TableCell align="center" sx={{  color: 'black' }}>
                      {buybackItem.customer.fullname}
                    </TableCell>
                    <TableCell align="center" sx={{  color: 'black' }}>
                      {buybackItem.buybackPrice}
                    </TableCell>
                    <TableCell align="center" sx={{  color: 'black' }}>
                      {format(
                        new Date(buybackItem.transactionDate),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
