import { AddModuleProvider } from "./(context)/AddModuleProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AddModuleProvider>{children}</AddModuleProvider>;
}
