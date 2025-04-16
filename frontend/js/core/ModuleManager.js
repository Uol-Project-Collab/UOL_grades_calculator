/**
 * * ModuleManager class handles the creation and management of module items.
 * * It provides methods to create module items, populate them based on selected levels,
 * * and extract module data from the DOM.
 * * It also validates user input and interacts with localStorage for data persistence.
 */
class ModuleManager {
  /**
   * Creates an instance of ModuleManager.
   * @param {MessageService} messageService - Service to show and clear messages.
   */
  constructor(messageService) {
      this.messageService = messageService;
  }

  /**
   * Creates a DOM element representing a module item.
   * @param {Object} moduleData - The module's data (code and name).
   * @param {string} level - The level associated with the module.
   * @returns {HTMLElement} The module item element.
   */
  createModuleItem(moduleData, level) {
      const moduleItemDiv = document.createElement("div");
      moduleItemDiv.className = "module-item";
      moduleItemDiv.dataset.level = level;
      moduleItemDiv.dataset.code = moduleData.code;
      moduleItemDiv.dataset.name = moduleData.name;

      // Label creation for module.
      const label = document.createElement("label");
      label.textContent = `[${moduleData.code}] ${moduleData.name}`;

      // Create grade input element.
      const gradeInput = document.createElement("input");
      gradeInput.type = "text";
      gradeInput.placeholder = "Grade";
      gradeInput.pattern = "[0-9]*";

      // Create RPL checkbox.
      const rplCheckbox = document.createElement("input");
      rplCheckbox.type = "checkbox";

      // Retrieve module data from global `submittedModules` and pre-populate if available.
      let existingModule = null;
      if (Array.isArray(submittedModules)) {
          existingModule = submittedModules.find((module) => module.moduleCode === moduleData.code);
      }

      if (existingModule) {
          if (existingModule.grade === "RPL") {
              rplCheckbox.checked = true;
              gradeInput.disabled = true;
          } else {
              gradeInput.value = existingModule.grade || "";
          }
      }

      // Validate numeric input and provide feedback through messageService.
      gradeInput.addEventListener("input", (e) => {
          const value = e.target.value.trim();
          if (value && !/^\d+$/.test(value)) {
              e.target.value = value.replace(/[^\d]/g, "");
              this.messageService.showMessage("Please enter a valid number.", "error");
          } else {
              this.messageService.clearMessage();
          }
      });

      // Disable grade input when RPL checkbox is toggled.
      rplCheckbox.addEventListener("change", () => {
          gradeInput.disabled = rplCheckbox.checked;
          if (rplCheckbox.checked) {
              gradeInput.value = "";
          }
      });

      moduleItemDiv.appendChild(label);
      moduleItemDiv.appendChild(gradeInput);
      moduleItemDiv.appendChild(rplCheckbox);

      return moduleItemDiv;
  }

  /**
   * Populates the provided container with module items for the selected levels.
   * @param {string[]} levels - The array of selected levels.
   * @param {HTMLElement} containerElement - The DOM element to populate.
   */
  populateModules(levels, containerElement) {
      containerElement.innerHTML = "";
      levels.forEach(level => {
          const modules = modulesByLevel[level] || [];
          if (modules.length) {
              const levelHeader = document.createElement("h4");
              levelHeader.textContent = `Level ${level}`;
              containerElement.appendChild(levelHeader);
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
   * @returns {Array} Array of module data objects.
   */
  getModulesData(containerElement) {
      const items = containerElement.querySelectorAll(".module-item");
      const modulesData = Array.from(items).map(item => {
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
              moduleCode,
              moduleName,
              level: parseInt(level, 10),
              grade
          };
      });

      return modulesData;
  }
}