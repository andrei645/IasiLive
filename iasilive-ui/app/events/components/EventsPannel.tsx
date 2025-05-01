"use client";
import React, { useEffect, useState } from "react";
import EventsList from "./EventsList";

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

export default function EventsPannel({input}: EventsPannelProps) {
    const [events, setEvents] = useState([]);
    const [clickedCategory, setClickedCategory] = useState("");

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
        const categories = events.map((event:Event) => event.category);
        const uniqueCategories = [...new Set(categories)];
        return uniqueCategories;
    }

    return (
    
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Categorii</h1>
            <div className="flex flex-wrap justify-center gap-6 p-6">
                {categories().map((category, index) => (
                    <button key={index} className="bg-gray-900 text-white rounded-lg p-4 shadow-md cursor-pointer" onClick={() => setClickedCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Evenimente</h1>
            <EventsList events={events} input={input} clickedCategory={clickedCategory}/>
        </div>
        </div>);
}