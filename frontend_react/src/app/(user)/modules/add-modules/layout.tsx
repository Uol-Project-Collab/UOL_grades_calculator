import { AddModuleProvider } from "./(context)/AddModuleProvider";
import { ModulesProvider } from "./(context)/ModulesDataProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ModulesProvider>
      <AddModuleProvider>
        {children}
      </AddModuleProvider>
    </ModulesProvider>
  );
}
