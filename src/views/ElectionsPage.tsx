import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
    hasVoterVotedInElection
  } = useApp();

  const [activeTab, setActiveTab] = useState<'candidates' | 'results' | 'schedule'>('candidates');

  const currentElection = elections.find(e => e.id === selectedElectionId) || elections[0];
  const isVotingLive = currentElection?.status === 'voting';
  const hasVoted = currentElection && currentVoter ? hasVoterVotedInElection(currentElection.id, currentVoter.id) : false;

  // Calculate total votes cast in this election
  const totalVotesAcrossCandidates = currentElection
    ? currentElection.candidates.reduce((sum, c) => sum + (c.vote_count || 0), 0)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner - Professional Polish */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 sm:p-10 rounded-2xl shadow-sm space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3.5 py-1 rounded-full text-xs font-semibold">
              <Vote className="w-4 h-4" />
              <span>
                {isVotingLive ? 'ভোটগ্রহণ চলমান (Voting is Live!)' : 'নির্বাচন ২০২৬ কেন্দ্র'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {currentElection?.title_bn || currentElection?.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {currentElection?.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>ভোটের সময়কাল: ১ আগস্ট ২০২৬ - ২৫ আগস্ট ২০২৬</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>ভোট শেষ: প্রতিদিন সকাল ৮:০০ - বিকাল ৬:০০</span>
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

      {/* Tabs Switcher: Candidates vs Live Results */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex gap-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
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
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'results'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>ফলাফল ও লাইভ ভোট পরিসংখ্যান (Results)</span>
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
                            src={cand.photo_url}
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
                        <span>{cand.bio}</span>
                      </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gradient-to-br from-slate-900 to-[#1e3a5f] text-white p-6 rounded-3xl shadow-lg">
            <div className="p-3 border-r border-white/10 space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">সর্বমোট গৃহীত ভোট</div>
              <div className="text-3xl font-extrabold text-emerald-300 font-mono">
                {totalVotesAcrossCandidates}
              </div>
              <div className="text-[11px] text-slate-400">সকল পদ মিলে মোট কাস্ট</div>
            </div>

            <div className="p-3 border-r border-white/10 space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">ভোটার টার্নআউট</div>
              <div className="text-3xl font-extrabold text-blue-300 font-mono">
                ৭৮.৪%
              </div>
              <div className="text-[11px] text-slate-400">সক্রিয় ভোটারদের সক্রিয় অংশগ্রহণ</div>
            </div>

            <div className="p-3 space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">ফলাফলের স্ট্যাটাস</div>
              <div className="text-lg font-bold text-amber-300 flex items-center gap-1.5 pt-1">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>রিয়েল-টাইম লাইভ কাউন্ট</span>
              </div>
              <div className="text-[11px] text-slate-400">ব্যালট দাখিল হওয়া মাত্রই স্বয়ংক্রিয় গণনা</div>
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
    </div>
  );
};
