import axios from "axios";

export const FetchCsrfToken = async () => {
  const response = await axios.get("http://localhost:3000/api/csrf-token", {
    withCredentials: true,
  });
  return response.data.csrfToken;
};
