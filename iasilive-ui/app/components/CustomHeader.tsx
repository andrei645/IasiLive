"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CustomSearch from "./CustomSearch";

export default function CustomHeader({ onSearch }: { onSearch: (query: string) => void }) {
  const router = useRouter();

  return (
<header className="sticky top-0 z-50 bg-black from-surface to-primary text-textMain px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center w-1/3">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </div>

        <div className="w-1/3 text-center">
          <h1 className="text-lg md:text-xl font-semibold text-primaryLight">
            IasiLive <span className="text-sm font-normal text-textMain/60">• Explorează orașul</span>
          </h1>
        </div>

        <div className="w-1/3 flex justify-end">
        </div>
      </div>
    </header>
  );
}
