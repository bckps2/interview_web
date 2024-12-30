"use client"

import React from 'react';
import { useAuth } from './AuthContext';
import { redirect } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect('/login'); // Redirige al usuario a la página principal
  }

  return <>{children}</>;
};

export default ProtectedRoute;
