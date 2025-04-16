/**
 * @class ModuleManager
 * @description Handles the creation, management, and extraction of module items.
 * It provides methods to create module items, populate them based on selected levels,
 * and extract module data from the DOM. It also validates user input and interacts
 * with global data for pre-population.
 */
class ModuleManager {
  /**
   * @constructor
   * @param {MessageService} messageService - Service to display messages to the user.
   */
  constructor(messageService) {
    this.messageService = messageService;
  }

  /**
   * Creates a DOM element representing a module item.
   * @param {Object} moduleData - The module's data containing its code and name.
   * @param {string} level - The academic level associated with the module.
   * @returns {HTMLElement} The DOM element representing the module item.
   */
  createModuleItem(moduleData, level) {
    const moduleItemDiv = document.createElement("div");
    moduleItemDiv.className = "module-item";
    moduleItemDiv.dataset.level = level;
    moduleItemDiv.dataset.code = moduleData.code;
    moduleItemDiv.dataset.name = moduleData.name;

    // Create a label for the module item.
    const label = document.createElement("label");
    label.textContent = `[${moduleData.code}] ${moduleData.name}`;

    // Create an input field for entering grades.
    const gradeInput = document.createElement("input");
    gradeInput.type = "text";
    gradeInput.placeholder = "Grade";
    gradeInput.pattern = "[0-9]*"; // Restrict input to numeric values.

    // Create a checkbox for marking the module as "RPL" (Recognition of Prior Learning).
    const rplCheckbox = document.createElement("input");
    rplCheckbox.type = "checkbox";

    // Pre-populate the module item if it exists in the global `submittedModules`.
    let existingModule = null;
    if (Array.isArray(submittedModules)) {
      existingModule = submittedModules.find((module) => module.moduleCode === moduleData.code);
    }

    if (existingModule) {
      if (existingModule.grade === "RPL") {
        rplCheckbox.checked = true;
        gradeInput.disabled = true; // Disable grade input if "RPL" is checked.
      } else {
        gradeInput.value = existingModule.grade || ""; // Pre-fill the grade if available.
      }
    }

    // Add validation for numeric input and provide feedback through the message service.
    gradeInput.addEventListener("input", (e) => {
      const value = e.target.value.trim();
      if (value && !/^\d+$/.test(value)) {
        // Remove non-numeric characters and show an error message.
        e.target.value = value.replace(/[^\d]/g, "");
        this.messageService.showMessage("Please enter a valid number.", "error");
      } else {
        this.messageService.clearMessage();
      }
    });

    // Toggle the grade input field when the "RPL" checkbox is checked or unchecked.
    rplCheckbox.addEventListener("change", () => {
      gradeInput.disabled = rplCheckbox.checked;
      if (rplCheckbox.checked) {
        gradeInput.value = ""; // Clear the grade input if "RPL" is checked.
      }
    });

    // Append the label, grade input, and RPL checkbox to the module item container.
    moduleItemDiv.appendChild(label);
    moduleItemDiv.appendChild(gradeInput);
    moduleItemDiv.appendChild(rplCheckbox);

    return moduleItemDiv;
  }

  /**
   * Populates the provided container with module items for the selected levels.
   * @param {string[]} levels - The array of selected academic levels (e.g., ["4", "5"]).
   * @param {HTMLElement} containerElement - The DOM element to populate with module items.
   */
  populateModules(levels, containerElement) {
    containerElement.innerHTML = ""; // Clear the container before populating.
    levels.forEach(level => {
      const modules = modulesByLevel[level] || []; // Retrieve modules for the given level.
      if (modules.length) {
        // Add a header for the level.
        const levelHeader = document.createElement("h4");
        levelHeader.textContent = `Level ${level}`;
        containerElement.appendChild(levelHeader);

        // Create and append module items for the level.
        modules.forEach(moduleData => {
          const moduleItem = this.createModuleItem(moduleData, level);
          containerElement.appendChild(moduleItem);
        });
      }
    });
  }

  /**
   * Extracts module data from the DOM container.
   * @param {HTMLElement} containerElement - The DOM element containing module items.
   * @returns {Array} An array of module data objects, each containing moduleCode, moduleName, level, and grade.
   */
  getModulesData(containerElement) {
    const items = containerElement.querySelectorAll(".module-item"); // Select all module items.
    const modulesData = Array.from(items).map(item => {
      const moduleName = item.dataset.name;                             // Retrieve the module name from the dataset.
      const moduleCode = item.dataset.code;                             // Retrieve the module code from the dataset.
      const level = item.dataset.level;                                 // Retrieve the academic level from the dataset.
      const gradeInput = item.querySelector('input[type="text"]');      // Get the grade input field.
      const rplCheckbox = item.querySelector('input[type="checkbox"]'); // Get the RPL checkbox.

      // Determine the grade based on the RPL checkbox and grade input.
      let grade = "";
      if (rplCheckbox.checked) {
        grade = "RPL";
      } else if (!gradeInput.value) {
        grade = null;
      } else {
        grade = gradeInput.value;
      }

      return {
        moduleCode,
        moduleName,
        level: parseInt(level, 10), // Convert level to an integer.
        grade
      };
    });

    return modulesData;
  }
}