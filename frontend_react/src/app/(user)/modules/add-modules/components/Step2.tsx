"use client";

import { useState } from "react";
import { useAddModule } from "../context/AddModuleContext";
import AddModulesHeader from "./AddModulesHeader";

export default function AddModulesStep2() {
  const { selectedLevels, setCurrentStep } = useAddModule();
  const [ levelTable, setLevelTable ] = useState(selectedLevels[0]);
  const highlight = "text-sub mr-6 font-semibold text-text-dark underline cursor-pointer";
  const disabled = "text-sub mr-6 font-semibold text-gray-400 cursor-pointer";

  const handleSelectedLevel = (level : number) => {
    if (level === 4){
      setLevelTable(4);
    }
    else if (level === 5){
      setLevelTable(5);
    }
    else if (level === 6){
      setLevelTable(6);
    }
  }

  return (
    <>
      <AddModulesHeader 
        message="Add Grades"
      />
      <p className="text-center">
        Please note that when you add grades the module is automatically selected and added in your modules list.
      </p>
      <div className="flex flex-col m-10 h-90">
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
              className={levelTable  == 5 ? highlight : disabled}
              onClick={() => handleSelectedLevel(5)}
            >
              Level 5
            </button>
            <button
              type="button"
              className={levelTable  == 6 ? highlight : disabled}
              onClick={() => handleSelectedLevel(6)}
            >
              Level 6
            </button>
          </div>

          <p className="text-small">
            (Grayed out are already available in your modules, edit them via modules)
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between ml-2">
        <button
          type="button"
          className="flex flex-row items-center justify-center text-body font-regular text-background bg-primary-dark p-2 w-75 rounded-lg cursor-pointer"
          onClick={() => {
            setCurrentStep(1);
          }}
        >
          <span className="material-symbols-outlined mr-2">arrow_left_alt</span>
          Back
        </button>
        <button
          type="button"
          className="flex flex-row items-center justify-center text-body font-regular text-background bg-primary-dark p-2 w-75 rounded-lg cursor-pointer"
          onClick={() => {
            setCurrentStep(3);
          }}
        >
          Next
          <span className="material-symbols-outlined ml-2">arrow_right_alt</span>
        </button>
      </div>
    </>
  );
}