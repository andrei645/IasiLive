"use client";
import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "Cum pot adăuga un eveniment la favorite?",
    answer: "Autentifică-te în contul tău și apasă pe butonul 'Adaugă la favorite' de sub fiecare eveniment.",
  },
  {
    question: "Chatbotul știe când are loc un eveniment?",
    answer: "Da, chatbotul AI are acces la toate datele despre evenimente și poate răspunde contextual.",
  },
  {
    question: "Este necesar un cont pentru a vedea evenimentele?",
    answer: "Poți explora evenimentele fără cont, dar ai nevoie de unul pentru funcții precum favorite și recomandări.",
  },
  {
    question: "Cum funcționează filtrarea?",
    answer: "Poți filtra după dată, categorie sau locație folosind bara de căutare sau filtrele rapide.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-bg text-textMain py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div className="relative space-y-6">
          <h2 className="text-4xl font-bold text-primaryLight">Ai întrebări?</h2>
          <p className="text-textMain/70">
            Aici afli detalii despre platforma si cum sa ai cea mai buna experiență.
          </p>
          <p className="text-textMain/50 italic">
            Nu găsești răspunsul? Întreabă direct chatbotul! 🤖
          </p>

          <div className="absolute left-0 bottom-[-60px] md:bottom-[-100px] w-32 md:w-40">
            <Image
              src="/images/faq-svg.png"
              alt="arrow"
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`cursor-pointer rounded-xl bg-surface px-6 py-4 transition-all duration-300 ${
                openIndex === index ? "shadow-md" : "hover:bg-primary/30"
              }`}
            >
              <h3 className={`font-semibold text-base ${openIndex === index ? "text-primaryLight" : ""}`}>
                {faq.question}
              </h3>
              {openIndex === index && (
                <p className="text-sm text-textMain/70 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
