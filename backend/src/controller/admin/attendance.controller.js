const MealBooking = require("../models/MealBooking.model");

async function confirmMealConsumed(req, res) {
  const { bookingId } = req.body;

  const booking = await MealBooking.findById(bookingId);

  if (!booking || booking.bookingStatus !== "Booked") {
    return res.status(400).json({
      message: "Invalid booking"
    });
  }

  booking.attendanceStatus = "Consumed";
  await booking.save();

  res.status(200).json({
    message: "Attendance marked as consumed",
    booking
  });
}

module.exports = { confirmMealConsumed ,
                   
};
