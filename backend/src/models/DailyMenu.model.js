const mongoose = require("mongoose");

const dailyMenuSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true   // ek din ka ek hi menu
  },

  breakfast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem"
    }
  ],

  lunch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem"
    }
  ],

  dinner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem"
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("DailyMenu", dailyMenuSchema);
