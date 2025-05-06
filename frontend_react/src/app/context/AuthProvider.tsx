'use client';

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type AuthContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ email, setEmail, remember, setRemember }}>
      {children}
    </AuthContext.Provider>
  );
};
