"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { title } from "process";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
}

export default function EventsList({ events, input, clickedCategory }: { events: Event[], input:string, clickedCategory:string }) {

    const filteredEvents = 
        input === "" ? events : events.filter((event:Event) => event.title.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {filteredEvents.map((event:Event) => (
                <EventCard {...event}
                    key={event.id}
                    imageUrl='../images/1.png'
                    title={event.title}
                    date={event.date}
                    description={event.description.substring(0, 100) + "..."}
                    category={event.category}
                 />
            ))}
        </div>
    );
}