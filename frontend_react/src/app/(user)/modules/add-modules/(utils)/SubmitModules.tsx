import axios from "axios";
import { FetchCsrfToken } from "../../../../(utils)/FetchCsrfToken";

export const SubmitModules = async (modulesData) => {
  try {
    const csrfToken = await FetchCsrfToken();
    
    await axios.post(
      "http://localhost:3000/api/modules",
      modulesData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      }
    );
  }
  catch (error) {
    console.error("Error submitting modules:", error);
    throw error;
  }
}
