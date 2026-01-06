const Attendance = require("../../models/Attendance.model");

async function viewMyAttendance(req, res) {
  const attendance = await Attendance.find({
    studentId: req.student._id
  }).sort({ date: -1 });

  res.status(200).json(attendance);
}

async function viewMyAttendanceSummary(req, res) {
  const studentId = req.student._id;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const records = await Attendance.find({
      studentId,
      date: { $gte: startOfMonth }
    });

    const summary = {
      Breakfast: records.filter(r => r.mealType === 'Breakfast' && r.status === 'Present').length,
      Lunch: records.filter(r => r.mealType === 'Lunch' && r.status === 'Present').length,
      Dinner: records.filter(r => r.mealType === 'Dinner' && r.status === 'Present').length,
      Total: records.filter(r => r.status === 'Present').length
    };

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { viewMyAttendance, viewMyAttendanceSummary };
