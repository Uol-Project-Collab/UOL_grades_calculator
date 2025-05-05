'use client';

import { useAddModule } from "../(context)/AddModuleContext";
import { useEffect } from "react";

export default function Step3() {
  const { selectedLevels, setCurrentStep } = useAddModule();

  useEffect(() => {
    setCurrentStep(3);
  }, []);

  return (
    <div>
      <h2>Modules selected for levels: {selectedLevels.join(", ")}</h2>
      {/* Render final selections or review info */}
    </div>
  );
}
