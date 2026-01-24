export default function AdminStats({ stats }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>👥 Users: {stats.users}</div>
      <div style={styles.card}>📚 Topics: {stats.topics}</div>
      <div style={styles.card}>📝 Attempts: {stats.attempts}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px"
  },
  card: {
    padding: "15px",
    background: "#f1f5f9",
    borderRadius: "8px",
    minWidth: "150px"
  }
};
