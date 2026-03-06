import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors block md:inline-block";
  const inactive = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const active = "bg-gray-900 text-white";

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
        
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-xl font-bold text-white tracking-tight"
            >
              AuctionApp
            </NavLink>
          </div>

         
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

       
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/auctions"
              className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
            >
              Auctions
            </NavLink>

            {isAuthenticated && user?.role === "User" && (
              <>
                <NavLink
                  to="/my-auctions"
                  className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                >
                  My Auctions
                </NavLink>

                <NavLink
                  to="/auctions/create"
                  className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                >
                  Create
                </NavLink>
                
                <NavLink
                    to="/users/update"
                    className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                >
                    Update password
                </NavLink>
              </>
            )}

            {isAuthenticated && user?.role === "Admin" && (
              <NavLink
                  to="/admin"
                  className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                  Admin
              </NavLink>
            )}
          </div>

       
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

   
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
          <NavLink
            to="/auctions"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Auctions
          </NavLink>

          {isAuthenticated ? (
            <>
              {user?.role === "User" && (
                <>
                  <NavLink
                    to="/my-auctions"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                  >
                    My Auctions
                  </NavLink>
                  <NavLink
                    to="/auctions/create"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                  >
                    Create
                  </NavLink>
                  <NavLink
                    to="/users/update"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                  >
                    Update password
                  </NavLink>
                </>
              )}
              {user?.role === "Admin" && (
                <NavLink
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
                >
                  Admin
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-gray-700 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 border-t border-gray-700 mt-2">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;