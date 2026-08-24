import { Routes, Route, Navigate } from "react-router-dom";
import Upload from "./pages/Upload";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Auth />}
      />

      <Route
        path="/"
        element={token ? <Upload /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/quiz"
        element={token ? <Quiz /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/results"
        element={token ? <Results /> : <Navigate to="/login" replace />}
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
