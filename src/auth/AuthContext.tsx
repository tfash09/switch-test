// src/auth/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "./authService";

type AuthContextType = {
  user: any;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(authService.getUser());

  const login = async () => {
    const loggedInUser = await authService.loginWithOAuth();
    setUser(loggedInUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
