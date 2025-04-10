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
  async getSubmittedModules() {

    try {
      const response = await fetch('api/submitted-modules');
      return await response.json();
      //return JSON.parse(localStorage.getItem("submittedModules")) || [];
    }
    catch (error) {
      console.error('Error fetching submited modules:', error);
      return[];
    }
  }

  /**
   * Stores the modules array in localStorage.
   * @param {Array} modules - The modules array to store.
   */
  async setSubmittedModules(modules) {
    try {
      const response = await fetch('api/submitted-modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify(modules),
      });
      //localStorage.setItem("submittedModules", JSON.stringify(modules));
      if(!response.ok) throw new Error('Failed to save modules');
    } catch(error) {
      console.error('Error saving submitted module:', error);
    }
  }

  /**
   * Clears all submitted modules from localStorage.
   */
  async clearSubmittedModules() {
    try {
      const response = await fetch('/api/submitted-modules', {
        method: 'DELETE',
      });
      if(!response.ok) throw new Error('Failed to clear modules');
      //localStorage.removeItem("submittedModules");
    } catch (error) {
      console.error('Error clearing submited modules:', error);
    }
  }
}
