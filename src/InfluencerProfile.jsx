import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Camera, User, Mail, Lock, Tag, MapPin, Users, IndianRupee, Instagram, Youtube, Linkedin, ArrowLeft, Save } from "lucide-react";

const InfluencerEditProfile = () => {
  const influencerId = localStorage.getItem("influencerId");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    Name: "", Email: "", Password: "", Category: "", Location: "",
    Followers: "", Price: "", instagram: "", youtube: "", linkedin: "",
  });
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://influencal.influencialhub.com/api/influencer/${influencerId}`);
      let data = res.data.data;
      console.log("Raw Data:", data);

      // 🔍 1. AccountLinks String ko Object mein badlo
      let parsedLinks = { instagram: "", youtube: "" };
      if (data.AccountLinks) {
        try {
          // Agar string hai toh parse karo, nahi toh direct use karo
          parsedLinks = typeof data.AccountLinks === 'string' 
            ? JSON.parse(data.AccountLinks) 
            : data.AccountLinks;
        } catch (e) {
          console.error("Error parsing AccountLinks", e);
        }
      }

      // 🔍 2. Form state update karo
      setForm({
        Name: data.Name || "",
        Email: data.Email || "",
        Password: "",
        Category: data.Category || "",
        Location: data.Location || "",
        Followers: data.Followers || "",
        Price: data.Price || "",
        // Ab parsedLinks se data uthayenge
        instagram: parsedLinks.instagram || "",
        youtube: parsedLinks.youtube || "",
      });

      setPreview(data.ProfilePicture || "");
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to load profile ❌");
    } finally {
      setLoading(false);
    }
  };

  if (influencerId) fetchProfile();
}, [influencerId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // --- 1. Validation Logic ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  if (!form.Name.trim() || !form.Email.trim()) {
    alert("Please fill in the required fields! 📝");
    return;
  }

  if (!emailRegex.test(form.Email.trim())) {
    alert("Please enter a valid email address! 📧");
    return;
  }


  // --- 2. Update Process ---
  setUpdating(true);
  try {
    const fd = new FormData();
    
    // Baaki fields append karna
    Object.entries({
      Name: form.Name, 
      Email: form.Email, 
      Category: form.Category,
      Location: form.Location, 
      Followers: form.Followers, 
      Price: form.Price,
    }).forEach(([k, v]) => fd.append(k, v));

    // Password sirf tabhi bhejo agar user ne naya password dala ho
    if (form.Password && form.Password.trim()) {
      if (form.Password.length < 6) {
        alert("New password must be at least 6 characters long! 🔐");
        setUpdating(false);
        return;
      }
      fd.append("Password", form.Password);
    }

    // AccountLinks ko Stringify karke bhejna (Important)
    fd.append("AccountLinks", JSON.stringify({ 
      instagram: form.instagram, 
      youtube: form.youtube, 
      linkedin: form.linkedin 
    }));

    if (image) fd.append("ProfilePicture", image);

    await axios.put(`https://influencal.influencialhub.com/api/influencer/${influencerId}`, fd);
    alert("Profile updated successfully! ✅");
    
  } catch (error) {
    console.error("Update error:", error);
    alert(error.response?.data?.message || "Profile update failed. Please try again! ❌");
  } finally {
    setUpdating(false);
  }
};

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 font-medium animate-pulse">Fetching your details...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12">
      {/* Top Navbar Style */}
      <div className="bg-white border-b sticky top-0 z-10 px-4 py-4 mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/homepage" className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Back to Dashboard</span>
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Edit Profile
          </h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* HEADER SECTION - PHOTO & BASIC INFO */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full ring-4 ring-indigo-50 overflow-hidden shadow-inner">
                <img 
                  src={preview || "https://via.placeholder.com/150"} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition group-hover:scale-110" 
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white shadow-lg cursor-pointer hover:bg-indigo-700 transition-all scale-90 hover:scale-100">
                <Camera size={18} />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800">{form.Name || "Your Name"}</h2>
              <p className="text-slate-500 mb-4">{form.Email}</p>
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {form.Category || "Influencer"}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* PERSONAL INFO CARD */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <SectionHeader title="Basic Credentials" />
              <div className="space-y-4">
                <IconField icon={<User size={18}/>} label="Full Name">
                  <input name="Name" value={form.Name} onChange={handleChange} className="modern-input" placeholder="Rahul Sharma" />
                </IconField>
                <IconField icon={<Mail size={18}/>} label="Email">
                  <input type="email" name="Email" value={form.Email} onChange={handleChange} className="modern-input" />
                </IconField>
                <IconField icon={<Lock size={18}/>} label="New Password">
                  <input type="password" name="Password" value={form.Password} onChange={handleChange} className="modern-input" placeholder="••••••••" />
                </IconField>
              </div>
            </div>

            {/* CHANNEL DETAILS CARD */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <SectionHeader title="Channel Statistics" />
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <IconField icon={<Tag size={18}/>} label="Category">
                    <input name="Category" value={form.Category} onChange={handleChange} className="modern-input" />
                  </IconField>
                  <IconField icon={<MapPin size={18}/>} label="Location">
                    <input name="Location" value={form.Location} onChange={handleChange} className="modern-input" />
                  </IconField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <IconField icon={<Users size={18}/>} label="Followers">
                    <input type='number' name="Followers" value={form.Followers} onChange={handleChange} className="modern-input" />
                  </IconField>
                  <IconField icon={<IndianRupee size={18}/>} label="Price (per post)">
                    <input type="number" name="Price" value={form.Price} onChange={handleChange} className="modern-input" />
                  </IconField>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIAL LINKS CARD - FULL WIDTH */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <SectionHeader title="Social Media Presence" />
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <IconField icon={<Instagram className="text-pink-600" size={18}/>} label="Instagram">
                <input name="instagram" value={form.instagram} onChange={handleChange} className="modern-input" placeholder="@username" />
              </IconField>
              <IconField icon={<Youtube className="text-red-600" size={18}/>} label="YouTube">
                <input name="youtube" value={form.youtube} onChange={handleChange} className="modern-input" placeholder="Channel URL" />
              </IconField>
              
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            disabled={updating}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
              updating 
                ? "bg-slate-400 cursor-not-allowed text-white" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
            }`}
          >
            {updating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save size={20} /> Save All Changes</>
            )}
          </button>
        </form>
      </main>

      {/* Global CSS for inputs - add this in your index.css or a style tag */}
      <style>{`
        .modern-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #f1f5f9;
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
        }
        .modern-input:focus {
          background-color: white;
          border-color: #6366f1;
          box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.15);
        }
      `}</style>
    </div>
  );
};

/* ===== UI COMPONENT HELPERS ===== */
const SectionHeader = ({ title }) => (
  <div className="border-l-4 border-indigo-600 pl-4 mb-4">
    <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
  </div>
);

const IconField = ({ label, icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wide ml-1">
      {icon} {label}
    </label>
    {children}
  </div>
);

export default InfluencerEditProfile;