const express = require('express')
const router = express.Router()
const admin = require('../models/admin.model')
const authAdminMiddleWre = require('../middleware/auth.admin.middleware')


router.get("/admin/profile",authAdminMiddleWre,async(req,res)=>{

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

module.exports=router

