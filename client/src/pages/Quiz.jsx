import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get("/quiz");
        if (res.data.success) {
          setQuestions(res.data.questions);
        } else {
          setError("Could not load quiz.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const selectAnswer = (questionId, option) => {
    setSelected((prev) => ({ ...prev, [questionId]: option }));
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    const answers = questions.map((q) => ({
      questionId: q._id,
      selectedAnswer: selected[q._id] || "",
    }));

    try {
      const res = await api.post("/quiz/submit", { answers });

      if (res.data.success) {
        navigate("/results", { state: res.data });
      } else {
        setError("Submission failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading quiz...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  if (questions.length === 0)
    return <p style={{ padding: "2rem" }}>No questions found. Upload a file first.</p>;

  const q = questions[current];

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <p>
        Question {current + 1} of {questions.length}
      </p>
      <h2>{q.question}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {q.options.map((opt, i) => (
          <label
            key={i}
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: 6,
              background: selected[q._id] === opt ? "#e0f0ff" : "transparent",
            }}
          >
            <input
              type="radio"
              name={q._id}
              checked={selected[q._id] === opt}
              onChange={() => selectAnswer(q._id, opt)}
            />{" "}
            {opt}
          </label>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button onClick={prevQuestion} disabled={current === 0}>
          Previous
        </button>

        {current < questions.length - 1 ? (
          <button onClick={nextQuestion}>Next</button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
