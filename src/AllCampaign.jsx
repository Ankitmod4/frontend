import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);
  useEffect(() => {
  window.scrollTo(0, 0);
  fetchCampaigns();
}, []);


  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/campaigns");
      if (res.data.success) {
        setCampaigns(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 SEARCH FILTER */
  const filteredCampaigns = campaigns.filter((camp) =>
    camp.campaignName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">
          All Campaigns
        </h2>

        <Link
          to="/homepage"
          className="text-indigo-600 font-medium mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        {/* 🔍 SEARCH BAR */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by campaign name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {loading && (
          <p className="text-gray-500">
            Loading campaigns...
          </p>
        )}

        {!loading && filteredCampaigns.length === 0 && (
          <p className="text-gray-500">
            No campaigns found
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            filteredCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-1">
                  {camp.campaignName}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {camp.platformType} • {camp.influencerType}
                </p>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {camp.details}
                </p>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <span className="font-semibold text-indigo-600">
                    ₹{camp.budget}
                  </span>
                  <span className="text-gray-500">
                    {camp.location}
                  </span>
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  {new Date(camp.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllCampaigns;
