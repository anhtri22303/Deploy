import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AdminHeader = ({ handleToggleSidebar }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");

    return (
        <AppBar position="static" sx={{ backgroundColor: '#0F2E4A' }}>
            <Toolbar>
                {isSmallScreen && (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
