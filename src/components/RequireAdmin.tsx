
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); 

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "Admin") {
    return <Navigate to="/auctions" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
