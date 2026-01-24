import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BusinessSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    BusinessName: "",
    Email: "",
    PhoneNumber: "",
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
        "http://localhost:8080/api/business/register",
        formData
      );

      if (res.data.success) {
        alert("Signup successful");
        
       localStorage.setItem("businessId", res.data.data.id);
        localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("role", "user"); 

        navigate("/homepage");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Business Signup
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Create your business account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="BusinessName"
            placeholder="Business Name"
            value={formData.BusinessName}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="Email"
            placeholder="Email address"
            value={formData.Email}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="PhoneNumber"
            placeholder="Phone number"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg
                       hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              to="/business/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>

          <hr className="my-4" />

          <p>
            Are you an Influencer?{" "}
            <Link
              to="/influencer/auth"
              className="text-purple-600 hover:underline font-medium"
            >
              Influencer Login
            </Link>
          </p>

          <p className="mt-2">
            Admin Login?{" "}
            <Link
              to="/admin/login"
              className="text-red-600 hover:underline font-medium"
            >
              Go to Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;
