import axios from "axios";

export const fetchCsrfToken = async () => {
  const response = await axios.get("http://localhost:3000/api/csrf-token", {
    withCredentials: true,
  });
  return response.data.csrfToken;
};

const API_BASE_URL = "http://localhost:3000/api/auth";

export const login = async (email: string, password: string) => {
  try {
    const csrfToken = await fetchCsrfToken();
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // 💡 Send CSRF Token in header
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    return response.data; // Return the response data
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const csrfToken = await fetchCsrfToken(); // Fetch CSRF token
    const response = await axios.post(
      `${API_BASE_URL}/signup`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Include CSRF token in the header
        },
        withCredentials: true, // Include cookies in the request
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Signup failed");
    }
    throw new Error("An unexpected error occurred.");
  }
};


// not working yet, need to check the backend
export const logout = async () => {
  try {
    const csrfToken = await fetchCsrfToken(); // Fetch CSRF token
    const response = await axios.post(
      `${API_BASE_URL}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Include CSRF token in the header
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Logout failed");
    }
    throw new Error("An unexpected error occurred.");
  }
};