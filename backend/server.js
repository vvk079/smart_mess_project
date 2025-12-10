require('dotenv').config();
const app = require("./src/app.js");
const connectdb = require('./src/db/db.js');

connectdb()
app.listen(3000,()=>{
    console.log("app is listing on port http://localhost:3000")

})