"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AddModuleContextType = {
  selectedLevels: number[];
  setSelectedLevels: (levels: number[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const AddModuleContext = createContext<AddModuleContextType | undefined>(
  undefined,
);

export const useAddModule = () => {
  const context = useContext(AddModuleContext);
  if (!context)
    throw new Error("useAddModule must be used within AddModuleProvider");
  return context;
};

export const AddModuleProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <AddModuleContext.Provider
      value={{ selectedLevels, setSelectedLevels, currentStep, setCurrentStep }}
    >
      {children}
    </AddModuleContext.Provider>
  );
};
