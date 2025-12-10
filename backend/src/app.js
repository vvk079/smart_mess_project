const cookieParser = require('cookie-parser');
const express = require('express')

const authroutes = require('./routes/auth.route')

const app = express()


app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hey its working")
});



app.use("/api/user",authroutes)




module.exports=app;