import Link from "next/link";
import { FaLock, FaHeart, FaBookmark } from "react-icons/fa";

const LessonCard = ({ lesson, isUserPremium = false }) => {
  const isLocked = lesson.accessLevel === "Premium" && !isUserPremium;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 border border-base-300">
      <figure className="relative h-48">
        <img
          src={lesson.image}
          alt={lesson.title}
          className={`w-full h-full object-cover ${isLocked ? "blur-md scale-105" : ""}`}
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white gap-2 px-4 text-center">
            <FaLock size={24} />
            <p className="font-semibold text-sm">Premium Lesson – Upgrade to view</p>
          </div>
        )}
        <div
          className={`badge absolute top-3 right-3 font-semibold ${
            lesson.accessLevel === "Premium" ? "badge-secondary" : "badge-accent"
          }`}
        >
          {lesson.accessLevel}
        </div>
      </figure>

      <div className="card-body">
        <div className="flex gap-2">
          <span className="badge badge-outline badge-primary">{lesson.category}</span>
          <span className="badge badge-outline">{lesson.emotionalTone}</span>
        </div>

        <h2 className="card-title text-base mt-1">{lesson.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-2">{lesson.description}</p>

        <div className="flex items-center gap-2 mt-3">
          <img
            src={lesson.creator.photo}
            alt={lesson.creator.name}
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm font-medium">{lesson.creator.name}</span>
          <span className="text-xs text-base-content/50 ml-auto">{lesson.createdAt}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-base-content/60 mt-2">
          <span className="flex items-center gap-1">
            <FaHeart className="text-secondary" /> {lesson.likesCount}
          </span>
          <span className="flex items-center gap-1">
            <FaBookmark className="text-primary" /> {lesson.favoritesCount}
          </span>
        </div>

        <div className="card-actions mt-3">
          <Link
            href={isLocked ? "/dashboard/pricing" : `/lessons/${lesson.id}`}
            className="btn btn-primary btn-sm w-full"
          >
            {isLocked ? "Upgrade to View" : "See Details"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;