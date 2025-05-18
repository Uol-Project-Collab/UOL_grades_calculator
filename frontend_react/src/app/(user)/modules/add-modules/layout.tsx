import { AddModuleProvider } from "./(context)/AddModuleProvider";
import { GradesProvider } from "./(context)/GradesProvider";
import { ModulesProvider } from "./(context)/ModulesDataProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ModulesProvider>
      <AddModuleProvider>
        <GradesProvider>
          {children}
        </GradesProvider>
      </AddModuleProvider>
    </ModulesProvider>
  );
}
