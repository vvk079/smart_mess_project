require("dotenv").config();
const app = require("./src/app.js");
const connectdb = require("./src/db/db.js");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectdb();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
