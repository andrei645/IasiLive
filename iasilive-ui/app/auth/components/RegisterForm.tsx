"use client";
import { useState } from "react";

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5298/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: username,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed");
        }
    }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-sm">
        <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium mb-1">
          Nume Complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Introduceți numele"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Introduceți email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

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
        className="bg-black hover:bg-[#3B1C32] text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
      >
        Register
      </button>
    </form>
  );
}

