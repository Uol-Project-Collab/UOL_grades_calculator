import axios from "axios";

type HttpMethod = "GET" | "POST";

/**
 * Make an API request.
 */
const makeApiRequest = async (
  apiUrl: string,
  method: HttpMethod,
  data: any = null,
): Promise<any> => {
  try {
    const response =
      method === "POST"
        ? await axios.post(apiUrl, data)
        : await axios.get(apiUrl);

    return response.data;
  } catch (error: any) {
    console.error("Server Response:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Restructure modules by academic level.
 */
const restructureModulesByLevel = (modules: any[]): any => {
  return modules.reduce((acc: any, module: any) => {
    const levelKey = module.level.toString();
    if (!acc[levelKey]) acc[levelKey] = [];
    acc[levelKey].push({
      code: module.moduleCode,
      name: module.moduleName,
      grade: module.grade || null,
      level: module.level,
    });
    return acc;
  }, {});
};

/**
 * Fetch modules from the API and optionally restructure them.
 */
const fetchModules = async (
  apiUrl: string,
  method: HttpMethod,
  data: any = null,
  shouldRestructure: boolean = true,
): Promise<any> => {
  const responseData = await makeApiRequest(apiUrl, method, data);
  return method === "GET" && shouldRestructure
    ? restructureModulesByLevel(responseData)
    : responseData;
};

/**
 * Fetch all modules.
 */
export const fetchAllModules = async (
  setModulesByLevel: (data: any) => void,
) => {
  try {
    const data = await fetchModules("http://localhost:3000/api/modules", "GET");
    setModulesByLevel(data);
  } catch (error) {
    console.error("Error fetching all modules:", error);
  }
};

/**
 * Fetch submitted modules.
 */
export const fetchSubmittedModules = async (
  setSubmittedModules: (data: any) => void,
  studentId: string,
) => {
  try {
    const data = await fetchModules(
      `http://localhost:3000/api/students/${studentId}/modules/`,
      "GET",
    );
    setSubmittedModules(data);
  } catch (error) {
    console.error("Error fetching submitted modules:", error);
  }
};

/**
 * Post submitted modules.
 */
export const postSubmittedModules = async (
  dataObject: any,
  studentId: string,
) => {
  try {
    await fetchModules(
      `http://localhost:3000/api/students/${studentId}/modules/`,
      "POST",
      dataObject,
      false,
    );
  } catch (error) {
    console.error("Error submitting modules:", error);
  }
};
