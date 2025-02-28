import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ handleClose }) => {
  return (
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
  );
};

export default AdminSidebar;
