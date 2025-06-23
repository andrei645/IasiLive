'use client';

import { useEffect, useState } from 'react';

interface EventCardProps {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  category: string;
  id: number;
}

interface Favorite {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
}

export default function EventCard({
  imageUrl,
  title,
  date,
  description,
  category,
}: EventCardProps) {
  const [name, setName] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const favList: Favorite[] = [];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const arrToken = token?.split('.');
    const payload = arrToken ? JSON.parse(atob(arrToken?.[1])) : null;

    if (
      payload &&
      payload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ]
    ) {
      setName(
        payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ]
      );
      setIsLogged(true);
    }
  }, []);

  return (
    <div className="w-[20%] min-w-[200px] max-w-[240px] bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg border border-gray-800 m-2">
      <img src={imageUrl} alt={title} className="w-full h-36 object-cover" />
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs text-gray-400 mb-2">{description}</p>
        <p className="text-xs text-gray-500 mb-2">{date}</p>
      </div>
      {isLogged && 
      (
        <button>Add</button>
      )
    }
    </div>
  );
}