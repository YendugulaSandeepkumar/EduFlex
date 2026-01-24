import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import TopicCard from "../components/TopicCard";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [topicsRes, progressRes] = await Promise.all([
        API.get("/topic/all"),
        API.get("/progress/my")
      ]);
      setTopics(topicsRes.data);
      setProgress(progressRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <h2>Learner Dashboard</h2>

        {/* STATS */}
        <DashboardStats progress={progress} />

        {/* SEARCH BAR */}
        <div style={styles.searchBox}>
          <input
            placeholder="Enter topic name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={styles.input}
          />
          <button
            style={styles.searchBtn}
            onClick={() => setSearchTerm(searchInput)}
          >
            Search
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p>Loading topics...</p>
        ) : filteredTopics.length === 0 ? (
          <p>No topics found</p>
        ) : (
          <div style={styles.grid}>
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic._id}
                topic={topic}
                progress={progress.find(
                  (p) => p.topicId._id === topic._id
                )}
              />
            ))}
          </div>
        )}
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
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "8px",
    width: "260px"
  },
  searchBtn: {
    padding: "8px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  }
};
