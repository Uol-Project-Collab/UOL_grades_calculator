import axios from "axios";

type HttpMethod = "GET" | "POST";

/**
 * Make an API request.
 */
const makeApiRequest = async (
  apiUrl: string,
  method: HttpMethod,
  data: any = null,
  token: string | null = null,
): Promise<any> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response =
      method === "POST"
        ? await axios.post(apiUrl, data, { headers })
        : await axios.get(apiUrl, { headers });

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
  token: string | null = null,
): Promise<any> => {
  const responseData = await makeApiRequest(apiUrl, method, data, token);
  return method === "GET" && shouldRestructure
    ? restructureModulesByLevel(responseData)
    : responseData;
};

/**
 * Fetch all modules.
 */
export const fetchAllModules = async (token: string | null = null) => {
  try {
    const data = await fetchModules(
      "http://localhost:3000/api/modules",
      "GET",
      null,
      true,
      token,
    );
    return data;
  } catch (error) {
    console.error("Error fetching all modules:", error);
  }
};

/**
 * Fetch submitted modules.
 */
export const fetchSubmittedModules = async (
  setSubmittedModules: (data: any) => void,
  token: string | null = null,
) => {
  try {
    const data = await fetchModules(
      `http://localhost:3000/api/modules/mine`,
      "GET",
      null,
      true,
      token,
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
  token: string | null = null,
) => {
  try {
    await fetchModules(
      `http://localhost:3000/api/modules/`,
      "POST",
      dataObject,
      false,
      token,
    );
  } catch (error) {
    console.error("Error submitting modules:", error);
  }
};
