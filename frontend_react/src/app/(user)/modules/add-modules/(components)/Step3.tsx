"use client";

import { useGrades } from "../(context)/GradesProvider";
import { useAddModule } from "../(context)/AddModuleProvider";
import AddModulesHeader from "./AddModulesHeader";
import { SubmitModules } from "../(utils)/SubmitModules";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Step3() {
  const { modulesWithGrades, removeModule } = useGrades();
  const { selectedLevels, setCurrentStep } = useAddModule();
  const router = useRouter();
  // Group modules by level
  const modulesByLevel = {
    4: modulesWithGrades.filter(module => module.level === 4),
    5: modulesWithGrades.filter(module => module.level === 5),
    6: modulesWithGrades.filter(module => module.level === 6)
  };

  // Calculate summary statistics
  const totalModules = modulesWithGrades.length;
  const totalCredits = modulesWithGrades.reduce((sum, module) => {
    // Special case for Final Project
    if (module.moduleCode === "CM3070") {
      return sum + (module.credits || 30);
    }
    return sum + (module.credits || 15);
  }, 0);

  // Function to calculate classification based on grade
  const getClassification = (grade: string) => {
    const numGrade = parseInt(grade);
    if (!grade || isNaN(numGrade)) return "-";
    if (numGrade >= 70) return "First";
    if (numGrade >= 60) return "Upper Second";
    if (numGrade >= 50) return "Lower Second";
    if (numGrade >= 40) return "Third";
    return "Fail";
  };

  // const handleRemoveModule = (moduleCode: string) => {
  //   if (confirm("Are you sure you want to remove this module?")) {
  //     removeModule(moduleCode);
  //   }
  // };

  const handleSubmission = async () => {
    try {
      // First check if user is authenticated
      const authCheck = await axios.get("http://localhost:3000/api/auth/verify-session", {
        withCredentials: true,
      });

      if (!authCheck.data.authenticated) {
        alert("You are not authenticated. Please log in again.");
        // Redirect to login page
        window.location.href = "/login";
        return;
      }

      // Prepare valid modules for submission
      const validModules = modulesWithGrades
        .filter(module => module.isRpl || (module.grade && module.grade.trim() !== ""))
        .map(({ moduleCode, level, moduleName, grade, isRpl }) => ({
          moduleCode,
          level,
          moduleName,
          grade: isRpl ? "RPL" : grade, // Handle RPL case
        }));

      if (validModules.length === 0) {
        alert("Please add grades to your modules before submitting");
        return;
      }

      // Submit modules to the backend
      await SubmitModules(validModules);

      // Redirect to dashboard after successful submission
      router.replace("/modules");
    } catch (error) {
      console.error("SubmitModules failed:", error);
      alert("Failed to submit modules. Please check console for details.");
    }
  }

  // Column width styles to ensure consistency across all tables
  const columnStyles = {
    moduleCode: "w-1/8",
    moduleName: "w-3/8",
    credits: "w-1/12",
    grade: "w-1/12",
    classification: "w-1/6",
    rpl: "w-1/12",
    actions: "w-1/12"
  };

  const renderModuleTable = (level: number) => {
    const modules = modulesByLevel[level];
    
    if (!modules || modules.length === 0) {
      return <p className="text-gray-500 italic mt-2 mb-6">No modules selected for Level {level}</p>;
    }

    return (
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-2">Level {level} Modules</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className={`border p-2 text-left ${columnStyles.moduleCode}`}>Module Code</th>
                <th className={`border p-2 text-left ${columnStyles.moduleName}`}>Module Name</th>
                <th className={`border p-2 text-center ${columnStyles.credits}`}>Credits</th>
                <th className={`border p-2 text-center ${columnStyles.grade}`}>Grade</th>
                <th className={`border p-2 text-center ${columnStyles.classification}`}>Classification</th>
                <th className={`border p-2 text-center ${columnStyles.rpl}`}>RPL</th>
                <th className={`border p-2 text-center ${columnStyles.actions}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map(module => (
                <tr key={module.moduleCode} className="hover:bg-gray-50">
                  <td className="border p-2">{module.moduleCode}</td>
                  <td className="border p-2">{module.moduleName}</td>
                  <td className="border p-2 text-center">
                    {module.moduleCode === "CM3070" ? (module.credits || 30) : (module.credits || 15)}
                  </td>
                  <td className="border p-2 text-center">{module.grade || "-"}</td>
                  <td className="border p-2 text-center">{getClassification(module.grade)}</td>
                  <td className="border p-2 text-center">{module.isRpl ? "Yes" : "No"}</td>
                  <td className="border p-2 text-center">
                    <button 
                      onClick={() => removeModule(module.moduleCode)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <AddModulesHeader message="Review Selected Modules" />
      
      <div className="flex min-h-[calc(100vh-200px)] flex-col pb-12">
        {/* <div className="bg-white shadow-md rounded-lg p-6 mt-6 mb-8">
          <h3 className="text-2xl font-extrabold mb-4 text-gray-800">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Total Modules</span>
              <span className="text-xl font-semibold text-gray-900">{totalModules}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Total Credits</span>
              <span className="text-xl font-semibold text-gray-900">{totalCredits}</span>
            </div>
            {selectedLevels.map(level => (
              <div key={level} className="flex flex-col">
                <span className="text-sm text-gray-600">Level {level} Modules</span>
                <span className="text-xl font-semibold text-gray-900">{modulesByLevel[level].length}</span>
              </div>
            ))}
          </div>
        </div> */}

        {selectedLevels.includes(4) && renderModuleTable(4)}
        {selectedLevels.includes(5) && renderModuleTable(5)}
        {selectedLevels.includes(6) && renderModuleTable(6)}
        
        <div className="flex flex-row items-center justify-between mt-auto pt-4">
          <button
            type="button"
            className="text-body font-regular text-background bg-primary-dark flex w-75 cursor-pointer flex-row items-center justify-center rounded-lg p-2"
            onClick={() => {
              setCurrentStep(2);
            }}
          >
            <span className="material-symbols-outlined mr-2">arrow_left_alt</span>
            Back
          </button>
          <button
            type="button"
            className="text-body font-regular text-background bg-primary-dark flex w-75 cursor-pointer flex-row items-center justify-center rounded-lg p-2"
            onClick={handleSubmission}
          >
            Submit
            <span className="material-symbols-outlined ml-2">
              check
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
