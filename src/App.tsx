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

const AppContent: React.FC = () => {
  const {
    currentView,
    isPageLoading,
    isInitialLoading,
    toasts,
    dismissToast
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Loading Progress Bar */}
      <TopLoadingBar isLoading={isPageLoading} />

      {/* Initial App Load Preloader */}
      {isInitialLoading && <PagePreloader />}

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'register' && <VoterRegisterPage />}
        {currentView === 'status' && <ApplicationStatusPage />}
        {currentView === 'login' && <VoterLoginPage />}
        {currentView === 'dashboard' && <VoterDashboard />}
        {currentView === 'elections' && <ElectionsPage />}
        {currentView === 'election-vote' && <ElectionVotingPage />}
        {currentView === 'rentals' && <RentalsPage />}
        {currentView === 'notices' && <NoticesPage />}
        {currentView === 'directory' && <SocietyDirectoryPage />}
        {currentView === 'admin' && <AdminPanel />}
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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
