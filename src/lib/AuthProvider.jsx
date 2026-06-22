"use client";

import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();

  const user = session?.user || null;
  const isPremium = user?.isPremium || false;
  const isAdmin = user?.role === "admin";

  if (isPending) return <LoadingSpinner fullScreen />;

  return (
    <AuthContext.Provider value={{ user, isPremium, isAdmin, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);