"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { FetchAllModules } from "../(utils)/FetchAllModules";

const ModulesContext = createContext<any>(undefined);

export const ModulesProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(await FetchAllModules());
      } catch (error) {
        console.error("Failed to load modules", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <ModulesContext.Provider value={{ data }}>
      {children}
    </ModulesContext.Provider>
  );
};

export const useModules = () => {
  const context = useContext(ModulesContext);
  if (!context) {
    throw new Error("useModules must be used within a ModulesProvider");
  }
  return context;
};
