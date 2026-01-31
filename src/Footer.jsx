import React, { useState } from "react";
import { X, Info, ShieldCheck, FileText, Copyright } from "lucide-react";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const toggleModal = () => {
    setOpen(!open);
    if (!open) document.body.style.overflow = "hidden"; 
    else document.body.style.overflow = "auto";
  };

  const tabs = [
    { id: "about", label: "About Us", icon: <Info size={16} /> },
    { id: "privacy", label: "Privacy Policy", icon: <ShieldCheck size={16} /> },
    { id: "terms", label: "Terms & Conditions", icon: <FileText size={16} /> },
  ];

  return (
    <>
      {/* ================= FOOTER SECTION ================= */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-indigo-600 tracking-tight">InfluencialHub</h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xs">
                Empowering connections between visionaries and world-class brands.
              </p>
            </div>

            <button
              onClick={toggleModal}
              className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-indigo-200 active:scale-95"
            >
              Legal & Information
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

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

      {/* ================= MODAL OVERLAY ================= */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={toggleModal} />

          <div className="relative bg-white w-full max-w-4xl h-[90vh] sm:h-[85vh] rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 sm:px-10 py-6 border-b bg-slate-50/50 shrink-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Legal Center</h2>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">InfluencialHub Documentation</p>
              </div>
              <button onClick={toggleModal} className="p-3 bg-slate-200/50 hover:bg-red-50 hover:text-red-500 rounded-full transition-all text-slate-500 active:scale-90">
                <X size={20} />
              </button>
            </div>

            {/* Tab Nav */}
            <div className="flex overflow-x-auto no-scrollbar border-b bg-white px-4 sm:px-8 shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-5 px-5 text-sm font-bold whitespace-nowrap transition-all relative ${
                    activeTab === tab.id ? "text-indigo-600 scale-105" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab.icon} {tab.label}
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></div>}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-slate-600 leading-relaxed custom-scrollbar bg-white">
              
              {/* === ABOUT US SECTION === */}
              {activeTab === "about" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h3 className="text-2xl font-black text-slate-900">About Us</h3>
                  <p>Welcome to InfluencialHub, where brands and influencers come together to create impactful marketing campaigns. Our platform simplifies the process of connecting brands with the right influencers, driving authentic engagement and measurable results.</p>
                  
                  <h4 className="text-lg font-bold text-slate-900 mt-6">Our Mission</h4>
                  <p>We aim to empower brands and influencers to collaborate seamlessly, fostering genuine connections that resonate with audiences and drive success.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6">What We Do</h4>
                  <p>InfluencialHub is your go-to platform for discovering and managing influencer partnerships:</p>
                  <ul className="list-disc ml-5 space-y-3">
                    <li><strong>For Brands:</strong> Find the perfect influencers who align with your values and campaign goals, with tools for campaign management and performance tracking.</li>
                    <li><strong>For Influencers:</strong> Showcase your unique voice, connect with brands, manage collaborations, and grow your influence.</li>
                  </ul>

                  <h4 className="text-lg font-bold text-slate-900 mt-6">Why Choose Us?</h4>
                  <ul className="list-disc ml-5 space-y-3">
                    <li><strong>Tailored Solutions:</strong> We offer personalized recommendations to meet your specific needs.</li>
                    <li><strong>Trusted Partnerships:</strong> We prioritize long-term, mutually beneficial relationships.</li>
                    <li><strong>Data-Driven Insights:</strong> Optimize your campaigns with actionable analytics.</li>
                  </ul>

                  <h4 className="text-lg font-bold text-slate-900 mt-6">Our Story</h4>
                  <p>Founded with a vision to transform influencer marketing, InfluencialHub bridges the gap between brands and influencers in today’s digital landscape.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6">Join Us</h4>
                  <p>Whether you’re a brand looking to amplify your message or an influencer seeking exciting collaborations, InfluencialHub is here to help you succeed.</p>

                  <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="font-bold text-slate-900">Contact Us:</p>
                    <p>Have questions? Reach out to us at <span className="text-indigo-600 font-semibold">influencialhub@gmail.com</span> or visit <a href="http://www.influencialhub.com" className="text-indigo-600 font-semibold underline">www.influencialhub.com</a>.</p>
                  </div>
                </div>
              )}

              {/* === PRIVACY POLICY SECTION === */}
              {activeTab === "privacy" && (
                <div className="space-y-6 animate-in fade-in duration-500 text-sm">
                  <h3 className="text-2xl font-black text-slate-900">Privacy Policy</h3>
                  <p className="font-bold text-slate-500">Last Updated: 2024</p>
                  <p>InfluencialHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [www.influencialhub.com] and use our services. Please read this policy carefully to understand our views and practices regarding your personal data.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">1. Information We Collect</h4>
                  <p>We may collect and process the following types of information:</p>
                  <div className="ml-4 space-y-4">
                    <p><strong>a. Personal Information:</strong></p>
                    <ul className="list-disc ml-5 space-y-2">
                      <li><strong>Account Information:</strong> When you register on our Platform, we collect your name, email address, phone number, and any other information you provide during registration.</li>
                      <li><strong>Payment Information:</strong> If you make purchases or payments through the Platform, we collect payment details such as credit/debit card information or other financial data. Note that payment processing is handled by third-party providers, and we do not store your full payment information.</li>
                      <li><strong>Communications:</strong> Records of correspondence or communication between you and us, including emails and messages sent through our Platform.</li>
                    </ul>
                    <p><strong>b. Non-Personal Information:</strong></p>
                    <ul className="list-disc ml-5 space-y-2">
                      <li><strong>Usage Data:</strong> We may collect information on how you access and use the Platform, such as your IP address, browser type, device information, operating system, pages visited, and the date/time of your visit.</li>
                      <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to collect data on your usage of the Platform. You can control cookies through your browser settings, but disabling them may affect your experience.</li>
                    </ul>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">2. How We Use Your Information</h4>
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>To Provide and Improve Our Services: Including processing your registration, managing your account, providing customer support, and improving our Platform's functionality.</li>
                    <li>To Process Payments: Facilitating payments for services, handling billing, and managing transaction records.</li>
                    <li>To Communicate with You: Sending you updates, newsletters, marketing communications, and responding to your inquiries.</li>
                    <li>To Personalize Your Experience: Customizing content, recommendations, and advertisements based on your preferences and usage patterns.</li>
                    <li>To Ensure Security: Monitoring and analyzing usage to prevent fraud, unauthorized activities, and security breaches.</li>
                    <li>To Comply with Legal Obligations: Fulfilling any legal or regulatory requirements, such as tax reporting or responding to legal requests.</li>
                  </ul>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">3. How We Share Your Information</h4>
                  <p>We do not sell or rent your personal data to third parties. However, we may share your information in the following situations:</p>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>Service Providers: We may share your data with third-party vendors and service providers who assist us in providing our services, such as payment processors, hosting providers, and marketing partners.</li>
                    <li>Business Transfers: If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
                    <li>Legal Compliance: We may disclose your data if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                    <li>With Your Consent: We may share your information with third parties if you give us your explicit consent to do so.</li>
                  </ul>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">4. Data Retention</h4>
                  <p>We will retain your personal information for as long as necessary to provide the services you have requested, comply with our legal obligations, resolve disputes, and enforce our agreements. When your information is no longer required, we will take steps to securely delete or anonymize it.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">5. Your Data Rights</h4>
                  <p>Depending on your location and applicable data protection laws, you may have the following rights regarding your personal information: Access, Rectification, Erasure, Restriction, Data Portability, Objection.</p>
                  <p>To exercise these rights, please contact us at <span className="font-bold">influencialhub@gmail.com</span>. We will respond to your request in accordance with applicable laws.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">6. Data Security</h4>
                  <p>We take data security seriously and use appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">7. International Data Transfers</h4>
                  <p>Your information may be transferred to, and processed in, countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">8. Third-Party Links</h4>
                  <p>Our Platform may contain links to third-party websites. We are not responsible for the privacy practices or the content of those websites. Please review the privacy policies of any third-party sites you visit.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">9. Changes to This Privacy Policy</h4>
                  <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Privacy Policy on our Platform and updating the "Last Updated" date.</p>

                  <h4 className="text-lg font-bold text-slate-900 mt-6 underline">10. Contact Us</h4>
                  <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <span className="font-bold">influencialhub@gmail.com</span></p>
                </div>
              )}

              {/* === TERMS & CONDITIONS SECTION === */}
              {activeTab === "terms" && (
                <div className="space-y-6 animate-in fade-in duration-500 text-[13px]">
                  <h3 className="text-2xl font-black text-slate-900">Terms and Conditions</h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">1. Introduction</h4>
                      <p>Welcome to InfluencialHub. By accessing and using our platform, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, you must not use our services.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">2. Definitions</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>"Platform" refers to the InfluencialHub website and any related services.</li>
                        <li>"User" refers to anyone who uses the Platform, including brands, influencers, and any other individuals or entities.</li>
                        <li>"Content" includes any text, images, videos, links, or other materials uploaded or shared on the Platform by Users.</li>
                        <li>"Influencer" refers to a user registered on the Platform who offers promotion services through their social media channels.</li>
                        <li>"Brand" refers to a user registered on the Platform who seeks to collaborate with influencers for promotional campaigns.</li>
                        <li>"Campaign" refers to a marketing initiative created by a brand and executed by influencers via the Platform.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">3. User Eligibility</h4>
                      <p>By using InfluencialHub, you confirm that you are at least 18 years old or have the consent of a legal guardian to use the Platform. You must be legally able to enter into binding contracts and engage in financial transactions as per local laws.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">4. Account Registration</h4>
                      <p>Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account and password and are fully responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">5. Use of the Platform</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>Users agree to use the Platform for lawful purposes only.</li>
                        <li>You must not upload or distribute any Content that is unlawful, defamatory, infringing, obscene, or otherwise objectionable.</li>
                        <li>You may not use the Platform in a way that disrupts or interferes with the security, integrity, or performance of the Platform.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">6. Content Ownership and Rights</h4>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Users retain ownership of the Content they upload to the Platform.</li>
                        <li>By uploading Content, you grant InfluencialHub a non-exclusive, royalty-free, worldwide license to use, display, and distribute your Content on the Platform for the duration of its presence on the Platform. This license is revoked upon deletion of the Content or closure of your account.</li>
                        <li>You are responsible for ensuring that you have the necessary rights to upload Content to the Platform.</li>
                        <li>InfluencialHub reserves the right to moderate, remove, or restrict Content that violates these Terms or applicable laws.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">7. Influencer and Brand Agreements</h4>
                      <p>Influencers and Brands acknowledge that any agreement between them, including campaign terms and payments, is independent of InfluencialHub. InfluencialHub acts only as a facilitator and is not liable for any disputes arising from collaborations. Both parties agree to engage in campaigns in good faith and in accordance with all applicable laws.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">8. Fees and Payments</h4>
                      <ul className="list-disc ml-5 space-y-1">
                        <li>Certain features and services on the Platform may be subject to fees, which will be clearly disclosed at the time of purchase.</li>
                        <li>All fees are non-refundable unless otherwise stated, except in cases of service failure or technical issues.</li>
                        <li>Payments must be made using the methods provided by the Platform, and you agree to pay all applicable fees, including taxes, promptly.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">9. Data Privacy</h4>
                      <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information in compliance with applicable data protection regulations.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">10. Warranties Disclaimer</h4>
                      <p>The Platform is provided "as is" and "as available," without any warranties of any kind, either express or implied. InfluencialHub does not guarantee the success of any influencer campaigns or the reliability, accuracy, or completeness of any Content provided on the Platform.</p>
                    </div>

                    <p><strong>11. Termination of Accounts:</strong> InfluencialHub reserves the right to terminate or suspend accounts for violation of these Terms, or for any other reason at our discretion.</p>
                    
                    <p><strong>12. Force Majeure:</strong> InfluencialHub shall not be liable for any failure due to circumstances beyond its reasonable control, including but not limited to natural disasters, war, strikes, or technical failures.</p>

                    <p><strong>13. Confidentiality:</strong> Both parties agree to keep confidential any non-public information obtained through the use of the Platform.</p>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">14. Dispute Resolution</h4>
                      <p>Any disputes arising out of or in connection with these terms shall be resolved through good faith negotiations. If the dispute cannot be resolved amicably, it shall be referred to binding mediation or arbitration before resorting to court action. The governing law shall be the laws of India, and any legal proceedings shall be brought in the courts of Udaipur, Rajasthan.</p>
                    </div>

                    <p><strong>15. Limitation of Liability:</strong> To the fullest extent permitted by law, InfluencialHub will not be liable for any indirect, incidental, or consequential damages including loss of profits, data, or reputation.</p>

                    <p><strong>16. Indemnification:</strong> You agree to indemnify InfluencialHub from any claims, damages, or expenses arising out of your use of the Platform or violation of these terms.</p>

                    <p><strong>17. Third-Party Links and Services:</strong> We are not responsible for the content, privacy policies, or practices of any third-party sites or services.</p>

                    <p><strong>18. Modification of Services:</strong> InfluencialHub reserves the right to modify, suspend, or discontinue any part of the Platform at any time.</p>

                    <p><strong>19. Taxes:</strong> Users are responsible for determining and paying any applicable taxes related to their use of the Platform.</p>

                    <p><strong>20. Changes to Terms:</strong> InfluencialHub may update these terms from time to time. Continued use of the Platform after changes indicates acceptance of the new terms.</p>

                    <p><strong>21. Severability:</strong> If any provision is found to be unenforceable, the remaining provisions will remain in full force and effect.</p>

                    <p><strong>22. Entire Agreement:</strong> These terms constitute the entire agreement between you and InfluencialHub.</p>

                    <p><strong>23. Contact Information:</strong> For any questions regarding these terms, contact <span className="font-bold text-indigo-600">influencialhub@gmail.com</span>.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t px-8 py-6 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Version 2.0.4 r1</span>
              <button
                onClick={toggleModal}
                className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
              >
                Close Document
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

const ArrowRight = ({ className, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default Footer;