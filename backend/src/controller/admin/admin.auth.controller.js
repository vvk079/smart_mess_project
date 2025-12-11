const adminModel = require('../../models/admin.model')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function registerAdmin(req,res){

    let{
        fullName,email,
        password:hasded
    } = req.body

    const admin = await adminModel.findOne({
        email
    })

    if(admin){
        return res.status(400).json({
            message:"user is already existed"
        })
    }

    const password = bcrypt.hash(password,10);

    const user =await adminModel.create({
        fullName,
        email,
        password:hasded
    })

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )

    res.cookie("token",token,{
        httpOnly:true
    })

    return res.status(201).json({
        message:"admin is created"
    })





}


async function loginadmin(req,res){

    let{email,password}=req.body

    const admin = adminModel.findOne({
        email
    })

    if(!admin){
        return res.status(501).json({
            message:"user not existed"
        })
    }

    if(!adminModel.password){
        return res.status(502).json({
            message:"password is not stored in database"
        })
    }

    const ispasswordvalid = bcrypt.compare(password,adminModel.password)

    if(!ispasswordvalid){
        return res.status(500).json({
            Message:"invalid password"
        })
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )

    res.cookie("token",token,{
        httpOnly:true
    })

    return res.status(201).json({
        message:"login succesfully"
    })
}


module.exports={
    registerAdmin,
    loginadmin
}