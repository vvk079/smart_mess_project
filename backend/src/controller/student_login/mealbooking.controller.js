const MealBooking = require("../../models/MealBooking.model");
const DailyMenu = require("../../models/DailyMenu.model");
const isBeforeCutoff = require("../../utills/cutoff.util");

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

  if (!isBeforeCutoff(mealType)) {
    return res.status(400).json({
      message: `Cutoff time for ${mealType} booking has passed`
    });
  }

  const menu = await DailyMenu.findOne({
    date,
    type: mealType,
    isActive: true
  });

  if (!menu) {
    return res.status(400).json({
      message: `Menu not available for ${mealType} on ${date}`
    });
  }

  const booking = await MealBooking.create({
    studentId,
    date,
    mealType
  });

  res.status(201).json({
    message: "Meal booked successfully",
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
