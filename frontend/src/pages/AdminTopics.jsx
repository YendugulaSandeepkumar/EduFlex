import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminTopics() {
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    API.get("/topic/all").then(res => setTopics(res.data));
  }, []);

  const createTopic = async () => {
    await API.post("/topic/create", { title, description });
    window.location.reload();
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h2>Manage Topics</h2>

        <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
        <button onClick={createTopic}>Add Topic</button>

        <ul>
          {topics.map(t => (
            <li key={t._id}>{t.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
