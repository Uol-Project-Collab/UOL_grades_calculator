"use client";

import { useState, useEffect } from "react";
import Header from "../(components)/Header";
import Navbar from "../(components)/Navbar";
import { useRouter } from "next/navigation";
import Card from "./(components)/Card";
import { useUserData } from "../../(context)/UserData";

/**
 * The `Modules` component represents a page that displays the user's current modules
 * categorized by levels (Level 4, Level 5, Level 6). It provides navigation between
 * different module levels and an option to add new modules.
 *
 * @component
 *
 * @returns {JSX.Element} A React functional component that renders the modules page.
 *
 * @remarks
 * - The component uses `useRouter` from Next.js for navigation.
 * - It includes a `Header` component to display the page title and a message.
 * - A `Navbar` component is included for navigation within the application.
 * - The page contains buttons to switch between module levels, with the active level
 *   styled differently.
 * - A button is provided to navigate to the "Add Module" page.
 * - The modules are displayed as a collection of `Card` components, each representing
 *   a module with its name, code, and grade.
 *
 * @example
 * ```tsx
 * <Modules />
 * ```
 *
 * @dependencies
 * - `useRouter` from Next.js for navigation.
 * - `Header`, `Navbar`, and `Card` components for layout and functionality.
 */
export default function Modules() {
  const router = useRouter();
  const { userModules, loading } = useUserData();
  const [levelTable, setLevelTable] = useState(4);

  const highlight =
    "text-sub text-text-dark mr-6 font-semibold cursor-pointer underline";
  const disabled = "text-sub mr-6 font-semibold text-gray-400 cursor-pointer";

  let displayModules = [];
  if (userModules) {
    displayModules = userModules.modules.filter(
      (module) => module.level === levelTable,
    );
  }

  return (
    <>
      {/* Header - Full width */}
      <div className="w-full">
        <Header
          title="Your Current Modules"
          message="Switch tabs to see different levels of modules."
        />
      </div>

      {/* Main content area - Navbar on left, Content on right */}
      <div className="flex flex-1 flex-row">
        {/* Navbar */}
        <div className="flex-shrink-0">
          <Navbar />
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col">
          {/* Module level selection and Add button */}
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex w-fit flex-row">
              <button
                type="button"
                className={levelTable === 4 ? highlight : disabled}
                onClick={() => setLevelTable(4)}
              >
                Level 4
              </button>
              <button
                type="button"
                className={levelTable === 5 ? highlight : disabled}
                onClick={() => setLevelTable(5)}
              >
                Level 5
              </button>
              <button
                type="button"
                className={levelTable === 6 ? highlight : disabled}
                onClick={() => setLevelTable(6)}
              >
                Level 6
              </button>
            </div>
            <div className="w-fit">
              <button
                type="button"
                className="bg-background-light flex cursor-pointer flex-row items-center rounded-lg p-2"
                onClick={() => router.push("/modules/add-modules")}
              >
                <span className="material-symbols-outlined mr-2">add</span>Add
                Module
              </button>
            </div>
          </div>

          {/* Module cards */}
          <div className="flex max-h-[calc(100vh-200px)] w-full flex-row flex-wrap gap-4 overflow-y-auto pl-6">
            {loading ? (
              <p>Loading modules...</p>
            ) : displayModules.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center py-8">
                <p className="mb-2 text-gray-500">No modules found</p>
                <p className="text-gray-400">
                  Try adding some modules using the "Add Module" button above
                </p>
              </div>
            ) : (
              displayModules.map((module, index) => (
                <Card
                  key={`${module.moduleCode}-${index}`}
                  moduleName={module.moduleName}
                  moduleCode={module.moduleCode}
                  grade={module.grade}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
