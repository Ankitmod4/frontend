import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, BookOpen, Clock, LayoutDashboard, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("role") === "admin";
  useEffect(() => {
    window.scrollTo(0, 0);
   
  }, []);
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/blogs");
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete kar dein?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      alert("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse">Loading Stories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-4 sm:px-6">
      
      {/* FLOATING ADMIN DASHBOARD BUTTON */}
      {isAdmin && (
        <Link 
          to="/admin/dashboard" 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl hover:bg-indigo-600 transition-all duration-300 active:scale-95 border border-slate-700"
        >
          <LayoutDashboard size={18} />
          <span className="text-sm font-bold hidden sm:inline">Admin Panel</span>
        </Link>
      )}

      <div className="max-w-3xl mx-auto">
        {/* PAGE HEADER */}
        <div className="text-center mb-16 space-y-4">
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            The Community Feed
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Latest <span className="text-indigo-600">Insights</span>
          </h1>
          <p className="text-slate-500 max-w-md mx-auto font-medium">
            Explore stories, tutorials, and news from our top creators.
          </p>
        </div>

        {/* BLOGS CONTAINER */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] py-24 text-center border-2 border-dashed border-slate-100">
            <BookOpen className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-bold italic text-lg">No stories posted yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group bg-white rounded-[2.5rem] border border-slate-100 p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/40"
              >
                {/* META INFO */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
                      {blog.title.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-none">Influencial Hub</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Official Author</p>
                    </div>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                {/* CONTENT SECTION */}
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {blog.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-50">
                    <span className="flex items-center gap-1.5"><Calendar size={12}/> Jan 2026</span>
                  </div>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-line pt-2">
                    {blog.content}
                  </p>
                </div>

                {/* BOTTOM DECOR (Optional) */}
                <div className="mt-8 flex items-center gap-2">
                   <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
                   <div className="h-1 w-2 bg-slate-100 rounded-full"></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        body { background-color: #fcfcfd; }
      `}</style>
    </div>
  );
};

export default BlogsList;