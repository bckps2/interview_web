"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (state: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthenticatedValue = localStorage.getItem('isAuthenticated') === 'true';
      setAuthenticated(isAuthenticatedValue);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);
