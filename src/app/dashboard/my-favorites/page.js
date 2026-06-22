"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { sampleLessons, CATEGORIES, EMOTIONAL_TONES } from "@/lib/mockData";
import { FaTrash } from "react-icons/fa";

const MyFavoritesPage = () => {
  const [favorites, setFavorites] = useState(sampleLessons.slice(0, 4));
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterTone, setFilterTone] = useState("All");

  const handleRemove = (id) => {
    setFavorites((prev) => prev.filter((l) => l.id !== id));
    toast.success("Removed from favorites");
  };

  const filtered = favorites
    .filter((l) => filterCategory === "All" || l.category === filterCategory)
    .filter((l) => filterTone === "All" || l.emotionalTone === filterTone);

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">My Favorites</h1>
      <p className="text-base-content/60 text-sm mb-6">Lessons you have saved.</p>

      <div className="flex flex-wrap gap-3 mb-6">
        <select className="select select-bordered select-sm" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={filterTone} onChange={(e) => setFilterTone(e.target.value)}>
          <option value="All">All Tones</option>
          {EMOTIONAL_TONES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-base-content/60">
          <p className="text-lg font-medium">No favorites match your filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Tone</th>
                <th>Access</th>
                <th>Saved By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lesson) => (
                <tr key={lesson.id} className="border-t border-base-300">
                  <td className="font-medium max-w-[180px] truncate">{lesson.title}</td>
                  <td><span className="badge badge-outline badge-primary badge-sm">{lesson.category}</span></td>
                  <td><span className="badge badge-outline badge-sm">{lesson.emotionalTone}</span></td>
                  <td><span className={`badge badge-sm ${lesson.accessLevel === "Premium" ? "badge-secondary" : "badge-accent"}`}>{lesson.accessLevel}</span></td>
                  <td className="text-sm">{lesson.creator.name}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/lessons/${lesson.id}`} className="btn btn-xs btn-outline">View</Link>
                      <button onClick={() => handleRemove(lesson.id)} className="btn btn-xs btn-outline btn-error">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavoritesPage;