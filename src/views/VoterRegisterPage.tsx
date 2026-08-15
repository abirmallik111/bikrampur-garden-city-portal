import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResidentType } from '../types';
import {
  FileCheck2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Phone,
  Mail,
  FileText,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

export const VoterRegisterPage: React.FC = () => {
  const { submitApplication, setCurrentView, setSelectedAppId } = useApp();

  // Form State
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [residentType, setResidentType] = useState<ResidentType>('apartment_owner');
  const [plotNumber, setPlotNumber] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [billType, setBillType] = useState('DESCO Electricity Bill');
  const [billPhotoUrl, setBillPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  );
  const [note, setNote] = useState('');
  const [declaration, setDeclaration] = useState(false);

  // Status & Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Quick Sample Document presets for easy testing
  const sampleBills = [
    {
      name: 'ডেসকো বিদ্যুৎ বিল (DESCO Bill)',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      type: 'Electricity (DESCO)'
    },
    {
      name: 'ওয়াসা পানি বিল (Dhaka WASA Bill)',
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      type: 'Water (Dhaka WASA)'
    },
    {
      name: 'বাড়ি/ফ্ল্যাট মালিকানা দলিল (Deed Paper)',
      url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
      type: 'Land Deed / Registry'
    },
    {
      name: 'ভাড়া চুক্তিপত্র (Rental Agreement)',
      url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
      type: 'Tenant Agreement'
    }
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nameBn.trim() || nameBn.trim().length < 3) {
      errs.nameBn = 'পূর্ণ নাম (বাংলায়) কমপক্ষে ৩ অক্ষরের হতে হবে';
    }
    if (!nameEn.trim() || nameEn.trim().length < 3) {
      errs.nameEn = 'Full Name (English) must be at least 3 characters';
    }
    if (!fatherName.trim() || fatherName.trim().length < 3) {
      errs.fatherName = 'পিতা বা স্বামীর নাম পূরণ আবশ্যক';
    }
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      errs.phone = 'মোবাইল নম্বর আবশ্যক';
    } else if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      errs.phone = 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01712345678)';
    }
    if (nidNumber.trim() && !/^\d{10}$|^\d{13}$|^\d{17}$/.test(nidNumber.trim())) {
      errs.nidNumber = 'এনআইডি নম্বর ১০, ১৩ অথবা ১৭ ডিজিটের হতে হবে';
    }
    if (!plotNumber.trim()) {
      errs.plotNumber = 'প্লট নম্বর আবশ্যক (যেমন: Plot-12)';
    }
    if (!declaration) {
      errs.declaration = 'ঘোষণাপত্রটিতে টিক চিহ্ন প্রদান করতে হবে';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const result = submitApplication({
        name_bn: nameBn,
        name_en: nameEn,
        father_name: fatherName,
        nid_number: nidNumber || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        resident_type: residentType,
        plot_number: plotNumber.trim(),
        building_number: buildingNumber.trim() || undefined,
        floor: floor.trim() || undefined,
        apartment_number: apartmentNumber.trim() || undefined,
        bill_photo_url: billPhotoUrl,
        bill_type: billType,
        note: note.trim() || undefined
      });

      setIsSubmitting(false);

      if (result.success && result.application_id) {
        setSubmittedAppId(result.application_id);
      } else {
        setErrors({ form: result.message });
      }
    }, 600);
  };

  const copyAppId = () => {
    if (submittedAppId) {
      navigator.clipboard.writeText(submittedAppId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Success Confirmation Screen
  if (submittedAppId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              আবেদন সফলভাবে গৃহীত হয়েছে
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ভোটার নিবন্ধন আবেদন সম্পন্ন!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              ধন্যবাদ, <span className="font-semibold text-slate-900">{nameEn}</span>। আপনার আবেদনটি সোসাইটি নির্বাচন ও যাচাই কমিটির তালিকায় যুক্ত হয়েছে।
            </p>
          </div>

          {/* Application ID Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              আপনার ট্র্যাকিং অ্যাপ্লিকেশন আইডি (Application ID)
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] tracking-wider">
                {submittedAppId}
              </span>
              <button
                id="copy-app-id-btn"
                onClick={copyAppId}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 transition-colors shadow-2xs"
                title="Copy ID"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              আপনার মোবাইল নম্বর <span className="font-mono font-medium text-slate-700">{phone}</span>-এ একটি নিশ্চিতকরণ SMS পাঠানো হয়েছে।
            </p>
          </div>

          {/* Next Steps Guide */}
          <div className="text-left bg-blue-50/70 p-4 rounded-xl border border-blue-100 space-y-2 text-xs text-blue-950">
            <div className="font-bold flex items-center gap-1.5 text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>পরবর্তী ধাপসমূহ (Workflow):</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
              <li>সোসাইটি এডমিন প্যানেল আপনার আপলোডকৃত বিল ও ঠিকানা যাচাই করবে।</li>
              <li>অনুমোদন সম্পন্ন হওয়া মাত্রই স্বয়ংক্রিয়ভাবে একটি ইউনিক <strong>Voter ID</strong> আপনার ইমেইলে পাঠিয়ে দেওয়া হবে।</li>
              <li>ইমেইলে পাঠানো OTP বা ভোটার আইডি দিয়ে আপনি ভোটার ড্যাশবোর্ডে লগইন করে ভোট প্রদান করতে পারবেন।</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="track-status-now-btn"
              onClick={() => {
                setSelectedAppId(submittedAppId);
                setCurrentView('status');
              }}
              className="flex-1 py-3.5 bg-[#1e3a5f] hover:bg-[#152943] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>আবেদনের অবস্থা ট্র্যাক করুন (Track Status)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="return-home-btn"
              onClick={() => setCurrentView('landing')}
              className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
            >
              হোমপেজে ফিরুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#1976d2] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
          <FileCheck2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>পাবলিক সিটিজেন পোর্টাল (No Login Required)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          সোসাইটি ভোটার নিবন্ধন ফরম ২০২৬
        </h1>
        <p className="text-sm text-slate-200 leading-relaxed">
          বিক্রমপুর গার্ডেন সিটির প্লট মালিক, ভবন মালিক, ফ্ল্যাট মালিক ও ভাড়াটিয়াগণের জন্য ডিজিটাল ভোটার তালিকাভুক্তির আবেদন। সঠিক তথ্য ও বিদ্যুৎ/গ্যাস বিলের কপি সংযুক্ত করুন।
        </p>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8">
        {errors.form && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Section 1: Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-5 h-5 text-[#1e3a5f]" />
            <h2 className="text-base font-bold text-slate-900">১. আবেদনকারীর ব্যক্তিগত তথ্য (Personal Details)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                পূর্ণ নাম (বাংলায়) <span className="text-rose-500">*</span>
              </label>
              <input
                id="name-bn-input"
                type="text"
                value={nameBn}
                onChange={e => setNameBn(e.target.value)}
                placeholder="যেমন: মোঃ আশরাফুল আলম"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 ${
                  errors.nameBn ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-200'
                }`}
              />
              {errors.nameBn && <p className="text-[11px] text-rose-600 mt-1">{errors.nameBn}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name (English) <span className="text-rose-500">*</span>
              </label>
              <input
                id="name-en-input"
                type="text"
                value={nameEn}
                onChange={e => setNameEn(e.target.value)}
                placeholder="e.g. Md. Ashraful Alam"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 ${
                  errors.nameEn ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-200'
                }`}
              />
              {errors.nameEn && <p className="text-[11px] text-rose-600 mt-1">{errors.nameEn}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                পিতা / স্বামীর নাম (Father/Husband Name) <span className="text-rose-500">*</span>
              </label>
              <input
                id="father-name-input"
                type="text"
                value={fatherName}
                onChange={e => setFatherName(e.target.value)}
                placeholder="পিতা অথবা স্বামীর নাম"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 ${
                  errors.fatherName ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-200'
                }`}
              />
              {errors.fatherName && <p className="text-[11px] text-rose-600 mt-1">{errors.fatherName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                জাতীয় পরিচয়পত্র নম্বর (NID Number)
              </label>
              <input
                id="nid-input"
                type="text"
                value={nidNumber}
                onChange={e => setNidNumber(e.target.value)}
                placeholder="১০, ১৩ অথবা ১৭ সংখ্যার NID"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 ${
                  errors.nidNumber ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-200'
                }`}
              />
              {errors.nidNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.nidNumber}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Resident Status */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-5 h-5 text-[#1e3a5f]" />
            <h2 className="text-base font-bold text-slate-900">২. যোগাযোগ ও রেসিডেন্ট ধরন (Contact & Category)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর (Mobile Number) <span className="text-rose-500">*</span>
              </label>
              <input
                id="phone-input"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono focus:outline-hidden focus:ring-2 ${
                  errors.phone ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-200'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              <p className="text-[10px] text-slate-500 mt-0.5">জরুরি প্রয়োজনে যোগাযোগের জন্য</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ইমেইল এড্রেস (Email Address) <span className="text-emerald-600 font-normal">(প্রস্তাবিত)</span>
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-200"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">এই ইমেইলে অনুমোদন নিশ্চিতকরণ ও ভোটার আইডি যাবে</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                রেসিডেন্টের ধরণ (Resident Type) <span className="text-rose-500">*</span>
              </label>
              <select
                id="resident-type-select"
                value={residentType}
                onChange={e => setResidentType(e.target.value as ResidentType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-200 font-medium"
              >
                <option value="apartment_owner">ফ্ল্যাট মালিক (Apartment Owner)</option>
                <option value="building_owner">সম্পূর্ণ ভবন মালিক (Building Owner)</option>
                <option value="plot_owner">প্লট মালিক (Plot Owner)</option>
                <option value="tenant">অনুমোদিত ভাড়াটিয়া (Verified Tenant)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Society Address within Bikrampur Garden City */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building className="w-5 h-5 text-[#1e3a5f]" />
            <h2 className="text-base font-bold text-slate-900">৩. সোসাইটিতে অবস্থানের ঠিকানা (Address in Society)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                প্লট নম্বর (Plot No) <span className="text-rose-500">*</span>
              </label>
              <input
                id="plot-number-input"
                type="text"
                value={plotNumber}
                onChange={e => setPlotNumber(e.target.value)}
                placeholder="যেমন: Plot-12"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 ${
                  errors.plotNumber ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-200'
                }`}
              />
              {errors.plotNumber && <p className="text-[11px] text-rose-600 mt-1">{errors.plotNumber}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ভবনের নাম/নম্বর (Building)
              </label>
              <input
                id="building-number-input"
                type="text"
                value={buildingNumber}
                onChange={e => setBuildingNumber(e.target.value)}
                placeholder="যেমন: Building-B"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                তলা (Floor)
              </label>
              <input
                id="floor-input"
                type="text"
                value={floor}
                onChange={e => setFloor(e.target.value)}
                placeholder="যেমন: 3rd Floor"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ফ্ল্যাট নম্বর (Unit No)
              </label>
              <input
                id="apartment-number-input"
                type="text"
                value={apartmentNumber}
                onChange={e => setApartmentNumber(e.target.value)}
                placeholder="যেমন: 3B"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Utility Bill Verification & Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#1e3a5f]" />
              <h2 className="text-base font-bold text-slate-900">৪. বিদ্যুৎ/গ্যাস/পানি বিলের কপি সংযুক্তিকরণ</h2>
            </div>
            <span className="text-xs text-slate-500">JPG/PNG, Max 5MB</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Bill Preview & Sample Presets */}
            <div className="lg:col-span-6 space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                ফাইল আপলোড করুন অথবা নমুনা থেকে নির্বাচন করুন:
              </label>
              
              <div className="flex items-center gap-2 p-2.5 bg-white border border-slate-300 rounded-xl">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setBillType(file.name);
                      const { uploadFileToStorage } = await import('../lib/supabase');
                      const { url } = await uploadFileToStorage(file, 'bills');
                      if (url) {
                        setBillPhotoUrl(url);
                      }
                    }
                  }}
                  className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {sampleBills.map(sample => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => {
                      setBillPhotoUrl(sample.url);
                      setBillType(sample.type);
                    }}
                    className={`p-2.5 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                      billPhotoUrl === sample.url
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="truncate">{sample.name}</div>
                    <div className="text-[10px] text-slate-400">{sample.type}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  সংযুক্ত ডকুমেন্টের নাম/ধরণ:
                </label>
                <input
                  type="text"
                  value={billType}
                  onChange={e => setBillType(e.target.value)}
                  placeholder="e.g. DESCO Electric Bill"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            {/* Visual Preview Box */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <span>ডকুমেন্ট প্রিভিউ (Bill Preview):</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> সংযুক্ত আছে
                  </span>
                </div>
                <div className="h-44 rounded-xl overflow-hidden bg-slate-200 relative border border-slate-300">
                  <img
                    src={billPhotoUrl}
                    alt="Utility Bill Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
                    {billType}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Note and Declaration */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              অতিরিক্ত মন্তব্য বা তথ্য (Note/Comments - Optional)
            </label>
            <textarea
              id="note-input"
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="সোসাইটি কমিটিকে জানানোর মতো কোনো বিশেষ তথ্য থাকলে লিখুন..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                id="declaration-checkbox"
                type="checkbox"
                checked={declaration}
                onChange={e => setDeclaration(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#1e3a5f] rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 leading-relaxed select-none">
                <strong>ঘোষণাপত্র (Declaration):</strong> আমি নিশ্চিত করছি যে উপরে প্রদত্ত সকল তথ্য ও সংযুক্ত বিদ্যুৎ/গ্যাস বিলের কপি সম্পূর্ণ সত্য ও নির্ভুল। বিক্রমপুর গার্ডেন সিটি সোসাইটির গঠনতন্ত্র মেনে চলার অঙ্গীকার করছি।
              </span>
            </label>
            {errors.declaration && (
              <p className="text-[11px] text-rose-600 pl-7">{errors.declaration}</p>
            )}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setCurrentView('landing')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← ফিরে যান (Cancel)
          </button>

          <button
            id="submit-registration-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1e3a5f] hover:bg-[#152943] text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>যাচাই ও জমা হচ্ছে...</span>
              </>
            ) : (
              <>
                <FileCheck2 className="w-5 h-5 text-emerald-300" />
                <span>ভোটার আবেদন জমা দিন (Submit Application)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
