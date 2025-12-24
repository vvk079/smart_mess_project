const express = require('express')
const router = express.Router()
const admin = require('../models/admin.model')


//middleware
const authAdminMiddleware = require('../middleware/auth.admin.middleware');

//controller
const menuAdminController = require('../controller/admin/menu.controller');
const foodItemController = require('../controller/admin/fooditem.controller');
const attendanceController = require("../controller/admin/attendance.controller");


router.get("/admin/profile",authAdminMiddleware,async(req,res)=>{

    try{

        const {fullName,email,_id} = req.admin
        res.json({fullName,email,_id});

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"server error"
        })

    }

})


// menu-view 
router.post(
  "/fooditem",
  authAdminMiddleware,
  foodItemController.createFoodItem
);

router.post(
  "/menu",
  authAdminMiddleware,
  menuAdminController.createDailyMenu
);

router.post(
  "/menu/:menuId/food",
  authAdminMiddleware,
  menuAdminController.addFoodItemToMenu
);

router.patch(
  "/menu/:menuId/status",
  authAdminMiddleware,
  menuAdminController.updateMenuStatus
);


//attendance -view 
router.post(
  "/attendance/mark",
  authAdminMiddleware,
  attendanceController.markAttendance
);

router.get(
  "/attendance/today",
  authAdminMiddleware,
  attendanceController.viewTodayAttendance
);



module.exports=router

