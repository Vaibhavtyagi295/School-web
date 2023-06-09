import React from 'react';
import { Link } from 'react-router-dom';
import "./admiN.css"

function AdminContainer() {
  return (
    <div className="admin-container">
      <h2>Welcome, Admin</h2>
      <div className="admin-options">
        <div className="admin-option">
          <h3>Create Products</h3>
          <Link to="/adminCreate">Go to Create Product</Link>
        </div>
        <div className="admin-option">
          <h3>Check Attendance</h3>
          <Link to="/admincount">Go to Check Attendance</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminContainer;
