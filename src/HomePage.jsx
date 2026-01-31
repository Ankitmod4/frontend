import React, { useEffect, useState } from "react";
import { Menu, X, User, SlidersHorizontal } from "lucide-react";
import InfluencerFilters from "./InfluencerFilters.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BlogsList from "./BlogsList.jsx";
import Footer from "./Footer.jsx";

const Homepage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();  

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");  

  const [filters, setFilters] = useState({
    category: "",
    city: "",
    followers: "",
    budget: "",
  }); 

  // ================= FILTER LOGIC =================
  const filteredInfluencers = influencers.filter((inf) => {
    if (filters.category.length > 0 && !filters.category.includes(inf.Category))
  return false;

    if (filters.city && !inf.Location?.toLowerCase().includes(filters.city.toLowerCase())) return false;
    
    if (filters.followers) {
      const followersInK = inf.Followers / 1000;
      if (filters.followers === "1-10" && !(followersInK >= 1 && followersInK <= 10)) return false;
      if (filters.followers === "10-50" && !(followersInK > 10 && followersInK <= 50)) return false;
      if (filters.followers === "50-100" && !(followersInK > 50 && followersInK <= 100)) return false;
      if (filters.followers === "100+" && followersInK <= 100) return false;
    }

    if (filters.budget) {
      const priceInK = inf.Price / 1000;
      if (filters.budget === "0-5" && priceInK > 5) return false;
      if (filters.budget === "5-15" && !(priceInK > 5 && priceInK <= 15)) return false;
      if (filters.budget === "15-50" && !(priceInK > 15 && priceInK <= 50)) return false;
      if (filters.budget === "50+" && priceInK <= 50) return false;
    }
    return true;
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const handleProfile = () => {
    if (role === "user") navigate("/profile");
    else if (role === "influencer") navigate("/influencer/profile");
  };

  const fetchInfluencers = async () => {
    try {
      const res = await axios.get("https://influencal.influencialhub.com/api/influencers");
      if (res.data.success) {
        setInfluencers(res.data.data);
        console.log("Fetched influencers:", res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch influencers", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HEADER (ORIGINAL) ================= */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            InfluencerHub
          </span>

          <div className="hidden md:flex gap-4 items-center">
            {!isLoggedIn && (
              <>
                <Link to="/business/login" className="text-gray-700 font-medium">Login</Link>
                <Link to="/business/signup" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold">Sign Up</Link>
              </>
            )}
            {isLoggedIn && (
              <div className="hidden md:flex items-center gap-4">
                {role === "user" && <Link to="/addcampaign" className="text-gray-700 font-medium">Add Campaign</Link>}
                {(role === "user" || role === "influencer") && <Link to="/allcampaigns" className="text-gray-700 font-medium">All Campaigns</Link>}
                <button onClick={handleProfile} className="p-2 rounded-full border hover:bg-gray-100"><User size={20} /></button>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-xl">Logout</button>
              </div>
            )}
          </div>
{/* MOBILE ACTIONS - Isse profile icon hamesha bahar rahega */}
<div className="flex md:hidden items-center gap-3">
  {isLoggedIn && (
    <button 
      onClick={handleProfile} 
      className="p-2 rounded-full border bg-gray-50 text-gray-700"
    >
      <User size={20} />
    </button>
  )}
  <button className="text-gray-700" onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? <X size={28} /> : <Menu size={28} />}
  </button>
</div>        </div>

        {/* MOBILE MENU (ORIGINAL) */}
        <div className={`md:hidden transition-all duration-300 ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
          <div className="px-4 pb-4 space-y-3">
            {!isLoggedIn ? (
              <><Link to="/business/login" className="block py-2">Login</Link><Link to="/business/signup" className="block bg-indigo-600 text-white py-2 text-center rounded-xl">Sign Up Free</Link></>
            ) : (
              <>{role === "admin" && <Link to="/admin/dashboard" className="block py-2 font-medium">Admin Dashboard</Link>}
                {role === "user" && <Link to="/addcampaign" className="block py-2 font-medium">Add Campaign</Link>}
                {(role === "user" || role === "influencer") && <Link to="/allcampaigns" className="block py-2 font-medium">All Campaigns</Link>}
                <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-xl">Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ================= HERO (ORIGINAL) ================= */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Hire Top Influencers Instantly</h1>
          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto italic">Connect with verified influencers across Instagram, YouTube and LinkedIn.</p>
          <button className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-full font-bold" onClick={() => navigate("/all-influencers")}>Explore Influencers</button>
        </div>
      </section>

      {/* ================= FEATURED SECTION ================= */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800"  >Featured Influencers</h2>
              <p className="text-sm text-gray-500">Hire top influencers across all platforms</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsFilterOpen(true)} className="md:hidden flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
          </div>

          {/* 🔥 DESKTOP HORIZONTAL FILTERS 🔥 */}
          <div className="hidden md:block bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8">
            <InfluencerFilters filters={filters} setFilters={setFilters} layout="horizontal" />
          </div>

          {loading && <p className="text-gray-500 text-center">Loading influencers...</p>}

          {/* MOBILE VIEW (ORIGINAL HORIZONTAL SCROLL) */}
          <div className="flex gap-4 overflow-x-auto md:hidden pb-4">
            {!loading &&
  filteredInfluencers.slice(0,4).map((inf) => (
    <Link
      to={`/influencer/${inf.id}`}
      key={inf.id}
      className="min-w-[240px] bg-white rounded-2xl shadow-md overflow-hidden"
    >
      {/* IMAGE */}
<div className="relative aspect-square w-full overflow-hidden bg-slate-100">
  <img
    src={inf.ProfilePicture}
    alt={inf.Name}
    className="absolute inset-0 h-full w-full object-cover object-top"
    loading="lazy"
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/400x400?text=No+Profile";
    }}
  />
</div>

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800">
          {inf.Name}
        </h3>
        <p className="text-xs text-gray-500">{inf.Category}</p>

        <div className="flex justify-between mt-2 text-xs">
          <span>{inf.Followers.toLocaleString()}</span>
          <span className="font-semibold text-indigo-600">
            ₹{inf.Price}
          </span>
        </div>
      </div>
    </Link>
  ))}

          </div>

          {/* DESKTOP VIEW (ORIGINAL GRID) */}
          {/* DESKTOP VIEW */}
<div className="hidden md:grid grid-cols-4 gap-6">
  {!loading &&
    filteredInfluencers.slice(0,4).map((inf) => (
      <Link
        to={`/influencer/${inf.id}`}
        key={inf.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
      >
        {/* IMAGE */}
<div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200">
  <img
    src={inf.ProfilePicture}
    alt={inf.Name}
    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
    loading="lazy"
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/600x800?text=No+Profile+Image";
    }}
  />
  
  {/* Optional: Shadow Overlay taaki text upar sahi dikhe agar tu kuch likhe image pe */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</div>


        {/* CONTENT */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">
            {inf.Name}
          </h3>
          <p className="text-sm text-gray-500">
            {inf.Category} • {inf.Location}
          </p>
          <div className="flex justify-between mt-3 text-sm">
            <span>
              {inf.Followers.toLocaleString()} followers
            </span>
            <span className="font-bold text-indigo-600">
              ₹{inf.Price}
            </span>
          </div>
        </div>
      </Link>
    ))}
</div>

        </div>
      </section>

      {/* MOBILE FILTER OVERLAY */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <X onClick={() => setIsFilterOpen(false)} className="cursor-pointer text-gray-400" />
             </div>
             <InfluencerFilters filters={filters} setFilters={setFilters} layout="vertical" />
             <button onClick={() => setIsFilterOpen(false)} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold mt-6 shadow-lg">Apply Filters</button>
          </div>
        </div>
      )}
    <section>
      <BlogsList />
    </section>
      <Footer />
    </>
  );
};

export default Homepage;