import { sampleLessons } from "@/lib/mockData";
import LessonCard from "@/components/shared/LessonCard";

const MostSavedLessons = () => {
  const mostSaved = [...sampleLessons]
    .sort((a, b) => b.favoritesCount - a.favoritesCount)
    .slice(0, 3);

  return (
    <section className="bg-base-200 py-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">
            Most <span className="text-primary">Saved</span> Lessons
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            The lessons people bookmark the most — clearly resonating with readers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostSaved.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSavedLessons;