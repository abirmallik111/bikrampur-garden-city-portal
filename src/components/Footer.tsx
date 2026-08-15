import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, MapPin, Phone, Mail, ShieldAlert, Heart, ExternalLink, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner with Society Vision */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Bikrampur Garden City Society Portal</h3>
              <p className="text-xs text-slate-400">
                "A Digital Step Towards an Organized Society" — একটি ডিজিটাল ও সুসংগঠিত আবাসিক সমাজ বিনির্মাণে
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Society Code: RAJUK-RES-442</span>
            <span className="text-slate-600">•</span>
            <span className="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800/80 font-medium">
              40+ Buildings • 4-5 Apartments
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Address & Office */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">সোসাইটি কার্যালয় (Office)</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  ৪৪২ ধোলাইপাড়, ঢাকা-মাওয়া হাইওয়ে, ঢাকা-১২০৪ (রাজউক অনুমোদিত আবাসিক প্রকল্প)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>হেল্পলাইন: +880 1711-000001 / 01711-000002</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ইমেইল: info@bikrampurgardencity.com</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              অফিস সময়: প্রতিদিন সকাল ১০:০০ - রাত ৯:০০ (শুক্রবার জুমার বিরতি)
            </p>
          </div>

          {/* Col 2: Citizen & Voter Services */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">নাগরিক ও ভোটার সেবা</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('register')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>📝 নতুন ভোটার রেজিস্ট্রেশন আবেদন</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('status')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🔍 ভোটার আবেদনের বর্তমান অবস্থা ট্র্যাকিং</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('elections')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🗳️ নির্বাচন ২০২৬ ভোটকেন্দ্র ও প্রার্থী তালিকা</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('login')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>📱 ভোটার মেম্বার লগইন (Phone + OTP)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('announcements')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>📢 সোসাইটির জরুরি নোটিশ ও বিজ্ঞপ্তি</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community Facilities */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">সোসাইটি সুযোগ-সুবিধা</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('mosque')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🕌 কেন্দ্রীয় জামে মসজিদ ও উন্নয়ন তহবিল</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('rentals')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🏢 রেসিডেন্সিয়াল ফ্ল্যাট ও বাড়ি ভাড়া পোর্টাল</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('committee')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>👥 ২০২৪-২০২৬ কার্যনির্বাহী পরিষদ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('register');
                  }}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <span>📄 বিদ্যুৎ ও গ্যাস বিল যাচাই নির্দেশিকা</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts (Dholaipar Area) */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">জরুরি সেবা (Dholaipar)</h4>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>জাতীয় জরুরি সেবা:</span>
                <span className="font-mono text-emerald-400 font-bold">999</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>ধোলাইপাড় ফায়ার সার্ভিস:</span>
                <span className="font-mono text-amber-400 font-bold">02-7443322</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>যাত্রাবাড়ী থানা পুলিশ:</span>
                <span className="font-mono text-blue-400 font-bold">01713-373145</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>ওয়াসা পানি হটলাইন:</span>
                <span className="font-mono text-sky-400 font-bold">16162</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>ডেসকো বিদ্যুৎ কন্ট্রোল:</span>
                <span className="font-mono text-indigo-400 font-bold">16120</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Subtle Admin Login */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Bikrampur Garden City Residential Society. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('committee')}
              className="hover:text-slate-300 transition-colors"
            >
              সোসাইটি গঠনতন্ত্র ও উপবিধি
            </button>
            <span>•</span>
            <button
              id="footer-admin-link"
              onClick={() => setCurrentView('admin')}
              className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>এডমিন লগইন (Admin Access)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
