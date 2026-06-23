"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import AdminChart from "@/components/dashboard/AdminChart";
import { FaUsers, FaBookOpen, FaFlag, FaFire } from "react-icons/fa";

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/users"),
      apiFetch("/api/lessons/admin/all"),
      apiFetch("/api/reports"),
    ])
      .then(([u, l, r]) => {
        setUsers(u);
        setLessons(l);
        setReports(r);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toDateString();
  const todayLessons = lessons.filter(
    (l) => new Date(l.createdAt).toDateString() === today
  ).length;

  const stats = [
    { label: "Total Users", value: users.length, icon: <FaUsers />, color: "bg-primary/10 text-primary" },
    { label: "Public Lessons", value: lessons.filter((l) => l.visibility === "Public").length, icon: <FaBookOpen />, color: "bg-accent/10 text-accent" },
    { label: "Reported Lessons", value: [...new Set(reports.map((r) => r.lessonId?._id))].length, icon: <FaFlag />, color: "bg-error/10 text-error" },
    { label: "Today's New Lessons", value: todayLessons, icon: <FaFire />, color: "bg-warning/10 text-warning" },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">Admin Overview</h1>
      <p className="text-base-content/60 text-sm mb-8">Platform-wide analytics at a glance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

      <AdminChart lessons={lessons} users={users} />

      <div className="card bg-base-100 shadow-sm border border-base-300 mt-6">
        <div className="card-body">
          <h2 className="card-title text-base mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((u) => (
                  <tr key={u._id} className="border-t border-base-300">
                    <td className="font-medium">{u.name}</td>
                    <td className="text-sm text-base-content/60">{u.email}</td>
                    <td><span className={`badge ${u.role === "admin" ? "badge-secondary" : "badge-ghost"}`}>{u.role}</span></td>
                    <td className="text-sm text-base-content/60">{new Date(u.createdAt).toLocaleDateString()}</td>
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