const express = require('express')
const router = express.Router()

const authstudent = require('../controller/student_login/student.auth.controller')
const authadmin = require('../controller/admin/admin.auth.controller')


router.post("/student/register",authstudent.registerstudent)
router.post("/student/login",authstudent.loginStudent)
router.post("/admin/register",authadmin.registerAdmin)
router.post("/admin/login",authadmin.loginadmin)







module.exports=router

