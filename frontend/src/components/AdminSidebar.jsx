import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      <h2>EduFlex Admin</h2>

      <button onClick={() => navigate("/admin")} style={styles.link}>
        📊 Dashboard
      </button>

      <button onClick={() => navigate("/admin/topics")} style={styles.link}>
        📚 Topics
      </button>

      <button onClick={() => navigate("/admin/users")} style={styles.link}>
        👥 Learners
      </button>

      <div style={styles.footer}>
        <button onClick={handleLogout} style={styles.logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#0f172a",
    color: "white",
    height: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  },
  link: {
    background: "none",
    border: "none",
    color: "white",
    padding: "10px",
    textAlign: "left",
    cursor: "pointer"
  },
  footer: {
    marginTop: "auto"
  },
  logout: {
    width: "100%",
    padding: "10px",
    background: "#dc2626",
    border: "none",
    color: "white"
  }
};
