"use client";
import React, { useEffect, useState } from "react";
import EventsList from "./EventsList";
import CustomSearch from "@/app/components/CustomSearch";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

interface EventsPannelProps {
  input: string;
}

export default function EventsPannel({ input }: EventsPannelProps) {
  const [events, setEvents] = useState([]);
  const [clickedCategory, setClickedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5298/api/Event");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const categories = () => {
    const all = events.map((event: Event) => event.category);
    return [...new Set(all)];
  };
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };
  return (
    <section className="bg-bg text-textMain py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-primaryLight">Evenimentele disponibile</h2>
        <p className="text-textMain/70 mt-2">Filtrează după categorie sau explorează tot.</p>
      </div>

      {/* CATEGORII */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories().map((category, index) => (
          <button
            key={index}
            onClick={() => setClickedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              clickedCategory === category
                ? "bg-primaryLight text-white"
                : "bg-surface text-textMain hover:bg-primary hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setClickedCategory("")}
          className="px-5 py-2 rounded-full text-sm font-medium bg-border text-textMain hover:bg-primaryLight hover:text-white transition"
        >
          Resetează
        </button>
         <CustomSearch onSearch={handleSearch} />
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primaryLight">
        <div className="flex gap-6 min-w-max px-2">
          <EventsList
            events={events}
            input={searchQuery}
            clickedCategory={clickedCategory}
          />
        </div>
      </div>
    </section>
  );
}
