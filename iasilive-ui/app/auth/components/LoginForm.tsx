"use client";
import { useState } from "react";


export default function LoginForm() {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("start");

        try {
            console.log("start1");
            const response = await fetch("http://localhost:5298/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            };
            
            const token = await response.text();
            localStorage.setItem("token", token);
            console.log("Token saved:", token);
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed");
        }

    };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm font-medium mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Introduceți username-ul"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium mb-1">
          Parolă
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Introduceți parola"
        onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Login
      </button>
    </form>
  );
}

