const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
