/**
 * * Handles the form interactions and UI updates for module selection and grade submission.
 * * It manages the display of modules based on selected levels, grade submission, and localStorage operations.
 * * It also provides methods to reset the form and display current modules.
 */
class FormManager {
  /**
   * Creates an instance of FormManager.
   * @param {ModuleManager} moduleManager - The ModuleManager instance.
   * @param {MessageService} messageService - The MessageService instance.
   */
  constructor(moduleManager, messageService, moduleFetech) {
      this.moduleManager = moduleManager;
      this.messageService = messageService;
      this.moduleFetech = moduleFetech;

      // Caching DOM elements.
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
      this.resetAllBtn = document.getElementById("resetAllBtn");
  }

  /**
   * Initializes the form by attaching necessary event listeners.
   */
  init() {
      this.nextStepButton.addEventListener("click", () => this.handleNextStep());
      this.backButton.addEventListener("click", () => this.handleBack());
      this.submitGradesButton.addEventListener("click", () => this.handleSubmitGrades());
      this.addModuleBtn.addEventListener("click", () => this.handleAddModules());
      this.showCurrentModuleBtn.addEventListener("click", () => this.handleShowCurrentModules());
      this.resetAllBtn.addEventListener("click", () => this.handleResetAll());
  }

  /**
   * Retrieves an array of selected levels from the checkbox group.
   * @returns {string[]} An array of selected level values.
   */
  getSelectedLevels() {
      return Array.from(this.levelsCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(cb => cb.value);
  }

  /**
   * Advances the UI to the next step after level selection.
   * Validates selection and populates modules.
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
   */
  handleBack() {
      this.step2Div.style.display = "none";
      this.step1Div.style.display = "block";
      this.showCurrentModuleBtn.style.display = "block";
      this.messageService.clearMessage();
  }

  /**
   * Submits the module grades after validating input values and updates storage.
   */
  handleSubmitGrades() {
      const modulesData = this.moduleManager.getModulesData(this.moduleListDiv).map(({ moduleCode, moduleName, level, grade }) => ({
          moduleCode,
          moduleName,
          level: parseInt(level, 10), // Ensure level is an integer
          grade
      }));

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

      const filledModules = [
          ...modulesData.filter(data => data.grade !== null && data.moduleCode && data.moduleName && !isNaN(data.level))
      ];

      // Restructure the modules into a flat array
      const restructuredData = filledModules.map(({ grade, level, moduleCode, moduleName }) => ({
        moduleCode,
        moduleName,
        level: parseInt(level, 10), // Ensure level is an integer
        grade
      }));

      // Wrap the restructured data in an object with a `modules` key
      const payload = { modules: restructuredData };

      this.moduleFetech.postSubmittedModules(payload);
      this.messageService.showMessage("Grades submitted successfully!", "success");

      // Clear the form and reset the UI
      this.resetForm();
  }

  /**
   * Handles the UI transition to add new modules.
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
   */
  handleShowCurrentModules() {
      this.moduleListDisplay.innerHTML = "";

      // Ensure submittedModules is an object with arrays as values
      if (submittedModules && Object.keys(submittedModules).length > 0) {
        // Iterate over each level's array of modules
        Object.values(submittedModules).forEach(modulesArray => {
          modulesArray.forEach(module => {
            const listItem = document.createElement("li");
            listItem.className = "d-module-item";

            const nameSpan = document.createElement("span");
            nameSpan.textContent = module.name; // Use `name` instead of `moduleName`
            nameSpan.className = "d-module-name";

            const gradeSpan = document.createElement("span");
            gradeSpan.textContent = `Grade: ${module.grade || "N/A"}`; // Handle missing grades
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
   * Clears all stored module data after user confirmation and reloads the page.
   * Not currently implemented.
   */
  handleResetAll() {
      if (confirm("Are you sure you want to clear all saved module data?")) {
          // this.storageService.clearSubmittedModules();
          this.messageService.showMessage("All data has been cleared", "success");
          location.reload();
      }
  }

  /**
   * Resets the UI form to its initial state.
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