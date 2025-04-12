/**
 * App entry point for the application.
 * Initializes the necessary services and managers for the application to function.
 * This includes setting up the storage service, message service, module manager, and form manager.
 * The DOMContentLoaded event ensures that the script runs after the document is fully loaded.
 * This is crucial for ensuring that all elements are available for manipulation.
 */

import axios from 'axios';

// Function to fetch modules and organize them by level
const fetchModules = async () => {
  try {
    // Make GET request to backend endpoint
    const response = await axios.get('http://localhost:3000/api/modules');
    const modules = response.data;

    // Organize modules into modulesByLevel variable
    const modulesByLevel = {};
    Object.keys(modules).forEach(level => {
      modulesByLevel[level] = modules[level];
    });

    console.log('Modules organized by level:', modulesByLevel);
  } catch (error) {
    console.error('Error fetching modules:', error);
  }
};

// Call the function to test connection and fetch data
fetchModules();

document.addEventListener("DOMContentLoaded", () => {
    const storageService = new StorageService();
    const messageDisplay = document.getElementById("messageDisplay");
    const messageService = new MessageService(messageDisplay);
    const moduleManager = new ModuleManager(storageService, messageService);
    const formManager = new FormManager(moduleManager, storageService, messageService);
  
    formManager.init();
});

