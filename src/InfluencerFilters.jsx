import React from "react";

const InfluencerFilters = ({ filters, setFilters, layout = "vertical" }) => {
  const categories = ["Fashion", "Tech", "Lifestyle", "Food", "Travel", "Fitness", "Education"];

  const followerRanges = [
    { label: "1K-10K", value: "1-10" },
    { label: "10K-50K", value: "10-50" },
    { label: "50K-100K", value: "50-100" },
    { label: "100K+", value: "100+" },
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
    <div className={`flex ${isHorizontal ? "flex-row items-center gap-6 justify-between" : "flex-col gap-6"}`}>

      {/* CATEGORY (MULTI SELECT) */}
      <div className={isHorizontal ? "flex-1 min-w-[150px]" : ""}>
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
          Category (Multiple)
        </p>

        <div className={`flex gap-2 overflow-x-auto no-scrollbar ${isHorizontal ? "pb-1" : "flex-wrap"}`}>
          {categories.map((cat) => {
            const active = filters.category.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
                  active
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOLLOWERS */}
      <div className={isHorizontal ? "flex-1 min-w-[200px] border-l border-gray-100 pl-4" : ""}>
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Followers</p>
        <div className="flex gap-2">
          {followerRanges.map((f) => (
            <button
              key={f.value}
              onClick={() => handleToggle("followers", f.value)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                filters.followers === f.value
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* BUDGET */}
      <div className={isHorizontal ? "flex-1 min-w-[200px] border-l border-gray-100 pl-4" : ""}>
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Budget</p>
        <div className="flex gap-2">
          {budgetRanges.map((b) => (
            <button
              key={b.value}
              onClick={() => handleToggle("budget", b.value)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                filters.budget === b.value
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* LOCATION */}
      <div className={isHorizontal ? "w-48 border-l border-gray-100 pl-4" : ""}>
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Location</p>
        <input
          type="text"
          placeholder="Search City..."
          className="w-full text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-400"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
      </div>

      {/* RESET */}
      <div className={isHorizontal ? "border-l border-gray-100 pl-4" : ""}>
        <button
          onClick={() =>
            setFilters({ category: [], city: "", followers: "", budget: "" })
          }
          className="text-[10px] font-bold text-red-500 hover:underline uppercase"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default InfluencerFilters;
