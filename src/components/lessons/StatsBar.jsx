import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";

const StatsBar = ({ likesCount, favoritesCount, viewsCount }) => {
  const stats = [
    { icon: <FaHeart className="text-secondary" />, label: "Likes", value: likesCount },
    { icon: <FaBookmark className="text-primary" />, label: "Favorites", value: favoritesCount },
    { icon: <FaEye className="text-accent" />, label: "Views", value: viewsCount.toLocaleString() },
  ];

  return (
    <div className="flex gap-6 my-6 border-y border-base-300 py-4">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          {s.icon}
          <span className="font-semibold">{s.value}</span>
          <span className="text-sm text-base-content/60">{s.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;