const LessonMetadata = ({ lesson }) => {
  const getReadingTime = (text = "") => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const readingTime = getReadingTime(lesson.description || lesson.fullDescription || "");

  const metaItems = [
    { label: "Created", value: new Date(lesson.createdAt).toLocaleDateString() },
    { label: "Last Updated", value: new Date(lesson.lastUpdated || lesson.updatedAt).toLocaleDateString() },
    { label: "Visibility", value: lesson.visibility },
    { label: "Reading Time", value: `${readingTime} min read` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-base-200 rounded-2xl p-4 my-6">
      {metaItems.map((item) => (
        <div key={item.label} className="text-center">
          <p className="text-xs text-base-content/60 uppercase tracking-wide">{item.label}</p>
          <p className="font-semibold text-sm mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default LessonMetadata;