require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateQuestions(text) {
  try {
    const prompt = `
You are an expert teacher.

Read the study material below and generate exactly 20 multiple-choice questions.

Return ONLY a valid JSON array.

Example:

[
  {
    "question":"What is Transportation?",
    "options":[
      "Movement of people",
      "Movement of goods",
      "Movement of people and goods",
      "None"
    ],
    "answer":"Movement of people and goods"
  }
]

Study Material:

${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let output = response.text || "";

    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const first = output.indexOf("[");
    const last = output.lastIndexOf("]");

    if (first === -1 || last === -1) {
      throw new Error("Gemini did not return valid JSON.");
    }

    return JSON.parse(output.substring(first, last + 1));
  } catch (err) {
    console.error("========== GEMINI ERROR ==========");
    console.error(err);
    throw err;
  }
}

module.exports = generateQuestions;
