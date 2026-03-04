import { createContext } from 'react';
import type { UserResponseDto } from '../types/Types';

export interface AuthContextType {
  user: UserResponseDto | null;
  setUser: (user: UserResponseDto | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;