const mongoose = require("mongoose");

const mealBookingSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  date: {
    type: String, // YYYY-MM-DD
    required: true
  },

  mealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: true
  },

  bookingStatus: {
    type: String,
    enum: ["Booked", "Cancelled"],
    default: "Booked"
  },

  attendanceStatus: {
    type: String,
    enum: ["Booked", "Consumed"],
    default: "Booked"
  }

}, { timestamps: true });

mealBookingSchema.index(
  { studentId: 1, date: 1, mealType: 1 },
  { unique: true }
);

module.exports = mongoose.model("MealBooking", mealBookingSchema);
