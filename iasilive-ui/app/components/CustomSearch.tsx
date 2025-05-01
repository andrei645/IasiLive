import React, { useState } from "react";

export default function CustomSearch({ onSearch }: { onSearch: (query: string) => void }) {
     const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    }
    return (
        <div className="">
        <input
            type="text"
            placeholder="Caută după nume, dată sau categorie"
            className="p-2 border border-gray-300 rounded w-1/2 mb-4"
            onChange={handleSearch}
        />
        </div>
    );
}