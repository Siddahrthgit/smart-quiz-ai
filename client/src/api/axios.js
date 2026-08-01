import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-quiz-ai-1.onrender.com/api",
});

export default api;
