import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const InfluencerEditProfile = () => {
  const influencerId = localStorage.getItem("influencerId");

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    Name: "",
    Category: "",
    Location: "",
    Followers: "",
    Price: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  });

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (!influencerId) {
      alert("Influencer not logged in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/influencer/${influencerId}`
        );

        const data = res.data.data;

        setForm({
          Name: data.Name || "",
          Category: data.Category || "",
          Location: data.Location || "",
          Followers: data.Followers || "",
          Price: data.Price || "",
          instagram: data.AccountLinks?.instagram || "",
          youtube: data.AccountLinks?.youtube || "",
          linkedin: data.AccountLinks?.linkedin || "",
        });

        setPreview(data.ProfilePicture || "");
      } catch (err) {
        alert("Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [influencerId]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      // 👇 EXACT keys like Postman
      fd.append("Name", form.Name);
      fd.append("Category", form.Category);
      fd.append("Location", form.Location);
      fd.append("Followers", form.Followers);
      fd.append("Price", form.Price);
      fd.append(
        "AccountLinks",
        JSON.stringify({
          instagram: form.instagram,
          youtube: form.youtube,
          linkedin: form.linkedin,
        })
      );

      if (image) {
        fd.append("ProfilePicture", image);
      }

      const res = await axios.put(
        `http://localhost:8080/api/influencer/${influencerId}`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", res.data);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
        <Link to="/homepage" className="text-indigo-600 font-medium mb-4 inline-block">
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Influencer Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            {preview && (
              <img
                src={preview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border mb-3"
              />
            )}
            <input type="file" onChange={handleImageChange} />
          </div>

          {/* INPUTS */}
          <input
            name="Name"
            value={form.Name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded-lg"
          />

          <input
            name="Category"
            value={form.Category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-2 rounded-lg"
          />

          <input
            name="Location"
            value={form.Location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="number"
            name="Followers"
            value={form.Followers}
            onChange={handleChange}
            placeholder="Followers"
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="number"
            name="Price"
            value={form.Price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded-lg"
          />

          <input
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            placeholder="Instagram URL"
            className="w-full border p-2 rounded-lg"
          />

          <input
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
            placeholder="YouTube URL"
            className="w-full border p-2 rounded-lg"
          />

          

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfluencerEditProfile;
