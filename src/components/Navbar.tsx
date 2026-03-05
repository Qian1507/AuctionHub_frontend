import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors";
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

       
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/auctions"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              Auctions
            </NavLink>

            {isAuthenticated &&  user?.role === "User" &&(
              <>
                <NavLink
                  to="/my-auctions"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? active : inactive}`
                  }
                >
                  My Auctions
                </NavLink>

                <NavLink
                  to="/auctions/create"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? active : inactive}`
                  }
                >
                  Create
                </NavLink>
                <NavLink
                    to="/users/update"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? active : inactive}`
                    }
                    >
                    Update password
                 </NavLink>
                </>
            )}

            {isAuthenticated && user?.role === "Admin" && (
              <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                        `${linkBase} ${isActive ? active : inactive}`
                        }
                    >
                     Admin
                    </NavLink>
                         )}
          </div>

          
          <div className="flex items-center space-x-3">
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
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? active : inactive}`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? active : inactive}`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
