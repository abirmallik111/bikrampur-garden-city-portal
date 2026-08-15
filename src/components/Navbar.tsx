import React, { useState } from 'react';
import { useApp, ViewRoute } from '../context/AppContext';
import {
  Vote,
  FileCheck2,
  Building,
  HeartHandshake,
  Users,
  ShieldAlert,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Search,
  Sparkles,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    currentVoter,
    logout,
    setDemoPersona,
    elections,
    applications
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);

  const activeElection = elections.find(e => e.status === 'voting');
  const pendingAppsCount = applications.filter(a => a.status === 'pending').length;

  const navigateTo = (view: ViewRoute) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  // Get user initials for the avatar badge
  const getUserInitials = () => {
    if (currentUser?.name) {
      const parts = currentUser.name.split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return currentUser.name.slice(0, 2).toUpperCase();
    }
    return 'G';
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shrink-0 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 sm:px-8 py-1.5 hidden md:flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">
              বিক্রমপুর গার্ডেন সিটি (রাজউক অনুমোদিত আবাসিক সোসাইটি)
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া হাইওয়ে</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <PhoneCall className="w-3 h-3" />
            <span className="font-mono font-semibold">হটলাইন: 01711-000001</span>
          </div>
        </div>

        {/* Live election alert & Persona quick switch */}
        <div className="flex items-center space-x-3">
          {activeElection && (
            <button
              onClick={() => navigateTo('elections')}
              className="flex items-center space-x-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 transition-colors text-xs font-semibold cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬ চলমান</span>
            </button>
          )}

          {/* Persona Switcher dropdown */}
          <div className="relative">
            <button
              id="persona-switcher-btn"
              onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-md border border-slate-700 transition-colors text-xs font-medium cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>
                {currentUser
                  ? currentUser.role === 'super_admin' || currentUser.role === 'admin'
                    ? `এডমিন: ${currentUser.name.split(' ')[0]}`
                    : `ভোটার: ${currentUser.name.split(' ')[0]}`
                  : 'ডেমো পারসোনা (Switcher)'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {personaMenuOpen && (
              <div
                className="absolute right-0 mt-1.5 w-64 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setPersonaMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  সুইচ ডেমো রোল (Demo Switcher)
                </div>
                <button
                  id="persona-superadmin"
                  onClick={() => setDemoPersona('super-admin')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <div>
                    <div className="font-semibold text-slate-900">🛡️ সুপার এডমিন (Super Admin)</div>
                    <div className="text-[10px] text-slate-500">Md. Rafiqul Islam • EC Head</div>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded">Admin</span>
                </button>
                <button
                  id="persona-voter-owner"
                  onClick={() => setDemoPersona('voter-owner')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50/60 flex items-center justify-between text-slate-700"
                >
                  <div>
                    <div className="font-semibold text-emerald-950">🗳️ ভোটার - ফ্ল্যাট মালিক (Owner)</div>
                    <div className="text-[10px] text-emerald-700">Tariqul Islam • Plot A-12</div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Voter</span>
                </button>
                <button
                  id="persona-voter-tenant"
                  onClick={() => setDemoPersona('voter-tenant')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <div>
                    <div className="font-semibold text-slate-900">🏠 ভোটার - ভাড়াটিয়া (Tenant)</div>
                    <div className="text-[10px] text-slate-500">Tanvir Ahmed • Plot B-45</div>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">Tenant</span>
                </button>
                <button
                  id="persona-applicant"
                  onClick={() => setDemoPersona('applicant')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-amber-50/60 flex items-center justify-between text-slate-700"
                >
                  <div>
                    <div className="font-semibold text-amber-950">📄 আবেদনকারী (Pending Application)</div>
                    <div className="text-[10px] text-amber-700">Ariful Haque • Verification</div>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Pending</span>
                </button>
                <button
                  id="persona-visitor"
                  onClick={() => setDemoPersona('visitor')}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between text-slate-700 border-t border-slate-100"
                >
                  <div className="font-semibold text-slate-600">🌐 সাধারণ দর্শনার্থী (Public Visitor)</div>
                  <span className="text-[10px] text-slate-400">Guest</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand & Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Society Brand (Professional Polish emblem) */}
          <div
            id="brand-logo-btn"
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-slate-900 group-hover:bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-xs transition-colors shrink-0">
              <span>B</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-slate-900 font-bold text-base sm:text-lg leading-tight tracking-tight">
                  Bikrampur Garden City
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded border border-slate-200">
                  RAJUK
                </span>
              </div>
              <span className="text-slate-500 text-[11px] tracking-wider uppercase font-semibold">
                Society & Election Portal
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('landing')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'landing'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              হোম (Home)
            </button>

            <button
              id="nav-register-btn"
              onClick={() => navigateTo('register')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'register'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              ভোটার নিবন্ধন (Register)
            </button>

            <button
              id="nav-election-btn"
              onClick={() => navigateTo('elections')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer ${
                currentView === 'elections' || currentView === 'election-vote'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Vote className="w-4 h-4 text-emerald-600" />
              <span>নির্বাচন ২০২৬ (Election)</span>
              {activeElection && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>

            <button
              id="nav-rentals-btn"
              onClick={() => navigateTo('rentals')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'rentals'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              ভাড়া বিজ্ঞাপন (Rentals)
            </button>

            <button
              id="nav-mosque-btn"
              onClick={() => navigateTo('mosque')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'mosque'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              মসজিদ ফান্ড (Mosque)
            </button>

            <button
              id="nav-directory-btn"
              onClick={() => navigateTo('directory')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'directory'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              ডিরেক্টরি ও কমিটি
            </button>
          </nav>

          {/* Right Status / Auth CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* System Online Badge from Professional Polish */}
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold">System Online</span>
            </div>

            <button
              id="nav-status-btn"
              onClick={() => navigateTo('status')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>আবেদন অনুসন্ধান</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
                {currentUser.role === 'super_admin' || currentUser.role === 'admin' ? (
                  <button
                    id="admin-dashboard-btn"
                    onClick={() => navigateTo('admin')}
                    className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>এডমিন প্যানেল</span>
                    {pendingAppsCount > 0 && (
                      <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {pendingAppsCount}
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    id="voter-dashboard-btn"
                    onClick={() => navigateTo('dashboard')}
                    className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 text-[10px] font-bold">
                      {getUserInitials()}
                    </div>
                    <div className="text-left leading-tight">
                      <div className="font-bold text-white">{currentUser.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400">{currentUser.voterId || 'Resident'}</div>
                    </div>
                  </button>
                )}

                <button
                  id="logout-btn"
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="লগআউট (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="login-btn"
                onClick={() => navigateTo('login')}
                className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>ভোটার লগইন (Login)</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            {currentUser && (
              <button
                onClick={() => navigateTo(currentUser.role === 'admin' || currentUser.role === 'super_admin' ? 'admin' : 'dashboard')}
                className="text-xs bg-slate-900 text-white font-semibold px-2.5 py-1.5 rounded-lg"
              >
                {currentUser.role === 'admin' ? 'Admin' : 'Dashboard'}
              </button>
            )}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">ডেমো পারসোনা:</span>
            <div className="flex gap-1">
              <button
                onClick={() => { setDemoPersona('voter-owner'); setMobileMenuOpen(false); }}
                className="text-[11px] bg-emerald-50 text-emerald-800 font-medium px-2 py-1 rounded"
              >
                Voter
              </button>
              <button
                onClick={() => { setDemoPersona('super-admin'); setMobileMenuOpen(false); }}
                className="text-[11px] bg-slate-100 text-slate-800 font-medium px-2 py-1 rounded"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 font-medium text-left"
            >
              <span>হোম</span>
            </button>
            <button
              onClick={() => navigateTo('register')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 font-medium text-left"
            >
              <span>ভোটার নিবন্ধন</span>
            </button>
            <button
              onClick={() => navigateTo('elections')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 font-bold text-left col-span-2"
            >
              <Vote className="w-4 h-4 text-emerald-600" />
              <span>নির্বাচন ২০২৬ (ভোট কেন্দ্র)</span>
            </button>
            <button
              onClick={() => navigateTo('rentals')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 font-medium text-left"
            >
              <span>ফ্ল্যাট ভাড়া</span>
            </button>
            <button
              onClick={() => navigateTo('mosque')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 font-medium text-left"
            >
              <span>মসজিদ ফান্ড</span>
            </button>
            <button
              onClick={() => navigateTo('directory')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 font-medium text-left col-span-2"
            >
              <Users className="w-4 h-4 text-slate-600" />
              <span>কার্যনির্বাহী পরিষদ ও ডিরেক্টরি</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => navigateTo('status')}
              className="w-full text-center py-2 text-xs bg-slate-100 rounded-lg text-slate-700 font-medium"
            >
              🔍 আবেদন ট্র্যাকিং (Check Status)
            </button>
            {currentUser ? (
              <button
                onClick={() => {
                  if (currentUser.role === 'admin' || currentUser.role === 'super_admin') {
                    navigateTo('admin');
                  } else {
                    navigateTo('dashboard');
                  }
                }}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                আমার ড্যাশবোর্ড
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                লগইন করুন (Phone + OTP)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
