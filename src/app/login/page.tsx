"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Login error:", data.message);
        alert(`Login failed: ${data.message}`);
        return;
      }

      // ✅ Save the token in cookie or localStorage
      // localStorage.setItem("token", data.token);
      // document.cookie = `authToken=${data.token}; path=/`;
      login(data.token);
      document.cookie = `authToken=${data.token}; path=/`;
      // ✅ Role-based redirect
      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "agent") {
        router.push("/agentdashboard");
      } else {
        router.push("/"); // Default for customers
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="block w-full mb-4 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block w-full mb-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
