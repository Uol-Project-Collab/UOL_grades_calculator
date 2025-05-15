"use client";

import { useState } from "react";
import { useAddModule } from "../context/AddModuleContext";
import AddModulesHeader from "./AddModulesHeader";
import { ModulesProvider } from "../context/ModulesProvider";

export default function AddModulesStep2() {
  const { selectedLevels, setCurrentStep } = useAddModule();
  const [levelTable, setLevelTable] = useState(selectedLevels[0]);
  const highlight =
    "text-sub mr-6 font-semibold text-text-dark underline cursor-pointer";
  const disabled = "text-sub mr-6 font-semibold text-gray-400 cursor-pointer";

  const handleSelectedLevel = (level: number) => {
    if (level === 4) {
      setLevelTable(4);
    } else if (level === 5) {
      setLevelTable(5);
    } else if (level === 6) {
      setLevelTable(6);
    }
  };

  return (
    <ModulesProvider>
      <AddModulesHeader message="Add Grades" />
      <p className="text-center">
        Please note that when you add grades the module is automatically
        selected and added in your modules list.
      </p>
      <div className="m-10 flex h-90 flex-col">
        <div className="flex flex-row items-center justify-between">
          <div>
            <button
              type="button"
              className={levelTable == 4 ? highlight : disabled}
              onClick={() => handleSelectedLevel(4)}
            >
              Level 4
            </button>
            <button
              type="button"
              className={levelTable == 5 ? highlight : disabled}
              onClick={() => handleSelectedLevel(5)}
            >
              Level 5
            </button>
            <button
              type="button"
              className={levelTable == 6 ? highlight : disabled}
              onClick={() => handleSelectedLevel(6)}
            >
              Level 6
            </button>
          </div>

          <p className="text-small">
            (Grayed out are already available in your modules, edit them via
            modules)
          </p>
        </div>
      </div>

      <div className="ml-2 flex flex-row items-center justify-between">
        <button
          type="button"
          className="text-body font-regular text-background bg-primary-dark flex w-75 cursor-pointer flex-row items-center justify-center rounded-lg p-2"
          onClick={() => {
            setCurrentStep(1);
          }}
        >
          <span className="material-symbols-outlined mr-2">arrow_left_alt</span>
          Back
        </button>
        <button
          type="button"
          className="text-body font-regular text-background bg-primary-dark flex w-75 cursor-pointer flex-row items-center justify-center rounded-lg p-2"
          onClick={() => {
            setCurrentStep(3);
          }}
        >
          Next
          <span className="material-symbols-outlined ml-2">
            arrow_right_alt
          </span>
        </button>
      </div>
    </ModulesProvider>
  );
}
