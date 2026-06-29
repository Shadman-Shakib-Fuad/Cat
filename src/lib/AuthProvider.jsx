"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";

const AuthContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [dbUser, setDbUser] = useState(null);

  const user = session?.user || null;

  useEffect(() => {
    if (user?.email) {
      fetch(`${API_URL}/api/users/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          photoURL: user.image || "",
        }),
      })
        .then((r) => r.json())
        .then(setDbUser)
        .catch(() => {});
    } else {
      setDbUser(null);
    }
  }, [user?.email]);

  const logout = async () => {
    await signOut();
    setDbUser(null);
  };

  const updateUser = (data) => {
    setDbUser(data);
  };

  const isPremium = dbUser?.isPremium || false;
  const isAdmin = dbUser?.role === "admin";

  if (isPending) return null;

  return (
    <AuthContext.Provider value={{ user, dbUser, isPremium, isAdmin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);