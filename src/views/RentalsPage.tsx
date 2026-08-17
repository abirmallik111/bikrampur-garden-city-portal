import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyType, FurnishedType } from '../types';
import {
  Building,
  Search,
  Filter,
  Phone,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Plus,
  ArrowRight,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

export const RentalsPage: React.FC = () => {
  const { rentals, currentUser, currentVoter, setCurrentView, setDashboardTab } = useApp();

  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [maxRent, setMaxRent] = useState<number>(50000);
  const [bedrooms, setBedrooms] = useState<string>('all');
  const [contactedListingId, setContactedListingId] = useState<string | null>(null);

  const activeRentals = rentals.filter(r => r.status === 'active');

  const filteredRentals = activeRentals.filter(r => {
    const matchesSearch =
      r.plot_number.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      (r.building_number && r.building_number.toLowerCase().includes(search.toLowerCase()));

    const matchesType = propertyType === 'all' || r.property_type === propertyType;
    const matchesRent = r.rent_amount <= maxRent;
    const matchesBed = bedrooms === 'all' || r.bedrooms === Number(bedrooms);

    return matchesSearch && matchesType && matchesRent && matchesBed;
  });

  const handlePostAdClick = () => {
    if (currentUser && currentVoter) {
      setDashboardTab('rentals');
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner - Professional Polish */}
      <div className="bg-slate-900 border border-slate-800 text-white p-6 sm:p-10 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-3 py-1 rounded-full text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>সোসাইটি নিজস্ব প্রোপার্টি বোর্ড (Direct Owner To-Let)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            বিক্রমপুর গার্ডেন সিটি টু-লেট ও বাড়ি ভাড়া
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            কোনো মিডিয়া বা ব্রোকারেজ চার্জ ছাড়া সরাসরি প্লট ও ফ্ল্যাট মালিকদের অনুমোদিত ভাড়া বিজ্ঞাপনসমূহ।
          </p>
        </div>

        <button
          onClick={handlePostAdClick}
          className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ভাড়ার বিজ্ঞাপন দিন (Post Ad)</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="প্লট নম্বর বা এলাকা দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl font-medium"
            >
              <option value="all">সকল ধরন (All Types)</option>
              <option value="apartment">এপার্টমেন্ট (Apartment)</option>
              <option value="flat">ফ্ল্যাট (Flat)</option>
              <option value="portion">ইউনিট (Portion)</option>
              <option value="shop">দোকান / বাণিজ্যিক স্পেস (Shop)</option>
            </select>
          </div>

          <div>
            <select
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl font-medium"
            >
              <option value="all">যেকোনো বেডরুম (Any Bed)</option>
              <option value="2">২ বেডরুম (2 Bed)</option>
              <option value="3">৩ বেডরুম (3 Bed)</option>
              <option value="4">৪ বেডরুম (4 Bed)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-xl border border-slate-300">
            <span className="text-[11px] text-slate-500 whitespace-nowrap">সর্বোচ্চ ভাড়া:</span>
            <span className="font-bold text-slate-900 font-mono">৳{maxRent.toLocaleString('en-BD')}</span>
            <input
              type="range"
              min="10000"
              max="50000"
              step="2000"
              value={maxRent}
              onChange={e => setMaxRent(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-slate-500">
          সক্রিয় বিজ্ঞাপন পাওয়া গেছে: <span className="font-bold text-slate-900">{filteredRentals.length}</span> টি
        </div>

        {filteredRentals.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3 max-w-lg mx-auto my-6">
            <Building className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">বর্তমানে কোনো সক্রিয় টু-লেট বা ভাড়ার বিজ্ঞাপন নেই</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              বিক্রমপুর গার্ডেন সিটি সোসাইটির অনুমোদিত ফ্ল্যাট/প্লট মালিকগণ সদস্য ড্যাশবোর্ড থেকে বিজ্ঞাপন পোস্ট করতে পারবেন। এডমিন প্যানেল থেকে অনুমোদনের পর সরাসরি এখানে টু-লেট বিজ্ঞাপন প্রকাশিত হবে।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRentals.map(rental => (
              <div
                key={rental.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                {/* Image & Price Tag */}
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  <img
                    src={rental.photos[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'}
                    alt={rental.description}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#1e3a5f]/90 backdrop-blur-xs text-white font-extrabold text-sm px-3 py-1 rounded-xl shadow-md font-mono">
                    ৳{rental.rent_amount.toLocaleString('en-BD')} <span className="text-[10px] font-normal text-slate-200">/ মাস</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                    {rental.furnished}
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-[#1e3a5f] bg-blue-50 px-2 py-0.5 rounded">
                        {rental.plot_number} {rental.building_number ? `(${rental.building_number})` : ''}
                      </span>
                      <span>উপলব্ধ: {rental.available_from}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">
                      {rental.description}
                    </h3>

                    {/* Facilities Icons */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[#1e3a5f]" />
                        <span>{rental.bedrooms} Bed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[#1e3a5f]" />
                        <span>{rental.bathrooms} Bath</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-[#1e3a5f]" />
                        <span>{rental.size_sqft} Sqft</span>
                      </div>
                    </div>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rental.facilities.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Owner Contact */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {contactedListingId === rental.id ? (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1 animate-in fade-in duration-200">
                        <div className="font-bold text-emerald-950">মালিক: {rental.owner_name}</div>
                        <div className="font-mono font-bold text-emerald-800 text-sm flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          <span>{rental.owner_phone}</span>
                        </div>
                        <div className="text-[10px] text-emerald-700">সোসাইটি অনুমোদিত মালিক</div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setContactedListingId(rental.id)}
                        className="w-full py-2.5 bg-[#1e3a5f] hover:bg-[#152943] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>মালিকের ফোন নম্বর দেখুন (View Phone)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
