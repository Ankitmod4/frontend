import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InfluencerSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Category: "",
    Location: "",
    Followers: "",
    Price: "",
    AccountLinks: {
      instagram: "",
      youtube: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "instagram" || name === "youtube") {
      setFormData({
        ...formData,
        AccountLinks: {
          ...formData.AccountLinks,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/influencer/signup",
        formData
      );

      if (res.data.success) {
        alert("Influencer signup successful");
         localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "influencer");
    localStorage.setItem("influencerId", res.data.data.id);
        navigate("/homepage");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Influencer Signup
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">

          <input name="Name" placeholder="Full Name" onChange={handleChange}
            className="w-full input" />

          <input name="Email" type="email" placeholder="Email" onChange={handleChange}
            className="w-full input" />

          <input name="Password" type="password" placeholder="Password" onChange={handleChange}
            className="w-full input" />

          <input name="Category" placeholder="Category" onChange={handleChange}
            className="w-full input" />

          <input name="Location" placeholder="Location" onChange={handleChange}
            className="w-full input" />

          <input name="Followers" placeholder="Followers" onChange={handleChange}
            className="w-full input" />

          <input name="Price" placeholder="Price" onChange={handleChange}
            className="w-full input" />

          <input name="instagram" placeholder="Instagram Link" onChange={handleChange}
            className="w-full input" />

          <input name="youtube" placeholder="YouTube Link" onChange={handleChange}
            className="w-full input" />

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Signup
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/influencer/auth" className="text-purple-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default InfluencerSignup;
