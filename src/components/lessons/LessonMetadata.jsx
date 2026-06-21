import { getEstimatedReadingTime } from "@/lib/mockData";

const LessonMetadata = ({ lesson }) => {
  const readingTime = getEstimatedReadingTime(lesson.fullDescription);

  const metaItems = [
    { label: "Created", value: lesson.createdAt },
    { label: "Last Updated", value: lesson.lastUpdated },
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