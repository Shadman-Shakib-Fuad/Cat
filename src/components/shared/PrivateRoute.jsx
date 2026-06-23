"use client";

import { useAuth } from "@/lib/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
    if (adminOnly && user && !isAdmin) {
      router.push("/dashboard");
    }
  }, [user, isAdmin, adminOnly]);

  if (user === null) return <LoadingSpinner fullScreen />;
  if (adminOnly && !isAdmin) return <LoadingSpinner fullScreen />;

  return children;
};

export default PrivateRoute;