import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, Mail, Lock, LogIn, Loader2, Building2, UserCircle } from "lucide-react";

const AdminLogin = () => {
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

  // --- Professional Validation Logic ---
  const validateForm = () => {
    const { Email, Password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!Email.trim() || !Password.trim()) {
      alert("Bhai, saari fields bharna zaroori hai! ✍️");
      return false;
    }

    if (!emailRegex.test(Email)) {
      alert("Admin email sahi format mein dalo! 📧");
      return false;
    }

    if (Password.length < 6) {
      alert("Password kam se kam 6 characters ka hona chahiye! 🔐");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pehle frontend validation check karega
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "https://influencal.influencialhub.com/api/admin/login",
        formData
      );

      if (res.data.success) {
        alert("Admin login successful ✅");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      // Edge Case: Check if server is down or wrong credentials
      const errorMsg = error.response?.data?.message || "Invalid admin credentials or Server Error ❌";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-10 animate-in fade-in zoom-in duration-500">
          
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-red-50 rounded-3xl mb-4 border border-red-100">
              <ShieldCheck size={40} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Admin Portal</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Restricted Administrative Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                  Security ID / Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-slate-300 group-focus-within:text-red-600 transition-colors" size={18} />
                  <input
                    name="Email"
                    type="email"
                    placeholder="admin@system.com"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-medium text-slate-700"
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                  Verification Key
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-slate-300 group-focus-within:text-red-600 transition-colors" size={18} />
                  <input
                    name="Password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.Password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl ${
                loading
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-red-100"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>Authorize Access <LogIn size={20} /></>
              )}
            </button>
          </form>

          {/* Role Switch Section remained same */}
          <div className="mt-10">
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <span className="relative bg-white px-4 text-slate-400 tracking-tighter">Login as Partner</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link to="/business/login" className="flex items-center justify-center gap-2 py-3 px-2 bg-slate-50 text-slate-600 rounded-xl text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all border border-slate-100">
                <Building2 size={14} /> Business
              </Link>
              <Link to="/influencer/auth" className="flex items-center justify-center gap-2 py-3 px-2 bg-slate-50 text-slate-600 rounded-xl text-[11px] font-bold hover:bg-purple-600 hover:text-white transition-all border border-slate-100">
                <UserCircle size={14} /> Influencer
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
          System Security Version 2.0.4
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;