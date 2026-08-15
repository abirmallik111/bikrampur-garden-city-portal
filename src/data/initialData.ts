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

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Engr. Rafiqul Islam',
    phone: '01711000001',
    email: 'admin@bikrampurgardencity.com',
    role: 'super_admin',
    status: 'active',
    createdAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'usr-admin-2',
    name: 'Haji Mohammad Selim',
    phone: '01711000002',
    email: 'selim.committee@bikrampurgardencity.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'usr-voter-1',
    name: 'Md. Tariqul Hasan',
    phone: '01712345678',
    email: 'tariqul.bgc@gmail.com',
    role: 'voter',
    voterId: 'BGC-2026-047',
    status: 'active',
    createdAt: '2026-01-10T11:00:00Z',
  },
  {
    id: 'usr-voter-2',
    name: 'Mrs. Farida Yasmin',
    phone: '01819876543',
    email: 'farida.yasmin@yahoo.com',
    role: 'voter',
    voterId: 'BGC-2026-014',
    status: 'active',
    createdAt: '2026-01-12T14:30:00Z',
  },
  {
    id: 'usr-voter-3',
    name: 'Tanvir Ahmed (Tenant)',
    phone: '01912998877',
    email: 'tanvir.dev@gmail.com',
    role: 'voter',
    voterId: 'BGC-2026-089',
    status: 'active',
    createdAt: '2026-01-20T09:15:00Z',
  }
];

export const INITIAL_APPLICATIONS: VoterApplication[] = [
  {
    id: 'app-1',
    application_id: 'BGC-APP-2026-001',
    name_bn: 'মোঃ তরিকুল হাসান',
    name_en: 'Md. Tariqul Hasan',
    father_name: 'মোঃ আবুল কাশেম',
    nid_number: '19882692014567890',
    phone: '01712345678',
    email: 'tariqul.bgc@gmail.com',
    resident_type: 'apartment_owner',
    plot_number: 'Plot-08',
    building_number: 'Building-C',
    floor: '2nd Floor',
    apartment_number: 'C-2B',
    bill_photo_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    bill_type: 'Electricity (DESCO)',
    note: 'Living in Bikrampur Garden City since 2018.',
    status: 'approved',
    admin_remark: 'Documents verified with Land Registry and DESCO bill match.',
    reviewed_by: 'usr-admin-1',
    reviewed_at: '2026-01-10T11:00:00Z',
    created_at: '2026-01-08T09:30:00Z',
    updated_at: '2026-01-10T11:00:00Z'
  },
  {
    id: 'app-2',
    application_id: 'BGC-APP-2026-002',
    name_bn: 'মোসাম্মৎ ফরিদা ইয়াসমিন',
    name_en: 'Mrs. Farida Yasmin',
    father_name: 'মোঃ হাবিবুর রহমান',
    nid_number: '19752692014112233',
    phone: '01819876543',
    email: 'farida.yasmin@yahoo.com',
    resident_type: 'building_owner',
    plot_number: 'Plot-14',
    building_number: 'Yasmin Villa (Bldg-14)',
    floor: '4th Floor',
    apartment_number: 'Owner Flat',
    bill_photo_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
    bill_type: 'Titas Gas Bill',
    note: 'Plot owner and self-constructed 6-storied building.',
    status: 'approved',
    admin_remark: 'Ownership deed and RAJUK plan verified.',
    reviewed_by: 'usr-admin-1',
    reviewed_at: '2026-01-12T14:30:00Z',
    created_at: '2026-01-11T12:00:00Z',
    updated_at: '2026-01-12T14:30:00Z'
  },
  {
    id: 'app-3',
    application_id: 'BGC-APP-2026-003',
    name_bn: 'তানভীর আহমেদ',
    name_en: 'Tanvir Ahmed',
    father_name: 'আব্দুস সাত্তার',
    nid_number: '19952692014887766',
    phone: '01912998877',
    email: 'tanvir.dev@gmail.com',
    resident_type: 'tenant',
    plot_number: 'Plot-22',
    building_number: 'Garden View Tower',
    floor: '3rd Floor',
    apartment_number: '3A',
    bill_photo_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    bill_type: 'Rental Agreement & Utility',
    note: 'Tenant under Building Owner Mr. Golam Mostafa.',
    status: 'approved',
    admin_remark: 'Tenant agreement copy verified with Owner.',
    reviewed_by: 'usr-admin-2',
    reviewed_at: '2026-01-20T09:15:00Z',
    created_at: '2026-01-19T16:20:00Z',
    updated_at: '2026-01-20T09:15:00Z'
  },
  {
    id: 'app-4',
    application_id: 'BGC-APP-2026-004',
    name_bn: 'আরিফুল হক চৌধুরী',
    name_en: 'Ariful Haque Chowdhury',
    father_name: 'মরহুম লুৎফর রহমান চৌধুরী',
    nid_number: '19822692014334455',
    phone: '01715566778',
    email: 'ariful.haque@gmail.com',
    resident_type: 'plot_owner',
    plot_number: 'Plot-31',
    building_number: 'Under Construction (Plot 31)',
    floor: 'Ground',
    apartment_number: 'N/A',
    bill_photo_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    bill_type: 'Dhaka WASA Connection Paper',
    note: 'Original plot allotment holder since 2012.',
    status: 'pending',
    created_at: '2026-08-14T08:10:00Z',
    updated_at: '2026-08-14T08:10:00Z'
  },
  {
    id: 'app-5',
    application_id: 'BGC-APP-2026-005',
    name_bn: 'শাহরিয়ার কবির',
    name_en: 'Shahriar Kabir',
    father_name: 'কবীর হোসেন',
    nid_number: '19902692014665544',
    phone: '01678123456',
    email: 'shahriar.kabir@hotmail.com',
    resident_type: 'apartment_owner',
    plot_number: 'Plot-05',
    building_number: 'Rose Garden Heights',
    floor: '5th Floor',
    apartment_number: '5C',
    bill_photo_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    bill_type: 'Electric Bill',
    note: 'Recently purchased unit 5C.',
    status: 'more_info',
    admin_remark: 'Please upload clearer image of latest DESCO bill with meter number clearly visible.',
    reviewed_by: 'usr-admin-1',
    reviewed_at: '2026-08-14T11:45:00Z',
    created_at: '2026-08-13T10:00:00Z',
    updated_at: '2026-08-14T11:45:00Z'
  }
];

export const INITIAL_VOTERS: Voter[] = [
  {
    id: 'vtr-1',
    voter_id: 'BGC-2026-047',
    application_id: 'app-1',
    user_id: 'usr-voter-1',
    name_bn: 'মোঃ তরিকুল হাসান',
    name_en: 'Md. Tariqul Hasan',
    father_name: 'মোঃ আবুল কাশেম',
    nid_number: '19882692014567890',
    phone: '01712345678',
    email: 'tariqul.bgc@gmail.com',
    resident_type: 'apartment_owner',
    plot_number: 'Plot-08',
    building_number: 'Building-C',
    floor: '2nd Floor',
    apartment_number: 'C-2B',
    bill_photo_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    approved_by: 'usr-admin-1',
    approved_at: '2026-01-10T11:00:00Z',
    created_at: '2026-01-10T11:00:00Z',
    updated_at: '2026-01-10T11:00:00Z'
  },
  {
    id: 'vtr-2',
    voter_id: 'BGC-2026-014',
    application_id: 'app-2',
    user_id: 'usr-voter-2',
    name_bn: 'মোসাম্মৎ ফরিদা ইয়াসমিন',
    name_en: 'Mrs. Farida Yasmin',
    father_name: 'মোঃ হাবিবুর রহমান',
    nid_number: '19752692014112233',
    phone: '01819876543',
    email: 'farida.yasmin@yahoo.com',
    resident_type: 'building_owner',
    plot_number: 'Plot-14',
    building_number: 'Yasmin Villa (Bldg-14)',
    floor: '4th Floor',
    apartment_number: 'Owner Flat',
    bill_photo_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    approved_by: 'usr-admin-1',
    approved_at: '2026-01-12T14:30:00Z',
    created_at: '2026-01-12T14:30:00Z',
    updated_at: '2026-01-12T14:30:00Z'
  },
  {
    id: 'vtr-3',
    voter_id: 'BGC-2026-089',
    application_id: 'app-3',
    user_id: 'usr-voter-3',
    name_bn: 'তানভীর আহমেদ',
    name_en: 'Tanvir Ahmed',
    father_name: 'আব্দুস সাত্তার',
    nid_number: '19952692014887766',
    phone: '01912998877',
    email: 'tanvir.dev@gmail.com',
    resident_type: 'tenant',
    plot_number: 'Plot-22',
    building_number: 'Garden View Tower',
    floor: '3rd Floor',
    apartment_number: '3A',
    bill_photo_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    approved_by: 'usr-admin-2',
    approved_at: '2026-01-20T09:15:00Z',
    created_at: '2026-01-20T09:15:00Z',
    updated_at: '2026-01-20T09:15:00Z'
  },
  {
    id: 'vtr-4',
    voter_id: 'BGC-2026-001',
    application_id: 'app-pre-1',
    user_id: 'usr-admin-1',
    name_bn: 'প্রকৌশলী রফিকুল ইসলাম',
    name_en: 'Engr. Rafiqul Islam',
    father_name: 'মরহুম আজহার আলী',
    nid_number: '19682692014000001',
    phone: '01711000001',
    email: 'admin@bikrampurgardencity.com',
    resident_type: 'building_owner',
    plot_number: 'Plot-01',
    building_number: 'Islam Palace',
    floor: '2nd Floor',
    apartment_number: '2A',
    bill_photo_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    approved_by: 'SYSTEM',
    approved_at: '2026-01-01T10:00:00Z',
    created_at: '2026-01-01T10:00:00Z',
    updated_at: '2026-01-01T10:00:00Z'
  },
  {
    id: 'vtr-5',
    voter_id: 'BGC-2026-002',
    application_id: 'app-pre-2',
    user_id: 'usr-admin-2',
    name_bn: 'হাজী মোহাম্মদ সেলিম',
    name_en: 'Haji Mohammad Selim',
    father_name: 'হাজী বোরহান উদ্দিন',
    nid_number: '19702692014000002',
    phone: '01711000002',
    email: 'selim.committee@bikrampurgardencity.com',
    resident_type: 'plot_owner',
    plot_number: 'Plot-04',
    building_number: 'Selim Villa',
    floor: '1st Floor',
    apartment_number: '1A',
    bill_photo_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    approved_by: 'SYSTEM',
    approved_at: '2026-01-05T10:00:00Z',
    created_at: '2026-01-05T10:00:00Z',
    updated_at: '2026-01-05T10:00:00Z'
  },
  {
    id: 'vtr-6',
    voter_id: 'BGC-2026-019',
    application_id: 'app-pre-3',
    user_id: 'usr-voter-6',
    name_bn: 'ড. মোস্তাফিজুর রহমান',
    name_en: 'Dr. Mostafizur Rahman',
    father_name: 'আব্দুর রাজ্জাক',
    nid_number: '19722692014000019',
    phone: '01718990011',
    email: 'mostafiz.dr@gmail.com',
    resident_type: 'apartment_owner',
    plot_number: 'Plot-19',
    building_number: 'Shapla Bhaban',
    floor: '4th Floor',
    apartment_number: '4B',
    bill_photo_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    approved_by: 'usr-admin-1',
    approved_at: '2026-01-15T10:00:00Z',
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'vtr-7',
    voter_id: 'BGC-2026-025',
    application_id: 'app-pre-4',
    user_id: 'usr-voter-7',
    name_bn: 'এডভোকেট মোঃ কামরুজ্জামান',
    name_en: 'Adv. Md. Kamruzzaman',
    father_name: 'মরহুম রিয়াজ উদ্দিন',
    nid_number: '19802692014000025',
    phone: '01815667788',
    email: 'kamruzzaman.law@gmail.com',
    resident_type: 'building_owner',
    plot_number: 'Plot-25',
    building_number: 'Zaman Heights',
    floor: '3rd Floor',
    apartment_number: '3A',
    bill_photo_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    approved_by: 'usr-admin-1',
    approved_at: '2026-01-16T12:00:00Z',
    created_at: '2026-01-16T12:00:00Z',
    updated_at: '2026-01-16T12:00:00Z'
  }
];

export const INITIAL_ELECTIONS: Election[] = [
  {
    id: 'el-2026',
    title: 'Bikrampur Garden City Executive Committee Election 2026',
    title_bn: 'বিক্রমপুর গার্ডেন সিটি কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬',
    description: 'General Election for the tenure 2026–2028 for Bikrampur Garden City Residential Society, 442 Dholaipar, Dhaka.',
    candidate_reg_start: '2026-07-01T00:00:00Z',
    candidate_reg_end: '2026-07-20T23:59:59Z',
    voting_start: '2026-08-01T08:00:00Z',
    voting_end: '2026-08-25T18:00:00Z',
    result_publish_date: '2026-08-26T10:00:00Z',
    status: 'voting', // Currently LIVE voting period!
    created_by: 'usr-admin-1',
    created_at: '2026-06-15T10:00:00Z',
    positions: [
      {
        id: 'pos-1',
        election_id: 'el-2026',
        position_name: 'President',
        position_name_bn: 'সভাপতি',
        sort_order: 1
      },
      {
        id: 'pos-2',
        election_id: 'el-2026',
        position_name: 'General Secretary',
        position_name_bn: 'সাধারণ সম্পাদক',
        sort_order: 2
      },
      {
        id: 'pos-3',
        election_id: 'el-2026',
        position_name: 'Treasurer',
        position_name_bn: 'কোষাধ্যক্ষ',
        sort_order: 3
      },
      {
        id: 'pos-4',
        election_id: 'el-2026',
        position_name: 'Organizing Secretary',
        position_name_bn: 'সাংগঠনিক সম্পাদক',
        sort_order: 4
      }
    ],
    candidates: [
      {
        id: 'cand-1',
        election_id: 'el-2026',
        position_id: 'pos-1',
        voter_id: 'vtr-4',
        name: 'Engr. Rafiqul Islam',
        name_bn: 'প্রকৌশলী রফিকুল ইসলাম',
        photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: 'Serving Bikrampur Garden City since 2015. Focus: 24/7 Deep Tube-well water security, complete paved road network, and CCTV surveillance overhaul.',
        phone: '01711000001',
        symbol: 'ছাতা (Umbrella) ☂️',
        vote_count: 142,
        created_at: '2026-07-05T10:00:00Z'
      },
      {
        id: 'cand-2',
        election_id: 'el-2026',
        position_id: 'pos-1',
        voter_id: 'vtr-5',
        name: 'Haji Mohammad Selim',
        name_bn: 'হাজী মোহাম্মদ সেলিম',
        photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        bio: 'Dedicated community leader. Vision: High-speed fiber network for all buildings, green park beautification, and zero security lapses.',
        phone: '01711000002',
        symbol: 'দেয়াল ঘড়ি (Wall Clock) ⏰',
        vote_count: 128,
        created_at: '2026-07-06T11:00:00Z'
      },
      {
        id: 'cand-3',
        election_id: 'el-2026',
        position_id: 'pos-2',
        voter_id: 'vtr-7',
        name: 'Adv. Md. Kamruzzaman',
        name_bn: 'এডভোকেট মোঃ কামরুজ্জামান',
        photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        bio: 'Legal advisor for RAJUK land demarcation. Commitment: 100% digital transparency in society accounting and prompt complaint resolution within 48 hours.',
        phone: '01815667788',
        symbol: 'গোলাপ ফুল (Rose) 🌹',
        vote_count: 156,
        created_at: '2026-07-08T09:30:00Z'
      },
      {
        id: 'cand-4',
        election_id: 'el-2026',
        position_id: 'pos-2',
        voter_id: 'vtr-1',
        name: 'Md. Tariqul Hasan',
        name_bn: 'মোঃ তরিকুল হাসান',
        photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        bio: 'Young dynamic resident representing apartment owners. Modernizing society waste management, youth sports facility, and online rental verification portal.',
        phone: '01712345678',
        symbol: 'বই (Book) 📖',
        vote_count: 114,
        created_at: '2026-07-10T14:00:00Z'
      },
      {
        id: 'cand-5',
        election_id: 'el-2026',
        position_id: 'pos-3',
        voter_id: 'vtr-6',
        name: 'Dr. Mostafizur Rahman',
        name_bn: 'ড. মোস্তাফিজুর রহমান',
        photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: 'Renowned academician and financial auditor. Pledge: Published monthly financial balance sheets and digital bank reconciliation for every paisa.',
        phone: '01718990011',
        symbol: 'কলম (Pen) ✒️',
        vote_count: 165,
        created_at: '2026-07-11T16:00:00Z'
      },
      {
        id: 'cand-6',
        election_id: 'el-2026',
        position_id: 'pos-3',
        voter_id: 'vtr-2',
        name: 'Mrs. Farida Yasmin',
        name_bn: 'মোসাম্মৎ ফরিদা ইয়াসমিন',
        photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        bio: 'Long-term building owner. Ensuring disciplined society maintenance collection, emergency fund reserves, and welfare grants for estate staff.',
        phone: '01819876543',
        symbol: 'প্রদীপ (Lamp) 🪔',
        vote_count: 105,
        created_at: '2026-07-12T10:30:00Z'
      },
      {
        id: 'cand-7',
        election_id: 'el-2026',
        position_id: 'pos-4',
        voter_id: 'vtr-3',
        name: 'Tanvir Ahmed',
        name_bn: 'তানভীর আহমেদ',
        photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        bio: 'Passionate organizer for cultural events, annual sports, community Iftar, and Eid get-togethers for harmonious living.',
        phone: '01912998877',
        symbol: 'মই (Ladder) 🪜',
        vote_count: 139,
        created_at: '2026-07-14T11:20:00Z'
      },
      {
        id: 'cand-8',
        election_id: 'el-2026',
        position_id: 'pos-4',
        voter_id: 'vtr-5',
        name: 'Khandaker Monirul Alam',
        name_bn: 'খন্দকার মনিরুল আলম',
        photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
        bio: 'Community safety volunteer. Expanding perimeter security guards, fire safety drills, and emergency ambulance liaison with Dhaka Medical.',
        phone: '01712889900',
        symbol: 'উড়োজাহাজ (Aeroplane) ✈️',
        vote_count: 131,
        created_at: '2026-07-15T15:00:00Z'
      }
    ]
  }
];

export const INITIAL_VOTES: Vote[] = [
  // Presaved votes to give live stats
  {
    id: 'vt-1',
    election_id: 'el-2026',
    voter_id: 'vtr-2',
    position_id: 'pos-1',
    candidate_id: 'cand-1',
    voted_at: '2026-08-05T09:12:00Z'
  },
  {
    id: 'vt-2',
    election_id: 'el-2026',
    voter_id: 'vtr-2',
    position_id: 'pos-2',
    candidate_id: 'cand-3',
    voted_at: '2026-08-05T09:12:00Z'
  },
  {
    id: 'vt-3',
    election_id: 'el-2026',
    voter_id: 'vtr-2',
    position_id: 'pos-3',
    candidate_id: 'cand-5',
    voted_at: '2026-08-05T09:12:00Z'
  },
  {
    id: 'vt-4',
    election_id: 'el-2026',
    voter_id: 'vtr-2',
    position_id: 'pos-4',
    candidate_id: 'cand-7',
    voted_at: '2026-08-05T09:12:00Z'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'cmp-1',
    voter_id: 'vtr-1',
    voter_name: 'Md. Tariqul Hasan',
    voter_phone: '01712345678',
    plot_info: 'Plot-08, Building-C',
    title: 'Street light not functioning near Road 3 Corner',
    description: 'The high-mast LED light pole at the intersection of Road 3 and 4 near Plot 08 has been flickering and went completely off since Wednesday. Causes safety hazard at night.',
    category: 'maintenance',
    status: 'in_progress',
    admin_response: 'Electrician team assigned. Bulb replacement scheduled for tonight by 8 PM.',
    assigned_to: 'usr-admin-1',
    created_at: '2026-08-12T10:30:00Z',
    updated_at: '2026-08-13T09:00:00Z'
  },
  {
    id: 'cmp-2',
    voter_id: 'vtr-2',
    voter_name: 'Mrs. Farida Yasmin',
    voter_phone: '01819876543',
    plot_info: 'Plot-14, Yasmin Villa',
    title: 'Late night loud construction noise from adjacent vacant plot',
    description: 'Excavator and cement truck unloading noise continues past 11:30 PM at Plot 15. Disturbing elderly residents and school-going children.',
    category: 'noise',
    status: 'resolved',
    admin_response: 'Society security officer served formal warning to contractor. Strict cut-off time enforced at 8:00 PM.',
    assigned_to: 'usr-admin-2',
    created_at: '2026-08-09T18:15:00Z',
    updated_at: '2026-08-10T14:20:00Z'
  },
  {
    id: 'cmp-3',
    voter_id: 'vtr-3',
    voter_name: 'Tanvir Ahmed',
    voter_phone: '01912998877',
    plot_info: 'Plot-22, Garden View Tower',
    title: 'Garbage collection van missing morning round',
    description: 'City corporation / society contracted waste van did not arrive for 2 consecutive days on Sector 2 lane.',
    category: 'cleanliness',
    status: 'new',
    created_at: '2026-08-14T07:45:00Z',
    updated_at: '2026-08-14T07:45:00Z'
  }
];

export const INITIAL_RENTALS: RentalListing[] = [
  {
    id: 'rnt-1',
    voter_id: 'vtr-1',
    owner_name: 'Md. Tariqul Hasan',
    owner_phone: '01712345678',
    property_type: 'apartment',
    plot_number: 'Plot-08',
    building_number: 'Building-C (Green Orchid)',
    floor: '4th Floor',
    apartment_number: '4B',
    rent_amount: 24000,
    bedrooms: 3,
    bathrooms: 3,
    size_sqft: 1450,
    furnished: 'semi_furnished',
    facilities: ['Lift / Elevator', 'Generator Backup (24/7)', 'Car Parking', 'CCTV Security', 'Titas Gas Line', 'WASA Water', 'Balcony (3)'],
    description: 'South-facing, well-ventilated 3-bed modern apartment with master bed attached bath, servant toilet, drawing-dining, and kitchen with cabinet.',
    contact_preference: 'phone',
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    available_from: '2026-09-01',
    status: 'active',
    created_at: '2026-08-10T12:00:00Z',
    updated_at: '2026-08-10T12:00:00Z'
  },
  {
    id: 'rnt-2',
    voter_id: 'vtr-2',
    owner_name: 'Mrs. Farida Yasmin',
    owner_phone: '01819876543',
    property_type: 'apartment',
    plot_number: 'Plot-14',
    building_number: 'Yasmin Villa',
    floor: '3rd Floor',
    apartment_number: '3A',
    rent_amount: 19500,
    bedrooms: 2,
    bathrooms: 2,
    size_sqft: 1100,
    furnished: 'unfurnished',
    facilities: ['Lift / Elevator', 'CCTV Security', 'Prepaid Electricity Meter', 'Deep Tubewell Water', '2 Balconies'],
    description: 'Family flat suitable for small family. Very close to society Central Mosque and Dhaka-Mawa Highway access gate.',
    contact_preference: 'whatsapp',
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
    ],
    available_from: '2026-08-20',
    status: 'active',
    created_at: '2026-08-08T15:30:00Z',
    updated_at: '2026-08-08T15:30:00Z'
  },
  {
    id: 'rnt-3',
    voter_id: 'vtr-4',
    owner_name: 'Engr. Rafiqul Islam',
    owner_phone: '01711000001',
    property_type: 'flat',
    plot_number: 'Plot-01',
    building_number: 'Islam Palace',
    floor: '5th Floor',
    apartment_number: '5A',
    rent_amount: 32000,
    bedrooms: 4,
    bathrooms: 3,
    size_sqft: 1850,
    furnished: 'furnished',
    facilities: ['Lift / Elevator', 'Generator Backup', 'Dedicated Car Parking', '24/7 Security Guard', 'Solar System', 'Rooftop Garden Access'],
    description: 'Luxurious 4-bedroom executive suite with imported tiles, premium sanitary fittings, and panoramic view of Padma Bridge link road.',
    contact_preference: 'phone',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80'
    ],
    available_from: '2026-09-15',
    status: 'active',
    created_at: '2026-08-05T09:00:00Z',
    updated_at: '2026-08-05T09:00:00Z'
  }
];

export const INITIAL_MOSQUE_PROJECTS: MosqueProject[] = [
  {
    id: 'msq-1',
    title: 'Central Jame Masjid 4th Floor & Minar Extension',
    title_bn: 'বিক্রমপুর গার্ডেন সিটি কেন্দ্রীয় জামে মসজিদ ৪র্থ তলা ও মিনার সম্প্রসারণ',
    description: 'Increasing prayer capacity to accommodate 800+ worshippers for Friday Jummah and Taraweeh prayers. Includes sound insulation and decorative dome calligraphy.',
    target_amount: 3500000,
    raised_amount: 2480000,
    status: 'active',
    donors_count: 94,
    photo_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-02-01T00:00:00Z'
  },
  {
    id: 'msq-2',
    title: 'Modern Wudu Khana & Solar Power Plant',
    title_bn: 'আধুনিক ওজুখানা ও সৌরবিদ্যুৎ সংযোগ প্রকল্প',
    description: '30-person automated water-saving Wudu facility, elderly seating taps, and a 15kW grid-tied rooftop solar panel system to eliminate electricity utility bills.',
    target_amount: 1200000,
    raised_amount: 890000,
    status: 'active',
    donors_count: 58,
    photo_url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-04-10T00:00:00Z'
  },
  {
    id: 'msq-3',
    title: 'Air Conditioning System (Ground & 1st Floor)',
    title_bn: 'কেন্দ্রীয় মসজিদ শীতাতপ নিয়ন্ত্রণ (এসি) স্থাপন',
    description: 'Installation of 8 units of 5-Ton inverter ceiling cassette ACs for prayer halls. Project completed and operational.',
    target_amount: 850000,
    raised_amount: 850000,
    status: 'completed',
    donors_count: 42,
    photo_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    created_at: '2025-08-01T00:00:00Z',
    completed_at: '2025-11-20T00:00:00Z'
  }
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'don-1',
    project_id: 'msq-1',
    project_title: 'Central Jame Masjid 4th Floor & Minar Extension',
    voter_id: 'vtr-1',
    donor_name: 'Md. Tariqul Hasan',
    donor_phone: '01712345678',
    amount: 50000,
    payment_method: 'online',
    status: 'verified',
    notes: 'For concrete casting of 4th floor roof.',
    receipt_no: 'BGC-DON-2026-081',
    verified_by: 'usr-admin-1',
    created_at: '2026-07-25T14:30:00Z',
    verified_at: '2026-07-25T15:00:00Z'
  },
  {
    id: 'don-2',
    project_id: 'msq-1',
    project_title: 'Central Jame Masjid 4th Floor & Minar Extension',
    voter_id: 'vtr-2',
    donor_name: 'Mrs. Farida Yasmin',
    donor_phone: '01819876543',
    amount: 100000,
    payment_method: 'cash',
    status: 'verified',
    notes: 'In memory of Late Habibur Rahman.',
    receipt_no: 'BGC-DON-2026-042',
    verified_by: 'usr-admin-2',
    created_at: '2026-06-12T11:00:00Z',
    verified_at: '2026-06-12T12:30:00Z'
  },
  {
    id: 'don-3',
    project_id: 'msq-2',
    project_title: 'Modern Wudu Khana & Solar Power Plant',
    donor_name: 'Anonymous Resident (Plot-19)',
    donor_phone: '01718990011',
    amount: 25000,
    payment_method: 'online',
    status: 'verified',
    receipt_no: 'BGC-DON-2026-099',
    verified_by: 'usr-admin-1',
    created_at: '2026-08-02T16:20:00Z',
    verified_at: '2026-08-02T17:00:00Z'
  }
];

export const INITIAL_COMMITTEE: CommitteeMember[] = [
  {
    id: 'com-1',
    name: 'Engr. Rafiqul Islam',
    name_bn: 'প্রকৌশলী রফিকুল ইসলাম',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    designation: 'President',
    designation_bn: 'সভাপতি',
    phone: '01711000001',
    email: 'president@bikrampurgardencity.com',
    sort_order: 1,
    is_current: true,
    tenure: '2024-2026',
    since: '2016',
    plot_number: 'Plot-01'
  },
  {
    id: 'com-2',
    name: 'Haji Mohammad Selim',
    name_bn: 'হাজী মোহাম্মদ সেলিম',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    designation: 'Vice President',
    designation_bn: 'সহ-সভাপতি',
    phone: '01711000002',
    email: 'vp.selim@bikrampurgardencity.com',
    sort_order: 2,
    is_current: true,
    tenure: '2024-2026',
    since: '2014',
    plot_number: 'Plot-04'
  },
  {
    id: 'com-3',
    name: 'Adv. Md. Kamruzzaman',
    name_bn: 'এডভোকেট মোঃ কামরুজ্জামান',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    designation: 'General Secretary',
    designation_bn: 'সাধারণ সম্পাদক',
    phone: '01815667788',
    email: 'gs.zaman@bikrampurgardencity.com',
    sort_order: 3,
    is_current: true,
    tenure: '2024-2026',
    since: '2018',
    plot_number: 'Plot-25'
  },
  {
    id: 'com-4',
    name: 'Dr. Mostafizur Rahman',
    name_bn: 'ড. মোস্তাফিজুর রহমান',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    designation: 'Treasurer',
    designation_bn: 'কোষাধ্যক্ষ',
    phone: '01718990011',
    email: 'treasurer@bikrampurgardencity.com',
    sort_order: 4,
    is_current: true,
    tenure: '2024-2026',
    since: '2019',
    plot_number: 'Plot-19'
  },
  {
    id: 'com-5',
    name: 'Khandaker Monirul Alam',
    name_bn: 'খন্দকার মনিরুল আলম',
    photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    designation: 'Organizing Secretary',
    designation_bn: 'সাংগঠনিক সম্পাদক',
    phone: '01712889900',
    email: 'organizing@bikrampurgardencity.com',
    sort_order: 5,
    is_current: true,
    tenure: '2024-2026',
    since: '2020',
    plot_number: 'Plot-11'
  },
  {
    id: 'com-6',
    name: 'Mrs. Farida Yasmin',
    name_bn: 'মোসাম্মৎ ফরিদা ইয়াসমিন',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    designation: 'Executive Member',
    designation_bn: 'কার্যনির্বাহী সদস্য',
    phone: '01819876543',
    email: 'farida.member@bikrampurgardencity.com',
    sort_order: 6,
    is_current: true,
    tenure: '2024-2026',
    since: '2015',
    plot_number: 'Plot-14'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Bikrampur Garden City General Election 2026 - Voting is Now Active!',
    title_bn: 'বিক্রমপুর গার্ডেন সিটি সাধারণ নির্বাচন ২০২৬ - ভোটগ্রহণ চলছে!',
    content: 'All registered voters (Plot Owners, Building Owners, Apartment Owners & Verified Tenants) are cordially requested to cast their digital ballot through their Member Dashboard. Voting remains open till 25th August 2026 6:00 PM.',
    is_public: true,
    category: 'election',
    published_by: 'Election Commission',
    published_at: '2026-08-01T08:00:00Z',
    important: true
  },
  {
    id: 'anc-2',
    title: 'Annual General Meeting (AGM) & Community Feast 2026',
    title_bn: 'বার্ষিক সাধারণ সভা (এজিএম) ও মেজবানি প্রীতিভোজ ২০২৬',
    content: 'The Annual General Meeting of Bikrampur Garden City Society will take place at the Central Mosque Community Hall on 30th August 2026 at 10:00 AM. Society audit reports and development roadmap will be presented.',
    is_public: true,
    category: 'event',
    published_by: 'Executive Committee',
    published_at: '2026-08-10T11:30:00Z',
    important: false
  },
  {
    id: 'anc-3',
    title: 'Scheduled Deep Tube-Well Water Pump Maintenance on Thursday',
    title_bn: 'বৃহস্পতিবার গভীর নলকূপ ও পাম্প হাউজ রুটিন রক্ষণাবেক্ষণ',
    content: 'Please be notified that the main water overhead reservoir line cleaning will take place on Thursday between 1:00 PM and 4:00 PM. Residents are advised to store sufficient water in advance.',
    is_public: true,
    category: 'maintenance',
    published_by: 'Maintenance Sub-Committee',
    published_at: '2026-08-12T09:00:00Z',
    important: true
  }
];

export const INITIAL_EMAIL_LOGS: EmailNotification[] = [
  {
    id: 'eml-1',
    to_email: 'tariqul.bgc@gmail.com',
    to_name: 'Md. Tariqul Hasan',
    recipient_phone: '01712345678',
    from_email: 'noreply@bikrampurgardencity.com',
    from_name: 'Bikrampur Garden City Society Portal',
    subject: '[Bikrampur Garden City] ভোটার নিবন্ধন আবেদন গৃহীত হয়েছে — BGC-APP-2026-001',
    preview_text: 'আপনার ভোটার আবেদন BGC-APP-2026-001 সফলভাবে সিস্টেমে গৃহীত হয়েছে...',
    html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
      <h2 style="color: #0f172a;">সম্মানিত মোঃ তরিকুল হাসান,</h2>
      <p>বিক্রমপুর গার্ডেন সিটি সোসাইটি পোর্টালে আপনার ভোটার নিবন্ধন আবেদন (<strong>BGC-APP-2026-001</strong>) সফলভাবে জমা হয়েছে।</p>
      <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p style="margin: 0;"><strong>প্লট নম্বর:</strong> Plot-08, Building-C, Unit: C-2B</p>
        <p style="margin: 5px 0 0 0;"><strong>আবেদনের ধরন:</strong> ফ্ল্যাট মালিক (Apartment Owner)</p>
      </div>
      <p>সোসাইটি নির্বাচন কমিশন আপনার দাখিলকৃত বিদ্যুৎ বিল ও ঠিকানা যাচাই সম্পন্ন করে ভোটার আইডি অনুমোদনের আপডেট ইমেইলে পাঠিয়ে দেবে।</p>
      <p style="color: #64748b; font-size: 12px; margin-top: 20px;">নির্বাচন পরিচালনা উপ-কমিটি, বিক্রমপুর গার্ডেন সিটি</p>
    </div>`,
    plain_text: 'আপনার ভোটার আবেদন BGC-APP-2026-001 সফলভাবে সিস্টেমে গৃহীত হয়েছে। যাচাই শেষে পরবর্তী আপডেট জানানো হবে।',
    type: 'registration_received',
    sent_at: '2026-01-08T09:31:00Z',
    status: 'delivered',
    code: 'BGC-APP-2026-001',
    action_label: 'আবেদনের অবস্থা দেখুন',
    action_url: 'status'
  },
  {
    id: 'eml-2',
    to_email: 'tariqul.bgc@gmail.com',
    to_name: 'Md. Tariqul Hasan',
    recipient_phone: '01712345678',
    from_email: 'noreply@bikrampurgardencity.com',
    from_name: 'Bikrampur Garden City Election Commission',
    subject: '[Bikrampur Garden City] অভিনন্দন! আপনার ভোটার আইডি অনুমোদিত — BGC-2026-047',
    preview_text: 'আপনার ভোটার আবেদন অনুমোদিত হয়েছে। স্থায়ী ভোটার আইডি: BGC-2026-047...',
    html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
      <h2 style="color: #059669;">অভিনন্দন মোঃ তরিকুল হাসান!</h2>
      <p>আপনার দাখিলকৃত দলিল ও ইউটিলিটি বিল যাচাই শেষে নির্বাচন কমিশন আপনার ভোটার আবেদন অনুমোদন করেছে।</p>
      <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center;">
        <span style="font-size: 12px; color: #065f46; font-weight: bold;">আপনার স্থায়ী ভোটার আইডি:</span>
        <h1 style="font-family: monospace; font-size: 28px; color: #047857; margin: 5px 0;">BGC-2026-047</h1>
      </div>
      <p>আপনি এখন আপনার ইমেইল বা ফোন নম্বরে পাঠানো ওটিপি দিয়ে ভোটার ড্যাশবোর্ডে প্রবেশ করে <strong>কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬</strong>-এ ডিজিটাল ব্যালটে ভোট দিতে পারবেন।</p>
      <p style="color: #64748b; font-size: 12px; margin-top: 20px;">নির্বাচন কমিশন, বিক্রমপুর গার্ডেন সিটি</p>
    </div>`,
    plain_text: 'অভিনন্দন! আপনার ভোটার আবেদন অনুমোদিত হয়েছে। আপনার ভোটার আইডি: BGC-2026-047।',
    type: 'application_approved',
    sent_at: '2026-01-10T11:01:00Z',
    status: 'delivered',
    code: 'BGC-2026-047',
    action_label: 'ভোটার অ্যাকাউন্টে লগইন',
    action_url: 'login'
  },
  {
    id: 'eml-3',
    to_email: 'farida.yasmin@yahoo.com',
    to_name: 'Mrs. Farida Yasmin',
    recipient_phone: '01819876543',
    from_email: 'noreply@bikrampurgardencity.com',
    from_name: 'Bikrampur Garden City Election Commission',
    subject: '[Bikrampur Garden City] ভোটদান নিশ্চিতকরণ ডিজিটাল রসিদ — কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬',
    preview_text: 'আপনার ডিজিটাল ভোট সফলভাবে এনক্রিপ্ট হয়ে সিস্টেমে নথিভুক্ত হয়েছে...',
    html_body: `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
      <h2 style="color: #0f172a;">ডিজিটাল ভোটদান নিশ্চিতকরণ</h2>
      <p>সম্মানিত ভোটার <strong>Mrs. Farida Yasmin</strong> (ভোটার আইডি: <strong>BGC-2026-014</strong>),</p>
      <p>বিক্রমপুর গার্ডেন সিটি কার্যনির্বাহী পরিষদ নির্বাচন ২০২৬-এ আপনার ভোট সফলভাবে এনক্রিপ্ট হয়ে সিস্টেমে জমা হয়েছে।</p>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p style="margin: 0; font-size: 12px;"><strong>নিরাপত্তা টোকেন (Security Hash):</strong></p>
        <p style="font-family: monospace; font-size: 13px; color: #0284c7; margin: 4px 0 0 0;">BGC-VOTE-HASH-99238472-ENC</p>
        <p style="margin: 8px 0 0 0; font-size: 12px;"><strong>সময়:</strong> 05 August 2026, 03:13 PM</p>
      </div>
      <p style="color: #64748b; font-size: 12px; margin-top: 20px;">ধন্যবাদান্তে, নির্বাচন কমিশন, বিক্রমপুর গার্ডেন সিটি</p>
    </div>`,
    plain_text: 'আপনার ভোট সফলভাবে সংরক্ষিত হয়েছে। নিরাপত্তা টোকেন: BGC-VOTE-HASH-99238472-ENC',
    type: 'vote_confirmation',
    sent_at: '2026-08-05T09:13:00Z',
    status: 'delivered',
    code: 'BGC-VOTE-HASH-99238472-ENC',
    action_label: 'লাইভ ফলাফল দেখুন',
    action_url: 'elections'
  }
];

export const INITIAL_SMS_LOGS = INITIAL_EMAIL_LOGS;

