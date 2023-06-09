import React, { useState } from 'react';
import "./login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the login credentials
    const loginData = {
      username: username,
      password: password
    };
  
    // Make a POST request to the login route
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the appropriate page based on the user type
          fetch('/getUserType') // Replace with the actual endpoint in your backend
            .then((res) => res.json())
            .then((data) => {
              if (data.userType === 'student') {
                // Redirect to the attendance page for students
                window.location.href = '/attendance';
              } else if (data.userType === 'admin') {
                // Redirect to the admin dashboard for admins
                window.location.href = '/admin-dashboard';
              } else {
                // Handle other user types or unknown user type
                console.log('Unknown user type');
              }
            })
            .catch((error) => {
              // Handle API errors or other exceptions
              console.error('An error occurred:', error);
            });
        } else {
          // Handle login failure
          console.log('Login failed');
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error('An error occurred:', error);
      });
  };
  

  return (
<div className="login-container">
      <div className="card">
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

 




export default Login;
