'use client';

import { useAddModule } from "../(context)/AddModuleContext";

export default function Step1() {
  const { selectedLevels, setSelectedLevels, setCurrentStep } = useAddModule();

  const handleCheckboxChange = (value: number) => {
    if (selectedLevels.includes(value)) {
      setSelectedLevels(selectedLevels.filter((v) => v !== value));
    } else {
      setSelectedLevels([...selectedLevels, value]);
    }
  };

  const handleNextClick = () => {
    if (selectedLevels.length === 0) return alert("Select at least one level.");
    setCurrentStep(2);
  };

  return (
    <>
      <p className="text-center">
        Please select level for modules you want to add. (If you are not sure then select each level to see all of the modules)
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
