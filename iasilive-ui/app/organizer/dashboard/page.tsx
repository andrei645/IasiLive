"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function OrganizerDashboard() {
    const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "",
    imageUrl: "added",
  });

  const handleSaveEvent = async () => {

    const localDate = new Date(form.date);
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

    const payload = {
      ...form,
      date: utcDate.toISOString(),
    };
    console.log(payload)
  try {
    const response = await fetch("http://localhost:5298/api/Event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error("Error adding event.");
    }

  } catch (error) {
    console.error("Error saving event : ", error)
  }
  console.log("sent")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-[#1A1A1D] min-h-screen py-12 px-6 flex justify-center text-white">
      <div className="w-full max-w-2xl bg-[#2E1A2D] p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-[#A64D79] text-center">Creează un Eveniment</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-[#E0E0E0]">Titlu</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1A1A1D] border border-[#444] text-white text-sm"
              placeholder="Ex: Festival de Jazz"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#E0E0E0]">Descriere</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 rounded bg-[#1A1A1D] border border-[#444] text-white text-sm"
              placeholder="Detalii despre eveniment..."
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#E0E0E0]">Locație</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1A1A1D] border border-[#444] text-white text-sm"
              placeholder="Ex: Palas, Iași"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#E0E0E0]">Dată</label>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1A1A1D] border border-[#444] text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#E0E0E0]">Categorie</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1A1A1D] border border-[#444] text-white text-sm"
              placeholder="Ex: Muzică, Cultură"
            />
          </div>
        </div>

        <button
          className="w-full bg-[#A64D79] hover:bg-[#bf5b8a] text-white py-2 rounded mt-4 font-semibold text-sm transition"
          onClick={() => handleSaveEvent()}
        >
          Salvează Eveniment
        </button>
        <button
          className="w-full bg-[#A64D79] hover:bg-[#bf5b8a] text-white py-2 rounded mt-4 font-semibold text-sm transition"
          onClick={() => router.replace("/auth")}
        >
          Mergi la evenimente
        </button>
      </div>
    </section>
  );
}
