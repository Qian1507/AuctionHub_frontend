import axiosInstance from "../api/axiosInstance";
import type {UserResponseDto, 
            UpdatePasswordDto,
            UserRegisterDto,
            UserLoginDto,
            AuthResponseDto } from "../types/Types";




export const register = async (
  data: UserRegisterDto
): Promise<{ message: string }> => {
  const res = await axiosInstance.post<{ message: string }>(
    "User/Register",
    data
  );
  return res.data; // "Registration successful"
};



export const login = async (
  credentials: UserLoginDto
): Promise<AuthResponseDto> => {
  const res = await axiosInstance.post<AuthResponseDto>(
    "User/Login",
    credentials
  );
  return res.data;
};



export const updatePassword = async (data: UpdatePasswordDto): Promise<void> => {
    await axiosInstance.patch("User/Update", data);
};


//Admin
export const getAllUsers = async (): Promise<UserResponseDto[]> => {
    const response = await axiosInstance.get<UserResponseDto[]>("User/GetAllUsers");
    return response.data;
};



export const deactivateUser = async (id: number): Promise<void> => {
    await axiosInstance.patch(`User/Deactivate/${id}`);
};