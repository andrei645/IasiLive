"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomSearch from "./CustomSearch";

export default function CustomHeader({onSearch}: {onSearch: (query: string) => void}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // logout logic
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    router.push("/auth");
  }

  // dropdown logic
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 w-8"
        />
      </div>
      <div className="flex mx-4">
      <CustomSearch onSearch={onSearch}/>
      </div>
    </header>
  );
}