import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  KeyRound,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Mail,
  Lock,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const VoterLoginPage: React.FC = () => {
  const { requestLoginOTP, loginAsVoterWithOTP, loginAsAdmin, setCurrentView } = useApp();

  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');
  const [identifier, setIdentifier] = useState('');
  const [targetEmail, setTargetEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Admin login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier.trim()) {
      setError('মোবাইল নম্বর বা নিবন্ধিত ইমেইল ঠিকানা প্রদান করুন');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = requestLoginOTP(identifier);
      setLoading(false);
      if (res.success) {
        setOtpSent(true);
        setTargetEmail(res.targetEmail || null);
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!otp.trim()) {
      setError('৬ ডিজিটের OTP কোড লিখুন');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = loginAsVoterWithOTP(identifier, otp);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 400);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('এডমিন ইমেইল ও পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = loginAsAdmin(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 400);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <img
            src="/logo-full.png"
            alt="Bikrampur Garden City Society"
            className="w-36 sm:w-44 mx-auto object-contain drop-shadow-md mb-2"
          />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            সোসাইটি সদস্য লগইন (Member Login)
          </h1>
          <p className="text-xs text-slate-500">
            সদস্য পোর্টাল — ভাড়া বিজ্ঞাপন, অভিযোগ, নোটিশ ও নির্বাচনী ব্যালট এক্সেস
          </p>
        </div>

        {/* Tab Switcher: OTP vs Password */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setLoginMethod('otp'); setError(null); }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              loginMethod === 'otp'
                ? 'bg-white text-[#1e3a5f] shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ✉️ সদস্য লগইন (Email OTP)
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod('password'); setError(null); }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              loginMethod === 'password'
                ? 'bg-white text-[#1e3a5f] shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🔑 এডমিন লগইন (Password)
          </button>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div>{error}</div>
            </div>
          </div>
        )}

        {loginMethod === 'otp' ? (
          !otpSent ? (
            /* Step 1: Enter Phone Number or Email */
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  নিবন্ধিত মোবাইল নম্বর বা ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <input
                    id="login-phone-input"
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="01XXXXXXXXX অথবা member@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>লগইন ওটিপি কোডটি আপনার নিবন্ধিত ইমেইলে পাঠানো হবে।</span>
                </p>
              </div>

              <button
                id="send-otp-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1e3a5f] hover:bg-[#152943] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>ইমেইলে ওটিপি কোড পাঠান</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Step 2: Enter OTP */
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-950 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-sky-700 font-semibold">
                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                    <span>ইমেইলে প্রেরিত ওটিপি:</span>
                  </div>
                  <span className="font-semibold font-mono block text-xs text-sky-900 mt-0.5">{targetEmail || identifier}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(''); }}
                  className="text-xs text-sky-800 font-bold underline cursor-pointer"
                >
                  পরিবর্তন
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ৬ ডিজিটের ওটিপি কোড লিখুন
                </label>
                <div className="relative">
                  <input
                    id="login-otp-input"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-base font-mono tracking-widest font-bold text-center focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                id="verify-otp-login-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>লগইন সম্পন্ন করুন</span>
                  </>
                )}
              </button>
            </form>
          )
        ) : (
          /* Email/Password Admin Login */
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                এডমিন ইমেইল ঠিকানা
              </label>
              <div className="relative">
                <input
                  id="login-email-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@bikrampurgardencity.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  id="login-password-input"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              id="admin-submit-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1e3a5f] hover:bg-[#152943] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>এডমিন প্যানেলে প্রবেশ করুন</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-slate-500">
          এখনও সদস্যপদ আবেদন করেননি?{' '}
          <button
            onClick={() => setCurrentView('register')}
            className="text-blue-700 font-bold hover:underline cursor-pointer"
          >
            এখানে আবেদন করুন
          </button>
        </div>
      </div>
    </div>
  );
};
