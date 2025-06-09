import React, { useState } from "react";

export default function CustomSearch({ onSearch }: { onSearch: (query: string) => void }) {
     const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    }
    return (
        <div className="flex items-center justify-center w-2xl">
        <input
            type="text"
            placeholder="Caută după nume, dată sau categorie"
            className="w-full max-w-sm px-4 py-2 rounded-full border border-white bg-transparent placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-primaryLight transition"
            onChange={handleSearch}
        />
        </div>
    );
}