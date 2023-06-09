import React, { useState } from 'react';

const AttendancePage = () => {
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the studentId
    const attendanceData = {
      studentId: studentId,
    };

    // Make a POST request to the attendance endpoint
    fetch('/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div>
      <h2>Attendance Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input type="text" value={studentId} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit Attendance</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AttendancePage;
