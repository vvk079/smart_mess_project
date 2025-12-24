const Attendance = require("../../models/Attendance.model");

async function viewMyAttendance(req, res) {
  const attendance = await Attendance.find({
    studentId: req.student._id
  }).sort({ date: -1 });

  res.status(200).json(attendance);
}

module.exports = { viewMyAttendance };
