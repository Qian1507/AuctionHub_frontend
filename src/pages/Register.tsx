import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// 1. Import BOTH register and login from the service API
import { register, login } from "../services/authService";
// 2. Import setToken directly
import { setToken } from "../utils/TokenHandler";
import { useAuth } from "../contexts/useAuth";
import type { UserRegisterDto, AuthResponseDto } from "../types/Types";
import { getErrorMessage } from "../utils/errorUtils";

const Register: React.FC = () => {
  // 3. Only extract setUser from useAuth, NOT login
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserRegisterDto>({
    name: "",
    email: "",
    password: "",
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
      // Step 1: Execute Registration
      await register(formData);

      // Step 2: Automatically log in using the same service method as Login.tsx
      const loginResponse: AuthResponseDto = await login({
        email: formData.email,
        password: formData.password,
      });

      // Step 3: Save JWT to LocalStorage manually
      setToken(loginResponse.token);

      // Step 4: Update Global Auth State manually
      setUser(loginResponse.user);

      // Step 5: Redirect based on role (matching your Login logic)
      if (loginResponse.user.role === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/auctions", { replace: true });
      }
      
    } catch (err: unknown) {
      const message = getErrorMessage(
        err,
        "Registration failed. Please try again."
      );
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
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join our auction community today
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="johndoe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;