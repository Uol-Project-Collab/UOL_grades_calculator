import axios from "axios";
import { FetchCsrfToken } from "../../../(utils)/FetchCsrfToken";

export const GetSubmittedModules = async () => {
  try {
    const crfToken = await FetchCsrfToken();
    const response = await axios.get(
      "http://localhost:3000/api/modules/mine",
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": crfToken,
        },
        withCredentials: true,
      },
    );

    return response.data;
  }
  catch (error: any) {
    console.error("Error fetching modules:", error);
  }
}
