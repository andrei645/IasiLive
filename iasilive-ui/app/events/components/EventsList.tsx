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

interface EventsListProps {
  events: Event[];
  input?: string;
  clickedCategory?: string;
}

export default function EventsList({ events, input = "", clickedCategory }: EventsListProps) {

    function getFilteredEvents() {
        if ( clickedCategory && !input ) {
            return events.filter(ev => ev.category === clickedCategory)
        } else {
            return events.filter(ev => ev.title.toLowerCase().includes(input.toLowerCase()))
        }
    }

    const filteredEvents = getFilteredEvents();


    return (
        <div className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-thin scrollbar-thumb-primaryLight">
            {getFilteredEvents().map((event:Event) => (
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