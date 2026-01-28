import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  User, Mail, Lock, Tag, MapPin, Users, 
  IndianRupee, Instagram, Youtube, Sparkles, Loader2, ArrowRight 
} from "lucide-react";

const InfluencerSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

    // 🔹 Validation Logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      alert("Bhai, valid email toh dalo! 📧");
      return;
    }
    if (formData.Password.length < 6) {
      alert("Password kam se kam 6 chars ka hona chahiye! 🔐");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/influencer/signup", formData);
      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "influencer");
        localStorage.setItem("influencerId", res.data.data.id);
        navigate("/homepage");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Kuch toh gadbad hai! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>

      <div className="w-full max-w-2xl z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-100/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-500">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white text-center">
            <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md border border-white/30">
              <Sparkles size={32} />
            </div>
            <h2 className="text-3xl font-black tracking-tight leading-tight">Join the Creator Hub</h2>
            <p className="text-purple-100/80 text-sm mt-2 font-medium">Create your profile and start collaborating with top brands.</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            
            {/* Group 1: Personal Info */}
            <div className="space-y-4">
              <SectionTitle title="Personal Credentials" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <IconInput icon={<User size={18}/>} label="Full Name" name="Name" placeholder="Rahul Sharma" onChange={handleChange} required />
                <IconInput icon={<Mail size={18}/>} label="Email Address" type="email" name="Email" placeholder="rahul@creator.com" onChange={handleChange} required />
                <IconInput icon={<Lock size={18}/>} label="Create Password" type="password" name="Password" placeholder="••••••••" onChange={handleChange} required />
                <IconInput icon={<MapPin size={18}/>} label="Location" name="Location" placeholder="Mumbai, India" onChange={handleChange} required />
              </div>
            </div>

            {/* Group 2: Professional Stats */}
            <div className="space-y-4">
              <SectionTitle title="Influence Statistics" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <IconInput icon={<Tag size={18}/>} label="Category" name="Category" placeholder="Fashion / Tech" onChange={handleChange} required />
                <IconInput icon={<Users size={18}/>} label="Followers" name="Followers" placeholder="50K" onChange={handleChange} required />
                <IconInput icon={<IndianRupee size={18}/>} label="Price (₹)" name="Price" placeholder="5000" onChange={handleChange} required />
              </div>
            </div>

            {/* Group 3: Social Links */}
            <div className="space-y-4">
              <SectionTitle title="Social Media Presence" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <IconInput icon={<Instagram size={18} className="text-pink-500"/>} label="Instagram Link" name="instagram" placeholder="instagram.com/user" onChange={handleChange} />
                <IconInput icon={<Youtube size={18} className="text-red-500"/>} label="YouTube Link" name="youtube" placeholder="youtube.com/c/user" onChange={handleChange} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl ${
                  loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>Create Creator Account <ArrowRight size={20} /></>
                )}
              </button>
            </div>

            {/* Footer Links */}
            <div className="text-center pt-2">
              <p className="text-slate-500 text-sm font-medium">
                Already part of the hub?{" "}
                <Link to="/influencer/auth" className="text-purple-600 hover:text-purple-700 font-bold ml-1 transition-colors">
                  Log In here
                </Link>
              </p>
            </div>
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
          box-shadow: 0 4px 12px -2px rgba(147, 51, 234, 0.1);
        }
      `}</style>
    </div>
  );
};

/* --- UI Helper Components --- */
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