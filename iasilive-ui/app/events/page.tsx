"use client";
import EventsLandingPage from "./components/EventsLandingPage";
import Image from "next/image";
import CustomHeader from "../components/CustomHeader";
import { useEffect, useState } from "react";
import floatingImage from "@/public/images/ai_image.png";
import FAQSection from "../components/FaqSection";
import MapUI from "../components/MapUI";
import StudentsEventList from "./components/StudentsEventList";

export default function EventsPage() {
        const [searchQuery, setSearchQuery] = useState("");

        useEffect(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          }, [])
    
        const handleSearch = (query:string) => {
            setSearchQuery(query);
        }
        console.log(searchQuery);
    return (
        <>
        <CustomHeader onSearch={handleSearch}/>
         <section className="relative bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 items-center gap-12 bg-bg">
        <div>
          <p className="uppercase tracking-widest text-gray-300 mb-4">IasiLive</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Descoperă evenimentele <br /> din Iași în timp real
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            Alege ce te interesează. Filtrează. Salvează. Primește recomandări. Iar când ai nevoie, întreabă chatbotul AI.
          </p>
          <div>
            <a
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#1A1A1D] transition duration-300"
            >
              Explorează evenimente
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="w-full max-w-lg mx-auto animate-float">
            <Image
              src={floatingImage}
              alt="Colorful events"
              className="w-full h-auto object-contain drop-shadow-xl"
              priority
            />
          </div>
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
        Evenimente. Comunitate. Inovație.
      </h2>
      <p className="text-textMain/80 mb-6 text-lg">
        IasiLive îți oferă o experiență digitală completă pentru descoperirea evenimentelor din oraș.
        Cu recomandări AI, filtre inteligente și salvare rapidă, platforma îți aduce Iașul mai aproape.
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
          <h3 className="text-lg font-semibold mb-2 text-primaryLight">Platformă modulară</h3>
          <p className="text-sm text-textMain/70">Construită pe .NET, Next.js și OpenAI.</p>
        </div>
      </div>
    </div>
  </div>
</section>


      <div className="absolute inset-0 bg-[url('/path-to-stripes.svg')] opacity-5 pointer-events-none" />
    </section>
                <EventsLandingPage />
                <StudentsEventList />
                <FAQSection />
                <section className="bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55] text-textMain py-20 px-6">
                <div className="max-w-7xl mx-auto space-y-6 text-center">
                    <h2 className="text-3xl font-bold text-primaryLight">Explorează orașul pe hartă</h2>
                    <p className="text-textMain/70">Vezi locația evenimentelor și explorează Iașul în timp real.</p>
                    <MapUI />
                </div>
                </section>

        </>
    )
}