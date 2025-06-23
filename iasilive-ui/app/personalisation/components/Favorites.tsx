"use client";
import React, { useEffect, useState } from "react";
import EventsList from "../../events/components/EventsList";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Event[]>([]);
  const [categoryStats, setCategoryStats] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = () => {
    const getFavs = localStorage.getItem("favorites");
    const liked = JSON.parse(getFavs ?? "[]") as Event[];
    setFavorites(liked);
    calculateCategoryStats(liked);
  };

  const calculateCategoryStats = (events: Event[]) => {
    const counts: Record<string, number> = {};
    events.forEach((ev) => {
      counts[ev.category] = (counts[ev.category] || 0) + 1;
    });

    const formatted = Object.entries(counts).map(([name, count]) => ({ name, count }));
    setCategoryStats(formatted);
  };

  return (
    <section className="bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55] text-textMain py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primaryLight">Favorite</h2>
        <p className="text-textMain/70 mt-2 text-sm md:text-base">
          Aceste evenimente au fost adăugate la favorite
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#2E1A2D] p-4 rounded-lg shadow text-white">
            <h3 className="text-lg font-semibold mb-4 text-[#A64D79]">Distributie pe categorii</h3>
            <div className="overflow-x-auto">
              <div style={{ width: 600, height: 250 }}>
                <BarChart
                  width={600}
                  height={250}
                  data={categoryStats}
                  barSize={Math.max(20, 300 / categoryStats.length)}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#A64D79" radius={[6, 6, 0, 0]} />
                </BarChart>
              </div>
            </div>
          </div>


          {/* Event list */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primaryLight">
            <div className="flex gap-6 min-w-max px-2 pb-2">
              <EventsList events={favorites} />
            </div>
          </div>
          
        </div>
      ) : (
        <div className="text-center mt-10 text-textMain/60">
          <p>Momentan nu ai evenimente favorite.</p>
          <a
            href="/events"
            className="inline-block mt-4 px-5 py-2 rounded-full text-sm bg-primary text-white hover:bg-primaryLight transition"
          >
            Vezi toate evenimentele
          </a>
        </div>
      )}
    </section>
  );
}
