import CreateIcon from '@mui/icons-material/Create';
import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateCategoryForm from './CreateCategoryForm';
import { getAllCategory } from '../../component/State/Categories/Action';


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
        <div>
            <Box>
                <Card className='mt-1' sx={{ padding: 2, margin: 2 }}>
                    <CardHeader
                        action={
                            <IconButton onClick={handleOpen} aria-label="create category">
                                <CreateIcon />
                            </IconButton>
                        }
                        title="Jewelry Category"
                        sx={{ pt: 2, alignItems: "center" }}
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="category table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.categories.map((item) => (
                                    <TableRow key={item.id}>
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
                    <Box sx={style}>
                        <CreateCategoryForm />
                    </Box>
                </Modal>
            </Box>
        </div>
    );
}
