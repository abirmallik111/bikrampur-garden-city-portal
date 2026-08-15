import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmailNotificationDrawer } from './components/EmailNotificationDrawer';
import { TopLoadingBar } from './components/TopLoadingBar';
import { PagePreloader } from './components/PagePreloader';
import { ToastContainer } from './components/Toast';

// Views
import { LandingPage } from './views/LandingPage';
import { VoterRegisterPage } from './views/VoterRegisterPage';
import { ApplicationStatusPage } from './views/ApplicationStatusPage';
import { VoterLoginPage } from './views/VoterLoginPage';
import { VoterDashboard } from './views/VoterDashboard';
import { ElectionsPage } from './views/ElectionsPage';
import { ElectionVotingPage } from './views/ElectionVotingPage';
import { RentalsPage } from './views/RentalsPage';
import { NoticesPage } from './views/NoticesPage';
import { SocietyDirectoryPage } from './views/SocietyDirectoryPage';
import { AdminPanel } from './views/AdminPanel';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#faf8ff] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-xl space-y-4 text-left">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl font-bold">
              ⚠️
            </div>
            <h2 className="text-lg font-bold text-slate-900 text-center">একটি অপ্রত্যাশিত ত্রুটি ঘটেছে</h2>
            <div className="p-3 bg-red-50 text-red-800 rounded-lg text-xs font-mono overflow-auto max-h-48 whitespace-pre-wrap">
              <strong>Error:</strong> {this.state.error?.message || 'Unknown error'}
              {'\n\n'}
              <strong>Stack:</strong> {this.state.error?.stack}
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="w-full py-2.5 bg-[#064e3b] hover:bg-[#003527] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer text-center"
            >
              ক্যাশ ও স্টোরেজ রিসেট করে রিলোড করুন
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const {
    currentView,
    isPageLoading,
    isInitialLoading,
    toasts,
    dismissToast
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] font-sans antialiased selection:bg-[#064e3b] selection:text-white">
      {/* Top Loading Progress Bar */}
      <TopLoadingBar isLoading={isPageLoading} />

      {/* Initial App Load Preloader */}
      {isInitialLoading && <PagePreloader />}

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'register' ? (
          <VoterRegisterPage />
        ) : currentView === 'status' ? (
          <ApplicationStatusPage />
        ) : currentView === 'login' ? (
          <VoterLoginPage />
        ) : currentView === 'dashboard' ? (
          <VoterDashboard />
        ) : currentView === 'elections' ? (
          <ElectionsPage />
        ) : currentView === 'election-vote' ? (
          <ElectionVotingPage />
        ) : currentView === 'rentals' ? (
          <RentalsPage />
        ) : currentView === 'notices' ? (
          <NoticesPage />
        ) : currentView === 'directory' ? (
          <SocietyDirectoryPage />
        ) : currentView === 'admin' ? (
          <AdminPanel />
        ) : (
          <LandingPage />
        )}
      </main>

      {/* Footer with Emergency Hotline info */}
      <Footer />

      {/* Modern Floating Toast Notification System */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Automated Real-time Transactional Email Simulation Drawer */}
      <EmailNotificationDrawer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
