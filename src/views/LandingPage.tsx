import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Vote,
  FileCheck2,
  Building,
  HeartHandshake,
  Users2,
  PhoneCall,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  FileText,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    setCurrentView,
    voters,
    committee,
    elections,
    announcements,
    rentals,
    setSelectedRentalId
  } = useApp();

  const activeElection = elections.find(e => e.status === 'voting');
  const upcomingElection = elections.find(e => e.status === 'upcoming' || e.status === 'candidate_reg');
  const topAnnouncements = announcements.slice(0, 3);
  const featuredRentals = rentals.filter(r => r.status === 'active').slice(0, 3);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section - Professional Polish High-Contrast Slate Theme */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 text-emerald-400 rounded-full border border-emerald-800/80 text-xs font-semibold">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Official Residential Society Portal • Dholaipar, Dhaka</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Bikrampur Garden City <br />
                <span className="text-slate-300">
                  সোসাইটি পোর্টাল ও নির্বাচন ২০২৬
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
                সোসাইটির সমন্বিত নাগরিক সেবা — ডিজিটাল ভোটার রেজিস্ট্রেশন, ইউটিলিটি বিল যাচাই, কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬, ফ্ল্যাট ভাড়া ও মসজিদ উন্নয়ন তহবিল।
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-register-cta"
                  onClick={() => setCurrentView('register')}
                  className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-xs transition-colors text-sm cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-950" />
                  <span>ভোটার নিবন্ধন করুন (Register)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-election-cta"
                  onClick={() => setCurrentView('elections')}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition-colors text-sm cursor-pointer"
                >
                  <Vote className="w-4 h-4 text-emerald-400" />
                  <span>নির্বাচন ২০২৬ ব্যালট কেন্দ্র</span>
                </button>

                <button
                  id="hero-status-cta"
                  onClick={() => setCurrentView('status')}
                  className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 underline underline-offset-4 cursor-pointer"
                >
                  আবেদনের অবস্থা অনুসন্ধান
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>১ ভোটার ১ ভোট নিশ্চিত</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>SMS ট্র্যাকিং ও রসিদ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-300 shrink-0" />
                  <span>৪০+ ভবন সমন্বিত</span>
                </div>
              </div>
            </div>

            {/* Right Card: Society Info / Election Highlight Box */}
            <div className="lg:col-span-5">
              {elections.length > 0 && elections.some(e => e.status === 'voting') ? (
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl text-white space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
                        <Vote className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                          Election Phase Active
                        </div>
                        <div className="text-sm font-bold text-white">{elections[0].title_bn || elections[0].title}</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Voting Live
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {elections[0].description}
                  </p>

                  <button
                    id="preview-cast-vote-btn"
                    onClick={() => setCurrentView('elections')}
                    className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl text-center text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Vote className="w-4 h-4 text-emerald-950" />
                    <span>ডিজিটাল ব্যালটে ভোট দিন (Cast Vote)</span>
                  </button>
                </div>
              ) : (
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl text-white space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                          Digital Citizen Portal
                        </div>
                        <div className="text-sm font-bold text-white">সোসাইটি নাগরিক সেবা কেন্দ্র</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span>• ভোটার নিবন্ধন আবেদন</span>
                      <span className="text-emerald-400 font-bold">উন্মুক্ত</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span>• বাড়ি ভাড়া টু-লেট বোর্ড</span>
                      <span className="text-blue-400 font-bold">সক্রিয়</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span>• নোটিশ বোর্ড</span>
                      <span className="text-teal-400 font-bold">লাইভ</span>
                    </div>
                  </div>

                  <button
                    id="preview-register-btn"
                    onClick={() => setCurrentView('register')}
                    className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-center text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileCheck2 className="w-4 h-4 text-slate-950" />
                    <span>ভোটার হিসেবে আবেদন করুন</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Society Metrics Grid - Professional Polish Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-slate-500 text-xs sm:text-sm font-medium mb-1 uppercase tracking-tight">
              মোট আবাসিক ভবন (Households)
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">20+</div>
            <div className="mt-2 text-xs text-slate-400 font-medium">২০+ ভবন ও অ্যাপার্টমেন্ট</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-slate-500 text-xs sm:text-sm font-medium mb-1 uppercase tracking-tight">
              অনুমোদিত ভোটার (Verified Voters)
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">{voters.length}</div>
            <div className="mt-2 text-xs text-slate-400 font-medium">নিবন্ধিত ভোটার সংখ্যা</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-slate-500 text-xs sm:text-sm font-medium mb-1 uppercase tracking-tight">
              নির্বাচন ভোটগ্রহণ (Election Status)
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">
              {elections.some(e => e.status === 'voting') ? 'LIVE' : 'UPCOMING'}
            </div>
            <div className="mt-2 text-xs text-slate-400 font-medium">
              {elections.some(e => e.status === 'voting') ? 'ভোটগ্রহণ চলমান' : 'তফসিল অপেক্ষমাণ'}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-slate-500 text-xs sm:text-sm font-medium mb-1 uppercase tracking-tight">
              কার্যনির্বাহী কমিটি (EC Council)
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">{committee.length}</div>
            <div className="mt-2 text-xs text-slate-400 font-medium">পরিচালনা পরিষদ সদস্য</div>
          </div>
        </div>
      </section>

      {/* Services Grid (Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">সোসাইটি সেবা ও পোর্টাল মডিউল (Services)</h2>
            <p className="text-xs sm:text-sm text-slate-500">আপনার প্রয়োজনীয় নাগরিক সেবাটি নির্বাচন করুন</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Voter Registration */}
          <div
            id="quick-link-register"
            onClick={() => setCurrentView('register')}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700">
                ভোটার রেজিস্ট্রেশন ফরম
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্লট, ভবন, ফ্ল্যাট মালিক বা ভাড়াটিয়া হিসেবে বিদ্যুৎ/গ্যাস বিল আপলোড করে ভোটার হিসেবে আবেদন করুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-slate-900 gap-1 pt-2 border-t border-slate-100">
              <span>অনলাইনে আবেদন করুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Election Center */}
          <div
            id="quick-link-election"
            onClick={() => setCurrentView('elections')}
            className="group bg-white p-6 rounded-2xl border border-emerald-300 shadow-sm hover:border-emerald-500 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Vote className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  নির্বাচন ২০২৬ ও ডিজিটাল ব্যালট
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্রার্থীদের ইশতেহার ও প্রতীক দেখুন, ডিজিটাল ব্যালটে নিরাপদে ভোট প্রদান করুন এবং লাইভ ফলাফল জানুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-700 gap-1 pt-2 border-t border-slate-100">
              <span>ভোটকেন্দ্রে প্রবেশ করুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Rental Portal */}
          <div
            id="quick-link-rentals"
            onClick={() => setCurrentView('rentals')}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                ফ্ল্যাট ও বাড়ি ভাড়া টু-লেট (Rentals)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                সোসাইটির অভ্যন্তরীণ অনুমোদিত ভাড়ার বিজ্ঞাপন দেখুন, ফিল্টার করুন অথবা মালিক হিসেবে নতুন টু-লেট পোস্ট করুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-slate-900 gap-1 pt-2 border-t border-slate-100">
              <span>ভাড়া ফ্ল্যাট খুঁজুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Mosque Development Coming Soon */}
          <div className="group bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-sm opacity-70 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-200 text-amber-800 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                মসজিদ উন্নয়ন তহবিল (Mosque Fund)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                শীঘ্রই আসছে। কেন্দ্রীয় জামে মসজিদ উন্নয়নে অনলাইন অনুদান সেবা চালু হবে।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-700 gap-1 pt-2 border-t border-amber-200/50">
              <span className="bg-amber-200/50 px-2 py-1 rounded-full border border-amber-300">Coming Soon</span>
            </div>
          </div>

          {/* Card 5: Committee Members */}
          <div
            id="quick-link-committee"
            onClick={() => setCurrentView('directory')}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                কার্যনির্বাহী পরিষদ ও ডিরেক্টরি
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                বর্তমান কমিটির সভাপতি, সাধারণ সম্পাদক, কোষাধ্যক্ষ ও স্থানীয় জরুরি হটলাইন যোগাযোগ তালিকা।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-slate-900 gap-1 pt-2 border-t border-slate-100">
              <span>ডিরেক্টরি ও যোগাযোগ</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Application Status Tracker */}
          <div
            id="quick-link-status"
            onClick={() => setCurrentView('status')}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                আবেদনের অগ্রগতি ট্র্যাকিং
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                আপনার Application ID (যেমন: BGC-APP-2026-001) দিয়ে ভোটার আবেদনের বর্তমান স্ট্যাটাস যাচাই করুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-slate-900 gap-1 pt-2 border-t border-slate-100">
              <span>ট্র্যাকিং করুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Section: Announcements & Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Latest Announcements Table-Style Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-1 h-4 bg-slate-900 rounded"></div>
                <span>সাম্প্রতিক নোটিশ ও বিজ্ঞপ্তি (Announcements)</span>
              </h2>
              {announcements.length > 3 && (
                <button
                  onClick={() => setCurrentView('notices')}
                  className="text-xs sm:text-sm font-semibold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  সকল নোটিশ দেখুন <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
              {topAnnouncements.map((anc) => (
                <div
                  key={anc.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase text-[10px]">
                      {anc.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(anc.published_at).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{anc.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{anc.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Callout Registration Card matching Professional Polish emerald callout */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-emerald-900 rounded-2xl p-6 text-white shadow-lg shadow-emerald-900/10 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
                Voter Verification
              </span>
              <h3 className="font-bold text-lg leading-tight">
                ভোটার তালিকায় নাম অন্তর্ভুক্ত করুন
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                আগামী কার্যনির্বাহী পরিষদ নির্বাচনে ভোটাধিকার প্রয়োগ করতে আপনার ফ্ল্যাট বা প্লটের বিদ্যুৎ বিল ও এনআইডি কপি দিয়ে এখনই নিবন্ধন সম্পন্ন করুন।
              </p>
              <button
                onClick={() => setCurrentView('register')}
                className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                আবেদন ফরম পূরণ করুন →
              </button>
            </div>

            {/* Notices Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex-1 shadow-sm space-y-4 flex flex-col">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <div className="w-1 h-4 bg-slate-900 rounded"></div>
                সাম্প্রতিক নোটিশ (Notice Board)
              </h3>
              <div className="space-y-3.5 text-xs flex-1">
                {topAnnouncements.length === 0 ? (
                  <div className="text-slate-500 text-center py-4">কোনো নোটিশ নেই</div>
                ) : (
                  topAnnouncements.map(anc => (
                    <div key={anc.id} className="flex gap-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${anc.important ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span className="line-clamp-1">{anc.title}</span>
                          {anc.important && <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(anc.published_at).toLocaleDateString('bn-BD')}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => setCurrentView('notices')}
                className="w-full py-2 mt-auto bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors cursor-pointer"
              >
                সকল নোটিশ দেখুন
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rental Listings Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">সোসাইটির সাম্প্রতিক টু-লেট ফ্ল্যাট (Rentals)</h2>
            <p className="text-xs sm:text-sm text-slate-500">মালিকদের সরাসরি ভাড়ার বিজ্ঞাপনসমূহ</p>
          </div>
          <button
            onClick={() => setCurrentView('rentals')}
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>সকল বিজ্ঞাপন ({rentals.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRentals.map(rental => (
            <div
              key={rental.id}
              onClick={() => {
                setSelectedRentalId(rental.id);
                setCurrentView('rentals');
              }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={rental.photos[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'}
                    alt={rental.plot_number}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm font-mono">
                    ৳{rental.rent_amount.toLocaleString('en-BD')} <span className="text-[10px] font-normal text-slate-300">/ মাস</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                    {rental.furnished}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{rental.plot_number}</span>
                    <span>{rental.floor}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                    {rental.bedrooms} Bed • {rental.bathrooms} Bath • {rental.size_sqft} Sqft
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rental.plot_number}, {rental.building_number || 'ঢোলাইপাড়, ঢাকা'}</span>
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">মালিক: {rental.owner_name}</span>
                <span className="text-slate-900 font-bold hover:underline">বিস্তারিত দেখুন →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
