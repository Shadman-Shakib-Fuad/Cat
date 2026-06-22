"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LessonCard from "@/components/shared/LessonCard";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const FeaturedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/lessons/featured")
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
            Featured <span className="text-secondary">Life Lessons</span>
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Hand-picked lessons our team thinks you should not miss.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <LessonCard lesson={lesson} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;