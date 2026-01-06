require('dotenv').config();
const app = require("./src/app.js");
const connectdb = require('./src/db/db.js');

const start = async () => {
    try {
        await connectdb();
        app.listen(3000, () => {
            console.log("🚀 Server is running on http://localhost:3000");
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

start();