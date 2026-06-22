"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FaHeart, FaBookmark, FaEdit, FaTrash } from "react-icons/fa";

const MyLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/lessons/my-lessons")
      .then(setLessons)
      .catch(() => toast.error("Failed to load lessons"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await apiFetch(`/api/lessons/${id}`, { method: "DELETE" });
      setLessons((prev) => prev.filter((l) => l._id !== id));
      toast.success("Lesson deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleVisibilityToggle = async (lesson) => {
    const newVisibility = lesson.visibility === "Public" ? "Private" : "Public";
    try {
      await apiFetch(`/api/lessons/${lesson._id}`, {
        method: "PATCH",
        body: JSON.stringify({ visibility: newVisibility }),
      });
      setLessons((prev) =>
        prev.map((l) => l._id === lesson._id ? { ...l, visibility: newVisibility } : l)
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">My Lessons</h1>
      <p className="text-base-content/60 text-sm mb-8">Manage all lessons you have created.</p>

      {lessons.length === 0 ? (
        <div className="text-center py-20 text-base-content/60">
          <p className="text-lg font-medium">You have not created any lessons yet.</p>
          <Link href="/dashboard/add-lesson" className="btn btn-primary mt-4">Add Your First Lesson</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Visibility</th>
                <th>Access</th>
                <th>Stats</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="border-t border-base-300">
                  <td className="font-medium max-w-[180px] truncate">{lesson.title}</td>
                  <td><span className="badge badge-outline badge-primary badge-sm">{lesson.category}</span></td>
                  <td>
                    <button
                      onClick={() => handleVisibilityToggle(lesson)}
                      className={`badge cursor-pointer ${lesson.visibility === "Public" ? "badge-success" : "badge-ghost"}`}
                    >
                      {lesson.visibility}
                    </button>
                  </td>
                  <td>
                    <span className={`badge badge-sm ${lesson.accessLevel === "Premium" ? "badge-secondary" : "badge-accent"}`}>
                      {lesson.accessLevel}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3 text-sm text-base-content/60">
                      <span className="flex items-center gap-1"><FaHeart className="text-secondary" />{lesson.likesCount}</span>
                      <span className="flex items-center gap-1"><FaBookmark className="text-primary" />{lesson.favoritesCount}</span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/60">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/lessons/${lesson._id}`} className="btn btn-xs btn-outline">View</Link>
                      <Link href={`/dashboard/update-lesson/${lesson._id}`} className="btn btn-xs btn-outline btn-primary">
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(lesson._id)} className="btn btn-xs btn-outline btn-error">
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

export default MyLessonsPage;