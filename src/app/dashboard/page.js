"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBookOpen, FaBookmark, FaStar, FaPlus } from "react-icons/fa";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/AuthProvider";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ActivityChart from "@/components/dashboard/ActivityChart";

const DashboardPage = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/lessons/my-lessons"),
      apiFetch("/api/favorites"),
    ])
      .then(([myLessons, myFavorites]) => {
        setLessons(myLessons);
        setFavorites(myFavorites);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalLikes = lessons.reduce((sum, l) => sum + (l.likesCount || 0), 0);

  const stats = [
    { label: "Lessons Created", value: lessons.length, icon: <FaBookOpen />, color: "bg-primary/10 text-primary" },
    { label: "Saved Favorites", value: favorites.length, icon: <FaBookmark />, color: "bg-secondary/10 text-secondary" },
    { label: "Total Likes Received", value: totalLikes, icon: <FaStar />, color: "bg-accent/10 text-accent" },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold">Welcome back, {user?.name} 👋</h1>
          <p className="text-base-content/60 text-sm">Here is what is happening with your lessons.</p>
        </div>
        <Link href="/dashboard/add-lesson" className="btn btn-primary gap-2">
          <FaPlus /> Add Lesson
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="card bg-base-100 shadow-sm p-6 flex flex-row items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-sm text-base-content/60">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <ActivityChart lessons={lessons} />

      <div className="card bg-base-100 shadow-sm mt-6">
        <div className="card-body">
          <h2 className="card-title text-base">Recently Added Lessons</h2>
          {lessons.length === 0 ? (
            <p className="text-sm text-base-content/60">No lessons yet. Add your first one!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.slice(0, 5).map((lesson) => (
                    <tr key={lesson._id}>
                      <td className="font-medium">{lesson.title}</td>
                      <td><span className="badge badge-outline badge-primary">{lesson.category}</span></td>
                      <td className="text-sm text-base-content/60">{new Date(lesson.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link href={`/lessons/${lesson._id}`} className="btn btn-xs btn-outline">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;