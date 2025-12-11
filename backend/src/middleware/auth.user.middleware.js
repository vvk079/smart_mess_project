const studentmodel = require('../models/Students.model.js')

const jwt = require('jsonwebtoken')




async function authstudentmiddleware (req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(402).json({
            message:"please login first"
        })
    }


    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const student = await studentmodel.findOne(decoded._id)

        if(!student){
            return res.status(401).json({
                message:"Student not found"
            })
        }

        req.student=student;
        next()
        
    } catch (error) {
        return res.status(403).json({
            message:"invalid token"
        })

        
    }

        
}


module.exports=authstudentmiddleware;
