// Mapping of module names grouped by level.
const modulesByLevel = {
  "4": [
    { code: "CM1005", name: "Introduction to Programming 1" },
    { code: "CM1010", name: "Introduction to Programming 2" },
    { code: "CM1015", name: "Computational Mathematics" },
    { code: "CM1020", name: "Discrete Mathematics" },
    { code: "CM1030", name: "How Computers Work" },
    { code: "CM1035", name: "Algorithms and Data Structures" },
    { code: "CM1040", name: "Web Development" },
    { code: "CM1025", name: "Fundamentals of Computer Science" }
  ],
  "5": [
    { code: "CM2045", name: "Professional Practice for Computer Science" },
    { code: "CM2035", name: "Algorithms and Data Structures 2" },
    { code: "CM2025", name: "Computer Security" },
    { code: "CM2040", name: "Databases, Networks and the Web" },
    { code: "CM2030", name: "Graphics Programming" },
    { code: "CM2005", name: "Object Oriented Programming" },
    { code: "CM2015", name: "Programming with Data" },
    { code: "CM2010", name: "Software Design and Development" }
  ],
  "6": [
    { code: "CM3045", name: "3D Graphics and Animation" },
    { code: "CM3035", name: "Advanced Web Development" },
    { code: "CM3020", name: "Artificial Intelligence" },
    { code: "CM3005", name: "Data Science" },
    { code: "CM3010", name: "Databases and Advanced Data Techniques" },
    { code: "CM3030", name: "Games Development" },
    { code: "CM3065", name: "Intelligent Signal Processing" },
    { code: "CM3055", name: "Interaction Design" },
    { code: "CM3015", name: "Machine Learning and Neural Networks" },
    { code: "CM3050", name: "Mobile Development" },
    { code: "CM3060", name: "Natural Language Processing" },
    { code: "CM3040", name: "Physical Computing and Internet of Things" },
    { code: "CM3025", name: "Virtual Reality" }
  ]
};

// Global element references.
const levelsCheckboxGroup = document.getElementById("levelsCheckboxGroup");
const nextStepButton = document.getElementById("nextStep");
const backButton = document.getElementById("backButton");
const addModuleBtn = document.getElementById("addModuleBtn");
const showCurrentModuleBtn = document.getElementById("showCurrentModuleBtn");
const step1Div = document.getElementById("step1");
const step2Div = document.getElementById("step2");
const currentModules = document.getElementById("currentModules");
const moduleListDiv = document.getElementById("moduleList");
const submitGradesButton = document.getElementById("submitGrades");
let messageDisplay = document.getElementById("messageDisplay");

// Create message display element if not present.
if (!messageDisplay) {
  messageDisplay = document.createElement("div");
  messageDisplay.id = "messageDisplay";
  document.querySelector(".form-container").prepend(messageDisplay);
}

/**
 * Displays a message inline with an optional type for styling.
 * @param {string} message - The message to display.
 * @param {string} [type="error"] - The message type ('error' or 'success').
 */
function showMessage(message, type = "error") {
  messageDisplay.textContent = message;
  messageDisplay.className = type;
}

/**
 * Clears any displayed messages.
 */
function clearMessage() {
  messageDisplay.textContent = "";
  messageDisplay.className = "";
}

/**
 * Retrieves the selected level values from the checkbox group.
 * @returns {Array<string>} An array of selected level values.
 */
function getSelectedLevels() {
  return Array.from(levelsCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked'))
              .map(cb => cb.value);
}

/**
 * Creates and returns a DOM element for a module item.
 * This includes a label, a numeric grade input, and an RPL checkbox.
 * @param {Object} moduleData - The module data object containing code and name.
 * @param {string} level - The level of the module.
 * @returns {HTMLElement} The module item element.
 */
function createModuleItem(moduleData, level) {
  const moduleItemDiv = document.createElement("div");
  moduleItemDiv.className = "module-item";
  moduleItemDiv.dataset.level = level;
  moduleItemDiv.dataset.code = moduleData.code;
  moduleItemDiv.dataset.name = moduleData.name;

  const label = document.createElement("label");
  label.textContent = `[${moduleData.code}] ${moduleData.name}`;

  const gradeInput = document.createElement("input");
  gradeInput.type = "text"; // Changed from "number" to "text"
  gradeInput.placeholder = "Grade";
  gradeInput.pattern = "[0-9]*"; // helps with mobile numeric keyboard

  // Get existing module data from localStorage
  const existingModules = JSON.parse(localStorage.getItem("submittedModules")) || [];
  const existingModule = existingModules.find(module => 
    module.moduleCode === moduleData.code
  );
  
  // If module exists, prefill the input and handle RPL case
  if (existingModule) {
    if (existingModule.grade === "RPL") {
      rplCheckbox.checked = true;
      gradeInput.disabled = true;
    } else {
      gradeInput.value = existingModule.grade || "";
    }
  }
  
  // Input validation on the fly
  gradeInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    if (value && !/^\d+$/.test(value)) {
      e.target.value = value.replace(/[^\d]/g, "");
      showMessage("Please enter a valid number.", "error")
    } else {
      clearMessage();
    }
  });

  const rplCheckbox = document.createElement("input");
  rplCheckbox.type = "checkbox";

  // Disable grade input when RPL is checked.
  rplCheckbox.addEventListener("change", () => {
    gradeInput.disabled = rplCheckbox.checked;
    if (rplCheckbox.checked) gradeInput.value = "";
  });

  moduleItemDiv.appendChild(label);
  moduleItemDiv.appendChild(gradeInput);
  moduleItemDiv.appendChild(rplCheckbox);

  return moduleItemDiv;
}

/**
 * Handles the "Next" button click by validating the selection,
 * switching view steps, and populating modules for selected levels.
 */
function handleNextStep() {
  const selectedLevels = getSelectedLevels();
  if (selectedLevels.length === 0) {
    showMessage("Please select at least one level.", "error");
    return;
  }
  clearMessage();
  step1Div.style.display = "none";
  showCurrentModuleBtn.style.display = "none";
  step2Div.style.display = "block";
  populateModules(selectedLevels);
}

/**
 * Handles the "Back" button click to return to the previous step.
 */
function handleBack() {
  step2Div.style.display = "none";
  step1Div.style.display = "block";
  showCurrentModuleBtn.style.display = "block";
  clearMessage();
}

/**
 * Dynamically populates the module list based on selected levels.
 * For each module, creates a module item using createModuleItem().
 * Leaving the grade input empty will result in the module being marked as null.
 * @param {Array<string>} levels - The selected levels.
 */
function populateModules(levels) {
  moduleListDiv.innerHTML = "";
  levels.forEach(level => {
    const modules = modulesByLevel[level] || [];
    if (modules.length) {
      const levelHeader = document.createElement("h4");
      levelHeader.textContent = `Level ${level}`;
      moduleListDiv.appendChild(levelHeader);
      modules.forEach(moduleData => {
        const moduleItem = createModuleItem(moduleData, level);
        moduleListDiv.appendChild(moduleItem);
      });
    }
  });
}

/**
 * Handles the submission of grades by validating input values,
 * logging the data, and resetting the form.
 * If no grade is provided and RPL is not selected, the module is marked as null.
 */
function handleSubmitGrades() {
  const modulesData = Array.from(moduleListDiv.querySelectorAll(".module-item")).map(item => {
    const moduleName = item.dataset.name;
    const moduleCode = item.dataset.code;
    const level = item.dataset.level;
    const gradeInput = item.querySelector('input[type="text"]');
    const rplCheckbox = item.querySelector('input[type="checkbox"]');

    let grade = "";
    if (rplCheckbox.checked) {
      grade = "RPL";
    } else if (!gradeInput.value) {
      grade = null;
    } else {
      grade = gradeInput.value;
    }

    return {
      level,
      moduleCode,
      moduleName,
      grade
    };
  });

  const invalidGrades = modulesData.some(data => {
    if (data.grade === "RPL" || data.grade === null) return false;
    const gradeNum = parseFloat(data.grade);
    return isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100;
  });

  if (invalidGrades) {
    showMessage("Please enter valid grades for all modules that require one.", "error");
    return;
  }

  clearMessage();
  
  // Get existing modules from localStorage
  const existingModules = JSON.parse(localStorage.getItem("submittedModules")) || [];

  // Filter out modules that are being updated
  const uniqueExistingModules = existingModules.filter(existingModule => {
    return !modulesData.some(newModule => 
      newModule.moduleName === existingModule.moduleName
    );
  });
  
  // Combine existing modules with new modules (excluding null grades)
  const filledModules = [
    ...uniqueExistingModules,
    ...modulesData.filter(data => data.grade !== null)
  ];
  
  // Save combined data to localStorage
  localStorage.setItem("submittedModules", JSON.stringify(filledModules));
  
  showMessage("Grades submitted successfully!", "success");
  resetForm();
}

/**
 * Resets the form to its initial state, including UI elements and messages.
 */
function resetForm() {
  step1Div.style.display = "none";
  step2Div.style.display = "none";
  levelsCheckboxGroup.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  moduleListDiv.innerHTML = "";
  addModuleBtn.style.display = "block";
  showCurrentModuleBtn.style.display = "block";
}

function handleAddModules(){
  step1Div.style.display = "block";
  step2Div.style.display = "none";
  addModuleBtn.style.display = "none";
  showCurrentModuleBtn.style.display = "block";
  currentModules.style.display = "none";
}

function handleShowCurrentModules() {
  const submittedModules = JSON.parse(localStorage.getItem("submittedModules")) || [];
  const moduleListDisplay = document.getElementById("moduleListDisplay");
  const currentModules = document.getElementById("currentModules");
  
  // Clear previous content
  moduleListDisplay.innerHTML = "";
  
  if (submittedModules.length === 0) {
    showMessage("No modules submitted yet.", "error");
    currentModules.style.display = "none";
    return;
  }
  
  clearMessage();

  // Create and append modules to the list
  submittedModules.forEach(module => {
    const listItem = document.createElement("li");
    listItem.className = "d-module-item";
    
    // Create module name span
    const nameSpan = document.createElement("span");
    nameSpan.textContent = module.moduleName;
    nameSpan.className = "d-module-name";
    
    // Create grade span
    const gradeSpan = document.createElement("span");
    gradeSpan.textContent = `Grade: ${module.grade}`;
    gradeSpan.className = "d-module-grade";
    
    // Append elements to list item
    listItem.appendChild(nameSpan);
    listItem.appendChild(gradeSpan);
    
    // Append list item to the display list
    moduleListDisplay.appendChild(listItem);
  });

  currentModules.style.display = "block";
  addModuleBtn.style.display = "block";
  step1Div.style.display = "none";
  step2Div.style.display = "none";
}

// Attach event listeners for user interactions.
nextStepButton.addEventListener("click", handleNextStep);
backButton.addEventListener("click", handleBack);
submitGradesButton.addEventListener("click", handleSubmitGrades);
addModuleBtn.addEventListener("click", handleAddModules);
showCurrentModuleBtn.addEventListener("click", handleShowCurrentModules);

document.getElementById('resetAllBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all saved module data?')) {
    localStorage.clear();
    showMessage('All data has been cleared', 'success');
    location.reload();
  }
});