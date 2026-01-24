export default function DashboardStats({ progress }) {
  const completed = progress.filter((p) => p.bestScore >= 70).length;
  const totalAttempts = progress.reduce(
    (sum, p) => sum + p.attempts,
    0
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>📘 Topics Completed: {completed}</div>
      <div style={styles.card}>🔁 Total Attempts: {totalAttempts}</div>
      <div style={styles.card}>🎯 Progress Records: {progress.length}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },
  card: {
    padding: "15px",
    background: "#f1f5f9",
    borderRadius: "8px",
    minWidth: "180px"
  }
};
