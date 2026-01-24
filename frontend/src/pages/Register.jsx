import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    window.location.href = "/";
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button>Register</button>
    </form>
  );
}
