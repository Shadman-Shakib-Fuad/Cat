"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { sampleLessons, CATEGORIES } from "@/lib/mockData";
import { FaStar, FaTrash, FaCheck } from "react-icons/fa";

const ManageLessonsPage = () => {
  const [lessons, setLessons] = useState(sampleLessons);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterVisibility, setFilterVisibility] = useState("All");

  const handleDelete = (id) => {
    if (!confirm("Permanently delete this lesson?")) return;
    setLessons((prev) => prev.filter((l) => l.id !== id));
    toast.success("Lesson deleted");
  };

  const handleFeatureToggle = (id) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isFeatured: !l.isFeatured } : l))
    );
    toast.success("Featured status updated");
  };

  const handleReviewToggle = (id) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isReviewed: !l.isReviewed } : l))
    );
    toast.success("Review status updated");
  };

  const filtered = lessons
    .filter((l) => filterCategory === "All" || l.category === filterCategory)
    .filter((l) => filterVisibility === "All" || l.visibility === filterVisibility);

  const publicCount = lessons.filter((l) => l.visibility === "Public").length;
  const privateCount = lessons.filter((l) => l.visibility === "Private").length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">Manage Lessons</h1>
      <p className="text-base-content/60 text-sm mb-6">Review, feature, or remove lessons from the platform.</p>

      <div className="flex gap-4 mb-6">
        <div className="badge badge-success badge-lg">Public: {publicCount}</div>
        <div className="badge badge-ghost badge-lg">Private: {privateCount}</div>
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
              <tr key={lesson.id} className="border-t border-base-300">
                <td className="font-medium max-w-[160px] truncate">{lesson.title}</td>
                <td className="text-sm">{lesson.creator.name}</td>
                <td><span className="badge badge-outline badge-primary badge-sm">{lesson.category}</span></td>
                <td>
                  <span className={`badge badge-sm ${lesson.visibility === "Public" ? "badge-success" : "badge-ghost"}`}>
                    {lesson.visibility}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleFeatureToggle(lesson.id)}
                    className={`btn btn-xs ${lesson.isFeatured ? "btn-warning" : "btn-outline"}`}
                  >
                    <FaStar /> {lesson.isFeatured ? "Featured" : "Feature"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleReviewToggle(lesson.id)}
                    className={`btn btn-xs ${lesson.isReviewed ? "btn-success" : "btn-outline"}`}
                  >
                    <FaCheck /> {lesson.isReviewed ? "Reviewed" : "Mark"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
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