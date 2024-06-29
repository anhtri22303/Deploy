import { Dashboard, ShoppingBag } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import DiamondIcon from '@mui/icons-material/Diamond';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import HomeIcon from '@mui/icons-material/Home';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';

const menu = [
    { title: "Home", icon: <HomeIcon fontSize="large" />, path: "/" },
    { title: "Dashboard", icon: <Dashboard fontSize="large" />, path: "/dashboard" },
    { title: "Orders", icon: <ShoppingBag fontSize="large" />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon fontSize="large" />, path: "/menu" },
    { title: "Category", icon: <CategoryIcon fontSize="large" />, path: "/category" },
    { title: "Ingredients", icon: <DiamondIcon fontSize="large" />, path: "/ingredients" },
    { title: "Events", icon: <EventIcon fontSize="large" />, path: "/event" },
    { title: "Details", icon: <AdminPanelSettingsIcon fontSize="large" />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon fontSize="large" />, path: "/logout" },
];

export const AdminSidebar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    return (
        <div>
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                open={true}
                anchor='left'
                sx={{ zIndex: 1 }}
            >
                <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col items-center text-xl space-y-4 p-4'>
                    <div className='w-full flex justify-center items-center py-4 cursor-pointer' onClick={handleLogoClick}>
                        <img src="https://cdn.pnj.io/images/logo/pnj.com.vn.png" alt="Logo" className='h-12' />
                    </div>
                    <Divider className='w-full' />
                    <div className='w-full'>
                        {menu.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => handleNavigate(item)}
                                className='w-full flex items-center gap-5 p-3 cursor-pointer hover:bg-gray-200 rounded transition-colors'
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
