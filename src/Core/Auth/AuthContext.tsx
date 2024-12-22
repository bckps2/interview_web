import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (state: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    // Verificamos el valor de isAuthenticated solo al principio
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    // Aquí solo se establece el valor una vez al montar el componente
    const isAuthenticatedValue = localStorage.getItem("isAuthenticated") === 'true';
    setAuthenticated(isAuthenticatedValue);
  }, []); // Dependencia vacía para ejecutar solo una vez

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
