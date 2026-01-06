const express = require("express");
const cookieParser = require("cookie-parser");

// ROUTES 
const authRoutes = require("./routes/auth.route");
const mealBookingRoutes = require("./routes/mealbooking.routes");
const userRoutes = require("./routes/user.route");
const mealvoteRoutes = require("./routes/mealvote.routes");
// (pendings)
// const complaintRoutes = require("./routes/complaint.route");
// const adminDashboardRoutes = require("./routes/admin.dashboard.route");
// for feedback, complaint also

const app = express();

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
