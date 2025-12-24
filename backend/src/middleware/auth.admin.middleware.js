const adminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');

async function authAdminMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await adminModel.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({
        message: "Admin not found"
      });
    }

    req.admin = admin;
    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = authAdminMiddleware;
