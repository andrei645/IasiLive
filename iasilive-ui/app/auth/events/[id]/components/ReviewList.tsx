"use client";
import React, { useEffect, useState } from "react";
import {CustomRating} from "@/app/components/CustomRating";

interface Review {
  comment: string;
  rating: number;
  username: string;
  createdAt: string;
}

export const ReviewList = ({ id }: { id: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5298/api/Review/event/${id}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) return;

    const payload = {
      eventId: id,
      username,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5298/api/Review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setComment("");
        setRating(0);
        const updated = await fetch(`http://localhost:5298/api/Review/event/${id}`);
        setReviews(await updated.json());
      } else {
        console.error("Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review", err);
    }
  };

  return (
    <section className="flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-[#3B1C32] p-5 rounded-md shadow text-white text-sm">
        <h3 className="text-lg font-bold text-[#A64D79] mb-4 text-center">Lasă o recenzie</h3>

        {username && (
          <div className="mb-6 space-y-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 rounded bg-[#1A1A1D] border border-[#2A2A2D] text-sm text-white resize-none"
              rows={3}
              placeholder="Scrie părerea ta..."
            />
            <div className="flex items-center justify-between">
              <CustomRating rating={rating} setRating={setRating} />
              <button
                onClick={handleSubmit}
                className="bg-[#A64D79] text-white px-4 py-1 rounded hover:bg-[#922e63] transition text-sm"
              >
                Trimite
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowReviews((prev) => !prev)}
          className="w-full text-sm text-[#A64D79] hover:underline transition"
        >
          {showReviews ? "Ascunde recenzii" : "Vezi recenzii"}
        </button>

        {showReviews && (
          <div className="mt-4 max-h-64 overflow-y-auto space-y-4 p-3 rounded bg-[#1A1A1D] border border-[#2A2A2D]">
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-center">Nu există recenzii.</p>
            ) : (
              reviews.map((rev, index) => (
                <div
                  key={index}
                  className="bg-[#2C1B28] rounded-lg p-3 flex flex-col shadow-sm border border-[#40283A]"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#A64D79] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {rev.username[0].toUpperCase()}
                      </div>
                      <p className="text-sm font-semibold text-[#E9D7DD]">{rev.username}</p>
                    </div>
                    <span className="text-xs text-yellow-400 mt-1">⭐ {rev.rating}</span>
                  </div>
                  <p className="text-sm text-gray-300">{rev.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(rev.createdAt).toLocaleString("ro-RO")}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};
