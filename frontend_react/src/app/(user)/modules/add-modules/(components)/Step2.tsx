'use client';

import { useAddModule } from "../(context)/AddModuleContext";
import { useState, useEffect } from "react";

export default function Step2() {
  const { selectedLevels, setCurrentStep } = useAddModule();
  const [activeLevel, setActiveLevel] = useState<number>(selectedLevels[0]);

  useEffect(() => {
    setCurrentStep(2);
  }, []);

  return (
    <>
      {selectedLevels.map((lvl) => (
        <button
          key={lvl}
          onClick={() => setActiveLevel(lvl)}
          className={activeLevel === lvl ? "underline text-black" : "text-gray-400"}
        >
          Level {lvl}
        </button>
      ))}

      <div className="flex justify-between mt-4">
        <button onClick={() => {
          setCurrentStep(1);
        }}>
          Back
        </button>
        <button onClick={() => {
          setCurrentStep(3);
        }}>
          Next
        </button>
      </div>
    </>
  );
}