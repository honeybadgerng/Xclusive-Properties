"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserType {
  email: string;
  _id: string;
  // Add other fields if needed
}

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (token: string, user: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("🔍 Restoring user from localStorage:", parsedUser);

        if (parsedUser && parsedUser._id && parsedUser.email) {
          setUser(parsedUser); // Make sure this has _id
          setToken(token);
          setIsAuthenticated(true);
        } else {
          console.warn("⚠️ Incomplete user object found:", parsedUser);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error("❌ Failed to parse stored user:", e);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token: string, user: UserType) => {
    console.log("✅ Logging in with user:", user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };
  const setToken = (token: string) => {
    document.cookie = `authToken=${token}; path=/`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
