"use client";

import { useEffect, useState } from "react";
import LessonCard from "@/components/shared/LessonCard";
import { useAuth } from "@/lib/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const SimilarLessons = ({ currentLesson }) => {
  const [similar, setSimilar] = useState([]);
  const { isPremium } = useAuth();

  useEffect(() => {
    if (!currentLesson?.category) return;

    fetch(
      `${API_URL}/api/lessons?category=${currentLesson.category}&limit=6`
    )
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.lessons || []).filter(
          (l) => l._id !== currentLesson._id
        );
        setSimilar(filtered.slice(0, 6));
      })
      .catch(() => {});
  }, [currentLesson]);

  if (similar.length === 0) return null;

  return (
    <div className="my-10">
      <h2 className="text-xl font-bold mb-6">Similar & Recommended Lessons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} isUserPremium={isPremium} />
        ))}
      </div>
    </div>
  );
};

export default SimilarLessons;