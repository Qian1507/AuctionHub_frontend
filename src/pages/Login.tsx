import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {useAuth} from"../contexts/useAuth";
import {login} from '../services/authService';
import { setToken } from '../utils/TokenHandler';
import type { UserLoginDto, AuthResponseDto} from '../types/Types';


type ApiErrorResponse = {
  message?: string;
};

type AxiosLikeError = {
  response?: {
    data?: ApiErrorResponse;
  };
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); 
  
  const [formData, setFormData] = useState<UserLoginDto>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
    const response: AuthResponseDto = await login(formData);
    // 1. Save JWT to LocalStorage
    setToken(response.token);
    // 2. Update Global Auth State
    setUser(response.user);

    //3.Redirect to Admin/Auction
    if (response.user.role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/auctions");
    }
  } catch (err: unknown) {
    let message = "Login failed. Please check your credentials.";

    if (typeof err === "object" && err !== null && "response" in err) {
       const axiosErr = err as AxiosLikeError;
    const backendMsg = axiosErr.response?.data?.message;
    if (backendMsg) {
      message = backendMsg;
      }
    }

    setError(message);
  } finally {
    setIsLoading(false);
  }
};
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your details to access your auction account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold bg-blue-600 hover:bg-blue-700 transform transition-all active:scale-[0.98] ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;