const express = require('express')
const router = express.Router()

const authstudent = require('../controller/student_login/student.auth.controller')

router.post("/student/register",authstudent.registerstudent)



module.exports=router

