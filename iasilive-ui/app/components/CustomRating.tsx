"use client";
import React, { useState } from "react";

interface CustomRatingProps {
  rating: number;
  setRating: (value: number) => void;
}

export const CustomRating: React.FC<CustomRatingProps> = ({ rating, setRating }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => setRating(value)}
          onMouseEnter={() => setHovered(value)}
          onMouseLeave={() => setHovered(null)}
          className={`cursor-pointer text-xl transition-colors ${
            (hovered ?? rating) >= value ? "text-[#A64D79]" : "text-gray-500"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};
