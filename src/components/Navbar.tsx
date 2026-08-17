import React, { useState } from 'react';
import { useApp, ViewRoute } from '../context/AppContext';
import {
  Vote,
  FileCheck2,
  Building,
  Building2,
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
              বিক্রমপুর গার্ডেন সিটি (আবাসিক সোসাইটি)
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">৪৪২ ধোলাইরপাড়, ঢাকা-মাওয়া হাইওয়ে</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <PhoneCall className="w-3 h-3" />
            <span className="font-mono font-semibold">হটলাইন: 01711-000001</span>
          </div>
        </div>

        {/* Live election alert */}
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
        </div>
      </div>

      {/* Main Brand & Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Society Brand */}
          <div
            id="brand-logo-btn"
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none py-1"
          >
            <div className="relative">
              <img
                src="/logo.png"
                alt="Bikrampur Garden City Logo"
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-contain shrink-0 bg-white p-0.5 ring-2 ring-[#064e3b]/25 shadow-sm transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[#131b2e] font-black text-base sm:text-lg tracking-tight leading-tight">
                  Bikrampur Garden City
                </span>
                <span className="hidden md:inline-block text-[10px] bg-[#eaedff] text-[#064e3b] font-bold px-2 py-0.5 rounded-full">
                  Dholaipar
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#064e3b] tracking-wide hidden sm:block">
                বিক্রমপুর গার্ডেন সিটি সোসাইটি • ৪৪২ ধোলাইরপাড়
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Centered clean typography) */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('landing')}
              className={`transition-colors cursor-pointer py-1 ${
                currentView === 'landing'
                  ? 'text-[#064e3b] font-bold border-b-2 border-[#064e3b]'
                  : 'text-[#404944] hover:text-[#131b2e]'
              }`}
            >
              Home
            </button>

            <button
              id="nav-election-btn"
              onClick={() => navigateTo('elections')}
              className={`transition-colors flex items-center space-x-1.5 cursor-pointer py-1 ${
                currentView === 'elections' || currentView === 'election-vote'
                  ? 'text-[#064e3b] font-bold border-b-2 border-[#064e3b]'
                  : 'text-[#404944] hover:text-[#131b2e]'
              }`}
            >
              <span>Election</span>
              {activeElection && (
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse"></span>
              )}
            </button>

            <button
              id="nav-rentals-btn"
              onClick={() => navigateTo('rentals')}
              className={`transition-colors cursor-pointer py-1 ${
                currentView === 'rentals'
                  ? 'text-[#064e3b] font-bold border-b-2 border-[#064e3b]'
                  : 'text-[#404944] hover:text-[#131b2e]'
              }`}
            >
              Rentals
            </button>

            <button
              id="nav-directory-btn"
              onClick={() => navigateTo('directory')}
              className={`transition-colors cursor-pointer py-1 ${
                currentView === 'directory'
                  ? 'text-[#064e3b] font-bold border-b-2 border-[#064e3b]'
                  : 'text-[#404944] hover:text-[#131b2e]'
              }`}
            >
              Directory
            </button>
          </nav>

          {/* Right Status / Auth CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
                {currentUser.role === 'super_admin' || currentUser.role === 'admin' ? (
                  <button
                    id="admin-dashboard-btn"
                    onClick={() => navigateTo('admin')}
                    className="flex items-center space-x-1.5 bg-[#064e3b] hover:bg-[#003527] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-[#64f9bc]" />
                    <span>এডমিন প্যানেল</span>
                    {pendingAppsCount > 0 && (
                      <span className="bg-[#64f9bc] text-[#003527] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {pendingAppsCount}
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    id="voter-dashboard-btn"
                    onClick={() => navigateTo('dashboard')}
                    className="flex items-center gap-2.5 bg-[#064e3b] hover:bg-[#003527] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#003527] text-[#64f9bc] flex items-center justify-center text-[10px] font-bold">
                      {getUserInitials()}
                    </div>
                    <div className="text-left leading-tight">
                      <div className="font-bold text-white">{currentUser.name.split(' ')[0]}</div>
                    </div>
                  </button>
                )}

                <button
                  id="logout-btn"
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                  title="লগআউট (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="login-btn"
                onClick={() => navigateTo('login')}
                className="flex items-center space-x-2 bg-[#064e3b] hover:bg-[#003527] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Member Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            {currentUser ? (
              <button
                onClick={() => navigateTo(currentUser.role === 'admin' || currentUser.role === 'super_admin' ? 'admin' : 'dashboard')}
                className="text-[11px] bg-[#064e3b] text-white font-bold px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{currentUser.role === 'admin' || currentUser.role === 'super_admin' ? 'এডমিন' : 'ড্যাশবোর্ড'}</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="text-[11px] bg-[#064e3b] text-white font-bold px-3 py-1.5 rounded-lg shadow-xs cursor-pointer"
              >
                লগইন
              </button>
            )}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          {/* Quick Hotline on Mobile */}
          <div className="flex items-center justify-between p-2.5 bg-slate-900 text-slate-200 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono font-semibold">হটলাইন: 01711-000001</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">২৪/৭ সেবা</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => navigateTo('landing')}
              className={`flex items-center gap-2 p-3 rounded-xl font-semibold text-left transition-colors cursor-pointer ${
                currentView === 'landing' ? 'bg-[#064e3b] text-white font-bold' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>হোম (Home)</span>
            </button>

            <button
              onClick={() => navigateTo('elections')}
              className={`flex items-center gap-2 p-3 rounded-xl font-semibold text-left transition-colors cursor-pointer ${
                currentView === 'elections' || currentView === 'election-vote' ? 'bg-emerald-600 text-white font-bold' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <Vote className="w-4 h-4 text-emerald-600" />
              <span className="flex-1">নির্বাচন ২০২৬</span>
              {activeElection && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
            </button>

            <button
              onClick={() => navigateTo('rentals')}
              className={`flex items-center gap-2 p-3 rounded-xl font-semibold text-left transition-colors cursor-pointer ${
                currentView === 'rentals' ? 'bg-[#064e3b] text-white font-bold' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>ফ্ল্যাট ভাড়া (Rentals)</span>
            </button>

            <button
              onClick={() => navigateTo('notices')}
              className={`flex items-center gap-2 p-3 rounded-xl font-semibold text-left transition-colors cursor-pointer ${
                currentView === 'notices' ? 'bg-[#064e3b] text-white font-bold' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>নোটিশ বোর্ড (Notices)</span>
            </button>

            <button
              onClick={() => navigateTo('directory')}
              className={`flex items-center gap-2 p-3 rounded-xl font-semibold text-left col-span-2 transition-colors cursor-pointer ${
                currentView === 'directory' ? 'bg-[#064e3b] text-white font-bold' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-slate-600" />
              <span>কমিটি ডিরেক্টরি ও ২০টি গঠনতান্ত্রিক ধারা</span>
            </button>

            <button
              onClick={() => navigateTo('status')}
              className={`flex items-center gap-2 p-2.5 rounded-xl text-[11px] font-semibold text-left transition-colors cursor-pointer ${
                currentView === 'status' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>আবেদন ট্র্যাকিং</span>
            </button>

            <button
              onClick={() => navigateTo('register')}
              className={`flex items-center gap-2 p-2.5 rounded-xl text-[11px] font-semibold text-left transition-colors cursor-pointer ${
                currentView === 'register' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>সদস্যপদ আবেদন</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin' || currentUser.role === 'super_admin') {
                      navigateTo('admin');
                    } else {
                      navigateTo('dashboard');
                    }
                  }}
                  className="w-full py-3 bg-[#064e3b] hover:bg-[#003527] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-300" />
                  <span>
                    {currentUser.role === 'admin' || currentUser.role === 'super_admin' ? 'এডমিন ড্যাশবোর্ড' : 'আমার সদস্য ড্যাশবোর্ড'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>লগআউট করুন ({currentUser.name.split(' ')[0]})</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="py-3 bg-[#064e3b] hover:bg-[#003527] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>সদস্য লগইন</span>
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>নতুন সদস্য নিবন্ধন</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
