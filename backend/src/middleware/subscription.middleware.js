const Subscription = require("../models/Subscription.model");

async function checkSubscription(req, res, next) {
  try {
    const studentId = req.student._id;

    const subscription = await Subscription.findOne({
      studentId,
      isActive: true,
      endDate: { $gte: new Date() }
    });

    if (!subscription) {
      return res.status(403).json({
        message: "Subscription expired or not active. Please renew."
      });
    }

    // optional: attach subscription to request
    req.subscription = subscription;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Subscription check failed",
      error: error.message
    });
  }
}

module.exports = checkSubscription;
