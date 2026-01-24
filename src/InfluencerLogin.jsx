import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InfluencerLogin = () => {
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
        "http://localhost:8080/api/influencer/login",
        formData
      );

      if (res.data.success) {
        alert("Login successful");
        localStorage.setItem("influencer", JSON.stringify(res.data.data));
         localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "influencer");
    localStorage.setItem("influencerId", res.data.data.id);
    console.log("influencerId:", res.data.data.id);
        navigate("/homepage");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Influencer Login
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            name="Email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="Password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            Don’t have an account?{" "}
            <Link to="/influencer/signup" className="text-purple-600 font-medium">
              Signup
            </Link>
          </p>

          <p className="mt-2">
            Business Login?{" "}
            <Link to="/business/login" className="text-blue-600 font-medium">
              Go to Business
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default InfluencerLogin;
