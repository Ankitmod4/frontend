import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  LogOut, Users, Star, Search, X, Trash2, 
  LayoutDashboard, FileText, ChevronRight, BarChart3 
} from "lucide-react";
import AddBlog from "./AddBlog";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchInfluencers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/users");
      setUsers(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchInfluencers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/influencers");
      setInfluencers(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Bhai, kya sach mein is user ko udaana hai?")) return;
    await axios.delete(`http://localhost:8080/api/admin/user/${id}`);
    fetchUsers();
  };

  const deleteInfluencer = async (id) => {
    if (!window.confirm("Influencer delete karein?")) return;
    await axios.delete(`http://localhost:8080/api/admin/influencer/${id}`);
    fetchInfluencers();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const filteredUsers = users.filter((u) =>
    `${u.BusinessName} ${u.Email} ${u.PhoneNumber || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredInfluencers = influencers.filter((inf) =>
    `${inf.Name} ${inf.Email} ${inf.Category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-20">
      {/* ================= MODERN NAVBAR ================= */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white">
              <LayoutDashboard size={24} />
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Admin<span className="text-indigo-600">Console</span></h1>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/blogs" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <FileText size={16} /> Public Feed
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all active:scale-95"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        {/* ================= SUMMARY STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Businesses" count={users.length} icon={<Users className="text-blue-600"/>} color="bg-blue-50" />
          <StatCard title="Total Influencers" count={influencers.length} icon={<Star className="text-amber-600"/>} color="bg-amber-50" />
        </div>

        {/* ================= TABS & SEARCH ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
            <TabButton 
              active={activeTab === "users"} 
              onClick={() => setActiveTab("users")} 
              icon={<Users size={18} />} 
              label="Businesses" 
            />
            <TabButton 
              active={activeTab === "influencers"} 
              onClick={() => setActiveTab("influencers")} 
              icon={<Star size={18} />} 
              label="Influencers" 
            />
          </div>

          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-medium text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ================= TABLE AREA ================= */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Details</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Stats / Info</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeTab === "users" ? (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-5 font-bold text-slate-700">{u.BusinessName}</td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-medium text-slate-600">{u.Email}</div>
                        <div className="text-xs text-slate-400">{u.PhoneNumber}</div>
                      </td>
                      <td className="px-6 py-5 text-xs font-bold text-indigo-600 uppercase tracking-wider">Business Partner</td>
                      <td className="px-6 py-5 text-center">
                        <DeleteButton onClick={() => deleteUser(u.id)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredInfluencers.map((inf) => (
                    <tr key={inf.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-5 font-bold text-slate-700">{inf.Name}</td>
                      <td className="px-6 py-5 text-sm text-slate-500 font-medium">{inf.Email}</td>
                      <td className="px-6 py-5">
                        <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-bold">{inf.Category}</span>
                        <div className="text-[10px] text-slate-400 mt-1 font-black">{inf.Followers} Followers</div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <DeleteButton onClick={() => deleteInfluencer(inf.id)} />
                      </td>
                    </tr>
                  ))
                )}
                {((activeTab === "users" && filteredUsers.length === 0) || (activeTab === "influencers" && filteredInfluencers.length === 0)) && (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                         <div className="bg-slate-50 p-4 rounded-full text-slate-300"><Search size={40}/></div>
                         <p className="text-slate-400 font-bold italic">Bhai, koi record nahi mila...</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= BLOG PUBLISH SECTION ================= */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#fcfcfd] px-6 text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Editor Portal</span>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-50 -z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-100"><FileText size={20}/></div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Write & Publish</h2>
            </div>
            <AddBlog />
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- MINI COMPONENTS --- */
const StatCard = ({ title, count, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all">
    <div className="space-y-1">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</p>
      <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{count}</h3>
    </div>
    <div className={`p-4 ${color} rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-black transition-all ${
      active ? "bg-white text-indigo-600 shadow-lg shadow-slate-200/50" : "text-slate-500 hover:text-slate-700"
    }`}
  >
    {icon} {label}
  </button>
);

const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
  >
    <Trash2 size={18} />
  </button>
);

export default AdminPage;