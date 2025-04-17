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
  constructor(moduleManager, messageService, moduleFetech, emailService) {
      this.moduleManager = moduleManager;
      this.messageService = messageService;
      this.moduleFetech = moduleFetech;
      this.emailService = emailService;

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
      this.savePdfBtn = document.getElementById("savePdfBtn");
      this.sendEmailBtn = document.getElementById("sendEmailBtn");
      // this.saveCsvBtn = document.getElementById("saveCsvBtn");
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
      this.savePdfBtn.addEventListener("click", () => this.handleSaveModulesAsPDF(submittedModules, averageGrade));
      this.sendEmailBtn.addEventListener("click", () => this.handleSendModulesAsEmail(submittedModules, averageGrade));
      // this.saveCsvBtn.addEventListener("click", () => this.handleSaveModulesAsCSV(submittedModules, averageGrade));
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
      const payload = { modules: filledModules };

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
   * Generates a jsPDF document based on modules and averageGrade.
   * This method reuses your existing PDF-generation code.
   * @param {Array|Object} modules - Module objects.
   * @param {string} averageGrade - The average grade.
   * @returns {jsPDF} The generated jsPDF document.
   */
  generatePdfDocument(modules, averageGrade) {
    // Flatten modules object
    if (!Array.isArray(modules)) {
      modules = Object.values(modules).flat();
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add a background color
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(240, 240, 240); // Light gray
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Add a header with custom font and color
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204); // Blue
    doc.text("Modules Data Report", pageWidth / 2, 20, { align: "center" });

    // Draw a horizontal line under the header
    doc.setDrawColor(0, 102, 204); // Blue
    doc.setLineWidth(1);
    doc.line(20, 25, pageWidth - 20, 25);

    // Use AutoTable to print a table with headings
    doc.autoTable({
      head: [['Code', 'Name', 'Level', 'Grade']],
      body: modules.map(mod => [mod.code, mod.name, mod.level, mod.grade]),
      startY: 35,
      styles: { font: "helvetica", fontSize: 12 }
    });

    // Use AutoTable's final Y to position the average grade, if available
    const lastY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY : 55;

    // Display the average grade at the bottom right corner with decoration
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0); // Dark Green
    doc.text(`Average Grade: ${averageGrade}`, pageWidth - 20, lastY + 10, { align: "right" });

    return doc;
  }

  /**
   * Saves the PDF to the user's computer.
   * Uses the generatePdfDocument() helper for reusability.
   * @param {Array|Object} modules - Module objects.
   * @param {string} averageGrade - The average grade.
   */
  handleSaveModulesAsPDF(modules, averageGrade) {
    const doc = this.generatePdfDocument(modules, averageGrade);
    doc.save("modules.pdf");
  }

  /**
   * Sends the generated PDF as an email attachment.
   * Reuses the PDF generated by generatePdfDocument().
   * @param {Array|Object} modules - Module objects.
   * @param {string} averageGrade - The average grade.
   */
  handleSendModulesAsEmail(modules, averageGrade) {
    const doc = this.generatePdfDocument(modules, averageGrade);
    // Get the PDF as a Data URI string
    const pdfDataUri = doc.output("datauristring");

    // Prompt the user to enter the recipient's email address
    const recipientEmail = prompt("Please your email address:");

    // Current user name (default to "there" if none provided)
    const recipientName = "test";         // ---> Will be changed after authentication setup
    
    // Validate the email address format
    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      this.messageService.showMessage("Invalid email address. Please try again.", "error");
      return;
    }

    this.emailService.sendPdfEmailDataUri(pdfDataUri, recipientEmail, recipientName)
      .then(message => {
        this.messageService.showMessage("Email sent successfully!", "success");
      })
      .catch(error => {
        this.messageService.showMessage("Error sending email: " + error, "error");
        console.error(error);
      });
  }

  /**
   * Saves provided modules data as a CSV file.
   * @param {Array} modules - Array of module objects with moduleCode, moduleName, level, and grade.
   * @param {string} averageGrade - The average grade to be included in the CSV.
   
  handleSaveModulesAsCSV(modules, averageGrade) {
    // Flatten modules object
    if (!Array.isArray(modules)) {
      modules = Object.values(modules).flat();
    }

    const headers = ["Module Code", "Module Name", "Level", "Grade"];
    const csvRows = [];
    csvRows.push(headers.join(","));
    modules.forEach(mod => {
        csvRows.push([mod.code, mod.name, mod.level, mod.grade].join(","));
    });

    csvRows.push(`Average Grade: ${averageGrade}`);

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modules.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
    */

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

// Expose to global scope
window.FormManager = FormManager;