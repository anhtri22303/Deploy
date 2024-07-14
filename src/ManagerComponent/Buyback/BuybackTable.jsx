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
  CardHeader,
} from "@mui/material";
import format from "date-fns/format";
import SearchIcon from "@mui/icons-material/Search";

export default function BuyBackTable() {
  const { buyback } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBuybacks, setFilteredBuybacks] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false); // State to manage no results message

  useEffect(() => {
    dispatch(getAllBuyback({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, buyback]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowNoResults(false); // Reset no results notification
  };

  const handleSearch = () => {
    const filtered = buyback?.buybacks.filter((buybackItem) =>
      buybackItem.customer.fullname
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredBuybacks(filtered);
    // Check if there are no results to show the no results message
    if (searchTerm && filtered.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }
  };

  const handleSearchClick = () => {
    handleSearch(); // Trigger search when search icon is clicked
  };

  return (
    <Box sx={{ padding: 2.5 }}>
      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <TableContainer component={Paper}>
          <CardHeader
            title={"BuyBacks"}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <TextField
              id="search-input"
              label="Search by Customer Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
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
            <IconButton aria-label="search" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          </Box>
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
              {filteredBuybacks.length > 0 ? (
                filteredBuybacks.map((buybackItem) => (
                  <TableRow
                    key={buybackItem.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      {buybackItem.id}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "black" }}>
                      {buybackItem.customer.fullname}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "black" }}>
                      {buybackItem.buybackPrice}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "black" }}>
                      {format(
                        new Date(buybackItem.transactionDate),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No buybacks found with the given search criteria.
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
