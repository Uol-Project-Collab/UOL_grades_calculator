"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FetchAllModules } from "../../../(utils)/FetchAllModules"

interface Module {
  moduleCode: string;
  moduleName: string;
  grade?: string;
}

interface ModulesContextType {
  modules: Module[];
  setModules: React.Dispatch<React.SetStateAction<Module[]>>;
}

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export const ModulesProvider = ({ children }: { children: ReactNode }) => {
  const [modules, setModules] = useState<Module[]>([]);

  const loadModules = async () => {
    try {
      const data = await FetchAllModules();

      /**
       * Before setting it i need to refactor the data.
      */
      setModules(data);
    } catch (error) {
      console.error("Failed to load modules", error);
    }
  };

  useEffect(() => {
    loadModules();
  }, []);

  return (
    <ModulesContext.Provider value={{ modules, setModules }}>
      {children}
    </ModulesContext.Provider>
  );
};

export const useModules = (): ModulesContextType => {
  const context = useContext(ModulesContext);
  if (!context) {
    throw new Error("useModules must be used within a ModulesProvider");
  }
  return context;
};
