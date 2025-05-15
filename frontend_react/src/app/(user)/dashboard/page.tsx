"use client";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useModules } from "../modules/add-modules/context/ModulesProvider"; //-- allmodules

export default function Dashboard() {
  const { modules } = useModules(); //-- allmodules

  return (
    <>
      <Header
        title="Welcome, User"
        message="Always stay updated in your student grades."
      />

      <div className="flex h-full w-full flex-row">
        <Navbar />
        <div className="w-full">
          <p>Dashboard will be implemented here</p>
        </div>
      </div>
    </>
  );
}
