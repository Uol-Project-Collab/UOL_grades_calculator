interface CardProps {
  moduleName: string;
  moduleCode: string;
  grade: number;
}

export default function Card({moduleName, moduleCode, grade} : CardProps){
  return(
    <div className="flex w-80 flex-row bg-gray-100 p-3 mr-4 mt-4  rounded-2xl shadow">
      <div>
        <p>{moduleName}</p>
        <p>{moduleCode}</p>
        <button type="button" className="flex flex-row items-center mt-8">
          <span className="material-symbols-outlined mr-2">edit_square</span>
          Edit Grade
        </button>
      </div>
      <div className="flex items-center">
        <svg viewBox="0 0 32 32" className="w-16 h-16">
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