import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Megaphone, AlertCircle, FileText, Download } from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const { announcements, setCurrentView } = useApp();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'election': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'general': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'notice': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'election': return 'নির্বাচন';
      case 'general': return 'সাধারণ';
      case 'maintenance': return 'রক্ষণাবেক্ষণ';
      case 'event': return 'ইভেন্ট';
      case 'notice': return 'নোটিশ';
      default: return category;
    }
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  const publicAnnouncements = sortedAnnouncements.filter(a => a.is_public);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentView('landing')}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Megaphone className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">নোটিশ বোর্ড (Notice Board)</h1>
              <p className="text-slate-500 mt-1">সোসাইটির সকল গুরুত্বপূর্ণ ঘোষণা ও নোটিশসমূহ</p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {publicAnnouncements.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">বর্তমানে কোনো নতুন নোটিশ নেই</p>
            </div>
          ) : (
            publicAnnouncements.map((notice) => (
              <div 
                key={notice.id} 
                className={`bg-white rounded-2xl border ${notice.important ? 'border-amber-300 shadow-md' : 'border-slate-200 shadow-sm'} p-6 transition-all hover:shadow-md`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(notice.category)}`}>
                        {getCategoryLabel(notice.category)}
                      </span>
                      {notice.important && (
                        <span className="flex items-center text-xs font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          জরুরী
                        </span>
                      )}
                      <span className="text-sm text-slate-500 ml-auto md:ml-0 flex items-center">
                        {new Date(notice.published_at).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900">
                      {notice.title_bn || notice.title}
                    </h2>
                    
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {notice.content}
                    </div>
                  </div>

                  {notice.attachment_url && (
                    <div className="pt-4 md:pt-0 md:pl-4 md:border-l border-slate-100 flex flex-col justify-center min-w-[140px]">
                      <a 
                        href={notice.attachment_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>ডাউনলোড</span>
                      </a>
                    </div>
                  )}

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
