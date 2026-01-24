import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

export default function Topic() {
  const { id } = useParams(); // topicId
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [style, setStyle] = useState(user?.preferredStyle || "R");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTopicContent(style);
    // eslint-disable-next-line
  }, [style]);

  const fetchTopicContent = async (learningStyle) => {
    try {
      setLoading(true);
      setError("");

      const res = await API.post("/topic/start", {
        topicId: id,
        style: learningStyle
      });

      setContent(res.data.content);
    } catch (err) {
      setError("Failed to load topic content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <h2>Learning Topic</h2>

        {/* STYLE SELECTOR */}
        <div style={styles.styleBox}>
          <span>Select Learning Style:</span>
          {["V", "A", "R", "K"].map((s) => (
            <button
              key={s}
              style={{
                ...styles.styleBtn,
                background: style === s ? "#2563eb" : "#e5e7eb",
                color: style === s ? "white" : "black"
              }}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <p>Generating AI content...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div style={styles.contentBox}>
            <pre style={styles.content}>{content}</pre>
          </div>
        )}

        {/* QUIZ BUTTON */}
        <button
          style={styles.quizBtn}
          onClick={() => navigate(`/quiz/${id}`)}
        >
          Take Quiz
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  layout: {
    display: "flex"
  },
  main: {
    flex: 1,
    padding: "20px",
    background: "#f8fafc",
    minHeight: "100vh"
  },
  styleBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  },
  styleBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  contentBox: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  content: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.6",
    fontFamily: "inherit"
  },
  quizBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
