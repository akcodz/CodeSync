import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
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
        `${import.meta.env.VITE_BASE_URI}/users/login`,
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        navigate("/projects");
        setFormData({
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
        {/* Login Title */}
        <h2 className="text-3xl font-bold font-heading text-center text-gray-300 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 mb-1 font-heading">Email</label>
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
            <label className="block text-gray-300 mb-1 font-heading">Password</label>
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
            className="w-full bg-gray-500 hover:bg-gray-300 transition p-3 rounded-lg font-heading"
          >
            Login
          </button>
        </form>
      </div>
    
  );
};

export default Login;
