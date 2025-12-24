const MealBooking = require("../../models/MealBooking.model");
const DailyMenu = require("../../models/DailyMenu.model");
const isBeforeCutoff = require("../../utils/cutoff.util");

async function bookMeal(req, res) {
  const { date, mealType } = req.body;
  const studentId = req.student._id;

  if (!isBeforeCutoff(mealType)) {
    return res.status(400).json({
      message: "Booking cutoff time passed"
    });
  }

  const menu = await DailyMenu.findOne({
    date,
    type: mealType,
    isActive: true
  });

  if (!menu) {
    return res.status(400).json({
      message: "Menu not available"
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

async function cancelMeal(req, res) {
  const { date, mealType } = req.body;
  const studentId = req.student._id;

  if (!isBeforeCutoff(mealType)) {
    return res.status(400).json({
      message: "Cancellation cutoff time passed"
    });
  }

  const booking = await MealBooking.findOne({
    studentId,
    date,
    mealType,
    bookingStatus: "Booked"
  });

  if (!booking) {
    return res.status(404).json({
      message: "No active booking found"
    });
  }

  booking.bookingStatus = "Cancelled";
  await booking.save();

  res.status(200).json({
    message: "Meal cancelled"
  });
}


module.exports = { bookMeal,cancelMeal };
