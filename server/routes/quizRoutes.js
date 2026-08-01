
const express = require("express");
const router = express.Router();

const {
  getQuiz,
  submitAnswers,
} = require("../controllers/quizController");

router.get("/", getQuiz);
router.post("/submit", submitAnswers);

module.exports = router;
