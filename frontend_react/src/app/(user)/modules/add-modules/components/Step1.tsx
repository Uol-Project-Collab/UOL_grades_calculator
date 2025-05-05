"use client";

import { useState } from "react";
import AddModulesHeader from "./AddModulesHeader";
import { useAddModule } from "../context/AddModuleContext";

export default function Step1() {
  const { selectedLevels, setSelectedLevels, setCurrentStep } = useAddModule();
  const [error, setError] = useState<string>();

  const handleCheckboxChange = (value: number) => {
    if (selectedLevels.includes(value)) {
      setSelectedLevels(selectedLevels.filter((v) => v !== value));
    } else {
      setSelectedLevels([...selectedLevels, value]);
    }
  };

  const handleNextClick = () => {
    if (selectedLevels.length === 0) {
      setError("Please select at least one level before proceeding.");
      return;
    }
    setError(null); // Clear any previous error
    setCurrentStep(2);
  };

  return (
    <>
      <AddModulesHeader message="Select Your Module" />

      <p className="text-center">
        Please select level for modules you want to add. (If you are not sure
        then select each level to see all of the modules)
      </p>

      <p className="text-body text-center text-red-500">{error}</p>

      <div className="m-10 flex h-90 flex-col p-10">
        <label>
          <input
            type="checkbox"
            value={4}
            onChange={() => handleCheckboxChange(4)}
            checked={selectedLevels.includes(4)}
          />{" "}
          Level 4
        </label>
        <label>
          <input
            type="checkbox"
            value={5}
            onChange={() => handleCheckboxChange(5)}
            checked={selectedLevels.includes(5)}
          />{" "}
          Level 5
        </label>
        <label>
          <input
            type="checkbox"
            value={6}
            onChange={() => handleCheckboxChange(6)}
            checked={selectedLevels.includes(6)}
          />{" "}
          Level 6
        </label>
      </div>

      <div className="mr-2 flex flex-row items-center justify-end">
        <button
          type="button"
          className="text-body font-regular text-background bg-primary-dark flex w-75 cursor-pointer flex-row items-center justify-center rounded-lg p-2"
          onClick={handleNextClick}
        >
          Next
          <span className="material-symbols-outlined ml-2">
            arrow_right_alt
          </span>
        </button>
      </div>
    </>
  );
}
