"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { remember } = useAuth();

  useEffect(() => {
    let token;

    if (remember) {
      token = localStorage.getItem("authToken");
    } else {
      token = sessionStorage.getItem("authToken");
    }

    if (!token) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}
