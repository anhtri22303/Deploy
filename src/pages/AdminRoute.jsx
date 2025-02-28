import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Dashboard from '../components/Admin/Dashboard';
import PoolTables from '../components/Admin/PoolTables';
import User from '../components/Admin/User';


const AdminRoute = () => {
  const handleClose = () => {
    // Handle sidebar close action
  };

  return (
    <div>
        <h1>admin page</h1>
        <div className="sidebar" style={{ width: '250px', height: '100vh', backgroundColor: '#f8f9fa', padding: '20px', position: 'fixed', top: 0, left: 0 }}>
      <button onClick={handleClose} style={{ marginBottom: '20px' }}>Close</button>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/user">User</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
      {/* <div className='lg:flex'>
        <div>
          <AdminSidebar handleClose={handleClose} />
        </div>
        <div className='lg:w-[85%]' style={{ marginLeft: '250px' }}>
          <Routes>
            <Route path='/' element={<PoolTables />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user' element={<User />} />
            <Route path='/logout' element={<LogOut />} />
          </Routes>
        </div>
      </div> */}
    </div>
  );
};

export default AdminRoute;

