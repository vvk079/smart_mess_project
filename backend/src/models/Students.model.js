const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },


  rollNo: {
    type: String,
    required: false
  },

  course: {
    type: String,
    required: false
  },

  batch: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: true
  },

  studentType: {
    type: String,
    enum: ["Regular", "Hosteler"],
    required: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
