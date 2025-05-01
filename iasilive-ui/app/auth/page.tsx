"use client";

import { useState } from "react";
import { Carousel } from "./components/Carousel";
import  LoginForm  from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <Carousel />
        <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        onClick={() => router.push("/events")}
      >
        Explore
        </button>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h1>
        
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <button
          className="mt-4 text-blue-500 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Nu ai cont? Înregistrează-te" : "Ai cont? Autentifică-te"}
        </button>
      </div>
    </div>
  );
}
