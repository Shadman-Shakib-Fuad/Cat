import { FaBookOpen, FaBookmark, FaStar, FaPlus } from "react-icons/fa";
import Link from "next/link";

const stats = [
  { label: "Lessons Created", value: 4, icon: <FaBookOpen />, color: "bg-primary/10 text-primary" },
  { label: "Saved Favorites", value: 7, icon: <FaBookmark />, color: "bg-secondary/10 text-secondary" },
  { label: "Total Likes Received", value: 128, icon: <FaStar />, color: "bg-accent/10 text-accent" },
];

const recentLessons = [
  { id: "1", title: "Failure is Just Feedback", category: "Career", createdAt: "2025-05-12" },
  { id: "3", title: "Small Habits Build Big Lives", category: "Personal Growth", createdAt: "2025-04-21" },
  { id: "6", title: "Boundaries Are Not Selfish", category: "Relationships", createdAt: "2025-05-29" },
];

const DashboardPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold">Welcome back 👋</h1>
          <p className="text-base-content/60 text-sm">Here's what's happening with your lessons.</p>
        </div>
        <Link href="/dashboard/add-lesson" className="btn btn-primary gap-2">
          <FaPlus /> Add Lesson
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="card bg-base-100 shadow-sm p-6 flex flex-row items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-sm text-base-content/60">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-base">Recently Added Lessons</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentLessons.map((lesson) => (
                  <tr key={lesson.id}>
                    <td className="font-medium">{lesson.title}</td>
                    <td><span className="badge badge-outline badge-primary">{lesson.category}</span></td>
                    <td className="text-sm text-base-content/60">{lesson.createdAt}</td>
                    <td>
                      <Link href={`/lessons/${lesson.id}`} className="btn btn-xs btn-outline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;