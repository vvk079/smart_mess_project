const express = require('express');
const router = express.Router();

// middlewares





//  AUTH 
router.post("/student/register", studentAuthController.registerstudent);
router.post("/student/login", studentAuthController.loginStudent);
router.post("/student/logout", studentAuthController.logoutStudent);

router.post("/admin/register", adminAuthController.registerAdmin);
router.post("/admin/login", adminAuthController.loginadmin);
router.post("/admin/logout", adminAuthController.logoutadmin);


