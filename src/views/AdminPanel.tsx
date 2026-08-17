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
  Mail,
  FileText,
  Edit,
  Plus,
  Trash2,
  UserPlus,
  Award,
  Crown,
  Layers,
  Upload,
  UserCheck,
  Printer
} from 'lucide-react';
import { CommitteeMember, Candidate } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    currentUser,
    applications,
    approveApplication,
    rejectApplication,
    requestApplicationMoreInfo,
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
    setCurrentView,
    createAnnouncement,
    deleteAnnouncement,
    announcements,
    committee,
    addCommitteeMember,
    updateCommitteeMember,
    deleteCommitteeMember,
    createElection,
    addCandidateToElection,
    removeCandidate,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<'applications' | 'voters' | 'elections' | 'complaints' | 'rentals' | 'mosque' | 'emails' | 'analytics' | 'notices' | 'committee_mgmt'>('applications');

  // Action loading states
  const [reviewActionLoading, setReviewActionLoading] = useState<string | null>(null); // 'approve' | 'reject' | 'more_info'
  const [noticePublishing, setNoticePublishing] = useState(false);
  const [committeeActionLoading, setCommitteeActionLoading] = useState<string | null>(null);
  const [electionCreating, setElectionCreating] = useState(false);

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

  // Notices state
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', category: 'general', important: false, attachment_url: '' });
  
  // Elections state
  const [showElectionForm, setShowElectionForm] = useState(false);
  const [electionForm, setElectionForm] = useState({ title: '', title_bn: '', description: '', voting_start: '', voting_end: '', status: 'upcoming' as ElectionStatus });
  const [candidateFormOpenFor, setCandidateFormOpenFor] = useState<string | null>(null);
  const [candidateForm, setCandidateForm] = useState({ position_id: '', name: '', name_bn: '', bio: '', symbol: '', phone: '', photo_url: '', voter_id: '' });

  // Committee state
  const [committeeTypeFilter, setCommitteeTypeFilter] = useState<'all' | 'convening' | 'executive' | 'advisory'>('all');
  const [showCommitteeAddForm, setShowCommitteeAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [showEnrollCandidateModal, setShowEnrollCandidateModal] = useState(false);
  const [selectedElectionForEnroll, setSelectedElectionForEnroll] = useState<string>('');
  const [selectedCandidateForEnroll, setSelectedCandidateForEnroll] = useState<Candidate | null>(null);
  const [enrollDesignation, setEnrollDesignation] = useState({ designation: '', designation_bn: '', tenure: '২০২৬-২০২৮', sort_order: 1 });

  const [committeeForm, setCommitteeForm] = useState({
    name: '',
    name_bn: '',
    designation: '',
    designation_bn: '',
    phone: '',
    email: '',
    plot_number: '',
    tenure: 'আহ্বায়ক কমিটি ২০২৬',
    since: '২০২৪',
    photo_url: '',
    sort_order: 1,
    is_current: true,
    committee_type: 'convening' as 'convening' | 'executive' | 'advisory'
  });


  // CSV Export & Print Handlers
  const exportApplicationsCSV = () => {
    if (applications.length === 0) {
      alert('কোনো আবেদন তথ্য পাওয়া যায়নি।');
      return;
    }
    const headers = ['Application ID', 'Name (EN)', 'Name (BN)', "Father's Name", 'NID', 'Phone', 'Email', 'Plot', 'Building', 'Floor', 'Apartment', 'Resident Type', 'Status', 'Admin Remark', 'Submitted At'];
    const rows = applications.map(a => [
      `"${a.application_id}"`,
      `"${a.name_en || ''}"`,
      `"${a.name_bn || ''}"`,
      `"${a.father_name || ''}"`,
      `"${a.nid_number || ''}"`,
      `"${a.phone || ''}"`,
      `"${a.email || ''}"`,
      `"${a.plot_number || ''}"`,
      `"${a.building_number || ''}"`,
      `"${a.floor || ''}"`,
      `"${a.apartment_number || ''}"`,
      `"${a.resident_type}"`,
      `"${a.status}"`,
      `"${(a.admin_remark || '').replace(/"/g, '""')}"`,
      `"${a.created_at}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BGC_Member_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportVotersCSV = () => {
    if (voters.length === 0) {
      alert('কোনো অনুমোদিত সদস্য তথ্য পাওয়া যায়নি।');
      return;
    }
    const headers = ['Member ID', 'Application ID', 'Name (EN)', 'Name (BN)', "Father's Name", 'NID', 'Phone', 'Email', 'Plot', 'Building', 'Floor', 'Apartment', 'Resident Type', 'Status', 'Approved At'];
    const rows = voters.map(v => [
      `"${v.voter_id}"`,
      `"${v.application_id || ''}"`,
      `"${v.name_en || ''}"`,
      `"${v.name_bn || ''}"`,
      `"${v.father_name || ''}"`,
      `"${v.nid_number || ''}"`,
      `"${v.phone || ''}"`,
      `"${v.email || ''}"`,
      `"${v.plot_number || ''}"`,
      `"${v.building_number || ''}"`,
      `"${v.floor || ''}"`,
      `"${v.apartment_number || ''}"`,
      `"${v.resident_type}"`,
      `"${v.is_active ? 'Active' : 'Inactive'}"`,
      `"${v.approved_at || v.created_at}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BGC_Member_List_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printVoterRoster = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bikrampur Garden City - Master Member List</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 25px; color: #0f172a; margin: 0; }
            .header { text-align: center; border-bottom: 2px solid #1e3a5f; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 22px; color: #1e3a5f; }
            .header p { margin: 5px 0 0 0; font-size: 13px; color: #475569; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 15px; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
            th { background: #f1f5f9; font-weight: bold; color: #1e293b; }
            tr:nth-child(even) { background: #f8fafc; }
            .voter-id { font-family: monospace; font-weight: bold; color: #047857; }
            .footer { margin-top: 30px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 15px; }
            @media print { body { padding: 10px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>বিক্রমপুর গার্ডেন সিটি সোসাইটি (Bikrampur Garden City)</h1>
            <p>৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক, শ্যামপুর, ঢাকা • অনুমোদিত চূড়ান্ত সদস্য তালিকা ২০২৬</p>
            <p style="font-size: 11px; color: #64748b; margin-top: 5px;">প্রিন্ট তারিখ: ${new Date().toLocaleString('bn-BD')} • মোট সদস্য: ${voters.length} জন</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ক্রম</th>
                <th>সদস্য আইডি</th>
                <th>নাম (বাংলা)</th>
                <th>Name (English)</th>
                <th>পিতার নাম</th>
                <th>মোবাইল</th>
                <th>প্লট ও ইউনিট</th>
                <th>রেসিডেন্ট ধরন</th>
              </tr>
            </thead>
            <tbody>
              ${voters.map((v, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td class="voter-id">${v.voter_id}</td>
                  <td>${v.name_bn || ''}</td>
                  <td>${v.name_en || ''}</td>
                  <td>${v.father_name || ''}</td>
                  <td>${v.phone || ''}</td>
                  <td>${v.plot_number} ${v.apartment_number ? `(${v.apartment_number})` : ''}</td>
                  <td>${v.resident_type.replace('_', ' ')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            <div>রিটার্নিং অফিসার • নির্বাচন পরিচালনা কমিটি ২০২৬</div>
            <div>বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const printApplicationsRoster = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bikrampur Garden City - Applications List</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 25px; color: #0f172a; margin: 0; }
            .header { text-align: center; border-bottom: 2px solid #1e3a5f; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 22px; color: #1e3a5f; }
            .header p { margin: 5px 0 0 0; font-size: 13px; color: #475569; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 15px; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
            th { background: #f1f5f9; font-weight: bold; color: #1e293b; }
            tr:nth-child(even) { background: #f8fafc; }
            .app-id { font-family: monospace; font-weight: bold; color: #0369a1; }
            @media print { body { padding: 10px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>বিক্রমপুর গার্ডেন সিটি সোসাইটি (Bikrampur Garden City)</h1>
            <p>৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক • সদস্যপদ নিবন্ধন আবেদনপত্র মাস্টার তালিকা</p>
            <p style="font-size: 11px; color: #64748b; margin-top: 5px;">প্রিন্ট তারিখ: ${new Date().toLocaleString('bn-BD')} • মোট আবেদন: ${filteredApps.length} টি</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ক্রম</th>
                <th>আবেদন আইডি</th>
                <th>আবেদনকারীর নাম</th>
                <th>মোবাইল</th>
                <th>প্লট ও ইউনিট</th>
                <th>রেসিডেন্ট ধরন</th>
                <th>স্ট্যাটাস</th>
                <th>জমার তারিখ</th>
              </tr>
            </thead>
            <tbody>
              ${filteredApps.map((a, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td class="app-id">${a.application_id}</td>
                  <td>${a.name_bn} (${a.name_en})</td>
                  <td>${a.phone}</td>
                  <td>${a.plot_number}</td>
                  <td>${a.resident_type.replace('_', ' ')}</td>
                  <td>${a.status.toUpperCase()}</td>
                  <td>${new Date(a.created_at).toLocaleDateString('bn-BD')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

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
      setReviewActionSuccess(`সফলভাবে অনুমোদিত! নতুন সদস্য আইডি: ${res.voterId}`);
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
    const res = requestApplicationMoreInfo(appId, reviewRemark);
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
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt="BGC Admin Seal"
              className="w-14 h-14 rounded-full object-contain bg-white p-0.5 shrink-0 drop-shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Society Administration & Election Commission Panel</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                বিক্রমপুর গার্ডেন সিটি — কেন্দ্রীয় অ্যাডমিন প্যানেল
              </h1>
              <p className="text-xs text-slate-300">
                এডমিন: <strong className="text-white">{currentUser.name}</strong> ({currentUser.email}) • পূর্ণ নিয়ন্ত্রণ ও সদস্য অনুমোদন ক্ষমতা
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-amber-200 block uppercase font-bold">অপেক্ষমাণ আবেদন</span>
              <span className="font-mono text-xl font-bold text-amber-300">{pendingAppsCount}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-emerald-200 block uppercase font-bold">অনুমোদিত সদস্য</span>
              <span className="font-mono text-xl font-bold text-emerald-300">{voters.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs with smooth touch scrolling */}
      <div className="flex overflow-x-auto no-scrollbar touch-scroll pb-2 gap-2 border-b border-slate-200 text-xs font-semibold">
        {[
          { id: 'applications', label: `📋 সদস্যপদ আবেদনপত্র (${pendingAppsCount} নতুন)`, icon: FileCheck2 },
          { id: 'voters', label: `👥 অনুমোদিত সদস্য তালিকা (${voters.length})`, icon: Users },
          { id: 'elections', label: `🗳️ নির্বাচন নিয়ন্ত্রণ ও ফলাফল`, icon: Vote },
          { id: 'complaints', label: `⚠️ নাগরিক অভিযোগ (${complaints.length})`, icon: MessageSquare },
          { id: 'rentals', label: `🏢 টু-লেট বিজ্ঞাপন মডারেশন (${rentals.length})`, icon: Building },
          { id: 'mosque', label: `🕌 মসজিদ ফান্ড ও অনুদান`, icon: HeartHandshake },
          { id: 'emails', label: `✉️ প্রেরিত ইমেইল লগ (${emailLogs.length})`, icon: Mail },
          { id: 'notices', label: `🔔 নোটিশ ব্যবস্থাপনা`, icon: FileText },
          { id: 'committee_mgmt', label: `👥 কমিটি পরিচালনা`, icon: Users }
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
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3 text-xs">
              <span className="font-bold text-slate-700">
                মোট প্রাপ্ত আবেদন: {filteredApps.length} টি
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportApplicationsCSV}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>এক্সপোর্ট CSV</span>
                </button>
                <button
                  onClick={printApplicationsRoster}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>প্রিন্ট তালিকা</span>
                </button>
              </div>
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
              <h3 className="text-base font-bold text-slate-900">অনুমোদিত সদস্যদের ডিজিটাল মাস্টার রোস্টার</h3>
              <p className="text-xs text-slate-500">নির্বাচন ২০২৬ এর চূড়ান্ত বৈধ সদস্য তালিকা</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportVotersCSV}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="w-4 h-4 text-emerald-700" />
                <span>সদস্য তালিকা CSV</span>
              </button>

              <button
                onClick={printVoterRoster}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-700" />
                <span>প্রিন্ট সদস্য তালিকা</span>
              </button>
            </div>
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <button onClick={() => setShowElectionForm(!showElectionForm)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold w-full text-left">+ নতুন নির্বাচন তৈরি করুন</button>
            {showElectionForm && (
              <div className="space-y-4 p-4 border rounded-xl bg-slate-50">
                <input placeholder="Title in English" className="w-full p-2 border rounded" value={electionForm.title} onChange={e => setElectionForm({...electionForm, title: e.target.value})} />
                <input placeholder="Title in Bangla" className="w-full p-2 border rounded" value={electionForm.title_bn} onChange={e => setElectionForm({...electionForm, title_bn: e.target.value})} />
                <textarea placeholder="Description" className="w-full p-2 border rounded" value={electionForm.description} onChange={e => setElectionForm({...electionForm, description: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs">Voting Start Date</label>
                    <input type="datetime-local" className="w-full p-2 border rounded" value={electionForm.voting_start} onChange={e => setElectionForm({...electionForm, voting_start: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs">Voting End Date</label>
                    <input type="datetime-local" className="w-full p-2 border rounded" value={electionForm.voting_end} onChange={e => setElectionForm({...electionForm, voting_end: e.target.value})} />
                  </div>
                </div>
                <select className="w-full p-2 border rounded" value={electionForm.status} onChange={e => setElectionForm({...electionForm, status: e.target.value as ElectionStatus})}>
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="voting">Voting</option>
                </select>
                <button onClick={() => { createElection(electionForm); setShowElectionForm(false); }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">তৈরি করুন</button>
              </div>
            )}
          </div>
          {elections.length === 0 && (
            <div className="bg-white p-6 rounded-3xl border text-center">
              কোনো নির্বাচন নেই। নতুন নির্বাচন তৈরি করুন।
            </div>
          )}
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

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    পদবী ও প্রার্থীর তালিকা
                  </h4>
                  <button onClick={() => setCandidateFormOpenFor(candidateFormOpenFor === election.id ? null : election.id)} className="text-xs font-bold text-blue-600">+ প্রার্থী যোগ করুন</button>
                </div>
                
                {candidateFormOpenFor === election.id && (
                  <div className="p-4 bg-slate-50 rounded-xl border space-y-3">
                    <select className="w-full p-2 border rounded" value={candidateForm.position_id} onChange={e => setCandidateForm({...candidateForm, position_id: e.target.value})}>
                      <option value="">পদ নির্বাচন করুন</option>
                      {election.positions.map(p => <option key={p.id} value={p.id}>{p.position_name_bn}</option>)}
                    </select>
                    <input placeholder="Name English" className="w-full p-2 border rounded" value={candidateForm.name} onChange={e => setCandidateForm({...candidateForm, name: e.target.value})} />
                    <input placeholder="Name Bangla" className="w-full p-2 border rounded" value={candidateForm.name_bn} onChange={e => setCandidateForm({...candidateForm, name_bn: e.target.value})} />
                    <textarea placeholder="Bio" className="w-full p-2 border rounded" value={candidateForm.bio} onChange={e => setCandidateForm({...candidateForm, bio: e.target.value})} />
                    <input placeholder="Symbol (e.g. নৌকা / Boat)" className="w-full p-2 border rounded" value={candidateForm.symbol} onChange={e => setCandidateForm({...candidateForm, symbol: e.target.value})} />
                    <input placeholder="Phone" className="w-full p-2 border rounded" value={candidateForm.phone} onChange={e => setCandidateForm({...candidateForm, phone: e.target.value})} />
                    <input placeholder="Photo URL (Optional)" className="w-full p-2 border rounded" value={candidateForm.photo_url} onChange={e => setCandidateForm({...candidateForm, photo_url: e.target.value})} />
                    <input placeholder="Member ID (Optional)" className="w-full p-2 border rounded" value={candidateForm.voter_id} onChange={e => setCandidateForm({...candidateForm, voter_id: e.target.value})} />
                    <button onClick={() => { addCandidateToElection(election.id, candidateForm); setCandidateFormOpenFor(null); }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">যোগ করুন</button>
                  </div>
                )}

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
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-emerald-800">{c.vote_count} ভোট</span>
                                <button onClick={() => removeCandidate(election.id, c.id)} className="text-red-500 font-bold">X</button>
                              </div>
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
                <h3 className="text-lg font-bold text-slate-900">সদস্যপদ আবেদনপত্র পুঙ্খানুপুঙ্খ যাচাই</h3>
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
                onClick={() => {
                  setReviewActionLoading('approve');
                  setTimeout(() => {
                    handleApprove(selectedApp.id);
                    setReviewActionLoading(null);
                    showToast(`${selectedApp.name_en}-এর আবেদন অনুমোদিত এবং সদস্য আইডি ইস্যু করা হয়েছে!`, 'success');
                  }, 500);
                }}
                disabled={!!reviewActionLoading}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {reviewActionLoading === 'approve' ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>অনুমোদন হচ্ছে...</span></>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /><span>অনুমোদন ও সদস্য আইডি ইস্যু (Approve)</span></>
                )}
              </button>

              <button
                onClick={() => {
                  setReviewActionLoading('more_info');
                  setTimeout(() => {
                    handleRequestMoreInfo(selectedApp.id);
                    setReviewActionLoading(null);
                    showToast('অতিরিক্ত তথ্যের অনুরোধ পাঠানো হয়েছে।', 'info');
                  }, 400);
                }}
                disabled={!!reviewActionLoading}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
              >
                {reviewActionLoading === 'more_info' ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>অতিরিক্ত তথ্য চাই</span>
                )}
              </button>

              <button
                onClick={() => {
                  setReviewActionLoading('reject');
                  setTimeout(() => {
                    handleReject(selectedApp.id);
                    setReviewActionLoading(null);
                    showToast('আবেদনটি বাতিল করা হয়েছে।', 'error');
                  }, 400);
                }}
                disabled={!!reviewActionLoading}
                className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
              >
                {reviewActionLoading === 'reject' ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>বাতিল করুন</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* TAB 8: NOTICES */}
      {adminTab === 'notices' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">নোটিশ ব্যবস্থাপনা</h3>
          </div>
          <div className="space-y-4 bg-slate-50 p-4 border rounded-xl">
            <h4 className="font-bold">নতুন নোটিশ তৈরি করুন</h4>
            <input placeholder="Subject/Title" className="w-full p-2 border rounded" value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} />
            <textarea placeholder="Content/Description" className="w-full p-2 border rounded" value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})} />
            <select className="w-full p-2 border rounded" value={noticeForm.category} onChange={e => setNoticeForm({...noticeForm, category: e.target.value})}>
              <option value="general">General</option>
              <option value="election">Election</option>
              <option value="maintenance">Maintenance</option>
              <option value="event">Event</option>
              <option value="notice">Notice</option>
            </select>
            <label className="flex items-center gap-2"><input type="checkbox" checked={noticeForm.important} onChange={e => setNoticeForm({...noticeForm, important: e.target.checked})} /> Important Notice</label>
            <input placeholder="সংযুক্তি লিঙ্ক (ঐচ্ছিক)" className="w-full p-2 border rounded" value={noticeForm.attachment_url} onChange={e => setNoticeForm({...noticeForm, attachment_url: e.target.value})} />
            <button
              onClick={() => {
                if (!noticeForm.title.trim() || !noticeForm.content.trim()) {
                  showToast('সাবজেক্ট এবং বিবরণ পূরণ করুন।', 'warning');
                  return;
                }
                setNoticePublishing(true);
                setTimeout(() => {
                  createAnnouncement({ ...noticeForm, is_public: true, category: noticeForm.category as any });
                  setNoticeForm({ title: '', content: '', category: 'general', important: false, attachment_url: '' });
                  setNoticePublishing(false);
                  showToast('নোটিশটি সফলভাবে প্রকাশিত হয়েছে!', 'success');
                }, 400);
              }}
              disabled={noticePublishing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {noticePublishing ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>প্রকাশিত হচ্ছে...</span></>
              ) : (
                <span>নোটিশ প্রকাশ করুন</span>
              )}
            </button>
          </div>
          
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">কোনো নোটিশ প্রকাশিত হয়নি</div>
            ) : (
              announcements.map(anc => (
                <div key={anc.id} className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {anc.important && <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">গুরুত্বপূর্ণ</span>}
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded capitalize">{anc.category}</span>
                    </div>
                    <h4 className="font-bold text-sm mt-1 truncate">{anc.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{anc.content.substring(0, 60)}...</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`"${anc.title}" নোটিশটি মুছে ফেলবেন?`)) {
                        deleteAnnouncement(anc.id);
                        showToast('নোটিশটি মুছে ফেলা হয়েছে।', 'info');
                      }
                    }}
                    className="shrink-0 text-rose-600 font-bold px-3 py-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    মুছুন
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 9: COMMITTEE MANAGEMENT (আহ্বায়ক ও কার্যনির্বাহী পরিষদ) */}
      {adminTab === 'committee_mgmt' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          {/* Header & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>সোসাইটি পরিচালনা পর্ষদ ও কমিটি ব্যবস্থাপনা</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                আহ্বায়ক কমিটি (বর্তমান দায়িত্বপ্রাপ্ত) ও নির্বাচন পরবর্তী কার্যনির্বাহী পরিষদের সদস্যদের তথ্য এন্ট্রি, এডিট ও নিয়ন্ত্রণ
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => setShowEnrollCandidateModal(true)}
                className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Vote className="w-3.5 h-3.5 text-purple-600" />
                <span>নির্বাচন থেকে পদায়ন / এনরোল</span>
              </button>

              <button
                onClick={() => setShowCommitteeAddForm(!showCommitteeAddForm)}
                className="px-4 py-2 bg-[#1e3a5f] hover:bg-[#152943] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{showCommitteeAddForm ? 'ফর্ম লুকান' : '+ নতুন সদস্য যোগ করুন'}</span>
              </button>
            </div>
          </div>

          {/* Committee Type Filter Tabs */}
          <div className="flex gap-2 border-b border-slate-100 pb-2 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setCommitteeTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                committeeTypeFilter === 'all'
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              সকল সদস্য ({committee.length})
            </button>
            <button
              onClick={() => setCommitteeTypeFilter('convening')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                committeeTypeFilter === 'convening'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>আহ্বায়ক কমিটি ({committee.filter(c => c.committee_type === 'convening' || !c.committee_type).length})</span>
            </button>
            <button
              onClick={() => setCommitteeTypeFilter('executive')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                committeeTypeFilter === 'executive'
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>কার্যনির্বাহী পরিষদ ({committee.filter(c => c.committee_type === 'executive').length})</span>
            </button>
            <button
              onClick={() => setCommitteeTypeFilter('advisory')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                committeeTypeFilter === 'advisory'
                  ? 'bg-purple-700 text-white font-bold'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>উপদেষ্টা পরিষদ ({committee.filter(c => c.committee_type === 'advisory').length})</span>
            </button>
          </div>

          {/* ADD COMMITTEE MEMBER FORM (Collapsible) */}
          {showCommitteeAddForm && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#1e3a5f]" />
                  <span>কমিটি সদস্য অন্তর্ভুক্তি ফরম (Add Committee Member)</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">* চিহ্নিত ঘরগুলো আবশ্যক</span>
              </div>

              {/* Committee Type Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
                <label
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    committeeForm.committee_type === 'convening'
                      ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="c_type"
                    checked={committeeForm.committee_type === 'convening'}
                    onChange={() => setCommitteeForm({ ...committeeForm, committee_type: 'convening', tenure: 'আহ্বায়ক কমিটি ২০২৬' })}
                    className="text-blue-600"
                  />
                  <span>আহ্বায়ক কমিটি (বর্তমান দায়িত্বপ্রাপ্ত)</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    committeeForm.committee_type === 'executive'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="c_type"
                    checked={committeeForm.committee_type === 'executive'}
                    onChange={() => setCommitteeForm({ ...committeeForm, committee_type: 'executive', tenure: '২০২৬-২০২৮' })}
                    className="text-emerald-600"
                  />
                  <span>কার্যনির্বাহী পরিষদ (নির্বাচিত)</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    committeeForm.committee_type === 'advisory'
                      ? 'bg-purple-50 border-purple-500 text-purple-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="c_type"
                    checked={committeeForm.committee_type === 'advisory'}
                    onChange={() => setCommitteeForm({ ...committeeForm, committee_type: 'advisory', tenure: 'স্থায়ী পরিষদ' })}
                    className="text-purple-600"
                  />
                  <span>উপদেষ্টা পরিষদ</span>
                </label>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">নাম (বাংলায়) *</label>
                  <input
                    placeholder="যেমন: মোঃ কামরুজ্জামান"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={committeeForm.name_bn}
                    onChange={e => setCommitteeForm({ ...committeeForm, name_bn: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">নাম (English) *</label>
                  <input
                    placeholder="e.g. Md. Kamruzzaman"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={committeeForm.name}
                    onChange={e => setCommitteeForm({ ...committeeForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">পদবী নির্বাচন / লিখুন *</label>
                  <div className="flex gap-1.5">
                    <select
                      className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                      onChange={e => {
                        const val = e.target.value;
                        if (!val) return;
                        const presets: Record<string, { en: string; bn: string }> = {
                          'c_convenor': { en: 'Convener', bn: 'আহ্বায়ক' },
                          'c_joint_convenor': { en: 'Joint Convener', bn: 'যুগ্ম আহ্বায়ক' },
                          'c_member_sec': { en: 'Member Secretary', bn: 'সদস্য সচিব' },
                          'c_member': { en: 'Member', bn: 'সদস্য' },
                          'c_pres': { en: 'President', bn: 'সভাপতি' },
                          'c_vp': { en: 'Vice President', bn: 'সহ-সভাপতি' },
                          'c_gs': { en: 'General Secretary', bn: 'সাধারণ সম্পাদক' },
                          'c_treasurer': { en: 'Treasurer', bn: 'কোষাধ্যক্ষ' },
                          'c_org_sec': { en: 'Organizing Secretary', bn: 'সাংগঠনিক সম্পাদক' },
                          'c_advisor': { en: 'Advisor', bn: 'উপদেষ্টা' }
                        };
                        if (presets[val]) {
                          setCommitteeForm({
                            ...committeeForm,
                            designation: presets[val].en,
                            designation_bn: presets[val].bn
                          });
                        }
                      }}
                    >
                      <option value="">-- প্রিসেট পদবী --</option>
                      <option value="c_convenor">আহ্বায়ক</option>
                      <option value="c_joint_convenor">যুগ্ম আহ্বায়ক</option>
                      <option value="c_member_sec">সদস্য সচিব</option>
                      <option value="c_member">সদস্য</option>
                      <option value="c_pres">সভাপতি</option>
                      <option value="c_vp">সহ-সভাপতি</option>
                      <option value="c_gs">সাধারণ সম্পাদক</option>
                      <option value="c_treasurer">কোষাধ্যক্ষ</option>
                      <option value="c_org_sec">সাংগঠনিক সম্পাদক</option>
                      <option value="c_advisor">উপদেষ্টা</option>
                    </select>
                    <input
                      placeholder="পদবী (বাংলা)"
                      className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={committeeForm.designation_bn}
                      onChange={e => setCommitteeForm({ ...committeeForm, designation_bn: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">পদবী (English)</label>
                  <input
                    placeholder="e.g. Convener / President"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                    value={committeeForm.designation}
                    onChange={e => setCommitteeForm({ ...committeeForm, designation: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">মোবাইল নম্বর *</label>
                  <input
                    placeholder="01711-000000"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono"
                    value={committeeForm.phone}
                    onChange={e => setCommitteeForm({ ...committeeForm, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    placeholder="member@bikrampurgardencity.com"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono"
                    value={committeeForm.email}
                    onChange={e => setCommitteeForm({ ...committeeForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">প্লট / ফ্ল্যাট নম্বর *</label>
                  <input
                    placeholder="যেমন: Plot-44, Building-A"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                    value={committeeForm.plot_number}
                    onChange={e => setCommitteeForm({ ...committeeForm, plot_number: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">মেয়াদকাল (Tenure) *</label>
                  <input
                    placeholder="যেমন: আহ্বায়ক কমিটি ২০২৬ / ২০২৪-২০২৬"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                    value={committeeForm.tenure}
                    onChange={e => setCommitteeForm({ ...committeeForm, tenure: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">সদস্যতার বছর (Since)</label>
                  <input
                    placeholder="যেমন: ২০২০"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                    value={committeeForm.since}
                    onChange={e => setCommitteeForm({ ...committeeForm, since: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">ছবি (Photo URL / Link)</label>
                  <input
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-[11px]"
                    value={committeeForm.photo_url}
                    onChange={e => setCommitteeForm({ ...committeeForm, photo_url: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">সিরিয়াল ক্রম (Sort Order)</label>
                  <input
                    type="number"
                    placeholder="1, 2, 3..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl"
                    value={committeeForm.sort_order}
                    onChange={e => setCommitteeForm({ ...committeeForm, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is_current_cb"
                    checked={committeeForm.is_current}
                    onChange={e => setCommitteeForm({ ...committeeForm, is_current: e.target.checked })}
                    className="rounded text-blue-600 w-4 h-4"
                  />
                  <label htmlFor="is_current_cb" className="font-bold text-slate-800 cursor-pointer">
                    বর্তমান সক্রিয় সদস্য (Active Now)
                  </label>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setShowCommitteeAddForm(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  বাতিল করুন
                </button>

                <button
                  onClick={() => {
                    if (!committeeForm.name_bn || !committeeForm.designation_bn || !committeeForm.phone) {
                      alert('অনুগ্রহ করে নাম, পদবী ও মোবাইল নম্বর পূরণ করুন।');
                      return;
                    }
                    addCommitteeMember({
                      ...committeeForm,
                      name: committeeForm.name || committeeForm.name_bn,
                      designation: committeeForm.designation || committeeForm.designation_bn,
                      photo_url: committeeForm.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                    });
                    setCommitteeForm({
                      name: '',
                      name_bn: '',
                      designation: '',
                      designation_bn: '',
                      phone: '',
                      email: '',
                      plot_number: '',
                      tenure: 'আহ্বায়ক কমিটি ২০২৬',
                      since: '২০২৪',
                      photo_url: '',
                      sort_order: 1,
                      is_current: true,
                      committee_type: 'convening'
                    });
                    setShowCommitteeAddForm(false);
                    alert('কমিটি সদস্য সফলভাবে অন্তর্ভুক্ত করা হয়েছে!');
                  }}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>সদস্য ডাটাবেজে সংরক্ষণ করুন</span>
                </button>
              </div>
            </div>
          )}

          {/* COMMITTEE MEMBERS LIST GRID */}
          <div className="space-y-3">
            {committee.filter(c => committeeTypeFilter === 'all' || c.committee_type === committeeTypeFilter || (!c.committee_type && committeeTypeFilter === 'convening')).length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                <Users className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">এই ক্যাটাগরিতে কোনো সদস্য যুক্ত নেই</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  উপরের "+ নতুন সদস্য যোগ করুন" বাটনে ক্লিক করে আহ্বায়ক কমিটি বা কার্যনির্বাহী পরিষদের সদস্যদের নাম ও পদবী এন্ট্রি করুন।
                </p>
                <button
                  onClick={() => setShowCommitteeAddForm(true)}
                  className="px-4 py-2 bg-[#1e3a5f] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  + সদস্য যোগ করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {committee
                  .filter(c => committeeTypeFilter === 'all' || c.committee_type === committeeTypeFilter || (!c.committee_type && committeeTypeFilter === 'convening'))
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map(member => (
                    <div
                      key={member.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-16 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-2xs relative">
                          <img
                            src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              member.committee_type === 'executive'
                                ? 'bg-emerald-100 text-emerald-900'
                                : member.committee_type === 'advisory'
                                ? 'bg-purple-100 text-purple-900'
                                : 'bg-blue-100 text-blue-900'
                            }`}>
                              {member.designation_bn}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                              #{member.sort_order}
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-sm truncate">{member.name_bn}</h4>
                          <div className="text-xs text-slate-500 truncate">{member.name}</div>
                          <div className="text-[11px] text-slate-600 font-semibold pt-0.5">প্লট: {member.plot_number}</div>
                          <div className="text-xs text-slate-700 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Info & Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded">
                          {member.tenure}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingMember(member)}
                            className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                            title="এডিট করুন"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>এডিট</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`আপনি কি "${member.name_bn}" কে কমিটি থেকে বাদ দিতে চান?`)) {
                                deleteCommitteeMember(member.id);
                                showToast('সদস্য তালিকা থেকে মুছে ফেলা হয়েছে।', 'success');
                              }
                            }}
                            className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT COMMITTEE MEMBER MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                <span>কমিটি সদস্য তথ্য সম্পাদনা (Edit Member)</span>
              </h3>
              <button
                onClick={() => setEditingMember(null)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">কমিটি টাইপ</label>
                <select
                  value={editingMember.committee_type || 'convening'}
                  onChange={e => setEditingMember({ ...editingMember, committee_type: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold bg-slate-50"
                >
                  <option value="convening">আহ্বায়ক কমিটি (বর্তমান দায়িত্বপ্রাপ্ত)</option>
                  <option value="executive">কার্যনির্বাহী পরিষদ (নির্বাচিত)</option>
                  <option value="advisory">উপদেষ্টা পরিষদ</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">নাম (বাংলা)</label>
                  <input
                    value={editingMember.name_bn}
                    onChange={e => setEditingMember({ ...editingMember, name_bn: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">নাম (English)</label>
                  <input
                    value={editingMember.name}
                    onChange={e => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">পদবী (বাংলা)</label>
                  <input
                    value={editingMember.designation_bn}
                    onChange={e => setEditingMember({ ...editingMember, designation_bn: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">পদবী (English)</label>
                  <input
                    value={editingMember.designation}
                    onChange={e => setEditingMember({ ...editingMember, designation: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">মোবাইল</label>
                  <input
                    value={editingMember.phone}
                    onChange={e => setEditingMember({ ...editingMember, phone: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">প্লট নম্বর</label>
                  <input
                    value={editingMember.plot_number}
                    onChange={e => setEditingMember({ ...editingMember, plot_number: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">মেয়াদকাল (Tenure)</label>
                  <input
                    value={editingMember.tenure}
                    onChange={e => setEditingMember({ ...editingMember, tenure: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">সিরিয়াল ক্রম (Sort Order)</label>
                  <input
                    type="number"
                    value={editingMember.sort_order}
                    onChange={e => setEditingMember({ ...editingMember, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ছবির লিঙ্ক (Photo URL)</label>
                <input
                  value={editingMember.photo_url}
                  onChange={e => setEditingMember({ ...editingMember, photo_url: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-[11px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingMember(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  setCommitteeActionLoading('save-' + editingMember.id);
                  setTimeout(() => {
                    updateCommitteeMember(editingMember.id, editingMember);
                    setEditingMember(null);
                    setCommitteeActionLoading(null);
                    showToast('সদস্যের তথ্য সফলভাবে আপডেট হয়েছে!', 'success');
                  }, 350);
                }}
                disabled={!!committeeActionLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {committeeActionLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENROLL CANDIDATE INTO COMMITTEE MODAL */}
      {showEnrollCandidateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Vote className="w-5 h-5 text-purple-600" />
                  <span>নির্বাচন থেকে প্রার্থী পদায়ন ও এনরোলমেন্ট</span>
                </h3>
                <p className="text-xs text-slate-500">
                  নির্বাচনী প্রার্থীদের মধ্য থেকে নির্বাচিত বা মনোনীতদের সরাসরি কার্যনির্বাহী পরিষদে যুক্ত করুন
                </p>
              </div>
              <button
                onClick={() => {
                  setShowEnrollCandidateModal(false);
                  setSelectedCandidateForEnroll(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {elections.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed text-xs text-slate-500 space-y-2">
                <Vote className="w-8 h-8 text-slate-400 mx-auto" />
                <p>বর্তমানে কোনো নির্বাচন তালিকা পাওয়া যায়নি।</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-bold text-xs mb-1">নির্বাচন সিলেক্ট করুন</label>
                  <select
                    value={selectedElectionForEnroll || elections[0]?.id}
                    onChange={e => {
                      setSelectedElectionForEnroll(e.target.value);
                      setSelectedCandidateForEnroll(null);
                    }}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold bg-slate-50"
                  >
                    {elections.map(el => (
                      <option key={el.id} value={el.id}>
                        {el.title_bn || el.title} ({el.status.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Candidate Selection List */}
                {(() => {
                  const currentEl = elections.find(e => e.id === (selectedElectionForEnroll || elections[0]?.id)) || elections[0];
                  if (!currentEl || currentEl.candidates.length === 0) {
                    return (
                      <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                        এই নির্বাচনে কোনো প্রার্থী তালিকা পাওয়া যায়নি।
                      </div>
                    );
                  }
                  return (
                    <div className="space-y-2.5">
                      <label className="block text-slate-700 font-bold text-xs">প্রার্থী নির্বাচন করুন:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
                        {currentEl.candidates.map(cand => (
                          <div
                            key={cand.id}
                            onClick={() => {
                              setSelectedCandidateForEnroll(cand);
                              const pos = currentEl.positions.find(p => p.id === cand.position_id);
                              setEnrollDesignation({
                                designation: pos?.position_name || 'Executive Member',
                                designation_bn: pos?.position_name_bn || 'নির্বাহী সদস্য',
                                tenure: '২০২৬-২০২৮',
                                sort_order: pos?.sort_order || 1
                              });
                            }}
                            className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                              selectedCandidateForEnroll?.id === cand.id
                                ? 'bg-purple-50 border-purple-500 shadow-2xs'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="w-10 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                              <img
                                src={cand.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                                alt={cand.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 text-xs">
                              <h5 className="font-bold text-slate-900 truncate">{cand.name_bn || cand.name}</h5>
                              <p className="text-[11px] text-slate-500 font-medium">প্রতীক: {cand.symbol}</p>
                              <p className="text-[10px] text-purple-700 font-bold">{cand.vote_count} ভোট প্রাপ্ত</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Candidate Enrollment Form */}
                {selectedCandidateForEnroll && (
                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3 text-xs animate-in fade-in-50">
                    <h5 className="font-bold text-purple-950 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-purple-700" />
                      <span>পদায়ন কনফার্মেশন: {selectedCandidateForEnroll.name_bn || selectedCandidateForEnroll.name}</span>
                    </h5>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">কমিটিতে বরাদ্দকৃত পদবী (বাংলা)</label>
                        <input
                          value={enrollDesignation.designation_bn}
                          onChange={e => setEnrollDesignation({ ...enrollDesignation, designation_bn: e.target.value })}
                          className="w-full p-2.5 bg-white border border-purple-300 rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">মেয়াদকাল</label>
                        <input
                          value={enrollDesignation.tenure}
                          onChange={e => setEnrollDesignation({ ...enrollDesignation, tenure: e.target.value })}
                          className="w-full p-2.5 bg-white border border-purple-300 rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          addCommitteeMember({
                            name: selectedCandidateForEnroll.name,
                            name_bn: selectedCandidateForEnroll.name_bn || selectedCandidateForEnroll.name,
                            designation: enrollDesignation.designation || 'Executive Member',
                            designation_bn: enrollDesignation.designation_bn || 'নির্বাহী সদস্য',
                            phone: selectedCandidateForEnroll.phone,
                            email: '',
                            plot_number: 'ঢোলাইপাড়',
                            tenure: enrollDesignation.tenure,
                            since: '২০২৬',
                            photo_url: selectedCandidateForEnroll.photo_url,
                            sort_order: enrollDesignation.sort_order,
                            is_current: true,
                            committee_type: 'executive'
                          });
                          setShowEnrollCandidateModal(false);
                          setSelectedCandidateForEnroll(null);
                          alert(`অভিনন্দন! "${selectedCandidateForEnroll.name_bn || selectedCandidateForEnroll.name}" সফলভাবে কার্যনির্বাহী পরিষদে অন্তর্ভুক্ত হয়েছেন।`);
                        }}
                        className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>কার্যনির্বাহী পরিষদে এনরোল করুন</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
