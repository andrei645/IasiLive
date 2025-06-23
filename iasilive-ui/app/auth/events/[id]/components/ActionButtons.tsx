"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
}

interface ActionButtonsProps {
  event: Event;
}

export default function ActionButton({event}:ActionButtonsProps) {
    const router = useRouter();

    function addToFav () {
    const fav = localStorage.getItem("favorites");
    const favsList = fav ? JSON.parse(fav) : [];
    const found = favsList.find((fav:any) => fav.title === event.title);

    if (!found) {
    const newFav = {
    title: event.title,
    date: event.date,
    description: event.description,
    imageUrl: event.imageUrl,
    category: event.category
    };
      const newFavList = [...favsList, newFav];
      localStorage.setItem("favorites", JSON.stringify(newFavList));
    } else {
      alert("Event already in favorites");
    }
  }

  return (
    <div className="flex flex-col gap-4 ml-6">
      <div className="flex gap-4 justify-between">
        <button
          onClick={addToFav}
          className="bg-[#A64D79] hover:bg-[#8f3d67]  text-white text-sm px-6 py-2 rounded-md shadow transition"
        >
         Favorit
        </button>

        <button
          onClick={() => alert("Notificări activate!")}
          className="bg-[#3B1C32] hover:bg-[#4c2a3f] text-white text-sm px-6 py-2 rounded-md border border-[#A64D79] transition"
        >
         Notify
        </button>

        <button
      className="bg-[#3B1C32] hover:bg-[#4c2a3f] text-white text-sm px-6 py-2 rounded-md border border-[#A64D79] transition"
      onClick={() => 
        router.back()
      }
      > Back </button>
      </div>
    </div>
  );
}