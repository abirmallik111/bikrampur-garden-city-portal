import React from 'react';
import { Building2 } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface PagePreloaderProps {
  message?: string;
}

export const PagePreloader: React.FC<PagePreloaderProps> = ({
  message = 'বিক্রমপুর গার্ডেন সিটি পোর্টাল লোড হচ্ছে...'
}) => {
  return (
    <div className="fixed inset-0 z-[10001] bg-slate-900 flex flex-col items-center justify-center p-6 select-none animate-in fade-in-50 duration-200">
      <div className="flex flex-col items-center space-y-5 text-center max-w-sm">
        {/* Animated Brand Icon */}
        <div className="relative">
          <img
            src="/logo.png"
            alt="Bikrampur Garden City"
            className="w-20 h-20 rounded-full object-contain shadow-2xl animate-pulse bg-white/10 p-1"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-900 flex items-center justify-center">
            <LoadingSpinner size="sm" className="text-emerald-400" />
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Bikrampur Garden City
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            সোসাইটি পোর্টাল ও অনলাইন সেবা
          </p>
        </div>

        {/* Loading Message & Progress Indicator */}
        <div className="space-y-2 pt-2 w-full">
          <div className="h-1 w-48 mx-auto bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400 w-full animate-[shimmer_1.5s_infinite] -translate-x-full" />
          </div>
          <p className="text-[11px] text-slate-500">{message}</p>
        </div>
      </div>
    </div>
  );
};
