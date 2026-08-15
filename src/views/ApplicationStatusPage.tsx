import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Phone,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ApplicationStatusPage: React.FC = () => {
  const { applications, voters, selectedAppId, setSelectedAppId, setCurrentView } = useApp();

  const [query, setQuery] = useState(selectedAppId || '');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (selectedAppId) {
      setQuery(selectedAppId);
      setSearched(true);
    }
  }, [selectedAppId]);

  const cleanQuery = query.trim().toUpperCase();

  const matchedApp = applications.find(
    a =>
      a.application_id.toUpperCase() === cleanQuery ||
      a.phone.trim() === query.trim() ||
      a.nid_number?.trim() === query.trim()
  );

  const matchedVoter = matchedApp ? voters.find(v => v.application_id === matchedApp.id || v.phone === matchedApp.phone) : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (matchedApp) {
      setSelectedAppId(matchedApp.application_id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          <Search className="w-3.5 h-3.5" />
          <span>রিয়েল-টাইম ভোটার স্ট্যাটাস ট্র্যাকার</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          ভোটার আবেদন ট্র্যাকিং পোর্টাল
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          আপনার Application ID (যেমন: <span className="font-mono font-semibold">BGC-APP-2026-001</span>) অথবা নিবন্ধিত মোবাইল নম্বর দিয়ে অনুসন্ধানের ফলাফল দেখুন।
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <div className="relative flex items-center">
          <input
            id="status-search-input"
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSearched(false);
            }}
            placeholder="আবেদন আইডি (BGC-APP-2026-...) বা ফোন নম্বর"
            className="w-full pl-11 pr-32 py-3.5 bg-white rounded-2xl border border-slate-300 shadow-sm text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <button
            id="status-search-submit-btn"
            type="submit"
            className="absolute right-2 px-5 py-2 bg-[#1e3a5f] hover:bg-[#152943] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            যাচাই করুন
          </button>
        </div>

        {/* Quick Demo Pre-select pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 text-xs text-slate-500">
          <span>দ্রুত চেক করুন:</span>
          <button
            type="button"
            onClick={() => { setQuery('BGC-APP-2026-001'); setSearched(true); }}
            className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100 font-mono cursor-pointer"
          >
            BGC-APP-2026-001 (Approved)
          </button>
          <button
            type="button"
            onClick={() => { setQuery('BGC-APP-2026-004'); setSearched(true); }}
            className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 hover:bg-amber-100 font-mono cursor-pointer"
          >
            BGC-APP-2026-004 (Pending)
          </button>
          <button
            type="button"
            onClick={() => { setQuery('BGC-APP-2026-005'); setSearched(true); }}
            className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100 font-mono cursor-pointer"
          >
            BGC-APP-2026-005 (More Info)
          </button>
        </div>
      </form>

      {/* Result Display */}
      {searched && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {matchedApp ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              {/* Top Banner Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-slate-900">
                      {matchedApp.application_id}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">
                      দাখিল: {new Date(matchedApp.created_at).toLocaleDateString('bn-BD')}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">{matchedApp.name_en} ({matchedApp.name_bn})</h2>
                </div>

                <div>
                  {matchedApp.status === 'approved' && (
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>আবেদন অনুমোদিত (Approved)</span>
                    </div>
                  )}
                  {matchedApp.status === 'pending' && (
                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-xl text-xs font-bold border border-amber-300">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>যাচাইকরণ প্রক্রিয়াধীন (Pending)</span>
                    </div>
                  )}
                  {matchedApp.status === 'more_info' && (
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-xl text-xs font-bold border border-blue-300">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                      <span>অতিরিক্ত তথ্য প্রয়োজন (More Info Needed)</span>
                    </div>
                  )}
                  {matchedApp.status === 'rejected' && (
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-900 px-4 py-2 rounded-xl text-xs font-bold border border-rose-300">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>আবেদন স্থগিত / বাতিল (Rejected)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-3 py-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  অগ্রগতি পর্যায় (Workflow Stages)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-emerald-950">১. আবেদন দাখিল</div>
                      <div className="text-[10px] text-emerald-700">অনলাইনে সফলভাবে গৃহীত</div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    matchedApp.status !== 'pending'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950 animate-pulse'
                  }`}>
                    {matchedApp.status !== 'pending' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold">২. বিল ও ঠিকানা যাচাই</div>
                      <div className="text-[10px] text-slate-600">
                        {matchedApp.status !== 'pending' ? 'যাচাই সম্পন্ন' : 'যাচাই চলছে'}
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    matchedApp.status === 'approved'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : matchedApp.status === 'rejected'
                      ? 'bg-rose-50 border-rose-200 text-rose-950'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    {matchedApp.status === 'approved' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : matchedApp.status === 'rejected' ? (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold">৩. কমিটি অনুমোদন</div>
                      <div className="text-[10px]">
                        {matchedApp.status === 'approved'
                          ? 'অনুমোদিত'
                          : matchedApp.status === 'rejected'
                          ? 'বাতিল'
                          : 'অপেক্ষমাণ'}
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    matchedVoter
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    {matchedVoter ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold">৪. ভোটার আইডি ইস্যু</div>
                      <div className="text-[10px] font-mono font-bold text-emerald-800">
                        {matchedVoter ? matchedVoter.voter_id : 'অপেক্ষমাণ'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voter ID Callout (If approved) */}
              {matchedVoter && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-xs font-semibold text-emerald-100">
                      অভিনন্দন! আপনার স্থায়ী ভোটার আইডি ইস্যু করা হয়েছে:
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-wider">
                      {matchedVoter.voter_id}
                    </div>
                    <p className="text-xs text-emerald-100">
                      আপনি এখন ইমেইল বা ফোন ও OTP দিয়ে ভোটার ড্যাশবোর্ডে প্রবেশ করে ভোট দিতে পারবেন।
                    </p>
                  </div>
                  <button
                    id="goto-voter-login-btn"
                    onClick={() => setCurrentView('login')}
                    className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>লগইন করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Admin Remark (if any) */}
              {matchedApp.admin_remark && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-xs font-bold text-slate-700">কমিটির মন্তব্য / নির্দেশিকা (Admin Remark):</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{matchedApp.admin_remark}</p>
                </div>
              )}

              {/* Application Details Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50/70 rounded-2xl text-xs border border-slate-100">
                <div>
                  <span className="text-slate-400 block">রেসিডেন্ট ক্যাটাগরি:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {matchedApp.resident_type.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">প্লট ও ভবন:</span>
                  <span className="font-semibold text-slate-800">
                    {matchedApp.plot_number} {matchedApp.building_number ? `(${matchedApp.building_number})` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">মোবাইল নম্বর:</span>
                  <span className="font-semibold text-slate-800 font-mono">{matchedApp.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">পিতার নাম:</span>
                  <span className="font-semibold text-slate-800">{matchedApp.father_name}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center space-y-4 border border-slate-200">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">কোনো আবেদন পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                অনুসন্ধানকৃত আইডি বা ফোন নম্বরের কোনো তথ্য আমাদের ডেটাবেজে নেই। দয়া করে সঠিক অ্যাপ্লিকেশন আইডি দিন অথবা নতুন ভোটার নিবন্ধন করুন।
              </p>
              <button
                onClick={() => setCurrentView('register')}
                className="px-5 py-2.5 bg-[#1e3a5f] text-white text-xs font-bold rounded-xl"
              >
                নতুন আবেদন করুন
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
