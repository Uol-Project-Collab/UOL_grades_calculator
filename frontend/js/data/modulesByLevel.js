/**
 * @file modulesByLevel.js
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
 * @exports modulesByLevel
 */

// Global reference to organized modules
const modulesByLevel = {};

/**
 * Fetches and organizes modules from API
 * @async
 * @function fetchModules
 * @description Retrieves module data from API and structures it by level
 * - Maintains old data structure using new data from API
 * - Preserves original property naming (code/name)
 * - Groups modules under string-based level keys
 * - Handles and logs errors without breaking execution
 */
const fetchModules = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/modules');
    const modules = response.data;

    // Process each module: group by level and transform properties
    modules.forEach(module => {
      const levelKey = module.level.toString(); // Ensure string key format
      if (!modulesByLevel[levelKey]) {
        modulesByLevel[levelKey] = []; // Initialize array for new levels
      }
      modulesByLevel[levelKey].push({
        code: module.moduleCode,  // Map moduleCode → code
        name: module.moduleName   // Map moduleName → name
      });
    });

    console.log('Module data successfully loaded');

  } catch (error) {
    console.error('Module data fetch failed:', error);
  }
};

// Initial data load
fetchModules();