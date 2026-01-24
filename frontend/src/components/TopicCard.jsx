export default function TopicCard({ topic, progress }) {
  return (
    <div style={styles.card}>
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>

      {progress ? (
        <>
          <p>Best Score: {progress.bestScore}%</p>
          <p>Attempts: {progress.attempts}</p>
          <p>Last Style: {progress.lastStyle}</p>

          <div style={styles.bar}>
            <div
              style={{
                ...styles.fill,
                width: `${progress.bestScore}%`
              }}
            >
              {progress.bestScore}%
            </div>
          </div>
        </>
      ) : (
        <p>🆕 Not started yet</p>
      )}

      <button
        style={styles.button}
        onClick={() =>
          (window.location.href = `/topic/${topic._id}`)
        }
      >
        {progress ? "Resume Learning" : "Start Learning"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  button: {
    marginTop: "10px",
    width: "100%",
    padding: "8px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  bar: {
    height: "16px",
    background: "#e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "5px"
  },
  fill: {
    height: "100%",
    background: "#22c55e",
    color: "white",
    fontSize: "12px",
    textAlign: "center"
  }
};
