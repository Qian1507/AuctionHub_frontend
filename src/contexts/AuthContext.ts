import { createContext } from 'react';
import type { UserResponseDto,UserLoginDto } from '../types/Types';

export interface AuthContextType {
  user: UserResponseDto | null;
  setUser: (user: UserResponseDto | null) => void;
  login: (credentials: UserLoginDto) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;