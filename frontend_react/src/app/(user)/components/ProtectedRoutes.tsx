"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyAuthentication() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/verify-session', {
          credentials: 'include',
        });

        if (!response.ok) {
          router.replace("/");
          return;
        }

        const data = await response.json();
        
        if (!data.authenticated) {
          router.replace("/");
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.replace("/");
      } finally {
        setIsLoading(false);
      }
    }

    verifyAuthentication();
  }, [router]);

  // Don't render anything while checking authentication
  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}