import { sampleLessons } from "@/lib/mockData";
import LessonCard from "@/components/shared/LessonCard";

const SimilarLessons = ({ currentLesson }) => {
  const similar = sampleLessons
    .filter(
      (lesson) =>
        lesson.id !== currentLesson.id &&
        (lesson.category === currentLesson.category ||
          lesson.emotionalTone === currentLesson.emotionalTone)
    )
    .slice(0, 6);

  if (similar.length === 0) return null;

  return (
    <div className="my-10">
      <h2 className="text-xl font-bold mb-6">Similar & Recommended Lessons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default SimilarLessons;