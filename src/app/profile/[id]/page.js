"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LessonCard from "@/components/shared/LessonCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/lib/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const PublicProfilePage = () => {
  const { id } = useParams();
  const { isPremium } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/lessons?limit=100`)
      .then((r) => r.json())
      .then((data) => {
        const all = data.lessons || [];
        const userLessons = all.filter(
          (l) => l.creatorId?._id === id || l.creatorId === id
        );
        if (userLessons.length > 0) {
          setCreator(userLessons[0].creatorId);
        }
        setLessons(userLessons);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="section-container py-12">
      {creator && (
        <div className="flex items-center gap-6 mb-10">
          <img
            src={creator?.photoURL || "https://i.pravatar.cc/150?img=12"}
            alt={creator?.name}
            className="w-20 h-20 rounded-full ring ring-primary ring-offset-2"
          />
          <div>
            <h1 className="text-2xl font-extrabold">{creator?.name}</h1>
            <p className="text-base-content/60 text-sm mt-1">
              {lessons.length} public lessons shared
            </p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-6">All Lessons by this Author</h2>

      {lessons.length === 0 ? (
        <p className="text-base-content/60">No public lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} isUserPremium={isPremium} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicProfilePage;