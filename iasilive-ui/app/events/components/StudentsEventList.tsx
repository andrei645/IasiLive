"use client";
import React, { useEffect, useState } from "react";
import EventsList from "../../events/components/EventsList";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

export default function StudentsEventList() {
const [events, setEvents] = useState<Event[]>([]);
const [studentEvents, setStudentEvents] = useState<Event[]>([]);

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

  useEffect(() => {
  if (events.length > 0) {
    getStudentsEvents();
  }
}, [events]);

    const getStudentsEvents = () => {
        setStudentEvents(events.filter(ev => ev.category === "Students"));
    }

  return (
<section className="bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55] text-textMain py-16 px-4 md:px-8">
  <div className="max-w-7xl mx-auto mb-10 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-primaryLight">
      Special pentru studenti
    </h2>
    <p className="text-textMain/70 mt-2 text-sm md:text-base">
      Ne bucuram ca putem contribui la vizibiltate pentru studenti
    </p>
  </div>

  {studentEvents.length > 0 ? (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primaryLight">
      <div className="flex gap-6 min-w-max px-2 pb-2">
        <EventsList events={studentEvents} />
      </div>
    </div>
  ) : (
    <div className="text-center mt-10 text-textMain/60">
      <p>Momentan nu avem recomandări pentru studenti.</p>
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
