import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const InfluencerDetails = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfluencer();
  }, []);

  const fetchInfluencer = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/influencers/${id}`
      );

      if (res.data.success) {
        setInfluencer(res.data.data);
        console.log(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching influencer", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading influencer details...
      </div>
    );
  }

  if (!influencer) {
    return (
      <div className="text-center mt-20 text-red-500">
        Influencer not found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* 🔙 BACK */}
        <Link
          to="/homepage"
          className="text-indigo-600 font-medium mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* 🖼️ IMAGE (RESPONSIVE & SAFE) */}
 {/* 🖼️ FULL VIEW IMAGE SECTION */}
<div className="w-full bg-slate-100 flex justify-center py-6 px-4">
  {/* IMAGE WRAPPER */}
  <div
    className="
      w-full max-w-6xl 
      aspect-video 
      md:h-[500px] 
      bg-gray-900 
      relative 
      overflow-hidden
      rounded-[2rem]
      shadow-2xl
      flex items-center justify-center
    "
  >
    {/* Background Blur Effect (Optional: Isse fati hui image bhi premium lagti hai) */}
    <img
      src={influencer.ProfilePicture}
      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
      alt="background blur"
    />

    {/* MAIN IMAGE: Jo poori dikhegi */}
    <img
      src={influencer.ProfilePicture}
      alt={influencer.Name}
      className="
        relative z-10
        max-w-full max-h-full
        object-contain
      "
      loading="lazy"
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/1200x800?text=No+Image';
      }}
    />
  </div>
</div>



          {/* 📄 DETAILS */}
          <div className="p-6">
            <h1 className="text-3xl font-bold">
              {influencer.Name}
            </h1>

            <p className="text-gray-500 mt-1">
              {influencer.Category} • {influencer.Location}
            </p>

            {/* 📊 STATS */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-xl font-semibold">
                  {influencer.Followers.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-semibold text-indigo-600">
                  ₹{influencer.Price}
                </p>
              </div>
            </div>

            {/* 🔗 SOCIAL LINKS */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">
                Social Profiles
              </h3>

              <div className="flex gap-4 flex-wrap">
                {influencer.AccountLinks?.instagram && (
                  <a
                    href={influencer.AccountLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-600 underline"
                  >
                    Instagram
                  </a>
                )}

                {influencer.AccountLinks?.youtube && (
                  <a
                    href={influencer.AccountLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-600 underline"
                  >
                    YouTube
                  </a>
                )}

              </div>
            </div>

            {/* 🚀 CTA */}
          <button
  onClick={() => 
    window.location.href = `mailto:${influencer.Email}?subject=Collaboration%20Request&body=Hi%20${encodeURIComponent(
      influencer.Name
    )},%0A%0AI%20am%20interested%20in%20collaborating%20with%20you.%0A%0ARegards`
  }
  className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
>
  Contact Influencer
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetails;
