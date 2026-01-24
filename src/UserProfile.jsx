import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EditBusinessProfile = () => {
  const businessId = localStorage.getItem("businessId");

  const [formData, setFormData] = useState({
    BusinessName: "",
    Email: "",
    PhoneNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


 


  // 🔹 FETCH PROFILE (GET)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/business/${businessId}`
        );

        setFormData({
          BusinessName: res.data.data.BusinessName || "",
          Email: res.data.data.Email || "",
          PhoneNumber: res.data.data.PhoneNumber || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    if (businessId) {
      fetchProfile();
    } else {
      alert("Business ID not found ❌");
      setLoading(false);
    }
  }, [businessId]);

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 UPDATE PROFILE (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    // send only non-empty fields
    const payload = {};
    if (formData.BusinessName.trim())
      payload.BusinessName = formData.BusinessName.trim();
    if (formData.Email.trim()) payload.Email = formData.Email.trim();
    if (formData.PhoneNumber.trim())
      payload.PhoneNumber = formData.PhoneNumber.trim();

    try {
      await axios.put(
        `http://localhost:8080/api/business/${businessId}`,
        payload
      );

      alert("Profile Updated Successfully ✅");
      setFormData({
        BusinessName: "",
        Email: "",
        PhoneNumber: "",
      });
      
    } catch (error) {
      console.error(error);
      alert("Update Failed ❌");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <Link
          to="/homepage"
          className="text-indigo-600 font-medium mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Business Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Business Name</label>
            <input
              type="text"
              name="BusinessName"
              value={formData.BusinessName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
<div>
  <label className="text-sm font-medium">Email</label>
  <input
    type="text"
    name="Email"
    value={formData.Email}
    onChange={handleChange}
    required
    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    title="Please enter a valid email like example@gmail.com"
    placeholder="example@gmail.com"
    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  />
</div>


        <div>
  <label className="text-sm font-medium">Phone Number</label>
  <input
    type="tel"
    name="PhoneNumber"
    value={formData.PhoneNumber}
    onChange={handleChange}
    required
    pattern="[6-9]{1}[0-9]{9}"
    maxLength={10}
    title="Enter valid 10-digit Indian mobile number"
    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  />
</div>


          <button
            type="submit"
            disabled={updating}
            className={`w-full py-2 rounded-lg text-white transition ${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusinessProfile;
