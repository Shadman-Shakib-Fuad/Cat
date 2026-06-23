"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isDark") === "true";
    setIsDark(stored);
    document.documentElement.dataset.theme = stored ? "dark" : "lifelessons";
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("isDark", String(next));
    document.documentElement.dataset.theme = next ? "dark" : "lifelessons";
  };

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input type="checkbox" checked={isDark} onChange={toggle} />
      <FaSun className="swap-on" size={18} />
      <FaMoon className="swap-off" size={18} />
    </label>
  );
};

export default ThemeToggle;