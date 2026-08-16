import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Vote,
  FileText,
  Building,
  HeartHandshake,
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Download,
  Printer,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  QrCode,
  Sparkles,
  Layers
} from 'lucide-react';
import { ComplaintCategory, PropertyType, FurnishedType, ContactPreference } from '../types';

export const VoterDashboard: React.FC = () => {
  const {
    currentUser,
    currentVoter,
    dashboardTab,
    setDashboardTab,
    setCurrentView,
    setSelectedElectionId,
    elections,
    hasVoterVotedInElection,
    complaints,
    submitComplaint,
    rentals,
    createRentalListing,
    updateRentalStatus,
    deleteRentalListing,
    mosqueProjects,
    donations,
    makeDonation,
    announcements,
    showToast
  } = useApp();

  // Redirect if not logged in
  if (!currentUser || !currentVoter) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">লগইন আবশ্যক</h2>
        <p className="text-xs text-slate-500">
          ভোটার ড্যাশবোর্ড ব্যবহার করতে অনুগ্রহ করে আপনার অনুমোদিত ফোন নম্বর ও ওটিপি দিয়ে লগইন করুন।
        </p>
        <button
          onClick={() => setCurrentView('login')}
          className="px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded-xl text-xs"
        >
          লগইন করুন
        </button>
      </div>
    );
  }

  const activeElection = elections.find(e => e.status === 'voting');
  const hasVotedActive = activeElection ? hasVoterVotedInElection(activeElection.id, currentVoter.id) : false;

  // Filter Voter's own records
  const myComplaints = complaints.filter(c => c.voter_id === currentVoter.id);
  const myRentals = rentals.filter(r => r.voter_id === currentVoter.id);
  const myDonations = donations.filter(d => d.voter_id === currentVoter.id || d.donor_phone === currentVoter.phone);

  // New Complaint State
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintCat, setComplaintCat] = useState<ComplaintCategory>('maintenance');
  const [isComplaintSubmitting, setIsComplaintSubmitting] = useState(false);

  // New Rental State
  const [rentalPropertyType, setRentalPropertyType] = useState<PropertyType>('apartment');
  const [rentalFloor, setRentalFloor] = useState(currentVoter.floor || '3rd Floor');
  const [rentalUnit, setRentalUnit] = useState(currentVoter.apartment_number || '3A');
  const [rentalAmount, setRentalAmount] = useState<number>(22000);
  const [rentalBedrooms, setRentalBedrooms] = useState<number>(3);
  const [rentalBathrooms, setRentalBathrooms] = useState<number>(3);
  const [rentalSize, setRentalSize] = useState<number>(1350);
  const [rentalFurnished, setRentalFurnished] = useState<FurnishedType>('unfurnished');
  const [rentalDesc, setRentalDesc] = useState('');
  const [rentalContactPref, setRentalContactPref] = useState<ContactPreference>('phone');
  const [rentalAvailableFrom, setRentalAvailableFrom] = useState('2026-09-01');
  const [rentalFacilities, setRentalFacilities] = useState<string[]>([
    'Lift / Elevator',
    'Generator Backup',
    'CCTV Security',
    'Titas Gas Line'
  ]);
  const [isRentalSubmitting, setIsRentalSubmitting] = useState(false);

  // New Donation State
  const [donationProjId, setDonationProjId] = useState(mosqueProjects[0]?.id || '');
  const [donationAmount, setDonationAmount] = useState<number>(5000);
  const [donationMethod, setDonationMethod] = useState<'online' | 'cash'>('online');
  const [donationNotes, setDonationNotes] = useState('');
  const [donationReceipt, setDonationReceipt] = useState<string | null>(null);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintTitle.trim() || !complaintDesc.trim()) {
      showToast('অভিযোগের শিরোনাম ও বিবরণ লিখুন।', 'warning');
      return;
    }
    setIsComplaintSubmitting(true);
    setTimeout(() => {
      const res = submitComplaint({
        title: complaintTitle,
        description: complaintDesc,
        category: complaintCat
      });
      setIsComplaintSubmitting(false);
      if (res.success) {
        showToast(res.message, 'success');
        setComplaintTitle('');
        setComplaintDesc('');
      } else {
        showToast(res.message || 'অভিযোগ দাখিল হয়নি।', 'error');
      }
    }, 400);
  };

  const handleRentalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRentalSubmitting(true);
    setTimeout(() => {
      const res = createRentalListing({
        property_type: rentalPropertyType,
        plot_number: currentVoter.plot_number,
        building_number: currentVoter.building_number,
        floor: rentalFloor,
        apartment_number: rentalUnit,
        rent_amount: Number(rentalAmount),
        bedrooms: Number(rentalBedrooms),
        bathrooms: Number(rentalBathrooms),
        size_sqft: Number(rentalSize),
        furnished: rentalFurnished,
        facilities: rentalFacilities,
        description: rentalDesc || `${rentalBedrooms} Bed Flat at ${currentVoter.plot_number}`,
        contact_preference: rentalContactPref,
        photos: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
        ],
        available_from: rentalAvailableFrom
      });
      setIsRentalSubmitting(false);
      if (res.success) {
        showToast(res.message, 'success');
      } else {
        showToast(res.message || 'বিজ্ঞাপন প্রকাশ হয়নি।', 'error');
      }
    }, 450);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = makeDonation({
      projectId: donationProjId,
      amount: Number(donationAmount),
      paymentMethod: donationMethod,
      donorName: currentVoter.name_en,
      donorPhone: currentVoter.phone,
      notes: donationNotes
    });
    if (res.success) {
      setDonationReceipt(res.receiptNo);
    }
  };

  const isOwner = currentVoter.resident_type !== 'tenant';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner - Professional Polish Slate Canvas */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>অনুমোদিত সোসাইটি সদস্য (Verified Member)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {currentVoter.name_en}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentVoter.name_bn} — বিক্রমপুর গার্ডেন সিটির সম্মানিত সদস্য ড্যাশবোর্ডে আপনাকে স্বাগতম।
            </p>
          </div>

          {/* Quick Member ID Badge */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center sm:text-right shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
              Permanent Member ID
            </span>
            <span className="font-mono text-2xl font-black text-emerald-400 tracking-wider">
              {currentVoter.voter_id}
            </span>
            <div className="text-[11px] text-slate-300 capitalize pt-0.5">
              {currentVoter.resident_type.replace('_', ' ')}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Info Cards (Professional Polish Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 uppercase tracking-tight">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>সদস্য আইডি (Member ID)</span>
          </div>
          <div className="font-mono text-xl font-bold text-slate-900">{currentVoter.voter_id}</div>
          <div className="text-[11px] text-emerald-700 font-semibold">সক্রিয় সদস্য কার্ড</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 uppercase tracking-tight">
            <User className="w-4 h-4 text-slate-900" />
            <span>রেসিডেন্টের ধরণ (Type)</span>
          </div>
          <div className="text-base font-bold text-slate-900 capitalize">
            {currentVoter.resident_type.replace('_', ' ')}
          </div>
          <div className="text-[11px] text-slate-500">
            {isOwner ? 'সোসাইটি সুবিধাপ্রাপ্ত সদস্য' : 'সদস্যপদপ্রাপ্ত নিবাসী'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 uppercase tracking-tight">
            <MapPin className="w-4 h-4 text-slate-900" />
            <span>ঠিকানা (Address)</span>
          </div>
          <div className="text-sm font-bold text-slate-900 truncate">
            {currentVoter.plot_number}, {currentVoter.building_number || ''}
          </div>
          <div className="text-[11px] text-slate-500">
            {currentVoter.floor || 'Floor N/A'}, Unit: {currentVoter.apartment_number || 'N/A'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 uppercase tracking-tight">
            <Phone className="w-4 h-4 text-slate-900" />
            <span>মোবাইল নম্বর (Mobile)</span>
          </div>
          <div className="font-mono text-base font-bold text-slate-900">{currentVoter.phone}</div>
          <div className="text-[11px] text-slate-500">OTP রিসিভার নম্বর</div>
        </div>
      </div>

      {/* Active Election Highlight Card */}
      {activeElection && (
        <div className={`p-6 rounded-2xl border transition-all ${
          hasVotedActive
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
            : 'bg-slate-900 border-slate-800 text-white shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  hasVotedActive
                    ? 'bg-emerald-200 text-emerald-900'
                    : 'bg-emerald-400 text-slate-950'
                }`}>
                  {hasVotedActive ? '✓ ভোট সম্পন্ন (Voted)' : '🔴 ভোটগ্রহণ চলমান (Live Election)'}
                </span>
                <span className="text-xs opacity-80">কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                {activeElection.title}
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${hasVotedActive ? 'text-emerald-800' : 'text-slate-300'}`}>
                {hasVotedActive
                  ? 'আপনার মূল্যবান ভোট সফলভাবে সংরক্ষিত হয়েছে। ধন্যবাদ নাগরিক দায়িত্ব পালনের জন্য।'
                  : 'আপনি এই সোসাইটির নিবন্ধিত সদস্য। ডিজিটাল ব্যালটে সভাপতি, সাধারণ সম্পাদক, কোষাধ্যক্ষ ও অন্যান্য পদে আপনার পছন্দের প্রার্থীকে ভোট দিন।'}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {hasVotedActive ? (
                <button
                  onClick={() => {
                    setSelectedElectionId(activeElection.id);
                    setCurrentView('elections');
                  }}
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  ফলাফল ও লাইভ পর্যবেক্ষণ দেখুন →
                </button>
              ) : (
                <button
                  id="dashboard-vote-now-btn"
                  onClick={() => {
                    setSelectedElectionId(activeElection.id);
                    setCurrentView('election-vote');
                  }}
                  className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Vote className="w-4 h-4 text-slate-950" />
                  <span>ভোট দিন (Cast Your Vote)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Tabs Container */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200 text-xs font-semibold">
          {[
            { id: 'overview', label: '📊 সারসংক্ষেপ ও সদস্য কার্ড (Overview)', icon: Layers },
            { id: 'notices', label: '🔔 নোটিশ বোর্ড (Notices)', icon: FileText },
            { id: 'complaints', label: `⚠️ অভিযোগ প্রতিকার (${myComplaints.length})`, icon: MessageSquare },
            { id: 'rentals', label: `🏢 আমার ভাড়া বিজ্ঞাপন (${myRentals.length})`, icon: Building },
            { id: 'elections', label: '🗳️ নির্বাচন ও ভোট (Elections)', icon: Vote },
            { id: 'donations', label: `🕌 মসজিদ ফান্ড (শীঘ্রই)`, icon: HeartHandshake },
            { id: 'profile', label: '👤 ডিজিটাল মেম্বার কার্ড (Digital ID)', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setDashboardTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                dashboardTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {dashboardTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Quick Actions & Recent Activity */}
            <div className="lg:col-span-7 space-y-6">
              {/* Recent Complaints */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#1e3a5f]" />
                    <span>আমার সাম্প্রতিক অভিযোগ (Recent Complaints)</span>
                  </h3>
                  <button
                    onClick={() => setDashboardTab('complaints')}
                    className="text-xs text-blue-700 font-bold hover:underline"
                  >
                    নতুন দিন +
                  </button>
                </div>

                {myComplaints.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">আপনার কোনো অভিযোগ নথিভুক্ত নেই।</p>
                ) : (
                  <div className="space-y-3">
                    {myComplaints.map(cmp => (
                      <div key={cmp.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{cmp.title}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                            cmp.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : cmp.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {cmp.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-slate-600 line-clamp-2">{cmp.description}</p>
                        {cmp.admin_response && (
                          <div className="text-[11px] text-blue-900 bg-blue-50/80 p-2 rounded border border-blue-100">
                            <strong>কমিটির উত্তর:</strong> {cmp.admin_response}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mosque Coming Soon */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 text-center">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">মসজিদ উন্নয়ন তহবিল শীঘ্রই চালু হবে</h3>
                <p className="text-xs text-slate-500">অনলাইন ডোনেশন সিস্টেমের কাজ চলছে।</p>
                <div className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Coming Soon</div>
              </div>
            </div>

            {/* Right: Digital Society Voter ID Card Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-slate-900 via-[#1e3a5f] to-slate-950 text-white rounded-3xl p-6 shadow-2xl border border-slate-700 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <img
                      src="/logo.png"
                      alt="Bikrampur Garden City Seal"
                      className="w-9 h-9 rounded-full object-contain shrink-0 bg-white p-0.5"
                    />
                    <div>
                      <div className="text-xs font-bold tracking-wider uppercase">Bikrampur Garden City</div>
                      <div className="text-[10px] text-slate-400">Residential Society • Dholaipar</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                    MEMBER CARD
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-24 rounded-xl bg-slate-800 border border-white/20 overflow-hidden relative shrink-0">
                    <img
                      src={currentVoter.bill_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={currentVoter.name_en}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Member Name</div>
                    <div className="font-bold text-base text-white">{currentVoter.name_en}</div>
                    <div className="text-slate-300 text-xs">{currentVoter.name_bn}</div>
                    <div className="font-mono text-emerald-300 text-sm font-bold pt-1">
                      {currentVoter.voter_id}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/5 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="text-slate-400 block">Resident Type:</span>
                    <span className="font-semibold capitalize text-slate-200">
                      {currentVoter.resident_type.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Plot & Unit:</span>
                    <span className="font-semibold text-slate-200">
                      {currentVoter.plot_number}, {currentVoter.apartment_number || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Mobile:</span>
                    <span className="font-semibold text-slate-200 font-mono">{currentVoter.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Issue Date:</span>
                    <span className="font-semibold text-slate-200">
                      {new Date(currentVoter.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  <span>442 Dholaipar, Dhaka-Mawa Highway</span>
                  <span className="text-emerald-400 font-semibold">Digital Verified ✓</span>
                </div>
              </div>

              <button
                onClick={() => setDashboardTab('profile')}
                className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>সদস্য আইডি কার্ড প্রিন্ট / সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB: NOTICES */}
        {dashboardTab === 'notices' && (
          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">নোটিশ বোর্ড (Notice Board)</h2>
                <p className="text-xs text-slate-500 mt-0.5">সোসাইটি পরিচালনা কমিটি কর্তৃক প্রকাশিত নোটিশসমূহ</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold">
                মোট {announcements.length}টি নোটিশ
              </span>
            </div>
            {announcements.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-sm font-medium">কোনো নোটিশ প্রকাশিত হয়নি</p>
                <p className="text-xs mt-1">নতুন নোটিশ প্রকাশিত হলে এখানে দেখা যাবে।</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...announcements].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()).map(notice => (
                  <div key={notice.id} className={`p-5 rounded-2xl border ${
                    notice.important
                      ? 'bg-red-50 border-red-200 shadow-sm'
                      : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {notice.important && (
                            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                              ⚠️ গুরুত্বপূর্ণ
                            </span>
                          )}
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                            notice.category === 'election' ? 'bg-emerald-100 text-emerald-800' :
                            notice.category === 'maintenance' ? 'bg-amber-100 text-amber-800' :
                            notice.category === 'event' ? 'bg-purple-100 text-purple-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {notice.category === 'election' ? 'নির্বাচন' :
                             notice.category === 'maintenance' ? 'রক্ষণাবেক্ষণ' :
                             notice.category === 'event' ? 'অনুষ্ঠান' :
                             notice.category === 'general' ? 'সাধারণ' : notice.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug">{notice.title}</h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line">{notice.content}</p>
                        {notice.attachment_url && (
                          <a
                            href={notice.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-blue-700 hover:text-blue-900 font-semibold"
                          >
                            📎 সংযুক্তি দেখুন
                          </a>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 shrink-0 text-right">
                        {new Date(notice.published_at).toLocaleDateString('bn-BD', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ELECTIONS */}
        {dashboardTab === 'elections' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">নির্বাচন কার্যপরিচালনা কেন্দ্র (Election Center)</h3>
                  <p className="text-xs text-slate-500">চলমান ও পূর্ববর্তী নির্বাচনের পূর্ণাঙ্গ তথ্য ও ব্যালট</p>
                </div>
              </div>

              {activeElection && (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                          ভোটিং লাইভ
                        </span>
                        <span className="text-xs text-slate-500">
                          ভোটগ্রহণ সমাপ্তি: {new Date(activeElection.voting_end).toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mt-1">{activeElection.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{activeElection.description}</p>
                    </div>

                    <div>
                      {hasVotedActive ? (
                        <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>আপনার ভোট সফলভাবে গৃহীত হয়েছে</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedElectionId(activeElection.id);
                            setCurrentView('election-vote');
                          }}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <Vote className="w-4 h-4" />
                          <span>ব্যালটে ভোট প্রদান করুন</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Positions summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200 text-xs">
                    {activeElection.positions.map(pos => {
                      const posCandidates = activeElection.candidates.filter(c => c.position_id === pos.id);
                      return (
                        <div key={pos.id} className="p-3 bg-white rounded-xl border border-slate-200">
                          <div className="font-bold text-slate-900">{pos.position_name_bn}</div>
                          <div className="text-[11px] text-slate-500">{pos.position_name}</div>
                          <div className="text-emerald-700 font-semibold text-[11px] mt-1">
                            প্রার্থী: {posCandidates.length} জন
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* View full candidates button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setCurrentView('elections')}
                  className="px-6 py-2.5 bg-[#1e3a5f] hover:bg-[#152943] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  প্রার্থীদের ইশতেহার ও প্রতীক তালিকা দেখুন →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPLAINTS */}
        {dashboardTab === 'complaints' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Submit New Complaint */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#1e3a5f]" />
                  <span>নতুন অভিযোগ বা সমস্যা দাখিল (File Complaint)</span>
                </h3>
                <p className="text-xs text-slate-500">নিরাপত্তা, পানি, বিদ্যুৎ বা পরিচ্ছন্নতা সংক্রান্ত সমস্যা জানান</p>
              </div>

              {complaintSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{complaintSuccess}</span>
                </div>
              )}

              <form onSubmit={handleComplaintSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">অভিযোগের বিভাগ (Category):</label>
                  <select
                    value={complaintCat}
                    onChange={e => setComplaintCat(e.target.value as ComplaintCategory)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium"
                  >
                    <option value="maintenance">রক্ষণাবেক্ষণ ও লাইট/পাম্প (Maintenance)</option>
                    <option value="security">নিরাপত্তা ও গার্ড (Security)</option>
                    <option value="cleanliness">ময়লা ও ড্রেনেজ (Cleanliness)</option>
                    <option value="noise">শব্দদূষণ বা অনিয়ম (Noise/Violation)</option>
                    <option value="other">অন্যান্য (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">বিষয় / শিরোনাম (Title):</label>
                  <input
                    type="text"
                    value={complaintTitle}
                    onChange={e => setComplaintTitle(e.target.value)}
                    placeholder="যেমন: ৩ নম্বর রোডের কর্নারে ড্রেন পরিষ্কারকরণ"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">বিস্তারিত বিবরণ (Description):</label>
                  <textarea
                    rows={4}
                    value={complaintDesc}
                    onChange={e => setComplaintDesc(e.target.value)}
                    placeholder="সমস্যার সঠিক স্থান ও সময় উল্লেখ করে বিস্তারিত লিখুন..."
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isComplaintSubmitting}
                  className="w-full py-3 bg-[#1e3a5f] hover:bg-[#152943] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isComplaintSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>দাখিল হচ্ছে...</span></>
                  ) : (
                    <span>অভিযোগ জমা দিন (Submit Complaint)</span>
                  )}
                </button>
              </form>
            </div>

            {/* List of my complaints */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">আমার অভিযোগের তালিকা ও অগ্রগতি</h3>
              </div>

              {myComplaints.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">এখনো কোনো অভিযোগ দাখিল করা হয়নি।</p>
              ) : (
                <div className="space-y-3">
                  {myComplaints.map(cmp => (
                    <div key={cmp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{cmp.title}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          cmp.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-900'
                            : cmp.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {cmp.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{cmp.description}</p>
                      <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                        <span>ক্যাটাগরি: {cmp.category}</span>
                        <span>তারিখ: {new Date(cmp.created_at).toLocaleDateString('bn-BD')}</span>
                      </div>
                      {cmp.admin_response && (
                        <div className="p-2.5 bg-blue-50 text-blue-950 rounded-xl border border-blue-200">
                          <strong className="block text-[11px] text-blue-900">সোসাইটি এডমিনের জবাব:</strong>
                          <span>{cmp.admin_response}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MY RENTALS (Owners only post rule) */}
        {dashboardTab === 'rentals' && (
          <div className="space-y-6">
            {!isOwner ? (
              /* Tenant Warning */
              <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 text-center space-y-3 max-w-xl mx-auto">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">বিজ্ঞাপন পোস্ট করার অনুমতি সীমাবদ্ধ</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  সোসাইটির নীতিমালা অনুযায়ী শুধুমাত্র <strong>প্লট মালিক, ভবন মালিক ও ফ্ল্যাট মালিকগণ</strong> সরাসরি ভাড়ার বিজ্ঞাপন পোস্ট করতে পারবেন। আপনার বর্তমান রেসিডেন্ট স্ট্যাটাস: <em>Tenant (ভাড়াটিয়া)</em>।
                </p>
                <button
                  onClick={() => setCurrentView('rentals')}
                  className="px-5 py-2 bg-[#1e3a5f] text-white text-xs font-bold rounded-xl"
                >
                  পাবলিক ভাড়া বিজ্ঞাপন দেখুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Post New Rental Ad Form */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>নতুন টু-লেট / ভাড়া বিজ্ঞাপন প্রকাশ (Post Ad)</span>
                    </h3>
                    <p className="text-xs text-slate-500">আপনার প্লট/ভবন: {currentVoter.plot_number} {currentVoter.building_number || ''}</p>
                  </div>

                  {rentalSuccess && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{rentalSuccess}</span>
                    </div>
                  )}

                  {rentalError && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
                      {rentalError}
                    </div>
                  )}

                  <form onSubmit={handleRentalSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">প্রোপার্টি ধরন:</label>
                        <select
                          value={rentalPropertyType}
                          onChange={e => setRentalPropertyType(e.target.value as PropertyType)}
                          className="w-full p-2 border border-slate-300 rounded-xl bg-white"
                        >
                          <option value="apartment">রেসিডেন্সিয়াল এপার্টমেন্ট</option>
                          <option value="flat">ফ্ল্যাট (Family Flat)</option>
                          <option value="portion">ইউনিট / পোর্শন</option>
                          <option value="shop">বাণিজ্যিক স্পেস / দোকান</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">মাসিক ভাড়া (BDT):</label>
                        <input
                          type="number"
                          value={rentalAmount}
                          onChange={e => setRentalAmount(Number(e.target.value))}
                          placeholder="22000"
                          className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">বেডরুম:</label>
                        <input
                          type="number"
                          value={rentalBedrooms}
                          onChange={e => setRentalBedrooms(Number(e.target.value))}
                          className="w-full p-2 border border-slate-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">বাথরুম:</label>
                        <input
                          type="number"
                          value={rentalBathrooms}
                          onChange={e => setRentalBathrooms(Number(e.target.value))}
                          className="w-full p-2 border border-slate-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">আয়তন (Sqft):</label>
                        <input
                          type="number"
                          value={rentalSize}
                          onChange={e => setRentalSize(Number(e.target.value))}
                          className="w-full p-2 border border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">ফার্নিশিং স্ট্যাটাস:</label>
                        <select
                          value={rentalFurnished}
                          onChange={e => setRentalFurnished(e.target.value as FurnishedType)}
                          className="w-full p-2 border border-slate-300 rounded-xl bg-white"
                        >
                          <option value="unfurnished">আনফার্নিশড (Unfurnished)</option>
                          <option value="semi_furnished">সেমি-ফার্নিশড</option>
                          <option value="furnished">ফুল ফার্নিশড</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">যোগাযোগ পছন্দ:</label>
                        <select
                          value={rentalContactPref}
                          onChange={e => setRentalContactPref(e.target.value as ContactPreference)}
                          className="w-full p-2 border border-slate-300 rounded-xl bg-white"
                        >
                          <option value="phone">মোবাইল কল (Phone)</option>
                          <option value="whatsapp">হোয়াটসঅ্যাপ (WhatsApp)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">বিজ্ঞাপনের বিবরণ (Description):</label>
                      <textarea
                        rows={3}
                        value={rentalDesc}
                        onChange={e => setRentalDesc(e.target.value)}
                        placeholder="ফ্ল্যাটের সুবিধা যেমন তিতাস গ্যাস, নিরবচ্ছিন্ন বিদ্যুৎ, পার্কিং ইত্যাদি লিখুন..."
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isRentalSubmitting}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isRentalSubmitting ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>প্রকাশিত হচ্ছে...</span></>
                      ) : (
                        <span>বিজ্ঞাপন প্রকাশ করুন (Publish Rental Ad)</span>
                      )}
                    </button>
                  </form>
                </div>

                {/* My Active Rental Listings */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-sm">আমার সক্রিয় বিজ্ঞাপনের তালিকা ({myRentals.length})</h3>
                  </div>

                  {myRentals.length === 0 ? (
                    <p className="text-xs text-slate-400 py-8 text-center">আপনার কোনো সক্রিয় ভাড়া বিজ্ঞাপন নেই।</p>
                  ) : (
                    <div className="space-y-3">
                      {myRentals.map(rnt => (
                        <div key={rnt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-sm text-slate-900">
                                ৳{rnt.rent_amount.toLocaleString('en-BD')} / মাস
                              </span>
                              <span className="text-[11px] text-slate-500 ml-2">
                                ({rnt.bedrooms} Bed, {rnt.bathrooms} Bath • {rnt.plot_number})
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              rnt.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {rnt.status.toUpperCase()}
                            </span>
                          </div>

                          <p className="text-slate-600 line-clamp-2">{rnt.description}</p>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                            <button
                              onClick={() => updateRentalStatus(rnt.id, rnt.status === 'active' ? 'rented' : 'active')}
                              className="text-blue-700 hover:underline font-semibold"
                            >
                              {rnt.status === 'active' ? 'ভাড়া সম্পন্ন হিসেবে চিহ্নিত করুন' : 'পুনরায় সক্রিয় করুন'}
                            </button>
                            <button
                              onClick={() => deleteRentalListing(rnt.id)}
                              className="text-rose-600 hover:text-rose-800 p-1 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>মুছুন</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MOSQUE DONATIONS */}
        {dashboardTab === 'donations' && (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-2xs text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">মসজিদ উন্নয়ন তহবিল শীঘ্রই চালু হবে</h2>
            <p className="text-sm text-slate-500">
              মসজিদের অনলাইন ডোনেশন ও রসিদ সিস্টেমের কারিগরি উন্নয়ন চলমান রয়েছে। 
              শীঘ্রই আপনারা এই ড্যাশবোর্ড থেকে நேரடியாக অনুদান প্রদান এবং ডিজিটাল রসিদ সংগ্রহ করতে পারবেন।
            </p>
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Coming Soon
            </div>
          </div>
        )}

        {/* TAB 6: DIGITAL PROFILE & ID CARD */}
        {/* TAB: PROFILE & DIGITAL VOTER ID CARD */}
        {dashboardTab === 'profile' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ভেরিফাইড ডিজিটাল পরিচয়পত্র (Official Smart Card)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  সোসাইটি সদস্য পরিচয়পত্র (Member ID Card)
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  এই কার্ডটি আপনার সোসাইটি সদস্যপদ ও নির্বাচনে ভোটাধিকারের আনুষ্ঠানিক পরিচয় বহন করে। সরাসরি প্রিন্ট বা PDF হিসেবে সংরক্ষণ করুন।
                </p>
              </div>

              {/* Printable Card Area - Double Sided */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                {/* FRONT SIDE */}
                <div className="bg-gradient-to-br from-[#1e3a5f] via-[#162e4c] to-slate-900 text-white rounded-3xl p-6 shadow-xl border-2 border-amber-400/50 space-y-4 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex justify-between items-start pb-3 border-b border-white/15 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/logo.png"
                        alt="BGC Seal"
                        className="w-8 h-8 rounded-full object-contain bg-white p-0.5 shrink-0"
                      />
                      <div>
                        <h4 className="font-extrabold text-sm text-white tracking-wide">Bikrampur Garden City</h4>
                        <span className="text-[10px] text-blue-200">Residential Society • Dholaipar</span>
                      </div>
                    </div>
                    <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-2xs">
                      MEMBER 2026
                    </span>
                  </div>

                  <div className="flex gap-4 items-center relative z-10">
                    <div className="w-20 h-24 rounded-2xl bg-slate-800 border-2 border-white/40 overflow-hidden shrink-0 shadow-md">
                      <img
                        src={currentVoter.bill_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt="Voter Portrait"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="font-mono text-emerald-300 font-black text-sm tracking-wider">{currentVoter.voter_id}</div>
                      <div className="font-bold text-sm text-white">{currentVoter.name_en}</div>
                      <div className="text-slate-200 text-xs font-medium">{currentVoter.name_bn}</div>
                      <div className="text-[10px] text-slate-300 capitalize pt-0.5">
                        {currentVoter.resident_type.replace('_', ' ')}
                      </div>
                      <div className="text-[11px] text-amber-300 font-bold">
                        প্লট: {currentVoter.plot_number} {currentVoter.apartment_number ? `(${currentVoter.apartment_number})` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/15 flex justify-between items-center text-[10px] text-slate-300 relative z-10">
                    <span>442 Dholaipar, Dhaka</span>
                    <span className="font-mono text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                      ✓ ACTIVE MEMBER
                    </span>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border-2 border-slate-700 space-y-3.5 text-xs flex flex-col justify-between">
                  <div className="pb-2 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identity Terms & QR</span>
                    <QrCode className="w-5 h-5 text-slate-300" />
                  </div>

                  <div className="space-y-2 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">পিতার নাম:</span>
                      <span className="font-semibold text-white">{currentVoter.father_name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">মোবাইল:</span>
                      <span className="font-mono font-semibold text-white">{currentVoter.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">জাতীয় পরিচয়পত্র (NID):</span>
                      <span className="font-mono font-semibold text-white">{currentVoter.nid_number || 'যাচাইকৃত'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">অনুমোদনের তারিখ:</span>
                      <span className="text-slate-200">{new Date(currentVoter.approved_at || currentVoter.created_at).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-end text-[9px] text-slate-400">
                    <div>
                      <div className="font-serif italic text-amber-300 text-[11px]">Chief Election Commissioner</div>
                      <div>অনুমোদিত কর্মকর্তা স্বাক্ষর</div>
                    </div>
                    <img
                      src="/logo.png"
                      alt="Official Seal"
                      className="w-10 h-10 rounded-full object-contain bg-white/20 p-0.5 shrink-0 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (!printWindow) return;
                    printWindow.document.write(`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>BGC Member ID Card - ${currentVoter.voter_id}</title>
                          <style>
                            body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; padding: 30px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
                            .card-wrapper { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
                            .card { width: 330px; height: 210px; border-radius: 16px; padding: 18px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.15); page-break-inside: avoid; }
                            .card-front { background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); color: white; border: 2px solid #f59e0b; }
                            .card-back { background: #0f172a; color: #f8fafc; border: 2px solid #334155; }
                            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 6px; }
                            .header h4 { margin: 0; font-size: 13px; font-weight: 800; }
                            .header span { font-size: 9px; color: #93c5fd; }
                            .badge { background: #f59e0b; color: #000; font-weight: 900; font-size: 8px; padding: 2px 6px; border-radius: 4px; }
                            .body { display: flex; gap: 12px; align-items: center; }
                            .photo { width: 65px; height: 80px; border-radius: 8px; border: 2px solid white; object-fit: cover; background: #334155; }
                            .info { font-size: 10px; line-height: 1.35; }
                            .voter-id { font-family: monospace; font-size: 12px; font-weight: bold; color: #6ee7b7; letter-spacing: 0.5px; }
                            .name-en { font-size: 12px; font-weight: bold; color: white; }
                            .name-bn { color: #cbd5e1; font-size: 10px; }
                            .footer { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 6px; font-size: 8px; color: #94a3b8; }
                            .seal-img { width: 36px; height: 36px; border-radius: 50%; object-fit: contain; }
                            @media print { body { background: white; padding: 0; } }
                          </style>
                        </head>
                        <body>
                          <div class="card-wrapper">
                            <!-- FRONT -->
                            <div class="card card-front">
                              <div class="header">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                  <img src="/logo.png" style="width: 24px; height: 24px; border-radius: 50%; object-fit: contain; background: white; padding: 1px;" />
                                  <div>
                                    <h4>Bikrampur Garden City</h4>
                                    <span>Residential Society • Dholaipar</span>
                                  </div>
                                </div>
                                <span class="badge">MEMBER 2026</span>
                              </div>
                              <div class="body">
                                <img class="photo" src="${currentVoter.bill_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" />
                                <div class="info">
                                  <div class="voter-id">${currentVoter.voter_id}</div>
                                  <div class="name-en">${currentVoter.name_en}</div>
                                  <div class="name-bn">${currentVoter.name_bn}</div>
                                  <div style="color: #cbd5e1; text-transform: capitalize;">${currentVoter.resident_type.replace('_', ' ')}</div>
                                  <div style="color: #fde047; font-weight: bold;">প্লট: ${currentVoter.plot_number} ${currentVoter.apartment_number ? `(${currentVoter.apartment_number})` : ''}</div>
                                </div>
                              </div>
                              <div class="footer">
                                <span>442 Dholaipar, Dhaka</span>
                                <span style="color: #6ee7b7; font-weight: bold;">✓ ACTIVE MEMBER</span>
                              </div>
                            </div>

                            <!-- BACK -->
                            <div class="card card-back">
                              <div class="header">
                                <span style="font-size: 8px; color: #94a3b8; text-transform: uppercase;">Official Verification Details</span>
                                <span style="font-size: 8px; font-weight: bold; color: #cbd5e1;">BGC-VERIFIED</span>
                              </div>
                              <div style="font-size: 9px; line-height: 1.6; color: #cbd5e1;">
                                <div><strong>পিতার নাম:</strong> ${currentVoter.father_name || 'N/A'}</div>
                                <div><strong>মোবাইল:</strong> ${currentVoter.phone}</div>
                                <div><strong>এনআইডি:</strong> ${currentVoter.nid_number || 'যাচাইকৃত'}</div>
                                <div><strong>ইস্যু তারিখ:</strong> ${new Date(currentVoter.approved_at || currentVoter.created_at).toLocaleDateString('bn-BD')}</div>
                              </div>
                              <div class="footer" style="align-items: flex-end;">
                                <div>
                                  <div style="font-style: italic; color: #fde047; font-size: 9px;">Chief Election Commissioner</div>
                                  <div>অনুমোদিত কর্মকর্তা স্বাক্ষর</div>
                                </div>
                                <img src="/logo.png" class="seal-img" />
                              </div>
                            </div>
                          </div>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => {
                      printWindow.print();
                    }, 250);
                  }}
                  className="px-6 py-2.5 bg-[#1e3a5f] hover:bg-[#152943] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>আইডি কার্ড প্রিন্ট / PDF সংরক্ষণ করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
