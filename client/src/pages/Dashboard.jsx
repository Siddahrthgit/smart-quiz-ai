import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.name || "Student"} 👋</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>📝</span>
            <h3>Quizzes</h3>
            <strong>0</strong>
          </div>

          <div className="stat-card">
            <span>🎯</span>
            <h3>Accuracy</h3>
            <strong>0%</strong>
          </div>

          <div className="stat-card">
            <span>🔥</span>
            <h3>Streak</h3>
            <strong>0 days</strong>
          </div>

          <div className="stat-card">
            <span>🏆</span>
            <h3>Score</h3>
            <strong>0</strong>
          </div>
        </div>

        <div className="welcome-card">
          <h2>🚀 Smart Quiz AI</h2>
          <p>
            Upload your study material and let AI generate personalized
            questions, track your performance, and help you revise smarter.
          </p>
        </div>
      </main>
    </div>
  );
}
