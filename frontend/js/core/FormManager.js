/**
 * * Handles the form interactions and UI updates for module selection and grade submission.
 * * It manages the display of modules based on selected levels, grade submission, and localStorage operations.
 * * It also provides methods to reset the form and display current modules.
 */
class FormManager {
  /**
   * Creates an instance of FormManager.
   * @param {ModuleManager} moduleManager - The ModuleManager instance.
   * @param {StorageService} storageService - The StorageService instance.
   * @param {MessageService} messageService - The MessageService instance.
   */
  constructor(moduleManager, storageService, messageService) {
      this.moduleManager = moduleManager;
      this.storageService = storageService;
      this.messageService = messageService;

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
      const modulesData = this.moduleManager.getModulesData(this.moduleListDiv);

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
      const existingModules = this.storageService.getSubmittedModules();

      // Filter out modules that are being updated.
      const uniqueExistingModules = existingModules.filter(existingModule =>
          !modulesData.some(newModule => newModule.moduleName === existingModule.moduleName)
      );

      const filledModules = [
          ...uniqueExistingModules,
          ...modulesData.filter(data => data.grade !== null)
      ];

      this.storageService.setSubmittedModules(filledModules);
      this.messageService.showMessage("Grades submitted successfully!", "success");
      this.resetForm();
  }

  /**
   * Handles the UI transition to add new modules.
   */
  handleAddModules() {
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
      const submittedModules = this.storageService.getSubmittedModules();
      this.moduleListDisplay.innerHTML = "";

      if (submittedModules.length === 0) {
          this.messageService.showMessage("No modules submitted yet.", "error");
          this.currentModules.style.display = "none";
          return;
      }

      this.messageService.clearMessage();

      submittedModules.forEach(module => {
          const listItem = document.createElement("li");
          listItem.className = "d-module-item";

          const nameSpan = document.createElement("span");
          nameSpan.textContent = module.moduleName;
          nameSpan.className = "d-module-name";

          const gradeSpan = document.createElement("span");
          gradeSpan.textContent = `Grade: ${module.grade}`;
          gradeSpan.className = "d-module-grade";

          listItem.appendChild(nameSpan);
          listItem.appendChild(gradeSpan);
          this.moduleListDisplay.appendChild(listItem);
      });

      this.currentModules.style.display = "block";
      this.addModuleBtn.style.display = "block";
      this.step1Div.style.display = "none";
      this.step2Div.style.display = "none";
  }

  /**
   * Clears all stored module data after user confirmation and reloads the page.
   */
  handleResetAll() {
      if (confirm("Are you sure you want to clear all saved module data?")) {
          this.storageService.clearSubmittedModules();
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