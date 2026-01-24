import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>EduFlex</h2>

      <button style={styles.link} onClick={() => navigate("/dashboard")}>
        📊 Dashboard
      </button>

      <button style={styles.link} onClick={() => navigate("/progress")}>
        📈 My Progress
      </button>

      <button style={styles.link} onClick={() => navigate("/dashboard")}>
        📚 Topics
      </button>

      <button style={styles.link} disabled>
        👤 Profile
      </button>

      <div style={styles.footer}>
        <button style={styles.logout} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#1e293b",
    color: "white",
    height: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    marginBottom: "30px"
  },
  link: {
    background: "none",
    border: "none",
    color: "white",
    padding: "10px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px"
  },
  footer: {
    marginTop: "auto"
  },
  logout: {
    width: "100%",
    padding: "10px",
    background: "#dc2626",
    border: "none",
    color: "white",
    cursor: "pointer"
  }
};
