import React, { useState} from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext'; 
import type { UserResponseDto } from '../types/Types';
import {removeToken } from '../utils/TokenHandler';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserResponseDto | null>(null);
    const [loading] = useState(false);

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
            isAuthenticated: !!user,
            loading,


         }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;