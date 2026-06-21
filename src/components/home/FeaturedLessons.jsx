"use client";

import { motion } from "framer-motion";
import { sampleLessons } from "@/lib/mockData";
import LessonCard from "@/components/shared/LessonCard";

const FeaturedLessons = () => {
  const featured = sampleLessons.filter((lesson) => lesson.isFeatured);

  return (
    <section className="bg-base-200 py-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">
            Featured <span className="text-secondary">Life Lessons</span>
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Hand-picked lessons our team thinks you shouldn't miss.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
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