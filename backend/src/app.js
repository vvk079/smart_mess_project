const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth.route");
const mealBookingRoutes = require("./routes/mealbooking.routes");
const userRoutes = require("./routes/user.route");
const mealvoteRoutes = require("./routes/mealvote.routes");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mysmartmess.netlify.app"
  ],
  credentials: true
}));

//  GLOBAL MIDDLEWARES 
app.use(express.json());
app.use(cookieParser());

// FOR CHECK 
app.get("/", (req, res) => {
  res.status(200).send("✅ Smart Mess Backend is running");
});

// API ROUTES 

// Auth (student + admin)
app.use("/api/auth", authRoutes);

// Meal booking + attendance + cutoff + subscription
app.use("/api/meal", mealBookingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vote", mealvoteRoutes);

//  404 HANDLER 
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

module.exports = app;
