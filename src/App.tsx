import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmailNotificationDrawer } from './components/EmailNotificationDrawer';

// Views
import { LandingPage } from './views/LandingPage';
import { VoterRegisterPage } from './views/VoterRegisterPage';
import { ApplicationStatusPage } from './views/ApplicationStatusPage';
import { VoterLoginPage } from './views/VoterLoginPage';
import { VoterDashboard } from './views/VoterDashboard';
import { ElectionsPage } from './views/ElectionsPage';
import { ElectionVotingPage } from './views/ElectionVotingPage';
import { RentalsPage } from './views/RentalsPage';
import { MosqueDonationsPage } from './views/MosqueDonationsPage';
import { SocietyDirectoryPage } from './views/SocietyDirectoryPage';
import { AdminPanel } from './views/AdminPanel';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
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
        {currentView === 'mosque' && <MosqueDonationsPage />}
        {currentView === 'directory' && <SocietyDirectoryPage />}
        {currentView === 'admin' && <AdminPanel />}
      </main>

      {/* Footer with Emergency Hotline info */}
      <Footer />

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
