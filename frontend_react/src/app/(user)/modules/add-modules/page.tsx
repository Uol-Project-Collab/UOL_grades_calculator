'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default function Page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); //context

  const getCircleClass = (step: number) => {
    if (step < currentStep) return "bg-green-600";
    if (step === currentStep) return "bg-primary-dark";
    return "bg-gray-500";
  };

  const renderSteps = () => {
    if (currentStep === 1){
      return <Step1 />
    } else if (currentStep === 2){
      return <Step2 />
    } else if (currentStep === 3){
      return <Step3 />
    }
  }

  return(
    <>
      <div>
        <button
          type="button"
          className="flex flex-row item-center text-head font-semibold text-text-dark cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <span className="material-symbols-outlined mr-2" style={{ fontSize: '36px' }}>cancel</span>
          Exit
        </button>
      </div>

      <div className="flex flex-row items-center justify-center m-10">
        {[1, 2, 3].map((step, idx) => (
          <div className="flex items-center" key={step}>
            <div className={`w-8 h-8 rounded-full ${getCircleClass(step)}`}></div>
            {step !== 3 && <div className="w-16 h-1 bg-primary-dark mx-2"></div>}
          </div>
        ))}
      </div>
      
      <div>
        {renderSteps()}
      </div>
      
    </>
  );
  
}
