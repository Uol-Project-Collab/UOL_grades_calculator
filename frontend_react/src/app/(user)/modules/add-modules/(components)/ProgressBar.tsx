import { useAddModule } from "../(context)/AddModuleContext";

export default function ProgressBar() {
  const { currentStep } = useAddModule();

  const getCircleClass = (step: number) => {
    if (step < currentStep) return "bg-green-600";
    if (step === currentStep) return "bg-primary-dark";
    return "bg-gray-500";
  };

  return (
    <div className="flex flex-row items-center justify-center m-10">
      {[1, 2, 3].map((step, idx) => (
        <div className="flex items-center" key={step}>
          <div className={`w-8 h-8 rounded-full ${getCircleClass(step)}`}></div>
          {step !== 3 && <div className="w-16 h-1 bg-primary-dark mx-2"></div>}
        </div>
      ))}
    </div>
  );
}