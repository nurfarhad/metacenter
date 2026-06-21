import React, { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Image as ImageIcon, 
  Calendar, 
  Send, 
  ChevronRight,
  X,
  Plus,
  Globe,
  MessageCircle,
  Share2,
  ThumbsUp,
  MoreVertical
} from 'lucide-react';
import { MOCK_ACCOUNTS } from '../mockData';
import { Account } from '../types';

export default function Publishing() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [scheduledDate, setScheduledDate] = useState<string>('');

  const toggleAccount = (id: string) => {
    setSelectedAccounts(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const selectedPlatform = MOCK_ACCOUNTS.find(a => selectedAccounts.includes(a.id))?.platform || 'facebook';

  return (
    <div className="flex-1 overflow-hidden" id="publishing-view">
      <div className="h-full flex flex-col md:flex-row">
        {/* Left Column: Creator */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-8">
            <section>
              <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-500" />
                Select Accounts
              </h3>
              <div className="flex flex-wrap gap-3">
                {MOCK_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => toggleAccount(acc.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200 ${
                      selectedAccounts.includes(acc.id)
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                      <img src={acc.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-semibold">{acc.name}</span>
                    {acc.platform === 'facebook' ? (
                      <Facebook className={`w-3.5 h-3.5 ${selectedAccounts.includes(acc.id) ? 'text-white' : 'text-blue-500'}`} />
                    ) : (
                      <Instagram className={`w-3.5 h-3.5 ${selectedAccounts.includes(acc.id) ? 'text-white' : 'text-pink-500'}`} />
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-zinc-100">Content</h3>
                <span className={`text-xs font-mono ${caption.length > 2000 ? 'text-red-500' : 'text-zinc-500'}`}>
                  {caption.length} / 2200
                </span>
              </div>
              <div className="relative">
                <textarea
                  rows={8}
                  placeholder="What's on your mind?..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all resize-none shadow-inner"
                />
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-zinc-100 mb-4">Media</h3>
              <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-12 text-center group hover:border-indigo-600 transition-colors cursor-pointer bg-zinc-900/30">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <ImageIcon className="w-7 h-7 text-zinc-400 group-hover:text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-200 font-semibold text-lg">Add images or video</p>
                    <p className="text-zinc-500 text-sm">Drag & drop or browse your files</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-4 pt-4">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
                <Send className="w-5 h-5" />
                Post Now
              </button>
              <button className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 group">
                <Calendar className="w-5 h-5 text-zinc-500 group-hover:text-indigo-500" />
                Schedule for Later
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="w-full md:w-[450px] bg-zinc-900/50 border-l border-zinc-800 p-8 flex flex-col shrink-0">
          <div className="sticky top-8 space-y-6">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 px-1">
              Live Preview
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            </h3>

            {/* Platform Toggle (Static Preview Type) */}
            <div className="flex bg-zinc-800 p-1 rounded-xl w-fit">
              <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedPlatform === 'facebook' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>
                Facebook
              </button>
              <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedPlatform === 'instagram' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>
                Instagram
              </button>
            </div>

            {/* Mock Platform Card */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-[380px] mx-auto text-slate-900 border border-slate-200 transform scale-100 origin-top transition-all duration-500">
               {/* Facebook Style */}
               {selectedPlatform === 'facebook' ? (
                <>
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                       <img src={MOCK_ACCOUNTS[0].avatar} alt="" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold leading-tight">MetaCenter Agency</h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        Just now <span className="opacity-50">·</span> <Globe className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <X className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="px-3 pb-3">
                    <p className="text-sm whitespace-pre-wrap min-h-[40px]">
                      {caption || "Start typing in the editor to see your post preview here..."}
                    </p>
                  </div>
                  <div className="aspect-video bg-slate-100 flex items-center justify-center border-y border-slate-100">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                  </div>
                  <div className="p-3 border-t border-slate-100 flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <ThumbsUp className="w-4 h-4" /> Like
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <MessageCircle className="w-4 h-4" /> Comment
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <Share2 className="w-4 h-4" /> Share
                    </div>
                  </div>
                </>
               ) : (
                <>
                  {/* IG Style */}
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-100 overflow-hidden">
                        <img src={MOCK_ACCOUNTS[2].avatar} alt="" />
                    </div>
                    <h4 className="text-sm font-bold flex-1 truncate">metacenter_agency</h4>
                    <MoreVertical className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="aspect-square bg-slate-100 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-slate-300" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center gap-4">
                      <ThumbsUp className="w-6 h-6" />
                      <MessageCircle className="w-6 h-6" />
                      <Share2 className="w-6 h-6" />
                    </div>
                    <p className="text-sm leading-tight">
                      <span className="font-bold mr-2 text-slate-900">metacenter_agency</span>
                      <span className="text-slate-800 whitespace-pre-wrap">
                        {caption || "Your Instagram caption will appear here..."}
                      </span>
                    </p>
                  </div>
                </>
               )}
            </div>
            
            <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
              <p className="text-xs text-blue-400 font-medium leading-relaxed">
                Preview is approximate. Final appearance may vary slightly depending on individual user settings and platform updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
