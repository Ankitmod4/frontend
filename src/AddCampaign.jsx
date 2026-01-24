import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddCampaign = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    influencerType: "",
    platformType: "",
    startDate: "",
    endDate: "",
    budget: "",
    location: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/addcampaign",
        formData
      );

      if (res.data.success) {
        alert("Campaign added successfully");
        setFormData({
          campaignName: "",
          influencerType: "",
          platformType: "",
          startDate: "",
          endDate: "",
          budget: "",
          location: "",
          details: "",
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
   
    <div className="bg-gray-100 min-h-screen py-10">
        <Link
          to="/homepage"
          className="text-indigo-600 font-medium mb-4 inline-block"
        >
          ← Back to Home
        </Link>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add Campaign
        </h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="campaignName"
            placeholder="Campaign Name"
            value={formData.campaignName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <select
            name="influencerType"
            value={formData.influencerType}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Influencer Type</option>
            <option value="Nano">Nano</option>
            <option value="Micro">Micro</option>
            <option value="Macro">Macro</option>
          </select>

          <select
            name="platformType"
            value={formData.platformType}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg"
            />
          </div>

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <textarea
            name="details"
            placeholder="Campaign Details"
            value={formData.details}
            onChange={handleChange}
            rows="4"
            className="w-full border px-4 py-2 rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
          >
            Add Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
