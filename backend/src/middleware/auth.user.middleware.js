const studentModel = require('../models/Students.model');
const jwt = require('jsonwebtoken');

async function authStudentMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await studentModel.findById(decoded.id);
    if (!student) {
      return res.status(401).json({
        message: "Student not found"
      });
    }

    req.student = student;
    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = authStudentMiddleware;
