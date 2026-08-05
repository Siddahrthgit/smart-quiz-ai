const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");

const Question = require("../models/Question");
const generateQuestions = require("../services/geminiService");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let text = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      const data = await pdf(dataBuffer);
      text = data.text;
    } else {
      text = fs.readFileSync(req.file.path, "utf8");
    }

    const generatedQuestions = await generateQuestions(text);

    await Question.deleteMany({});

    for (const q of generatedQuestions) {
      await Question.create({
        text: q.question,
        options: q.options,
        correctAnswer: q.options.indexOf(q.answer),
        sourceFile: req.file.originalname,
      });
    }

    res.json({
      success: true,
      message: "Questions generated successfully",
      totalQuestions: generatedQuestions.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
