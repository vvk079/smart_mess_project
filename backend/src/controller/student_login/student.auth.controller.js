const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const studentmodel = require("../../models/Students.model")
const cookie = require('cookie-parser')



async function registerstudent(req,res) {
    // take input form the body
    let{
     fullName,
    email,
    password,
    rollNo,
    course,
    batch,
    studentType
    } = req.body;
    // check student is already registered ?
    const alreadystudent = await studentmodel.findOne({
        email
    })

    if(alreadystudent){
        return res.status(400).json({
            message:"student is alreay register"
        })
    }
    // bcrypt the password with hasded
    const hasded = await bcrypt.hash(password,10)


    //create the student acc in db 


    const student = await studentmodel.create({
         fullName,
    email,
    password:hasded,
    rollNo,
    course,
    batch,
    studentType
    })


    const token = jwt.sign(
        {id:student._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

    )

    res.cookie ("token",token,{
        httpOnly:true,

    })

    res.status(200).json({
        message:"Now you are registerd ! "
    })
    
}

async function loginStudent(req,res) {


    let{email,password} = req.body;

    const student = await studentmodel.findOne({
        email
    })

    if(!student){
       return res.status(401).json({
            message:"student is not existed"
        })
    }
     if (!student.password) {
            return res.status(500).json({ message: "password not stored in DB" });
        }

    const ispasswordvalid = await bcrypt.compare(password,student.password)

    if(!ispasswordvalid){
       return res.status(402).json({
            message:"password is not valid"
        })
    }

    const token = jwt.sign(
        {id:student._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )

    res.cookie("token",token,{
        httpOnly:true

    })

    return res.status(200).json({
        message:"login sucessfull"
    })


    
}


module.exports ={
    registerstudent,
    loginStudent
}