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

  const addToFav = () => {
    const existingFavs = localStorage.getItem(`${name}Favs`);
    const favsList: Favorite[] = existingFavs ? JSON.parse(existingFavs) : [];

    const found = favsList.find(fav => fav.title === title);
    if (!found) {
      favsList.push({ title, date, description, imageUrl, category });

      localStorage.setItem(`${name}Favs`, JSON.stringify(favsList));

      console.log('favs', favsList);
    } else {
      console.log('Item already exists in favorites');
    }
  };

  const goToCard = () => {

  }

  return (
    <div className="w-[20%] min-w-[200px] max-w-[240px] bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg border border-gray-800 m-2">
      <img src={imageUrl} alt={title} className="w-full h-36 object-cover" />
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs text-gray-400 mb-2">{description}</p>
        <p className="text-xs text-gray-500 mb-2">{date}</p>
        {!isLogged ?         <button
          onClick={addToFav}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded-md"
        >
          Add
        </button> : ''}
      </div>
    </div>
  );
}