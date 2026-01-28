import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  Search, MapPin, Users, IndianRupee, Calendar, 
  X, ArrowLeft, Briefcase, ExternalLink 
} from "lucide-react";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [influencerType, setInfluencerType] = useState("");

  // Popup
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("/api/campaigns");
      if (res.data.success) {
        setCampaigns(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch campaigns", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 FILTER LOGIC */
  const filteredCampaigns = campaigns.filter((camp) => {
    if (search && !camp.campaignName.toLowerCase().includes(search.toLowerCase())) return false;
    if (location && !camp.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (influencerType && camp.influencerType !== influencerType) return false;
    return true;
  });

  // Badge Color Helper
  const getTypeColor = (type) => {
    const colors = {
      Nano: "bg-blue-100 text-blue-700",
      Micro: "bg-green-100 text-green-700",
      Macro: "bg-purple-100 text-purple-700",
      Celebrity: "bg-amber-100 text-amber-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12 font-sans">
      {/* HEADER */}
      <div className="bg-white border-b px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <Link to="/homepage" className="flex items-center text-slate-500 hover:text-indigo-600 mb-4 transition-colors group w-fit">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Campaign Market</h1>
          <p className="text-slate-500 mt-2 text-lg">Find the best brand deals in your city.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10">
        {/* ================= FILTERS CARD ================= */}
        <div className="bg-white p-5 rounded-3xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-700"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Filter by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-700"
            />
          </div>

          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select
              value={influencerType}
              onChange={(e) => setInfluencerType(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none text-slate-700 font-medium"
            >
              <option value="">All Influencer Types</option>
              <option value="Nano">Nano</option>
              <option value="Micro">Micro</option>
              <option value="Macro">Macro</option>
              <option value="Celebrity">Celebrity</option>
            </select>
          </div>
        </div>

        {/* ================= CAMPAIGN LIST ================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium italic">Loading awesome deals...</p>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <Briefcase size={60} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800">No campaigns found</h3>
            <p className="text-slate-500">Try changing your filters or searching something else.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.slice(0,4).map((camp) => (
              <div
                key={camp.id}
                onClick={() => setSelectedCampaign(camp)}
                className="group bg-white rounded-[2rem] border border-slate-100 p-7 cursor-pointer hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${getTypeColor(camp.influencerType)}`}>
                    {camp.influencerType}
                  </span>
                  <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <ExternalLink size={18} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {camp.campaignName}
                </h3>

                <div className="flex items-center text-slate-500 text-sm mb-6 font-medium">
                  <MapPin size={16} className="mr-1.5 text-indigo-500" /> {camp.location || "Remote"}
                </div>

                <div className="pt-5 border-t border-slate-50 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-0.5">Budget</p>
                    <p className="text-2xl font-black text-indigo-600">₹{camp.budget}</p>
                  </div>
                  <button className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl group-hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 group-hover:shadow-indigo-200">
                    View Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL WITH MOBILE SCROLL FIX ================= */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedCampaign(null)}
          />

          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden z-[101] animate-zoom-in">
            {/* Modal Header (Fixed) */}
            <div className="bg-indigo-600 p-8 text-white relative shrink-0">
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-6 right-6 p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Active Campaign
                </span>
              </div>
              <h2 className="text-3xl font-black leading-tight pr-10">{selectedCampaign.campaignName}</h2>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge icon={<Users size={16}/>} text={selectedCampaign.influencerType} />
                <Badge icon={<MapPin size={16}/>} text={selectedCampaign.location} />
                <Badge icon={<IndianRupee size={16}/>} text={`Budget: ₹${selectedCampaign.budget}`} />
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-black text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <Briefcase size={18} className="text-indigo-600" /> Campaign Brief
                </h4>
                <div className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 font-medium">
                  {selectedCampaign.details || "No specific details provided for this campaign yet."}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <DateBox label="Campaign Starts" date={selectedCampaign.startDate} />
                <DateBox label="Submissions End" date={selectedCampaign.endDate} />
              </div>

              <a
                href={`mailto:${selectedCampaign.email}?subject=Collaboration Request: ${selectedCampaign.campaignName}`}
                className="flex items-center justify-center gap-3 w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 sticky bottom-0"
              >
                Apply Now <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Animations & Scrollbar */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-zoom-in { animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

/* Reusable Components for Cleanliness */
const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold border border-indigo-100 shadow-sm">
    {icon} <span>{text}</span>
  </div>
);

const DateBox = ({ label, date }) => (
  <div className="bg-slate-50 border border-slate-100 p-5 rounded-[1.5rem]">
    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.15em] mb-2">{label}</p>
    <div className="flex items-center gap-2.5 text-slate-800 font-bold">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Calendar size={18} className="text-indigo-600" />
      </div>
      <span className="text-sm">{date || "Flexible"}</span>
    </div>
  </div>
);

export default AllCampaigns;