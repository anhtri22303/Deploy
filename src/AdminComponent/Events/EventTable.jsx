import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, deleteCoupon } from '../../component/State/Event/Action';
import format from 'date-fns/format';

const EventTable = () => {
  const dispatch = useDispatch();
  const coupon = useSelector(state => state.coupon);
  const jwt = localStorage.getItem("jwt");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  useEffect(() => {
    dispatch(getCoupons(jwt));
  }, [dispatch, jwt]);

  const handleDeleteClick = (couponId) => {
    setOpenDeleteDialog(true);
    setCouponToDelete(couponId);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteCoupon(couponToDelete, jwt));
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setCouponToDelete(null);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
     <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem' }}>Events</div>

     <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#0B4CBB' }}>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Time Start
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Time End
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Giftcode
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Discount
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupon.coupons.length > 0 ? (
            coupon.coupons.map((event, index) => (
              <TableRow key={index} sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {event.images && (
                    <img src={event.images} alt="Event" style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />
                  )}
                </TableCell>
                <TableCell>{format(new Date(event.validFrom), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{format(new Date(event.validUntil), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{event.code}</TableCell>
                <TableCell>{event.discountPercentage}%</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteClick(event.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No events available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default EventTable;
