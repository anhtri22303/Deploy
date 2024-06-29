import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { getAllComponent } from '../../component/State/Components/Action';
import UpdateForm from './UpdateForm';
import CreateIngredientsForm from './CreateIngredientsForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const IngredientTable = () => {
    const [open, setOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const { components } = useSelector((state) => state.component);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(getAllComponent({ jwt }));
    }, [dispatch, jwt]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedComponent(null);
    };

    const handleUpdateClick = (component) => {
        setSelectedComponent(component);
        setOpen(true);
    };

    return (
        <Box>
            <Card className='mt-1' sx={{ padding: 2, margin: 2 }}>
                <CardHeader
                    action={
                        <IconButton onClick={handleOpen} aria-label="create">
                            <CreateIcon />
                        </IconButton>
                    }
                    title="Ingredients"
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="ingredient table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Price Buyback</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {components.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right">{item.pricebuyback}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleUpdateClick(item)} aria-label="update">
                                            Update
                                        </IconButton>
                                    </TableCell>
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
                    {selectedComponent ? (
                        <UpdateForm component={selectedComponent} onClose={handleClose} />
                    ) : (
                        <CreateIngredientsForm onClose={handleClose} />
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default IngredientTable;
