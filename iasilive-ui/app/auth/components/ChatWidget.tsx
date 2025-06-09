"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5298/api/Chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await response.text();
      const botMessage = { role: "bot", content: data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#A64D79] text-black rounded-full p-3 shadow-lg hover:bg-[#6e3350] transition"
        >
        Open Chat 💬
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-black rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center bg-[#A64D79] text-white px-4 py-2 rounded-t-lg">
            <span>Chat Asistent</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Mesaje */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm text-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  msg.role === "user" ? "bg-[#A64D79] text-right ml-auto" : "bg-gray-800 text-left mr-auto"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="p-2 flex">
          <input
            type="text"
            className="flex-1 rounded-l px-2 py-1 text-sm focus:outline-none focus:ring-0"
            placeholder="Scrie un mesaj..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="bg-[#A64D79] text-white px-3 rounded-r hover:bg-[#6e3350] focus:outline-none focus:ring-0"
            onClick={handleSend}
          >
            ➤
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
