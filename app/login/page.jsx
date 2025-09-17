

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // const data = await res.json();
      if (res.ok) {
        alert("Login successful");
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("tenant", JSON.stringify(data.user.tenant)); 
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/notes");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px", border: "none" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#000DFF", fontWeight: "700" }}>
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg"
            style={{ fontWeight: "600" }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Don't have an account?{" "}
          <a href="/register" className="text-decoration-none text-primary fw-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
