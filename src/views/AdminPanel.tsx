import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  VoterApplication,
  ResidentType,
  ApplicationStatus,
  ComplaintStatus,
  ElectionStatus
} from '../types';
import {
  ShieldCheck,
  Users,
  Vote,
  MessageSquare,
  Building,
  HeartHandshake,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Eye,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Download,
  Phone,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Mail
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    currentUser,
    applications,
    approveApplication,
    rejectApplication,
    requestMoreInfoApplication,
    voters,
    elections,
    updateElectionStatus,
    complaints,
    updateComplaintStatus,
    rentals,
    updateRentalStatus,
    deleteRentalListing,
    mosqueProjects,
    donations,
    updateDonationStatus,
    emailLogs,
    setCurrentView
  } = useApp();

  const [adminTab, setAdminTab] = useState<'applications' | 'voters' | 'elections' | 'complaints' | 'rentals' | 'mosque' | 'emails' | 'analytics'>('applications');

  // Applications Filter & Search
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');
  const [appResidentFilter, setAppResidentFilter] = useState<string>('all');

  // Selected Application for Review Modal
  const [selectedApp, setSelectedApp] = useState<VoterApplication | null>(null);
  const [reviewRemark, setReviewRemark] = useState('');
  const [reviewActionSuccess, setReviewActionSuccess] = useState<string | null>(null);

  // Complaints filter
  const [complaintFilter, setComplaintFilter] = useState<string>('all');
  const [complaintReplyId, setComplaintReplyId] = useState<string | null>(null);
  const [complaintReplyText, setComplaintReplyText] = useState('');

  // Check admin authorization
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">অ্যাডমিন অ্যাক্সেস আবশ্যক</h2>
        <p className="text-xs text-slate-500">
          এই প্যানেলটি শুধুমাত্র বিক্রমপুর গার্ডেন সিটির এডমিন ও নির্বাচন কমিশনারের জন্য সংরক্ষিত।
        </p>
        <button
          onClick={() => setCurrentView('login')}
          className="px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded-xl text-xs"
        >
          এডমিন লগইন
        </button>
      </div>
    );
  }

  // Filtered Applications
  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.name_en.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.name_bn.includes(appSearch) ||
      app.application_id.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.phone.includes(appSearch) ||
      app.plot_number.toLowerCase().includes(appSearch.toLowerCase());

    const matchesStatus = appStatusFilter === 'all' || app.status === appStatusFilter;
    const matchesResident = appResidentFilter === 'all' || app.resident_type === appResidentFilter;

    return matchesSearch && matchesStatus && matchesResident;
  });

  const pendingAppsCount = applications.filter(a => a.status === 'pending').length;
  const approvedAppsCount = applications.filter(a => a.status === 'approved').length;
  const totalDonationAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  const handleApprove = (appId: string) => {
    const res = approveApplication(appId, reviewRemark || 'ডকুমেন্ট ও ঠিকানা সঠিক থাকায় অনুমোদন করা হলো');
    if (res.success) {
      setReviewActionSuccess(`সফলভাবে অনুমোদিত! নতুন ভোটার আইডি: ${res.voterId}`);
      setTimeout(() => {
        setReviewActionSuccess(null);
        setSelectedApp(null);
        setReviewRemark('');
      }, 1800);
    }
  };

  const handleReject = (appId: string) => {
    if (!reviewRemark.trim()) {
      alert('বাতিল করার কারণ (Remark) উল্লেখ করুন');
      return;
    }
    const res = rejectApplication(appId, reviewRemark);
    if (res.success) {
      setReviewActionSuccess('আবেদনটি বাতিল করা হয়েছে এবং নাগরিকের ইমেইলে নোটিফিকেশন পাঠানো হয়েছে।');
      setTimeout(() => {
        setReviewActionSuccess(null);
        setSelectedApp(null);
        setReviewRemark('');
      }, 1500);
    }
  };

  const handleRequestMoreInfo = (appId: string) => {
    if (!reviewRemark.trim()) {
      alert('কী তথ্য প্রয়োজন তা মন্তব্য ঘরে লিখুন');
      return;
    }
    const res = requestMoreInfoApplication(appId, reviewRemark);
    if (res.success) {
      setReviewActionSuccess('অতিরিক্ত তথ্যের অনুরোধ নাগরিকের কাছে পাঠানো হয়েছে।');
      setTimeout(() => {
        setReviewActionSuccess(null);
        setSelectedApp(null);
        setReviewRemark('');
      }, 1500);
    }
  };

  const handleUpdateComplaint = (id: string, status: ComplaintStatus) => {
    updateComplaintStatus(id, status, complaintReplyText || undefined);
    setComplaintReplyId(null);
    setComplaintReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Banner */}
      <div className="bg-[#1e3a5f] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Society Administration & Election Commission Panel</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              বিক্রমপুর গার্ডেন সিটি — কেন্দ্রীয় অ্যাডমিন প্যানেল
            </h1>
            <p className="text-xs text-slate-300">
              এডমিন: <strong className="text-white">{currentUser.name}</strong> ({currentUser.email}) • পূর্ণ নিয়ন্ত্রণ ও ভোটার অনুমোদন ক্ষমতা
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-amber-200 block uppercase font-bold">অপেক্ষমাণ আবেদন</span>
              <span className="font-mono text-xl font-bold text-amber-300">{pendingAppsCount}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-emerald-200 block uppercase font-bold">অনুমোদিত ভোটার</span>
              <span className="font-mono text-xl font-bold text-emerald-300">{voters.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200 text-xs font-semibold">
        {[
          { id: 'applications', label: `📋 ভোটার আবেদনপত্র (${pendingAppsCount} নতুন)`, icon: FileCheck2 },
          { id: 'voters', label: `👥 অনুমোদিত ভোটার তালিকা (${voters.length})`, icon: Users },
          { id: 'elections', label: `🗳️ নির্বাচন নিয়ন্ত্রণ ও ফলাফল`, icon: Vote },
          { id: 'complaints', label: `⚠️ নাগরিক অভিযোগ (${complaints.length})`, icon: MessageSquare },
          { id: 'rentals', label: `🏢 টু-লেট বিজ্ঞাপন মডারেশন (${rentals.length})`, icon: Building },
          { id: 'mosque', label: `🕌 মসজিদ ফান্ড ও অনুদান`, icon: HeartHandshake },
          { id: 'emails', label: `✉️ প্রেরিত ইমেইল লগ (${emailLogs.length})`, icon: Mail }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              adminTab === tab.id
                ? 'bg-[#1e3a5f] text-white shadow-xs font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: APPLICATIONS VERIFICATION DESK */}
      {adminTab === 'applications' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-6 relative">
                <input
                  type="text"
                  value={appSearch}
                  onChange={e => setAppSearch(e.target.value)}
                  placeholder="নাম, আবেদন আইডি (BGC-APP-...), ফোন বা প্লট দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={appStatusFilter}
                  onChange={e => setAppStatusFilter(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                >
                  <option value="all">সকল স্ট্যাটাস (All Status)</option>
                  <option value="pending">অপেক্ষমাণ (Pending)</option>
                  <option value="approved">অনুমোদিত (Approved)</option>
                  <option value="more_info">অতিরিক্ত তথ্য প্রয়োজন (More Info)</option>
                  <option value="rejected">বাতিল (Rejected)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <select
                  value={appResidentFilter}
                  onChange={e => setAppResidentFilter(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                >
                  <option value="all">সকল রেসিডেন্ট ধরন (All Types)</option>
                  <option value="apartment_owner">ফ্ল্যাট মালিক (Apartment Owner)</option>
                  <option value="building_owner">সম্পূর্ণ ভবন মালিক (Building Owner)</option>
                  <option value="plot_owner">প্লট মালিক (Plot Owner)</option>
                  <option value="tenant">ভাড়াটিয়া (Tenant)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">
                মোট প্রাপ্ত আবেদন: {filteredApps.length} টি
              </span>
              <span className="text-slate-500">
                ক্লিক করে বিলের কপি ও ঠিকানা যাচাই করুন
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/75 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">অ্যাপ্লিকেশন আইডি</th>
                    <th className="p-3.5">আবেদনকারীর নাম</th>
                    <th className="p-3.5">মোবাইল</th>
                    <th className="p-3.5">প্লট ও ইউনিট</th>
                    <th className="p-3.5">রেসিডেন্ট ধরন</th>
                    <th className="p-3.5">সংযুক্ত বিল</th>
                    <th className="p-3.5">স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">পদক্ষেপ (Action)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#1e3a5f]">
                        {app.application_id}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{app.name_en}</div>
                        <div className="text-[11px] text-slate-500">{app.name_bn}</div>
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">{app.phone}</td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {app.plot_number} {app.apartment_number ? `(${app.apartment_number})` : ''}
                      </td>
                      <td className="p-3.5 capitalize text-slate-600">
                        {app.resident_type.replace('_', ' ')}
                      </td>
                      <td className="p-3.5">
                        <span className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                          {app.bill_type || 'Utility Bill'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                          app.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'more_info'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          id={`review-app-btn-${app.id}`}
                          onClick={() => {
                            setSelectedApp(app);
                            setReviewRemark(app.admin_remark || '');
                          }}
                          className="px-3 py-1.5 bg-[#1e3a5f] hover:bg-[#152943] text-white rounded-lg font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                        >
                          যাচাই ও অনুমোদন →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VOTERS DIRECTORY */}
      {adminTab === 'voters' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">অনুমোদিত ভোটারদের ডিজিটাল মাস্টার রোস্টার</h3>
              <p className="text-xs text-slate-500">নির্বাচন ২০২৬ এর চূড়ান্ত বৈধ ভোটার তালিকা</p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>ভোটার তালিকা এক্সপোর্ট / প্রিন্ট</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voters.map(voter => (
              <div key={voter.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-emerald-700 font-extrabold text-sm block">
                      {voter.voter_id}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{voter.name_en}</h4>
                    <span className="text-[11px] text-slate-500">{voter.name_bn}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded capitalize">
                    {voter.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[11px] bg-white p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">প্লট নম্বর:</span>
                    <span className="font-semibold text-slate-700">{voter.plot_number}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">ধরণ:</span>
                    <span className="font-semibold text-slate-700 capitalize">{voter.resident_type.replace('_', ' ')}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-100">
                    <span className="text-slate-400 block">ফোন:</span>
                    <span className="font-semibold font-mono text-slate-700">{voter.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ELECTIONS CONTROL */}
      {adminTab === 'elections' && (
        <div className="space-y-6">
          {elections.map(election => (
            <div key={election.id} className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#1e3a5f] text-white font-bold px-2.5 py-0.5 rounded-full capitalize">
                      স্ট্যাটাস: {election.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{election.title}</h3>
                </div>

                {/* Status Switcher for Election Commissioners */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-semibold">স্ট্যাটাস পরিবর্তন:</span>
                  <select
                    value={election.status}
                    onChange={e => updateElectionStatus(election.id, e.target.value as ElectionStatus)}
                    className="p-2 border border-slate-300 rounded-xl bg-white font-bold"
                  >
                    <option value="draft">Draft (খসড়া)</option>
                    <option value="nomination">Nomination (মনোনয়ন পর্ব)</option>
                    <option value="voting">Voting (ভোটগ্রহণ চলমান)</option>
                    <option value="ended">Ended (ভোটগ্রহণ সমাপ্ত)</option>
                    <option value="published">Published (চূড়ান্ত ফলাফল প্রকাশিত)</option>
                  </select>
                </div>
              </div>

              {/* Positions & Candidates Count */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  পদবী ও প্রার্থীর তালিকা
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {election.positions.map(pos => {
                    const posCandidates = election.candidates.filter(c => c.position_id === pos.id);
                    return (
                      <div key={pos.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-900">{pos.position_name_bn}</span>
                          <span className="text-emerald-700">{posCandidates.length} জন প্রার্থী</span>
                        </div>
                        <div className="space-y-1 text-slate-600">
                          {posCandidates.map(c => (
                            <div key={c.id} className="flex justify-between items-center text-[11px] bg-white p-1.5 rounded border border-slate-100">
                              <span>{c.name_bn || c.name} ({c.symbol})</span>
                              <span className="font-mono font-bold text-emerald-800">{c.vote_count} ভোট</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: COMPLAINTS DESK */}
      {adminTab === 'complaints' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">নাগরিক অভিযোগ ও সমাধান ডেস্ক</h3>
            <p className="text-xs text-slate-500">সমস্যা সমাধানের অগ্রগতি আপডেট করুন ও নাগরিকদের জবাব দিন</p>
          </div>

          <div className="space-y-4">
            {complaints.map(cmp => (
              <div key={cmp.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-sm text-slate-900">{cmp.title}</span>
                    <span className="text-[11px] text-slate-500 ml-2">
                      (ভোটার: {cmp.voter_name} • প্লট: {cmp.plot_number})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={cmp.status}
                      onChange={e => updateComplaintStatus(cmp.id, e.target.value as ComplaintStatus)}
                      className="p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    >
                      <option value="new">নতুন (New)</option>
                      <option value="in_progress">প্রক্রিয়াধীন (In Progress)</option>
                      <option value="resolved">সমাধান সম্পন্ন (Resolved)</option>
                      <option value="closed">বন্ধ (Closed)</option>
                    </select>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                  {cmp.description}
                </p>

                {cmp.admin_response ? (
                  <div className="p-3 bg-blue-50 text-blue-950 rounded-xl border border-blue-200">
                    <strong className="block text-[11px] text-blue-900">প্রদত্ত উত্তর:</strong>
                    <span>{cmp.admin_response}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={complaintReplyId === cmp.id ? complaintReplyText : ''}
                      onFocus={() => setComplaintReplyId(cmp.id)}
                      onChange={e => setComplaintReplyText(e.target.value)}
                      placeholder="নাগরিককে আনুষ্ঠানিক জবাব বা সমাধানের সময়সীমা লিখুন..."
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                    />
                    {complaintReplyId === cmp.id && (
                      <button
                        onClick={() => handleUpdateComplaint(cmp.id, cmp.status)}
                        className="px-4 py-2 bg-[#1e3a5f] text-white font-bold rounded-xl text-xs"
                      >
                        উত্তর সংরক্ষণ ও পাঠান
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: RENTALS MODERATION */}
      {adminTab === 'rentals' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">টু-লেট ও বাড়ি ভাড়া বিজ্ঞাপন মডারেশন</h3>
          </div>

          <div className="space-y-4">
            {rentals.map(rnt => (
              <div key={rnt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    ৳{rnt.rent_amount.toLocaleString('en-BD')} / মাস — {rnt.bedrooms} Bed, {rnt.bathrooms} Bath
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    মালিক: {rnt.owner_name} • প্লট: {rnt.plot_number} • ফোন: {rnt.owner_phone}
                  </div>
                  <p className="text-slate-600 mt-1 line-clamp-1">{rnt.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                    rnt.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {rnt.status}
                  </span>
                  <button
                    onClick={() => updateRentalStatus(rnt.id, rnt.status === 'active' ? 'rented' : 'active')}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold hover:bg-slate-100"
                  >
                    টগল স্ট্যাটাস
                  </button>
                  <button
                    onClick={() => deleteRentalListing(rnt.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    title="Remove"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MOSQUE FUND */}
      {adminTab === 'mosque' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">কেন্দ্রীয় জামে মসজিদ উন্নয়ন তহবিল লেজার</h3>
              <p className="text-xs text-slate-500">মোট অনুদান সংগৃহীত: ৳{totalDonationAmount.toLocaleString('en-BD')}</p>
            </div>
          </div>

          <div className="space-y-3">
            {donations.map(don => (
              <div key={don.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{don.donor_name}</div>
                  <div className="text-[11px] text-slate-500">
                    প্রকল্প: {don.project_title} • রসিদ নং: <span className="font-mono">{don.receipt_no}</span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold text-teal-800 text-base">৳{don.amount.toLocaleString('en-BD')}</div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold capitalize">
                    {don.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: AUTOMATED EMAIL LOGS & AUDIT TRAIL */}
      {adminTab === 'emails' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Automated SMTP / Email Dispatch Engine
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">প্রেরিত অটোমেটিক ইমেইল নোটিফিকেশন অডিট লগ</h3>
              <p className="text-xs text-slate-500">সকল লেনদেন, ওটিপি, আবেদন অনুমোদন ও ভোটদানের ইমেইল রেকর্ড</p>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              মোট প্রেরিত ইমেইল: <strong className="text-slate-800 font-mono">{emailLogs.length}</strong> টি
            </div>
          </div>

          <div className="space-y-3">
            {emailLogs.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                কোনো ইমেইল রেকর্ড পাওয়া যায়নি
              </div>
            ) : (
              emailLogs.map(mail => (
                <div
                  key={mail.id}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-[#1e3a5f] text-white px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                        {mail.type.toUpperCase()}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{mail.subject}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      <span>{mail.timestamp}</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold uppercase text-[10px]">
                        {mail.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 text-[10px] block">প্রাপক ইমেইল (To):</span>
                      <span className="font-semibold font-mono text-blue-900">{mail.to_email}</span>
                      {mail.to_name && <span className="text-slate-500 text-[11px] ml-1">({mail.to_name})</span>}
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">প্রেরক (From):</span>
                      <span className="font-semibold font-mono text-slate-700">{mail.from_email}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 bg-white/60 p-3 rounded-xl border border-slate-100 space-y-1">
                    <div className="text-slate-500 text-[11px] italic">{mail.preview_text}</div>
                    {mail.code && (
                      <div className="inline-block bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold text-xs border border-emerald-200 mt-1">
                        কোড / আইডি: {mail.code}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* APPLICATION REVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-[#1e3a5f]">
                  {selectedApp.application_id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">ভোটার আবেদনপত্র পুঙ্খানুপুঙ্খ যাচাই</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {reviewActionSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{reviewActionSuccess}</span>
              </div>
            )}

            {/* Applicant Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">নাম (English):</span>
                <span className="font-bold text-slate-900">{selectedApp.name_en}</span>
              </div>
              <div>
                <span className="text-slate-400 block">নাম (বাংলা):</span>
                <span className="font-bold text-slate-900">{selectedApp.name_bn}</span>
              </div>
              <div>
                <span className="text-slate-400 block">পিতা/স্বামীর নাম:</span>
                <span className="font-semibold text-slate-800">{selectedApp.father_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">মোবাইল:</span>
                <span className="font-bold font-mono text-slate-900">{selectedApp.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">প্লট নম্বর:</span>
                <span className="font-bold text-emerald-800">{selectedApp.plot_number}</span>
              </div>
              <div>
                <span className="text-slate-400 block">রেসিডেন্ট ধরন:</span>
                <span className="font-bold capitalize text-slate-800">{selectedApp.resident_type.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Document / Utility Bill Preview */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>সংযুক্ত বিদ্যুৎ/গ্যাস বিলের কপি ({selectedApp.bill_type}):</span>
                <a
                  href={selectedApp.bill_photo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ফুল সাইজে খুলুন</span>
                </a>
              </div>

              <div className="h-56 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative">
                <img
                  src={selectedApp.bill_photo_url}
                  alt="Utility Bill"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Admin Remark Input */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">কমিটির মন্তব্য / যাচাইকরণ নোট (Remark for Citizen Email):</label>
              <textarea
                rows={2}
                value={reviewRemark}
                onChange={e => setReviewRemark(e.target.value)}
                placeholder="যেমন: বিদ্যুৎ বিল ও ৩ নং রোডের ফ্ল্যাট মালিকানা যাচাই করা হয়েছে।"
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            {/* Modal Decision Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs font-bold">
              <button
                id="modal-approve-btn"
                onClick={() => handleApprove(selectedApp.id)}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>অনুমোদন ও ভোটার আইডি ইস্যু (Approve)</span>
              </button>

              <button
                onClick={() => handleRequestMoreInfo(selectedApp.id)}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                অতিরিক্ত তথ্য চাই
              </button>

              <button
                onClick={() => handleReject(selectedApp.id)}
                className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
