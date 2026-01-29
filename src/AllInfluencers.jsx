import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, User, Instagram, Youtube, Linkedin, MapPin, SlidersHorizontal } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import InfluencerFilters from "./InfluencerFilters.jsx";

const AllInfluencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle ke liye
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    city: "",
    followers: "",
    budget: "",
  });

  // ================= FETCH DATA =================


  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // ya "auto"
  });
}, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("https://influencal.influencialhub.com/api/influencers");
        if (res.data.success) setInfluencers(res.data.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ================= FILTER LOGIC =================
  const filteredInfluencers = influencers.filter((inf) => {
    if (filters.category && inf.Category !== filters.category) return false;
    if (filters.city && !inf.Location?.toLowerCase().includes(filters.city.toLowerCase())) return false;
    
    if (filters.followers) {
      const fInK = inf.Followers / 1000;
      if (filters.followers === "1-10" && !(fInK >= 1 && fInK <= 10)) return false;
      if (filters.followers === "10-50" && !(fInK > 10 && fInK <= 50)) return false;
      if (filters.followers === "50-100" && !(fInK > 50 && fInK <= 100)) return false;
      if (filters.followers === "100+" && fInK <= 100) return false;
    }

    if (filters.budget) {
      const pInK = inf.Price / 1000;
      if (filters.budget === "0-5" && pInK > 5) return false;
      if (filters.budget === "5-15" && !(pInK > 5 && pInK <= 15)) return false;
      if (filters.budget === "15-50" && !(pInK > 15 && pInK <= 50)) return false;
      if (filters.budget === "50+" && pInK <= 50) return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* ================= HEADER & FILTERS ================= */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
            >
              <ArrowLeft size={22} className="text-gray-700" />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">Explore</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <span className="hidden sm:inline-block text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
               {filteredInfluencers.length} Creators
             </span>
             {/* Mobile Filter Button */}
             <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-indigo-100"
             >
                <SlidersHorizontal size={14} /> Filters
             </button>
          </div>
        </div>

        {/* Desktop Filter Bar (Visible only on md+) */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 py-3 overflow-x-auto no-scrollbar border-t border-gray-50">
          <InfluencerFilters filters={filters} setFilters={setFilters} layout="horizontal" />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 md:h-[420px] bg-gray-200 animate-pulse rounded-2xl md:rounded-[2rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {filteredInfluencers.map((inf) => (
              <div 
                key={inf.id} 
                className="bg-white rounded-2xl md:rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                {/* Profile Pic & Socials Overlay */}
                <div className="relative h-40 md:h-56 bg-gray-100 overflow-hidden">
                  {inf.ProfilePicture ? (
                    <img 
                      src={inf.ProfilePicture} 
                      alt={inf.Name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-indigo-200 bg-indigo-50">
                      <User size={40} className="md:w-14 md:h-14" />
                    </div>
                  )}

                  {/* Social Icons Overlay (Hidden on very small screens for clean UI) */}
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {inf.AccountLinks?.instagram && <div className="p-1 md:p-1.5 bg-white/90 backdrop-blur rounded text-pink-600 shadow-sm"><Instagram size={12} /></div>}
                    {inf.AccountLinks?.youtube && <div className="p-1 md:p-1.5 bg-white/90 backdrop-blur rounded text-red-600 shadow-sm"><Youtube size={12} /></div>}
                  </div>

                  <div className="absolute top-2 right-2">
                    <span className="bg-indigo-600/90 backdrop-blur text-white px-2 py-0.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                      {inf.Category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-5 flex flex-col flex-grow">
                  <h3 className="text-sm md:text-lg font-bold text-gray-800 truncate mb-0.5">{inf.Name}</h3>
                  <div className="flex items-center gap-1 text-gray-400 mb-2 md:mb-4">
                    <MapPin size={10} className="md:w-3 md:h-3" />
                    <span className="text-[10px] md:text-xs">{inf.Location}</span>
                  </div>

                  <div className="flex justify-between items-end pt-2 md:pt-4 border-t border-gray-50 mt-auto">
                    <div>
                      <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Followers</p>
                      <p className="text-xs md:text-base font-black text-gray-900">
                        {inf.Followers >= 1000 ? `${(inf.Followers / 1000).toFixed(0)}K` : inf.Followers}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Budget</p>
                      <p className="text-xs md:text-base font-black text-indigo-600">₹{inf.Price}</p>
                    </div>
                  </div>

                  <Link 
                    to={`/influencer/${inf.id}`} 
                    className="block w-full text-center mt-3 md:mt-5 bg-gray-900 text-white py-2 md:py-3 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm hover:bg-indigo-600 transition-all active:scale-95"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= MOBILE FILTER MODAL ================= */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
             <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-sm font-bold text-indigo-600">Done</button>
             </div>
             <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                <InfluencerFilters filters={filters} setFilters={setFilters} layout="vertical" />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInfluencers;