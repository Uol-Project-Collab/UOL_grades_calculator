"use client";

import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";
import Card from "../../../components/Card";

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
                className="text-sub mr-6 font-semibold underline"
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
                className="flex flex-row items-center"
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
