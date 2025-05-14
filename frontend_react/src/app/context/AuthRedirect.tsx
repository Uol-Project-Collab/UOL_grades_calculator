"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") ?? sessionStorage.getItem("authToken");

    if (!token) {
      router.replace("/");
    } else {
      router.replace("/dashboard");
    }
  }, []);

  return <>{children}</>;
}
