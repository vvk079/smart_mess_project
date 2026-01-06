const mongoose = require("mongoose");

const mealVoteSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    mealOption: {
        type: String,
        required: true
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true
    }
}, { timestamps: true });

// Ensure one vote per person per day
mealVoteSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("MealVote", mealVoteSchema);
