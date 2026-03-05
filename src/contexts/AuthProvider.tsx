import React, { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { UserResponseDto,UserLoginDto } from "../types/Types";
import { removeToken } from "../utils/TokenHandler";
import * as authService from "../services/authService";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [loading] = useState(false);

  const login = async (credentials: UserLoginDto)  => {
    const res = await authService.login(credentials);
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = () => {
    setUser(null);
    removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        login,              
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
