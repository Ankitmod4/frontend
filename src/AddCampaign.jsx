import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, PlusCircle, Briefcase, Users, 
  Globe, Calendar, IndianRupee, MapPin, Mail, AlignLeft 
} from "lucide-react";

const AddCampaign = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    influencerType: "",
    platformType: "",
    startDate: "",
    endDate: "",
    budget: "",
    location: "",
    email: "",
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/addcampaign",
        formData
      );

      if (res.data.success) {
        alert("Campaign added successfully ✅");
        setFormData({
          campaignName: "", influencerType: "", platformType: "",
          startDate: "", endDate: "", budget: "",
          location: "", email: "", details: "",
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* BACK LINK */}
        <Link
          to="/homepage"
          className="group flex items-center text-slate-500 hover:text-indigo-600 font-semibold mb-8 transition-colors w-fit"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        {/* HEADER */}
        <div className="mb-10 flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
            <PlusCircle className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Campaign</h1>
            <p className="text-slate-500 font-medium">Launch a new collaboration for your brand.</p>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
            
            {/* SECTION 1: CAMPAIGN BASICS */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Briefcase size={18} className="text-indigo-600" />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Campaign Name" icon={<Briefcase size={18}/>}>
                  <input
                    type="text"
                    name="campaignName"
                    placeholder="e.g. Summer Glow Up"
                    value={formData.campaignName}
                    onChange={handleChange}
                    className="modern-input"
                    required
                  />
                </InputGroup>

                <InputGroup label="Platform" icon={<Globe size={18}/>}>
                  <select
                    name="platformType"
                    value={formData.platformType}
                    onChange={handleChange}
                    className="modern-input appearance-none"
                    required
                  >
                    <option value="">Select Platform</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </InputGroup>

                <InputGroup label="Influencer Tier" icon={<Users size={18}/>}>
                  <select
                    name="influencerType"
                    value={formData.influencerType}
                    onChange={handleChange}
                    className="modern-input appearance-none"
                    required
                  >
                    <option value="">Select Tier</option>
                    <option value="Nano">Nano (1k-10k)</option>
                    <option value="Micro">Micro (10k-100k)</option>
                    <option value="Macro">Macro (100k+)</option>
                  </select>
                </InputGroup>

                <InputGroup label="Contact Email" icon={<Mail size={18}/>}>
                  <input
                    type="email"
                    name="email"
                    placeholder="brand@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="modern-input"
                    required
                  />
                </InputGroup>
              </div>
            </div>

            {/* SECTION 2: BUDGET & LOGISTICS */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Calendar size={18} className="text-indigo-600" />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Logistics & Budget</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <InputGroup label="Start Date" icon={<Calendar size={18}/>}>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="modern-input" required />
                  </InputGroup>
                </div>
                <div className="lg:col-span-1">
                  <InputGroup label="End Date" icon={<Calendar size={18}/>}>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="modern-input" required />
                  </InputGroup>
                </div>
                <div className="lg:col-span-1">
                  <InputGroup label="Budget (₹)" icon={<IndianRupee size={18}/>}>
                    <input type="number" name="budget" placeholder="5000" value={formData.budget} onChange={handleChange} className="modern-input" required />
                  </InputGroup>
                </div>
                <div className="lg:col-span-1">
                  <InputGroup label="Location" icon={<MapPin size={18}/>}>
                    <input type="text" name="location" placeholder="e.g. Mumbai" value={formData.location} onChange={handleChange} className="modern-input" required />
                  </InputGroup>
                </div>
              </div>
            </div>

            {/* SECTION 3: DETAILS */}
            <div className="space-y-6">
              <InputGroup label="Campaign Description" icon={<AlignLeft size={18}/>}>
                <textarea
                  name="details"
                  placeholder="Tell influencers what this campaign is about..."
                  value={formData.details}
                  onChange={handleChange}
                  rows="4"
                  className="modern-input resize-none"
                  required
                ></textarea>
              </InputGroup>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-[1.5rem] font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isSubmitting 
                ? "bg-slate-400 cursor-not-allowed text-white" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
              }`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Launch Campaign <PlusCircle size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* GLOBAL CSS FOR INPUTS */}
      <style>{`
        .modern-input {
          width: 100%;
          padding: 0.85rem 1rem;
          background-color: #f1f5f9;
          border: 2px solid transparent;
          border-radius: 1rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #1e293b;
          transition: all 0.2s ease;
          outline: none;
        }
        .modern-input:focus {
          background-color: white;
          border-color: #6366f1;
          box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.12);
        }
        .modern-input::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

/* HELPERS */
const InputGroup = ({ label, icon, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wider ml-1">
      {icon} {label}
    </label>
    {children}
  </div>
);

export default AddCampaign;