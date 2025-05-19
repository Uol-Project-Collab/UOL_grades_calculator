// Global variables for modulesByLevel and submittedModules
let modulesByLevel = {};
let submittedModules = {};
let averageGrade = null;

/**
 * @file App.js
 * @description Entry point for the application.
 * - Initializes the necessary services and managers for the application to function.
 * - This includes setting up the storage service, message service, module manager, and form manager.
 * - Handles the initialization of the ModuleFetcher to fetch module data from the API.
 * @requires ModuleFetcher
 * @requires ModuleManager
 * @requires FormManager
 * @requires MessageService
 */
function initializeApp() {
  axios.defaults.timeout = 10000; // 10 seconds timeout

  const messageDisplay = document.getElementById("messageDisplay");
  const messageService = new MessageService(messageDisplay);

  // Initialize and use the ModuleFetcher
  const moduleFetcher = new ModuleFetcher(messageService);

  if (!moduleFetcher) {
      messageService.showMessage("ModuleFetcher initialization failed.", "error");
      return;
  }

  // Fetch modules and log results
  moduleFetcher.fetchAllModules("test")
      .then(() => {
        modulesByLevel = moduleFetcher.modulesByLevel; // Assign to global variable
      })
      .catch(error => console.error("Error fetching all modules:", error));

  moduleFetcher.fetchSubmittedModules("test")
      .then(() => {
        submittedModules = moduleFetcher.submittedModules; // Assign to global variable
      })
      .catch(error => console.error("Error fetching submitted modules:", error));

  // Initialize other managers
  const moduleManager = new ModuleManager(messageService);
  const formManager = new FormManager(moduleManager, messageService, moduleFetcher);

  formManager.init();

  const averageGradeDisplay = new AverageGrade(messageService);
  
  // Delay the update to ensure submittedModules is populated.
  setTimeout(() => {
    averageGradeDisplay.updateAverageGrade("test");
  }, 1500);
}

/*
* Ensures that the DOM is fully loaded before executing the initialization function.
* This is crucial for ensuring that all elements are available for manipulation.
*/ 
document.addEventListener("DOMContentLoaded", initializeApp);