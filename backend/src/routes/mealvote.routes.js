const express = require('express');
const router = express.Router();
const authStudentMiddleware = require('../middleware/auth.user.middleware');
const mealvoteController = require('../controller/student_login/mealvote.controller');

router.post('/', authStudentMiddleware, mealvoteController.voteMeal);
router.get('/counts', authStudentMiddleware, mealvoteController.getVoteCounts);
router.get('/my', authStudentMiddleware, mealvoteController.getMyVote);

module.exports = router;
