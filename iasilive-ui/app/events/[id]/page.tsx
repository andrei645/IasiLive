import { notFound } from "next/navigation";
import { ReviewList } from "../../auth/events/[id]/components/ReviewList";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
}

async function getEvent(id: string): Promise<Event | null> {
  try {
    const res = await fetch(`http://localhost:5298/api/Event/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}


export default async function PublicEventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);

  if (!event) return notFound();

  return (
    <section className="bg-bg text-textMain min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-surface rounded-xl shadow-lg overflow-hidden">
        <img
          src="/images/night_crowd.jpg"
          alt={event.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 bg-[#3B1C32]">
          <h1 className="text-3xl font-bold text-primaryLight mb-2">{event.title}</h1>
          <p className="text-sm text-textMain/60 mb-4">
            {new Date(event.date).toLocaleString()}
          </p>
          <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full mb-4">
            {event.category}
          </span>
          <p className="text-textMain leading-relaxed">{event.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-primaryLight mb-4">Recenzii</h2>
        <ReviewList id={event.id} />
      </div>
    </section>
  );
}
