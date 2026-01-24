import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  if (!user) return null; // hide navbar on launch page

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <h3 style={styles.logo}>EduFlex</h3>

      {/* MENU */}
      <div style={styles.menu}>
        {/* Learner Menu */}
        {user.role === "learner" && (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/progress" style={styles.link}>Progress</Link>
          </>
        )}

        {/* Admin Menu */}
        {user.role === "admin" && (
          <>
            <Link to="/admin" style={styles.link}>Admin Dashboard</Link>
            <Link to="/admin/topics" style={styles.link}>Manage Topics</Link>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <span style={styles.role}>{user.role.toUpperCase()}</span>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#0f172a",
    color: "white"
  },
  logo: {
    margin: 0
  },
  menu: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  role: {
    background: "#2563eb",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px"
  },
  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px"
  }
};
