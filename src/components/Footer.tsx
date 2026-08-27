import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#131b2e] text-slate-300">
      {/* Top Banner with Society Vision - Matching Screenshot */}
      <div className="border-b border-slate-800/80 bg-[#0d1322] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Bikrampur Garden City Logo"
              className="w-12 h-12 rounded-full object-contain shrink-0 bg-white/10 p-0.5"
            />
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base">Bikrampur Garden City Society Portal</h3>
              <p className="text-xs text-slate-400">
                "A Digital Step Towards an Organized Society" — একটি ডিজিটাল ও স্বচ্ছ সুন্দর আবাসিক সমাজ বিনির্মাণ
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Society Code: BGC-RES-442</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="bg-[#064e3b] text-[#64f9bc] px-3 py-1 rounded-full border border-[#0b513d] font-bold text-[11px]">
              20+ Buildings • Apartments
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-xs">
          {/* Col 1: Address & Office */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">সোসাইটি কার্যালয় (Office)</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#34d399] shrink-0 mt-0.5" />
                <span>৪৪২ ধোলাইপাড়, ঢাকা-মাওয়া হাইওয়ে, ঢাকা-১২০৪</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                <span>হেল্পলাইন: +880 1711-000001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ইমেইল: info@bikrampurgardencity.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Citizen & Member Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">নাগরিক ও সদস্য সেবা</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('register')}
                  className="hover:text-white transition-colors"
                >
                  📝 নতুন সদস্যপদ নিবন্ধন আবেদন
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('status')}
                  className="hover:text-white transition-colors"
                >
                  🔍 আবেদনের বর্তমান অবস্থা ট্র্যাকিং
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('elections')}
                  className="hover:text-white transition-colors"
                >
                  🗳️ নির্বাচন ২০২৬ ও ভোটার কেন্দ্র
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('login')}
                  className="hover:text-white transition-colors"
                >
                  📱 সদস্য লগইন (Member Access)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community Facilities */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">সোসাইটি সুযোগ-সুবিধা</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('rentals')}
                  className="hover:text-white transition-colors"
                >
                  🏢 রেসিডেন্সিয়াল ফ্ল্যাট ও বাড়ি ভাড়া পোর্টাল
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('directory')}
                  className="hover:text-white transition-colors"
                >
                  👥 কার্যনির্বাহী পরিষদ ও ডিরেক্টরি
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('notices')}
                  className="hover:text-white transition-colors"
                >
                  📋 নোটিশ বোর্ড ও জরুরি বিজ্ঞপ্তি
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">জরুরি সেবা (Emergency)</h4>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center text-slate-300">
                <span>জাতীয় জরুরি সেবা:</span>
                <span className="font-mono text-[#34d399] font-bold">999</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>ধোলাইপাড় ফায়ার সার্ভিস:</span>
                <span className="font-mono text-amber-400 font-bold">02-7443322</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>যাত্রাবাড়ী থানা পুলিশ:</span>
                <span className="font-mono text-blue-400 font-bold">01713-373145</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Location Preview Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#1a233a] border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-white text-xs sm:text-sm">সোসাইটির অবস্থান ও গুগল ম্যাপ (Location Map)</span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">— ৪৪২ ধোলাইরপাড়, ঢাকা-মাওয়া মহাসড়ক, ঢাকা-১২০৪</span>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              লাইভ লোকেশন ম্যাপ
            </span>
          </div>

          {/* Map iframe Container */}
          <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 relative shadow-inner">
            <iframe
              title="Bikrampur Garden City Google Map"
              src="https://maps.google.com/maps?q=PC2P%2B4R+Dhaka&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter brightness-95 contrast-105"
            />
          </div>
        </div>
      </div>

      {/* Bottom Clean Bar - Matching Screenshot */}
      <div className="bg-white text-slate-600 border-t border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 font-bold text-[#131b2e]">
            <img
              src="/logo.png"
              alt="Bikrampur Garden City"
              className="w-6 h-6 rounded-full object-contain shrink-0"
            />
            <span>Bikrampur Garden City</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-500 font-medium">
            <button onClick={() => setCurrentView('directory')} className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setCurrentView('directory')} className="hover:text-slate-900 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => setCurrentView('directory')} className="hover:text-slate-900 transition-colors">
              Contact Support
            </button>
            <button onClick={() => setCurrentView('directory')} className="hover:text-slate-900 transition-colors">
              Society Bylaws
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className="text-slate-400 hover:text-amber-600 transition-colors flex items-center gap-1 font-semibold"
            >
              <ShieldAlert className="w-3 h-3 text-amber-500" />
              <span>Admin</span>
            </button>
          </div>

          <div className="text-slate-400 text-[11px]">
            © 2026 Bikrampur Garden City Society. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
