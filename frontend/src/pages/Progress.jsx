import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Progress() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/progress/my").then(res => setData(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>My Learning Progress</h2>

        {data.map(p => (
          <div key={p._id} style={{ marginBottom: "15px" }}>
            <h4>{p.topicId.title}</h4>
            <p>Best Score: {p.bestScore}%</p>
            <p>Attempts: {p.attempts}</p>
            <p>Learning Style: {p.lastStyle}</p>
          </div>
        ))}
      </div>
    </>
  );
}
