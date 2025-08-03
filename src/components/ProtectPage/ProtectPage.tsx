/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectPageProps {
  userdata: any; // or a specific type if you have one
  children: ReactNode;
}

export default function ProtectPage({ userdata, children }: ProtectPageProps) {
  const hasToken = localStorage.getItem("token");

  if (!userdata && !hasToken) {
    return <Navigate to="/Login" replace />;
  }

  return <>{children}</>;
}
