import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Alert,
  TextField,
} from "@mui/material";
import { Delete, Refresh as RefreshIcon, Create as CreateIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMenuItem, updateJewelryPrice, deleteFoodAction } from "../../component/State/Menu/Action";

const MenuTable = () => {
  const { menu } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNoItemAlert, setShowNoItemAlert] = useState(false);

  useEffect(() => {
    dispatch(getAllMenuItem({ jwt }));
  }, [dispatch, jwt]);

  const handleRefresh = () => {
    dispatch(updateJewelryPrice({ jwt }));
    window.location.reload();
  };

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (selectedItem) {
      dispatch(deleteFoodAction({ jewelryId: selectedItem.id, jwt }));
      handleClose();
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      setShowNoItemAlert(false);
    } else {
      const found = menu.menuItems.some(
        (item) => item.name.toLowerCase().includes(searchTerm)
      );
      setShowNoItemAlert(!found);
    }
  };

  return (
    <Box>
      <Card className="mt-1" sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardHeader
          action={
            <>
              <IconButton
                onClick={handleRefresh}
                aria-label="refresh"
                sx={{ marginRight: 2 }}
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                onClick={() => navigate("/admin/jewelry/add-menu")}
                aria-label="settings"
              >
                <CreateIcon />
              </IconButton>
            </>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Menu
            </Typography>
          }
          sx={{
            pt: 2,
            pb: 1,
            textAlign: "center",
            backgroundColor: "#0B4CBB",
          }}
        />
        <Box sx={{ p: 2 }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            onChange={handleSearch}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0B4CBB" }}>
                <TableCell align="left">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Image
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Jewelry Code
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Type
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Components
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Delete
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems
                .filter((row) =>
                  row.name.toLowerCase().includes(searchTerm)
                )
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e0e0e0" },
                      transition: "background-color 0.3s"
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src={row.images}
                        alt="Product Image"
                        style={{ width: 50, height: 50, borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.jewelryCategory.name}</TableCell>
                    <TableCell align="right">{row.components[0]?.name} with {row.components[1]?.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleClickOpen(row)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {/* Show message if no items found */}
              {searchTerm !== "" &&
                menu.menuItems
                  .filter((row) =>
                    row.name.toLowerCase().includes(searchTerm)
                  ).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Alert severity="warning">
                          No items found with the provided name.
                        </Alert>
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: 2 }}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MenuTable;
