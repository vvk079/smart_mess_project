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
    required: true
  },

  course: {
    type: String,
    required: true
  },

  batch: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  studentType: {
    type: String,
    enum: ["Regular", "Hosteler"],
    required: true
  }
  
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
