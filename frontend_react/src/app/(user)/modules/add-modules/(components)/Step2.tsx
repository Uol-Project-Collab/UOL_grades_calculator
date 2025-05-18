"use client";

import { useState } from "react";
import { useAddModule } from "../(context)/AddModuleProvider";
import AddModulesHeader from "./AddModulesHeader";
import { useModules } from "../(context)/ModulesDataProvider";

export default function AddModulesStep2() {
  const { selectedLevels, setCurrentStep } = useAddModule();
  const { data } = useModules();
  const [levelTable, setLevelTable] = useState(selectedLevels[0]);
  const [moduleGrades, setModuleGrades] = useState<{[key: string]: string}>({});
  const [rplModules, setRplModules] = useState<{[key: string]: boolean}>({});
  
  let displayModules = [];
  if(data){
    displayModules = data.modules.filter(
      module => module.level === levelTable
    );
  }

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

  const handleGradeChange = (moduleCode: string, value: string) => {
    // Only allow numbers between 0-100
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
      setModuleGrades({
        ...moduleGrades,
        [moduleCode]: value
      });
    }
  };

  const handleRplChange = (moduleCode: string, checked: boolean) => {
    setRplModules({
      ...rplModules,
      [moduleCode]: checked
    });
  };

  return (
    <>
      <AddModulesHeader message="Add Grades" />
      <p className="text-center">
        Please note that when you add grades the module is automatically
        selected and added in your modules list.
      </p>
      <div className="mx-8 my-6 flex h-full flex-col">
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
        <div className="flex flex-col">
          {displayModules.length > 0 ? (
            <div className="mt-4 overflow-y-auto" style={{ height: "calc(8 * 60px)" }}>
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-white">
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Module Code</th>
                    <th className="border p-2 text-left">Module Name</th>
                    <th className="border p-2 text-center">Grade</th>
                    <th className="border p-2 text-center">RPL</th>
                  </tr>
                </thead>
                <tbody>
                  {displayModules.map((module) => (
                    <tr key={module.moduleCode} className="hover:bg-gray-50">
                      <td className="border p-2">{module.moduleCode}</td>
                      <td className="border p-2">{module.moduleName}</td>
                      <td className="border p-2 text-center">
                        <input
                          type="text"
                          className="w-16 border p-1 text-center"
                          value={moduleGrades[module.moduleCode] || ""}
                          onChange={(e) => handleGradeChange(module.moduleCode, e.target.value)}
                          placeholder="0-100"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={rplModules[module.moduleCode] || false}
                          onChange={(e) => handleRplChange(module.moduleCode, e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No modules found for this level</p>
          )}
          
          <div className="flex flex-row items-center justify-between mt-4">
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
        </div>
      </div>
    </>
  );
}