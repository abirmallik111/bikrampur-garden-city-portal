export type ResidentType = 'plot_owner' | 'building_owner' | 'apartment_owner' | 'tenant';

export type Gender = 'male' | 'female' | 'other';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'more_info';

export type ElectionStatus = 'draft' | 'upcoming' | 'candidate_reg' | 'voting' | 'closed' | 'results_published';

export type ComplaintCategory = 'security' | 'maintenance' | 'noise' | 'cleanliness' | 'utility' | 'other';
export type ComplaintStatus = 'pending' | 'processing' | 'resolved' | 'rejected' | 'new' | 'in_progress' | 'closed';

export type PropertyType = 'apartment' | 'flat' | 'portion' | 'shop';
export type FurnishedType = 'furnished' | 'semi_furnished' | 'unfurnished';
export type ContactPreference = 'phone' | 'whatsapp' | 'email';
export type RentalStatus = 'pending' | 'active' | 'rejected' | 'rented' | 'inactive';

export type MosqueProjectStatus = 'active' | 'completed' | 'cancelled';
export type DonationPaymentMethod = 'cash' | 'online';
export type DonationStatus = 'pending' | 'verified';

export type UserRole = 'super_admin' | 'admin' | 'voter';

export interface User {
  id: string;
  phone: string;
  email?: string;
  password?: string;
  role: UserRole;
  name: string;
  status: 'active' | 'inactive';
  voterId?: string;
  createdAt: string;
}

export interface VoterApplication {
  id: string;
  application_id: string; // e.g., BGC-APP-2026-001
  name_bn: string;
  name_en: string;
  father_name: string;
  gender?: Gender;
  nid_number?: string;
  phone: string;
  email?: string;
  password?: string;
  resident_type: ResidentType;
  plot_number: string;
  building_number?: string;
  floor?: string;
  apartment_number?: string;
  bill_photo_url?: string;
  bill_type?: string;
  profile_photo_url?: string;
  note?: string;
  status: ApplicationStatus;
  admin_remark?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Voter {
  id: string;
  voter_id: string; // e.g. BGC-2026-047
  application_id: string;
  user_id: string;
  name_bn: string;
  name_en: string;
  father_name: string;
  gender?: Gender;
  nid_number?: string;
  phone: string;
  email?: string;
  password?: string;
  resident_type: ResidentType;
  plot_number: string;
  building_number?: string;
  floor?: string;
  apartment_number?: string;
  bill_photo_url?: string;
  profile_photo_url?: string;
  is_active: boolean;
  approved_by: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
}

export interface ElectionPosition {
  id: string;
  election_id: string;
  position_name: string;
  position_name_bn: string;
  sort_order: number;
  max_votes?: number;
}

export interface Candidate {
  id: string;
  election_id: string;
  position_id: string;
  voter_id: string;
  name: string;
  name_bn?: string;
  photo_url: string;
  bio: string;
  phone: string;
  symbol: string;
  vote_count: number;
  created_at: string;
}

export interface Election {
  id: string;
  title: string;
  title_bn?: string;
  description: string;
  candidate_reg_start: string;
  candidate_reg_end: string;
  voting_start: string;
  voting_end: string;
  result_publish_date?: string;
  status: ElectionStatus;
  created_by: string;
  created_at: string;
  positions: ElectionPosition[];
  candidates: Candidate[];
}

export interface Vote {
  id: string;
  election_id: string;
  voter_id: string;
  position_id: string;
  candidate_id: string;
  voted_at: string;
  ip_address?: string;
}

export interface Complaint {
  id: string;
  voter_id: string;
  voter_name: string;
  voter_phone: string;
  plot_info: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  admin_response?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface RentalListing {
  id: string;
  voter_id: string;
  owner_name: string;
  owner_phone: string;
  whatsapp?: string;
  headline?: string;
  property_type: PropertyType;
  plot_number: string;
  building_number?: string;
  floor: string;
  apartment_number: string;
  rent_amount: number;
  service_charge?: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  size_sqft?: number;
  tenant_type?: 'family' | 'bachelor' | 'any' | 'commercial';
  furnished: FurnishedType;
  facilities: string[];
  description: string;
  contact_preference: ContactPreference;
  photos: string[];
  available_from: string;
  status: RentalStatus;
  admin_remark?: string;
  created_at: string;
  updated_at: string;
}

export interface MosqueProject {
  id: string;
  title: string;
  title_bn?: string;
  description: string;
  target_amount: number;
  raised_amount: number;
  status: MosqueProjectStatus;
  donors_count: number;
  photo_url?: string;
  created_at: string;
  completed_at?: string;
}

export interface Donation {
  id: string;
  project_id: string;
  project_title: string;
  voter_id?: string;
  amount: number;
  payment_method: DonationPaymentMethod;
  status: DonationStatus;
  donor_name: string;
  donor_phone: string;
  donor_email?: string;
  notes?: string;
  receipt_no: string;
  verified_by?: string;
  created_at: string;
  verified_at?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  name_bn: string;
  photo_url: string;
  designation: string;
  designation_bn: string;
  phone: string;
  email?: string;
  sort_order: number;
  is_current: boolean;
  tenure: string; // e.g. "আহ্বায়ক কমিটি ২০২৬" / "২০২৪-২০২৬" / "২০২৬-২০২৮"
  since: string;
  plot_number: string;
  committee_type?: 'convening' | 'executive' | 'advisory'; // আহ্বায়ক কমিটি, কার্যনির্বাহী পরিষদ, উপদেষ্টা পরিষদ
  blood_group?: string;
}

export interface Announcement {
  id: string;
  title: string;
  title_bn?: string;
  content: string;
  is_public: boolean;
  category: 'election' | 'general' | 'maintenance' | 'event' | 'notice';
  published_by: string;
  published_at: string;
  important?: boolean;
  attachment_url?: string;
}

export type EmailNotificationType =
  | 'registration_received'
  | 'application_approved'
  | 'application_rejected'
  | 'application_more_info'
  | 'otp'
  | 'vote_confirmation'
  | 'donation_receipt'
  | 'election_reminder'
  | 'announcement';

export interface EmailNotification {
  id: string;
  to_email: string;
  to_name: string;
  recipient_phone?: string;
  from_email: string;
  from_name: string;
  subject: string;
  preview_text: string;
  html_body: string;
  plain_text?: string;
  type: EmailNotificationType;
  sent_at: string;
  status: 'sent' | 'delivered';
  action_url?: string;
  action_label?: string;
  code?: string;
}

// Backward compatibility alias
export type SMSMessage = EmailNotification;

