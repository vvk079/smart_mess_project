const mongoose = require("mongoose");

const dailyMenuSchema = new mongoose.Schema({

  date: {
    type: String,
    required: true
    // format: YYYY-MM-DD
  },

  type: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: true
  },

  foodItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem"
    }
  ],

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });


// ek date + ek meal ka sirf ek menu ho
dailyMenuSchema.index({ date: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("DailyMenu", dailyMenuSchema);
