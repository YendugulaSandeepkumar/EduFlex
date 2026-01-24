import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h2>Registered Users</h2>

        {users.map(u => (
          <div key={u._id}>
            {u.name} - {u.email} ({u.role})
          </div>
        ))}
      </div>
    </div>
  );
}
