const express = require("express");
const router = express.Router();

const authStudentMiddleware = require("../middleware/auth.user.middleware");
const authAdminMiddleware = require("../middleware/auth.admin.middleware");

const mealBookingController = require(
  "../controller/student_login/mealbooking.controller"
);

const attendanceController = require(
  "../controller/attendance.controller"
);

const checkSubscription = require(
  "../middleware/subscription.middleware"
);


//  STUDENT SIDE 

// book meal (before cutoff)
router.post(
  "/book",
  authStudentMiddleware,
  checkSubscription,
  mealBookingController.bookMeal
);

// cancel meal (before cutoff)
router.post(
  "/cancel",
  authStudentMiddleware,
  checkSubscription,
  mealBookingController.cancelMeal
);

// view my bookings
router.get(
  "/my",
  authStudentMiddleware,
  mealBookingController.viewMyBookings
);


// ADMIN / STAFF SIDE 
// confirm meal consumed (auto attendance)
router.post(
  "/consume",
  authAdminMiddleware,
  attendanceController.confirmMealConsumed
);

module.exports = router;
