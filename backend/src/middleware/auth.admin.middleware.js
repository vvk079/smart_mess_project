const adminModel = require('../models/admin.model.js')
const jwt = require('jsonwebtoken')



async function authAdminMiddleWre(req,res,next){
    const token = req.cookie.token

    if(!token){
        return res.status(501).json({
            message:"please login first"
        })
    }
   
    

   try{
    const decoded = jwt.verify(token,process.envJWT_SECRET)
    const admin = adminModel.findOne(decoded.id)

    if(!admin){
        return res.status(502).json({
            message:"user not found"
        })
    }
    req.admin=admin
    next()



   }catch(err){
    return res.status(506).json({
        message:"invalid token "
    })

   }

}


module.exports=authAdminMiddleWre