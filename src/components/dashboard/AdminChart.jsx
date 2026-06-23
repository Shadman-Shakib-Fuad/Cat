"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminChart = ({ lessons, users }) => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date.toDateString(),
      });
    }
    return days;
  };

  const chartData = getLast7Days().map((day) => ({
    date: day.date,
    lessons: lessons.filter(
      (l) => new Date(l.createdAt).toDateString() === day.fullDate
    ).length,
    users: users.filter(
      (u) => new Date(u.createdAt).toDateString() === day.fullDate
    ).length,
  }));

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 p-6 mt-6">
      <h2 className="font-bold text-base mb-4">Platform Growth (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "13px" }} />
          <Legend />
          <Line type="monotone" dataKey="lessons" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} name="Lessons" />
          <Line type="monotone" dataKey="users" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} name="Users" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminChart;