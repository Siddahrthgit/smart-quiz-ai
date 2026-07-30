const Result = require("../models/Result");

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("question", "question options answer")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
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
