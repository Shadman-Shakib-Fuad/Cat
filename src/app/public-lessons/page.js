"use client";

import { useState, useEffect } from "react";
import LessonCard from "@/components/shared/LessonCard";
import FilterBar from "@/components/public-lessons/FilterBar";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/lib/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const PublicLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [tone, setTone] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isPremium } = useAuth();

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, tone, sortBy]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: currentPage,
      limit: 6,
      sort: sortBy,
      ...(search && { search }),
      ...(category !== "All" && { category }),
      ...(tone !== "All" && { emotionalTone: tone }),
    });

    fetch(`${API_URL}/api/lessons?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setLessons(data.lessons || []);
        setTotalPages(data.pages || 1);
      })
      .catch(() => setLessons([]))
      .finally(() => setLoading(false));
  }, [search, category, tone, sortBy, currentPage]);

  return (
    <div className="section-container py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2">
          Browse <span className="text-primary">Public Lessons</span>
        </h1>
        <p className="text-base-content/70">
          Wisdom shared openly by the community.
        </p>
      </div>

      <FilterBar
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        tone={tone} setTone={setTone}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {loading ? (
        <LoadingSpinner />
      ) : lessons.length === 0 ? (
        <div className="text-center py-20 text-base-content/60">
          <p className="text-lg font-medium">No lessons matched your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} isUserPremium={isPremium} />
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