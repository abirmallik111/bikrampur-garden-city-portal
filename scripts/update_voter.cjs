const fs = require('fs');
const path = require('path');

const filePath = path.join('d:\\MY_PROJECTS\\bikrampur-garden-city-portal\\src\\views', 'VoterDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Overview Tab - Recent Donations Card
const oldDonationsCard = `{/* Recent Donations */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-teal-600" />
                    <span>মসজিদে আমার দান ও রসিদ (Recent Donations)</span>
                  </h3>
                  <button
                    onClick={() => setDashboardTab('donations')}
                    className="text-xs text-teal-700 font-bold hover:underline"
                  >
                    দান করুন +
                  </button>
                </div>

                {myDonations.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">আপনার কোনো অনুদান নথিভুক্ত নেই।</p>
                ) : (
                  <div className="space-y-3">
                    {myDonations.map(don => (
                      <div key={don.id} className="p-3.5 bg-teal-50/50 rounded-xl border border-teal-100 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{don.project_title}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            রসিদ: {don.receipt_no} • {new Date(don.created_at).toLocaleDateString('bn-BD')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-teal-800 text-sm">৳{don.amount.toLocaleString('en-BD')}</div>
                          <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-semibold capitalize">
                            {don.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>`;

const newDonationsCard = `{/* Mosque Coming Soon */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 text-center">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">মসজিদ উন্নয়ন তহবিল শীঘ্রই চালু হবে</h3>
                <p className="text-xs text-slate-500">অনলাইন ডোনেশন সিস্টেমের কাজ চলছে।</p>
                <div className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">Coming Soon</div>
              </div>`;

content = content.replace(oldDonationsCard, newDonationsCard);

// 2. Tabs Array
content = content.replace(
  `{ id: 'donations', label: \`🕌 মসজিদ দান ও রসিদ (\${myDonations.length})\`, icon: HeartHandshake },`,
  `{ id: 'donations', label: \`🕌 মসজিদ ফান্ড (শীঘ্রই)\`, icon: HeartHandshake },`
);

// 3. Mosque Donations Tab (Lines 911-1076 roughly)
const oldMosqueTabStart = `{/* TAB 5: MOSQUE DONATIONS */}`;
const oldMosqueTabEnd = `{/* TAB 6: DIGITAL PROFILE & ID CARD */}`;

const newMosqueTab = `{/* TAB 5: MOSQUE DONATIONS */}
        {dashboardTab === 'donations' && (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-2xs text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">মসজিদ উন্নয়ন তহবিল শীঘ্রই চালু হবে</h2>
            <p className="text-sm text-slate-500">
              মসজিদের অনলাইন ডোনেশন ও রসিদ সিস্টেমের কারিগরি উন্নয়ন চলমান রয়েছে। 
              শীঘ্রই আপনারা এই ড্যাশবোর্ড থেকে நேரடியாக অনুদান প্রদান এবং ডিজিটাল রসিদ সংগ্রহ করতে পারবেন।
            </p>
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Coming Soon
            </div>
          </div>
        )}

        `;

const startIndex = content.indexOf(oldMosqueTabStart);
const endIndex = content.indexOf(oldMosqueTabEnd);
if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newMosqueTab + content.substring(endIndex);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('VoterDashboard.tsx updated successfully.');
