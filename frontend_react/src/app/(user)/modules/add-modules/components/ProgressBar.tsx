import { useAddModule } from "../context/AddModuleContext";

export default function ProgressBar() {
  const { currentStep } = useAddModule();

  const getCircleClass = (step: number) => {
    if (step < currentStep) return "bg-green-600";
    if (step === currentStep) return "bg-primary-dark";
    return "bg-gray-500";
  };

  return (
    <div className="m-10 flex flex-row items-center justify-center">
      {[1, 2, 3].map((step, idx) => (
        <div className="flex items-center" key={step}>
          <div className={`h-8 w-8 rounded-full ${getCircleClass(step)}`}></div>
          {step !== 3 && <div className="bg-primary-dark mx-2 h-1 w-16"></div>}
        </div>
      ))}
    </div>
  );
}
