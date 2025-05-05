import { AddModuleProvider } from "./context/AddModuleContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AddModuleProvider>{children}</AddModuleProvider>;
}
