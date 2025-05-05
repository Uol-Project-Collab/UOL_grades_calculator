'use client';

import { AddModuleProvider } from "./(context)/AddModuleContext";

export default function Page({ children }: { children: React.ReactNode }) {
  return <AddModuleProvider>{children}</AddModuleProvider>;
}
