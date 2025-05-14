"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") ?? sessionStorage.getItem("authToken");

    if (!token) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="text-page text-primary-dark flex h-full w-full flex-row items-center justify-center font-bold">
        Loading...
      </div>
    ); // Or your loading component
  }

  return <>{children}</>;
}

// export async function getServerSideProps(context) {
//   // Check for auth cookie/token in the request
//   const token = context.req.cookies.authToken;

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return { props: {} };
// }
