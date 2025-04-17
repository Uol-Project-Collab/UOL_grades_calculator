/**
 * @file ModuleFetcher.js
 * @description Manages Computer Science module data organized by academic level (4, 5, 6).
 * 
 * Features:
 * - Fetching module data from an API.
 * - Organizing modules by academic level with consistent property naming.
 * - Handling submitted modules and posting updates to the server.
 * - Error handling and user feedback through MessageService.
 * 
 * @requires axios
 */

/**
 * @class ModuleFetcher
 * @description Handles fetching, processing, and submitting module data from/to an API.
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
   * Fetches and processes module data from the API.
   * @async
   * @param {string} apiUrl - The API endpoint URL.
   * @param {string} successMessage - Message to display on successful fetch.
   * @param {string} errorMessage - Message to display on fetch error.
   * @param {string} method - HTTP method to use (GET or POST).
   * @param {object} [data] - Data to send with the request (for POST).
   * @returns {Promise<object>} - A promise resolving to the restructured module data.
   */
  async fetchModules(apiUrl, successMessage, errorMessage, method, data = null) {
    try {
      const response = method === "POST"
        ? await axios.post(apiUrl, data)
        : await axios.get(apiUrl);

      if (method === "POST") return; // No processing needed for POST requests

      const modules = response.data;

      // Restructure data by academic level
      const restructuredData = modules.reduce((acc, module) => {
        const levelKey = module.level.toString();
        if (!acc[levelKey]) acc[levelKey] = [];
        acc[levelKey].push({
          code: module.moduleCode,
          name: module.moduleName,
          grade: module.grade || null,
          level: module.level
        });
        return acc;
      }, {});

      console.log(successMessage);
      return restructuredData;
    } catch (error) {
      console.error(errorMessage, error);
      console.error("Server Response:", error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Fetches all available modules from the API and organizes them by level.
   * @async
   */
  async fetchAllModules() {
    try {
      this.messageService.showMessage("Loading modules...", "info");
      this.modulesByLevel = await this.fetchModules(
        "http://localhost:3000/api/modules",
        "All Modules loaded successfully!",
        "Error loading modules!",
        "GET"
      );
      this.messageService.clearMessage();
    } catch (error) {
      console.error("Error fetching all modules:", error);
      this.messageService.showMessage("Failed to load modules.", "error");
    }
  }

  /**
   * Fetches submitted modules for a specific student from the API.
   * @async
   * @param {string} studentId - The ID of the student whose modules are to be fetched.
   */
  async fetchSubmittedModules(studentId) {
    try {
      this.messageService.showMessage("Loading submitted modules...", "info");
      this.submittedModules = await this.fetchModules(
        `http://localhost:3000/api/students/${studentId}/modules/`,
        "Submitted modules loaded successfully!",
        "Error loading submitted modules!",
        "GET"
      );
      this.messageService.clearMessage();
    } catch (error) {
      console.error("Error fetching submitted modules:", error);
      this.messageService.showMessage("Failed to load submitted modules.", "error");
    }
  }

  /**
   * Submits updated module data to the API.
   * @async
   * @param {object} dataObject - The data to be submitted.
   * @param {string} studentId - The ID of the student whose modules are to be fetched.
   */
  async postSubmittedModules(dataObject, studentId) {
    try {
      this.messageService.showMessage("Submitting modules...", "info");
      await this.fetchModules(
        `http://localhost:3000/api/students/${studentId}/modules/`,
        "Modules submitted successfully!",
        "Error submitting modules!",
        "POST",
        dataObject
      );
      this.messageService.clearMessage();
    } catch (error) {
      console.error("Error submitting modules:", error);
      this.messageService.showMessage("Failed to submit modules.", "error");
    }
  }
}

// Expose to global scope
window.ModuleFetcher = ModuleFetcher;