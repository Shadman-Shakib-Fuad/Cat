const LessonInfo = ({ lesson }) => {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <span className="badge badge-primary badge-outline">{lesson.category}</span>
        <span className="badge badge-secondary badge-outline">{lesson.emotionalTone}</span>
        <span
          className={`badge ${lesson.accessLevel === "Premium" ? "badge-secondary" : "badge-accent"}`}
        >
          {lesson.accessLevel}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{lesson.title}</h1>

      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-72 sm:h-96 object-cover rounded-2xl mb-6"
        />
      )}

      <p className="text-base leading-relaxed text-base-content/80 whitespace-pre-line">
        {lesson.fullDescription}
      </p>
    </div>
  );
};

export default LessonInfo;