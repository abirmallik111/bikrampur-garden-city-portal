import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  X,
  CheckCheck,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Inbox,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const EmailNotificationDrawer: React.FC = () => {
  const { activeEmailNotification, dismissEmailNotification, setCurrentView, setSelectedAppId } = useApp();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (activeEmailNotification) {
      // Auto-hide after 14 seconds if not interacted
      const timer = setTimeout(() => {
        dismissEmailNotification();
      }, 14000);
      return () => clearTimeout(timer);
    }
  }, [activeEmailNotification, dismissEmailNotification]);

  if (!activeEmailNotification) return null;

  const copyCode = () => {
    if (activeEmailNotification.code) {
      navigator.clipboard.writeText(activeEmailNotification.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      navigator.clipboard.writeText(activeEmailNotification.preview_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleActionClick = () => {
    if (activeEmailNotification.action_url) {
      if (activeEmailNotification.code && activeEmailNotification.type === 'registration_received') {
        setSelectedAppId(activeEmailNotification.code);
      }
      setCurrentView(activeEmailNotification.action_url as any);
      dismissEmailNotification();
    }
  };

  return (
    <div
      id="email-notification-banner"
      className="fixed bottom-5 right-5 z-50 max-w-lg w-full animate-in slide-in-from-bottom-5 duration-300 shadow-2xl rounded-2xl bg-slate-900 border border-slate-700 text-white overflow-hidden"
    >
      {/* Top Header simulating SMTP Email Server Delivery */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <img
            src="/logo.png"
            alt="BGC Logo"
            className="w-7 h-7 rounded-full object-contain shrink-0 bg-white p-0.5 drop-shadow-xs"
          />
          <div>
            <div className="text-xs font-bold tracking-wide flex items-center gap-1.5 text-white">
              <span>BGC Automated Email Dispatch</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-[10px] text-emerald-100/80 font-mono">
              From: {activeEmailNotification.from_email}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] text-emerald-100 bg-emerald-900/60 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
            Delivered
          </span>
          <button
            id="dismiss-email-btn"
            onClick={dismissEmailNotification}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Email Header Info */}
      <div className="p-4 space-y-3 bg-slate-900/95 text-xs">
        <div className="space-y-1.5 border-b border-slate-800 pb-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="text-slate-400 font-semibold">To:</span>
              <span className="font-semibold text-white">{activeEmailNotification.to_name}</span>
              <span className="font-mono text-emerald-400 text-[11px]">&lt;{activeEmailNotification.to_email}&gt;</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold bg-slate-800 px-2 py-0.5 rounded">
              {activeEmailNotification.type.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="font-bold text-sm text-slate-100 leading-snug">
            {activeEmailNotification.subject}
          </div>
        </div>

        {/* Highlight Code Box (OTP / Voter ID / Tracking ID) */}
        {activeEmailNotification.code && (
          <div className="flex items-center justify-between p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                {activeEmailNotification.type === 'otp'
                  ? 'Verification OTP Code'
                  : activeEmailNotification.type === 'application_approved'
                  ? 'Official Voter ID'
                  : activeEmailNotification.type === 'vote_confirmation'
                  ? 'Digital Voting Security Hash'
                  : 'Application Tracking ID'}
              </span>
              <span className="font-mono text-lg font-black text-emerald-300 tracking-wider">
                {activeEmailNotification.code}
              </span>
            </div>
            <button
              id="copy-email-code-btn"
              onClick={copyCode}
              className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Email Message Preview / Body */}
        {expanded ? (
          <div
            className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 font-sans text-xs leading-relaxed text-slate-200 overflow-y-auto max-h-48"
            dangerouslySetInnerHTML={{ __html: activeEmailNotification.html_body }}
          />
        ) : (
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 font-sans text-xs leading-relaxed text-slate-300">
            {activeEmailNotification.preview_text}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>সঙ্কুচিত করুন</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>সম্পূর্ণ ইমেইল ভিউ</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {activeEmailNotification.action_label && (
              <button
                id="email-action-link-btn"
                onClick={handleActionClick}
                className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
              >
                <span>{activeEmailNotification.action_label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
