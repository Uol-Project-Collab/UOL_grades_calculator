import axios from "axios";
import { FetchCsrfToken } from "../../../../(utils)/FetchCsrfToken";

export const SubmitModules = async (modulesData) => {
  try {
    const csrfToken = await FetchCsrfToken();
    
    // Transform modulesData to match Firestore rules
    const transformedModules = modulesData.map(module => ({
      moduleCode: module.moduleCode,
      moduleInfo: {
        name: module.moduleName,
        level: module.level,
      },
      grade: module.grade,
    }));

    console.log("Transformed Modules:", transformedModules);

    await axios.post(
      "http://localhost:3000/api/modules",
      { modules: transformedModules }, // Wrap in object with modules property
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error submitting modules:", error);
    throw error;
  }
};
