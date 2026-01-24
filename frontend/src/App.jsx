import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AdminTopics from "./pages/AdminTopics";
import AdminUsers from "./pages/AdminUsers";


/* Pages */
import Launch from "./pages/Launch";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";

/* ---------- PROTECTED ROUTES ---------- */

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
}

/* ---------- APP ---------- */

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Launch />} />

          {/* Learner Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/topic/:id"
            element={
              <PrivateRoute>
                <Topic />
              </PrivateRoute>
            }
          />

          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />

          <Route
            path="/progress"
            element={
              <PrivateRoute>
                <Progress />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/topics"
            element={
              <AdminRoute>
                <AdminTopics />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />


          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
