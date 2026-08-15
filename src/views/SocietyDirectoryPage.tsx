import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Phone,
  Mail,
  Shield,
  MapPin,
  FileText,
  AlertTriangle,
  Building,
  Flame,
  Droplets,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const SocietyDirectoryPage: React.FC = () => {
  const { committeeMembers } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'committee' | 'emergency' | 'rules'>('committee');

  const emergencyContacts = [
    { name: 'সোসাইটি মেইন সিকিউরিটি গেট ও গার্ড পোস্ট', phone: '01700-112233', icon: Shield, type: 'Security' },
    { name: 'সোসাইটি কন্ট্রোল রুম ও এডমিন অফিস', phone: '01800-445566', icon: Building, type: 'Admin' },
    { name: 'ঢোলাইপাড় পুলিশ ফাঁড়ি / শ্যামপুর থানা', phone: '01713-373155', icon: Shield, type: 'Police' },
    { name: 'যাত্রাবাড়ী ফায়ার সার্ভিস স্টেশন', phone: '02-7541222', icon: Flame, type: 'Fire' },
    { name: 'ঢাকা ওয়াসা (Dhaka WASA MODS Zone-1)', phone: '16162', icon: Droplets, type: 'Water' },
    { name: 'ডেসকো বিদ্যুৎ অভিযোগ কেন্দ্র (DESCO Dholaipar)', phone: '16120', icon: Zap, type: 'Electricity' },
    { name: 'জাতীয় জরুরি সেবা (National Emergency)', phone: '999', icon: AlertTriangle, type: 'Govt 999' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#122842] text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
          <Users className="w-3.5 h-3.5" />
          <span>সোসাইটি ডিরেক্টরি ও যোগাযোগ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          কার্যনির্বাহী পরিষদ ও জরুরি সেবা ডিরেক্টরি
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          বিক্রমপুর গার্ডেন সিটি (৪৪২ ঢোলাইপাড়, ঢাকা-মাওয়া মহাসড়ক)-এর বর্তমান পরিচালনা কমিটি ও স্থানীয় জরুরি সেবাসমূহ।
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('committee')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'committee'
              ? 'border-[#1e3a5f] text-[#1e3a5f] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>বর্তমান কার্যনির্বাহী পরিষদ ২০২৪-২০২৬</span>
        </button>

        <button
          onClick={() => setActiveSubTab('emergency')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'emergency'
              ? 'border-rose-600 text-rose-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Phone className="w-4 h-4 text-rose-600" />
          <span>জরুরি হটলাইন ও ইউটিলিটি</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'rules'
              ? 'border-blue-600 text-blue-800 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>সোসাইটি গঠনতন্ত্র ও নিয়মাবলী</span>
        </button>
      </div>

      {/* SUBTAB 1: COMMITTEE */}
      {activeSubTab === 'committee' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map(member => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-20 h-24 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[11px] bg-blue-50 text-blue-900 font-bold px-2 py-0.5 rounded inline-block">
                    {member.designation_bn}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm truncate">{member.name_bn}</h3>
                  <div className="text-xs text-slate-500 truncate">{member.name}</div>
                  <div className="text-[11px] text-slate-600 font-semibold pt-1">প্লট: {member.plot_number}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-700 font-mono pt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: EMERGENCY */}
      {activeSubTab === 'emergency' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                      {contact.type}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{contact.name}</h4>
                  </div>
                </div>

                <a
                  href={`tel:${contact.phone}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* SUBTAB 3: RULES & CONSTITUTION */}
      {activeSubTab === 'rules' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 text-slate-700 text-xs leading-relaxed">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">বিক্রমপুর গার্ডেন সিটি সোসাইটির গঠনতান্ত্রিক নীতিমালা</h3>
            <p className="text-[11px] text-slate-500">অনুমোদিত সাধারণ সভা ও রাজউক বিধিমালা মোতাবেক</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">১. ভোটার ও সদস্যপদ নীতিমালা</h4>
              <p>সোসাইটির প্রতিটি প্লট ও ভবনের প্রকৃত মালিক বা নিবন্ধিত ফ্ল্যাট মালিক নির্বাচন কার্যক্রমে ভোটাধিকার প্রয়োগ করতে পারবেন। একজন ভোটার শুধুমাত্র একটি ভোট প্রদান করতে পারবেন।</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">২. নিরাপত্তা ও পরিচ্ছন্নতা বিধিনিষেধ</h4>
              <p>সোসাইটির অভ্যন্তরে রাত ১১:০০ টার পর প্রধান গেট ব্যতিত সকল পকেট গেট বন্ধ থাকবে। ময়লা আবর্জনা প্রতিদিন সকাল ৮:০০ থেকে ১০:০০ টার মধ্যে নির্ধারিত ভ্যানে ফেলতে হবে।</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">৩. ভাড়াটিয়া তথ্য ফরম পূরণ বাধ্যবাধকতা</h4>
              <p>যেকোনো নতুন ভাড়াটিয়া উঠার ৭২ ঘণ্টার মধ্যে সোসাইটি কন্ট্রোল রুম ও শ্যামপুর থানায় নির্ধারিত ফরমের মাধ্যমে তথ্য জমা দেওয়া বাধ্যতামূলক।</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
