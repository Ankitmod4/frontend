import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [influencerType, setInfluencerType] = useState("");

  // popup
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/campaigns");
      if (res.data.success) {
        setCampaigns(res.data.data);
        console.log("Fetched campaigns:",campaigns);
      }
    } catch (err) {
      console.error("Failed to fetch campaigns", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 FILTER LOGIC */
  const filteredCampaigns = campaigns.filter((camp) => {
    if (
      search &&
      !camp.campaignName.toLowerCase().includes(search.toLowerCase())
    )
      return false;

    if (
      location &&
      !camp.location.toLowerCase().includes(location.toLowerCase())
    )
      return false;

    if (influencerType && camp.influencerType !== influencerType) return false;

    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">All Campaigns</h2>

        <Link
          to="/homepage"
          className="text-indigo-600 font-medium mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        {/* ================= FILTERS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search campaign name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border"
          />

          <input
            type="text"
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 rounded-xl border"
          />

          <select
            value={influencerType}
            onChange={(e) => setInfluencerType(e.target.value)}
            className="px-4 py-2 rounded-xl border"
          >
            <option value="">All Influencer Types</option>
            <option value="Nano">Nano</option>
            <option value="Micro">Micro</option>
            <option value="Macro">Macro</option>
            <option value="Celebrity">Celebrity</option>
          </select>
        </div>

        {/* ================= STATES ================= */}
        {loading && <p className="text-gray-500">Loading campaigns...</p>}

        {!loading && filteredCampaigns.length === 0 && (
          <p className="text-gray-500">No campaigns found</p>
        )}

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            filteredCampaigns.map((camp) => (
              <div
                key={camp.id}
                onClick={() => setSelectedCampaign(camp)}
                className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl transition"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {camp.campaignName}
                </h3>

                <p className="text-sm text-gray-500">
                  {camp.influencerType}
                </p>

                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="font-semibold text-indigo-600">
                    ₹{camp.budget}
                  </span>

                  <span className="text-xs text-gray-400">
                    Click for details →
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ================= POPUP MODAL ================= */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedCampaign(null)}
          />

          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 z-50">
            <button
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {selectedCampaign.campaignName}
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              {selectedCampaign.platformType} •{" "}
              {selectedCampaign.influencerType}
            </p>

            <p className="text-gray-600 mb-4">
              {selectedCampaign.details}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Budget</p>
                <p className="font-semibold text-indigo-600">
                  ₹{selectedCampaign.budget}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-semibold">
                  {selectedCampaign.location}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Start Date</p>
                <p className="font-semibold">
                  {selectedCampaign.startDate}
                </p>
              <p className="text-gray-500">End Date</p>
                <p className="font-semibold">
                  {selectedCampaign.endDate}
                </p>  
                
              </div>
            </div>

            <a
  href={`mailto:${selectedCampaign.email}?subject=Application for ${selectedCampaign.campaignName}`}
  className="mt-6 block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 text-center"
>
  Apply for Campaign
</a>

          </div>
        </div>
      )}
    </div>
  );
};

export default AllCampaigns;
