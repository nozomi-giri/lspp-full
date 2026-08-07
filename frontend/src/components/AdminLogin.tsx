import { useState } from "react";
import api from "../api/api";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { password });
      localStorage.setItem("adminToken", res.data.token);
      onLogin();
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-card border border-border bg-card-bg p-5"
      >
        <h3 className="font-semibold text-text">Admin Login</h3>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="rounded-card border border-border bg-bg px-3 py-2 text-sm text-text"
        />

        {error && <p className="text-sm text-accent">Incorrect password</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
