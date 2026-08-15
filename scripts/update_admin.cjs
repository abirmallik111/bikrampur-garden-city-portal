const fs = require('fs');
const path = require('path');

const filePath = path.join('d:\\MY_PROJECTS\\bikrampur-garden-city-portal\\src\\views', 'AdminPanel.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add context methods
content = content.replace(
  'requestMoreInfoApplication,',
  'requestApplicationMoreInfo,'
);
content = content.replace(
  'setCurrentView\n  } = useApp();',
  `setCurrentView,
    createAnnouncement,
    deleteAnnouncement,
    announcements,
    committee,
    addCommitteeMember,
    deleteCommitteeMember,
    createElection,
    addCandidateToElection,
    removeCandidate
  } = useApp();`
);

// 2. Add state
content = content.replace(
  `  const [complaintReplyText, setComplaintReplyText] = useState('');`,
  `  const [complaintReplyText, setComplaintReplyText] = useState('');

  // Notices state
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', category: 'general', important: false, attachment_url: '' });
  
  // Elections state
  const [showElectionForm, setShowElectionForm] = useState(false);
  const [electionForm, setElectionForm] = useState({ title: '', title_bn: '', description: '', voting_start: '', voting_end: '', status: 'upcoming' as ElectionStatus });
  const [candidateFormOpenFor, setCandidateFormOpenFor] = useState<string | null>(null);
  const [candidateForm, setCandidateForm] = useState({ position_id: '', name: '', name_bn: '', bio: '', symbol: '', phone: '', photo_url: '', voter_id: '' });

  // Committee state
  const [committeeForm, setCommitteeForm] = useState({ name: '', name_bn: '', designation: '', designation_bn: '', phone: '', email: '', plot_number: '', tenure: '', since: '', photo_url: '', sort_order: 0, is_current: true });
`
);

// 3. Tab type
content = content.replace(
  `const [adminTab, setAdminTab] = useState<'applications' | 'voters' | 'elections' | 'complaints' | 'rentals' | 'mosque' | 'emails' | 'analytics'>('applications');`,
  `const [adminTab, setAdminTab] = useState<'applications' | 'voters' | 'elections' | 'complaints' | 'rentals' | 'mosque' | 'emails' | 'analytics' | 'notices' | 'committee_mgmt'>('applications');`
);

// 4. Tab definition
content = content.replace(
  `{ id: 'emails', label: \`✉️ প্রেরিত ইমেইল লগ (\${emailLogs.length})\`, icon: Mail }`,
  `{ id: 'emails', label: \`✉️ প্রেরিত ইমেইল লগ (\${emailLogs.length})\`, icon: Mail },
          { id: 'notices', label: \`🔔 নোটিশ ব্যবস্থাপনা\`, icon: FileText },
          { id: 'committee_mgmt', label: \`👥 কমিটি পরিচালনা\`, icon: Users }`
);

// 5. handleRequestMoreInfo
content = content.replace(
  `requestMoreInfoApplication(appId, reviewRemark)`,
  `requestApplicationMoreInfo(appId, reviewRemark)`
);

// 6. Elections TAB replacement
const oldElectionsTabStart = `{/* TAB 3: ELECTIONS CONTROL */}`;
const oldElectionsTabEnd = `{/* TAB 4: COMPLAINTS DESK */}`;

const newElectionsTab = `{/* TAB 3: ELECTIONS CONTROL */}
      {adminTab === 'elections' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <button onClick={() => setShowElectionForm(!showElectionForm)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold w-full text-left">+ নতুন নির্বাচন তৈরি করুন</button>
            {showElectionForm && (
              <div className="space-y-4 p-4 border rounded-xl bg-slate-50">
                <input placeholder="Title in English" className="w-full p-2 border rounded" value={electionForm.title} onChange={e => setElectionForm({...electionForm, title: e.target.value})} />
                <input placeholder="Title in Bangla" className="w-full p-2 border rounded" value={electionForm.title_bn} onChange={e => setElectionForm({...electionForm, title_bn: e.target.value})} />
                <textarea placeholder="Description" className="w-full p-2 border rounded" value={electionForm.description} onChange={e => setElectionForm({...electionForm, description: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs">Voting Start Date</label>
                    <input type="datetime-local" className="w-full p-2 border rounded" value={electionForm.voting_start} onChange={e => setElectionForm({...electionForm, voting_start: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs">Voting End Date</label>
                    <input type="datetime-local" className="w-full p-2 border rounded" value={electionForm.voting_end} onChange={e => setElectionForm({...electionForm, voting_end: e.target.value})} />
                  </div>
                </div>
                <select className="w-full p-2 border rounded" value={electionForm.status} onChange={e => setElectionForm({...electionForm, status: e.target.value as ElectionStatus})}>
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="voting">Voting</option>
                </select>
                <button onClick={() => { createElection(electionForm); setShowElectionForm(false); }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">তৈরি করুন</button>
              </div>
            )}
          </div>
          {elections.length === 0 && (
            <div className="bg-white p-6 rounded-3xl border text-center">
              কোনো নির্বাচন নেই। নতুন নির্বাচন তৈরি করুন।
            </div>
          )}
          {elections.map(election => (
            <div key={election.id} className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#1e3a5f] text-white font-bold px-2.5 py-0.5 rounded-full capitalize">
                      স্ট্যাটাস: {election.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{election.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-semibold">স্ট্যাটাস পরিবর্তন:</span>
                  <select
                    value={election.status}
                    onChange={e => updateElectionStatus(election.id, e.target.value as ElectionStatus)}
                    className="p-2 border border-slate-300 rounded-xl bg-white font-bold"
                  >
                    <option value="draft">Draft (খসড়া)</option>
                    <option value="nomination">Nomination (মনোনয়ন পর্ব)</option>
                    <option value="voting">Voting (ভোটগ্রহণ চলমান)</option>
                    <option value="ended">Ended (ভোটগ্রহণ সমাপ্ত)</option>
                    <option value="published">Published (চূড়ান্ত ফলাফল প্রকাশিত)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    পদবী ও প্রার্থীর তালিকা
                  </h4>
                  <button onClick={() => setCandidateFormOpenFor(candidateFormOpenFor === election.id ? null : election.id)} className="text-xs font-bold text-blue-600">+ প্রার্থী যোগ করুন</button>
                </div>
                
                {candidateFormOpenFor === election.id && (
                  <div className="p-4 bg-slate-50 rounded-xl border space-y-3">
                    <select className="w-full p-2 border rounded" value={candidateForm.position_id} onChange={e => setCandidateForm({...candidateForm, position_id: e.target.value})}>
                      <option value="">পদ নির্বাচন করুন</option>
                      {election.positions.map(p => <option key={p.id} value={p.id}>{p.position_name_bn}</option>)}
                    </select>
                    <input placeholder="Name English" className="w-full p-2 border rounded" value={candidateForm.name} onChange={e => setCandidateForm({...candidateForm, name: e.target.value})} />
                    <input placeholder="Name Bangla" className="w-full p-2 border rounded" value={candidateForm.name_bn} onChange={e => setCandidateForm({...candidateForm, name_bn: e.target.value})} />
                    <textarea placeholder="Bio" className="w-full p-2 border rounded" value={candidateForm.bio} onChange={e => setCandidateForm({...candidateForm, bio: e.target.value})} />
                    <input placeholder="Symbol (e.g. নৌকা / Boat)" className="w-full p-2 border rounded" value={candidateForm.symbol} onChange={e => setCandidateForm({...candidateForm, symbol: e.target.value})} />
                    <input placeholder="Phone" className="w-full p-2 border rounded" value={candidateForm.phone} onChange={e => setCandidateForm({...candidateForm, phone: e.target.value})} />
                    <input placeholder="Photo URL (Optional)" className="w-full p-2 border rounded" value={candidateForm.photo_url} onChange={e => setCandidateForm({...candidateForm, photo_url: e.target.value})} />
                    <input placeholder="Voter ID (Optional)" className="w-full p-2 border rounded" value={candidateForm.voter_id} onChange={e => setCandidateForm({...candidateForm, voter_id: e.target.value})} />
                    <button onClick={() => { addCandidateToElection(election.id, candidateForm); setCandidateFormOpenFor(null); }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">যোগ করুন</button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {election.positions.map(pos => {
                    const posCandidates = election.candidates.filter(c => c.position_id === pos.id);
                    return (
                      <div key={pos.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-900">{pos.position_name_bn}</span>
                          <span className="text-emerald-700">{posCandidates.length} জন প্রার্থী</span>
                        </div>
                        <div className="space-y-1 text-slate-600">
                          {posCandidates.map(c => (
                            <div key={c.id} className="flex justify-between items-center text-[11px] bg-white p-1.5 rounded border border-slate-100">
                              <span>{c.name_bn || c.name} ({c.symbol})</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-emerald-800">{c.vote_count} ভোট</span>
                                <button onClick={() => removeCandidate(election.id, c.id)} className="text-red-500 font-bold">X</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      `;

const startIndex = content.indexOf(oldElectionsTabStart);
const endIndex = content.indexOf(oldElectionsTabEnd);
content = content.substring(0, startIndex) + newElectionsTab + content.substring(endIndex);


// 7. Add Notices & Committee Tabs at the bottom
const oldEnding = `    </div>
  );
};`;

const newTabs = `      {/* TAB 8: NOTICES */}
      {adminTab === 'notices' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">নোটিশ ব্যবস্থাপনা</h3>
          </div>
          <div className="space-y-4 bg-slate-50 p-4 border rounded-xl">
            <h4 className="font-bold">নতুন নোটিশ তৈরি করুন</h4>
            <input placeholder="Subject/Title" className="w-full p-2 border rounded" value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} />
            <textarea placeholder="Content/Description" className="w-full p-2 border rounded" value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})} />
            <select className="w-full p-2 border rounded" value={noticeForm.category} onChange={e => setNoticeForm({...noticeForm, category: e.target.value})}>
              <option value="general">General</option>
              <option value="election">Election</option>
              <option value="maintenance">Maintenance</option>
              <option value="event">Event</option>
              <option value="notice">Notice</option>
            </select>
            <label className="flex items-center gap-2"><input type="checkbox" checked={noticeForm.important} onChange={e => setNoticeForm({...noticeForm, important: e.target.checked})} /> Important Notice</label>
            <input placeholder="সংযুক্তি লিঙ্ক (ঐচ্ছিক)" className="w-full p-2 border rounded" value={noticeForm.attachment_url} onChange={e => setNoticeForm({...noticeForm, attachment_url: e.target.value})} />
            <button onClick={() => { createAnnouncement({ ...noticeForm, is_public: true, category: noticeForm.category as any }); setNoticeForm({ title: '', content: '', category: 'general', important: false, attachment_url: '' }); alert('Published!'); }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">নোটিশ প্রকাশ করুন</button>
          </div>
          
          <div className="space-y-4">
            {announcements.map(anc => (
              <div key={anc.id} className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{anc.title}</h4>
                  <p className="text-xs text-slate-500">{anc.content.substring(0, 50)}...</p>
                </div>
                <button onClick={() => deleteAnnouncement(anc.id)} className="text-red-500 font-bold px-3 py-1 bg-red-50 rounded">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: COMMITTEE */}
      {adminTab === 'committee_mgmt' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">কমিটি পরিচালনা</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border rounded-xl">
            <h4 className="col-span-2 font-bold">নতুন সদস্য যোগ করুন</h4>
            <input placeholder="Name English" className="w-full p-2 border rounded" value={committeeForm.name} onChange={e => setCommitteeForm({...committeeForm, name: e.target.value})} />
            <input placeholder="Name Bangla" className="w-full p-2 border rounded" value={committeeForm.name_bn} onChange={e => setCommitteeForm({...committeeForm, name_bn: e.target.value})} />
            <input placeholder="Designation English" className="w-full p-2 border rounded" value={committeeForm.designation} onChange={e => setCommitteeForm({...committeeForm, designation: e.target.value})} />
            <input placeholder="Designation Bangla" className="w-full p-2 border rounded" value={committeeForm.designation_bn} onChange={e => setCommitteeForm({...committeeForm, designation_bn: e.target.value})} />
            <input placeholder="Phone" className="w-full p-2 border rounded" value={committeeForm.phone} onChange={e => setCommitteeForm({...committeeForm, phone: e.target.value})} />
            <input placeholder="Email (Optional)" className="w-full p-2 border rounded" value={committeeForm.email} onChange={e => setCommitteeForm({...committeeForm, email: e.target.value})} />
            <input placeholder="Plot Number" className="w-full p-2 border rounded" value={committeeForm.plot_number} onChange={e => setCommitteeForm({...committeeForm, plot_number: e.target.value})} />
            <input placeholder="Tenure (e.g. 2024-2026)" className="w-full p-2 border rounded" value={committeeForm.tenure} onChange={e => setCommitteeForm({...committeeForm, tenure: e.target.value})} />
            <input placeholder="Since (e.g. 2020)" className="w-full p-2 border rounded" value={committeeForm.since} onChange={e => setCommitteeForm({...committeeForm, since: e.target.value})} />
            <input placeholder="Photo URL (Optional)" className="w-full p-2 border rounded" value={committeeForm.photo_url} onChange={e => setCommitteeForm({...committeeForm, photo_url: e.target.value})} />
            <input type="number" placeholder="Sort Order" className="w-full p-2 border rounded" value={committeeForm.sort_order} onChange={e => setCommitteeForm({...committeeForm, sort_order: parseInt(e.target.value) || 0})} />
            <div className="col-span-2">
              <button onClick={() => { addCommitteeMember(committeeForm); setCommitteeForm({ name: '', name_bn: '', designation: '', designation_bn: '', phone: '', email: '', plot_number: '', tenure: '', since: '', photo_url: '', sort_order: 0, is_current: true }); }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">সদস্য যোগ করুন</button>
            </div>
          </div>
          
          <div className="space-y-4">
            {committee.map(c => (
              <div key={c.id} className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{c.name_bn} ({c.designation_bn})</h4>
                  <p className="text-xs text-slate-500">{c.phone} | {c.plot_number}</p>
                </div>
                <button onClick={() => deleteCommitteeMember(c.id)} className="text-red-500 font-bold px-3 py-1 bg-red-50 rounded">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};`;

content = content.replace(oldEnding, newTabs);

fs.writeFileSync(filePath, content, 'utf8');
console.log('AdminPanel.tsx updated successfully.');
