import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>No results to show.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const { score, total, results } = data;

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>Your Score: {score} / {total}</h1>

      <div style={{ marginTop: "1rem" }}>
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: 6,
              background: r.isCorrect ? "#e6ffe6" : "#ffe6e6",
            }}
          >
            <p><strong>{r.question}</strong></p>
            <p>Your answer: {r.selectedAnswer || "(no answer)"}</p>
            {!r.isCorrect && <p>Correct answer: {r.correctAnswer}</p>}
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/")} style={{ marginTop: "1rem" }}>
        Back to Upload
      </button>
    </div>
  );
}

export default Results;
