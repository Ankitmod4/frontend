import React from "react";

const InfluencerFilters = ({ filters, setFilters, layout = "vertical" }) => {
  // ✅ UPDATED CATEGORIES
  const categories = [
    "Fashion", "Beauty", "Lifestyle", "Travel", "Food", "Fitness", 
    "Tech", "Finance", "Business", "Education", "Entertainment", 
    "Gaming", "Health", "Parenting", "Automobile"
  ];

  // ✅ UPDATED FOLLOWER SLABS
  const followerRanges = [
    { label: "1K-10K", value: "1-10" },
    { label: "10K-50K", value: "10-50" },
    { label: "50K-100K", value: "50-100" },
    { label: "100K-500K", value: "100-500" },
    { label: "500K-1M", value: "500-1000" },
    { label: "1M+", value: "1000+" },
  ];

  const budgetRanges = [
    { label: "Under 5K", value: "0-5" },
    { label: "5K-15K", value: "5-15" },
    { label: "15K-50K", value: "15-50" },
    { label: "50K+", value: "50+" },
  ];

  /* ✅ MULTI CATEGORY TOGGLE */
  const toggleCategory = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleToggle = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
  };

  const isHorizontal = layout === "horizontal";

  return (
    <div className={`flex ${isHorizontal ? "flex-row items-center gap-6 justify-between" : "flex-col gap-6"} bg-white p-4 rounded-2xl shadow-sm border border-gray-100`}>

      {/* CATEGORY (MULTI SELECT) */}
      <div className={isHorizontal ? "flex-[2] min-w-[250px]" : ""}>
        <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">
          Influencer Categories
        </p>

        <div className={`flex gap-2 overflow-x-auto no-scrollbar ${isHorizontal ? "pb-1" : "flex-wrap"}`}>
          {categories.map((cat) => {
            const active = filters.category.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-300 whitespace-nowrap ${
                  active
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOLLOWERS SLABS */}
      <div className={isHorizontal ? "flex-[1.5] min-w-[300px] border-l border-gray-100 pl-6" : ""}>
        <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Follower Count</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {followerRanges.map((f) => (
            <button
              key={f.value}
              onClick={() => handleToggle("followers", f.value)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                filters.followers === f.value
                  ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* BUDGET */}
      <div className={isHorizontal ? "flex-1 min-w-[200px] border-l border-gray-100 pl-6" : ""}>
        <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Budget</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {budgetRanges.map((b) => (
            <button
              key={b.value}
              onClick={() => handleToggle("budget", b.value)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                filters.budget === b.value
                  ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-100"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* LOCATION & RESET */}
      <div className={`flex items-end gap-4 ${isHorizontal ? "border-l border-gray-100 pl-6" : ""}`}>
        <div className="w-40">
          <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Location</p>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Mumbai"
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-400 transition-all font-medium"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />
          </div>
        </div>

        <button
          onClick={() =>
            setFilters({ category: [], city: "", followers: "", budget: "" })
          }
          className="h-[40px] px-3 text-[10px] font-black text-red-400 hover:text-red-600 uppercase transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default InfluencerFilters;