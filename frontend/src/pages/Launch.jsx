import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Launch() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ LOGIN is default
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [adminSecret, setAdminSecret] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 REGISTER FLOW
      if (!isLogin) {
        await API.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: isAdmin ? "admin" : "learner",
          adminSecret
        });
      }

      // 🔹 LOGIN FLOW (for both login & register)
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      login(res.data);

      // 🔹 Role-based redirect
      res.data.user.role === "admin"
        ? navigate("/admin")
        : navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT INFO */}
      <div style={styles.left}>
        <h1>EduFlex</h1>
        <p>AI-powered adaptive learning platform</p>
        <ul>
          <li>📘 Personalized content</li>
          <li>🧠 Adaptive quizzes</li>
          <li>📊 Performance tracking</li>
          <li>🤖 Generative AI learning</li>
        </ul>
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={submit} style={styles.form}>
          {/* Name only for Register */}
          {!isLogin && (
            <input
              placeholder="Name"
              required
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            placeholder="Email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Admin toggle only during Register */}
          {!isLogin && (
            <>
              <label style={styles.checkbox}>
                <input
                  type="checkbox"
                  onChange={() => setIsAdmin(!isAdmin)}
                />
                Register as Admin
              </label>

              {isAdmin && (
                <input
                  placeholder="Admin Secret Code"
                  required
                  onChange={(e) =>
                    setAdminSecret(e.target.value)
                  }
                />
              )}
            </>
          )}

          <button>{isLogin ? "Login" : "Register & Start"}</button>
        </form>

        <p style={styles.switch}>
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span
            style={styles.link}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial"
  },
  left: {
    flex: 1,
    background: "#1e293b",
    color: "white",
    padding: "60px"
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px"
  },
  checkbox: {
    display: "flex",
    gap: "5px",
    alignItems: "center"
  },
  switch: {
    marginTop: "10px"
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "bold"
  }
};
