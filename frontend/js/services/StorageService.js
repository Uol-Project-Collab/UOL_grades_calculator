/**
 * * StorageService is a utility class for managing the storage of submitted modules in localStorage.
 * * It provides methods to get, set, and clear the submitted modules.
 * * This class abstracts the localStorage operations, making it easier to manage module data.
 * * It also ensures that the data is stored in a consistent format (JSON).
 */
class StorageService {
  /**
   * Retrieves the submitted modules array from localStorage.
   * @returns {Array} The array of submitted modules.
   */
  getSubmittedModules() {
      return JSON.parse(localStorage.getItem("submittedModules")) || [];
  }

  /**
   * Stores the modules array in localStorage.
   * @param {Array} modules - The modules array to store.
   */
  setSubmittedModules(modules) {
      localStorage.setItem("submittedModules", JSON.stringify(modules));
  }

  /**
   * Clears all submitted modules from localStorage.
   */
  clearSubmittedModules() {
      localStorage.removeItem("submittedModules");
  }
}