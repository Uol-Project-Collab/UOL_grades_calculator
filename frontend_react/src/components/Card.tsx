interface CardProps {
  moduleName: string;
  moduleCode: string;
  grade: number;
}

export default function Card({ moduleName, moduleCode, grade }: CardProps) {
  return (
    <div className="mt-4 mr-4 flex w-80 flex-row rounded-2xl bg-gray-100 p-3 shadow">
      <div>
        <p>{moduleName}</p>
        <p>{moduleCode}</p>
        <button type="button" className="mt-8 flex flex-row items-center">
          <span className="material-symbols-outlined mr-2">edit_square</span>
          Edit Grade
        </button>
      </div>
      <div className="flex items-center">
        <svg viewBox="0 0 32 32" className="h-16 w-16">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeDasharray={`${grade} 100`}
            transform="rotate(-90 16 16)"
          />
        </svg>
        <p className="ml-4 text-sm">{grade}% Grade</p>
      </div>
    </div>
  );
}
