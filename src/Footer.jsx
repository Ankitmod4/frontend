import React, { useState } from "react";
import { X, Info, ShieldCheck, FileText, Mail, Globe, Copyright } from "lucide-react";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const toggleModal = () => {
    setOpen(!open);
    if (!open) document.body.style.overflow = "hidden"; // Scroll lock
    else document.body.style.overflow = "auto";
  };

  const tabs = [
    { id: "about", label: "About Us", icon: <Info size={16} /> },
    { id: "privacy", label: "Privacy", icon: <ShieldCheck size={16} /> },
    { id: "terms", label: "Terms", icon: <FileText size={16} /> },
  ];

  return (
    <>
      {/* ================= FOOTER SECTION ================= */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            {/* Brand Logo & Tagline */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-indigo-600 tracking-tight">InfluencialHub</h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xs">
                Empowering connections between visionaries and world-class brands.
              </p>
            </div>

            {/* Legal Trigger Button */}
            <button
              onClick={toggleModal}
              className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-indigo-200 active:scale-95"
            >
              Legal & Information
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bottom Divider & Copyright */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium uppercase tracking-widest">
            <div className="flex items-center gap-1">
              <Copyright size={14} /> 2026 InfluencialHub. All rights reserved.
            </div>
            <div className="flex gap-6">
              <span className="hover:text-indigo-600 cursor-default transition-colors text-[10px] sm:text-xs">Udaipur, Rajasthan, India</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL OVERLAY (RESPONSIVE) ================= */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={toggleModal} />

          {/* Modal Box */}
          <div className="relative bg-white w-full max-w-4xl h-[85vh] sm:h-auto sm:max-h-[85vh] rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 sm:px-10 py-6 border-b bg-slate-50/50">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Legal Center</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Verified Documentation</p>
                </div>
              </div>
              <button 
                onClick={toggleModal}
                className="p-3 bg-slate-200/50 hover:bg-red-50 hover:text-red-500 rounded-full transition-all text-slate-500 active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tab Navigation (Scrollable on Mobile) */}
            <div className="flex overflow-x-auto no-scrollbar border-b bg-white px-4 sm:px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-5 px-5 text-sm font-bold whitespace-nowrap transition-all relative ${
                    activeTab === tab.id ? "text-indigo-600 scale-105" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-slate-600 leading-relaxed custom-scrollbar bg-white">
              
              {activeTab === "about" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">Connecting Visionaries.</h3>
                    <p className="text-lg text-slate-500 italic border-l-4 border-indigo-600 pl-4 py-1">
                      "We simplify influencer marketing by building bridges, not barriers."
                    </p>
                    <p className="mt-4">Welcome to <strong>InfluencialHub</strong>. Our platform is designed to eliminate the friction in brand-influencer collaborations, ensuring every campaign is built on authenticity and data.</p>
                  </section>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <h4 className="font-black text-indigo-600 uppercase text-xs tracking-widest mb-2">For Brands</h4>
                      <p className="text-sm">Find verified influencers that match your brand identity with precision.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                      <h4 className="font-black text-indigo-600 uppercase text-xs tracking-widest mb-2">For Creators</h4>
                      <p className="text-sm">Get access to premium campaigns and grow your professional presence.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-slate-900 rounded-[2rem] text-white">
                    <div className="flex items-center gap-3">
                      <Mail className="text-indigo-400" />
                      <span className="font-bold">influencialhub@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="text-indigo-400" />
                      <span className="font-bold text-sm">www.influencialhub.com</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h3 className="text-2xl font-black text-slate-900">Privacy Safeguards</h3>
                  <div className="space-y-6">
                    <PolicyItem title="Data Collection" desc="We only collect essential account info and usage metrics to improve platform speed and security." />
                    <PolicyItem title="Data Sharing" desc="Your personal data is never sold. It is only shared with verified partners required to process your payments or campaigns." />
                    <PolicyItem title="User Rights" desc="You hold the keys to your data. Access, download, or delete your information at any time from your settings." />
                  </div>
                </div>
              )}

              {activeTab === "terms" && (
                <div className="space-y-6 animate-in fade-in duration-500 text-sm">
                   <h3 className="text-2xl font-black text-slate-900">Platform Governance</h3>
                   <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4">
                     <div className="text-amber-600 shrink-0 mt-1"><Info size={20} /></div>
                     <p className="text-amber-800 text-xs leading-relaxed"><strong>Important:</strong> InfluencialHub acts as a facilitator. All creative and payment agreements made between parties are binding and independent.</p>
                   </div>
                   <div className="grid gap-4">
                     <p><strong>1. Jurisdiction:</strong> These terms are governed by the laws of India, with courts at Udaipur, Rajasthan holding exclusive jurisdiction.</p>
                     <p><strong>2. Content:</strong> Users grant InfluencialHub a non-exclusive license to showcase campaign content for promotional purposes only.</p>
                     <p><strong>3. Liability:</strong> We are not responsible for direct or indirect losses resulting from third-party influencer actions.</p>
                   </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t px-8 py-6 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Version 2.0.4 r1</span>
              <button
                onClick={toggleModal}
                className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </>
  );
};

const PolicyItem = ({ title, desc }) => (
  <div className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors">
    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 shrink-0" />
    <div>
      <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide mb-1">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ArrowRight = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default Footer;