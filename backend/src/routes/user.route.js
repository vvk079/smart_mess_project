const express = require('express')
const router = express.Router()

const authStudentMiddleware = require('../middleware/auth.user.middleware');

const student = require('../models/Students.model.js')


//controller
const menuStudentController = require('../controller/student_login/menu.controller');
const bookingController = require("../controller/student_login/booking.controller");
const attendanceStudentController = require("../controller/student_login/attendance.controller");



// this require so that student can logged in for the interval of time 
router.get("/profile",authStudentMiddleware, async (req,res)=>{

    try{

        const {fullName,email,_id} = req.student
        res.json({fullName,email,_id});

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"server error"
        })

    }

})


//menu-view
router.get(
  "/menu/today",
  authStudentMiddleware,
  menuStudentController.viewTodayMenu
);

router.get(
  "/menu/weekly",
  authStudentMiddleware,
  menuStudentController.viewWeeklyMenu
);

// booking 
router.post(
  "/booking",
  authStudentMiddleware,
  bookingController.bookMeal
);

router.get(
  "/booking/my",
  authStudentMiddleware,
  bookingController.viewMyBookings
);

// attendance 
router.get(
  "/attendance/my",
  authStudentMiddleware,
  attendanceStudentController.viewMyAttendance
);



module.exports=router

