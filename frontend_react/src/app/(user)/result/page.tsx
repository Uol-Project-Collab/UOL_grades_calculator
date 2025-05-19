"use client";

import { useState, useEffect } from "react";
import Header from "../(components)/Header";
import Navbar from "../(components)/Navbar";
import { useUserData } from "../../(context)/UserData";
import { CalculateAverageGrade } from "../../(utils)/CalculateAverageGrade";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Result() {
  const { userModules, loading } = useUserData();
  const [modulesByLevel, setModulesByLevel] = useState({
    4: [],
    5: [],
    6: []
  });
  const [averageGrades, setAverageGrades] = useState({
    4: "N/A",
    5: "N/A",
    6: "N/A",
    overall: "N/A"
  });

  useEffect(() => {
    if (userModules?.modules?.length > 0) {
      // Group modules by level
      const grouped = {
        4: userModules.modules.filter(module => module.level === 4),
        5: userModules.modules.filter(module => module.level === 5),
        6: userModules.modules.filter(module => module.level === 6)
      };
      setModulesByLevel(grouped);

      // Calculate average grades for each level
      const submittedModulesFormat = {
        "4": grouped[4],
        "5": grouped[5],
        "6": grouped[6]
      };

      // Calculate individual level averages
      setAverageGrades({
        4: CalculateAverageGrade({ "4": grouped[4] }),
        5: CalculateAverageGrade({ "5": grouped[5] }),
        6: CalculateAverageGrade({ "6": grouped[6] }),
        overall: CalculateAverageGrade(submittedModulesFormat)
      });
    }
  }, [userModules]);

  const getGradeColor = (grade) => {
    if (grade === "N/A" || grade === "RPL") return '#6B7280'; // Gray for N/A or RPL
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 70) return '#059669'; // Green for First
    if (numericGrade >= 60) return '#0284C7'; // Blue for Upper Second
    if (numericGrade >= 50) return '#F59E0B'; // Yellow for Lower Second
    if (numericGrade >= 40) return '#F97316'; // Orange for Third
    return '#DC2626'; // Red for Fail
  };

  // Function to render chart for a specific level
  const renderLevelChart = (level) => {
    const modules = modulesByLevel[level];
    
    if (!modules || modules.length === 0) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h3 className="text-xl font-bold mb-2">Level {level} Results</h3>
          <p className="text-gray-500">No modules found for this level.</p>
        </div>
      );
    }

    const data = {
      labels: modules.map(module => module.moduleCode),
      datasets: [
        {
          label: `Level ${level} Grades`,
          data: modules.map(module => 
            module.grade === "RPL" ? 0 : parseFloat(module.grade) || 0
          ),
          backgroundColor: modules.map(module => getGradeColor(module.grade)),
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Grade'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Modules'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const module = modules[context.dataIndex];
              const grade = module.grade === "RPL" ? "RPL" : module.grade;
              return [`${module.moduleName}`, `Grade: ${grade}`];
            }
          }
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Level ${level} - Average: ${averageGrades[level]}%`,
          font: {
            size: 16
          }
        },
      },
    };

    return (
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <Bar data={data} options={options} />
      </div>
    );
  };

  return (
    <>
      {/* Header - Full width */}
      <div className="w-full">
        <Header
          title="Your Academic Results"
          message="View your performance across all levels."
        />
      </div>

      {/* Main content area - Navbar on left, Content on right */}
      <div className="flex flex-1 flex-row">
        {/* Navbar */}
        <div className="flex-shrink-0">
          <Navbar />
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading your results...</p>
            </div>
          ) : (
            <>
              {/* Overall summary card */}
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Overall Results</h2>
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-100">
                    <span className="text-3xl font-bold" style={{ color: getGradeColor(averageGrades.overall) }}>
                      {averageGrades.overall !== "N/A" ? `${averageGrades.overall}%` : "N/A"}
                    </span>
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-semibold">Overall Average</p>
                    <p className="text-gray-600">Based on all your module grades</p>
                    {averageGrades.overall !== "N/A" && (
                      <p className="mt-2 font-semibold">
                        Classification: {parseFloat(averageGrades.overall) >= 70 ? "First" : 
                          parseFloat(averageGrades.overall) >= 60 ? "Upper Second" :
                          parseFloat(averageGrades.overall) >= 50 ? "Lower Second" :
                          parseFloat(averageGrades.overall) >= 40 ? "Third" : "Fail"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Level charts */}
              {renderLevelChart(4)}
              {renderLevelChart(5)}
              {renderLevelChart(6)}
            </>
          )}
        </div>
      </div>
    </>
  );
}
