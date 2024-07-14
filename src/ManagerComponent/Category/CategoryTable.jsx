import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Typography,
  TextField,  // Add TextField import
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Add SearchIcon import
import CreateIcon from '@mui/icons-material/Create'; // Ensure CreateIcon import is also included
import CreateCategoryForm from './CreateCategoryForm';
import { getAllCategory } from '../../component/State/Categories/Action';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function CategoryTable() {
  const { category } = useSelector(store => store);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    dispatch(getAllCategory({ jwt }));
  }, [dispatch, jwt]);

  useEffect(() => {
    setFilteredCategories(category.categories); // Initialize with all categories
  }, [category.categories]);

  const handleSearch = () => {
    const filtered = category.categories.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ padding: 2, margin: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="create category">
              <CreateIcon />
            </IconButton>
          }
          title={"Category Yewelry"}
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
          <Table sx={{ minWidth: 650 }} aria-label="category table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#0B4CBB' }}>
                <TableCell align="left">
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Name
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                      '&:hover': { backgroundColor: '#e0e0e0' },
                    }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No categories found with the given search criteria.
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
        <Box sx={modalStyle}>
          <CreateCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
}
