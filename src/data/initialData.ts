import {
  User,
  VoterApplication,
  Voter,
  Election,
  Vote,
  Complaint,
  RentalListing,
  MosqueProject,
  Donation,
  CommitteeMember,
  Announcement,
  EmailNotification
} from '../types';

/**
 * Clean baseline data for Bikrampur Garden City Society Portal.
 * All dummy records cleared. Only real admin account retained.
 */

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-abir-111',
    name: 'Abir Mallik',
    phone: '01711000000',
    email: 'abirmallik111@gmail.com',
    password: '76922247',
    role: 'super_admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr-admin-abir',
    name: 'Abir Mallik',
    phone: '01700000000',
    email: 'abirmallik11@gmail.com',
    password: '76922247',
    role: 'super_admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr-admin-1',
    name: 'Engr. Md. Rafiqul Islam',
    phone: '01711000001',
    email: 'admin@bikrampurgardencity.com',
    password: 'admin',
    role: 'super_admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  }
];

export const INITIAL_APPLICATIONS: VoterApplication[] = [];
export const INITIAL_VOTERS: Voter[] = [];
export const INITIAL_ELECTIONS: Election[] = [];
export const INITIAL_VOTES: Vote[] = [];
export const INITIAL_COMPLAINTS: Complaint[] = [];
export const INITIAL_RENTALS: RentalListing[] = [];
export const INITIAL_MOSQUE_PROJECTS: MosqueProject[] = [];
export const INITIAL_DONATIONS: Donation[] = [];
export const INITIAL_COMMITTEE: CommitteeMember[] = [];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Welcome to Bikrampur Garden City Digital Portal',
    title_bn: 'বিক্রমপুর গার্ডেন সিটি ডিজিটাল পোর্টালে আপনাকে স্বাগতম',
    content: 'সোসাইটির সকল সম্মানিত সদস্য ও বাসিন্দাদের জন্য ভোটার নিবন্ধন ও ডিজিটাল সেবা পোর্টাল উন্মুক্ত করা হয়েছে। আবেদন করুন এবং পোর্টালের সুবিধা উপভোগ করুন।',
    is_public: true,
    category: 'general',
    published_by: 'Executive Committee',
    published_at: new Date().toISOString(),
    important: true,
    attachment_url: undefined,
  }
];

export const INITIAL_EMAIL_LOGS: EmailNotification[] = [];
export const INITIAL_SMS_LOGS: EmailNotification[] = [];
