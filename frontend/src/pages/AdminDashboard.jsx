import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminStats from "../components/AdminStats";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h2>Admin Dashboard</h2>
        {stats ? <AdminStats stats={stats} /> : <p>Loading...</p>}
      </div>
    </div>
  );
}
