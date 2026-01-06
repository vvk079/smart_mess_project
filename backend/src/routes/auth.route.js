const express = require('express');
const router = express.Router();

const studentAuthController = require('../controller/student_login/student.auth.controller')
const studentmiddleware = require('../middleware/auth.user.middleware')
const adminAuthController = require('../controller/admin/admin.auth.controller')



// middlewares





//  AUTH 


router.post("/student/register", studentAuthController.registerstudent);
router.post("/student/login", studentAuthController.loginStudent);
router.post("/student/logout", studentAuthController.logoutStudent);




router.post("/admin/register", adminAuthController.registerAdmin);
router.post("/admin/login", adminAuthController.loginadmin);
router.post("/admin/logout", adminAuthController.logoutadmin);


module.exports = router;
