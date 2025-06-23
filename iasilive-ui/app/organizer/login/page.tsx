"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrganizerLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5298/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const token = await res.text();
      localStorage.setItem("token", token);
      router.push("/organizer/dashboard");
    } catch (err) {
      console.error(err);
      alert("Autentificare eșuată.");
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center bg-[#1A1A1D]">
      <form onSubmit={handleLogin} className="bg-[#3B1C32] text-[#F8F8F8] p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#A64D79]">Login Organizator</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-[#2a2a2d] bg-transparent p-2 rounded text-[#F8F8F8]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Parolă
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-[#2a2a2d] bg-transparent p-2 rounded text-[#F8F8F8]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-[#6A1E55] hover:bg-[#A64D79] text-white p-2 rounded transition">
          Autentificare
        </button>

        <p className="text-center text-sm mt-4 text-[#cccccc]">
          Nu ai cont? <a href="/organizer/register" className="underline text-[#A64D79]">Înregistrează-te</a>
        </p>
      </form>
    </main>
  );
}
