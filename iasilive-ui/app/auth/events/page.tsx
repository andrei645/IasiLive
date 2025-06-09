"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import EventsLandingPage from "../../events/components/EventsLandingPage";
import ChatWidget from "../components/ChatWidget";
import Favorites from "../components/Favorites"
import YouMayLike from "@/app/personalisation/components/YouMayLike";
import Discover from "@/app/personalisation/components/Discover";

export default function AuthEventsPage() {
  const router = useRouter();
  const [getNameFromToken, setGetNameFromToken] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(Boolean);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    const arrToken = token?.split(".");
    const tokenPayload = arrToken ? JSON.parse(atob(arrToken[1])) : null;
    setGetNameFromToken(tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
  }, []);
  
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    router.push("/auth");
  }
  return (
    <>
<div className="flex justify-evenly items-center bg-surface text-textMain px-6 py-4 rounded-md shadow-md">
  {/* Welcome text */}
  <h1 className="text-lg font-semibold">
    Bun venit, <span className="text-primaryLight">{getNameFromToken}</span>!
  </h1>

  {/* Account dropdown */}
  <div className="relative inline-block text-left" ref={menuRef}>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow hover:bg-primaryLight transition focus:outline-none"
    >
      Cont
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => router.push("/personalisation")}>
              Personalisation
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Details
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleLogout()}>
              LogOut
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
     <section className="bg-bg text-textMain py-24 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Imagine */}
    <div className="rounded-3xl overflow-hidden shadow-xl">
      <img
        src="/images/night_crowd.jpg"
        alt="Echipa IasiLive"
        className="w-full h-auto object-cover"
      />
    </div>

    {/* Text */}
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-primaryLight mb-6">
        Aici e despre tine!
      </h2>
      <p className="text-textMain/80 mb-6 text-lg">
        Bine ai venit pe platforma personalizata unde iti oferim e experiență croita pe preferintele tale.
      </p>
      <p className="mb-10 font-medium text-textMain">
        Prin integrarea tehnologiilor moderne și a unui design intuitiv, promovăm o comunitate
        activă și conectată.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="text-2xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold mb-2 text-primaryLight">Recomandări AI</h3>
          <p className="text-sm text-textMain/70">Evenimente sugerate pe baza intereselor tale.</p>
        </div>

        <div className="bg-surface rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="text-2xl mb-3">🛠️</div>
          <h3 className="text-lg font-semibold mb-2 text-primaryLight">Chat AI integrat</h3>
          <p className="text-sm text-textMain/70">Unde poti intreba direct evenimente</p>
        </div>
      </div>
    </div>
  </div>
</section>
  <div className="bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55]">
    <EventsLandingPage />
  </div>
  {/* Hero sub EventsLandingPage */}
  <section
    className="relative h-[300px] w-full bg-cover bg-center text-textMain flex items-center justify-center"
    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
  >
    {/* Overlay întunecat peste imagine */}
    <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

    {/* Conținut */}
    <div className="relative z-10 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primaryLight drop-shadow">
        Experienta imbunatatita
      </h1>
      <p className="mt-2 text-textMain/80 text-sm md:text-base max-w-xl mx-auto">
        Mai jos incepe propriul tau ecosistem.
      </p>
    </div>
  </section>
        <ChatWidget />
        <YouMayLike />
        <Discover />
    </>
  );
}
