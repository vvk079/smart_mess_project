const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  message: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    enum: ["food", "staff", "cleanliness", "other"],
    default: "other"
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending"
  },

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
