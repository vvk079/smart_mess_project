const MealVote = require("../../models/MealVote.model");

async function voteMeal(req, res) {
    const { mealOption } = req.body;
    const studentId = req.student._id;
    const date = new Date().toISOString().split('T')[0];

    try {
        const vote = await MealVote.create({
            studentId,
            mealOption,
            date
        });

        res.status(201).json({
            message: "Vote recorded successfully",
            vote
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: "You have already voted for today"
            });
        }
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

async function getVoteCounts(req, res) {
    const date = new Date().toISOString().split('T')[0];

    try {
        const votes = await MealVote.aggregate([
            { $match: { date } },
            { $group: { _id: "$mealOption", count: { $sum: 1 } } }
        ]);

        // Format as a simple object { "Option1": count, "Option2": count }
        const voteCounts = {};
        votes.forEach(v => {
            voteCounts[v._id] = v.count;
        });

        res.status(200).json({
            voteCounts
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

async function getMyVote(req, res) {
    const studentId = req.student._id;
    const date = new Date().toISOString().split('T')[0];

    try {
        const vote = await MealVote.findOne({ studentId, date });
        res.status(200).json({ vote });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { voteMeal, getVoteCounts, getMyVote };
