// app/components/MapIasi.tsx
"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

export default function MapUI() {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-md">
      <LeafletMap />
    </div>
  );
}
