import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Vote,
  FileCheck2,
  Building,
  HeartHandshake,
  Users2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  ChevronRight,
  AlertCircle,
  FileText,
  UserCheck
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
  const topAnnouncements = announcements.slice(0, 3);
  const featuredRentals = rentals.filter(r => r.status === 'active').slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section - Matching screenshot centered dark rounded container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#131b2e] text-white py-12 sm:py-16 px-6 sm:px-12 rounded-3xl shadow-xl relative overflow-hidden text-center space-y-6">
          {/* Subtle background glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#064e3b]/30 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#34d399]/15 text-[#34d399] rounded-full border border-[#34d399]/30 text-xs font-semibold relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse"></span>
            <span>Official Residential Society Portal • Dholaipar, Dhaka</span>
          </div>

          {/* Heading */}
          <div className="space-y-2 relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Bikrampur Garden City
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200">
              সোসাইটি পোর্টাল ও নির্বাচন ২০২৬
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto relative z-10">
            সোসাইটির সমন্বিত নাগরিক সেবা — সদস্যপদ নিবন্ধন, ইউটিলিটি বিল যাচাই, কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬, ফ্ল্যাট ভাড়া ও মসজিদ উন্নয়ন তহবিল।
          </p>

          {/* Action Buttons Centered */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 relative z-10">
            <button
              id="hero-register-cta"
              onClick={() => setCurrentView('register')}
              className="flex items-center gap-2 bg-[#34d399] hover:bg-[#2ecc71] text-slate-950 font-bold px-6 py-3.5 rounded-full shadow-md transition-all text-xs sm:text-sm cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>সদস্যপদ আবেদন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-election-cta"
              onClick={() => setCurrentView('elections')}
              className="flex items-center gap-2 bg-[#1e293b]/90 hover:bg-[#334155] text-white font-semibold px-6 py-3.5 rounded-full border border-slate-700 transition-all text-xs sm:text-sm shadow-sm cursor-pointer"
            >
              <Vote className="w-4 h-4 text-[#34d399]" />
              <span>নির্বাচন ২০২৬ ব্যালট কেন্দ্র</span>
            </button>
          </div>

          {/* Trust Badges Row Centered */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 relative z-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#34d399] shrink-0" />
              <span>১ সদস্য ১ ভোট নিশ্চিত</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0" />
              <span>১০০% বিল ট্র্যাকিং ও অডিট</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#34d399] shrink-0" />
              <span>২০+ আবাসিক ভবন</span>
            </div>
          </div>
        </div>
      </section>

      {/* Society Metrics Grid - Matching screenshot cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              মোট আবাসিক ভবন (HOUSEHOLDS)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] mt-2">20+</div>
            <div className="mt-1 text-xs text-slate-400 font-medium">২০+ ভবন ও অ্যাপার্টমেন্ট</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              অনুমোদিত সদস্য (VERIFIED MEMBERS)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] mt-2">{voters.length}</div>
            <div className="mt-1 text-xs text-slate-400 font-medium">নিবন্ধিত সদস্য সংখ্যা</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              নির্বাচন ভোটগ্রহণ (ELECTION STATUS)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] mt-2">
              {elections.some(e => e.status === 'voting') ? 'VOTING' : 'UPCOMING'}
            </div>
            <div className="mt-1 text-xs text-slate-400 font-medium">
              {elections.some(e => e.status === 'voting') ? 'ভোটগ্রহণ চলমান' : 'তফসিল অপেক্ষমাণ'}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              কার্যনির্বাহী কমিটি (EC COUNCIL)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] mt-2">{committee.length}</div>
            <div className="mt-1 text-xs text-slate-400 font-medium">পরিচালনা পরিষদ সদস্য</div>
          </div>
        </div>
      </section>

      {/* Services Grid (Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">
            সোসাইটি সেবা ও পোর্টাল মডিউল (Services)
          </h2>
          <p className="text-xs sm:text-sm text-[#404944] mt-0.5">
            আপনার প্রয়োজনীয় নাগরিক সেবাটি নির্বাচন করুন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: Member Registration */}
          <div
            id="quick-link-register"
            onClick={() => setCurrentView('register')}
            className="group bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4f46e5] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#064e3b] transition-colors">
                সদস্যপদ নিবন্ধন ফরম
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্লট, ভবন, ফ্ল্যাট মালিক বা ভাড়াটিয়া হিসেবে বিদ্যুৎ/গ্যাস বিল আপলোড করে সদস্য হিসেবে আবেদন করুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#131b2e] gap-1 pt-3 border-t border-slate-100">
              <span>অনলাইনে আবেদন করুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Election Center */}
          <div
            id="quick-link-election"
            onClick={() => setCurrentView('elections')}
            className="group bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#e6fcf5] text-[#064e3b] flex items-center justify-center">
                <Vote className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#064e3b] transition-colors">
                  নির্বাচন ২০২৬ ও ডিজিটাল ব্যালট
                </h3>
                <span className="text-[10px] bg-[#64f9bc]/40 text-[#00714e] font-black px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্রার্থীদের ইশতেহার ও প্রতীক দেখুন, ডিজিটাল ব্যালট পেপারে ভোট প্রদান এবং লাইভ ফলাফল জানুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#131b2e] gap-1 pt-3 border-t border-slate-100">
              <span>ভোটকেন্দ্রে প্রবেশ করুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Rental Portal */}
          <div
            id="quick-link-rentals"
            onClick={() => setCurrentView('rentals')}
            className="group bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#faf5ff] text-[#7c3aed] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#064e3b] transition-colors">
                ফ্ল্যাট ও বাড়ি ভাড়া টু-লেট (Rentals)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                সোসাইটির অভ্যন্তরীণ অনুমোদিত ভাড়ার বিজ্ঞাপন দেখুন, ফিল্টার করুন অথবা মালিক হিসেবে নতুন টু-লেট পোস্ট করুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#131b2e] gap-1 pt-3 border-t border-slate-100">
              <span>ভাড়া ফ্ল্যাট খুঁজুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Mosque Fund */}
          <div className="group bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#fffbeb] text-[#d97706] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#131b2e]">
                মসজিদ উন্নয়ন তহবিল (Mosque Fund)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                শীঘ্রই আসছে। কেন্দ্রীয় জামে মসজিদ উন্নয়নে অনলাইন অনুদান সেবা চালু হবে।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-700 gap-1 pt-3 border-t border-slate-100">
              <span className="bg-amber-100 text-amber-800 text-[10px] px-2.5 py-1 rounded-full font-bold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Card 5: Committee Directory */}
          <div
            id="quick-link-committee"
            onClick={() => setCurrentView('directory')}
            className="group bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#131b2e] text-white flex items-center justify-center">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#064e3b] transition-colors">
                কার্যনির্বাহী পরিষদ ও ডিরেক্টরি
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                বর্তমান কমিটির সভাপতি, সাধারণ সম্পাদক, কোষাধ্যক্ষ ও স্থানীয় জরুরি হেল্পলাইন যোগাযোগ তালিকা।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#131b2e] gap-1 pt-3 border-t border-slate-100">
              <span>ডিরেক্টরি ও মেম্বারস</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Application Status Tracker */}
          <div
            id="quick-link-status"
            onClick={() => setCurrentView('status')}
            className="group bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] text-[#0284c7] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#064e3b] transition-colors">
                আবেদনের অগ্রগতি ট্র্যাকিং
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                আপনার Application ID (যেমন: BGC-APP-2026-001) দিয়ে সদস্যপদ আবেদনের বর্তমান স্ট্যাটাস যাচাই করুন।
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#131b2e] gap-1 pt-3 border-t border-slate-100">
              <span>ট্র্যাকিং করুন</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Section: Announcements & Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Latest Announcements Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-[#131b2e] flex items-center gap-2">
                <div className="w-1 h-5 bg-[#131b2e] rounded-full"></div>
                <span>সাম্প্রতিক নোটিশ ও বিজ্ঞপ্তি (Announcements)</span>
              </h2>
              {announcements.length > 3 && (
                <button
                  onClick={() => setCurrentView('notices')}
                  className="text-xs sm:text-sm font-semibold text-[#064e3b] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  সকল নোটিশ দেখুন <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {topAnnouncements.map((anc) => (
                <div
                  key={anc.id}
                  className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs hover:border-slate-300 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-[#131b2e] bg-[#f2f3ff] px-2.5 py-0.5 rounded uppercase text-[10px]">
                      {anc.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(anc.published_at).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-[#131b2e] leading-snug">{anc.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{anc.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Callout Registration Card & Notice Widget */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-[#003527] rounded-2xl p-6 text-white shadow-md space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0b513d] text-[#64f9bc] px-2.5 py-0.5 rounded">
                Member Verification
              </span>
              <h3 className="font-bold text-lg leading-tight text-white">
                সদস্য তালিকায় নাম অন্তর্ভুক্ত করুন
              </h3>
              <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                আগামী কার্যনির্বাহী পরিষদ নির্বাচনে ভোটাধিকার প্রয়োগ করতে আপনার ফ্ল্যাট বা প্লটের বিদ্যুৎ বিল ও এনআইডি কপি দিয়ে এখনই নিবন্ধন সম্পন্ন করুন।
              </p>
              <button
                onClick={() => setCurrentView('register')}
                className="w-full py-3 bg-[#34d399] hover:bg-[#2ecc71] text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>আবেদন ফরম পূরণ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Notice Board Widget */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <h3 className="font-bold text-[#131b2e] text-sm flex items-center gap-2">
                <div className="w-1 h-4 bg-[#131b2e] rounded-full"></div>
                <span>সাম্প্রতিক নোটিশ (Notice Board)</span>
              </h3>
              <div className="space-y-3 text-xs flex-1">
                {topAnnouncements.length === 0 ? (
                  <div className="text-slate-400 text-center py-3">কোনো নোটিশ নেই</div>
                ) : (
                  topAnnouncements.map(anc => (
                    <div key={anc.id} className="flex gap-2.5 items-start">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                      <div>
                        <div className="font-semibold text-[#131b2e] line-clamp-1">{anc.title}</div>
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
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                সকল নোটিশ দেখুন
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rental Listings Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">
              সোসাইটির সাম্প্রতিক টু-লেট ফ্ল্যাট (Rentals)
            </h2>
            <p className="text-xs sm:text-sm text-[#404944] mt-0.5">মালিকদের সরাসরি ভাড়ার বিজ্ঞাপনসমূহ</p>
          </div>
          <button
            onClick={() => setCurrentView('rentals')}
            className="text-xs sm:text-sm font-bold text-[#064e3b] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>সকল বিজ্ঞাপন ({rentals.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRentals.length > 0 ? (
            featuredRentals.map(rental => (
              <div
                key={rental.id}
                onClick={() => {
                  setSelectedRentalId(rental.id);
                  setCurrentView('rentals');
                }}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-slate-100">
                    <img
                      src={(rental.photos && rental.photos[0]) || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'}
                      alt={rental.plot_number}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#131b2e]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm font-mono">
                      ৳{rental.rent_amount ? rental.rent_amount.toLocaleString('en-BD') : '20,000'}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#064e3b] bg-[#e6fcf5] px-2.5 py-0.5 rounded text-[11px]">
                        {rental.bedrooms || 3} BHK
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Posted 2d ago
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#131b2e] line-clamp-1">
                      {rental.description || `Spacious Family Apartment in ${rental.plot_number}`}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{rental.plot_number}, {rental.floor || '2nd Floor'}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Sample Showcase Card 1 */}
              <div
                onClick={() => setCurrentView('rentals')}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                      alt="Apartment Block A"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#131b2e]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm font-mono">
                      ৳25,000
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#064e3b] bg-[#e6fcf5] px-2.5 py-0.5 rounded text-[11px]">
                        3 BHK
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Posted 2d ago
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#131b2e] line-clamp-1">
                      Spacious Family Apartment in Block A
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Building A-4, 2nd Floor</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Showcase Card 2 */}
              <div
                onClick={() => setCurrentView('rentals')}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
                      alt="Modern 2 Bed Unit"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#131b2e]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm font-mono">
                      ৳18,500
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#064e3b] bg-[#e6fcf5] px-2.5 py-0.5 rounded text-[11px]">
                        2 BHK
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Posted 1w ago
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#131b2e] line-clamp-1">
                      Modern 2 Bed Unit with Balcony
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Building B-1, 5th Floor</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
