/**
 * @file fetchModules.js
 * @description Manages Computer Science module data organized by academic level (4, 5, 6)
 * 
 * Provides:
 * - API fetching of module data
 * - Organization by level with string keys ("4", "5", "6")
 * - Consistent property naming (code/name)
 * - Error handling and logging
 * 
 * Expected API Data Format:
 * [
 *   {
 *     level: number,              // Academic level (4, 5, or 6)
 *     moduleCode: string,         // Official module code (e.g. "CM1005")
 *     moduleName: string          // Full module title
 *   },
 *   ...
 * ]
 * 
 * Output Structure:
 * {
 *   "4": [{code: string, name: string}, ...],  // Level 4 modules
 *   "5": [{code: string, name: string}, ...],  // Level 5 modules  
 *   "6": [{code: string, name: string}, ...]   // Level 6 modules
 * }
 * 
 * @requires axios
 * @exports ModuleFetcher
 */

/**
 * @class ModuleFetcher
 * @description Handles fetching and processing of module data from an API.
 */
class ModuleFetcher {
  /**
   * @constructor
   * @param {object} messageService - Service for displaying messages to the user.
   */
  constructor(messageService) {
    this.messageService = messageService;

    this.submittedModules = {};
    this.modulesByLevel = {};

  }

  /**
   * Fetches and organizes modules from the API.
   * @async
   * @function fetchModules
   * @param {string} apiUrl - The base URL of the API to fetch module data.
   * @param {string} successMessage - Message to display on successful fetch.
   * @param {string} errorMessage - Message to display on fetch error.
   * @param {string} method - HTTP method to use for the request (GET or POST).
   * @param {object} data - Data to send with the request (for POST).
   * @throws Will throw an error if the request fails.
   * @returns {Promise<object>} - A promise resolving to the restructured module data.
   */
  async fetchModules(apiUrl, successMessage, errorMessage, method, data) {
    try {
      const response = 
        method === "POST"
          ? await axios.post(apiUrl, data)
          : method === "GET"
            ? await axios.get(apiUrl)
            : this.messageService.showMessage("Invalid method", "error");

      if (method === "POST") return; // No need to process data for POST requests

      const modules = response.data;
      console.log(modules);  // Log the raw data for debugging

      // Restructure data by academic level
      const restructuredData = {};
      modules.forEach(module => {
        const levelKey = module.level
        if (!restructuredData[levelKey]) {
          restructuredData[levelKey] = []; // Initialize array for new levels
        }
        restructuredData[levelKey].push({
          code: module.moduleCode,  // Map moduleCode → code
          name: module.moduleName,   // Map moduleName → name
          grade: module.grade, // module.grade → grade
          level: module.level // Add level for reference
        });
      });

      console.log(successMessage);
      return restructuredData;
    } catch (error) {
      console.error(errorMessage, error);
      console.error("Server response:", error.response?.data || error.message);
      throw error;
    }
  }

  async fetchAllModules() {
    try {
      this.messageService.showMessage("Loading modules...", "info");
      this.modulesByLevel = await this.fetchModules(
        'http://localhost:3000/api/modules',
        "Modules loaded successfully!",
        "Error loading modules!",
        "GET",
        null
      );
      this.messageService.clearMessage();
    } catch (error) {
      console.error("Error during module processing:", error);
      this.messageService.showMessage("Failed to load modules.", "error");
    }
  }

  async fetchSubmittedModules() {
    try {
      this.messageService.showMessage("Loading submitted modules...", "info");
      this.submittedModules = await this.fetchModules(
        'http://localhost:3000/api/students/test/modules/',
        "Submitted modules loaded successfully!",
        "Error loading submitted modules!",
        "GET",
        null
      );
      this.messageService.clearMessage();
    } catch (error) {
      console.error("Error during module processing:", error);
      this.messageService.showMessage("Failed to load submitted modules.", "error");
    }
  }

  async postSubmittedModules(dataObject) {
    try {
      this.messageService.showMessage("Submitting modules...", "info");
      await this.fetchModules(
        'http://localhost:3000/api/students/test/modules/',
        "Modules submitted successfully!",
        "Error submitting modules!",
        "POST",
        dataObject
      );
      this.messageService.clearMessage();
    } catch (error) {
      console.error("Error during module upload:", error);
      this.messageService.showMessage("Failed to upload modules.", "error");
    }
  }
}
