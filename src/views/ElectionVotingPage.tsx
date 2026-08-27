import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getMemberPhoto } from '../utils/avatar';
import {
  Vote,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lock,
  RotateCcw,
  Check
} from 'lucide-react';

export const ElectionVotingPage: React.FC = () => {
  const {
    elections,
    selectedElectionId,
    currentUser,
    currentVoter,
    castVote,
    hasVoterVotedInElection,
    setCurrentView,
    showToast
  } = useApp();

  const currentElection = elections.find(e => e.id === selectedElectionId) || elections[0];

  // Selections state: position_id -> candidate_id
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication & eligibility checks
  if (!currentUser || !currentVoter) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">ভোট দিতে লগইন করুন</h2>
        <p className="text-xs text-slate-500">
          ডিজিটাল ব্যালটে ভোট প্রদান করতে আপনার নিবন্ধিত ফোন নম্বর ও ওটিপি দিয়ে ভোটার অ্যাকাউন্টে প্রবেশ করুন।
        </p>
        <button
          onClick={() => setCurrentView('login')}
          className="px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded-xl text-xs"
        >
          ভোটার লগইন
        </button>
      </div>
    );
  }

  const alreadyVoted = currentElection ? hasVoterVotedInElection(currentElection.id, currentVoter.id) : false;

  if (alreadyVoted || voteSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              ভোটদান সফলভাবে সম্পন্ন হয়েছে
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ধন্যবাদ, আপনার ভোট সংরক্ষিত হয়েছে!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              ভোটার <span className="font-semibold text-slate-900">{currentVoter.name_en}</span> ({currentVoter.voter_id}), বিক্রমপুর গার্ডেন সিটি কার্যনির্বাহী পরিষদ নির্বাচনে আপনার মূল্যবান রায় এনক্রিপ্ট হয়ে সিস্টেমে নথিভুক্ত হয়েছে।
            </p>
          </div>

          {/* Privacy & Anti-Tamper Badge */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold flex items-center justify-center gap-1.5 text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>গোপনীয়তা ও দ্বৈত-ভোট নিরোধক সুরক্ষা (Privacy Assurance)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              একবার ভোট প্রদানের পর কোনো ব্যালট পরিবর্তন বা পুনঃভোট প্রদান করা সম্ভব নয়।
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setCurrentView('elections')}
              className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>লাইভ ফলাফল ও পরিসংখ্যান দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              ড্যাশবোর্ডে ফিরুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPositions = currentElection.positions.length;
  const selectedPositionsCount = Object.keys(selections).length;
  const isBallotComplete = selectedPositionsCount === totalPositions;

  const handleSelectCandidate = (positionId: string, candidateId: string) => {
    setSelections(prev => ({
      ...prev,
      [positionId]: candidateId
    }));
    setError(null);
  };

  const handleOpenConfirm = () => {
    if (!isBallotComplete) {
      setError(`দয়া করে সকল (${totalPositions}টি) পদে আপনার পছন্দের প্রার্থী নির্বাচন করুন। বাকি আছে: ${totalPositions - selectedPositionsCount}টি`);
      return;
    }
    setShowConfirmModal(true);
  };

  const handleFinalSubmitVote = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const res = castVote(currentElection.id, selections);
      setIsSubmitting(false);
      setShowConfirmModal(false);
      if (res.success) {
        setVoteSuccess(true);
        showToast('ভোট সফলভাবে গৃহীত হয়েছে। ধন্যবাদ!', 'success');
      } else {
        setError(res.message);
        showToast(res.message, 'error');
      }
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#1e3a5f] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt="Election Commission Seal"
              className="w-12 h-12 rounded-full object-contain bg-white p-0.5 shrink-0 drop-shadow-sm"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-0.5 rounded-full text-xs font-semibold">
                <Vote className="w-3.5 h-3.5" />
                <span>ডিজিটাল ব্যালট পেপার (Official Digital Ballot)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentElection.title}
              </h1>
              <p className="text-xs text-slate-300">
                ভোটার: <strong className="text-white">{currentVoter.name_en}</strong> • আইডি: <strong className="font-mono text-emerald-300">{currentVoter.voter_id}</strong>
              </p>
            </div>
          </div>

          {/* Completion Meter */}
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-right shrink-0 space-y-1">
            <div className="text-[11px] text-slate-300 font-semibold">
              ব্যালট পূরণ অগ্রগতি:
            </div>
            <div className="text-lg font-black text-emerald-300 font-mono">
              {selectedPositionsCount} / {totalPositions} পদ নির্বাচিত
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Ballot Positions */}
      <div className="space-y-8">
        {currentElection.positions.map((pos, idx) => {
          const posCandidates = currentElection.candidates.filter(c => c.position_id === pos.id);
          const currentSelectedCandId = selections[pos.id];

          return (
            <div
              key={pos.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm transition-all space-y-5 ${
                currentSelectedCandId ? 'border-emerald-300 ring-2 ring-emerald-50' : 'border-slate-200'
              }`}
            >
              {/* Position Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    currentSelectedCandId ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {pos.position_name_bn} ({pos.position_name})
                    </h2>
                    <p className="text-xs text-slate-500">যেকোনো একজন প্রার্থীকে ভোট দিতে ক্লিক করুন</p>
                  </div>
                </div>

                {currentSelectedCandId && (
                  <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>নির্বাচিত</span>
                  </span>
                )}
              </div>

              {/* Candidates Radio Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posCandidates.map(cand => {
                  const isSelected = currentSelectedCandId === cand.id;

                  return (
                    <button
                      key={cand.id}
                      type="button"
                      onClick={() => handleSelectCandidate(pos.id, cand.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-400/40'
                          : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {/* Photo */}
                      <div className="w-14 h-16 rounded-xl bg-slate-200 overflow-hidden relative shrink-0 border border-slate-300">
                        <img
                          src={getMemberPhoto(cand.photo_url)}
                          alt={cand.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {cand.symbol}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 truncate">
                          {cand.name_bn || cand.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate">{cand.name}</p>
                      </div>

                      {/* Check radio indicator */}
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Bottom Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600">
          {isBallotComplete ? (
            <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> সকল পদের প্রার্থী সফলভাবে বাছাই করা হয়েছে।
            </span>
          ) : (
            <span className="text-amber-700 font-medium">
              সবগুলো পদে প্রার্থী নির্বাচন শেষ করে ব্যালট দাখিল নিশ্চিত করুন।
            </span>
          )}
        </div>

        <button
          id="review-and-submit-vote-btn"
          type="button"
          onClick={handleOpenConfirm}
          disabled={!isBallotComplete}
          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Vote className="w-4 h-4" />
          <span>ভোট পর্যালোচনা ও চূড়ান্ত দাখিল (Review & Cast Vote)</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Vote className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">ভোট নিশ্চিতকরণ (Final Vote Confirmation)</h3>
              <p className="text-xs text-slate-500">আপনার নির্বাচিত প্রার্থীদের তালিকা পুনরায় দেখে নিন:</p>
            </div>

            {/* Selected Candidates Summary */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              {currentElection.positions.map(pos => {
                const selectedCandId = selections[pos.id];
                const cand = currentElection.candidates.find(c => c.id === selectedCandId);
                return (
                  <div key={pos.id} className="flex items-center justify-between py-1 border-b border-slate-200/60 last:border-0">
                    <span className="font-semibold text-slate-700">{pos.position_name_bn}:</span>
                    <span className="font-bold text-slate-950">
                      {cand?.name_bn || cand?.name} ({cand?.symbol})
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              ⚠️ <strong>সতর্কবার্তা:</strong> ভোট নিশ্চিত করার পর এটি অপরিবর্তনযোগ্য হবে এবং আপনার ভোট সম্পন্ন হিসেবে লক হয়ে যাবে।
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                সংশোধন করুন
              </button>

              <button
                id="confirm-cast-vote-btn"
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmitVote}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ভোট নিশ্চিত করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
