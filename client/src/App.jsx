import { Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
