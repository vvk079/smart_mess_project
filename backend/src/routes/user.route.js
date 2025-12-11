const express = require('express')
const router = express.Router()
const authstudentmiddleware = require('../middleware/auth.user.middleware.js')

const student = require('../models/Students.model.js')


// this require so that student can logged in for the interval of time 
router.get("/profile",authstudentmiddleware, async (req,res)=>{

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


module.exports=router

