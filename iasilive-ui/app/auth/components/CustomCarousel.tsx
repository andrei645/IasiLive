'use client';

import { useState } from 'react';

const images = [
  '/images/1.png',
  '/images/1.png',
  '/images/1.png',
];

export default function CustomCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex w-full">
      <div className="w-1/3 bg-[#3B1C32] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Welcome!</h1>
        <p className="text-sm text-gray-200 mt-2">Descopera frumusetea Iasu-ului.</p>
      </div>

      <div className="w-2/3 bg-[#3B1C32]">
        <div className="relative w-full mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                className="w-full flex-shrink-0 object-cover h-64 md:h-96"
                alt={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
          >
            ▶
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  index === current ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}