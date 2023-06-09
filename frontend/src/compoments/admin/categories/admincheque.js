import React, { useState } from 'react';

function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState(0);

  const handleCheckAttendance = async () => {
    try {
      const response = await fetch('/attendance');
      const data = await response.json();

      setAttendance(data.attendance);
      setTotalAttendance(data.attendance.length);
    } catch (error) {
      console.log('Error fetching attendance data:', error);
    }
  };

  return (
    <div className="attendance-page">
      <h2>Check Attendance</h2>
      <button onClick={handleCheckAttendance}>Check Attendance</button>
      <p>Total Attendance: {totalAttendance}</p>
      <ul>
        {attendance.map((student, index) => (
          <li key={index}>
            Student ID: {student.studentId}, Date: {student.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendancePage;
