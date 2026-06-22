"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { CATEGORIES, EMOTIONAL_TONES } from "@/lib/mockData";
import { FaTrash } from "react-icons/fa";

const MyFavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterTone, setFilterTone] = useState("All");

  useEffect(() => {
    apiFetch("/api/favorites")
      .then(setFavorites)
      .catch(() => toast.error("Failed to load favorites"))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (lessonId, favoriteId) => {
    try {
      await apiFetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ lessonId }),
      });
      setFavorites((prev) => prev.filter((f) => f._id !== favoriteId));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filtered = favorites
    .filter((f) => filterCategory === "All" || f.lessonId?.category === filterCategory)
    .filter((f) => filterTone === "All" || f.lessonId?.emotionalTone === filterTone);

  if (loading) return <LoadingSpinner />;

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
          <p className="text-lg font-medium">No favorites yet.</p>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fav) => (
                <tr key={fav._id} className="border-t border-base-300">
                  <td className="font-medium max-w-[180px] truncate">{fav.lessonId?.title}</td>
                  <td><span className="badge badge-outline badge-primary badge-sm">{fav.lessonId?.category}</span></td>
                  <td><span className="badge badge-outline badge-sm">{fav.lessonId?.emotionalTone}</span></td>
                  <td>
                    <span className={`badge badge-sm ${fav.lessonId?.accessLevel === "Premium" ? "badge-secondary" : "badge-accent"}`}>
                      {fav.lessonId?.accessLevel}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/lessons/${fav.lessonId?._id}`} className="btn btn-xs btn-outline">View</Link>
                      <button onClick={() => handleRemove(fav.lessonId?._id, fav._id)} className="btn btn-xs btn-outline btn-error">
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