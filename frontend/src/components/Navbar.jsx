import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { IoClose } from "react-icons/io5"; // React Icon for Close
import logo from "../public/logo.png";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleClose = () => {
    setLoginOpen(false);
    setSignupOpen(false);
  };

  return (
    <>
      <nav className="bg-[#121212] text-white w-full shadow-md font-body border-b-2 border-gray-800">
        <div className="container mx-auto flex justify-between items-center py-3  px-6">
          {/* Logo */}
          <div className="flex items-center w-16 h-12 bg-amber-900  ">
            <img src={logo} className="h-full scale-140 w-full object-center object-contain" alt="logo" />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/code-review"
              className="text-lg text-gray-300 hover:text-gray-100 transition-all duration-500 ease-in-out"
            >
              Code Reviewer
            </Link>

            {user && token ? (
              <>
                <Link
                  to="/projects"
                  className="text-lg text-gray-300 hover:text-gray-100 transition-all duration-500 ease-in-out"
                >
                  Projects
                </Link>
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-800 hover:text-gray-200 transition-all duration-300 ease-in-out text-gray-200 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSignupOpen(true)}
                  className="text-lg text-gray-300 border-2 border-gray-100 rounded-lg px-3 py-1 font-medium hover:border-gray-400 hover:text-gray-200 transition-all duration-500 ease-in-out"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="text-lg px-3 py-1 text-black  bg-[white] border-2 border-gray-100 rounded-lg   hover:bg-gray-100 hover:text-[#121212] transition-all duration-500 ease-in-out font-medium"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-[#121212]/20 flex justify-center items-center z-50">
          <div className="relative backdrop-blur-md  p-8 rounded-lg">
            <Login />
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 transition-all duration-300" onClick={handleClose}>
              <IoClose size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-[#121212]/20 flex justify-center items-center z-50">
          <div className="relative backdrop-blur-md  p-8 rounded-lg">
            <Signup />
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 transition-all duration-300" onClick={handleClose}>
              <IoClose size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
