/**
 * @class FormManager
 * @description Handles form interactions and UI updates for module selection and grade submission.
 * It manages the display of modules based on selected levels, grade submission, and localStorage operations.
 * Provides methods to reset the form and display current modules.
 */
class FormManager {
  /**
   * @constructor
   * @param {ModuleManager} moduleManager - The ModuleManager instance for managing modules.
   * @param {MessageService} messageService - The MessageService instance for displaying messages.
   * @param {ModuleFetcher} moduleFetech - The ModuleFetcher instance for API interactions.
   */
  constructor(moduleManager, messageService, moduleFetech) {
      this.moduleManager = moduleManager;
      this.messageService = messageService;
      this.moduleFetech = moduleFetech;

      // Cache DOM elements for efficient access.
      this.levelsCheckboxGroup = document.getElementById("levelsCheckboxGroup");
      this.nextStepButton = document.getElementById("nextStep");
      this.backButton = document.getElementById("backButton");
      this.addModuleBtn = document.getElementById("addModuleBtn");
      this.showCurrentModuleBtn = document.getElementById("showCurrentModuleBtn");
      this.step1Div = document.getElementById("step1");
      this.step2Div = document.getElementById("step2");
      this.currentModules = document.getElementById("currentModules");
      this.moduleListDiv = document.getElementById("moduleList");
      this.submitGradesButton = document.getElementById("submitGrades");
      this.moduleListDisplay = document.getElementById("moduleListDisplay");
  }

  /**
   * Initializes the form by attaching event listeners to UI elements.
   */
  init() {
      this.nextStepButton.addEventListener("click", () => this.handleNextStep());
      this.backButton.addEventListener("click", () => this.handleBack());
      this.submitGradesButton.addEventListener("click", () => this.handleSubmitGrades());
      this.addModuleBtn.addEventListener("click", () => this.handleAddModules());
      this.showCurrentModuleBtn.addEventListener("click", () => this.handleShowCurrentModules());
  }

  /**
   * Retrieves an array of selected levels from the checkbox group.
   * @returns {string[]} An array of selected level values (e.g., ["4", "5"]).
   */
  getSelectedLevels() {
      return Array.from(this.levelsCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(cb => cb.value);
  }

  /**
   * Advances the UI to the next step after validating level selection.
   * Displays the module list for the selected levels.
   */
  handleNextStep() {
      const selectedLevels = this.getSelectedLevels();
      if (selectedLevels.length === 0) {
          this.messageService.showMessage("Please select at least one level.", "error");
          return;
      }
      this.messageService.clearMessage();
      this.step1Div.style.display = "none";
      this.showCurrentModuleBtn.style.display = "none";
      this.step2Div.style.display = "block";
      this.moduleManager.populateModules(selectedLevels, this.moduleListDiv);
  }

  /**
   * Handles the UI transition to go back to the previous step.
   * Resets the module list view and displays the level selection step.
   */
  handleBack() {
      this.step2Div.style.display = "none";
      this.step1Div.style.display = "block";
      this.showCurrentModuleBtn.style.display = "block";
      this.messageService.clearMessage();
  }

  /**
   * Submits the module grades after validating input values.
   * Sends the grades to the server and resets the form upon success.
   */
  handleSubmitGrades() {
      const modulesData = this.moduleManager.getModulesData(this.moduleListDiv).map(({ moduleCode, moduleName, level, grade }) => ({
          moduleCode,
          moduleName,
          level: parseInt(level, 10), // Ensure level is an integer
          grade
      }));

      // Validate grades to ensure they are within the acceptable range or marked as "RPL".
      const invalidGrades = modulesData.some(data => {
          if (data.grade === "RPL" || data.grade === null) return false;
          const gradeNum = parseFloat(data.grade);
          return isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100;
      });

      if (invalidGrades) {
          this.messageService.showMessage("Please enter valid grades for all modules that require one.", "error");
          return;
      }

      this.messageService.clearMessage();

      // Filter out invalid or incomplete module data and exclude existing modules from `submittedModules`.
      const filledModules = modulesData.filter(data => {
          const isValid = data.grade !== null && data.moduleCode && data.moduleName && !isNaN(data.level);
          const isExisting = submittedModules && Object.values(submittedModules).some(modulesArray =>
          modulesArray.some(module => module.code === data.moduleCode)
          );
          return isValid && !isExisting;
      });

      // Wrap the restructured data in an object with a `modules` key.
      const payload = { modules: filledModules }

      this.moduleFetech.postSubmittedModules(payload, "test");
      this.messageService.showMessage("Grades submitted successfully!", "success");

      // Clear the form and reset the UI.
      this.resetForm();
  }

  /**
   * Handles the UI transition to add new modules.
   * Displays the level selection step and hides other sections.
   */
  handleAddModules() {
      if (Object.keys(modulesByLevel).length === 0) {
        alert("Please wait until the modules are loaded.");
      }
      this.step1Div.style.display = "block";
      this.step2Div.style.display = "none";
      this.addModuleBtn.style.display = "none";
      this.showCurrentModuleBtn.style.display = "block";
      this.currentModules.style.display = "none";
  }

  /**
   * Displays the list of current modules stored in localStorage.
   * If no modules are found, displays an error message.
   */
  handleShowCurrentModules() {
      this.moduleListDisplay.innerHTML = "";

      // Ensure submittedModules is an object with arrays as values.
      if (submittedModules && Object.keys(submittedModules).length > 0) {
        // Iterate over each level's array of modules.
        Object.values(submittedModules).forEach(modulesArray => {
          modulesArray.forEach(module => {
            const listItem = document.createElement("li");
            listItem.className = "d-module-item";

            const nameSpan = document.createElement("span");
            nameSpan.textContent = module.name; // Use `name` instead of `moduleName`.
            nameSpan.className = "d-module-name";

            const gradeSpan = document.createElement("span");
            gradeSpan.textContent = `Grade: ${module.grade || "N/A"}`; // Handle missing grades.
            gradeSpan.className = "d-module-grade";

            listItem.appendChild(nameSpan);
            listItem.appendChild(gradeSpan);
            this.moduleListDisplay.appendChild(listItem);
          });
        });
    } else {
        this.messageService.showMessage("No modules submitted yet.", "error");
        this.currentModules.style.display = "none";
    }

      this.currentModules.style.display = "block";
      this.addModuleBtn.style.display = "block";
      this.step1Div.style.display = "none";
      this.step2Div.style.display = "none";
  }

  /**
   * Resets the UI form to its initial state.
   * Clears all selections and hides unnecessary sections.
   */
  resetForm() {
      this.step1Div.style.display = "none";
      this.step2Div.style.display = "none";
      Array.from(this.levelsCheckboxGroup.querySelectorAll('input[type="checkbox"]'))
           .forEach(cb => cb.checked = false);
      this.moduleListDiv.innerHTML = "";
      this.addModuleBtn.style.display = "block";
      this.showCurrentModuleBtn.style.display = "block";
  }
}