const mongoose = require('mongoose')


const adminModel= new mongoose.Schema({
    fullName:{
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true
    },
    password:{
        type:string,
        required:true
    },

})

module.exports=mongoose.model("admin",adminModel)