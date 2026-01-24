import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: "",
    Password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/login",
        formData
      );

      if (res.data.success) { 
        

        alert("Admin login successful");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");

        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Invalid admin credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Access admin dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="email"
            name="Email"
            placeholder="Admin Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg
                       hover:bg-red-700 transition duration-300 font-semibold"
          >
            Login as Admin
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Business Login?{" "}
            <Link
              to="/business/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Go to Business
            </Link>
          </p>

          <p className="mt-2">
            Influencer Login?{" "}
            <Link
              to="/influencer/auth"
              className="text-purple-600 hover:underline font-medium"
            >
              Go to Influencer
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
