import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Building2, Mail, Phone, Lock, ArrowLeft, Save, Loader2 } from "lucide-react";

const EditBusinessProfile = () => {
  const businessId = localStorage.getItem("businessId");

  const [formData, setFormData] = useState({
    BusinessName: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/business/${businessId}`);
        const data = res.data.data;
        setFormData({
          BusinessName: data.BusinessName || "",
          Email: data.Email || "",
          PhoneNumber: data.PhoneNumber || "",
          Password: data.Password || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    if (businessId) fetchProfile();
  }, [businessId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const payload = {};
    if (formData.BusinessName.trim()) payload.BusinessName = formData.BusinessName.trim();
    if (formData.Email.trim()) payload.Email = formData.Email.trim();
    if (formData.PhoneNumber.trim()) payload.PhoneNumber = formData.PhoneNumber.trim();
    if (formData.Password.trim()) payload.Password = formData.Password.trim();

    try {
      await axios.put(`/api/business/${businessId}`, payload);
      alert("Profile Updated Successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Update Failed ❌");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Synchronizing Business Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        {/* HEADER AREA */}
        <div className="bg-indigo-600 p-8 text-white relative">
          <Link
            to="/homepage"
            className="absolute top-8 left-6 md:left-8 flex items-center text-indigo-100 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          
          <div className="text-center mt-4">
            <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
              <Building2 size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Business Profile</h2>
            <p className="text-indigo-100/80 text-sm mt-1">Manage your corporate identity and credentials</p>
          </div>
        </div>

        {/* FORM AREA */}
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
          
          <div className="grid grid-cols-1 gap-6">
            
            {/* BUSINESS NAME */}
            <InputWrapper label="Business Name" icon={<Building2 size={18} />}>
              <input
                type="text"
                name="BusinessName"
                value={formData.BusinessName}
                onChange={handleChange}
                placeholder="Google LLC"
                className="business-input"
              />
            </InputWrapper>

            {/* EMAIL */}
            <InputWrapper label="Official Email" icon={<Mail size={18} />}>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                placeholder="contact@business.com"
                className="business-input"
              />
            </InputWrapper>

            {/* PHONE NUMBER */}
            <InputWrapper label="Phone Number" icon={<Phone size={18} />}>
              <input
                type="tel"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                required
                pattern="[6-9]{1}[0-9]{9}"
                maxLength={10}
                placeholder="9876543210"
                className="business-input"
              />
            </InputWrapper>

            {/* PASSWORD */}
            <InputWrapper label="Account Password" icon={<Lock size={18} />}>
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
                maxLength={20}
                placeholder="••••••••"
                className="business-input"
              />
            </InputWrapper>

          </div>

          {/* ACTION BUTTON */}
          <button
            type="submit"
            disabled={updating}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-4 shadow-xl ${
              updating
                ? "bg-slate-300 cursor-not-allowed text-slate-500"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
            }`}
          >
            {updating ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Updating...
              </>
            ) : (
              <>
                <Save size={20} /> Save Changes
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        .business-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          background-color: #f1f5f9;
          border: 2px solid transparent;
          border-radius: 1rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #1e293b;
          transition: all 0.2s ease;
          outline: none;
        }
        .business-input:focus {
          background-color: white;
          border-color: #6366f1;
          box-shadow: 0 4px 12px -2px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </div>
  );
};

/* FIELD HELPER */
const InputWrapper = ({ label, icon, children }) => (
  <div className="flex flex-col gap-1.5 relative">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative flex items-center">
      <div className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        {icon}
      </div>
      {children}
    </div>
  </div>
);

export default EditBusinessProfile;