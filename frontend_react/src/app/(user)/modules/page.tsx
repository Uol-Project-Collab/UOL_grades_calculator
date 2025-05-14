"use client";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Card from "./components/Card";

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
  return (
    <>
      <Header
        title="Your Current Modules"
        message="Switch tabs to see different levels of modules."
      />

      <div className="flex h-full w-full flex-row">
        <Navbar />
        <div className="w-full">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex w-fit flex-row">
              <button
                type="button"
                className="text-sub text-text-dark mr-6 font-semibold underline"
              >
                Level 4
              </button>
              <button
                type="button"
                className="text-sub mr-6 font-semibold text-gray-400"
              >
                Level 5
              </button>
              <button
                type="button"
                className="text-sub mr-6 font-semibold text-gray-400"
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
          <div className="flex w-full flex-row flex-wrap pl-6">
            <Card
              moduleName="Introduction to Programming"
              moduleCode="CM-1010"
              grade={80}
            />
            <Card
              moduleName="Introduction to Programming"
              moduleCode="CM-1010"
              grade={80}
            />
            <Card
              moduleName="Introduction to Programming"
              moduleCode="CM-1010"
              grade={80}
            />
            <Card
              moduleName="Introduction to Programming"
              moduleCode="CM-1010"
              grade={80}
            />
          </div>
        </div>
      </div>
    </>
  );
}
