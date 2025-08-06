import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContainerContext } from "../context/MoviesContext";
import type { ProtectPageProps } from "../types/movieType";


export default function ProtectPage({  children }: ProtectPageProps) {
  const { userdata } = useContext(ContainerContext);
  const hasToken = localStorage.getItem("token");

  if (!userdata && !hasToken) {
    return <Navigate to="/Login" replace />;
  }

  return <>{children}</>;
}
