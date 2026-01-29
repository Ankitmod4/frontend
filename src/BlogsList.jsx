import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, BookOpen, Clock, LayoutDashboard, Calendar, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("role") === "admin";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/blogs");
      // Console ke hisaab se: res.data.data array hai
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
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  // Date format karne ke liye helper function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
        <div className="text-center mb-16 space-y-4">
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            The Community Feed
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Latest <span className="text-indigo-600">Insights</span>
          </h1>
        </div>

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
                className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/40"
              >
                {/* IMAGE SECTION - Using 'blog.image' as per your console */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-100">
                  {blog.image ? (
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                      <ImageIcon size={48} strokeWidth={1} />
                      <span className="text-xs font-bold mt-2">No Image Uploaded</span>
                    </div>
                  )}
                  
                  {/* Category Tag (Optional) */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black text-indigo-600 uppercase">
                      Technology
                    </span>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="p-6 sm:p-10">
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
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      {blog.title}
                    </h2>
                    
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-50">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12}/> {formatDate(blog.createdAt)}
                      </span>
                     
                    </div>

                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed line-clamp-3 pt-2">
                      {blog.content}
                    </p>
                    
                  
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsList;