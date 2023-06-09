import React, { useState } from 'react';
import "./signup.css"

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentClass, setStudentClass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // User registration successful
        // You can perform any necessary actions, such as displaying a success message, redirecting to a different page, etc.
        console.log('User registered successfully!');
      } else {
        // User registration failed
        // You can handle the error accordingly, such as displaying an error message
        console.log('User registration failed.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }

    // Reset the form after submission
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
<div className="signup-container">
      <div className="card">
        <div className="card-header">
          <h2>Sign Up</h2>
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="class">Class:</label>
              <select
                id="class"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
              >
                <option value="">Select a class</option>
                <option value="Class A">Class 8</option>
                <option value="Class B">Class 9</option>
                <option value="Class C">Class 10</option>
                <option value="Class C">Class 11</option>
                <option value="Class C">Class 12</option>
                {/* Add more class options as needed */}
              </select>
            </div>
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;
