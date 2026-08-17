import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Phone,
  Mail,
  Shield,
  MapPin,
  FileText,
  AlertTriangle,
  Building,
  Flame,
  Droplets,
  Zap,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Scale,
  ShieldCheck,
  Printer,
  Sparkles,
  Award,
  Vote,
  DollarSign,
  Lock,
  Trash2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Gavel,
  Search,
  AlertCircle,
  Car,
  Wrench,
  Heart,
  Info,
  ShieldAlert,
  SlidersHorizontal,
  Home
} from 'lucide-react';

export const SocietyDirectoryPage: React.FC = () => {
  const { committeeMembers } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'committee' | 'emergency' | 'rules'>('committee');
  const [bylawsSearch, setBylawsSearch] = useState('');
  const [bylawsChapter, setBylawsChapter] = useState<'all' | 'admin' | 'finance_sec' | 'property' | 'emergency' | 'penalty'>('all');

  const emergencyContacts = [
    { name: 'সোসাইটি মেইন সিকিউরিটি গেট ও গার্ড পোস্ট', phone: '01700-112233', icon: Shield, type: 'Security' },
    { name: 'সোসাইটি কন্ট্রোল রুম ও এডমিন অফিস', phone: '01800-445566', icon: Building, type: 'Admin' },
    { name: 'ঢোলাইপাড় পুলিশ ফাঁড়ি / শ্যামপুর থানা', phone: '01713-373155', icon: Shield, type: 'Police' },
    { name: 'যাত্রাবাড়ী ফায়ার সার্ভিস স্টেশন', phone: '02-7541222', icon: Flame, type: 'Fire' },
    { name: 'ঢাকা ওয়াসা (Dhaka WASA MODS Zone-1)', phone: '16162', icon: Droplets, type: 'Water' },
    { name: 'ডেসকো বিদ্যুৎ অভিযোগ কেন্দ্র (DESCO Dholaipar)', phone: '16120', icon: Zap, type: 'Electricity' },
    { name: 'জাতীয় জরুরি সেবা (National Emergency)', phone: '999', icon: AlertTriangle, type: 'Govt 999' }
  ];

  const [committeeFilter, setCommitteeFilter] = useState<'all' | 'convening' | 'executive' | 'advisory'>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#122842] text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
            <Users className="w-3.5 h-3.5" />
            <span>সোসাইটি ডিরেক্টরি ও যোগাযোগ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            সোসাইটি পরিচালনা পর্ষদ ও জরুরি সেবা ডিরেক্টরি
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
            বিক্রমপুর গার্ডেন সিটি (৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক)-এর বর্তমান আহ্বায়ক কমিটি, নির্বাচিত কার্যনির্বাহী পরিষদ ও স্থানীয় জরুরি সেবাসমূহ।
          </p>
        </div>
        <img
          src="/logo.png"
          alt="Bikrampur Garden City Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-contain bg-white/10 p-1 shrink-0 drop-shadow-md hidden sm:block"
        />
      </div>

      {/* Tabs with smooth horizontal touch scrolling */}
      <div className="flex overflow-x-auto no-scrollbar touch-scroll pb-1 gap-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('committee')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'committee'
              ? 'border-[#1e3a5f] text-[#1e3a5f] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>পরিচালনা পরিষদ ({committeeMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('emergency')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'emergency'
              ? 'border-rose-600 text-rose-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Phone className="w-4 h-4 text-rose-600" />
          <span>জরুরি হটলাইন ({emergencyContacts.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'rules'
              ? 'border-[#064e3b] text-[#064e3b] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Scale className="w-4 h-4 text-[#064e3b]" />
          <span>গঠনতন্ত্র ও নীতিমালা (২০টি ধারা)</span>
        </button>
      </div>

      {/* SUBTAB 1: COMMITTEE */}
      {activeSubTab === 'committee' && (
        <div className="space-y-6">
          {/* Sub Filters for Committee Category */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-bold">কমিটি ফিল্টার:</span>
              <button
                onClick={() => setCommitteeFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  committeeFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                সকল সদস্য ({committeeMembers.length})
              </button>
              <button
                onClick={() => setCommitteeFilter('convening')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  committeeFilter === 'convening'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-blue-800 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                আহ্বায়ক কমিটি ({committeeMembers.filter(c => c.committee_type === 'convening' || !c.committee_type).length})
              </button>
              <button
                onClick={() => setCommitteeFilter('executive')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  committeeFilter === 'executive'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                কার্যনির্বাহী পরিষদ ({committeeMembers.filter(c => c.committee_type === 'executive').length})
              </button>
              <button
                onClick={() => setCommitteeFilter('advisory')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  committeeFilter === 'advisory'
                    ? 'bg-purple-700 text-white shadow-2xs'
                    : 'bg-white text-purple-800 hover:bg-purple-50 border border-purple-200'
                }`}
              >
                উপদেষ্টা পরিষদ ({committeeMembers.filter(c => c.committee_type === 'advisory').length})
              </button>
            </div>

            {committeeFilter === 'convening' && (
              <span className="text-[11px] text-blue-800 font-semibold bg-blue-100/70 px-2.5 py-1 rounded-lg">
                * নির্বাচন সম্পন্ন হওয়া পর্যন্ত সোসাইটি পরিচালনা ও সমন্বয়ের দায়িত্বপ্রাপ্ত
              </span>
            )}
          </div>

          {committeeMembers.filter(c => committeeFilter === 'all' || c.committee_type === committeeFilter || (!c.committee_type && committeeFilter === 'convening')).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {committeeMembers
                .filter(c => committeeFilter === 'all' || c.committee_type === committeeFilter || (!c.committee_type && committeeFilter === 'convening'))
                .sort((a, b) => a.sort_order - b.sort_order)
                .map(member => (
                  <div
                    key={member.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-4"
                  >
                    <div className="w-20 h-24 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                      <img
                        src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded inline-block ${
                          member.committee_type === 'executive'
                            ? 'bg-emerald-100 text-emerald-900'
                            : member.committee_type === 'advisory'
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}>
                          {member.designation_bn}
                        </span>
                        {member.tenure && (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {member.tenure}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm truncate">{member.name_bn}</h3>
                      <div className="text-xs text-slate-500 truncate">{member.name}</div>
                      <div className="text-[11px] text-slate-600 font-semibold pt-0.5">প্লট: {member.plot_number}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-700 font-mono pt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">কমিটি সদস্য তালিকা খালি</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                অ্যাডমিন প্যানেলের "কমিটি পরিচালনা" ট্যাব থেকে আহ্বায়ক কমিটি ও কার্যনির্বাহী পরিষদের সদস্যদের নাম এন্ট্রি করুন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: EMERGENCY */}
      {activeSubTab === 'emergency' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                      {contact.type}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{contact.name}</h4>
                  </div>
                </div>

                <a
                  href={`tel:${contact.phone}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* SUBTAB 3: COMPREHENSIVE 20-ARTICLE CONSTITUTION & BYLAWS */}
      {activeSubTab === 'rules' && (
        <div className="space-y-6">
          {/* Top Document Header & Print Action */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <img
                src="/logo.png"
                alt="BGC Seal"
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-contain bg-[#faf8ff] p-1 ring-2 ring-emerald-600/20 shrink-0 drop-shadow-sm"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200/60">
                    <Scale className="w-3 h-3 text-emerald-600" />
                    <span>রাজউক অনুমোদিত আবাসিক সোসাইটি</span>
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    সর্বমোট ২০টি ধারা • পূর্ণাঙ্গ সংস্করণ
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি (সোসাইটি) — গঠনতন্ত্র ও পরিচালনা নীতিমালা
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                  ৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক, ঢাকা-১২০৪ • সকল স্থায়ী সদস্য, সহযোগী নিবাসী, ভাড়াটিয়া ও সংশ্লিষ্ট সকলের জন্য বাধ্যতামূলক
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => {
                  const printWin = window.open('', '_blank');
                  if (!printWin) return;
                  printWin.document.write(`
                    <!DOCTYPE html>
                    <html lang="bn">
                    <head>
                      <title>বিক্রমপুর গার্ডেন সিটি সোসাইটি - অফিশিয়াল গঠনতন্ত্র ও নীতিমালা</title>
                      <style>
                        body { font-family: 'Hind Siliguri', system-ui, -apple-system, sans-serif; padding: 35px; color: #0f172a; line-height: 1.6; max-width: 850px; margin: 0 auto; font-size: 13px; }
                        .header { text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 18px; margin-bottom: 25px; }
                        .logo { width: 85px; height: 85px; margin-bottom: 8px; }
                        h1 { font-size: 20px; color: #064e3b; margin: 4px 0; font-weight: 800; }
                        h2 { font-size: 13px; color: #475569; margin: 0; font-weight: 600; }
                        .preamble { background: #f8fafc; border-left: 4px solid #064e3b; padding: 12px 16px; margin-bottom: 25px; font-style: italic; font-size: 12.5px; border-radius: 4px; }
                        .article { margin-bottom: 22px; page-break-inside: avoid; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; background: #ffffff; }
                        .article-title { font-size: 14px; font-weight: bold; color: #064e3b; margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; }
                        .article-body { font-size: 12px; color: #334155; }
                        .article-body p { margin: 6px 0; }
                        .article-body ul { margin: 6px 0; padding-left: 18px; }
                        .article-body li { margin-bottom: 4px; }
                        table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
                        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
                        th { background: #f1f5f9; font-weight: bold; color: #0f172a; }
                        .sign-box { display: flex; justify-content: space-between; margin-top: 50px; padding-top: 20px; border-top: 1px solid #94a3b8; text-align: center; }
                        .sign-item { width: 30%; }
                        .sign-line { border-top: 1px dashed #475569; margin-top: 40px; padding-top: 5px; font-size: 11px; font-weight: bold; }
                        .footer { text-align: center; margin-top: 40px; font-size: 10px; color: #64748b; }
                        @media print { body { padding: 15px; } .article { border: 1px solid #cbd5e1; } }
                      </style>
                    </head>
                    <body>
                      <div class="header">
                        <img src="/logo.png" class="logo" />
                        <h1>বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি (সোসাইটি)</h1>
                        <h2>সংগঠনের গঠনতন্ত্র ও নীতিমালা • ৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক, ঢাকা</h2>
                        <p style="font-size: 11px; font-weight: bold; color: #047857; margin-top: 4px;">রাজউক অনুমোদিত আবাসিক সোসাইটি • সংশোধিত সংস্করণ ২০২৬</p>
                      </div>

                      <div class="preamble">
                        <strong>প্রাক্কথন:</strong> বিক্রমপুর গার্ডেন সিটি সোসাইটির সকল নিবাসীর নিরাপত্তা, কল্যাণ, সুশৃঙ্খল পরিবেশ ও পারস্পরিক সৌহার্দ্য বজায় রাখার লক্ষ্যে এই গঠনতন্ত্র প্রণীত হলো। এই গঠনতন্ত্র সোসাইটির সকল স্থায়ী সদস্য, সহযোগী নিবাসী, ভাড়াটিয়া এবং সোসাইটির আওতাধীন সকল ব্যক্তির জন্য বাধ্যতামূলক।
                      </div>

                      <!-- Article 1 -->
                      <div class="article">
                        <div class="article-title">ধারা ১: নাম, সীমানা ও সংগঠনের প্রকৃতি</div>
                        <div class="article-body">
                          <p><strong>১.১ পূর্ণ নাম:</strong> বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি (সোসাইটি)।</p>
                          <p><strong>১.২ এখতিয়ার এলাকা:</strong> ৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক সংলগ্ন আবাসিক সোসাইটির আওতাধীন সকল প্লট, ভবন, ফ্ল্যাট, অভ্যন্তরীণ রাস্তা, ড্রেন, পার্কিং এলাকা, কেন্দ্রীয় জামে মসজিদ, সোসাইটি কমিউনিটি সেন্টার ও সাধারণ সুবিধাসমূহ।</p>
                          <p><strong>১.৩ সংগঠনের স্বরূপ:</strong> এটি সম্পূর্ণ অরাজনৈতিক, অলাভজনক, ধর্মনিরপেক্ষ এবং আবাসিক নাগরিক কল্যাণমূলক সংগঠন।</p>
                          <p><strong>১.৪ আইনি মর্যাদা:</strong> এই সোসাইটি বাংলাদেশের সংশ্লিষ্ট আইন ও বিধিমালার অধীনে পরিচালিত হবে এবং রাজউক (RAJUK) কর্তৃক অনুমোদিত আবাসিক এলাকা হিসেবে স্বীকৃত।</p>
                        </div>
                      </div>

                      <!-- Article 2 -->
                      <div class="article">
                        <div class="article-title">ধারা ২: সোসাইটির লক্ষ্য ও নাগরিক কল্যাণমূলক উদ্দেশ্য</div>
                        <div class="article-body">
                          <p><strong>২.১ নিরাপত্তা:</strong> সোসাইটির সার্বিক নিরাপত্তা নিশ্চিতকরণে আধুনিক সিসিটিভি ব্যবস্থা, ২৪/৭ সিকিউরিটি গার্ড পরিচালনা এবং প্রধান ও পকেট গেটে কঠোর নজরদারি।</p>
                          <p><strong>২.২ পরিবেশ ব্যবস্থাপনা:</strong> সুপরিকল্পিত বর্জ্য ব্যবস্থাপনা, ড্রেনেজ সংস্কার, পরিষ্কার-পরিচ্ছন্ন পরিবেশ সংরক্ষণ এবং সবুজায়ন কর্মসূচি।</p>
                          <p><strong>২.৩ নাগরিক সুবিধা:</strong> ওয়াসা, ডেসকো, তিতাস গ্যাস ও সিটি কর্পোরেশনের সাথে সমন্বয় করে নাগরিক সুবিধার মানোন্নয়ন, নিয়মিত পানি, বিদ্যুৎ ও গ্যাস সরবরাহ নিশ্চিতকরণ।</p>
                          <p><strong>২.৪ ধর্মীয় ও সামাজিক কল্যাণ:</strong> কেন্দ্রীয় জামে মসজিদ ও সামাজিক উন্নয়নমূলক তহবিল গঠন, পরিচালনা এবং সামাজিক অনুষ্ঠান আয়োজনে সহযোগিতা।</p>
                          <p><strong>২.৫ শিক্ষা ও সংস্কৃতি:</strong> সোসাইটির শিশু-কিশোরদের জন্য কোচিং সেন্টার, গ্রন্থাগার, খেলাধুলা ও সাংস্কৃতিক কার্যক্রম পরিচালনা।</p>
                          <p><strong>২.৬ স্বাস্থ্যসেবা:</strong> নিয়মিত স্বাস্থ্য ক্যাম্প, এম্বুলেন্স সেবা এবং জরুরি চিকিৎসা সহায়তা।</p>
                          <p><strong>২.৭ অবকাঠামো উন্নয়ন:</strong> সোসাইটির অভ্যন্তরীণ রাস্তা, পথবাতি, পার্কিং, পানি নিষ্কাশন ব্যবস্থা ও যোগাযোগ ব্যবস্থার উন্নয়ন ও রক্ষণাবেক্ষণ।</p>
                        </div>
                      </div>

                      <!-- Article 3 -->
                      <div class="article">
                        <div class="article-title">ধারা ৩: সদস্যপদের শ্রেণিবিভাগ ও অন্তর্ভুক্তি</div>
                        <div class="article-body">
                          <p><strong>৩.১ স্থায়ী সদস্য (Permanent Member):</strong> প্লট মালিক, ভবন মালিক ও ফ্ল্যাট মালিকগণ। তারা ভোটাধিকার, নির্বাচনে প্রার্থী হওয়ার অধিকার এবং সোসাইটির সকল সুবিধা ভোগ করবেন। স্থায়ী সদস্যদের মাসিক সার্ভিস চার্জ পরিশোধ বাধ্যতামূলক।</p>
                          <p><strong>৩.২ সাধারণ সদস্য (General Member):</strong> স্থায়ী সদস্যদের পারিবারিক সদস্য (স্ত্রী, প্রাপ্তবয়স্ক সন্তান) যারা সোসাইটিতে বসবাস করেন। স্থায়ী সদস্যের অনুপস্থিতিতে পূর্বানুমতি সাপেক্ষে ভোটাধিকার প্রয়োগ করতে পারবেন।</p>
                          <p><strong>৩.৩ সহযোগী নিবাসী (Resident Member):</strong> ভাড়াটিয়া পরিবারবর্গ যারা সোসাইটিতে নিয়মিত বসবাস করেন। তারা সকল নাগরিক সেবা উপভোগ করবেন। ভোটাধিকার নেই, তবে মতামত দেওয়ার অধিকার রয়েছে। প্রবেশের ৭২ ঘণ্টার মধ্যে পুলিশ ভেরিফিকেশন ও সোসাইটি অফিসে নিবন্ধন বাধ্যতামূলক।</p>
                          <p><strong>৩.৪ সম্মানিত সদস্য (Honorary Member):</strong> সোসাইটির কল্যাণে বিশেষ অবদানের জন্য কার্যনির্বাহী পরিষদ কর্তৃক মনোনীত ব্যক্তিবর্গ।</p>
                          <p><strong>৩.৫ নিবন্ধন প্রক্রিয়া:</strong> জাতীয় পরিচয়পত্র (NID) ও বিদ্যুৎ বিল আপলোড করে ডিজিটাল সদস্য ফরম পূরণ বাধ্যতামূলক। সদস্যপদ অনুমোদনের জন্য কোনো অতিরিক্ত ফি প্রদান করতে হবে না।</p>
                          <p><strong>৩.৬ সদস্যপদ বাতিলকরণ:</strong> গঠনতন্ত্র লঙ্ঘন করলে দুই-তৃতীয়াংশ কার্যনির্বাহী পরিষদের সিদ্ধান্তে সদস্যপদ স্থগিত বা বাতিল হতে পারে। স্থায়ী সদস্য প্লট/ফ্ল্যাট বিক্রয় করলে নতুন মালিককে ৩০ দিনের মধ্যে নিবন্ধন করতে হবে।</p>
                        </div>
                      </div>

                      <!-- Article 4 -->
                      <div class="article">
                        <div class="article-title">ধারা ৪: কার্যনির্বাহী পরিষদ (Executive Committee)</div>
                        <div class="article-body">
                          <p><strong>৪.১ সাধারণ পরিষদ:</strong> সোসাইটির সর্বোচ্চ নীতিনির্ধারণী ফোরাম হলো সাধারণ পরিষদ (General Body)।</p>
                          <p><strong>৪.২ কার্যনির্বাহী পরিষদের গঠন:</strong> প্রত্যক্ষ ভোটে নির্বাচিত ১৫ সদস্যবিশিষ্ট কার্যনির্বাহী পরিষদ ২ (দুই) বছরের জন্য দায়িত্ব পালন করবে। পদসমূহ: ১. সভাপতি (১), ২. সহ-সভাপতি (২), ৩. সাধারণ সম্পাদক (১), ৪. যুগ্ম সম্পাদক (১), ৫. কোষাধ্যক্ষ (১), ৬. সাংগঠনিক সম্পাদক (১), ৭. প্রচার সম্পাদক (১), ৮. সমাজকল্যাণ সম্পাদক (১), ৯. নিরাপত্তা সম্পাদক (১), ১০. স্বাস্থ্য সম্পাদক (১), ১১. ক্রীড়া ও সংস্কৃতি সম্পাদক (১), ১২. নির্বাহী সদস্যগণ (৩ জন)।</p>
                          <p><strong>৪.৩ ক্ষমতা ও দায়িত্ব:</strong> দৈনন্দিন প্রশাসন পরিচালনা, আর্থিক বাজেট প্রণয়ন, সদস্য অন্তর্ভুক্তি, স্টাফ নিয়োগ ও কাজের তদারকি।</p>
                          <p><strong>৪.৪ সভাপতি, সম্পাদক ও কোষাধ্যক্ষ:</strong> যৌথ স্বাক্ষরে ব্যাংক হিসাব পরিচালনা, আয়-ব্যয় সংরক্ষণ ও বার্ষিক অডিট রিপোর্ট পেশ।</p>
                        </div>
                      </div>

                      <!-- Article 5 -->
                      <div class="article">
                        <div class="article-title">ধারা ৫: নিরপেক্ষ নির্বাচন কমিশন ও ভোটাধিকার</div>
                        <div class="article-body">
                          <p><strong>৫.১ নির্বাচন কমিশন:</strong> মেয়াদান্তে ৩ সদস্যবিশিষ্ট নিরপেক্ষ নির্বাচন কমিশন গঠিত হবে যারা তফসিল ঘোষণা করবে।</p>
                          <p><strong>৫.২ ভোটার যোগ্যতা:</strong> "১ সদস্য ১ ভোট" নীতি। বকেয়া সার্ভিস চার্জমুক্ত ভোটারগণ ভোটার তালিকায় অন্তর্ভুক্ত হবেন। নির্বাচনের ১৫ দিন আগে ভোটার তালিকা প্রকাশ বাধ্যতামূলক।</p>
                          <p><strong>৫.৩ প্রার্থীর যোগ্যতা:</strong> স্থায়ী সদস্য, ন্যূনতম ২৫ বছর বয়স ও সোসাইটিতে ১ বছর বসবাসের অভিজ্ঞতা থাকতে হবে। কোনো বকেয়া সার্ভিস চার্জ বা দণ্ডপ্রাপ্ত থাকলে প্রার্থী হওয়া যাবে না।</p>
                          <p><strong>৫.৪ ডিজিটাল ভোট ও স্বচ্ছতা:</strong> OTP ভেরিফিকেশন ও এক ব্যক্তি এক ভোট নিশ্চিত করা হবে।</p>
                        </div>
                      </div>

                      <!-- Article 6 -->
                      <div class="article">
                        <div class="article-title">ধারা ৬: তহবিল পরিচালনা ও আর্থিক অডিট স্বচ্ছতা</div>
                        <div class="article-body">
                          <p><strong>৬.১ তহবিলের উৎস:</strong> মাসিক সার্ভিস চার্জ, অনুদান, বিজ্ঞাপন ও সম্পদ হতে প্রাপ্ত আয়।</p>
                          <p><strong>৬.২ ব্যাংক পরিচালনা:</strong> সভাপতি, সাধারণ সম্পাদক ও কোষাধ্যক্ষের মধ্যে যেকোনো দুজনের যৌথ স্বাক্ষরে হিসাব পরিচালিত হবে। সর্বোচ্চ নগদ ১০,০০০ টাকা রাখা যাবে।</p>
                          <p><strong>৬.৩ সার্ভিস চার্জ ও বকেয়া:</strong> প্রতি মাসের ১-১০ তারিখের মধ্যে পরিশোধ বাধ্যতামূলক। ১০ তারিখের পর বকেয়ার উপর মাসিক ২% হারে সুদ আরোপ। ৩ মাস বকেয়ায় নোটিশ, ৬ মাস বকেয়ায় ইউটিলিটি বিচ্ছিন্নকরণ ও ভোটাধিকার স্থগিত।</p>
                          <p><strong>৬.৪ অডিট ও জরুরি তহবিল:</strong> AGM-এ পেশাদার অডিট রিপোর্ট পেশ বাধ্যতামূলক। মোট আয়ের ন্যূনতম ১০% জরুরি তহবিল হিসেবে সংরক্ষিত থাকবে।</p>
                        </div>
                      </div>

                      <!-- Article 7 -->
                      <div class="article">
                        <div class="article-title">ধারা ৭: সার্বিক নিরাপত্তা, গেট পাস ও ভাড়াটিয়া পুলিশ তথ্য</div>
                        <div class="article-body">
                          <p><strong>৭.১ গেট ব্যবস্থাপনা:</strong> রাত ১১:০০টার পর প্রধান গেট ছাড়া সকল পকেট গেট বন্ধ থাকবে। বহিরাগতদের এন্ট্রি রেজিস্টারে লিপিবদ্ধ করতে হবে।</p>
                          <p><strong>৭.২ পুলিশ ভেরিফিকেশন:</strong> নতুন ভাড়াটিয়া প্রবেশের ৭২ ঘণ্টার মধ্যে শ্যামপুর থানা ও সোসাইটি অফিসে তথ্য ফরম জমা বাধ্যতামূলক।</p>
                          <p><strong>৭.৩ পার্কিং ও সিসিটিভি:</strong> নির্ধারিত পার্কিং স্পেস ব্যবহার বাধ্যতামূলক। রাস্তায় পার্কিং করলে ক্ল্যাম্পিং ও জরিমানা। সিসিটিভি ফুটেজ ৩০ দিন সংরক্ষণ করতে হবে।</p>
                        </div>
                      </div>

                      <!-- Article 8 -->
                      <div class="article">
                        <div class="article-title">ধারা ৮: বর্জ্য ব্যবস্থাপনা ও পরিবেশগত শৃঙ্খলা</div>
                        <div class="article-body">
                          <p><strong>৮.১ বর্জ্য সংগ্রহ:</strong> সকাল ৮:০০ - ১০:০০টার মধ্যে সোসাইটি ভ্যানে ময়লা আবর্জনা প্রদান বাধ্যতামূলক। রাস্তায় ফেলা নিষিদ্ধ।</p>
                          <p><strong>৮.২ শব্দদূষণ ও ড্রেনেজ:</strong> ড্রেনে পলিথিন/কঠিন বর্জ্য ফেলা নিষিদ্ধ। রাত ১০:০০টার পর উচ্চশব্দে লাউডস্পিকার বা গান-বাজনা সম্পূর্ণ নিষিদ্ধ।</p>
                        </div>
                      </div>

                      <!-- Article 9 -->
                      <div class="article">
                        <div class="article-title">ধারা ৯: অভ্যন্তরীণ বিরোধ নিষ্পত্তি ও গঠনতন্ত্র সংশোধন</div>
                        <div class="article-body">
                          <p><strong>৯.১ সালিশি:</strong> ফ্ল্যাট মালিক-ভাড়াটিয়া বিরোধ কার্যনির্বাহী পরিষদের শৃঙ্খলা ও সালিশি কমিটির মাধ্যমে ১৫ দিনের মধ্যে নিষ্পত্তি করা হবে।</p>
                          <p><strong>৯.২ সংশোধন:</strong> AGM বা EGM-এ উপস্থিত দুই-তৃতীয়াংশ (২/৩) সাধারণ সদস্যের অনুমোদনে ধারা সংশোধন করা যাবে।</p>
                        </div>
                      </div>

                      <!-- Article 10 -->
                      <div class="article">
                        <div class="article-title">ধারা ১০: নির্মাণ, সংস্কার ও রঙ করণ বিধিমালা</div>
                        <div class="article-body">
                          <p>১০.১ রাজউকের অনুমোদন ছাড়া কোনো নির্মাণ শুরু করা যাবে না। সোসাইটি অফিসে পূর্বানুমতি বাধ্যতামূলক।</p>
                          <p>১০.২ নির্মাণ কাজ সকাল ৮টা থেকে সন্ধ্যা ৬টার মধ্যে সীমাবদ্ধ রাখতে হবে। শুক্রবার/শনিবার বা রাতে শব্দসৃষ্টিকারী নির্মাণ নিষিদ্ধ। নির্মাণ সামগ্রী রাস্তায় রাখা যাবে না।</p>
                          <p>১০.৩ ভবনের বহিরাঙ্গণ রঙ করতে সোসাইটির রঙের থিম অনুসরণ করতে হবে। অবৈধ বিদ্যুৎ হুকিং সম্পূর্ণ নিষিদ্ধ।</p>
                        </div>
                      </div>

                      <!-- Article 11 -->
                      <div class="article">
                        <div class="article-title">ধারা ১১: পার্কিং, যানবাহন ও যাতায়াত বিধিমালা</div>
                        <div class="article-body">
                          <p>১১.১ সোসাইটির অভ্যন্তরে সর্বোচ্চ গতিসীমা ২০ কি.মি./ঘণ্টা। হর্ন বাজানো নিষিদ্ধ। শিশু ও বয়োবৃদ্ধদের পথচলায় প্রাধান্য দিতে হবে।</p>
                          <p>১১.২ রিকশা/ভ্যান সন্ধ্যা ৭টার পর প্রবেশাধিকার সীমাবদ্ধ। রাস্তায় যানবাহন মেরামত বা তেল পরিবর্তন নিষিদ্ধ।</p>
                        </div>
                      </div>

                      <!-- Article 12 -->
                      <div class="article">
                        <div class="article-title">ধারা ১২: পোষা প্রাণী, পশুপাখি ও পশুপালন বিধিমালা</div>
                        <div class="article-body">
                          <p>১২.১ কুকুরকে লেস (leash) ছাড়া বের করা যাবে না। পোষা প্রাণীর বর্জ্য মালিককে তাৎক্ষণিক পরিষ্কার করতে হবে। আক্রমণাত্মক জাতের কুকুর পালন নিষিদ্ধ।</p>
                          <p>১২.২ হাঁস-মুরগি-কবুতর পালন সীমিত সংখ্যায় অনুমতি সাপেক্ষে। বিষধর সাপ বা ক্ষতিকর প্রাণী পালন সম্পূর্ণরূপে নিষিদ্ধ।</p>
                        </div>
                      </div>

                      <!-- Article 13 -->
                      <div class="article">
                        <div class="article-title">ধারা ১৩: কমন এলাকা, সুবিধা ও সম্পদ ব্যবহার বিধিমালা</div>
                        <div class="article-body">
                          <p>১৩.১ রাস্তা, ফুটপাত, পার্ক, খেলার মাঠ, মসজিদ, পাম্প হাউস ও কমিউনিটি সেন্টার কোনো ব্যক্তিগত বেষ্টনী দিয়ে দখল করা যাবে না।</p>
                          <p>১৩.২ কমিউনিটি সেন্টার ব্যবহারের জন্য পূর্বানুমতি ও নির্ধারিত ফি প্রদান করতে হবে। মসজিদ ও ওযুরখানা পরিষ্কার রাখা বাধ্যতামূলক।</p>
                        </div>
                      </div>

                      <!-- Article 14 -->
                      <div class="article">
                        <div class="article-title">ধারা ১৪: বিজ্ঞাপন, বাণিজ্যিক কার্যক্রম ও ভাড়া বিধিমালা</div>
                        <div class="article-body">
                          <p>১৪.১ আবাসিক এলাকায় বাণিজ্যিক প্রতিষ্ঠান খুলতে সোসাইটি ও রাজউকের পূর্বানুমতি প্রয়োজন।</p>
                          <p>১৪.২ ফ্ল্যাট ভাড়া দেওয়ার ৭ দিনের মধ্যে সোসাইটি অফিসে তথ্য জমা বাধ্যতামূলক। ভাড়াটিয়ার আচরণের জন্য মালিক দায়বদ্ধ থাকবেন।</p>
                        </div>
                      </div>

                      <!-- Article 15 -->
                      <div class="article">
                        <div class="article-title">ধারা ১৫: জরুরি অবস্থা, দুর্যোগ ও স্বাস্থ্য বিধিমালা</div>
                        <div class="article-body">
                          <p>১৫.১ চিকিৎসক ও স্বেচ্ছাসেবকদের নিয়ে জরুরি ব্যবস্থাপনা কমিটি থাকবে। প্রতিটি ভবনে ফায়ার এক্সটিংগুইশার ও নির্গমন পথ সচল রাখতে হবে।</p>
                          <p>১৫.২ প্রতি মাসে ফ্রি হেলথ ক্যাম্প ও নিয়মিত মশক নিধন কর্মসূচি পরিচালনা করা হবে।</p>
                        </div>
                      </div>

                      <!-- Article 16 -->
                      <div class="article">
                        <div class="article-title">ধারা ১৬: শিশু, নারী, বয়োবৃদ্ধ ও প্রতিবন্ধীর অধিকার ও নিরাপত্তা</div>
                        <div class="article-body">
                          <p>১৬.১ শিশু নির্যাতন বা শিশুশ্রম কঠোরভাবে নিষিদ্ধ। নারীদের জন্য নিরাপদ ও সম্মানজনক পরিবেশ নিশ্চিতকরণ; যৌন হয়রানি কঠোর শাস্তিযোগ্য অপরাধ।</p>
                          <p>১৬.২ ফুটপাত ও ভবনে প্রতিবন্ধী ও বয়োবৃদ্ধদের জন্য র‍্যাম্প ও হ্যান্ডরেলের ব্যবস্থা রাখা বাধ্যতামূলক।</p>
                        </div>
                      </div>

                      <!-- Article 17 -->
                      <div class="article">
                        <div class="article-title">ধারা ১৭: তথ্য প্রযুক্তি, ডিজিটাল পোর্টাল ও ডাটা প্রাইভেসি</div>
                        <div class="article-body">
                          <p>১৭.১ অনলাইন ডিজিটাল পোর্টালের মাধ্যমে বিল, ভোট, অভিযোগ ও নোটিশ কার্যক্রম পরিচালিত হবে।</p>
                          <p>১৭.২ সদস্যদের ব্যক্তিগত তথ্য ও সিসিটিভি ফুটেজের গোপনীয়তা শতভাগ সংরক্ষিত থাকবে। কোনো তৃতীয় পক্ষের কাছে তথ্য প্রকাশ নিষিদ্ধ।</p>
                        </div>
                      </div>

                      <!-- Article 18 -->
                      <div class="article">
                        <div class="article-title">ধারা ১৮: দণ্ড, জরিমানা ও শাস্তিমূলক ব্যবস্থা</div>
                        <div class="article-body">
                          <p><strong>১৮.১ সাধারণ শৃঙ্খলা ভঙ্গের জরিমানা তালিকা:</strong></p>
                          <table>
                            <thead>
                              <tr>
                                <th>অপরাধের বিবরণ</th>
                                <th>১ম বার</th>
                                <th>২য় বার</th>
                                <th>৩য় বার</th>
                                <th>প্রশাসনিক ব্যবস্থা</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td>নির্ধারিত সময়ের বাইরে ময়লা ফেলা</td><td>৫০০ ৳</td><td>১,০০০ ৳</td><td>২,০০০ ৳</td><td>সতর্কিকরণ পত্র</td></tr>
                              <tr><td>রাস্তায় অবৈধ পার্কিং</td><td>১,০০০ ৳</td><td>২,০০০ ৳</td><td>৫,০০০ ৳</td><td>গাড়ি ক্ল্যাম্পিং ও টোইং</td></tr>
                              <tr><td>রাত ১০টার পর উচ্চশব্দ</td><td>১,০০০ ৳</td><td>২,০০০ ৳</td><td>৩,০০০ ৳</td><td>সতর্কিকরণ নোটিশ</td></tr>
                              <tr><td>পোষা প্রাণীর বর্জ্য না পরিষ্কার করা</td><td>৫০০ ৳</td><td>১,০০০ ৳</td><td>১,৫০০ ৳</td><td>পোষা প্রাণী নিষিদ্ধ</td></tr>
                              <tr><td>কমন এলাকা দখল করা</td><td>২,০০০ ৳</td><td>৫,০০০ ৳</td><td>১০,০০০ ৳</td><td>জবরদখল উচ্ছেদ</td></tr>
                              <tr><td>ড্রেনে পলিথিন/কঠিন বর্জ্য ফেলা</td><td>১,০০০ ৳</td><td>২,০০০ ৳</td><td>৩,০০০ ৳</td><td>মেরামত ব্যয় বহন</td></tr>
                              <tr><td>নির্মাণ সামগ্রী রাস্তায় রাখা</td><td>১,০০০ ৳</td><td>২,০০০ ৳</td><td>৩,০০০ ৳</td><td>কাজ বন্ধের নির্দেশ</td></tr>
                              <tr><td>অনুমোদনহীন বিজ্ঞাপন/ব্যানার</td><td>৫০০ ৳</td><td>১,০০০ ৳</td><td>২,০০০ ৳</td><td>ব্যানার অপসারণ</td></tr>
                              <tr><td>থুথু/পানের পিক ফেলা</td><td>২০০ ৳</td><td>৫০০ ৳</td><td>১,০০০ ৳</td><td>সামাজিক সেবা প্রদান</td></tr>
                              <tr><td>অপ্রয়োজনীয় হর্ন বাজানো</td><td>৫০০ ৳</td><td>১,০০০ ৳</td><td>১,৫০০ ৳</td><td>সতর্কিকরণ পত্র</td></tr>
                              <tr><td>লিফট/সিঁড়িতে আবর্জনা ফেলা</td><td>৫০০ ৳</td><td>১,০০০ ৳</td><td>১,৫০০ ৳</td><td>সিসিটিভি ফুটেজ প্রকাশ</td></tr>
                            </tbody>
                          </table>

                          <p style="margin-top: 15px;"><strong>১৮.২ গুরুতর অপরাধ ও দণ্ড তালিকা:</strong></p>
                          <table>
                            <thead>
                              <tr>
                                <th>গুরুতর অপরাধ</th>
                                <th>অর্থদণ্ড / শাস্তি</th>
                                <th>অতিরিক্ত আইনি ব্যবস্থা</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td>মারামারি বা হুমকি প্রদান</td><td>১০,০০০ ৳ জরিমানা</td><td>পুলিশে অভিযোগ, সদস্যপদ স্থগিত</td></tr>
                              <tr><td>চুরি, ডাকাতি বা অপরাধমূলক কর্মকাণ্ড</td><td>সদস্যপদ বাতিল</td><td>আইনি ব্যবস্থা ও পুলিশে হস্তান্তর</td></tr>
                              <tr><td>মাদক সেবন বা বিক্রয়</td><td>৫০,০০০ ৳ জরিমানা</td><td>সদস্যপদ বাতিল ও পুলিশে অভিযোগ</td></tr>
                              <tr><td>যৌন হয়রানি বা নারী নির্যাতন</td><td>২০,০০০ ৳ জরিমানা</td><td>সদস্যপদ বাতিল ও আইনি ব্যবস্থা</td></tr>
                              <tr><td>শিশু নির্যাতন বা শিশুশ্রম</td><td>৩০,০০০ ৳ জরিমানা</td><td>সদস্যপদ বাতিল ও পুলিশে অভিযোগ</td></tr>
                              <tr><td>অবৈধ বিদ্যুৎ সংযোগ (হুকিং)</td><td>২৫,০০০ ৳ জরিমানা</td><td>DESCO-এ রিপোর্ট ও সংযোগ বিচ্ছিন্ন</td></tr>
                              <tr><td>রাজউকের অনুমোদন ছাড়া নির্মাণ</td><td>৫০,০০০ ৳ জরিমানা</td><td>নির্মাণ বন্ধ ও রাজউকে রিপোর্ট</td></tr>
                              <tr><td>ভাড়াটিয়া তথ্য গোপন করা</td><td>৫,০০০ ৳ জরিমানা</td><td>ভাড়াটিয়া বহিষ্কার</td></tr>
                              <tr><td>বকেয়া সার্ভিস চার্জ (৩ মাস+)</td><td>বকেয়ার উপর ২% মাসিক সুদ</td><td>ভোটাধিকার স্থগিত ও আইনি নোটিশ</td></tr>
                              <tr><td>সিসিটিভি ক্যামেরা বিনষ্টকরণ</td><td>১৫,০০০ ৳ জরিমানা</td><td>ক্ষতিপূরণ আদায় ও পুলিশে অভিযোগ</td></tr>
                              <tr><td>নির্বাচনে কারচুপি বা ভোট জালিয়াতি</td><td>৫০,০০০ ৳ জরিমানা</td><td>সদস্যপদ বাতিল ও নির্বাচন বাতিল</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <!-- Article 19 & 20 -->
                      <div class="article">
                        <div class="article-title">ধারা ১৯ ও ২০: বিশেষ বিধান, কার্যকরতা ও সমাপনী</div>
                        <div class="article-body">
                          <p><strong>ধারা ১৯:</strong> জরুরি অবস্থা ও দুর্যোগকালীন সময়ে কার্যনির্বাহী পরিষদ বিশেষ সিদ্ধান্ত গ্রহণে ক্ষমতাবান থাকবে। গঠনতন্ত্র অমান্য করলে তা দণ্ডনীয় হবে।</p>
                          <p><strong>ধারা ২০:</strong> এই গঠনতন্ত্র সাধারণ সভার দুই-তৃতীয়াংশ সদস্যের অনুমোদনে কার্যকর হয়েছে। মূল কপি সোসাইটি অফিসে সংরক্ষিত থাকবে এবং প্রতিটি সদস্যকে ডিজিটাল কপি সরবরাহ করা হবে।</p>
                          <p><strong>সমাপনী কথা:</strong> এই গঠনতন্ত্র বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতির সকল নিবাসীর শান্তি, নিরাপত্তা, স্বাস্থ্য ও পারস্পরিক সহযোগিতার ভিত্তিতে একটি সুশৃঙ্খল আদর্শ আবাসিক পরিবেশ গড়ার লক্ষ্যে প্রণীত হলো।</p>
                        </div>
                      </div>

                      <div class="sign-box">
                        <div class="sign-item">
                          <div class="sign-line">সভাপতি<br/>বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</div>
                        </div>
                        <div class="sign-item">
                          <div class="sign-line">সাধারণ সম্পাদক<br/>বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</div>
                        </div>
                        <div class="sign-item">
                          <div class="sign-line">কোষাধ্যক্ষ<br/>বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</div>
                        </div>
                      </div>

                      <div class="footer">
                        <p>“একটি সুশৃঙ্খল সমাজ গড়তে আমরা প্রতিজ্ঞাবদ্ধ” • বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি, ঢাকা</p>
                      </div>
                    </body>
                    </html>
                  `);
                  printWin.document.close();
                  printWin.focus();
                  setTimeout(() => {
                    printWin.print();
                  }, 400);
                }}
                className="w-full sm:w-auto px-5 py-3 bg-[#064e3b] hover:bg-[#043e2f] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-300" />
                <span>অফিশিয়াল গঠনতন্ত্র প্রিন্ট / PDF</span>
              </button>
            </div>
          </div>

          {/* Preamble Callout */}
          <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-2xl border border-emerald-200/80 text-xs text-slate-800 space-y-1.5 shadow-2xs">
            <div className="font-bold flex items-center gap-2 text-[#064e3b] text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>প্রাক্কথন (Preamble):</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              বিক্রমপুর গার্ডেন সিটি সোসাইটির সকল নিবাসীর নিরাপত্তা, কল্যাণ, সুশৃঙ্খল পরিবেশ ও পারস্পরিক সৌহার্দ্য বজায় রাখার লক্ষ্যে এই গঠনতন্ত্র প্রণীত হলো। এই গঠনতন্ত্র সোসাইটির সকল স্থায়ী সদস্য, সহযোগী নিবাসী, ভাড়াটিয়া এবং সোসাইটির আওতাধীন সকল ব্যক্তির জন্য অলঙ্ঘনীয় ও বাধ্যতামূলক।
            </p>
          </div>

          {/* Interactive Search & Chapter Filters */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <input
                  type="text"
                  value={bylawsSearch}
                  onChange={e => setBylawsSearch(e.target.value)}
                  placeholder="ধারা বা বিষয় লিখে সার্চ করুন (যেমন: জরিমানা, পার্কিং, নির্বাচন, ভাড়াটিয়া)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#064e3b] focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                {bylawsSearch && (
                  <button
                    onClick={() => setBylawsSearch('')}
                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 self-end sm:self-auto font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>অধ্যায় ভিত্তিক ফিল্টার</span>
              </div>
            </div>

            {/* Chapter Pills with horizontal scrolling */}
            <div className="flex overflow-x-auto no-scrollbar touch-scroll gap-1.5 text-xs font-semibold pt-1 pb-1">
              {[
                { id: 'all', label: 'সকল ২০টি ধারা (All)' },
                { id: 'admin', label: '🏛️ সংগঠন ও প্রশাসন (ধারা ১-৫)' },
                { id: 'finance_sec', label: '💰 তহবিল ও নিরাপত্তা (ধারা ৬-৯)' },
                { id: 'property', label: '🏗️ নির্মাণ ও পার্কিং (ধারা ১০-১৪)' },
                { id: 'emergency', label: '🚨 স্বাস্থ্য ও অধিকার (ধারা ১৫-১৭)' },
                { id: 'penalty', label: '⚖️ জরিমানা ও দণ্ডবিধি (ধারা ১৮-২০)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setBylawsChapter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                    bylawsChapter === tab.id
                      ? 'bg-[#064e3b] text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 20 Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            {/* Article 1 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'admin') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-xs">
                    ১
                  </div>
                  <h3>ধারা ১: নাম, সীমানা ও সংগঠনের প্রকৃতি</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১.১ পূর্ণ নাম:</strong> বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি (সোসাইটি)।</p>
                  <p><strong>১.২ এখতিয়ার এলাকা:</strong> ৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক সংলগ্ন আবাসিক সোসাইটির আওতাধীন সকল প্লট, ভবন, ফ্ল্যাট, অভ্যন্তরীণ রাস্তা, ড্রেন, পার্কিং এলাকা, কেন্দ্রীয় জামে মসজিদ, কমিউনিটি সেন্টার ও সাধারণ সুবিধাসমূহ।</p>
                  <p><strong>১.৩ সংগঠনের স্বরূপ:</strong> এটি সম্পূর্ণ অরাজনৈতিক, অলাভজনক, ধর্মনিরপেক্ষ এবং আবাসিক নাগরিক কল্যাণমূলক সংগঠন।</p>
                  <p><strong>১.৪ আইনি মর্যাদা:</strong> এই সোসাইটি বাংলাদেশের সংশ্লিষ্ট আইন ও বিধিমালার অধীনে পরিচালিত এবং রাজউক (RAJUK) অনুমোদিত আবাসিক এলাকা হিসেবে স্বীকৃত।</p>
                </div>
              </div>
            )}

            {/* Article 2 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'admin') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-extrabold text-xs">
                    ২
                  </div>
                  <h3>ধারা ২: সোসাইটির লক্ষ্য ও নাগরিক কল্যাণমূলক উদ্দেশ্য</h3>
                </div>
                <div className="space-y-1.5 text-slate-600">
                  <p><strong>২.১ নিরাপত্তা:</strong> আধুনিক সিসিটিভি ব্যবস্থা, ২৪/৭ সিকিউরিটি গার্ড পরিচালনা ও কঠোর নজরদারি।</p>
                  <p><strong>২.২ পরিবেশ ব্যবস্থাপনা:</strong> সুপরিকল্পিত বর্জ্য ব্যবস্থাপনা, ড্রেনেজ সংস্কার ও সবুজায়ন।</p>
                  <p><strong>২.৩ নাগরিক সুবিধা:</strong> ওয়াসা, ডেসকো, তিতাস গ্যাস ও সিটি কর্পোরেশনের সাথে সমন্বয় করে সেবা নিশ্চিতকরণ।</p>
                  <p><strong>২.৪ ধর্মীয় ও সামাজিক কল্যাণ:</strong> জামে মসজিদ ও সামাজিক তহবিল গঠন ও পরিচালনা।</p>
                  <p><strong>২.৫ শিক্ষা ও সংস্কৃতি:</strong> শিশু-কিশোরদের জন্য কোচিং সেন্টার, গ্রন্থাগার ও খেলাধুলা।</p>
                  <p><strong>২.৬ স্বাস্থ্যসেবা:</strong> স্বাস্থ্য ক্যাম্প, এম্বুলেন্স সেবা ও জরুরি চিকিৎসা সহায়তা।</p>
                  <p><strong>২.৭ অবকাঠামো:</strong> অভ্যন্তরীণ রাস্তা, পথবাতি ও ড্রেনেজ ব্যবস্থার রক্ষণাবেক্ষণ।</p>
                </div>
              </div>
            )}

            {/* Article 3 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'admin') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-xs">
                    ৩
                  </div>
                  <h3>ধারা ৩: সদস্যপদের শ্রেণিবিভাগ ও অন্তর্ভুক্তি</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>৩.১ স্থায়ী সদস্য:</strong> প্লট, ভবন ও ফ্ল্যাট মালিকগণ। পূর্ণ ভোটাধিকার ও নির্বাচনে প্রার্থী হওয়ার অধিকারপ্রাপ্ত। মাসিক সার্ভিস চার্জ প্রদান বাধ্যতামূলক।</p>
                  <p><strong>৩.২ সাধারণ সদস্য:</strong> স্থায়ী সদস্যদের পরিবারের প্রাপ্তবয়স্ক সদস্যগণ।</p>
                  <p><strong>৩.৩ সহযোগী নিবাসী:</strong> সম্মানিত ভাড়াটিয়া পরিবারবর্গ। প্রবেশের ৭২ ঘণ্টার মধ্যে পুলিশ ভেরিফিকেশন ও সোসাইটিতে নিবন্ধন বাধ্যতামূলক।</p>
                  <p><strong>৩.৪ সম্মানিত সদস্য:</strong> বিশেষ অবদানের জন্য মনোনীত ব্যক্তিবর্গ।</p>
                  <p><strong>৩.৫ ডিজিটাল নিবন্ধন:</strong> NID ও বিদ্যুৎ বিল দিয়ে ডিজিটাল পোর্টালে আবেদন; কোনো বাড়তি ফি নেই।</p>
                  <p><strong>৩.৬ সদস্যপদ বাতিল:</strong> গঠনতন্ত্র লঙ্ঘন করলে দুই-তৃতীয়াংশ সিদ্ধান্তে সদস্যপদ স্থগিত/বাতিল। ফ্ল্যাট বিক্রির ৩০ দিনের মধ্যে নতুন মালিকের নিবন্ধন বাধ্যতামূলক।</p>
                </div>
              </div>
            )}

            {/* Article 4 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'admin') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-extrabold text-xs">
                    ৪
                  </div>
                  <h3>ধারা ৪: কার্যনির্বাহী পরিষদ (Executive Committee)</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>৪.১ সাধারণ পরিষদ:</strong> সোসাইটির সর্বোচ্চ নীতিনির্ধারণী ফোরাম।</p>
                  <p><strong>৪.২ গঠন:</strong> প্রত্যক্ষ ভোটে নির্বাচিত <strong>১৫ সদস্যবিশিষ্ট</strong> কার্যনির্বাহী পরিষদ ২ বছরের জন্য গঠিত হবে (সভাপতি ১, সহ-সভাপতি ২, সাধারণ সম্পাদক ১, যুগ্ম সম্পাদক ১, কোষাধ্যক্ষ ১, সাংগঠনিক ১, প্রচার ১, সমাজকল্যাণ ১, নিরাপত্তা ১, স্বাস্থ্য ১, ক্রীড়া ও সংস্কৃতি ১, নির্বাহী সদস্য ৩ জন)।</p>
                  <p><strong>৪.৩ ক্ষমতা:</strong> দৈনন্দিন প্রশাসন, আর্থিক বাজেট, স্টাফ নিয়োগ ও তদারকি।</p>
                  <p><strong>৪.৪ ব্যাংক পরিচালনা:</strong> সভাপতি, সাধারণ সম্পাদক ও কোষাধ্যক্ষের মধ্যে দুজনের যৌথ স্বাক্ষরে হিসাব পরিচালিত হবে।</p>
                </div>
              </div>
            )}

            {/* Article 5 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'admin') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-extrabold text-xs">
                    ৫
                  </div>
                  <h3>ধারা ৫: নিরপেক্ষ নির্বাচন কমিশন ও ভোটাধিকার</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>৫.১ নির্বাচন কমিশন:</strong> মেয়াদান্তে ৩ সদস্য বিশিষ্ট নিরপেক্ষ কমিশন গঠিত হবে যারা তফসিল ঘোষণা করবে।</p>
                  <p><strong>৫.২ ভোটার যোগ্যতা:</strong> "১ সদস্য ১ ভোট" নীতি। বকেয়ামুক্ত ভোটারদের খসড়া তালিকা নির্বাচনের ১৫ দিন আগে প্রকাশ বাধ্যতামূলক।</p>
                  <p><strong>৫.৩ প্রার্থী যোগ্যতা:</strong> স্থায়ী সদস্য, বয়স ন্যূনতম ২৫ বছর ও ১ বছর বসবাসের অভিজ্ঞতা।</p>
                  <p><strong>৫.৪ ডিজিটাল ভোটিং:</strong> OTP ভেরিফিকেশন ও স্বচ্ছ ডিজিটাল ব্যালট সিস্টেম।</p>
                  <p><strong>৫.৫ বাতিলকরণ:</strong> কারচুপি প্রমাণিত হলে দুই-তৃতীয়াংশ ভোটারের আবেদনে নির্বাচন বাতিলযোগ্য।</p>
                </div>
              </div>
            )}

            {/* Article 6 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'finance_sec') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-xs">
                    ৬
                  </div>
                  <h3>ধারা ৬: তহবিল পরিচালনা ও আর্থিক অডিট স্বচ্ছতা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>৬.১ তহবিল ও ব্যাংক:</strong> যৌথ ব্যাংক হিসাব। ক্যাশ হিসাবে সর্বোচ্চ ১০,০০০ টাকা রাখা যাবে।</p>
                  <p><strong>৬.২ সার্ভিস চার্জ পরিশোধ:</strong> প্রতি মাসের ১-১০ তারিখের মধ্যে পরিশোধ বাধ্যতামূলক। ১০ তারিখের পর ২% মাসিক সুদ।</p>
                  <p><strong>৬.৩ বকেয়া ব্যবস্থা:</strong> ৩ মাস বকেয়ায় নোটিশ; ৬ মাস বকেয়ায় ইউটিলিটি বিচ্ছিন্ন ও ভোটাধিকার স্থগিত।</p>
                  <p><strong>৬.৪ অডিট ও অনুমোদন:</strong> ৫০,০০০ টাকার উর্ধ্বে ব্যয় সভাপতি-সম্পাদকের অনুমোদন এবং ১,০০,০০০ টাকার উর্ধ্বে ব্যয় সাধারণ সভার অনুমোদন সাপেক্ষে। মোট আয়ের ১০% জরুরি তহবিল হিসেবে সংরক্ষিত থাকবে।</p>
                </div>
              </div>
            )}

            {/* Article 7 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'finance_sec') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-extrabold text-xs">
                    ৭
                  </div>
                  <h3>ধারা ৭: সার্বিক নিরাপত্তা, গেট পাস ও পুলিশ তথ্য</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>৭.১ গেট নিয়ন্ত্রণ:</strong> রাত ১১:০০টার পর প্রধান গেট ছাড়া সকল পকেট গেট বন্ধ। বহিরাগতদের এন্ট্রি রেজিস্টার বাধ্যতামূলক। ডেলিভারি সময়: সকাল ৮টা - রাত ৯টা।</p>
                  <p><strong>৭.২ ভাড়াটিয়া ভেরিফিকেশন:</strong> প্রবেশের ৭২ ঘণ্টার মধ্যে শ্যামপুর থানা ও সোসাইটি অফিসে NID সহ ফরম জমা বাধ্যতামূলক।</p>
                  <p><strong>৭.৩ পার্কিং বিধি:</strong> রাস্তায় গাড়ি রাখলে ক্ল্যাম্পিং। ৩য় বার ৫,০০০ টাকা ও ৪র্থ বার ১০,০০০ টাকা জরিমানা।</p>
                  <p><strong>৭.৪ সিসিটিভি:</strong> সকল গুরুত্বপূর্ণ পয়েন্টে ক্যামেরা; ফুটেজ ৩০ দিন সংরক্ষণ। ভবনে ফায়ার এক্সটিংগুইশার নিশ্চিতকরণ।</p>
                </div>
              </div>
            )}

            {/* Article 8 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'finance_sec') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-extrabold text-xs">
                    ৮
                  </div>
                  <h3>ধারা ৮: বর্জ্য ব্যবস্থাপনা ও পরিবেশগত শৃঙ্খলা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>৮.১ বর্জ্য সংগ্রহ:</strong> প্রতিদিন সকাল ৮:০০ - ১০:০০টার মধ্যে সোসাইটি ভ্যানে আবর্জনা প্রদান বাধ্যতামূলক। রাস্তায় ফেলা দণ্ডনীয়।</p>
                  <p><strong>৮.২ ড্রেনেজ ও পানি:</strong> ড্রেনে পলিথিন/কঠিন বর্জ্য ফেলা নিষিদ্ধ; ড্রেন ব্লকে সংশ্লিষ্ট ফ্ল্যাট মালিক দায়ী।</p>
                  <p><strong>৮.৩ শব্দদূষণ:</strong> রাত ১০:০০টার পর লাউডস্পিকার ও উচ্চশব্দ নিষিদ্ধ। দিনে শব্দের মাত্রা ৫০ ডেসিবলের মধ্যে রাখা।</p>
                  <p><strong>৮.৪ সবুজায়ন:</strong> গাছ কাটা নিষিদ্ধ। পানের পিক ফেলা বা রাস্তার পরিবেশ নষ্ট করা যাবে না।</p>
                </div>
              </div>
            )}

            {/* Article 9 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'finance_sec') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-extrabold text-xs">
                    ৯
                  </div>
                  <h3>ধারা ৯: অভ্যন্তরীণ বিরোধ নিষ্পত্তি ও গঠনতন্ত্র সংশোধন</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>৯.১ সালিশি:</strong> ফ্ল্যাট মালিক-ভাড়াটিয়া বিরোধ শৃঙ্খলা ও সালিশি কমিটির মাধ্যমে ১৫ দিনের মধ্যে নিষ্পত্তি।</p>
                  <p><strong>৯.২ গঠনতন্ত্র সংশোধন:</strong> AGM বা EGM-এ দুই-তৃতীয়াংশ (২/৩) সদস্যের সমর্থনে ধারা সংশোধনযোগ্য (১৫ দিন আগে নোটিশ প্রেরণ)।</p>
                  <p><strong>৯.৩ আইনি ক্ষমতা:</strong> শৃঙ্খলা ভঙ্গকারীর বিরুদ্ধে পুলিশে অভিযোগ ও মামলা পরিচালনার পূর্ণ এখতিয়ার।</p>
                </div>
              </div>
            )}

            {/* Article 10 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'property') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-xs">
                    ১০
                  </div>
                  <h3>ধারা ১০: নির্মাণ, সংস্কার ও রঙ করণ বিধিমালা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১০.১ রাজউক অনুমোদন:</strong> রাজউকের অনুমোদন ছাড়া কোনো নির্মাণ শুরু করা যাবে না। ক্ষতিগ্রস্ত হলে মালিক ক্ষতিপূরণ দেবেন।</p>
                  <p><strong>১০.২ সময়সীমা:</strong> কাজ সকাল ৮টা - সন্ধ্যা ৬টার মধ্যে সীমাবদ্ধ। শুক্র/শনিবার ও রাতে শব্দসৃষ্টিকারী কাজ নিষিদ্ধ। নির্মাণ সামগ্রী রাস্তায় রাখা যাবে না।</p>
                  <p><strong>১০.৩ রঙ ও বহিরাঙ্গণ:</strong> সোসাইটির রঙের থিম অনুসরণ করতে হবে। অবৈধ বিদ্যুৎ হুকিং সম্পূর্ণ নিষিদ্ধ।</p>
                </div>
              </div>
            )}

            {/* Article 11 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'property') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-extrabold text-xs">
                    ১১
                  </div>
                  <h3>ধারা ১১: পার্কিং, যানবাহন ও যাতায়াত বিধিমালা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১১.১ পার্কিং শৃঙ্খলা:</strong> নির্ধারিত পার্কিং স্পেস ব্যবহার। বাণিজ্যিকভাবে পার্কিং ভাড়া দেওয়া নিষিদ্ধ।</p>
                  <p><strong>১১.২ গতিসীমা:</strong> সোসাইটির ভেতরে সর্বোচ্চ গতি ২০ কি.মি./ঘণ্টা। হর্ন বাজানো নিষিদ্ধ। শিশু ও বয়োবৃদ্ধদের প্রাধান্য দিতে হবে।</p>
                  <p><strong>১১.৩ কুরিয়ার ও মেরামত:</strong> রিকশা/ভ্যান সন্ধ্যা ৭টার পর প্রবেশাধিকার সীমিত। রাস্তায় যানবাহন মেরামত বা তেল পরিবর্তন নিষিদ্ধ।</p>
                </div>
              </div>
            )}

            {/* Article 12 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'property') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-extrabold text-xs">
                    ১২
                  </div>
                  <h3>ধারা ১২: পোষা প্রাণী ও পশুপালন বিধিমালা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১২.১ পোষা প্রাণী:</strong> কুকুরকে লেস (leash) ছাড়া বের করা যাবে না। বর্জ্য তাৎক্ষণিকভাবে মালিককে পরিষ্কার করতে হবে। আক্রমণাত্মক জাত (Pitbull ইত্যাদি) নিষিদ্ধ।</p>
                  <p><strong>১২.২ পশুপাখি:</strong> হাঁস-মুরগি-কবুতর পালন সীমিত সংখ্যায় অনুমতি সাপেক্ষে। বিষধর সাপ বা ক্ষতিকর প্রাণী পালন সম্পূর্ণরূপে নিষিদ্ধ।</p>
                </div>
              </div>
            )}

            {/* Article 13 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'property') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-xs">
                    ১৩
                  </div>
                  <h3>ধারা ১৩: কমন এলাকা ও সুবিধা ব্যবহার বিধিমালা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১৩.১ কমন এলাকা:</strong> রাস্তা, ফুটপাত, পার্ক, খেলার মাঠ, মসজিদ, পাম্প হাউস ও কমিউনিটি সেন্টার কোনোভাবেই ব্যক্তিগতভাবে দখল করা যাবে না।</p>
                  <p><strong>১৩.২ সুবিধা ব্যবহার:</strong> কমিউনিটি সেন্টার ব্যবহারের জন্য পূর্বানুমতি ও নির্ধারিত ফি প্রযোজ্য। মসজিদ ও ওযুরখানা পরিষ্কার রাখা সকলের দায়িত্ব।</p>
                </div>
              </div>
            )}

            {/* Article 14 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'property') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-extrabold text-xs">
                    ১৪
                  </div>
                  <h3>ধারা ১৪: বিজ্ঞাপন, বাণিজ্যিক কার্যক্রম ও ভাড়া বিধিমালা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১৪.১ বাণিজ্যিক কার্যক্রম:</strong> আবাসিক এলাকায় দোকান, কোচিং বা ক্লিনিক খুলতে সোসাইটি ও রাজউকের পূর্বানুমতি বাধ্যতামূলক।</p>
                  <p><strong>১৪.২ ভাড়া প্রদান:</strong> ফ্ল্যাট ভাড়ার ৭ দিনের মধ্যে ভাড়াটিয়া তথ্য জমা বাধ্যতামূলক। ভাড়াটিয়ার আচরণের জন্য মালিক দায়বদ্ধ থাকবেন।</p>
                </div>
              </div>
            )}

            {/* Article 15 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'emergency') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-extrabold text-xs">
                    ১৫
                  </div>
                  <h3>ধারা ১৫: জরুরি অবস্থা, দুর্যোগ ও স্বাস্থ্য বিধিমালা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১৫.১ দুর্যোগ প্রস্তুতি:</strong> জরুরি ব্যবস্থাপনা কমিটি, ফায়ার ড্রিল ও ভবনে জরুরি নির্গমন পথ নিশ্চিতকরণ।</p>
                  <p><strong>১৫.২ স্বাস্থ্যসেবা:</strong> প্রতি মাসে ফ্রি হেলথ ক্যাম্প, এম্বুলেন্স সহায়তা ও নিয়মিত মশক নিধন পরিচালনা।</p>
                </div>
              </div>
            )}

            {/* Article 16 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'emergency') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-800 flex items-center justify-center font-extrabold text-xs">
                    ১৬
                  </div>
                  <h3>ধারা ১৬: শিশু, নারী, বয়োবৃদ্ধ ও প্রতিবন্ধীর অধিকার</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১৬.১ শিশু ও নারী:</strong> শিশু নির্যাতন ও শিশুশ্রম কঠোরভাবে নিষিদ্ধ। নারীদের প্রতি অশোভন আচরণ বা হয়রানি গুরুতর ফৌজদারি অপরাধ।</p>
                  <p><strong>১৬.২ প্রতিবন্ধী ও প্রবীণ:</strong> ফুটপাত ও ভবনে র‍্যাম্প ও হ্যান্ডরেলের ব্যবস্থা নিশ্চিতকরণ।</p>
                </div>
              </div>
            )}

            {/* Article 17 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'emergency') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center font-extrabold text-xs">
                    ১৭
                  </div>
                  <h3>ধারা ১৭: তথ্য প্রযুক্তি, ডিজিটাল পোর্টাল ও ডাটা প্রাইভেসি</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১৭.১ ডিজিটাল সেবা:</strong> পোর্টালের মাধ্যমে বিল প্রদান, ভোট, অভিযোগ দাখিল ও নোটিশ প্রদান।</p>
                  <p><strong>১৭.২ ডাটা প্রাইভেসি:</strong> NID ও ব্যক্তিগত তথ্য কঠোরভাবে গোপন থাকবে। সিসিটিভি ফুটেজ শুধুমাত্র নিরাপত্তার স্বার্থে ব্যবহার্য।</p>
                </div>
              </div>
            )}

            {/* Article 19 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'penalty') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-extrabold text-xs">
                    ১৯
                  </div>
                  <h3>ধারা ১৯: বিশেষ বিধান ও সার্বজনীন বাধ্যবাধকতা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>১৯.১ দুর্যোগকালীন ক্ষমতা:</strong> জাতীয় দুর্যোগ বা মহামারিতে কার্যনির্বাহী পরিষদ বিশেষ সিদ্ধান্ত গ্রহণে ক্ষমতাবান।</p>
                  <p><strong>১৯.২ বাধ্যবাধকতা:</strong> এই গঠনতন্ত্র সোসাইটির সকল সদস্য, ভাড়াটিয়া, কর্মচারী ও ঠিকাদারদের জন্য সমভাবে প্রযোজ্য ও অলঙ্ঘনীয়।</p>
                </div>
              </div>
            )}

            {/* Article 20 */}
            {(bylawsChapter === 'all' || bylawsChapter === 'penalty') && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-xs">
                    ২০
                  </div>
                  <h3>ধারা ২০: কার্যকরতা, সংরক্ষণ ও ভাষা</h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><strong>২০.১ কার্যকরতা:</strong> সাধারণ সভার দুই-তৃতীয়াংশ অনুমোদনের মাধ্যমে এই গঠনতন্ত্র কার্যকর হয়েছে।</p>
                  <p><strong>২০.২ সংরক্ষণ ও ভাষা:</strong> মূল কপি সোসাইটি অফিসে সংরক্ষিত এবং প্রতিটি সদস্যকে ডিজিটাল কপি প্রদান। বাংলা ভাষার কপিটি আইনগতভাবে চূড়ান্ত বলে গণ্য হবে।</p>
                </div>
              </div>
            )}
          </div>

          {/* Article 18: Penalty & Disciplinary Tables (Full Width Spotlight) */}
          {(bylawsChapter === 'all' || bylawsChapter === 'penalty') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-extrabold text-sm">
                    ১৮
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      ধারা ১৮: দণ্ড, জরিমানা ও শাস্তিমূলক ব্যবস্থার তফসিল
                    </h3>
                    <p className="text-xs text-slate-500">
                      শৃঙ্খলা ভঙ্গ ও আইন অমান্যের ক্ষেত্রে কার্যকর অর্থদণ্ড ও প্রশাসনিক ব্যবস্থার তালিকা
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-3 py-1 rounded-full border border-rose-200">
                  আইনগত বাধ্যবাধকতা
                </span>
              </div>

              {/* Table 18.1: General Discipline Penalties */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>১৮.১ সাধারণ শৃঙ্খলা ভঙ্গের জন্য জরিমানা তালিকা:</span>
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <tr>
                        <th className="py-3 px-4">অপরাধের বিবরণ</th>
                        <th className="py-3 px-3 text-center">১ম বার</th>
                        <th className="py-3 px-3 text-center">২য় বার</th>
                        <th className="py-3 px-3 text-center">৩য় বার</th>
                        <th className="py-3 px-4">প্রশাসনিক ব্যবস্থা</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">নির্ধারিত সময়ের বাইরে ময়লা ফেলা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">৫০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">২,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-slate-500">সতর্কিকরণ পত্র</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">রাস্তায় অবৈধ গাড়ি/বাইক পার্কিং</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">২,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">৫,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-rose-700 font-semibold">গাড়ি ক্ল্যাম্পিং ও টোইং</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">রাত ১০টার পর উচ্চশব্দ বা লাউডস্পিকার</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">২,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">৩,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-slate-500">সতর্কিকরণ নোটিশ</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">পোষা প্রাণীর বর্জ্য না পরিষ্কার করা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">৫০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">১,৫০০ ৳</td>
                        <td className="py-2.5 px-4 text-rose-700 font-semibold">পোষা প্রাণী নিষিদ্ধকরণ</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">কমন এলাকা দখল বা মালামাল রাখা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">২,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">৫,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">১০,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-rose-700 font-semibold">জবরদখল উচ্ছেদ</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">ড্রেনে পলিথিন বা কঠিন বর্জ্য ফেলা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">২,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">৩,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-slate-500">মেরামত ব্যয় বহন</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">নির্মাণ সামগ্রী রাস্তায় স্তূপ করে রাখা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">২,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">৩,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-rose-700 font-semibold">নির্মাণ কাজ বন্ধের আদেশ</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">অনুমোদনহীন বিজ্ঞাপন বা ব্যানার লাগানো</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">৫০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">২,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-slate-500">ব্যানার অপসারণ</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">রাস্তায় থুথু বা পানের পিক ফেলা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">২০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">৫০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-4 text-slate-500">সামাজিক সেবা প্রদান</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">সোসাইটিতে অপ্রয়োজনীয় হর্ন বাজানো</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">৫০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">১,৫০০ ৳</td>
                        <td className="py-2.5 px-4 text-slate-500">সতর্কিকরণ পত্র</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-800">লিফট বা সিঁড়িতে আবর্জনা ফেলা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">৫০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-700">১,০০০ ৳</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">১,৫০০ ৳</td>
                        <td className="py-2.5 px-4 text-rose-700 font-semibold">ক্যামেরা ফুটেজ প্রকাশ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 18.2: Serious Offenses & Penalties */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs sm:text-sm text-rose-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>১৮.২ গুরুতর অপরাধ ও কঠোর শাস্তিমূলক ব্যবস্থা:</span>
                </h4>
                <div className="overflow-x-auto rounded-xl border border-rose-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-rose-50 border-b border-rose-200 text-rose-950 font-bold">
                      <tr>
                        <th className="py-3 px-4">গুরুতর অপরাধ</th>
                        <th className="py-3 px-3 text-center">অর্থদণ্ড / শাস্তি</th>
                        <th className="py-3 px-4">অতিরিক্ত আইনি ব্যবস্থা</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 text-slate-700">
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">সোসাইটির শান্তি ভঙ্গ (মারামারি, হুমকি)</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">১০,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">থানায় অভিযোগ ও সদস্যপদ স্থগিত</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">চুরি, ডাকাতি বা অপরাধমূলক কর্মকাণ্ড</td>
                        <td className="py-2.5 px-3 text-center font-bold text-rose-800">সদস্যপদ বাতিল</td>
                        <td className="py-2.5 px-4 text-slate-600">আইনি ব্যবস্থা ও পুলিশে সোপর্দ</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">মাদক সেবন বা বিক্রয় কার্যক্রম</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">৫০,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">সদস্যপদ বাতিল ও পুলিশে সোপর্দ</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">যৌন হয়রানি বা নারী নির্যাতন</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">২০,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">সদস্যপদ বাতিল ও আইনি পদক্ষেপ</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">শিশু নির্যাতন বা শিশুশ্রম</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">৩০,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">সদস্যপদ বাতিল ও পুলিশে অভিযোগ</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">অবৈধ বিদ্যুৎ সংযোগ (হুকিং)</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">২৫,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">DESCO-এ রিপোর্ট ও সংযোগ বিচ্ছিন্ন</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">রাজউকের অনুমোদন ছাড়া অবৈধ নির্মাণ</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">৫০,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">কাজ বন্ধ ও রাজউকে রিপোর্ট</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">ভাড়াটিয়া তথ্য গোপন করা</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700">৫,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">ভাড়াটিয়া বহিষ্কার ও নোটিশ</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">বকেয়া সার্ভিস চার্জ (৩ মাস+)</td>
                        <td className="py-2.5 px-3 text-center font-bold text-amber-800">বকেয়ার উপর ২% সুদ</td>
                        <td className="py-2.5 px-4 text-slate-600">ভোটাধিকার স্থগিত ও আইনি নোটিশ</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">সিসিটিভি ক্যামেরা বিনষ্টকরণ</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">১৫,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">ক্ষতিপূরণ আদায় ও পুলিশে অভিযোগ</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">মিথ্যা তথ্য দিয়ে সদস্যপদ গ্রহণ</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">২০,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">স্থায়ী সদস্যপদ বাতিল</td>
                      </tr>
                      <tr className="hover:bg-rose-50/40">
                        <td className="py-2.5 px-4 font-semibold text-slate-900">নির্বাচনে কারচুপি বা ভোট জালিয়াতি</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-800">৫০,০০০ ৳ জরিমানা</td>
                        <td className="py-2.5 px-4 text-slate-600">সদস্যপদ বাতিল ও নির্বাচন বাতিল</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 18.3 & 18.4 Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h5 className="font-bold text-slate-800">১৮.৩ জরিমানা আদায় ও হিসাব স্বচ্ছতা:</h5>
                  <p>জরিমানা আদায়ের অফিসিয়াল রসিদ প্রদান বাধ্যতামূলক। জরিমানার অর্থ সোসাইটির তহবিলে জমা হবে এবং অডিটের আওতায় আসবে। পরিশোধ না করলে ভোটাধিকার স্থগিত থাকবে।</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h5 className="font-bold text-slate-800">১৮.৪ আপিল ও পুনর্বিবেচনা:</h5>
                  <p>যেকোনো জরিমানার আদেশের বিরুদ্ধে ১৫ দিনের মধ্যে সালিশি কমিটির কাছে আপিল করা যাবে। সালিশি কমিটির সিদ্ধান্ত চূড়ান্ত বলে বিবেচিত হবে।</p>
                </div>
              </div>
            </div>
          )}

          {/* Official Signatories & Closing Banner */}
          <div className="bg-gradient-to-r from-[#064e3b] via-[#003527] to-[#131b2e] text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>সমাপনী অঙ্গীকার</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                “একটি সুশৃঙ্খল সমাজ গড়তে আমরা প্রতিজ্ঞাবদ্ধ”
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                এই গঠনতন্ত্র বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতির সকল নিবাসীর শান্তি, নিরাপত্তা, স্বাস্থ্য ও পারস্পরিক সহযোগিতার ভিত্তিতে একটি আদর্শ আবাসিক পরিবেশ গড়ার লক্ষ্যে কার্যকর রয়েছে।
              </p>
            </div>

            {/* Signature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/15 text-center text-xs">
              <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="font-serif italic text-amber-300 text-sm">Approved by President</div>
                <div className="font-bold text-white">সভাপতি</div>
                <div className="text-[11px] text-slate-300">বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</div>
              </div>

              <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="font-serif italic text-amber-300 text-sm">Attested by GS</div>
                <div className="font-bold text-white">সাধারণ সম্পাদক</div>
                <div className="text-[11px] text-slate-300">বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</div>
              </div>

              <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="font-serif italic text-amber-300 text-sm">Verified by Treasurer</div>
                <div className="font-bold text-white">কোষাধ্যক্ষ</div>
                <div className="text-[11px] text-slate-300">বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
