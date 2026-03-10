import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    const businessEmail = localStorage.getItem("businessEmail");
    
    if (!businessEmail) {
      setError("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://influencal.influencialhub.com/api/campaigns/email', {
        email: businessEmail 
      });

      if (response.data.success) {
        setCampaigns(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch campaigns.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // DELETE LOGIC
  const handleDelete = async (databaseId) => {
    // databaseId here is camp.id coming from your MySQL/Sequelize model
    if (window.confirm("Delete this campaign permanently?")) {
      try {
        const response = await axios.delete(`https://influencal.influencialhub.com/api/campaigns/${databaseId}`);
        
        if (response.data.success) {
          // Update State: Remove from UI only after successful DB deletion
          setCampaigns((prev) => prev.filter(camp => camp.id !== databaseId));
          alert("Success: Campaign removed Successfully.");
        }
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Server Error: Could not delete.");
      }
    }
  };

  if (loading) return <div className="p-20 text-center text-indigo-600 font-bold animate-pulse text-2xl">Syncing Dashboard...</div>;
  if (error) return <div className="p-20 text-center text-red-500 font-semibold">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <Link to="/homepage" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium transition-all group">
            <div className="p-2 bg-white rounded-full shadow-sm group-hover:bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </div>
            Exit to Home
          </Link>

          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            MY <span className="text-indigo-600">DASHBOARD</span>
          </h1>

          <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
             <span className="text-sm font-bold text-gray-700">{campaigns.length} Total Campaigns</span>
          </div>
        </div>

        {/* EMPTY STATE */}
        {campaigns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">No active campaigns found in your database.</p>
            <Link to="/addcampaign" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">Create one now +</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((camp) => (
              <div key={camp.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col h-[520px] overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                
                <div className="p-8 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-gray-800 leading-7 uppercase">
                        {camp.campaignName}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold mt-1">DB_ID: {camp.id}</p>
                    </div>
                    
                    {/* DELETE BUTTON passes camp.id */}
                    <button 
                      onClick={() => handleDelete(camp.id)}
                      className="p-2.5 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="px-8 flex-grow overflow-y-auto custom-scrollbar bg-slate-50/30">
                  <div className="py-4">
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line font-medium">
                      {camp.details}
                    </p>
                  </div>
                </div>

                <div className="p-8 bg-white flex justify-between items-center border-t border-gray-100">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Budget</span>
                    <p className="text-3xl font-black text-green-600">₹{camp.budget}</p>
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Location</span>
                     <p className="text-sm font-bold text-gray-800">{camp.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default MyCampaigns;