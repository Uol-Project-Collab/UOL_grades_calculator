"use client";

import { useRouter } from "next/navigation";
import { useAddModule } from "./(context)/AddModuleProvider";
import ProgressBar from "./(components)/ProgressBar";
import Step1 from "./(components)/Step1";
import Step2 from "./(components)/Step2";
import Step3 from "./(components)/Step3";

export default function Page() {
  const router = useRouter();
  const { currentStep } = useAddModule();

  const renderSteps = () => {
    if (currentStep === 1) {
      return <Step1 />;
    } else if (currentStep === 2) {
      return <Step2 />;
    } else if (currentStep === 3) {
      return <Step3 />;
    }
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="item-center text-head text-text-dark flex cursor-pointer flex-row font-semibold"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <span
            className="material-symbols-outlined mr-2"
            style={{ fontSize: "36px" }}
          >
            cancel
          </span>
          Exit
        </button>
      </div>

      <ProgressBar />

      <div>{renderSteps()}</div>
    </>
  );
}
