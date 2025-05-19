type Module = {
  grade: string | number;
};

type SubmittedModules = {
  [level: string]: Module[];
};

export const CalculateAverageGrade = (
  submittedModules: SubmittedModules,
): string => {
  let weightedSum = 0;
  let totalWeight = 0;

  const weightMapping: { [key: string]: number } = {
    "4": 15,
    "5": 45,
    "6": 75,
  };

  Object.entries(submittedModules).forEach(([level, modulesArray]) => {
    const weight = weightMapping[level] || 1;
    modulesArray.forEach((module) => {
      const grade = module.grade;
      if (grade && grade !== "RPL" && !isNaN(Number(grade))) {
        weightedSum += parseFloat(grade as string) * weight;
        totalWeight += weight;
      }
    });
  });

  return totalWeight ? (weightedSum / totalWeight).toFixed(2) : "N/A";
};
