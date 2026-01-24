import React, { useState } from "react";
import axios from "axios";

const AddBlog = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content required ❌");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/blogs", {
        title,
        content,
      });

      setTitle("");
      setContent("");

      alert("Blog added successfully ✅");

      if (onBlogAdded) onBlogAdded();
    } catch (error) {
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

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
