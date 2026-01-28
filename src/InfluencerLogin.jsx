import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Sparkles, ArrowRight, Loader2, Building2 } from "lucide-react";

const InfluencerLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Email: "",
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
    
    // Basic Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      alert("Bhai, sahi email toh daalo! 📧");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/influencer/login",
        formData
      );

      if (res.data.success) {
        localStorage.setItem("influencer", JSON.stringify(res.data.data));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "influencer");
        localStorage.setItem("influencerId", res.data.data.id);
        
        navigate("/homepage");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 relative overflow-hidden">
      {/* Soft Decorative Background Circles */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-100/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-500">
          
          {/* Top Section / Branding */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white text-center relative">
            <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md border border-white/30">
              <Sparkles size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Creator Login</h2>
            <p className="text-purple-100/80 text-sm mt-2 font-medium">Connect with top brands today</p>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-5">
                {/* Email Input */}
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                    <input
                      name="Email"
                      type="email"
                      placeholder="you@creator.com"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-600 transition-all outline-none font-medium text-slate-700"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    Security Key
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                    <input
                      name="Password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.Password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-600 transition-all outline-none font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Login Button */}
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
                  <>Continue to Hub <ArrowRight size={20} /></>
                )}
              </button>
            </form>

            {/* Bottom Links */}
            <div className="mt-10 space-y-6">
              <div className="text-center">
                <p className="text-slate-500 text-sm font-medium">
                  New to the hub?{" "}
                  <Link to="/influencer/signup" className="text-purple-600 hover:text-purple-700 font-bold ml-1 transition-colors">
                    Join Now
                  </Link>
                </p>
              </div>

              {/* Separator */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-white px-4 text-slate-300">Are you a brand?</span></div>
              </div>

              {/* Business Switcher */}
              <Link
                to="/business/login"
                className="flex items-center justify-center gap-3 w-full py-3.5 bg-slate-50 text-slate-600 rounded-2xl text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100"
              >
                <Building2 size={18} /> Switch to Business Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerLogin;