import React, { useState } from 'react';
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
  ChevronUp
} from 'lucide-react';

export const SocietyDirectoryPage: React.FC = () => {
  const { committeeMembers } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'committee' | 'emergency' | 'rules'>('committee');

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

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('committee')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'committee'
              ? 'border-[#1e3a5f] text-[#1e3a5f] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>পরিচালনা পরিষদ ও কমিটি সদস্য</span>
        </button>

        <button
          onClick={() => setActiveSubTab('emergency')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'emergency'
              ? 'border-rose-600 text-rose-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Phone className="w-4 h-4 text-rose-600" />
          <span>জরুরি হটলাইন ও ইউটিলিটি</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'rules'
              ? 'border-blue-600 text-blue-800 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>সোসাইটি গঠনতন্ত্র ও নিয়মাবলী</span>
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

      {/* SUBTAB 3: COMPREHENSIVE RULES & CONSTITUTION */}
      {activeSubTab === 'rules' && (
        <div className="space-y-6">
          {/* Top Document Header & Print Action */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="BGC Seal"
                className="w-14 h-14 rounded-full object-contain bg-[#faf8ff] p-1 ring-2 ring-emerald-600/20 shrink-0 drop-shadow-sm"
              />
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  <Scale className="w-3 h-3" />
                  <span>অফিশিয়াল গঠনতন্ত্র • সংশোধিত সংস্করণ ২০২৬</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  বিক্রমপুর গার্ডেন সিটি সোসাইটির মূল গঠনতন্ত্র ও পরিচালনা নীতিমালা
                </h2>
                <p className="text-xs text-slate-500">
                  আবাসিক পরিবেশ রক্ষা, নিরাপত্তা, গণতান্ত্রিক নির্বাচন ও নাগরিক অধিকার সংরক্ষণের আইনি ভিত্তি
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const printWin = window.open('', '_blank');
                if (!printWin) return;
                printWin.document.write(`
                  <!DOCTYPE html>
                  <html lang="bn">
                  <head>
                    <title>Bikrampur Garden City Society - Official Constitution 2026</title>
                    <style>
                      body { font-family: 'Hind Siliguri', system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; max-width: 800px; mx-auto; }
                      .header { text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 20px; margin-bottom: 30px; }
                      .logo { width: 80px; height: 80px; margin-bottom: 10px; }
                      h1 { font-size: 22px; color: #064e3b; margin: 5px 0; }
                      h2 { font-size: 14px; color: #475569; margin: 0; font-weight: normal; }
                      .article { margin-bottom: 24px; page-break-inside: avoid; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; }
                      .article-title { font-size: 14px; font-weight: bold; color: #064e3b; margin-top: 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; }
                      .article-body { font-size: 12px; color: #334155; }
                      ul { margin: 8px 0; padding-left: 20px; }
                      li { margin-bottom: 4px; }
                      .footer { text-align: center; margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 15px; font-size: 10px; color: #64748b; }
                      @media print { body { padding: 20px; } }
                    </style>
                  </head>
                  <body>
                    <div class="header">
                      <img src="/logo.png" class="logo" />
                      <h1>বিক্রমপুর গার্ডেন সিটি সোসাইটি (আবাসিক কল্যাণ সমিতি)</h1>
                      <h2>৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক, শ্যামপুর, ঢাকা-১২০৪</h2>
                      <p style="font-size: 12px; font-weight: bold; color: #0f766e; margin-top: 5px;">সোসাইটির অনুমোদিত গঠনতন্ত্র ও পরিচালনা নীতিমালা ২০২৬</p>
                    </div>
                    
                    <div class="article">
                      <div class="article-title">ধারা ১: নাম, সীমানা ও প্রকৃতি</div>
                      <div class="article-body">
                        (ক) সংগঠনের নাম: <strong>বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি (সোসাইটি)</strong>।<br/>
                        (খ) এখতিয়ার এলাকা: ৪৪২ ঢোলাইপাড় ঢাকা-মাওয়া মহাসড়ক সংলগ্ন আবাসিক এলাকার আওতাধীন সকল প্লট, ভবন ও ফ্ল্যাটসমূহ।<br/>
                        (গ) প্রকৃতি: এটি একটি সম্পূর্ণ অরাজনৈতিক, অলাভজনক, ধর্মনিরপেক্ষ ও আবাসিক কল্যাণমূলক নাগরিক সমিতি।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ২: উদ্দেশ্য ও লক্ষ্য</div>
                      <div class="article-body">
                        ১. আবাসিক এলাকার সার্বিক নিরাপত্তা, সিসিটিভি মনিটরিং ও ২৪/৭ দক্ষ নিরাপত্তা প্রহরী ব্যবস্থাপনা নিশ্চিতকরণ।<br/>
                        ২. নিয়মিত বর্জ্য অপসারণ, ড্রেনেজ ও স্যুয়ারেজ ব্যবস্থার উন্নয়ন এবং পরিষ্কার-পরিচ্ছন্ন সবুজ পরিবেশ বজায় রাখা।<br/>
                        ৩. ওয়াসা, ডেসকো ও তিতাস গ্যাস কর্তৃপক্ষের সাথে যোগাযোগ রক্ষা করে নিরবচ্ছিন্ন নাগরিক সেবা সুনিশ্চিত করা।<br/>
                        ৪. কেন্দ্রীয় জামে মসজিদ ও মাদ্রাসা তহবিল উন্নয়ন এবং ধর্মীয় ও জাতীয় দিবসসমূহ সৌহার্দ্যপূর্ণভাবে উদযাপন।<br/>
                        ৫. নিবাসীগণের পারস্পরিক ভ্রাতৃত্ব ও সৌহার্দ্য রক্ষা এবং যেকোনো সামাজিক বিরোধ বন্ধুত্বপূর্ণভাবে নিষ্পত্তি করা।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ৩: সদস্যপদের শ্রেণিবিভাগ ও অন্তর্ভুক্তি যোগ্যতা</div>
                      <div class="article-body">
                        ১. <strong>সাধারণ সদস্য (Permanent/General Member):</strong> সোসাইটিভুক্ত প্লট মালিক, সম্পূর্ণ ভবন মালিক বা স্বতন্ত্র ফ্ল্যাট মালিকগণ। তারা ভোটাধিকার প্রয়োগ ও নির্বাচনে প্রার্থী হওয়ার পূর্ণ ক্ষমতার অধিকারী হবেন।<br/>
                        ২. <strong>সহযোগী/নিবাসী সদস্য (Resident/Associate Member):</strong> সোসাইটিতে বসবাসরত সকল সম্মানিত ভাড়াটিয়া পরিবার। তারা সোসাইটির সকল নাগরিক সুবিধা উপভোগ করবেন।<br/>
                        ৩. <strong>অন্তর্ভুক্তি নিয়ম:</strong> নির্ধারিত আবেদন ফরমের মাধ্যমে জাতীয় পরিচয়পত্র (NID) ও বিদ্যুৎ/ইউটিলিটি বিলের কপি সংযুক্ত করে আবেদন করতে হবে।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ৪: সাংগঠনিক কাঠামো ও কার্যনির্বাহী পরিষদ (Executive Committee)</div>
                      <div class="article-body">
                        (ক) সোসাইটির সর্বোচ্চ ক্ষমতা সাধারণ পরিষদ (General Body) এর হাতে ন্যস্ত থাকবে।<br/>
                        (খ) সাধারণ পরিষদ কর্তৃক প্রত্যক্ষ ভোটে নির্বাচিত ১৫ সদস্যবিশিষ্ট কার্যনির্বাহী পরিষদ (EC) ২ (দুই) বছর মেয়াদে সোসাইটি পরিচালনা করবে।<br/>
                        (গ) পদসমূহ: সভাপতি (১), সহ-সভাপতি (২), সাধারণ সম্পাদক (১), যুগ্ম সাধারণ সম্পাদক (১), সাংগঠনিক সম্পাদক (১), কোষাধ্যক্ষ (১), দপ্তর ও প্রচার সম্পাদক (১), সমাজকল্যাণ ও ধর্মীয় সম্পাদক (১), নিরাপত্তা ও আইন সম্পাদক (১), পরিবেশ ও স্বাস্থ্য সম্পাদক (১) এবং নির্বাহী সদস্য (৪ জন)।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ৫: নির্বাচন কমিশন ও গণতান্ত্রিক ভোটাধিকার</div>
                      <div class="article-body">
                        ১. প্রতি দুই বছর পর পর কার্যনির্বাহী পরিষদের মেয়াদান্তে ৩ সদস্য বিশিষ্ট নিরপেক্ষ নির্বাচন কমিশন গঠিত হবে।<br/>
                        ২. নীতি: <strong>"১ প্লট/ইউনিট = ১ ভোট"</strong>। কোনো ডুপ্লিকেট ভোট গ্রহণযোগ্য হবে না।<br/>
                        ৩. স্বচ্ছ ডিজিটাল ভোটার তালিকা ও গোপন ব্যালটের মাধ্যমে ভোটগ্রহণ সম্পন্ন করা হবে।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ৬: তহবিল ব্যবস্থাপনা ও আর্থিক স্বচ্ছতা</div>
                      <div class="article-body">
                        ১. প্রতিটি ভবন/ফ্ল্যাট থেকে নির্ধারিত মাসিক রক্ষণাবেক্ষণ সার্ভিস চার্জ নিয়মিত প্রদান করতে হবে।<br/>
                        ২. যেকোনো ব্যাংকে 'বিক্রমপুর গার্ডেন সিটি সোসাইটি' নামে পরিচালিত হিসাবে সভাপতি, সাধারণ সম্পাদক ও কোষাধ্যক্ষের মধ্যে যেকোনো দুজনের যৌথ স্বাক্ষরে তহবিল পরিচালিত হবে।<br/>
                        ৩. প্রতি বছর বার্ষিক সাধারণ সভা (AGM)-তে অডিটকৃত আয়-ব্যয়ের পূর্ণাঙ্গ হিসাব উপস্থাপন বাধ্যতামূলক।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ৭: সার্বিক নিরাপত্তা, গেট নিয়ন্ত্রণ ও ভাড়াটিয়া পুলিশ তথ্য</div>
                      <div class="article-body">
                        ১. রাত ১১:০০ টার পর প্রধান গেট ব্যতিত সকল পকেট গেট বন্ধ থাকবে।<br/>
                        ২. নতুন ভাড়াটিয়া ওঠার ৭২ ঘণ্টার মধ্যে সোসাইটি অফিস ও শ্যামপুর থানায় নির্ধারিত পুলিশ ভেরিফিকেশন ফরম জমা দেওয়া বাধ্যতামূলক।<br/>
                        ৩. নির্ধারিত পার্কিং স্পেস ব্যতিত প্রধান রাস্তা বা গলিতে গাড়ি রেখে যান চলাচলে প্রতিবন্ধকতা সৃষ্টি করা যাবে না।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ৮: বর্জ্য ব্যবস্থাপনা ও পরিবেশ শৃঙ্খলা</div>
                      <div class="article-body">
                        ১. প্রতিদিন সকাল ৮:০০ থেকে ১০:০০ টার মধ্যে নির্ধারিত সোসাইটি বর্জ্য ভ্যানে আবর্জনা প্রদান করতে হবে। উন্মুক্ত স্থানে ময়লা ফেলা কঠোরভাবে নিষিদ্ধ।<br/>
                        ২. রাত ১০:০০ টার পর উচ্চশব্দে লাউডস্পিকার বা প্রতিবেশীর বিরক্তির কারণ হয় এমন কার্যকলাপ নিষিদ্ধ।
                      </div>
                    </div>

                    <div class="article">
                      <div class="article-title">ধারা ৯: বিরোধ নিষ্পত্তি ও গঠনতন্ত্র সংশোধন</div>
                      <div class="article-body">
                        ১. নিবাসীগণের অভ্যন্তরীণ যে কোনো বিরোধ কার্যনির্বাহী পরিষদের সালিশি বৈঠকের মাধ্যমে স্থানীয়ভাবে নিষ্পত্তি করা হবে।<br/>
                        ২. বার্ষিক সাধারণ সভা (AGM) বা বিশেষ সাধারণ সভা (EGM)-এ দুই-তৃতীয়াংশ (২/৩) সদস্যের সমর্থনে গঠনতন্ত্রের যেকোনো ধারা সংশোধন করা যাবে।
                      </div>
                    </div>

                    <div class="footer">
                      <p>স্বাক্ষরিত: সভাপতি ও সাধারণ সম্পাদক, বিক্রমপুর গার্ডেন সিটি সোসাইটি • ঢাকা-১২০৪</p>
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
              className="px-5 py-2.5 bg-[#1e3a5f] hover:bg-[#12253d] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>গঠনতন্ত্র প্রিন্ট / PDF সংরক্ষণ</span>
            </button>
          </div>

          {/* Structured Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            {/* Article 1 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-xs">
                  ১
                </div>
                <h3>ধারা ১: নাম, সীমানা ও সংগঠনের প্রকৃতি</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>পূর্ণ নাম:</strong> বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি (সোসাইটি)।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>এখতিয়ার এলাকা:</strong> ৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক সংলগ্ন আবাসিক সোসাইটির আওতাধীন সকল প্লট, ভবন ও ফ্ল্যাটসমূহ।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>সংগঠনের স্বরূপ:</strong> এটি সম্পূর্ণ অরাজনৈতিক, অলাভজনক, ধর্মনিরপেক্ষ এবং আবাসিক নাগরিক কল্যাণমূলক সংগঠন।</span>
                </li>
              </ul>
            </div>

            {/* Article 2 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-extrabold text-xs">
                  ২
                </div>
                <h3>ধারা ২: সোসাইটির লক্ষ্য ও নাগরিক কল্যাণমূলক উদ্দেশ্য</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>সোসাইটির সার্বিক নিরাপত্তা নিশ্চিতকরণে আধুনিক সিসিটিভি ব্যবস্থা ও ২৪/৭ সিকিউরিটি গার্ড পরিচালনা।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>সুপরিকল্পিত বর্জ্য ব্যবস্থাপনা, ড্রেনেজ সংস্কার ও পরিষ্কার-পরিচ্ছন্ন পরিবেশ সংরক্ষণ।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>ওয়াসা, ডেসকো, তিতাস গ্যাস ও সিটি কর্পোরেশনের সাথে সমন্বয় করে নাগরিক সুবিধার মানোন্নয়ন।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>কেন্দ্রীয় জামে মসজিদ ও সামাজিক উন্নয়নমূলক তহবিল গঠন এবং পরিচালনা।</span>
                </li>
              </ul>
            </div>

            {/* Article 3 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-xs">
                  ৩
                </div>
                <h3>ধারা ৩: সদস্যপদের শ্রেণিবিভাগ ও অন্তর্ভুক্তি</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>সাধারণ সদস্য (Permanent Member):</strong> প্লট মালিক, ভবন মালিক ও ফ্ল্যাট মালিকগণ। তারা ভোটাধিকার ও নির্বাচনে প্রার্থী হওয়ার অধিকারী।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>সহযোগী নিবাসী (Resident Member):</strong> ভাড়াটিয়া পরিবারবর্গ। তারা সকল নাগরিক সেবা উপভোগ করবেন।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>নিবন্ধন প্রক্রিয়া:</strong> জাতীয় পরিচয়পত্র (NID) ও বিদ্যুৎ বিল আপলোড করে ডিজিটাল সদস্য ফরম পূরণ বাধ্যতামূলক।</span>
                </li>
              </ul>
            </div>

            {/* Article 4 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-extrabold text-xs">
                  ৪
                </div>
                <h3>ধারা ৪: কার্যনির্বাহী পরিষদ (Executive Committee)</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>সোসাইটির সর্বোচ্চ নীতিনির্ধারণী ফোরাম হলো <strong>সাধারণ পরিষদ (General Body)</strong>।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>প্রত্যক্ষ ভোটে নির্বাচিত ১৫ সদস্যবিশিষ্ট কার্যনির্বাহী পরিষদ ২ (দুই) বছরের জন্য দায়িত্ব পালন করবে।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>কমিটির মূল পদসমূহ: সভাপতি, সহ-সভাপতি (২), সাধারণ সম্পাদক, যুগ্ম সম্পাদক, সাংগঠনিক, কোষাধ্যক্ষ, প্রচার, সমাজকল্যাণ, নিরাপত্তা, স্বাস্থ্য ও নির্বাহী সদস্যগণ।</span>
                </li>
              </ul>
            </div>

            {/* Article 5 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-extrabold text-xs">
                  ৫
                </div>
                <h3>ধারা ৫: নিরপেক্ষ নির্বাচন কমিশন ও ভোটাধিকার</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>মেয়াদান্তে ৩ সদস্য বিশিষ্ট নিরপেক্ষ <strong>নির্বাচন কমিশন</strong> গঠিত হবে যারা নির্বাচন তফসিল ঘোষণা করবে।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>"১ সদস্য ১ ভোট":</strong> প্রতিটি অনুমোদিত ভোটার আইডি শুধুমাত্র একটি গোপন ব্যালট বা ডিজিটাল ভোট প্রদান করতে পারবে।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>বকেয়া সার্ভিস চার্জমুক্ত ভোটারগণই ভোটার তালিকায় অন্তর্ভুক্ত হওয়ার যোগ্য বলে বিবেচিত হবেন।</span>
                </li>
              </ul>
            </div>

            {/* Article 6 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-xs">
                  ৬
                </div>
                <h3>ধারা ৬: তহবিল পরিচালনা ও আর্থিক অডিট স্বচ্ছতা</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>সোসাইটির ব্যাংক হিসাব সভাপতি, সাধারণ সম্পাদক ও কোষাধ্যক্ষের মধ্যে যে কোনো দুজনের যৌথ স্বাক্ষরে পরিচালিত হবে।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>প্রতিটি ফ্ল্যাট/ভবন থেকে ধার্যকৃত মাসিক সার্ভিস চার্জ নিয়মিত পরিশোধ করা সকল নিবাসীদের দায়িত্ব।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>প্রতি বছর বার্ষিক সাধারণ সভা (AGM)-তে পেশাদার নিরীক্ষক দ্বারা প্রস্তুতকৃত আয়-ব্যয়ের হিসাব পেশ বাধ্যতামূলক।</span>
                </li>
              </ul>
            </div>

            {/* Article 7 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-extrabold text-xs">
                  ৭
                </div>
                <h3>ধারা ৭: সার্বিক নিরাপত্তা, গেট পাস ও ভাড়াটিয়া পুলিশ তথ্য</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>রাত ১১:০০ ঘটিকার পর প্রধান গেট ব্যতিত সকল পকেট গেট বন্ধ থাকবে। বহিরাগতদের এন্ট্রি রেজিস্টারে নাম লিপিবদ্ধ করতে হবে।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>পুলিশ ভেরিফিকেশন:</strong> নতুন ভাড়াটিয়া প্রবেশের ৭২ ঘণ্টার মধ্যে শ্যামপুর থানা ও সোসাইটি অফিসে তথ্য ফরম জমা দেওয়া বাধ্যতামূলক।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>নির্ধারিত পার্কিং স্পেস ব্যতিত রাস্তায় গাড়ি বা মোটরসাইকেল পার্ক করে চলাচলে বিঘ্ন ঘটানো যাবে না।</span>
                </li>
              </ul>
            </div>

            {/* Article 8 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-extrabold text-xs">
                  ৮
                </div>
                <h3>ধারা ৮: বর্জ্য ব্যবস্থাপনা ও পরিবেশগত শৃঙ্খলা</h3>
              </div>
              <ul className="space-y-2 text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>প্রতিদিন সকাল ৮:০০ হতে ১০:০০ ঘটিকার মধ্যে নির্ধারিত সোসাইটি ভ্যানে ময়লা আবর্জনা প্রদান করতে হবে। রাস্তায় ফেলা দণ্ডনীয়।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>রাত ১০:০০ টার পর উচ্চশব্দে গান-বাজনা বা প্রতিবেশীর শান্তি বিঘ্নিত হয় এমন কার্যকলাপ সম্পূর্ণরূপে নিষিদ্ধ।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>বিল্ডিংয়ের ড্রেন ও স্যুয়ারেজ লাইনে ক্ষতিকর কঠিন বর্জ্য বা পলিথিন ফেলা কঠোরভাবে নিষিদ্ধ।</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Article 9: Dispute Resolution & Full-width Summary Card */}
          <div className="bg-gradient-to-r from-slate-900 via-[#1e3a5f] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/15">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-sm">
                ৯
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">ধারা ৯: অভ্যন্তরীণ বিরোধ নিষ্পত্তি ও গঠনতন্ত্র সংশোধন</h3>
                <span className="text-[11px] text-slate-300">শৃঙ্খলা কমিটি ও আইনি সালিশি এখতিয়ার</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-200">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Gavel className="w-4 h-4" />
                  <span>সালিশি ও বিরোধ নিষ্পত্তি</span>
                </h4>
                <p className="leading-relaxed text-slate-300">
                  সোসাইটির অভ্যন্তরীণ যেকোনো ফ্ল্যাট মালিক-ভাড়াটিয়া বিরোধ, সীমানা জটিলতা বা নাগরিক সমস্যা প্রথমে কার্যনির্বাহী পরিষদের শৃঙ্খলা ও সালিশি কমিটির মাধ্যমে শান্তিপূর্ণভাবে সমাধান করতে হবে।
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>গঠনতন্ত্র সংশোধন প্রক্রিয়া</span>
                </h4>
                <p className="leading-relaxed text-slate-300">
                  গঠনতন্ত্রের কোনো ধারা সংশোধন, পরিমার্জন বা পরিবর্তনের প্রয়োজন হলে বার্ষিক সাধারণ সভা (AGM) বা বিশেষ সাধারণ সভা (EGM)-এ উপস্থিত দুই-তৃতীয়াংশ (২/৩) সাধারণ সদস্যের প্রত্যক্ষ অনুমোদনে তা কার্যকর হবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
