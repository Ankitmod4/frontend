import React from "react";
import { Routes, Route } from "react-router-dom";

import BusinessSignup from "./BusinessSignup.jsx";
import BusinessLogin from "./BusinessLogin.jsx";
import AdminLogin from "./Adminlogin.jsx";
import InfluencerSignup from "./InfluencerSignup.jsx";
import InfluencerLogin from "./InfluencerLogin.jsx";
import HomePage from "./HomePage.jsx";
import InfluencerDetails from "./InfluencerDetails.jsx";
import AddCampaign from "./AddCampaign.jsx";
import AllCampaigns from "./AllCampaign.jsx";
import AdminPage from "./AdminPage.jsx";
import UserProfile from "./UserProfile.jsx";
import InfluencerProfile from "./InfluencerProfile.jsx";
import AllInfluencers from "./AllInfluencers.jsx";
import Unauthorized from "./routes/Unauthorized.jsx";
import BlogsList from "./BlogsList.jsx";

import AdminRoute from "./routes/AdminRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const App = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<BusinessSignup />} />
      <Route path="/business/login" element={<BusinessLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/influencer/signup" element={<InfluencerSignup />} />
      <Route path="/influencer/auth" element={<InfluencerLogin />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/influencer/:id" element={<InfluencerDetails />} />
      <Route path="/blogs" element={<BlogsList />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminPage />} />
      </Route>

      {/* ================= USER ROUTES ================= */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/addcampaign" element={<AddCampaign />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      {/* ================= USER + INFLUENCER ================= */}
      <Route element={<ProtectedRoute allowedRoles={["user", "influencer"]} />}>
        <Route path="/allcampaigns" element={<AllCampaigns />} />
      </Route>

      {/* ================= INFLUENCER ROUTES ================= */}
      <Route element={<ProtectedRoute allowedRoles={["influencer"]} />}>
        <Route path="/influencer/profile" element={<InfluencerProfile />} />
      </Route>

      {/* ================= ALL LOGGED-IN USERS ================= */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["user", "influencer", "admin"]} />
        }
      >
        <Route path="/all-influencers" element={<AllInfluencers />} />
      </Route>
    </Routes>
  );
};

export default App;
