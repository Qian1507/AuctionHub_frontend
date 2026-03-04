import axiosInstance from "../api/axiosInstance";
import type {
  UserLoginDto,
  AuthResponseDto,
  UserRegisterDto,
   
} from "../types/Types";

type RegisterSuccessResponse = {
  message: string;
};


export const login = async (
  credentials: UserLoginDto
): Promise<AuthResponseDto> => {
  const response = await axiosInstance.post<AuthResponseDto>(
    "User/Login",
    credentials
  );
  return response.data;
};

/**
 * Register: POST /api/User/Register
 */
export const register = async (
  data: UserRegisterDto
): Promise<RegisterSuccessResponse> => {
  const response = await axiosInstance.post<RegisterSuccessResponse>(
    "User/Register",
    data
  );
  return response.data;
};