import { Dashboard, ShoppingBag } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import DiamondIcon from '@mui/icons-material/Diamond';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';
const menu = [
    { title: "Home", icon: <HomeIcon fontSize="large" sx={{ color: 'white' }} />, path: "/" },
    { title: "Dashboard", icon: <Dashboard fontSize="large" sx={{ color: 'white' }} />, path: "/dashboard" },
    { title: "Orders", icon: <ShoppingBag fontSize="large" sx={{ color: 'white' }} />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon fontSize="large" sx={{ color: 'white' }} />, path: "/menu" },
    // { title: "Category", icon: <CategoryIcon fontSize="large" sx={{ color: 'white' }} />, path: "/category" },
    // { title: "Ingredients", icon: <DiamondIcon fontSize="large" sx={{ color: 'white' }} />, path: "/ingredients" },
    { title: "Staff", icon: <GroupIcon fontSize="large" sx={{ color: 'white' }} />, path: "/teams" },
    { title: "Customer", icon: <ChecklistIcon fontSize="large" sx={{ color: 'white' }} />, path: "/customer" },
    // { title: "Buyback", icon: <ShoppingCartCheckoutIcon fontSize="large" sx={{ color: 'white' }} />, path: "/buyback" },
    // { title: "Details", icon: <AdminPanelSettingsIcon fontSize="large" sx={{ color: 'white' }} />, path: "/details" },
    { title: "Events", icon: <EventIcon fontSize="large" sx={{ color: 'white' }} />, path: "/event" },
    { title: "Logout", icon: <LogoutIcon fontSize="large" sx={{ color: 'red' }} />, path: "/logout" },
];

export const AdminSidebar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showIcons, setShowIcons] = useState(false);

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/admin/jewelry${item.path}`);
        }
        handleClose();
    };

    const handleLogoClick = () => {
        navigate("/admin/jewelry");
        handleClose();
    };

    const handleMouseEnter = () => {
        setShowIcons(true);
    };

    const handleMouseLeave = () => {
        setShowIcons(false);
    };

    return (
        <div className="sidebar-container">
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                open={true}
                anchor='left'
                sx={{ zIndex: 1 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col items-center text-xl space-y-4 p-4' style={{ backgroundColor: '#0F2E4A' }}>
                    <div className='w-full flex justify-center items-center py-4 cursor-pointer' onClick={handleLogoClick}>
                        <img src="https://cdn.pnj.io/images/logo/pnj.com.vn.png" alt="Logo" className='h-20' style={{ backgroundColor: '#00ABE1', padding: '8px', borderRadius: '50%' }} />
                    </div>
                    <Divider className='w-full' />
                    <div className='w-full'>
                        {menu.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => handleNavigate(item)}
                                className='w-full flex items-center gap-5 p-3 cursor-pointer rounded transition-all hover:bg-blue-600 hover:text-white'
                                style={{ backgroundColor: '#0F2E4A' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', width: '40px' }}>
                                        {item.icon}
                                    </div>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'inherit' }}>{item.title}</Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
