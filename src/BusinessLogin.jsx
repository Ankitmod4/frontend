import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Building2, ArrowRight, Loader2, ShieldCheck, UserCircle } from "lucide-react";

const BusinessLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: ""
  });

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/business/login",
        formData
      );

      if (res.data.success) {
        localStorage.setItem("businessId", res.data.data.id);
        localStorage.setItem("business", JSON.stringify(res.data.data));
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
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-500">
          
          {/* Header Section */}
          <div className="bg-blue-600 p-8 text-white text-center relative">
            <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md">
              <Building2 size={32} />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Welcome Back</h2>
            <p className="text-blue-100/80 text-sm mt-1 font-medium">Manage your business partnerships</p>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                {/* Email Field */}
                <div className="relative group">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    Business Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      type="email"
                      name="Email"
                      placeholder="name@company.com"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium text-slate-700"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      type="password"
                      name="Password"
                      placeholder="••••••••"
                      value={formData.Password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl ${
                  loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>Login to Dashboard <ArrowRight size={20} /></>
                )}
              </button>
            </form>

            {/* Links Section */}
            <div className="mt-10 space-y-6">
              <div className="text-center">
                <p className="text-slate-500 text-sm font-medium">
                  Don’t have an account?{" "}
                  <Link to="/" className="text-blue-600 hover:text-blue-700 font-bold ml-1 transition-colors">
                    Create One
                  </Link>
                </p>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Other Roles</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/influencer/auth"
                  className="flex items-center justify-center gap-2 py-3 px-2 bg-purple-50 text-purple-600 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors"
                >
                  <UserCircle size={16} /> Influencer Login
                </Link>
                <Link
                  to="/admin/login"
                  className="flex items-center justify-center gap-2 py-3 px-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
                >
                  <ShieldCheck size={16} /> Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;