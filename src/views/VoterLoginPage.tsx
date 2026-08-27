import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Mail,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const VoterLoginPage: React.FC = () => {
  const { currentUser, loginAsMember, loginAsAdmin, setCurrentView } = useApp();

  // If already logged in, redirect immediately to dashboard or admin panel
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin' || currentUser.role === 'super_admin') {
        setCurrentView('admin', true);
      } else {
        setCurrentView('dashboard', true);
      }
    }
  }, [currentUser]);

  const [loginRole, setLoginRole] = useState<'member' | 'admin'>('member');

  // Member login state (Phone OR Email + Password)
  const [memberIdentifier, setMemberIdentifier] = useState('');
  const [memberPassword, setMemberPassword] = useState('');
  const [showMemberPassword, setShowMemberPassword] = useState(false);

  // Admin login state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!memberIdentifier.trim()) {
      setError('মোবাইল নম্বর, ইমেইল অথবা সদস্য আইডি প্রদান করুন');
      return;
    }
    if (!memberPassword.trim()) {
      setError('আপনার অ্যাকাউন্টের পাসওয়ার্ড লিখুন');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = loginAsMember(memberIdentifier, memberPassword);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 350);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setError('এডমিন ইমেইল ও পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = loginAsAdmin(adminEmail, adminPassword);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 350);
  };

  if (currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">আপনি ইতোমধ্যে লগইন আছেন</h2>
          <p className="text-xs text-slate-600">
            স্বাগতম <strong>{currentUser.name}</strong>। আপনাকে সরাসরি আপনার ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...
          </p>
          <button
            onClick={() => setCurrentView(currentUser.role === 'admin' || currentUser.role === 'super_admin' ? 'admin' : 'dashboard')}
            className="w-full py-3 bg-[#064e3b] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>ড্যাশবোর্ডে প্রবেশ করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <img
            src="/logo.png"
            alt="Bikrampur Garden City Society"
            className="w-20 h-20 mx-auto object-contain drop-shadow-md mb-2 rounded-full bg-slate-50 p-1 border border-emerald-100"
          />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            সোসাইটি পোর্টাল লগইন
          </h1>
          <p className="text-xs text-slate-500">
            {loginRole === 'member'
              ? 'সদস্য পোর্টাল — আইডি কার্ড, ভাড়া বিজ্ঞাপন, অভিযোগ ও ডিজিটাল সেবা'
              : 'সোসাইটি পরিচালনা পরিষদ ও নির্বাচন কমিশন কেন্দ্রীয় প্যানেল'}
          </p>
        </div>

        {/* Tab Switcher: Member Login vs Admin Login */}
        <div className="flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setLoginRole('member'); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              loginRole === 'member'
                ? 'bg-[#064e3b] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>সদস্য লগইন (Member)</span>
          </button>
          <button
            type="button"
            onClick={() => { setLoginRole('admin'); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              loginRole === 'admin'
                ? 'bg-slate-900 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>এডমিন লগইন (Admin)</span>
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

        {loginRole === 'member' ? (
          /* Member Login Form: Email OR Phone + Password */
          <form onSubmit={handleMemberLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ইমেইল অথবা মোবাইল নম্বর (বা সদস্য আইডি)
              </label>
              <div className="relative">
                <input
                  id="member-login-input"
                  type="text"
                  value={memberIdentifier}
                  onChange={e => setMemberIdentifier(e.target.value)}
                  placeholder="01XXXXXXXXX অথবা member@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                আবেদনের সময় দেওয়া মোবাইল নম্বর অথবা ইমেইল যেকোনো একটি ব্যবহার করতে পারেন।
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  পাসওয়ার্ড (Password)
                </label>
              </div>
              <div className="relative">
                <input
                  id="member-password-input"
                  type={showMemberPassword ? 'text' : 'password'}
                  value={memberPassword}
                  onChange={e => setMemberPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowMemberPassword(!showMemberPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showMemberPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="member-login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#064e3b] hover:bg-[#003527] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>সদস্য অ্যাকাউন্টে লগইন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center border-t border-slate-100">
              <p className="text-xs text-slate-500">
                এখনও সদস্যপদ আবেদন করেননি?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentView('register')}
                  className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline cursor-pointer"
                >
                  সদস্যপদ আবেদন করুন →
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* Admin Login Form: Email + Password */
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                এডমিন ইমেইল (Admin Email)
              </label>
              <div className="relative">
                <input
                  id="admin-email-input"
                  type="text"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                এডমিন পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showAdminPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-xl border border-slate-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>এডমিন প্যানেলে প্রবেশ করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
