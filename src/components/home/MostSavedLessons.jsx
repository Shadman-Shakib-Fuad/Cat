"use client";

import { useEffect, useState } from "react";
import LessonCard from "@/components/shared/LessonCard";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const MostSavedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/lessons/most-saved")
      .then(setLessons)
      .catch(() => setLessons([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (lessons.length === 0) return null;

  return (
    <section className="bg-base-200 py-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">
            Most <span className="text-primary">Saved</span> Lessons
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            The lessons people bookmark the most.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSavedLessons;