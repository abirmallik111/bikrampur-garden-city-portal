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
 * All dummy records cleared. Only real Super Admin account retained.
 */

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-abir',
    name: 'Abir Mallik (Super Admin)',
    phone: '01711000000',
    email: 'abirmallik11@gmail.com',
    password: '76922247',
    role: 'super_admin',
    status: 'active',
    createdAt: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'usr-admin-abir-111',
    name: 'Abir Mallik (Super Admin)',
    phone: '01700000000',
    email: 'abirmallik111@gmail.com',
    password: '76922247',
    role: 'super_admin',
    status: 'active',
    createdAt: '2026-08-01T00:00:00.000Z',
  }
];

export const DEFAULT_COMMITTEE_POSITIONS = [
  { id: 'pos-1', position_name: 'President', position_name_bn: 'সভাপতি', sort_order: 1, max_votes: 1, total_seats: 1, description: 'কমিটির সার্বিক নেতৃত্ব ও নীতি নির্ধারণ' },
  { id: 'pos-2', position_name: 'Vice-President', position_name_bn: 'সহ-সভাপতি', sort_order: 2, max_votes: 2, total_seats: 2, description: 'সভাপতির অনুপস্থিতিতে দায়িত্ব পালন ও সহায়তা' },
  { id: 'pos-3', position_name: 'General Secretary', position_name_bn: 'সাধারণ সম্পাদক', sort_order: 3, max_votes: 1, total_seats: 1, description: 'প্রশাসনিক পরিচালনা ও দৈনিক কার্যযোজন' },
  { id: 'pos-4', position_name: 'Joint General Secretary', position_name_bn: 'যুগ্ম সাধারণ সম্পাদক', sort_order: 4, max_votes: 2, total_seats: 2, description: 'সাধারণ সম্পাদককে প্রশাসনিক কাজে সহায়তা' },
  { id: 'pos-5', position_name: 'Organizational Secretary', position_name_bn: 'সাংগঠনিক সম্পাদক', sort_order: 5, max_votes: 1, total_seats: 1, description: 'সদস্যদের ঐক্যবদ্ধ রাখা ও সভার আয়োজন' },
  { id: 'pos-6', position_name: 'Treasurer', position_name_bn: 'অর্থ সম্পাদক / কোষাধ্যক্ষ', sort_order: 6, max_votes: 1, total_seats: 1, description: 'বাজেট, আয়-ব্যয় ও হিসাব পরিচালনা' },
  { id: 'pos-7', position_name: 'Assistant Treasurer', position_name_bn: 'সহ-অর্থ সম্পাদক', sort_order: 7, max_votes: 1, total_seats: 1, description: 'অর্থ সম্পাদককে সহায়তা ও রসিদ ব্যবস্থাপনা' },
  { id: 'pos-8', position_name: 'Office & Publication Secretary', position_name_bn: 'দপ্তর ও প্রচার সম্পাদক', sort_order: 8, max_votes: 1, total_seats: 1, description: 'নোটিশ, ওয়েবসাইট/পোর্টাল ও নথিপত্র ব্যবস্থাপনা' },
  { id: 'pos-9', position_name: 'Legal & Estate Secretary', position_name_bn: 'আইন ও এস্টেট সম্পাদক', sort_order: 9, max_votes: 1, total_seats: 1, description: 'জমির নথিপত্র, রেজিস্ট্রেশন ও আইনি বিষয়' },
  { id: 'pos-10', position_name: 'Security & Environment Secretary', position_name_bn: 'নিরাপত্তা ও পরিবেশ সম্পাদক', sort_order: 10, max_votes: 1, total_seats: 1, description: 'সোসাইটির নিরাপত্তা, পরিচ্ছন্নতা ও সবুজায়ন' },
  { id: 'pos-11', position_name: 'Welfare & Development Secretary', position_name_bn: 'কল্যাণ ও উন্নয়ন সম্পাদক', sort_order: 11, max_votes: 1, total_seats: 1, description: 'অবকাঠামোগত মেরামত ও নিবাসী কল্যাণ' },
  { id: 'pos-12', position_name: 'Executive Member', position_name_bn: 'কার্যনির্বাহী সদস্য', sort_order: 12, max_votes: 6, total_seats: 6, description: 'সিদ্ধান্ত গ্রহণে মতামত ও বিভিন্ন উপকমিটিতে কাজ' }
];

export const INITIAL_APPLICATIONS: VoterApplication[] = [];
export const INITIAL_VOTERS: Voter[] = [];

export const INITIAL_ELECTIONS: Election[] = [
  {
    id: 'el-2026',
    title: 'BIKRAMPUR GARDEN CITY SOCIETY COMMITTEE ELECTION',
    title_bn: 'বিক্রমপুর গার্ডেন সিটি সোসাইটি কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬',
    description: 'সোসাইটির নিবাসী ও ফ্ল্যাট/প্লট মালিকদের দ্বারা কার্যনির্বাহী পরিষদ গঠনের জন্য ডিজিটাল নির্বাচন।',
    candidate_reg_start: '2026-08-01T00:00:00.000Z',
    candidate_reg_end: '2026-08-15T00:00:00.000Z',
    voting_start: '2026-08-16T08:00:00.000Z',
    voting_end: '2026-08-30T18:00:00.000Z',
    status: 'voting',
    created_by: 'admin',
    created_at: '2026-08-01T00:00:00.000Z',
    positions: DEFAULT_COMMITTEE_POSITIONS.map(p => ({
      id: `el-2026-${p.id}`,
      election_id: 'el-2026',
      position_name: p.position_name,
      position_name_bn: `${p.position_name_bn} (${p.total_seats} জন)`,
      sort_order: p.sort_order,
      max_votes: p.max_votes
    })),
    candidates: []
  }
];

export const INITIAL_VOTES: Vote[] = [];
export const INITIAL_COMPLAINTS: Complaint[] = [];
export const INITIAL_RENTALS: RentalListing[] = [];
export const INITIAL_MOSQUE_PROJECTS: MosqueProject[] = [];
export const INITIAL_DONATIONS: Donation[] = [];
export const INITIAL_COMMITTEE: CommitteeMember[] = [];
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [];
export const INITIAL_EMAIL_LOGS: EmailNotification[] = [];
