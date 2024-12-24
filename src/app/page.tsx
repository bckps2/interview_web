"use client";

import { useAuth } from "@/context/AuthContext";
import UserProfile from "./profile/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Redirigiendo al login...</div>; // Mostrar algo mientras se redirige
  }

  return <UserProfile />;
};
