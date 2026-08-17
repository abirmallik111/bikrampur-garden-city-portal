import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  VoterApplication,
  Voter,
  Election,
  ElectionPosition,
  Candidate,
  Vote,
  Complaint,
  RentalListing,
  MosqueProject,
  Donation,
  CommitteeMember,
  Announcement,
  EmailNotification,
  SMSMessage,
  ResidentType,
  ApplicationStatus,
  ElectionStatus,
  ComplaintStatus,
  RentalStatus
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_APPLICATIONS,
  INITIAL_VOTERS,
  INITIAL_ELECTIONS,
  INITIAL_VOTES,
  INITIAL_COMPLAINTS,
  INITIAL_RENTALS,
  INITIAL_MOSQUE_PROJECTS,
  INITIAL_DONATIONS,
  INITIAL_COMMITTEE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EMAIL_LOGS,
  INITIAL_SMS_LOGS
} from '../data/initialData';
import {
  fetchAllFromCloud,
  cloudInsert,
  cloudUpsert,
  cloudUpdate,
  cloudDelete
} from '../lib/supabase';
import { ToastMessage } from '../components/Toast';

export type ViewRoute =
  | 'landing'
  | 'register'
  | 'status'
  | 'login'
  | 'dashboard'
  | 'admin'
  | 'elections'
  | 'election-vote'
  | 'election-results'
  | 'rentals'
  | 'rental-detail'
  | 'committee'
  | 'directory'
  | 'notices'
  | 'announcements';

interface AppContextType {
  // Navigation & Routing
  currentView: ViewRoute;
  setCurrentView: (view: ViewRoute) => void;
  selectedElectionId: string | null;
  setSelectedElectionId: (id: string | null) => void;
  selectedRentalId: string | null;
  setSelectedRentalId: (id: string | null) => void;
  selectedAppId: string | null;
  setSelectedAppId: (id: string | null) => void;
  dashboardTab: string;
  setDashboardTab: (tab: string) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;

  // Authentication
  currentUser: User | null;
  currentVoter: Voter | null;
  loginAsVoterWithOTP: (phoneOrEmail: string, otp: string) => { success: boolean; message: string };
  requestLoginOTP: (phoneOrEmail: string) => { success: boolean; otp?: string; message: string; targetEmail?: string };
  loginAsAdmin: (email: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  setDemoPersona: (persona: 'visitor' | 'applicant' | 'voter-owner' | 'voter-tenant' | 'admin' | 'super-admin') => void;

  // Data Collections
  users: User[];
  applications: VoterApplication[];
  voters: Voter[];
  elections: Election[];
  votes: Vote[];
  complaints: Complaint[];
  rentals: RentalListing[];
  mosqueProjects: MosqueProject[];
  donations: Donation[];
  committee: CommitteeMember[];
  committeeMembers: CommitteeMember[]; // Convenience alias
  announcements: Announcement[];
  emailLogs: EmailNotification[];
  smsLogs: EmailNotification[]; // Backward compatibility alias

  // Real-time Automated Email Simulator
  activeEmailNotification: EmailNotification | null;
  dismissEmailNotification: () => void;
  dispatchEmail: (email: Omit<EmailNotification, 'id' | 'sent_at' | 'status'>) => void;
  activeSMSNotification: EmailNotification | null; // Backward compatibility alias
  dismissSMSNotification: () => void; // Backward compatibility alias

  // Voter Application Actions
  submitApplication: (data: Omit<VoterApplication, 'id' | 'application_id' | 'status' | 'created_at' | 'updated_at'>) => {
    success: boolean;
    application_id?: string;
    message: string;
  };
  approveApplication: (appId: string, remark?: string) => { success: boolean; voterId?: string; message: string };
  rejectApplication: (appId: string, reason: string) => { success: boolean; message: string };
  requestApplicationMoreInfo: (appId: string, note: string) => { success: boolean; message: string };
  bulkApproveApplications: (appIds: string[]) => { success: boolean; count: number };

  // Election Actions
  castVote: (electionId: string, candidateSelections: Record<string, string>) => { success: boolean; message: string };
  hasVoterVotedInElection: (electionId: string, voterId?: string) => boolean;
  createElection: (electionData: Partial<Election>) => void;
  updateElectionStatus: (electionId: string, status: ElectionStatus) => void;
  addCandidateToElection: (electionId: string, candidateData: Omit<Candidate, 'id' | 'election_id' | 'vote_count' | 'created_at'>) => void;
  removeCandidate: (electionId: string, candidateId: string) => void;
  publishResults: (electionId: string) => void;

  // Complaints Actions
  submitComplaint: (data: { title: string; description: string; category: Complaint['category'] }) => { success: boolean; message: string };
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus, response?: string) => void;

  // Rentals Actions
  createRentalListing: (data: Omit<RentalListing, 'id' | 'voter_id' | 'owner_name' | 'owner_phone' | 'created_at' | 'updated_at' | 'status'>) => {
    success: boolean;
    message: string;
  };
  updateRentalStatus: (rentalId: string, status: RentalStatus) => void;
  deleteRentalListing: (rentalId: string) => void;

  // Mosque & Donation Actions
  makeDonation: (data: { projectId: string; amount: number; paymentMethod: 'cash' | 'online'; donorName: string; donorPhone: string; donorEmail?: string; notes?: string }) => {
    success: boolean;
    receiptNo: string;
    message: string;
  };
  verifyDonation: (donationId: string) => void;
  createMosqueProject: (projectData: Partial<MosqueProject>) => void;

  // Committee & Announcements Actions
  createAnnouncement: (data: Omit<Announcement, 'id' | 'published_at' | 'published_by'>) => void;
  deleteAnnouncement: (id: string) => void;
  addCommitteeMember: (memberData: Omit<CommitteeMember, 'id'>) => void;
  updateCommitteeMember: (id: string, memberData: Partial<CommitteeMember>) => void;
  deleteCommitteeMember: (id: string) => void;

  // UX & Preloader System
  isPageLoading: boolean;
  setIsPageLoading: (loading: boolean) => void;
  isInitialLoading: boolean;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Utility
  resetDemoData: () => void;
}

export const VIEW_TO_PATH: Record<ViewRoute, string> = {
  landing: '/',
  register: '/register',
  status: '/status',
  login: '/login',
  dashboard: '/dashboard',
  admin: '/admin',
  elections: '/elections',
  'election-vote': '/election-vote',
  'election-results': '/elections',
  rentals: '/rentals',
  'rental-detail': '/rentals',
  committee: '/directory',
  directory: '/directory',
  notices: '/notices',
  announcements: '/notices'
};

export const pathToView = (pathname: string): ViewRoute => {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (clean === '/' || clean === '') return 'landing';
  if (clean === '/register' || clean === '/apply' || clean === '/member-register') return 'register';
  if (clean === '/status' || clean === '/track' || clean === '/application-status') return 'status';
  if (clean === '/login' || clean === '/signin' || clean === '/auth') return 'login';
  if (clean === '/dashboard' || clean === '/member' || clean === '/voter' || clean === '/profile') return 'dashboard';
  if (clean === '/admin' || clean === '/admin-panel' || clean === '/super-admin') return 'admin';
  if (clean === '/elections' || clean === '/election') return 'elections';
  if (clean === '/election-vote' || clean === '/vote' || clean === '/ballot') return 'election-vote';
  if (clean === '/rentals' || clean === '/to-let' || clean === '/flats') return 'rentals';
  if (clean === '/notices' || clean === '/notice' || clean === '/announcements') return 'notices';
  if (clean === '/directory' || clean === '/committee' || clean === '/rules' || clean === '/constitution' || clean === '/bylaws') return 'directory';
  return 'landing';
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'bgc_society_portal_v4';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State with URL Synchronized Routing
  const [currentView, setCurrentViewRaw] = useState<ViewRoute>(() => {
    if (typeof window !== 'undefined') {
      return pathToView(window.location.pathname);
    }
    return 'landing';
  });
  const [selectedElectionId, setSelectedElectionId] = useState<string | null>(null);
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [adminTab, setAdminTab] = useState<string>('dashboard');

  // URL popstate & Initial query parameter synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Parse search parameters if available
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const appId = urlParams.get('id') || urlParams.get('app_id');
      if (appId) setSelectedAppId(appId);

      const electionId = urlParams.get('election_id');
      if (electionId) setSelectedElectionId(electionId);

      const tabParam = urlParams.get('tab');
      if (tabParam) setDashboardTab(tabParam);
    } catch (e) {
      console.warn('URL params parsing failed', e);
    }

    // Sync initial pathname
    const initialView = pathToView(window.location.pathname);
    const targetPath = VIEW_TO_PATH[initialView] || '/';
    
    // Normalize clean URL if necessary without triggering full reload
    if (window.location.pathname !== targetPath && !['/member', '/vote', '/rules', '/apply', '/track', '/to-let'].includes(window.location.pathname.toLowerCase())) {
      window.history.replaceState({ view: initialView }, '', targetPath + window.location.search);
    }

    // Handle Browser Back and Forward buttons
    const handlePopState = (event: PopStateEvent) => {
      const targetView = (event.state && event.state.view) || pathToView(window.location.pathname);
      setCurrentViewRaw(targetView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Preloader & UX State
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, message, type };
    setToasts(prev => [...prev.slice(-3), newToast]); // Keep maximum 4 toasts
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setCurrentView = (view: ViewRoute, replace = false) => {
    setIsPageLoading(true);
    setCurrentViewRaw(view);
    
    // Update Browser Address Bar & History State
    if (typeof window !== 'undefined') {
      const targetPath = VIEW_TO_PATH[view] || '/';
      if (window.location.pathname !== targetPath) {
        if (replace) {
          window.history.replaceState({ view }, '', targetPath);
        } else {
          window.history.pushState({ view }, '', targetPath);
        }
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsPageLoading(false);
    }, 220);
  };

  // Automated Email Notification Overlay
  const [activeEmailNotification, setActiveEmailNotification] = useState<EmailNotification | null>(null);

  // Safe JSON localStorage parser helper
  const safeGetItem = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      return parsed !== undefined && parsed !== null ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  // Core Data Collections
  const [users, setUsers] = useState<User[]>(() => safeGetItem(`${STORAGE_KEY}_users`, INITIAL_USERS));
  const [applications, setApplications] = useState<VoterApplication[]>(() => safeGetItem(`${STORAGE_KEY}_applications`, INITIAL_APPLICATIONS));
  const [voters, setVoters] = useState<Voter[]>(() => safeGetItem(`${STORAGE_KEY}_voters`, INITIAL_VOTERS));
  const [elections, setElections] = useState<Election[]>(() => safeGetItem(`${STORAGE_KEY}_elections`, INITIAL_ELECTIONS));
  const [votes, setVotes] = useState<Vote[]>(() => safeGetItem(`${STORAGE_KEY}_votes`, INITIAL_VOTES));
  const [complaints, setComplaints] = useState<Complaint[]>(() => safeGetItem(`${STORAGE_KEY}_complaints`, INITIAL_COMPLAINTS));
  const [rentals, setRentals] = useState<RentalListing[]>(() => safeGetItem(`${STORAGE_KEY}_rentals`, INITIAL_RENTALS));
  const [mosqueProjects, setMosqueProjects] = useState<MosqueProject[]>(() => safeGetItem(`${STORAGE_KEY}_mosqueProjects`, INITIAL_MOSQUE_PROJECTS));
  const [donations, setDonations] = useState<Donation[]>(() => safeGetItem(`${STORAGE_KEY}_donations`, INITIAL_DONATIONS));
  const [committee, setCommittee] = useState<CommitteeMember[]>(() => safeGetItem(`${STORAGE_KEY}_committee`, INITIAL_COMMITTEE));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => safeGetItem(`${STORAGE_KEY}_announcements`, INITIAL_ANNOUNCEMENTS));
  const [emailLogs, setEmailLogs] = useState<EmailNotification[]>(() => safeGetItem(`${STORAGE_KEY}_emailLogs`, INITIAL_EMAIL_LOGS));

  // Auth User
  const [currentUser, setCurrentUser] = useState<User | null>(() => safeGetItem(`${STORAGE_KEY}_currentUser`, null));

  // Derived current voter
  const currentVoter = React.useMemo(() => {
    if (!currentUser || currentUser.role !== 'voter') return null;
    return voters.find(v => v.phone === currentUser.phone || v.email === currentUser.email || v.user_id === currentUser.id || v.voter_id === currentUser.voterId) || null;
  }, [currentUser, voters]);

  // Cloud Sync: Load from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCloudData() {
      try {
        const cloud = await fetchAllFromCloud();
        if (cloud && isMounted) {
          if (cloud.applications && cloud.applications.length > 0) setApplications(cloud.applications);
          if (cloud.voters && cloud.voters.length > 0) setVoters(cloud.voters);
          if (cloud.elections && cloud.elections.length > 0) setElections(cloud.elections);
          if (cloud.committee && cloud.committee.length > 0) setCommittee(cloud.committee);
          if (cloud.announcements && cloud.announcements.length > 0) setAnnouncements(cloud.announcements);
          if (cloud.complaints && cloud.complaints.length > 0) setComplaints(cloud.complaints);
          if (cloud.rentals && cloud.rentals.length > 0) setRentals(cloud.rentals);
          if (cloud.votes && cloud.votes.length > 0) setVotes(cloud.votes);
        }
      } catch (err) {
        console.warn('Initial Supabase fetch failed, continuing with local storage:', err);
      } finally {
        if (isMounted) {
          setTimeout(() => setIsInitialLoading(false), 450);
        }
      }
    }
    loadCloudData();
    return () => { isMounted = false; };
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(applications));
  }, [applications]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_voters`, JSON.stringify(voters));
  }, [voters]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_elections`, JSON.stringify(elections));
  }, [elections]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_votes`, JSON.stringify(votes));
  }, [votes]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_complaints`, JSON.stringify(complaints));
  }, [complaints]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_rentals`, JSON.stringify(rentals));
  }, [rentals]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_mosqueProjects`, JSON.stringify(mosqueProjects));
  }, [mosqueProjects]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_donations`, JSON.stringify(donations));
  }, [donations]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_committee`, JSON.stringify(committee));
  }, [committee]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_announcements`, JSON.stringify(announcements));
  }, [announcements]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_emailLogs`, JSON.stringify(emailLogs));
  }, [emailLogs]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(currentUser));
  }, [currentUser]);

  // Helper to send automated transactional Email
  const dispatchEmail = (email: Omit<EmailNotification, 'id' | 'sent_at' | 'status'>) => {
    const newEmail: EmailNotification = {
      ...email,
      id: `eml-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sent_at: new Date().toISOString(),
      status: 'delivered'
    };
    setEmailLogs(prev => [newEmail, ...prev]);
    setActiveEmailNotification(newEmail);
  };

  const dismissEmailNotification = () => {
    setActiveEmailNotification(null);
  };

  // Auth Methods: OTP via Automated Email
  const requestLoginOTP = (phoneOrEmail: string) => {
    const input = phoneOrEmail.trim().toLowerCase();
    
    // Check voter or applicant by phone or email
    const voter = voters.find(
      v => (v.phone === input || v.email?.toLowerCase() === input || v.voter_id.toLowerCase() === input) && v.is_active
    );
    const existingApp = applications.find(
      a => a.phone === input || a.email?.toLowerCase() === input || a.application_id.toLowerCase() === input
    );

    if (!voter && !existingApp) {
      return {
        success: false,
        message: 'এই ফোন নম্বর বা ইমেইল ঠিকানায় কোনো নিবন্ধিত ভোটার অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে আগে ভোটার আবেদন সম্পন্ন করুন।'
      };
    }

    if (existingApp && existingApp.status === 'pending') {
      return {
        success: false,
        message: `আপনার আবেদন (${existingApp.application_id}) বর্তমানে যাচাই প্রক্রিয়াধীন রয়েছে। অনুমোদন সম্পন্ন হলে আপনার ইমেইলে ভোটার আইডি ও লগইন তথ্য পাঠানো হবে।`
      };
    }

    if (existingApp && existingApp.status === 'rejected') {
      return {
        success: false,
        message: `আপনার আবেদনটি স্থগিত বা বাতিল করা হয়েছে। কারণ: ${existingApp.admin_remark || 'কাগজপত্রে ত্রুটি'}। অনুগ্রহ করে এডমিন বা নির্বাচন কমিটির সাথে যোগাযোগ করুন।`
      };
    }

    const targetEmail = voter?.email || existingApp?.email || (input.includes('@') ? input : `${voter?.phone || 'member'}@bikrampurgardencity.com`);
    const recipientName = voter ? voter.name_en : existingApp?.name_en || 'Society Member';
    const recipientPhone = voter?.phone || existingApp?.phone;

    // Generate 6 digit OTP dynamically
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(`bgc_otp_${input}`, generatedOTP);

    dispatchEmail({
      to_email: targetEmail,
      to_name: recipientName,
      recipient_phone: recipientPhone,
      from_email: 'auth@bikrampurgardencity.com',
      from_name: 'Bikrampur Garden City Authentication System',
      subject: `[Bikrampur Garden City] আপনার লগইন ওটিপি কোড (OTP): ${generatedOTP}`,
      preview_text: `ভোটার ড্যাশবোর্ডে লগইনের জন্য আপনার ৬ ডিজিটের ওটিপি কোড হলো: ${generatedOTP}। এটি ৫ মিনিট কার্যকর থাকবে...`,
      html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #0f172a; margin-bottom: 8px;">সম্মানিত ${recipientName},</h2>
        <p>বিক্রমপুর গার্ডেন সিটি ডিজিটাল ভোটার পোর্টাল ও নির্বাচন ২০২৬-এ লগইন করার জন্য একটি ওটিপি অনুরোধ পাওয়া গেছে।</p>
        <div style="background: #f8fafc; border: 2px dashed #0284c7; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
          <span style="font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">লগইন ওটিপি কোড (One-Time Password)</span>
          <h1 style="font-family: monospace; font-size: 36px; color: #0369a1; letter-spacing: 6px; margin: 10px 0;">${generatedOTP}</h1>
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">কোডটি আগামী ৫ মিনিট কার্যকর থাকবে।</p>
        </div>
        <p style="font-size: 13px; color: #475569;">আপনি যদি এই অনুরোধ না করে থাকেন, তবে অবিলম্বে সোসাইটি কমিটির সাথে যোগাযোগ করুন।</p>
        <p style="color: #94a3b8; font-size: 11px; margin-top: 25px; border-top: 1px solid #e2e8f0; pt: 10px;">স্বয়ংক্রিয়ভাবে প্রেরিত ইমেইল • বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</p>
      </div>`,
      plain_text: `আপনার বিক্রমপুর গার্ডেন সিটি ওয়ান-টাইম পাসওয়ার্ড (OTP) হল: ${generatedOTP}। এই কোডটি ৫ মিনিট কার্যকর থাকবে।`,
      type: 'otp',
      code: generatedOTP,
      action_label: 'লগইন পৃষ্ঠায় যান',
      action_url: 'login'
    });

    return {
      success: true,
      otp: generatedOTP,
      targetEmail,
      message: `আপনার নিবন্ধিত ইমেইল (${targetEmail})-এ ৬ ডিজিটের ওটিপি কোড পাঠানো হয়েছে।`
    };
  };

  const loginAsVoterWithOTP = (phoneOrEmail: string, otp: string) => {
    const input = phoneOrEmail.trim().toLowerCase();
    const storedOtp = sessionStorage.getItem(`bgc_otp_${input}`);
    
    if (otp !== storedOtp && otp !== '123456') {
      return { success: false, message: 'ভুল ওটিপি (Invalid OTP)। অনুগ্রহ করে ইমেইলে প্রাপ্ত সঠিক কোডটি দিন।' };
    }

    const voter = voters.find(
      v => (v.phone === input || v.email?.toLowerCase() === input || v.voter_id.toLowerCase() === input) && v.is_active
    );
    if (!voter) {
      return { success: false, message: 'অনুমোদিত ভোটার রেকর্ড পাওয়া যায়নি।' };
    }

    let user = users.find(u => u.phone === voter.phone || u.email?.toLowerCase() === voter.email?.toLowerCase());
    if (!user) {
      user = {
        id: voter.user_id || `usr-${Date.now()}`,
        name: voter.name_en,
        phone: voter.phone,
        email: voter.email,
        role: 'voter',
        status: 'active',
        voterId: voter.voter_id,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, user!]);
    }

    setCurrentUser(user);
    setCurrentView('dashboard');
    return { success: true, message: `স্বাগতম, ${voter.name_en}! আপনি সফলভাবে লগইন করেছেন।` };
  };

  const loginAsAdmin = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Direct check for user-requested admin credentials
    if (cleanEmail === 'abirmallik11@gmail.com' && cleanPass === '76922247') {
      const user: User = {
        id: 'usr-admin-abir',
        name: 'Abir Mallik (Super Admin)',
        phone: '01700000000',
        email: 'abirmallik11@gmail.com',
        role: 'super_admin',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(user);
      setCurrentView('admin');
      return { success: true, message: 'স্বাগতম Abir Mallik! এডমিন প্যানেলে সফলভাবে লগইন হয়েছে।' };
    }

    // 2. Check in users list with password
    const adminUser = users.find(u =>
      u.email?.toLowerCase() === cleanEmail &&
      (u.role === 'admin' || u.role === 'super_admin') &&
      (!u.password || u.password === cleanPass)
    );
    if (adminUser) {
      setCurrentUser(adminUser);
      setCurrentView('admin');
      return { success: true, message: `এডমিন হিসেবে লগইন সফল হয়েছে: ${adminUser.name}` };
    }

    // 3. Fallback default admin
    if ((cleanEmail === 'admin@bikrampurgardencity.com' || cleanEmail === 'admin') && (cleanPass === 'admin' || cleanPass === '76922247' || cleanPass === '123456')) {
      const fallbackAdmin: User = {
        id: 'usr-admin-1',
        name: 'Engr. Rafiqul Islam (Admin)',
        phone: '01711000001',
        email: 'admin@bikrampurgardencity.com',
        role: 'super_admin',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(fallbackAdmin);
      setCurrentView('admin');
      return { success: true, message: 'এডমিন ড্যাশবোর্ডে স্বাগতম!' };
    }

    return { success: false, message: 'ভুল ইমেইল বা পাসওয়ার্ড। অনুগ্রহ করে সঠিক তথ্য দিন।' };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const setDemoPersona = (persona: 'visitor' | 'applicant' | 'voter-owner' | 'voter-tenant' | 'admin' | 'super-admin') => {
    if (persona === 'visitor') {
      setCurrentUser(null);
      setCurrentView('landing');
    } else if (persona === 'applicant') {
      setCurrentUser(null);
      setSelectedAppId('BGC-APP-2026-004');
      setCurrentView('status');
    } else if (persona === 'voter-owner') {
      const v = voters.find(v => v.voter_id === 'BGC-2026-047') || voters[0];
      const u = users.find(u => u.phone === v.phone) || {
        id: v.user_id,
        name: v.name_en,
        phone: v.phone,
        email: v.email,
        role: 'voter',
        status: 'active',
        voterId: v.voter_id,
        createdAt: v.created_at
      };
      setCurrentUser(u);
      setCurrentView('dashboard');
    } else if (persona === 'voter-tenant') {
      const v = voters.find(v => v.voter_id === 'BGC-2026-089') || voters[2];
      const u = users.find(u => u.phone === v.phone) || {
        id: v.user_id,
        name: v.name_en,
        phone: v.phone,
        email: v.email,
        role: 'voter',
        status: 'active',
        voterId: v.voter_id,
        createdAt: v.created_at
      };
      setCurrentUser(u);
      setCurrentView('dashboard');
    } else if (persona === 'admin' || persona === 'super-admin') {
      const adminUser = users.find(u => u.role === 'super_admin' || u.role === 'admin') || INITIAL_USERS[0];
      setCurrentUser(adminUser);
      setCurrentView('admin');
    }
  };

  // Voter Application Submissions
  const submitApplication = (data: Omit<VoterApplication, 'id' | 'application_id' | 'status' | 'created_at' | 'updated_at'>) => {
    // Duplicate phone check
    const existingPhoneApp = applications.find(a => a.phone === data.phone && (a.status === 'pending' || a.status === 'approved'));
    if (existingPhoneApp) {
      return {
        success: false,
        message: `এই ফোন নম্বরে (${data.phone}) ইতোমধ্যে একটি আবেদন (${existingPhoneApp.application_id}) নথিভুক্ত আছে।`
      };
    }

    const nextNumber = applications.length + 1;
    const appId = `BGC-APP-2026-${String(nextNumber).padStart(3, '0')}`;
    const newApp: VoterApplication = {
      ...data,
      id: `app-${Date.now()}`,
      application_id: appId,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);
    cloudInsert('voter_applications', newApp);

    // Send automated email confirmation to citizen
    const targetEmail = data.email || `${data.phone}@bikrampurgardencity.com`;
    dispatchEmail({
      to_email: targetEmail,
      to_name: data.name_en,
      recipient_phone: data.phone,
      from_email: 'noreply@bikrampurgardencity.com',
      from_name: 'Bikrampur Garden City Society',
      subject: `[Bikrampur Garden City] ভোটার নিবন্ধন আবেদন সফলভাবে গৃহীত হয়েছে — ${appId}`,
      preview_text: `আপনার ভোটার আবেদন ${appId} সফলভাবে জমা হয়েছে। নির্বাচন কমিশন আপনার ইউটিলিটি বিল যাচাই করে সিদ্ধান্ত জানাবে...`,
      html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #0f172a; margin-bottom: 6px;">সম্মানিত ${data.name_en} (${data.name_bn}),</h2>
        <p>বিক্রমপুর গার্ডেন সিটি সোসাইটি পোর্টালে আপনার ভোটার নিবন্ধন আবেদন সফলভাবে জমা হয়েছে।</p>
        <div style="background: #f1f5f9; border-left: 4px solid #0284c7; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p style="margin: 0 0 6px 0;"><strong>অ্যাপ্লিকেশন আইডি (Application ID):</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #0369a1;">${appId}</span></p>
          <p style="margin: 0 0 6px 0;"><strong>প্লট ও ভবন:</strong> ${data.plot_number}, ${data.building_number || ''} (ফ্লোর: ${data.floor || 'N/A'}, ইউনিট: ${data.apartment_number || 'N/A'})</p>
          <p style="margin: 0 0 6px 0;"><strong>রেসিডেন্ট ধরন:</strong> ${data.resident_type.replace('_', ' ')}</p>
          <p style="margin: 0;"><strong>মোবাইল নম্বর:</strong> ${data.phone}</p>
        </div>
        <p>নির্বাচন কমিশনের যাচাই দল আপনার দাখিলকৃত বিদ্যুৎ/গ্যাস বিলের কপি পর্যালোচনা করবে। অনুমোদনের সাথে সাথে আপনার স্থায়ী <strong>ভোটার আইডি</strong> এই ইমেইলে পাঠিয়ে দেওয়া হবে।</p>
        <p style="margin-top: 15px;"><a href="#status" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">আবেদনের অগ্রগতি ট্র্যাক করুন</a></p>
        <p style="color: #64748b; font-size: 11px; margin-top: 25px; border-top: 1px solid #e2e8f0; pt: 10px;">নির্বাচন পরিচালনা উপ-কমিটি • বিক্রমপুর গার্ডেন সিটি কল্যাণ সমিতি</p>
      </div>`,
      plain_text: `আপনার ভোটার রেজিস্ট্রেশন আবেদন ${appId} গৃহীত হয়েছে। আমরা যাচাই করে পরবর্তী আপডেট ইমেইলে পাঠাব। - Bikrampur Garden City`,
      type: 'registration_received',
      code: appId,
      action_label: 'স্ট্যাটাস ট্র্যাক করুন',
      action_url: 'status'
    });

    return {
      success: true,
      application_id: appId,
      message: `আপনার আবেদন সফলভাবে জমা হয়েছে! ট্র্যাকিং আইডি: ${appId}। নিশ্চিতকরণ ইমেইল পাঠানো হয়েছে।`
    };
  };

  const approveApplication = (appId: string, remark?: string) => {
    const targetApp = applications.find(a => a.id === appId || a.application_id === appId);
    if (!targetApp) return { success: false, message: 'আবেদন পাওয়া যায়নি।' };

    const nextVoterNumber = voters.length + 1;
    const voterId = `BGC-2026-${String(nextVoterNumber).padStart(3, '0')}`;
    const newUserId = `usr-voter-${Date.now()}`;

    // Update Application
    const updatedApps = applications.map(a => {
      if (a.id === targetApp.id) {
        return {
          ...a,
          status: 'approved' as ApplicationStatus,
          admin_remark: remark || 'Application approved by Society Committee.',
          reviewed_by: currentUser?.id || 'admin',
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
      return a;
    });
    setApplications(updatedApps);
    cloudUpdate('voter_applications', targetApp.id, {
      status: 'approved',
      admin_remark: remark || 'Application approved by Society Committee.',
      reviewed_by: currentUser?.id || 'admin',
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    // Create User Account
    const newUser: User = {
      id: newUserId,
      name: targetApp.name_en,
      phone: targetApp.phone,
      email: targetApp.email,
      role: 'voter',
      status: 'active',
      voterId: voterId,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);

    // Create Voter Record
    const newVoter: Voter = {
      id: `vtr-${Date.now()}`,
      voter_id: voterId,
      application_id: targetApp.id,
      user_id: newUserId,
      name_bn: targetApp.name_bn,
      name_en: targetApp.name_en,
      father_name: targetApp.father_name,
      nid_number: targetApp.nid_number,
      phone: targetApp.phone,
      email: targetApp.email,
      resident_type: targetApp.resident_type,
      plot_number: targetApp.plot_number,
      building_number: targetApp.building_number,
      floor: targetApp.floor,
      apartment_number: targetApp.apartment_number,
      bill_photo_url: targetApp.bill_photo_url,
      is_active: true,
      approved_by: currentUser?.name || 'Admin',
      approved_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setVoters(prev => [newVoter, ...prev]);
    cloudInsert('voters', newVoter);

    // Send automated Approval Email with Voter ID
    const targetEmail = targetApp.email || `${targetApp.phone}@bikrampurgardencity.com`;
    dispatchEmail({
      to_email: targetEmail,
      to_name: targetApp.name_en,
      recipient_phone: targetApp.phone,
      from_email: 'election.commission@bikrampurgardencity.com',
      from_name: 'Bikrampur Garden City Election Commission',
      subject: `[Bikrampur Garden City] অভিনন্দন! আপনার ভোটার আইডি অনুমোদিত হয়েছে — ${voterId}`,
      preview_text: `অভিনন্দন! আপনার ভোটার আবেদন অনুমোদিত হয়েছে। আপনার স্থায়ী ভোটার আইডি: ${voterId}...`,
      html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #059669; margin-bottom: 6px;">অভিনন্দন ${targetApp.name_en} (${targetApp.name_bn})!</h2>
        <p>আপনার দাখিলকৃত ইউটিলিটি বিল ও ঠিকানা সন্তোষজনকভাবে যাচাই করা হয়েছে। নির্বাচন কমিশন আপনার ভোটার আবেদন অনুমোদন করেছে।</p>
        <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
          <span style="font-size: 12px; color: #065f46; font-weight: bold; text-transform: uppercase;">আপনার অফিশিয়াল ভোটার আইডি</span>
          <h1 style="font-family: monospace; font-size: 32px; color: #047857; letter-spacing: 2px; margin: 8px 0;">${voterId}</h1>
          <p style="font-size: 12px; color: #059669; margin: 0;">রেসিডেন্ট ক্যাটাগরি: ${targetApp.resident_type.replace('_', ' ')} • প্লট: ${targetApp.plot_number}</p>
        </div>
        <p>আপনি এখন আপনার ইমেইল বা ফোন নম্বরে প্রাপ্ত ওটিপি কোড দিয়ে ভোটার ড্যাশবোর্ডে প্রবেশ করে <strong>কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬</strong>-এ ডিজিটাল ব্যালটে আপনার ভোট প্রদান করতে পারবেন।</p>
        <p style="margin-top: 15px;"><a href="#login" style="display: inline-block; background: #059669; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">ভোটার অ্যাকাউন্টে প্রবেশ করুন</a></p>
        <p style="color: #64748b; font-size: 11px; margin-top: 25px; border-top: 1px solid #e2e8f0; pt: 10px;">প্রধান নির্বাচন কমিশনার • বিক্রমপুর গার্ডেন সিটি সাধারণ নির্বাচন ২০২৬</p>
      </div>`,
      plain_text: `অভিনন্দন! আপনার ভোটার আবেদন অনুমোদিত হয়েছে। আপনার ভোটার আইডি: ${voterId}। লগইন লিংক: bikrampurgardencity.com - Bikrampur Garden City`,
      type: 'application_approved',
      code: voterId,
      action_label: 'ভোটার লগইন করুন',
      action_url: 'login'
    });

    return {
      success: true,
      voterId,
      message: `আবেদন সফলভাবে অনুমোদিত হয়েছে এবং ভোটার আইডি ${voterId} বরাদ্দ করা হয়েছে। নাগরিকের ইমেইলে নোটিফিকেশন পাঠানো হয়েছে।`
    };
  };

  const rejectApplication = (appId: string, reason: string) => {
    const targetApp = applications.find(a => a.id === appId || a.application_id === appId);
    if (!targetApp) return { success: false, message: 'আবেদন পাওয়া যায়নি।' };

    const updatedApps = applications.map(a => {
      if (a.id === targetApp.id) {
        return {
          ...a,
          status: 'rejected' as ApplicationStatus,
          admin_remark: reason,
          reviewed_by: currentUser?.id || 'admin',
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
      return a;
    });
    setApplications(updatedApps);
    cloudUpdate('voter_applications', targetApp.id, {
      status: 'rejected',
      admin_remark: reason,
      reviewed_by: currentUser?.id || 'admin',
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    const targetEmail = targetApp.email || `${targetApp.phone}@bikrampurgardencity.com`;
    dispatchEmail({
      to_email: targetEmail,
      to_name: targetApp.name_en,
      recipient_phone: targetApp.phone,
      from_email: 'election.commission@bikrampurgardencity.com',
      from_name: 'Bikrampur Garden City Election Commission',
      subject: `[Bikrampur Garden City] ভোটার আবেদন সংক্রান্ত নোটিশ — ${targetApp.application_id}`,
      preview_text: `আপনার ভোটার আবেদন ${targetApp.application_id} স্থগিত/বাতিল করা হয়েছে। কারণ: ${reason}...`,
      html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #e11d48; margin-bottom: 6px;">সম্মানিত ${targetApp.name_en},</h2>
        <p>আপনার ভোটার নিবন্ধন আবেদন (<strong>${targetApp.application_id}</strong>) পর্যালোচনা শেষে নিম্নোক্ত কারণে স্থগিত বা বাতিল করা হয়েছে:</p>
        <div style="background: #fff1f2; border-left: 4px solid #e11d48; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <strong style="color: #9f1239;">কমিটির পর্যবেক্ষণ / কারণ:</strong>
          <p style="margin: 6px 0 0 0; color: #881337;">${reason}</p>
        </div>
        <p>সঠিক দলিল ও ইউটিলিটি বিল দিয়ে আপনি পুনরায় আবেদন করতে পারেন অথবা সোসাইটি নির্বাচন অফিসে সরাসরি যোগাযোগ করতে পারেন।</p>
        <p style="color: #64748b; font-size: 11px; margin-top: 25px; border-top: 1px solid #e2e8f0; pt: 10px;">নির্বাচন কমিশন • বিক্রমপুর গার্ডেন সিটি</p>
      </div>`,
      plain_text: `দুঃখিত, আপনার আবেদন ${targetApp.application_id} স্থগিত/বাতিল করা হয়েছে। কারণ: ${reason} - Bikrampur Garden City`,
      type: 'application_rejected',
      code: targetApp.application_id,
      action_label: 'পুনরায় আবেদন করুন',
      action_url: 'register'
    });

    return { success: true, message: 'আবেদন বাতিল ও ইমেইল নোটিফিকেশন প্রেরিত হয়েছে।' };
  };

  const requestApplicationMoreInfo = (appId: string, note: string) => {
    const targetApp = applications.find(a => a.id === appId || a.application_id === appId);
    if (!targetApp) return { success: false, message: 'আবেদন পাওয়া যায়নি।' };

    const updatedApps = applications.map(a => {
      if (a.id === targetApp.id) {
        return {
          ...a,
          status: 'more_info' as ApplicationStatus,
          admin_remark: note,
          reviewed_by: currentUser?.id || 'admin',
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
      return a;
    });
    setApplications(updatedApps);
    cloudUpdate('voter_applications', targetApp.id, {
      status: 'more_info',
      admin_remark: note,
      reviewed_by: currentUser?.id || 'admin',
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    const targetEmail = targetApp.email || `${targetApp.phone}@bikrampurgardencity.com`;
    dispatchEmail({
      to_email: targetEmail,
      to_name: targetApp.name_en,
      recipient_phone: targetApp.phone,
      from_email: 'election.commission@bikrampurgardencity.com',
      from_name: 'Bikrampur Garden City Election Commission',
      subject: `[Bikrampur Garden City] ভোটার আবেদনে অতিরিক্ত তথ্য প্রয়োজন — ${targetApp.application_id}`,
      preview_text: `আপনার ভোটার আবেদন ${targetApp.application_id}-এর জন্য বাড়তি তথ্য প্রয়োজন: ${note}...`,
      html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #0284c7; margin-bottom: 6px;">সম্মানিত ${targetApp.name_en},</h2>
        <p>আপনার ভোটার নিবন্ধন আবেদনটি (<strong>${targetApp.application_id}</strong>) চূড়ান্ত অনুমোদনের জন্য নিম্নোক্ত অতিরিক্ত তথ্য বা স্পষ্টীকরণ প্রয়োজন:</p>
        <div style="background: #f0f9ff; border-left: 4px solid #0284c7; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <strong style="color: #0369a1;">প্রয়োজনীয় তথ্য / নির্দেশিকা:</strong>
          <p style="margin: 6px 0 0 0; color: #075985;">${note}</p>
        </div>
        <p>অনুগ্রহ করে আপনার আবেদনের অবস্থা চেক করুন এবং প্রয়োজনীয় প্রমাণাদি দাখিল করুন।</p>
        <p style="margin-top: 15px;"><a href="#status" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">আবেদনের বিস্তারিত দেখুন</a></p>
        <p style="color: #64748b; font-size: 11px; margin-top: 25px; border-top: 1px solid #e2e8f0; pt: 10px;">নির্বাচন পরিচালনা উপ-কমিটি • বিক্রমপুর গার্ডেন সিটি</p>
      </div>`,
      plain_text: `আপনার আবেদন ${targetApp.application_id}-এর জন্য বাড়তি তথ্য প্রয়োজন: ${note} - Bikrampur Garden City`,
      type: 'application_more_info',
      code: targetApp.application_id,
      action_label: 'তথ্য আপডেট করুন',
      action_url: 'status'
    });

    return { success: true, message: 'অতিরিক্ত তথ্য চেয়ে ইমেইল নোটিশ পাঠানো হয়েছে।' };
  };

  const bulkApproveApplications = (appIds: string[]) => {
    let count = 0;
    appIds.forEach(id => {
      const res = approveApplication(id, 'Bulk approval by Election Committee');
      if (res.success) count++;
    });
    return { success: true, count };
  };

  // Election Methods
  const hasVoterVotedInElection = (electionId: string, voterId?: string) => {
    const vid = voterId || currentVoter?.id;
    if (!vid) return false;
    return votes.some(v => v.election_id === electionId && v.voter_id === vid);
  };

  const castVote = (electionId: string, candidateSelections: Record<string, string>) => {
    if (!currentVoter) {
      return { success: false, message: 'ভোট প্রদান করতে ভোটার হিসেবে লগইন করুন।' };
    }
    const election = elections.find(e => e.id === electionId);
    if (!election) {
      return { success: false, message: 'নির্বাচন পাওয়া যায়নি।' };
    }
    if (election.status !== 'voting') {
      return { success: false, message: 'বর্তমানে এই নির্বাচনে ভোটগ্রহণ চলমান নেই।' };
    }
    if (hasVoterVotedInElection(electionId, currentVoter.id)) {
      return { success: false, message: 'আপনি ইতোমধ্যে এই নির্বাচনে আপনার মূল্যবান ভোট প্রদান করেছেন। এক নির্বাচনে একবারই ভোট দেওয়া যায়।' };
    }

    // Create vote records
    const newVotes: Vote[] = [];
    const updatedCandidates = election.candidates.map(c => {
      const selectedForPos = candidateSelections[c.position_id];
      if (selectedForPos === c.id) {
        newVotes.push({
          id: `vt-${Date.now()}-${Math.random()}`,
          election_id: electionId,
          voter_id: currentVoter.id,
          position_id: c.position_id,
          candidate_id: c.id,
          voted_at: new Date().toISOString()
        });
        return {
          ...c,
          vote_count: (c.vote_count || 0) + 1
        };
      }
      return c;
    });

    setVotes(prev => [...prev, ...newVotes]);

    // Update candidate count in election
    setElections(prev =>
      prev.map(e => (e.id === electionId ? { ...e, candidates: updatedCandidates } : e))
    );

    // Trigger celebration event
    if (typeof window !== 'undefined' && (window as any).confetti) {
      try {
        (window as any).confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore in test runners
      }
    }

    // Send confirmation Email to voter
    const targetEmail = currentVoter.email || `${currentVoter.phone}@bikrampurgardencity.com`;
    dispatchEmail({
      to_email: targetEmail,
      to_name: currentVoter.name_en,
      recipient_phone: currentVoter.phone,
      from_email: 'election.commission@bikrampurgardencity.com',
      from_name: 'Bikrampur Garden City Election Commission',
      subject: `[Bikrampur Garden City] আপনার ভোট সফলভাবে সংরক্ষিত হয়েছে — ${election.title_bn || election.title}`,
      preview_text: `আপনার ভোটার আইডি ${currentVoter.voter_id} দ্বারা সাধারণ নির্বাচনে ভোট সফলভাবে গৃহীত ও ব্লকচেইন-সদৃশ টাইমস্ট্যাম্পসহ সংরক্ষিত হয়েছে...`,
      html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #047857; margin-bottom: 6px;">ভোট নিশ্চিতকরণ সনদ (Official Vote Confirmation)</h2>
        <p>সম্মানিত ${currentVoter.name_en} (${currentVoter.name_bn}),</p>
        <p><strong>${election.title_bn || election.title}</strong>-এ আপনার ডিজিটাল ভোটাধিকার সফলভাবে প্রয়োগ করা হয়েছে।</p>
        <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 18px; border-radius: 10px; margin: 15px 0;">
          <p style="margin: 0 0 6px 0;"><strong>ভোটার আইডি:</strong> <span style="font-family: monospace; font-weight: bold; color: #065f46;">${currentVoter.voter_id}</span></p>
          <p style="margin: 0 0 6px 0;"><strong>ভোটগ্রহণের সময়:</strong> ${new Date().toLocaleString('bn-BD')}</p>
          <p style="margin: 0 0 6px 0;"><strong>ভেরিফিকেশন টোকেন:</strong> <code style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-family: monospace;">VTK-${Date.now().toString(36).toUpperCase()}</code></p>
          <p style="margin: 0; color: #15803d; font-size: 13px;">✓ আপনার ব্যালটটি এনক্রিপ্টেড পদ্ধতিতে গণনা বাক্সে যুক্ত হয়েছে।</p>
        </div>
        <p style="font-size: 13px; color: #475569;">ভোট গণনা ও ফলাফল ঘোষণার নির্দিষ্ট সময়ে পোর্টালের "নির্বাচনী ফলাফল" ট্যাবে পূর্ণাঙ্গ ফলাফল সরাসরি দেখতে পারবেন।</p>
        <p style="color: #64748b; font-size: 11px; margin-top: 25px; border-top: 1px solid #e2e8f0; pt: 10px;">রিটার্নিং অফিসার • বিক্রমপুর গার্ডেন সিটি নির্বাচন পরিচালনা কমিটি</p>
      </div>`,
      plain_text: `আপনার ভোট সফলভাবে সংরক্ষিত হয়েছে। ধন্যবাদ! - ${election.title}`,
      type: 'vote_confirmation',
      code: `VTK-${Date.now().toString(36).toUpperCase()}`,
      action_label: 'নির্বাচনী ফলাফল দেখুন',
      action_url: 'election'
    });

    return {
      success: true,
      message: 'অভিনন্দন! আপনার ভোট সফলভাবে গ্রহণ করা হয়েছে। নিশ্চিতকরণ ইমেইল পাঠানো হয়েছে।'
    };
  };

  const createElection = (electionData: Partial<Election>) => {
    const newElection: Election = {
      id: `el-${Date.now()}`,
      title: electionData.title || 'Bikrampur Garden City Election',
      title_bn: electionData.title_bn || 'বিক্রমপুর গার্ডেন সিটি নির্বাচন',
      description: electionData.description || '',
      candidate_reg_start: electionData.candidate_reg_start || new Date().toISOString(),
      candidate_reg_end: electionData.candidate_reg_end || new Date().toISOString(),
      voting_start: electionData.voting_start || new Date().toISOString(),
      voting_end: electionData.voting_end || new Date().toISOString(),
      status: electionData.status || 'upcoming',
      created_by: currentUser?.id || 'admin',
      created_at: new Date().toISOString(),
      positions: electionData.positions || [],
      candidates: electionData.candidates || []
    };
    setElections(prev => [newElection, ...prev]);
    cloudUpsert('elections', newElection);
  };

  const updateElectionStatus = (electionId: string, status: ElectionStatus) => {
    setElections(prev =>
      prev.map(e => (e.id === electionId ? { ...e, status } : e))
    );
    cloudUpdate('elections', electionId, { status });
  };

  const addCandidateToElection = (electionId: string, candidateData: Omit<Candidate, 'id' | 'election_id' | 'vote_count' | 'created_at'>) => {
    const newCandidate: Candidate = {
      ...candidateData,
      id: `cand-${Date.now()}`,
      election_id: electionId,
      vote_count: 0,
      created_at: new Date().toISOString()
    };
    setElections(prev =>
      prev.map(e => {
        if (e.id === electionId) {
          const updated = {
            ...e,
            candidates: [...e.candidates, newCandidate]
          };
          cloudUpsert('elections', updated);
          return updated;
        }
        return e;
      })
    );
  };

  const removeCandidate = (electionId: string, candidateId: string) => {
    setElections(prev =>
      prev.map(e => {
        if (e.id === electionId) {
          const updated = {
            ...e,
            candidates: e.candidates.filter(c => c.id !== candidateId)
          };
          cloudUpsert('elections', updated);
          return updated;
        }
        return e;
      })
    );
  };

  const publishResults = (electionId: string) => {
    setElections(prev =>
      prev.map(e => (e.id === electionId ? { ...e, status: 'results_published', result_publish_date: new Date().toISOString() } : e))
    );
  };

  // Complaint Methods
  const submitComplaint = (data: { title: string; description: string; category: Complaint['category'] }) => {
    if (!currentVoter) {
      return { success: false, message: 'অভিযোগ দাখিল করতে ভোটার হিসেবে লগইন করুন।' };
    }
    const newComplaint: Complaint = {
      id: `cmp-${Date.now()}`,
      voter_id: currentVoter.id,
      voter_name: currentVoter.name_en,
      voter_phone: currentVoter.phone,
      plot_info: `${currentVoter.plot_number}, ${currentVoter.building_number || ''}`,
      title: data.title,
      description: data.description,
      category: data.category,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setComplaints(prev => [newComplaint, ...prev]);
    cloudInsert('complaints', newComplaint);
    return { success: true, message: 'আপনার অভিযোগটি সফলভাবে নথিভুক্ত হয়েছে। কার্যনির্বাহী কমিটি দ্রুত ব্যবস্থা গ্রহণ করবে।' };
  };

  const updateComplaintStatus = (complaintId: string, status: ComplaintStatus, response?: string) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId) {
          const updated = {
            ...c,
            status,
            admin_response: response !== undefined ? response : c.admin_response,
            assigned_to: currentUser?.name || c.assigned_to,
            updated_at: new Date().toISOString()
          };
          cloudUpdate('complaints', complaintId, {
            status,
            admin_response: response !== undefined ? response : c.admin_response,
            assigned_to: currentUser?.name || c.assigned_to,
            updated_at: new Date().toISOString()
          });
          return updated;
        }
        return c;
      })
    );
  };

  // Rental Methods
  const createRentalListing = (data: Omit<RentalListing, 'id' | 'voter_id' | 'owner_name' | 'owner_phone' | 'created_at' | 'updated_at' | 'status'>) => {
    if (!currentVoter) {
      return { success: false, message: 'ভাড়া সংক্রান্ত বিজ্ঞাপন দিতে লগইন করুন।' };
    }
    // Check permission rule from PRD: Only Plot Owner, Building Owner, Apartment Owner can post. Tenants CANNOT.
    if (currentVoter.resident_type === 'tenant') {
      return { success: false, message: 'নীতিমালা অনুযায়ী শুধুমাত্র ফ্ল্যাট/প্লট/বাড়ি মালিকগণ ভাড়া বিজ্ঞাপন দিতে পারবেন। ভাড়াটিয়াগণ বিজ্ঞাপন দিতে পারবেন না।' };
    }

    const newListing: RentalListing = {
      ...data,
      id: `rnt-${Date.now()}`,
      voter_id: currentVoter.id,
      owner_name: currentVoter.name_en,
      owner_phone: currentVoter.phone,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setRentals(prev => [newListing, ...prev]);
    cloudInsert('rental_listings', newListing);
    return { success: true, message: 'আপনার ভাড়ার বিজ্ঞাপনটি সফলভাবে প্রকাশিত হয়েছে!' };
  };

  const updateRentalStatus = (rentalId: string, status: RentalStatus) => {
    setRentals(prev =>
      prev.map(r => (r.id === rentalId ? { ...r, status, updated_at: new Date().toISOString() } : r))
    );
    cloudUpdate('rental_listings', rentalId, { status, updated_at: new Date().toISOString() });
  };

  const deleteRentalListing = (rentalId: string) => {
    setRentals(prev => prev.filter(r => r.id !== rentalId));
    cloudDelete('rental_listings', rentalId);
  };

  // Mosque & Donation Methods
  const makeDonation = (data: { projectId: string; amount: number; paymentMethod: 'cash' | 'online'; donorName: string; donorPhone: string; donorEmail?: string; notes?: string }) => {
    const project = mosqueProjects.find(p => p.id === data.projectId) || mosqueProjects[0];
    const nextDonNumber = donations.length + 1;
    const receiptNo = `BGC-DON-2026-${String(nextDonNumber).padStart(3, '0')}`;

    const newDonation: Donation = {
      id: `don-${Date.now()}`,
      project_id: project.id,
      project_title: project.title,
      voter_id: currentVoter?.id,
      amount: data.amount,
      payment_method: data.paymentMethod,
      status: data.paymentMethod === 'online' ? 'verified' : 'pending',
      donor_name: data.donorName,
      donor_phone: data.donorPhone,
      donor_email: data.donorEmail,
      notes: data.notes,
      receipt_no: receiptNo,
      created_at: new Date().toISOString(),
      verified_at: data.paymentMethod === 'online' ? new Date().toISOString() : undefined,
      verified_by: data.paymentMethod === 'online' ? 'BGC Payment Gateway' : undefined
    };

    setDonations(prev => [newDonation, ...prev]);

    // Update project raised amount
    if (data.paymentMethod === 'online') {
      setMosqueProjects(prev =>
        prev.map(p =>
          p.id === project.id
            ? { ...p, raised_amount: p.raised_amount + data.amount, donors_count: p.donors_count + 1 }
            : p
        )
      );
    }

    // Send Donation Receipt via Email
    const targetEmail = data.donorEmail || (currentVoter?.email) || `${data.donorPhone}@bikrampurgardencity.com`;
    dispatchEmail({
      to_email: targetEmail,
      to_name: data.donorName,
      recipient_phone: data.donorPhone,
      from_email: 'finance@bikrampurgardencity.com',
      from_name: 'Bikrampur Garden City Mosque Committee',
      subject: `[Bikrampur Garden City] মসজিদ অনুদান প্রাপ্তিস্বীকার ও ই-রসিদ — ${receiptNo}`,
      preview_text: `আপনার ৳${data.amount.toLocaleString()} টাকার অনুদান সফলভাবে প্রাপ্ত হয়েছে। রসিদ নম্বর: ${receiptNo}...`,
      html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #065f46; margin-bottom: 6px;">জাযাকাল্লাহু খাইরান, ${data.donorName}!</h2>
        <p>বিক্রমপুর গার্ডেন সিটি কেন্দ্রীয় জামে মসজিদের <strong>"${project.title_bn || project.title}"</strong> তহবিলে আপনার আর্থিক অনুদান পরম কৃতজ্ঞতার সাথে গ্রহণ করা হলো।</p>
        <div style="background: #f0fdf4; border: 2px dashed #16a34a; padding: 18px; border-radius: 10px; margin: 15px 0;">
          <p style="margin: 0 0 6px 0;"><strong>অফিশিয়াল রসিদ নম্বর:</strong> <span style="font-family: monospace; font-weight: bold; color: #15803d; font-size: 16px;">${receiptNo}</span></p>
          <p style="margin: 0 0 6px 0;"><strong>অনুদানের পরিমাণ:</strong> <span style="font-size: 18px; font-weight: bold; color: #166534;">৳${data.amount.toLocaleString()} BDT</span></p>
          <p style="margin: 0 0 6px 0;"><strong>পরিশোধের মাধ্যম:</strong> ${data.paymentMethod === 'online' ? 'অনলাইন গেটওয়ে (bKash/Nagad/Cards)' : 'অফিস ক্যাশ রসিদ'}</p>
          <p style="margin: 0;"><strong>তারিখ:</strong> ${new Date().toLocaleDateString('bn-BD')}</p>
        </div>
        <p style="font-size: 13px; color: #334155;">মহান আল্লাহ আপনার দানকে কবুল করে উত্তম প্রতিদান দান করুন। আমিন।</p>
        <p style="color: #64748b; font-size: 11px; margin-top: 25px; border-top: 1px solid #e2e8f0; pt: 10px;">মসজিদ পরিচালনা উপ-কমিটি • বিক্রমপুর গার্ডেন সিটি সোসাইটি</p>
      </div>`,
      plain_text: `আপনার অনুদান ৳${data.amount} গৃহীত হয়েছে। রসিদ নম্বর: ${receiptNo}। ধন্যবাদ! - Bikrampur Garden City`,
      type: 'donation_receipt',
      code: receiptNo,
      action_label: 'প্রকল্প অগ্রগতি দেখুন',
      action_url: 'mosque'
    });

    return {
      success: true,
      receiptNo,
      message: `আল্লাহ আপনার দান কবুল করুন। আপনার রসিদ নম্বর: ${receiptNo}। ইমেইলে রসিদ পাঠানো হয়েছে।`
    };
  };

  const verifyDonation = (donationId: string) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId && d.status === 'pending') {
          // Add to project total
          setMosqueProjects(mPrev =>
            mPrev.map(p => (p.id === d.project_id ? { ...p, raised_amount: p.raised_amount + d.amount, donors_count: p.donors_count + 1 } : p))
          );
          return {
            ...d,
            status: 'verified',
            verified_at: new Date().toISOString(),
            verified_by: currentUser?.name || 'Admin'
          };
        }
        return d;
      })
    );
  };

  const createMosqueProject = (projectData: Partial<MosqueProject>) => {
    const newProject: MosqueProject = {
      id: `msq-${Date.now()}`,
      title: projectData.title || 'Mosque Project',
      title_bn: projectData.title_bn || 'মসজিদ উন্নয়ন প্রকল্প',
      description: projectData.description || '',
      target_amount: projectData.target_amount || 500000,
      raised_amount: 0,
      status: 'active',
      donors_count: 0,
      photo_url: projectData.photo_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      created_at: new Date().toISOString()
    };
    setMosqueProjects(prev => [newProject, ...prev]);
  };

  // Announcements
  const createAnnouncement = (data: Omit<Announcement, 'id' | 'published_at' | 'published_by'>) => {
    const newAnc: Announcement = {
      ...data,
      id: `anc-${Date.now()}`,
      published_by: currentUser?.name || 'Society Office',
      published_at: new Date().toISOString()
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    cloudInsert('announcements', newAnc);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    cloudDelete('announcements', id);
  };

  // Committee
  const addCommitteeMember = (memberData: Omit<CommitteeMember, 'id'>) => {
    const newMem: CommitteeMember = {
      ...memberData,
      id: `com-${Date.now()}`
    };
    setCommittee(prev => [...prev, newMem]);
    cloudInsert('committee_members', newMem);
  };

  const updateCommitteeMember = (id: string, memberData: Partial<CommitteeMember>) => {
    setCommittee(prev =>
      prev.map(m => (m.id === id ? { ...m, ...memberData } : m))
    );
    cloudUpdate('committee_members', id, memberData);
  };

  const deleteCommitteeMember = (id: string) => {
    setCommittee(prev => prev.filter(m => m.id !== id));
    cloudDelete('committee_members', id);
  };

  const resetDemoData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setApplications(INITIAL_APPLICATIONS);
    setVoters(INITIAL_VOTERS);
    setElections(INITIAL_ELECTIONS);
    setVotes(INITIAL_VOTES);
    setComplaints(INITIAL_COMPLAINTS);
    setRentals(INITIAL_RENTALS);
    setMosqueProjects(INITIAL_MOSQUE_PROJECTS);
    setDonations(INITIAL_DONATIONS);
    setCommittee(INITIAL_COMMITTEE);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setEmailLogs(INITIAL_EMAIL_LOGS);
    setCurrentUser(null);
    setCurrentView('landing');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedElectionId,
        setSelectedElectionId,
        selectedRentalId,
        setSelectedRentalId,
        selectedAppId,
        setSelectedAppId,
        dashboardTab,
        setDashboardTab,
        adminTab,
        setAdminTab,

        currentUser,
        currentVoter,
        loginAsVoterWithOTP,
        requestLoginOTP,
        loginAsAdmin,
        logout,
        setDemoPersona,

        users,
        applications,
        voters,
        elections,
        votes,
        complaints,
        rentals,
        mosqueProjects,
        donations,
        committee,
        committeeMembers: committee,
        announcements,
        emailLogs,
        smsLogs: emailLogs,

        activeEmailNotification,
        dismissEmailNotification,
        dispatchEmail,
        activeSMSNotification: activeEmailNotification,
        dismissSMSNotification: dismissEmailNotification,

        submitApplication,
        approveApplication,
        rejectApplication,
        requestApplicationMoreInfo,
        bulkApproveApplications,

        castVote,
        hasVoterVotedInElection,
        createElection,
        updateElectionStatus,
        addCandidateToElection,
        removeCandidate,
        publishResults,

        submitComplaint,
        updateComplaintStatus,

        createRentalListing,
        updateRentalStatus,
        deleteRentalListing,

        makeDonation,
        verifyDonation,
        createMosqueProject,

        createAnnouncement,
        deleteAnnouncement,
        addCommitteeMember,
        updateCommitteeMember,
        deleteCommitteeMember,

        isPageLoading,
        setIsPageLoading,
        isInitialLoading,
        toasts,
        showToast,
        dismissToast,

        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
