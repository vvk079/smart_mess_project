const mongoose = require("mongoose")

function connectdb(){


    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Data base is conected")
    })
    .catch((err)=>{
        console.log("db conection faild",err)
    })
}


module.exports=connectdb;