'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  email?: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const login = (user: string, email?:string) => {
    setIsAuthenticated(true);
    setUsername(user);
    setEmail(email);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, email, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 