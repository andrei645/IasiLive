"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
}

export default function EventsList({ events }: { events: Event[] }, input : string) {

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {events.map((event:Event) => (
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