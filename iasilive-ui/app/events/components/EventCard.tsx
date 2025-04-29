"use client";

interface EventCardProps {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export default function EventCard({ imageUrl, title, date, description }: EventCardProps) {
  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md flex flex-col w-64">
      <img src={imageUrl} alt={title} className="h-36 object-cover w-full" />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-lg font-bold mb-1">{title}</h2>
          <p className="text-sm text-gray-400 mb-2">Published on: {date}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
