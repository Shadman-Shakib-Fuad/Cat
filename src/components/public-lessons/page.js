"use client";

import { useState, useMemo, useEffect } from "react";
import { sampleLessons } from "@/lib/mockData";
import LessonCard from "@/components/shared/LessonCard";
import FilterBar from "@/components/public-lessons/FilterBar";

const ITEMS_PER_PAGE = 6;

const PublicLessonsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [tone, setTone] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, tone, sortBy]);

  const filteredLessons = useMemo(() => {
    let result = sampleLessons.filter((lesson) => lesson.visibility === "Public");

    if (search.trim()) {
      result = result.filter((lesson) =>
        lesson.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") {
      result = result.filter((lesson) => lesson.category === category);
    }
    if (tone !== "All") {
      result = result.filter((lesson) => lesson.emotionalTone === tone);
    }

    if (sortBy === "newest") {
      result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "mostSaved") {
      result = [...result].sort((a, b) => b.favoritesCount - a.favoritesCount);
    }

    return result;
  }, [search, category, tone, sortBy]);

  const totalPages = Math.ceil(filteredLessons.length / ITEMS_PER_PAGE);
  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="section-container py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2">
          Browse <span className="text-primary">Public Lessons</span>
        </h1>
        <p className="text-base-content/70">
          Wisdom shared openly by the community. Anyone can read these.
        </p>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        tone={tone}
        setTone={setTone}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {paginatedLessons.length === 0 ? (
        <div className="text-center py-20 text-base-content/60">
          <p className="text-lg font-medium">No lessons matched your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="join flex justify-center mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`join-item btn ${currentPage === page ? "btn-primary" : "btn-outline"}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicLessonsPage;