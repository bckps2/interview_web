import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (typeof window !== 'undefined' && !isAuthenticated) {
    router.push('/'); // Redirige al usuario a la página principal
    return null; // Evita que se rendericen componentes protegidos antes de la redirección
  }

  return <>{children}</>;
};

export default ProtectedRoute;
