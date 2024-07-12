import CreateIcon from '@mui/icons-material/Create';
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
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllCategory({ jwt }));
  }, [dispatch, jwt]);

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ padding: 2, margin: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="create category">
              <CreateIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6"  sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Jewelry Category
            </Typography>
          }
          sx={{ pt: 2, alignItems: 'center' }}
        />
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
              {category.categories.map((item) => (
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
        <Box sx={modalStyle}>
          <CreateCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
}
