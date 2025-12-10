const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    enum: ["recharge", "monthly"],
    required: true
  },

  status: {
    type: String,
    enum: ["success", "pending", "failed"],
    default: "pending"
  },

  transactionId: {
    type: String,
    unique: true
  },

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
