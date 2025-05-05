"use client";

import { useState } from "react";
import HeaderMessage from "./HeaderMessage";

export default function Step1() {
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

  const handleCheckboxChange = (value: number) => {
    setSelectedLevels((prev) =>
      prev.includes(value) ? prev.filter((level) => level !== value) : [...prev, value]
    );
  };

  const [error, setError] = useState<string>();

  const handleNextClick = () => {
    if (selectedLevels.length === 0) {
      setError("Please select at least one level before proceeding.");
      return;
    }
    setError(null); // Clear any previous error
  };

  return (
    <>
      <HeaderMessage
        message = "Select Your Module"
      />

      <p className="text-center">
        Please select level for modules you want to add. (If you are not sure then select each level to see all of the modules)
      </p>

      <p className="text-red-500 text-body text-center">
        {error}
      </p>
      
      <div className="flex flex-col m-10 p-10 h-90">
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

      <div className="flex flex-row items-center justify-end mr-2">
        <button
          type="button"
          className="flex flex-row items-center justify-center text-body font-regular text-background bg-primary-dark p-2 w-75 rounded-lg cursor-pointer"
          onClick={handleNextClick}
        >
          Next
          <span className="material-symbols-outlined ml-2">arrow_right_alt</span>
        </button>
      </div>
    </>
  );
}
