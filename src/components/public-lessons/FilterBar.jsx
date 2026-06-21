"use client";

import { FaSearch } from "react-icons/fa";
import { CATEGORIES, EMOTIONAL_TONES } from "@/lib/mockData";

const FilterBar = ({ search, setSearch, category, setCategory, tone, setTone, sortBy, setSortBy }) => {
  return (
    <div className="bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-5 mb-8 grid grid-cols-1 md:grid-cols-4 gap-3">
      <label className="input input-bordered flex items-center gap-2 md:col-span-2">
        <FaSearch className="text-base-content/50" />
        <input
          type="text"
          placeholder="Search by title or keyword..."
          className="grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <select
        className="select select-bordered"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="All">All Emotional Tones</option>
        {EMOTIONAL_TONES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered md:col-span-4 md:w-56 md:ml-auto"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="newest">Sort: Newest First</option>
        <option value="mostSaved">Sort: Most Saved</option>
      </select>
    </div>
  );
};

export default FilterBar;