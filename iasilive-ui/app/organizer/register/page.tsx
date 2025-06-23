"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrganizerRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5298/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          username,
          password,
          role: "organizer",
        }),
      });

      if (!res.ok) throw new Error("Registration failed");

      alert("Înregistrare reușită. Te poți autentifica acum.");
      router.push("/organizer/login");
    } catch (err) {
      console.error(err);
      alert("Înregistrarea a eșuat.");
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center bg-[#1A1A1D]">
      <form onSubmit={handleRegister} className="bg-[#3B1C32] text-[#F8F8F8] p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#A64D79]">Înregistrare Organizator</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nume agenție
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-[#2a2a2d] bg-transparent p-2 rounded text-[#F8F8F8]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-[#2a2a2d] bg-transparent p-2 rounded text-[#F8F8F8]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

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

        <button type="submit" className="w-full bg-[#6A1E55] hover:bg-[#A64D79] text-white p-2 rounded transition"
        onClick={() => {router.replace("/organizer/dashboard")}}
        >
          Înregistrare
        </button>

        <p className="text-center text-sm mt-4 text-[#cccccc]">
          Ai deja cont? <a href="/organizer/login" className="underline text-[#A64D79]">Autentifică-te</a>
        </p>
      </form>
    </main>
  );
}
