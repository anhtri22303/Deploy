import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import { AdminSidebar } from './AdminSideBar';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div>
            <AdminHeader handleToggleSidebar={handleToggleSidebar} />
            <AdminSidebar isOpen={sidebarOpen} handleClose={handleToggleSidebar} />
            <div style={{ marginLeft: sidebarOpen && !useMediaQuery("(max-width:1080px)") ? '20vw' : '0', transition: 'margin-left 0.3s' }}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
