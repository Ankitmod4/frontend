import React, { useState } from "react";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const toggleModal = () => setOpen(!open);

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "terms", label: "Terms & Conditions" },
  ];

  return (
    <>
      {/* FOOTER SECTION */}
      <footer className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 font-semibold text-lg mb-2">InfluencialHub</p>
          <p className="text-gray-400 text-sm">© 2026 InfluencerHub. All rights reserved.</p>
          
          <div className="mt-6">
            <button
              onClick={toggleModal}
              className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-indigo-200"
            >
              View Legal Policies & About Us
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-8 py-5 border-b bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Information Center</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">InfluencialHub Official Documentation</p>
              </div>
              <button
                onClick={toggleModal}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex border-b bg-white px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                  )}
                </button>
              ))}
            </div>

            {/* MODAL CONTENT (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-8 text-gray-700 leading-relaxed">
              
              {activeTab === "about" && (
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">About Us</h3>
                    <p>Welcome to <strong>InfluencialHub</strong>, where brands and influencers come together to create impactful marketing campaigns. Our platform simplifies the process of connecting brands with the right influencers, driving authentic engagement and measurable results.</p>
                  </section>
                  <section>
                    <h4 className="font-bold text-gray-900">Our Mission</h4>
                    <p>We aim to empower brands and influencers to collaborate seamlessly, fostering genuine connections that resonate with audiences and drive success.</p>
                  </section>
                  <section>
                    <h4 className="font-bold text-gray-900">What We Do</h4>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li><strong>For Brands:</strong> Find the perfect influencers who align with your values and campaign goals.</li>
                      <li><strong>For Influencers:</strong> Showcase your unique voice and connect with world-class brands.</li>
                    </ul>
                  </section>
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <p className="text-indigo-800 font-medium">Contact: influencialhub@gmail.com</p>
                    <p className="text-indigo-600 text-sm">www.influencialhub.com</p>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6 text-sm">
                  <h3 className="text-xl font-bold text-gray-900">Privacy Policy</h3>
                  <p className="italic text-gray-500">Last Updated: 2024</p>
                  
                  <div>
                    <h4 className="font-bold text-gray-800">1. Information We Collect</h4>
                    <p>We collect <strong>Personal Information</strong> (Account details, Payment info, Communications) and <strong>Non-Personal Information</strong> (Usage data, Cookies) to provide a better experience.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">2. How We Use Your Information</h4>
                    <p>We use data to provide services, process payments, communicate updates, and ensure platform security.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">3. Data Sharing</h4>
                    <p>We do not sell your data. Sharing only occurs with service providers, for legal compliance, or with your explicit consent.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">4. Your Rights</h4>
                    <p>You have the right to access, rectify, or erase your personal data. Contact us at influencialhub@gmail.com to exercise these rights.</p>
                  </div>
                  <p className="text-[11px] text-gray-400">Please refer to the full policy document for international data transfer details and security protocols.</p>
                </div>
              )}

              {activeTab === "terms" && (
                <div className="space-y-6 text-sm">
                  <h3 className="text-xl font-bold text-gray-900">Terms & Conditions</h3>
                  
                  <div>
                    <h4 className="font-bold text-gray-800">1. Introduction</h4>
                    <p>By using InfluencialHub, you agree to these terms. Users must be 18+ or have legal guardian consent.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">2. Platform Role</h4>
                    <p>InfluencialHub acts only as a <strong>facilitator</strong>. Agreements between Brands and Influencers are independent of the platform.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">3. Content Ownership</h4>
                    <p>Users retain ownership of their content but grant us a license to display it while active on the platform.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800">4. Dispute Resolution</h4>
                    <p>Governing Law: <strong>India</strong>. Jurisdiction: <strong>Udaipur, Rajasthan</strong>. Disputes shall be resolved through good faith negotiations or binding mediation.</p>
                  </div>

                  <div className="p-4 border-l-4 border-amber-400 bg-amber-50">
                    <p className="text-amber-800 font-semibold text-xs uppercase">Limitation of Liability</p>
                    <p className="text-amber-700">InfluencialHub is provided "as is" and is not liable for indirect or consequential damages.</p>
                  </div>
                </div>
              )}

            </div>

            {/* MODAL FOOTER */}
            <div className="border-t px-8 py-5 bg-gray-50 flex justify-between items-center">
               <p className="text-xs text-gray-400 font-mono">InfluencialHub_Legal_v2.0</p>
              <button
                onClick={toggleModal}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                I Understand
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Footer;