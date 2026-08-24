import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = [
    ["📊", "Dashboard", "/dashboard"],
    ["📄", "Upload", "/"],
    ["📝", "Quiz", "/quiz"],
    ["📈", "Results", "/results"],
    ["👤", "Profile", "/profile"],
    ["⚙️", "Settings", "/settings"],
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>🧠</span>
        <strong>Smart Quiz AI</strong>
      </div>

      <div className="sidebar-user">
        <div className="avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <strong>{user?.name || "User"}</strong>
          <small>{user?.email || ""}</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map(([icon, label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn" onClick={logout}>
        <span>🚪</span>
        Logout
      </button>
    </aside>
  );
}
