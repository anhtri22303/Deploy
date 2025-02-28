import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoute from '../pages/AdminRoute';
import StaffRoute from '../pages/StaffRoute';
import MemberRoute from '../pages/MemberRoute';
import GuestRoute from '../pages/GuestRoute';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminRoute />} />
        <Route path="/admin/*" element={<GuestRoute />} />
        <Route path="/staff/*" element={<StaffRoute />} />
        <Route path="/member/*" element={<MemberRoute />} />
      </Routes>
    </Router>
  );
};

export default Routers;