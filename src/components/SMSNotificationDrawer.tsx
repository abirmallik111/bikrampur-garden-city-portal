import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Smartphone, CheckCheck, Copy, Check } from 'lucide-react';

export const SMSNotificationDrawer: React.FC = () => {
  const { activeSMSNotification, dismissSMSNotification } = useApp();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (activeSMSNotification) {
      const timer = setTimeout(() => {
        // Auto hide after 12 seconds
        dismissSMSNotification();
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [activeSMSNotification, dismissSMSNotification]);

  if (!activeSMSNotification) return null;

  const copyText = () => {
    navigator.clipboard.writeText(activeSMSNotification.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="sms-notification-banner"
      className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300 shadow-2xl rounded-2xl bg-slate-900 border border-slate-700 text-white overflow-hidden"
    >
      {/* Top Bar simulating Phone Push Notification */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-white/20 rounded-full">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
            <span>BGC-SMS Gateway (AdnSMS/SSL)</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-[10px] text-emerald-100 bg-emerald-800/50 px-2 py-0.5 rounded">
            Just now
          </span>
          <button
            id="dismiss-sms-btn"
            onClick={dismissSMSNotification}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded transition-colors"
            title="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 space-y-3 bg-slate-900/95">
        <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-emerald-300 font-semibold">{activeSMSNotification.phone}</span>
            <span className="text-slate-400">({activeSMSNotification.recipient_name})</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            {activeSMSNotification.type.replace('_', ' ')}
          </span>
        </div>

        {/* Message bubble */}
        <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700/80 font-sans text-sm leading-relaxed text-slate-100 selection:bg-emerald-500 selection:text-white">
          {activeSMSNotification.message}
        </div>

        {/* Action controls */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCheck className="w-4 h-4" />
            <span>Delivered via Bangladesh SMS Network</span>
          </div>
          <button
            id="copy-sms-btn"
            onClick={copyText}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy SMS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
