import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getMemberPhoto } from '../utils/avatar';
import {
  Vote,
  Trophy,
  Users,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  BarChart3,
  Award,
  Crown
} from 'lucide-react';

export const ElectionsPage: React.FC = () => {
  const {
    elections,
    selectedElectionId,
    setSelectedElectionId,
    setCurrentView,
    currentUser,
    currentVoter,
    voters,
    votes,
    hasVoterVotedInElection
  } = useApp();

  const [activeTab, setActiveTab] = useState<'candidates' | 'results' | 'schedule'>('candidates');
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<Candidate | null>(null);

  const currentElection = elections.find(e => e.id === selectedElectionId) || elections[0];
  const isVotingLive = currentElection?.status === 'voting';
  const hasVoted = currentElection && currentVoter ? hasVoterVotedInElection(currentElection.id, currentVoter.id) : false;

  // Real-time dynamic stats
  const totalEligibleMembers = voters.filter(v => v.is_active).length;
  const votedMembersCount = currentElection 
    ? new Set(votes.filter(v => v.election_id === currentElection.id).map(v => v.voter_id)).size 
    : 0;
  const turnoutPercent = totalEligibleMembers > 0 
    ? ((votedMembersCount / totalEligibleMembers) * 100).toFixed(1) 
    : '0.0';
  const pendingMembersCount = Math.max(0, totalEligibleMembers - votedMembersCount);

  // Calculate total votes cast in this election
  const totalVotesAcrossCandidates = currentElection
    ? votes.filter(v => v.election_id === currentElection.id).length ||
      currentElection.candidates.reduce((sum, c) => sum + (c.vote_count || 0), 0)
    : 0;

  if (!currentElection) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
          <Vote className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">বর্তমানে কোনো নির্বাচন সক্রিয় নেই</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          নির্বাচন কমিশন কর্তৃক নতুন নির্বাচনের তফসিল ঘোষণা করা হলে এখানে প্রার্থী তালিকা ও ডিজিটাল ব্যালট প্রদর্শিত হবে।
        </p>
        <button
          onClick={() => setCurrentView('landing')}
          className="px-5 py-2.5 bg-[#1e3a5f] text-white text-xs font-bold rounded-xl shadow-xs"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner - Professional Polish */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 sm:p-10 rounded-2xl shadow-sm space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4 flex-1">
            <img
              src="/logo.png"
              alt="Bikrampur Garden City Election Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain bg-white/10 p-1 shrink-0 drop-shadow-md hidden sm:block"
            />
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3.5 py-1 rounded-full text-xs font-semibold">
                <Vote className="w-4 h-4" />
                <span>
                  {isVotingLive ? 'ভোটগ্রহণ চলমান (Voting is Live!)' : 'নির্বাচন কেন্দ্র'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {currentElection?.title_bn || currentElection?.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {currentElection?.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-300" />
                  <span>১ আগস্ট ২০২৬ - ২৫ আগস্ট ২০২৬</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>সকাল ৮:০০ - বিকাল ৬:০০</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 text-center lg:text-right shrink-0 space-y-3">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              আপনার ভোটাধিকার প্রয়োগ করুন
            </div>

            {hasVoted ? (
              <div className="p-3 bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>আপনি সফলভাবে ভোট দিয়েছেন</span>
              </div>
            ) : isVotingLive ? (
              currentUser && currentVoter ? (
                <button
                  id="cast-vote-direct-btn"
                  onClick={() => {
                    setSelectedElectionId(currentElection.id);
                    setCurrentView('election-vote');
                  }}
                  className="w-full px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Vote className="w-5 h-5 text-slate-950" />
                  <span>ব্যালটে ভোট দিন (Vote Now)</span>
                </button>
              ) : (
                <button
                  id="login-to-vote-btn"
                  onClick={() => setCurrentView('login')}
                  className="w-full px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>লগইন করে ভোট দিন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            ) : (
              <div className="text-xs text-amber-200 bg-amber-500/20 p-2.5 rounded-lg">
                ভোটগ্রহণের তারিখ অচিরেই ঘোষণা করা হবে।
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Candidates vs Live Results with horizontal scroll */}
      <div className="flex overflow-x-auto no-scrollbar touch-scroll border-b border-slate-200">
        <div className="flex gap-2 text-xs sm:text-sm font-semibold pb-1">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'candidates'
                ? 'border-[#1e3a5f] text-[#1e3a5f] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>প্রার্থী ও প্রতীক তালিকা ({currentElection.candidates.length} জন)</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'results'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>ফলাফল ও লাইভ ভোট পরিসংখ্যান</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CANDIDATES LIST BY POSITION */}
      {activeTab === 'candidates' && (
        <div className="space-y-10">
          {currentElection.positions.map(pos => {
            const posCandidates = currentElection.candidates.filter(c => c.position_id === pos.id);

            return (
              <div key={pos.id} className="space-y-4">
                {/* Position Title */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#1e3a5f]"></div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {pos.position_name_bn} ({pos.position_name})
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    প্রতিদ্বন্দ্বী প্রার্থী: {posCandidates.length} জন
                  </span>
                </div>

                {/* Candidate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posCandidates.map(cand => (
                    <div
                      key={cand.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Photo */}
                        <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                          <img
                            src={getMemberPhoto(cand.photo_url)}
                            alt={cand.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Info */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="inline-block bg-amber-50 text-amber-900 border border-amber-300 font-bold px-2.5 py-0.5 rounded-lg text-xs">
                            প্রতীক: {cand.symbol}
                          </div>
                          <h3 className="font-extrabold text-base text-slate-900 truncate">
                            {cand.name_bn || cand.name}
                          </h3>
                          <div className="text-xs text-slate-500 font-medium">{cand.name}</div>
                          <div className="flex items-center gap-1 text-xs text-slate-600 pt-1 font-mono">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{cand.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio / Manifesto */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                        <strong className="block text-slate-900 mb-1 font-semibold">নির্বাচনী ইশতেহার ও অঙ্গীকার:</strong>
                        <span className="line-clamp-2">{cand.bio}</span>
                      </div>

                      {/* View Details CTA Button */}
                      <button
                        onClick={() => setSelectedCandidateModal(cand)}
                        className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>প্রার্থীর প্রোফাইল ও বিস্তারিত দেখুন (PP Photo)</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ELECTION RESULTS & LIVE BAR CHARTS */}
      {activeTab === 'results' && (
        <div className="space-y-8">
          {/* Turnout Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gradient-to-br from-slate-900 to-[#1e3a5f] text-white p-6 rounded-3xl shadow-lg">
            <div className="p-3 border-b sm:border-b-0 sm:border-r border-white/10 space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">মোট অনুমোদিত সদস্য</div>
              <div className="text-3xl font-extrabold text-white font-mono">
                {totalEligibleMembers}
              </div>
              <div className="text-[11px] text-slate-400">সোসাইটির নিবন্ধিত ভোটার সংখ্যা</div>
            </div>

            <div className="p-3 border-b sm:border-b-0 sm:border-r border-white/10 space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">ভোট প্রদান করেছেন</div>
              <div className="text-3xl font-extrabold text-emerald-300 font-mono">
                {votedMembersCount} <span className="text-xs text-slate-400 font-normal">/ {totalEligibleMembers} জন</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">বাকি আছেন: {pendingMembersCount} জন</div>
            </div>

            <div className="p-3 border-b sm:border-b-0 sm:border-r border-white/10 space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">ভোটার টার্নআউট</div>
              <div className="text-3xl font-extrabold text-blue-300 font-mono">
                {turnoutPercent}%
              </div>
              <div className="text-[11px] text-slate-400">সক্রিয় সদস্যদের অংশগ্রহণের হার</div>
            </div>

            <div className="p-3 space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">লাইভ ভোট ফিড</div>
              <div className="text-sm font-bold text-emerald-300 flex items-center gap-2 pt-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span>লাইভ গণনা সক্রিয়</span>
              </div>
              <div className="text-[11px] text-slate-400">ব্যালট জমা হওয়ামাত্র স্বয়ংক্রিয় আপডেট</div>
            </div>
          </div>

          {/* Position by position results breakdown */}
          <div className="space-y-8">
            {currentElection.positions.map(pos => {
              const posCandidates = currentElection.candidates
                .filter(c => c.position_id === pos.id)
                .sort((a, b) => b.vote_count - a.vote_count);

              const maxVotesInPos = Math.max(...posCandidates.map(c => c.vote_count), 1);
              const winner = posCandidates[0];

              return (
                <div key={pos.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {pos.position_name_bn} ({pos.position_name})
                      </h3>
                      <p className="text-xs text-slate-500">ভোট প্রাপ্তির রিয়েল-টাইম পরিসংখ্যান</p>
                    </div>

                    {winner && winner.vote_count > 0 && (
                      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs">
                        <Crown className="w-4 h-4 text-amber-500" />
                        <span>শীর্ষে: {winner.name_bn || winner.name} ({winner.vote_count} ভোট)</span>
                      </div>
                    )}
                  </div>

                  {/* Candidate Vote Bars */}
                  <div className="space-y-5">
                    {posCandidates.map((cand, idx) => {
                      const percentage = Math.round((cand.vote_count / maxVotesInPos) * 100);
                      const isLeading = idx === 0 && cand.vote_count > 0;

                      return (
                        <div key={cand.id} className="space-y-2">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              {isLeading && <Crown className="w-4 h-4 text-amber-500" />}
                              <span className="font-bold text-slate-900">
                                {cand.name_bn || cand.name}
                              </span>
                              <span className="text-slate-500">({cand.symbol})</span>
                            </div>
                            <div className="font-mono font-bold text-slate-900">
                              <span className="text-emerald-700 text-base">{cand.vote_count}</span> ভোট
                            </div>
                          </div>

                          {/* Bar */}
                          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isLeading
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
                              }`}
                              style={{ width: `${Math.max(5, percentage)}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Candidate Details Overlay Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            {/* Header & Close */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  প্রার্থী প্রোফাইল (Candidate Profile)
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {selectedCandidateModal.name_bn || selectedCandidateModal.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{selectedCandidateModal.name}</p>
              </div>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Photo & Key Metadata */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-slate-200">
                <img
                  src={getMemberPhoto(selectedCandidateModal.photo_url)}
                  alt={selectedCandidateModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2 text-xs text-slate-700 w-full">
                <div className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-3 py-1 rounded-xl inline-block text-xs">
                  প্রতীক (Symbol): {selectedCandidateModal.symbol}
                </div>

                {selectedCandidateModal.voter_id && (
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">সদস্য আইডি:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedCandidateModal.voter_id}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">যোগাযোগ নম্বর:</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedCandidateModal.phone}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500">স্ট্যাটাস:</span>
                  <span className="text-emerald-700 font-bold">✓ অনুমোদিত প্রার্থী</span>
                </div>
              </div>
            </div>

            {/* Manifesto / Bio */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">নির্বাচনী ইশতেহার ও প্রতিশ্রুতি:</h4>
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
                {selectedCandidateModal.bio || 'সোসাইটির সামগ্রিক উন্নয়ন ও নিরাপত্তার লক্ষ্যে নিবেদিত।'}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs"
              >
                বন্ধ করুন
              </button>
              {isVotingLive && (
                <button
                  onClick={() => {
                    setSelectedCandidateModal(null);
                    setSelectedElectionId(currentElection.id);
                    setCurrentView('election-vote');
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Vote className="w-4 h-4" />
                  <span>ভোট দিতে যান</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
