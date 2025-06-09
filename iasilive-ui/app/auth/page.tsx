"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="flex min-h-screen"
          style={{
        background: "linear-gradient(135deg, #1A1A1D, #2A1A28, #4A1C3F, #7A2E5F)",
      }}>
      {/* Left side */}
      <div className="w-1/2  text-white relative flex flex-col justify-between p-8">
        {/* Logo + Tagline */}
        <div>
          <h1 className="text-3xl font-bold text-[#A64D79] mb-2">IasiLive</h1>
          <p className="text-sm text-gray-300">Evenimente live, recomandări smart</p>
        </div>

        {/* Beneficii */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-2xl font-bold text-[#A64D79]">Free</h1>
              <ul className="text-sm space-y-2 mb-6">
                <li>🎯 Acces la platforma</li>
                <li>📍 Hărți interactive</li>
                <li>🎯 Experienta personalizata</li>
              </ul>
              </div>
              <div className="flex flex-col justify-between items-center gap-3">
              <h1 className="text-2xl font-bold text-[#A64D79]">Subscriber</h1>
              <ul className="text-sm space-y-2 mb-6">
                <li>🎯 Platforma sociala</li>
                <li>⭐ Salvare evenimente favorite</li>
                <li>💬 Chat AI integrat</li>
              </ul>
              </div>
          </div>

          <button
            type="button"
            className="bg-[#6A1E55] hover:bg-[#A64D79] text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
            onClick={() => router.push("/events")}
          >
            Explorează platforma
          </button>
        </div>

        {/* Mini-card eveniment */}
        <div className="bg-[#3B1C32] p-4 rounded-lg shadow-lg mt-6">
          <h3 className="text-lg font-bold text-[#A64D79]">🎷 Jazz Night</h3>
          <p className="text-sm text-gray-300">Astăzi, ora 19:00 — Teatrul Național</p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h1>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <button
          className="mt-4 text-white-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Nu ai cont? Înregistrează-te" : "Ai cont? Autentifică-te"}
        </button>
      </div>
    </div>
  );
}
