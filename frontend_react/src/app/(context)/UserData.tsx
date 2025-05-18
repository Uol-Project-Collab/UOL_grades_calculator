"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { GetSubmittedModules } from "../(utils)/GetSubmittedModules";

interface UserDataContextType {
  userModules: { success: boolean; modules: any[] };
  loading: boolean;
  fetchModules: () => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with proper structure to avoid "modules is undefined" errors
  const [userModules, setUserModules] = useState<{ success: boolean; modules: any[] }>({
    success: false,
    modules: []
  });
  const [loading, setLoading] = useState(true);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const data = await GetSubmittedModules();
      if (data) {
        setUserModules(data);
      } else {
        // Handle case where data is undefined (e.g., API failure)
        setUserModules({ success: false, modules: [] });
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      setUserModules({ success: false, modules: [] });
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch modules when component mounts
  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <UserDataContext.Provider value={{ userModules, loading, fetchModules }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
