"use client";

import { useRouter } from "next/navigation";
import { AddModuleProvider } from "./(context)/AddModuleContext";
import ProgressBar from "./(components)/ProgressBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <AddModuleProvider>
      <div>
        <button
          type="button"
          className="flex flex-row item-center text-head font-semibold text-text-dark cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <span className="material-symbols-outlined mr-2" style={{ fontSize: '36px' }}>cancel</span>
          Exit
        </button>
      </div>

      <ProgressBar />

      <div className="flex items-center justify-center w-full p-5 mt-4 mb-4 bg-primary-dark text-background text-sub font-bold">
        Select Module Level 
      </div>
      {children}
    </AddModuleProvider>
  );
}
