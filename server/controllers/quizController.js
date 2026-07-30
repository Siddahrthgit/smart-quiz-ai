const Question = require("../models/Question");
const Result = require("../models/Result");

exports.getQuiz = async (req, res) => {
  try {
    const questions = await Question.find().select("-__v");

    res.json({
      success: true,
      totalQuestions: questions.length,
      questions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body;

    let score = 0;
    const results = [];

    for (const item of answers) {
      const question = await Question.findById(item.questionId);

      if (!question) continue;

      const isCorrect = item.selectedAnswer === question.answer;

      if (isCorrect) score++;

      const savedResult = await Result.create({
        question: question._id,
        selectedAnswer: item.selectedAnswer,
        correctAnswer: question.answer,
        isCorrect,
      });

      results.push({
        question: question.question,
        selectedAnswer: item.selectedAnswer,
        correctAnswer: question.answer,
        isCorrect,
      });
    }

    res.json({
      success: true,
      score,
      total: results.length,
      results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
