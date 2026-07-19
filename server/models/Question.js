const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: {
    type: [String],
    validate: v => v.length >= 2,
    required: true
  },
  correctAnswer: { type: Number, required: true }, // index into options
  topic: { type: String, default: 'General' },
  sourceFile: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
