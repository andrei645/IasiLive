"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
}

interface EventsListProps {
  events: Event[];
  input?: string;
  clickedCategory?: string;
}

export default function EventsList({ events, input = "", clickedCategory }: EventsListProps) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // sau "token", depinde cum l-ai salvat
    setIsLogged(!!token);
  }, []);

  function getFilteredEvents() {
    if (clickedCategory && !input) {
      return events.filter((ev) => ev.category === clickedCategory);
    } else {
      return events.filter((ev) => ev.title.toLowerCase().includes(input.toLowerCase()));
    }
  }

  const filteredEvents = getFilteredEvents();

  return (
    <div className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-thin scrollbar-thumb-primaryLight">
      {filteredEvents.map((event: Event) => (
        <Link
          key={event.id}
          href={`${isLogged ? "/auth" : ""}/events/${event.id}`}
          className="block w-64 min-w-[16rem] bg-surface rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          <img
            src="/images/night_crowd.jpg"
            alt={event.title}
            className="w-full h-40 object-cover rounded-t-xl"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-primaryLight truncate">
              {event.title}
            </h3>
            <p className="text-sm text-textMain/60 mt-1">
              {new Date(event.date).toLocaleDateString("ro-RO")}
            </p>
            <p className="text-xs text-textMain/50 mt-2 italic truncate">
              {event.category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
