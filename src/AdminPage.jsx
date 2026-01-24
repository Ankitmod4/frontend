import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { LogOut, Users, Star, ArrowLeft } from "lucide-react"; // Icons for better UI
import AddBlog from "./AddBlog";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchInfluencers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/users");
      setUsers(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchInfluencers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/influencers");
      setInfluencers(res.data.data);
    } catch (err) { console.error(err); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`http://localhost:8080/api/admin/user/${id}`);
    fetchUsers();
  };

  const deleteInfluencer = async (id) => {
    if (!window.confirm("Delete this influencer?")) return;
    await axios.delete(`http://localhost:8080/api/admin/influencer/${id}`);
    fetchInfluencers();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b px-4 py-4 mb-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
            Admin Dashboard
          </h1>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              to="/blogs" 
              className="flex-1 sm:flex-none text-center text-sm font-medium text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg border border-gray-200"
            >
              View Blogs
            </Link>
            <button 
              onClick={handleLogout}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
            >
              <LogOut size={16} /> LOGOUT
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tabs Selection */}
        <div className="flex bg-gray-200 p-1 rounded-xl mb-8 w-full sm:w-max">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "users" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users size={18} /> Users
          </button>
          <button
            onClick={() => setActiveTab("influencers")}
            className={`flex items-center gap-2 flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "influencers" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Star size={18} /> Influencers
          </button>
        </div>

        {/* Dynamic Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto"> {/* Enable horizontal scroll for small screens */}
            {activeTab === "users" ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase">
                    <th className="p-4 font-semibold">Business Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
                    <th className="p-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{u.BusinessName}</td>
                      <td className="p-4 text-gray-600 text-sm">{u.Email}</td>
                      <td className="p-4 text-gray-600 text-sm hidden md:table-cell">{u.PhoneNumber}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider p-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold hidden sm:table-cell">Email</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Followers</th>
                    <th className="p-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {influencers.map((inf) => (
                    <tr key={inf.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{inf.Name}</td>
                      <td className="p-4 text-gray-600 text-sm hidden sm:table-cell">{inf.Email}</td>
                      <td className="p-4 text-gray-600 text-sm italic">{inf.Category}</td>
                      <td className="p-4 text-gray-600 text-sm font-mono">{inf.Followers}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteInfluencer(inf.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider p-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Empty State */}
          {((activeTab === "users" && users.length === 0) || (activeTab === "influencers" && influencers.length === 0)) && (
            <div className="p-12 text-center text-gray-400 italic">
              No records found.
            </div>
          )}
        </div>

        {/* Add Blog Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Publish New Update</h2>
            <AddBlog />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;