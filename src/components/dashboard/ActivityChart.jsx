"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ActivityChart = ({ lessons }) => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date.toDateString(),
        lessons: 0,
      });
    }
    return days;
  };

  const chartData = getLast7Days().map((day) => ({
    ...day,
    lessons: lessons.filter(
      (l) => new Date(l.createdAt).toDateString() === day.fullDate
    ).length,
  }));

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 p-6 mt-6">
      <h2 className="font-bold text-base mb-4">Weekly Activity</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ borderRadius: "12px", fontSize: "13px" }}
            formatter={(value) => [value, "Lessons"]}
          />
          <Bar dataKey="lessons" fill="#7c3aed" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;