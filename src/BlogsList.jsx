import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, BookOpen, Clock } from "lucide-react"; // Modern Icons
import { Link } from "react-router-dom";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("role") === "admin";

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
    if (!window.confirm("Kyan aap is blog ko delete karna chahte hain?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      alert("Failed to delete blog ❌");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Fetching latest stories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
{/* Admin Dashboard Link - Only visible to Admins */}
        <Link to="/admin/dashboard" className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 font-medium border border-gray-700 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Admin Dashboard
        </Link>
{isAdmin && (
  <div className="fixed bottom-8 right-8 z-50">
    <Link 
      to="/admin/dashboard" 
      className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-2xl hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 font-medium border border-gray-700"
    >
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      Admin Dashboard
    </Link>
  </div>
)}      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our <span className="text-blue-600">Feed</span>
            </h1>
            <p className="mt-2 text-gray-600">Discover interesting ideas and news.</p>
          </div>
          <div className="hidden sm:block">
             <BookOpen className="w-10 h-10 text-blue-100" />
          </div>
        </div>

        {/* Blog Cards */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg italic">Abhi koi blog nahi mila...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>
                    <div className="flex items-center mt-2 text-gray-400 text-xs space-x-3">
                      
                      
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        Article
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="ml-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none whitespace-pre-line">
                    {blog.content}
                  </p>
                </div>

                <div className="mt-6 flex items-center">
                   <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {blog.title.charAt(0)}
                   </div>
                   <span className="ml-2 text-sm font-medium text-gray-700">Author Name</span>
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