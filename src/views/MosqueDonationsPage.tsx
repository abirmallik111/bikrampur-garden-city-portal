import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Download,
  Printer,
  ShieldCheck,
  Building,
  DollarSign,
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';

export const MosqueDonationsPage: React.FC = () => {
  const {
    mosqueProjects,
    donations,
    makeDonation,
    currentUser,
    currentVoter
  } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState(mosqueProjects[0]?.id || '');
  const [donorName, setDonorName] = useState(currentVoter?.name_en || 'Md. Ashraful Alam');
  const [donorPhone, setDonorPhone] = useState(currentVoter?.phone || '01712345678');
  const [donorEmail, setDonorEmail] = useState(currentVoter?.email || 'ashraful@bikrampurgardencity.com');
  const [amount, setAmount] = useState<number>(5000);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
  const [notes, setNotes] = useState('');
  const [generatedReceipt, setGeneratedReceipt] = useState<string | null>(null);

  const totalRaisedOverall = donations.reduce((sum, d) => sum + d.amount, 0);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    const res = makeDonation({
      projectId: selectedProjectId,
      amount: Number(amount),
      paymentMethod,
      donorName,
      donorPhone,
      donorEmail,
      notes
    });

    if (res.success) {
      setGeneratedReceipt(res.receiptNo);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Banner - Professional Polish */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 sm:p-10 rounded-2xl shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3.5 py-1 rounded-full text-xs font-semibold">
              <HeartHandshake className="w-4 h-4" />
              <span>সাদাকায়ে জারিয়া (Central Mosque Development Fund)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              বিক্রমপুর গার্ডেন সিটি কেন্দ্রীয় জামে মসজিদ উন্নয়ন তহবিল
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              মসজিদের মিনার নির্মাণ, আধুনিক ওযু ও গোসলখানা, সেন্ট্রাল এসি স্থাপন ও হিফজখানা তহবিলে মুক্তহস্তে দান করুন। আপনার দান সমাজের জন্য স্থায়ী কল্যাণ বয়ে আনবে।
            </p>
          </div>

          {/* Overall Stats Card */}
          <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 text-center lg:text-right shrink-0 space-y-2">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              সর্বমোট সংগৃহীত অনুদান
            </div>
            <div className="font-mono text-3xl font-black text-emerald-400">
              ৳{totalRaisedOverall.toLocaleString('en-BD')}
            </div>
            <div className="text-[11px] text-slate-300">ডিজিটাল ও ক্যাশ ট্রানজেকশন সমন্বিত</div>
          </div>
        </div>
      </div>

      {/* Projects Progress Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">চলমান মসজিদ উন্নয়ন প্রকল্পসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mosqueProjects.map(proj => {
            const percent = Math.min(100, Math.round((proj.collected_amount / proj.target_amount) * 100));

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] bg-teal-50 text-teal-900 font-bold px-2.5 py-1 rounded-full border border-teal-200">
                    উন্নয়ন প্রকল্প
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{proj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-teal-800 font-bold">
                      ৳{proj.collected_amount.toLocaleString('en-BD')}
                    </span>
                    <span className="text-slate-400">
                      লক্ষ্য: ৳{proj.target_amount.toLocaleString('en-BD')}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>{percent}% অর্জিত</span>
                    <button
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="text-teal-700 font-bold hover:underline"
                    >
                      এই ফান্ডে দান করুন →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Donation Form & Honor Wall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">অনলাইনে দান করুন ও তাত্ক্ষণিক রসিদ সংগ্রহ করুন</h3>
            <p className="text-xs text-slate-500">বিকাশ, নগদ, রকেট, কার্ড অথবা ক্যাশ অঙ্গীকার</p>
          </div>

          {generatedReceipt && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 space-y-2 text-xs animate-in zoom-in-95 duration-200">
              <div className="font-bold text-sm flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>আলহামদুলিল্লাহ! অনুদান সফলভাবে সম্পন্ন হয়েছে</span>
              </div>
              <p>রসিদ নম্বর: <strong className="font-mono text-emerald-900">{generatedReceipt}</strong></p>
              <button
                onClick={() => alert(`Official Mosque Donation Slip:\nReceipt: ${generatedReceipt}\nDonor: ${donorName}\nAmount: ৳${amount}\nMosque: Bikrampur Garden City Central Mosque.`)}
                className="text-emerald-800 underline font-bold flex items-center gap-1 pt-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>রসিদ ডাউনলোড করুন</span>
              </button>
            </div>
          )}

          <form onSubmit={handleDonate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">প্রকল্প নির্বাচন:</label>
              <select
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-medium"
              >
                {mosqueProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">দাতার নাম (Donor Name):</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  placeholder="আপনার নাম"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">মোবাইল নম্বর:</label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={e => setDonorPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ইমেইল ঠিকানা (ই-রসিদের জন্য):</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={e => setDonorEmail(e.target.value)}
                  placeholder="donor@example.com"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">অনুদানের পরিমাণ (BDT):</label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[1000, 2000, 5000, 10000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      amount === amt
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ৳{amt.toLocaleString('en-BD')}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-xl font-mono font-bold text-base"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">পেমেন্ট মেথড:</label>
              <div className="grid grid-cols-2 gap-2">
                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer ${
                  paymentMethod === 'online' ? 'bg-teal-50 border-teal-600 font-bold text-teal-900' : 'border-slate-200'
                }`}>
                  <input
                    type="radio"
                    name="mPay"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                  />
                  <span>বিকাশ / নগদ / কার্ড</span>
                </label>
                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer ${
                  paymentMethod === 'cash' ? 'bg-teal-50 border-teal-600 font-bold text-teal-900' : 'border-slate-200'
                }`}>
                  <input
                    type="radio"
                    name="mPay"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <span>ক্যাশ (অফিসে প্রদান)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">দোয়া বা মন্তব্য (ঐচ্ছিক):</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="যেমন: পরিবারের সুস্থতা কামনায়"
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer"
            >
              দান করুন ও রসিদ পান (Donate Now)
            </button>
          </form>
        </div>

        {/* Honor Wall of Recent Donors */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">সম্মানিত দাতাবৃন্দের তালিকা (Recent Donors)</h3>
            <p className="text-xs text-slate-500">আল্লাহ তায়ালা সকলের দানকে কবুল ও উত্তম প্রতিদান দান করুন</p>
          </div>

          <div className="space-y-3">
            {donations.map(don => (
              <div key={don.id} className="p-4 bg-teal-50/40 rounded-2xl border border-teal-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{don.donor_name}</div>
                  <div className="text-[11px] text-slate-500">
                    {don.project_title} • {new Date(don.created_at).toLocaleDateString('bn-BD')}
                  </div>
                  {don.notes && <div className="text-[10px] text-teal-800 italic pt-0.5">"{don.notes}"</div>}
                </div>
                <div className="text-right">
                  <div className="font-bold text-teal-800 text-base font-mono">
                    ৳{don.amount.toLocaleString('en-BD')}
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded capitalize">
                    {don.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
