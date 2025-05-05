"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AddModulesStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levels = searchParams.get("levels")?.split(",") || []; // Get levels from query
  const [selectedLevel, setSelectedLevels] = useState<number>(parseInt(levels[0]));
  const highlight = "text-sub mr-6 font-semibold text-text-dark underline cursor-pointer";
  const disabled = "text-sub mr-6 font-semibold text-gray-400 cursor-pointer";
  
  const handleLevelSelect = (value : number) => {
    if (value === 4){
      setSelectedLevels(4);
    }
    else if (value === 5){
      setSelectedLevels(5);
    }
    else if (value === 6){
      setSelectedLevels(6);
    }
    
  }

  return (
    <>
      <p className="text-center">
        Please note that when you add grades the module is automatically selected and added in your modules list.
      </p>
      <div className="flex flex-col m-10 h-90">
        <div className="flex flex-row items-center justify-between">
          <div>
            {levels.includes("4") && (
              <button
                type="button"
                className={selectedLevel == 4 ? highlight : disabled}
                onClick={() => handleLevelSelect(4)}
              >
                Level 4
              </button>
            )}
            {levels.includes("5") && (
              <button
                type="button"
                className={selectedLevel == 5 ? highlight : disabled}
                onClick={() => handleLevelSelect(5)}
              >
                Level 5
              </button>
            )}
            {levels.includes("6") && (
              <button
                type="button"
                className={selectedLevel == 6 ? highlight : disabled}
                onClick={() => handleLevelSelect(6)}
              >
                Level 6
              </button>
            )}
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
            router.push("/modules/add-modules/step-1");
          }}
        >
          <span className="material-symbols-outlined mr-2">arrow_left_alt</span>
          Back
        </button>
        <button
          type="button"
          className="flex flex-row items-center justify-center text-body font-regular text-background bg-primary-dark p-2 w-75 rounded-lg cursor-pointer"
          onClick={() => {
            router.push("/modules/add-modules/step-2");
          }}
        >
          Next
          <span className="material-symbols-outlined ml-2">arrow_right_alt</span>
        </button>
      </div>
    </>
  );
}