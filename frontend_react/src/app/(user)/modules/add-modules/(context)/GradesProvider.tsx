"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define module interface
interface Module {
  moduleCode: string;
  moduleName: string;
  level: number;
  credits?: number;
}

// Interface for module with grade and RPL status
interface ModuleWithGrade extends Module {
  grade: string;
  isRpl: boolean;
}

interface GradesContextType {
  // Storage for complete module data with grades
  modulesWithGrades: ModuleWithGrade[];

  // Add or update a module with its grade and RPL status
  setModuleWithGrade: (module: Module, grade: string, isRpl: boolean) => void;

  // Update just the grade for a module
  updateGrade: (moduleCode: string, grade: string) => void;

  // Update just the RPL status for a module
  updateRplStatus: (moduleCode: string, isRpl: boolean) => void;

  // Remove a module from the selection
  removeModule: (moduleCode: string) => void;

  // Get modules by level (for review)
  getModulesByLevel: (level: number) => ModuleWithGrade[];

  // Check if a module is already in the selection
  hasModule: (moduleCode: string) => boolean;
}

const GradesContext = createContext<GradesContextType | undefined>(undefined);

export const GradesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modulesWithGrades, setModulesWithGrades] = useState<ModuleWithGrade[]>(
    [],
  );

  const setModuleWithGrade = (
    module: Module,
    grade: string,
    isRpl: boolean,
  ) => {
    setModulesWithGrades((prev) => {
      // Check if module already exists
      const existingIndex = prev.findIndex(
        (m) => m.moduleCode === module.moduleCode,
      );

      if (existingIndex >= 0) {
        // Update existing module
        const updated = [...prev];
        updated[existingIndex] = {
          ...prev[existingIndex],
          grade,
          isRpl,
        };
        return updated;
      } else {
        // Add new module with grade
        return [
          ...prev,
          {
            ...module,
            grade,
            isRpl,
          },
        ];
      }
    });
  };

  const updateGrade = (moduleCode: string, grade: string) => {
    setModulesWithGrades((prev) =>
      prev.map((module) =>
        module.moduleCode === moduleCode ? { ...module, grade } : module,
      ),
    );
  };

  const updateRplStatus = (moduleCode: string, isRpl: boolean) => {
    setModulesWithGrades((prev) =>
      prev.map((module) =>
        module.moduleCode === moduleCode ? { ...module, isRpl } : module,
      ),
    );
  };

  const removeModule = (moduleCode: string) => {
    setModulesWithGrades((prev) =>
      prev.filter((module) => module.moduleCode !== moduleCode),
    );
  };

  const getModulesByLevel = (level: number) => {
    return modulesWithGrades.filter((module) => module.level === level);
  };

  const hasModule = (moduleCode: string) => {
    return modulesWithGrades.some((module) => module.moduleCode === moduleCode);
  };

  return (
    <GradesContext.Provider
      value={{
        modulesWithGrades,
        setModuleWithGrade,
        updateGrade,
        updateRplStatus,
        removeModule,
        getModulesByLevel,
        hasModule,
      }}
    >
      {children}
    </GradesContext.Provider>
  );
};

export const useGrades = () => {
  const context = useContext(GradesContext);
  if (context === undefined) {
    throw new Error("useGrades must be used within a GradesProvider");
  }
  return context;
};
