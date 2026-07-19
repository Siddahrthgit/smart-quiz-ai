const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  console.log("Upload request received");

  try {
    // ...
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

    res.json({
      success: true,
      filename: req.file.originalname,
      content: text
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;