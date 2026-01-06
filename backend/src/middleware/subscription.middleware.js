// const Subscription = require("../models/Subscription.model");

// NOTE: Subscription model doesn't exist yet, so this middleware just passes through
async function checkSubscription(req, res, next) {
  // TODO: Implement subscription check when Subscription model is created
  // For now, allow all authenticated users to proceed
  next();
}

module.exports = checkSubscription;

