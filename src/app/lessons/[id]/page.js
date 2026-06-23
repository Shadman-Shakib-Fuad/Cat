"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/AuthProvider";
import LessonInfo from "@/components/lessons/LessonInfo";
import LessonMetadata from "@/components/lessons/LessonMetadata";
import AuthorCard from "@/components/lessons/AuthorCard";
import StatsBar from "@/components/lessons/StatsBar";
import InteractionButtons from "@/components/lessons/InteractionButtons";
import CommentSection from "@/components/lessons/CommentSection";
import SimilarLessons from "@/components/lessons/SimilarLessons";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";

const LessonDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user, isPremium } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    Promise.all([
      apiFetch(`/api/lessons/${id}`),
      apiFetch(`/api/comments/${id}`),
    ])
      .then(([lessonData, commentData]) => {
        setLesson(lessonData);
        setComments(commentData);
      })
      .catch(() => router.push("/public-lessons"))
      .finally(() => setLoading(false));
  }, [id, user]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!lesson) return null;

  const isLocked = lesson.accessLevel === "Premium" && !isPremium;

  if (isLocked) {
    return (
      <div className="section-container py-20 text-center max-w-xl">
        <div className="text-6xl mb-6">🔒</div>
        <h2 className="text-2xl font-extrabold mb-4">Premium Lesson</h2>
        <p className="text-base-content/70 mb-6">
          Upgrade to Premium to unlock this and all Premium lessons.
        </p>
        <Link href="/dashboard/pricing" className="btn btn-primary btn-lg">
          Upgrade to Premium
        </Link>
      </div>
    );
  }

  const creator = lesson.creatorId || {};

  return (
    <div className="section-container py-12 max-w-4xl">
      <LessonInfo lesson={lesson} />
      <LessonMetadata lesson={{ ...lesson, lastUpdated: lesson.updatedAt }} />
      <AuthorCard creator={{ ...creator, lessonsCount: creator.lessonsCount || 0 }} />
      <StatsBar
        likesCount={lesson.likesCount || 0}
        favoritesCount={lesson.favoritesCount || 0}
        viewsCount={Math.floor(Math.random() * 10000)}
      />
      <InteractionButtons lesson={lesson} user={user} setLesson={setLesson} />
      <CommentSection
        comments={comments}
        setComments={setComments}
        lessonId={id}
        user={user}
      />
      <SimilarLessons currentLesson={lesson} />
    </div>
  );
};

export default LessonDetailsPage;