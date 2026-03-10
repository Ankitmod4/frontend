import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  User, Mail, Lock, Tag, MapPin, Users, 
  IndianRupee, Instagram, Youtube, Sparkles, Loader2, ArrowRight, X 
} from "lucide-react";

const categoriesSlab = [
  "Fashion", "Beauty", "Lifestyle", "Travel", "Food", "Fitness", 
  "Tech", "Finance", "Business", "Education", "Entertainment", 
  "Gaming", "Health", "Parenting", "Automobile"
];

const InfluencerSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Category: "", // Yeh comma-separated string hi rahegi
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
        AccountLinks: { ...formData.AccountLinks, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    } 
  };

  // --- Multi-Select Logic ---
  const handleCategoryClick = (cat) => {
    let currentCats = formData.Category ? formData.Category.split(", ") : [];
    
    if (currentCats.includes(cat)) {
      // Agar already selected hai toh remove karo
      currentCats = currentCats.filter(item => item !== cat);
    } else {
      // Add karo
      currentCats.push(cat);
    }
    
    setFormData({ ...formData, Category: currentCats.join(", ") });
  };

  const validateForm = () => {
    const { Email, Password, AccountLinks, Name, Category, Location, Followers } = formData;
    if(!Name.trim() || !Category.trim() || !Location.trim() || !Followers.trim() || !Email.trim() || !Password.trim() || !AccountLinks.instagram.trim()) {
      alert("Please fill in all the required fields! 📝");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await axios.post("https://influencal.influencialhub.com/api/influencer/signup", formData);
      if (res.data.success) {
        alert("Creator Profile Created! 🎉");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "influencer");
        localStorage.setItem("influencerId", res.data.data.id);
        navigate("/influencer/profile");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      
      <div className="w-full max-w-2xl z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white text-center">
            <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md">
              <Sparkles size={32} />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Join the Creator Hub</h2>
            <p className="text-purple-100/80 text-sm mt-2">Select your niches and start collaborating.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            {/* Credentials Section */}
            <div className="space-y-4">
              <SectionTitle title="Personal Credentials" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <IconInput icon={<User size={18}/>} label="Full Name" name="Name" placeholder="Rahul Sharma" value={formData.Name} onChange={handleChange} />
                <IconInput icon={<Mail size={18}/>} label="Email Address" type="email" name="Email" placeholder="rahul@creator.com" value={formData.Email} onChange={handleChange} />
                <IconInput icon={<Lock size={18}/>} label="Password" type="password" name="Password" placeholder="••••••••" value={formData.Password} onChange={handleChange} />
                <IconInput icon={<MapPin size={18}/>} label="Location" name="Location" placeholder="Mumbai, India" value={formData.Location} onChange={handleChange} />
              </div>
            </div>

            {/* Category Multi-Select Slab */}
            <div className="space-y-4">
              <SectionTitle title="Choose Your Categories (Select Multiple)" />
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                {categoriesSlab.map((cat) => {
                  const isSelected = formData.Category.split(", ").includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        isSelected 
                        ? "bg-purple-600 text-white border-purple-600 shadow-md scale-105" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                      }`}
                    >
                      {cat} {isSelected && "✓"}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="Category" value={formData.Category} />
            </div>

            {/* Stats Section */}
            <div className="space-y-4">
              <SectionTitle title="Influence Statistics" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <IconInput icon={<Users size={18}/>} label="Followers" name="Followers" placeholder="50000" type='text' value={formData.Followers} onChange={handleChange} />
                <IconInput icon={<IndianRupee size={18}/>} label="Price (₹)" name="Price" placeholder="5000" value={formData.Price} onChange={handleChange} />
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-4">
              <SectionTitle title="Social Media Presence" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <IconInput icon={<Instagram size={18} className="text-pink-500"/>} label="Instagram Link" name="instagram" placeholder="instagram.com/user" value={formData.AccountLinks.instagram} onChange={handleChange} />
                <IconInput icon={<Youtube size={18} className="text-red-500"/>} label="YouTube Link" name="youtube" placeholder="youtube.com/c/user" value={formData.AccountLinks.youtube} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${loading ? "bg-slate-200" : "bg-purple-600 text-white shadow-xl shadow-purple-200"}`}>
              {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .custom-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          background-color: #f8fafc;
          border: 2px solid transparent;
          border-radius: 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1e293b;
          transition: all 0.2s ease;
          outline: none;
        }
        .custom-input:focus {
          background-color: white;
          border-color: #9333ea;
        }
      `}</style>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 pb-2 ml-1">
    {title}
  </h3>
);

const IconInput = ({ label, icon, ...props }) => (
  <div className="flex flex-col gap-1.5 group">
    <label className="text-xs font-bold text-slate-600 ml-1">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-4 text-slate-400 group-focus-within:text-purple-600 transition-colors">
        {icon}
      </div>
      <input className="custom-input" {...props} />
    </div>
  </div>
);

export default InfluencerSignup;