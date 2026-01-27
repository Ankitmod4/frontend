import React, { useState ,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Building2, Mail, Phone, Lock, UserPlus, ArrowRight, Loader2, ShieldCheck, UserCircle } from "lucide-react";

const BusinessSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    BusinessName: "",
    Email: "",
    PhoneNumber: "",
    Password: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.Email)) {
    alert("Bhai, sahi Email address dalo! 📧");
    return;
  }

  // 2. Phone Number Validation (Only 10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(formData.PhoneNumber)) {
    alert("Mobile number sahi nahi hai (10 digits starting with 6-9)! 📱");
    return;
  }

  // 3. Password Length
  if (formData.Password.length < 6) {
    alert("Password kam se kam 6 characters ka hona chahiye! 🔐");
    return;
  }
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/business/register",
        formData
      );

      if (res.data.success) {
        localStorage.setItem("businessId", res.data.data.id);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");

        navigate("/homepage");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-500">
          
          {/* Header Section */}
          <div className="bg-blue-600 p-8 text-white text-center">
            <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md">
              <UserPlus size={32} />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Grow with Us</h2>
            <p className="text-blue-100/80 text-sm mt-1 font-medium">Create your business presence today</p>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Business Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Business Identity</label>
                <div className="relative flex items-center group">
                  <Building2 className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input
                    type="text"
                    name="BusinessName"
                    placeholder="e.g. Acme Corporation"
                    value={formData.BusinessName}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium text-slate-700"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                <div className="relative flex items-center group">
                  <Mail className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input
                    type="email"
                    name="Email"
                    placeholder="contact@business.com"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium text-slate-700"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                <div className="relative flex items-center group">
                  <Phone className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input
                    type="text"
                    name="PhoneNumber"
                    placeholder="98765 43210"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium text-slate-700"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Security</label>
                <div className="relative flex items-center group">
                  <Lock className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input
                    type="password"
                    name="Password"
                    placeholder="••••••••"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium text-slate-700"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-4 shadow-xl ${
                  loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>Create Account <ArrowRight size={20} /></>
                )}
              </button>
            </form>

            {/* Links Footer */}
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <p className="text-slate-500 text-sm font-medium">
                  Already a partner?{" "}
                  <Link to="/business/login" className="text-blue-600 hover:text-blue-700 font-bold ml-1 transition-colors">
                    Log In
                  </Link>
                </p>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-4 text-slate-400 font-black tracking-[0.2em]">Explore More</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/influencer/auth"
                  className="flex items-center justify-center gap-2 py-3 px-2 bg-purple-50 text-purple-600 rounded-2xl text-[11px] font-bold hover:bg-purple-100 transition-colors"
                >
                  <UserCircle size={14} /> Influencer Login
                </Link>
                <Link
                  to="/admin/login"
                  className="flex items-center justify-center gap-2 py-3 px-2 bg-red-50 text-red-600 rounded-2xl text-[11px] font-bold hover:bg-red-100 transition-colors"
                >
                  <ShieldCheck size={14} /> Admin Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;