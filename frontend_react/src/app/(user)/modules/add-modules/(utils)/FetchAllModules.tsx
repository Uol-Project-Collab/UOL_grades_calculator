import axios from "axios";
import { FetchCsrfToken } from "../../../../(utils)/FetchCsrfToken";

export const FetchAllModules = async () => {
  try {
    const crfToken = await FetchCsrfToken();
    const response = await axios.get("http://localhost:3000/api/modules", {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": crfToken,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching modules:", error);
  }
};
