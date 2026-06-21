import { notFound } from "next/navigation";
import { getLessonById, sampleComments } from "@/lib/mockData";
import LessonInfo from "@/components/lessons/LessonInfo";
import LessonMetadata from "@/components/lessons/LessonMetadata";
import AuthorCard from "@/components/lessons/AuthorCard";
import StatsBar from "@/components/lessons/StatsBar";
import InteractionButtons from "@/components/lessons/InteractionButtons";
import CommentSection from "@/components/lessons/CommentSection";
import SimilarLessons from "@/components/lessons/SimilarLessons";

const LessonDetailsPage = ({ params }) => {
  const lesson = getLessonById(params.id);

  if (!lesson) notFound();

  // TODO: পরে real auth বসলে premium-lock check এখানে হবে
  const comments = sampleComments[lesson.id] || [];

  return (
    <div className="section-container py-12 max-w-4xl">
      <LessonInfo lesson={lesson} />
      <LessonMetadata lesson={lesson} />
      <AuthorCard creator={lesson.creator} />
      <StatsBar
        likesCount={lesson.likesCount}
        favoritesCount={lesson.favoritesCount}
        viewsCount={lesson.viewsCount}
      />
      <InteractionButtons lesson={lesson} />
      <CommentSection comments={comments} />
      <SimilarLessons currentLesson={lesson} />
    </div>
  );
};

export default LessonDetailsPage;