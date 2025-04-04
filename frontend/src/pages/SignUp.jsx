import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Signup = () => {
  const {setUser} = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/users/register`,
        formData
      );

      if (response.status === 201) {
        localStorage.setItem('token',response.data.token)
        setUser(response.data.user)
        navigate("/projects");
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="relative p-8 w-96 rounded-lg border border-gray-500 bg-[#121212]/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        {/* Signup Title */}
        <h2 className="text-3xl font-bold text-center text-gray-300 mb-6 font-heading">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-gray-300 mb-1 font-heading">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
             
              className="w-full p-3 rounded-lg bg-transparent border text-gray-300 border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 font-body placeholder:text-gray-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-300 mb-1 font-heading">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-transparent border text-gray-300 border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 font-body placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 mb-1 font-heading">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-transparent border text-gray-300 border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 font-body placeholder:text-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-gray-300 transition p-3 rounded font-heading"
          >
            Sign Up
          </button>
        </form>

   
      </div>
    
  );
};

export default Signup;
