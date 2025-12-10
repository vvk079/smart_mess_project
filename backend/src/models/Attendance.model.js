const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  date: {
    type: Date,
    required: true,
  },

  mealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: true
  },

  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  }

}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
