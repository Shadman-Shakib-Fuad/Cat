import { FaUsers, FaBookOpen, FaFlag, FaFire } from "react-icons/fa";

const stats = [
  { label: "Total Users", value: 142, icon: <FaUsers />, color: "bg-primary/10 text-primary" },
  { label: "Public Lessons", value: 89, icon: <FaBookOpen />, color: "bg-accent/10 text-accent" },
  { label: "Reported Lessons", value: 5, icon: <FaFlag />, color: "bg-error/10 text-error" },
  { label: "Today's New Lessons", value: 12, icon: <FaFire />, color: "bg-warning/10 text-warning" },
];

const topContributors = [
  { name: "Rafiul Islam", email: "rafiul@example.com", lessons: 18 },
  { name: "Nusrat Jahan", email: "nusrat@example.com", lessons: 15 },
  { name: "Tanvir Ahmed", email: "tanvir@example.com", lessons: 12 },
  { name: "Sadia Rahman", email: "sadia@example.com", lessons: 9 },
];

const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">Admin Overview</h1>
      <p className="text-base-content/60 text-sm mb-8">Platform-wide analytics at a glance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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

      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-base mb-4">Most Active Contributors</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Lessons Created</th>
                </tr>
              </thead>
              <tbody>
                {topContributors.map((u) => (
                  <tr key={u.email} className="border-t border-base-300">
                    <td className="font-medium">{u.name}</td>
                    <td className="text-sm text-base-content/60">{u.email}</td>
                    <td><span className="badge badge-primary">{u.lessons}</span></td>
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

export default AdminDashboardPage;