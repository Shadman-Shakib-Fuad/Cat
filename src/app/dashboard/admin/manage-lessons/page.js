"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { CATEGORIES } from "@/lib/mockData";
import { FaStar, FaTrash, FaCheck } from "react-icons/fa";

const ManageLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterVisibility, setFilterVisibility] = useState("All");

  useEffect(() => {
    apiFetch("/api/lessons/admin/all")
      .then(setLessons)
      .catch(() => toast.error("Failed to load lessons"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this lesson?")) return;
    try {
      await apiFetch(`/api/lessons/${id}`, { method: "DELETE" });
      setLessons((prev) => prev.filter((l) => l._id !== id));
      toast.success("Lesson deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggle = async (lesson, field) => {
    try {
      const updated = await apiFetch(`/api/lessons/${lesson._id}/admin`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: !lesson[field] }),
      });
      setLessons((prev) => prev.map((l) => l._id === lesson._id ? { ...l, [field]: updated[field] } : l));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filtered = lessons
    .filter((l) => filterCategory === "All" || l.category === filterCategory)
    .filter((l) => filterVisibility === "All" || l.visibility === filterVisibility);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">Manage Lessons</h1>
      <p className="text-base-content/60 text-sm mb-6">Review, feature, or remove lessons.</p>

      <div className="flex gap-4 mb-6">
        <div className="badge badge-success badge-lg">Public: {lessons.filter((l) => l.visibility === "Public").length}</div>
        <div className="badge badge-ghost badge-lg">Private: {lessons.filter((l) => l.visibility === "Private").length}</div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select className="select select-bordered select-sm" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={filterVisibility} onChange={(e) => setFilterVisibility(e.target.value)}>
          <option value="All">All Visibility</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Featured</th>
              <th>Reviewed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lesson) => (
              <tr key={lesson._id} className="border-t border-base-300">
                <td className="font-medium max-w-[160px] truncate">{lesson.title}</td>
                <td className="text-sm">{lesson.creatorId?.name || "Unknown"}</td>
                <td><span className="badge badge-outline badge-primary badge-sm">{lesson.category}</span></td>
                <td><span className={`badge badge-sm ${lesson.visibility === "Public" ? "badge-success" : "badge-ghost"}`}>{lesson.visibility}</span></td>
                <td>
                  <button onClick={() => handleToggle(lesson, "isFeatured")} className={`btn btn-xs ${lesson.isFeatured ? "btn-warning" : "btn-outline"}`}>
                    <FaStar /> {lesson.isFeatured ? "Featured" : "Feature"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleToggle(lesson, "isReviewed")} className={`btn btn-xs ${lesson.isReviewed ? "btn-success" : "btn-outline"}`}>
                    <FaCheck /> {lesson.isReviewed ? "Reviewed" : "Mark"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(lesson._id)} className="btn btn-xs btn-outline btn-error">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessonsPage;