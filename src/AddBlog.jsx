import React, { useState } from "react";
import axios from "axios";

const AddBlog = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Image state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("Title, content, and image are required ❌");
      return;
    }

    setLoading(true);

    // FormData ka use karna zaroori hai file upload ke liye
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image); // Backend mein 'image' key se access hoga

    try {
      await axios.post("https://influencal.influencialhub.com/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset Form
      setTitle("");
      setContent("");
      setImage(null);
      e.target.reset(); // File input clear karne ke liye

      alert("Blog with image added successfully ✅");
      if (onBlogAdded) onBlogAdded();
    } catch (error) {
      console.error(error);
      alert("Failed to add blog ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-10">
      <h2 className="text-xl font-bold mb-4">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <textarea
          rows="6"
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Image Input Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Upload Header Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Uploading..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;