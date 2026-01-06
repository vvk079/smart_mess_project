const MealBooking = require("../../models/MealBooking.model");
const DailyMenu = require("../../models/DailyMenu.model");
const Attendance = require("../../models/Attendance.model");

async function bookMeal(req, res) {
  const { date, mealType } = req.body;
  const studentId = req.student._id;

  // Check if already booked
  const existingBooking = await MealBooking.findOne({
    studentId,
    date,
    mealType
  });

  if (existingBooking) {
    return res.status(400).json({
      message: `You have already booked ${mealType} for ${date}`
    });
  }

  // Booking created regardless of menu existence as per simplified requirement
  const booking = await MealBooking.create({
    studentId,
    date,
    mealType
  });

  // Automatically mark as Present (Attendance)
  await Attendance.create({
    studentId,
    date: new Date(date),
    mealType,
    status: "Present"
  });

  res.status(201).json({
    message: "Meal booked and attendance marked successfully",
    booking
  });
}

// Cancellation is disabled as per user request
async function cancelMeal(req, res) {
  return res.status(403).json({
    message: "Cancellations are not allowed"
  });
}


async function viewMyBookings(req, res) {
  const studentId = req.student._id;

  const bookings = await MealBooking.find({
    studentId,
    bookingStatus: "Booked"
  }).sort({ date: -1 });

  res.status(200).json({
    bookings
  });
}


module.exports = { bookMeal, cancelMeal, viewMyBookings };
