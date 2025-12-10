const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: true
  },

  image: {
    type: String
  },

  isAvailable: {
    type: Boolean,
    required: true,
    default: true
  },

  price: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("FoodItem", foodItemSchema);
