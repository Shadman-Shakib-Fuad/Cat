"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { FaTrophy } from "react-icons/fa";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    apiFetch("/api/lessons/top-contributors")
      .then(setContributors)
      .catch(() => setContributors([]));
  }, []);

  if (contributors.length === 0) return null;

  return (
    <section className="section-container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold mb-3">
          Top <span className="text-accent">Contributors</span> of the Week
        </h2>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Members who shared the most wisdom with the community.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {contributors.map((item, idx) => (
          <div key={idx} className="card bg-base-100 border border-base-300 shadow-sm text-center p-6 relative">
            {idx === 0 && (
              <div className="absolute -top-3 -right-3 bg-warning text-warning-content rounded-full p-2 shadow">
                <FaTrophy size={14} />
              </div>
            )}
            <img
              src={item._id?.photoURL || "https://i.pravatar.cc/150?img=12"}
              alt={item._id?.name}
              className="w-16 h-16 rounded-full mx-auto mb-3 ring ring-primary ring-offset-2"
            />
            <h3 className="font-semibold text-sm">{item._id?.name}</h3>
            <p className="text-xs text-base-content/60 mt-1">{item.lessonsCount} lessons shared</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;