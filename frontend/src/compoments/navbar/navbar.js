import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const [userType, setUserType] = useState(null); // Add user type state variable

  const handleClick = () => setClick(!click);

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic here, such as clearing session or token
    setUserType(null); // Reset user type state after logout
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          DELHI PUBLIC SCHOOL <i className="fas fa-code"></i>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-link"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          {userType === "student" && (
            <>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/attendance"
                  activeClassName="active"
                  className="nav-link"
                  onClick={handleClick}
                >
                  Attendance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/examform"
                  activeClassName="active"
                  className="nav-link"
                  onClick={handleClick}
                >
                  Exam Form
                </NavLink>
              </li>
            </>
          )}
          {userType === "admin" && (
            <li className="nav-item">
              <NavLink
                exact
                to="/admin-dashboard"
                activeClassName="active"
                className="nav-link"
                onClick={handleClick}
              >
                Admin Dashboard
              </NavLink>
            </li>
          )}
          {!userType && (
            <>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-link"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/signup"
                  activeClassName="active"
                  className="nav-link"
                  onClick={handleClick}
                >
                  Sign up
                </NavLink>
              </li>
            </>
          )}
          {userType && (
            <li className="nav-item">
              <NavLink
                exact
                to="/logout"
                className="nav-link"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>

        <div className="nav-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
