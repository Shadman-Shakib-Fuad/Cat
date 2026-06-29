"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getStoredUser, getToken, logoutUser } from "@/lib/auth-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    const token = getToken();
    if (stored && token) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const isPremium = user?.isPremium || false;
  const isAdmin = user?.role === "admin";

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, isPremium, isAdmin, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);