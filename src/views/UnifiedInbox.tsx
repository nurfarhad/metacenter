import React, { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Search, 
  MoreVertical, 
  Send, 
  Smile, 
  Paperclip, 
  ExternalLink, 
  CheckCheck,
  MessageSquare
} from 'lucide-react';
import { MOCK_THREADS } from '../mockData';
import { Thread, Platform } from '../types';

export default function UnifiedInbox() {
  const [activeTab, setActiveTab] = useState<'all' | 'dm' | 'comment'>('all');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(MOCK_THREADS[0].id);
  const [replyText, setReplyText] = useState('');

  const selectedThread = MOCK_THREADS.find(t => t.id === selectedThreadId);

  const filteredThreads = MOCK_THREADS.filter(t => {
    if (activeTab === 'all') return true;
    return t.type === activeTab;
  });

  const PlatformIcon = ({ platform }: { platform: Platform }) => {
    if (platform === 'facebook') return <Facebook className="w-3 h-3 text-blue-500 fill-blue-500" />;
    return <Instagram className="w-3 h-3 text-pink-500" />;
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-zinc-950" id="unified-inbox">
      {/* Left Pane: Thread List */}
      <div className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-zinc-800 flex gap-2">
          {(['all', 'dm', 'comment'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                activeTab === tab 
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={{ textTransform: 'capitalize' }}
            >
              {tab === 'dm' ? 'DMs' : tab === 'comment' ? 'Comments' : 'All'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredThreads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setSelectedThreadId(thread.id)}
              className={`w-full flex items-start gap-3 p-4 text-left border-b border-zinc-800/50 cursor-pointer transition-colors ${
                selectedThreadId === thread.id 
                  ? 'bg-indigo-600/10 border-l-2 border-indigo-500' 
                  : 'hover:bg-zinc-800 border-l-2 border-transparent'
              }`}
              id={`thread-${thread.id}`}
            >
              <div className="relative shrink-0">
                <img src={thread.user.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-zinc-900" />
                <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-0.5 rounded-full border-2 border-zinc-900">
                  <PlatformIcon platform={thread.platform} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-bold truncate ${selectedThreadId === thread.id ? 'text-zinc-100' : 'text-zinc-300'}`}>
                    {thread.user.name}
                  </h4>
                  <span className="text-[10px] text-zinc-500 uppercase">{thread.timestamp}</span>
                </div>
                <p className={`text-xs truncate ${thread.unread ? 'text-indigo-200 font-medium' : 'text-zinc-500'}`}>
                  {thread.snippet}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${thread.unread ? 'bg-indigo-500' : 'bg-transparent'}`} />
                  <span className={`text-[10px] font-bold tracking-tight uppercase ${thread.unread ? 'text-indigo-400' : 'text-zinc-600'}`}>
                    {thread.unread ? `Unread ${thread.type}` : thread.type}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Pane: Active Conversation */}
      <div className="flex-1 flex flex-col bg-zinc-950 relative">
        {selectedThread ? (
          <>
            {/* Thread Header */}
            <header className="h-16 shrink-0 border-b border-zinc-800 px-6 flex items-center justify-between z-10 bg-zinc-950/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <img src={selectedThread.user.avatar} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <h3 className="text-sm font-bold leading-none text-zinc-100">{selectedThread.user.name}</h3>
                  <p className="text-[10px] text-zinc-500 mt-1">via {selectedThread.targetPage} ({selectedThread.platform})</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedThread.type === 'comment' && (
                  <a 
                    href={selectedThread.originalPostUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 transition-colors"
                  >
                    View Original Post
                  </a>
                )}
                <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-lg transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <div className="flex flex-col items-center">
                 <span className="text-[10px] uppercase tracking-widest text-zinc-600 bg-zinc-900 px-3 py-1 rounded">Conversation Started</span>
              </div>
              {selectedThread.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : 'justify-start max-w-[80%]'}`}
                >
                  {!msg.isMe && (
                    <img src={selectedThread.user.avatar} alt="" className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
                  )}
                  {msg.isMe && (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">MV</div>
                  )}
                  <div className={`flex flex-col ${msg.isMe ? 'items-end max-w-[70%]' : ''}`}>
                    <div className={`p-3 rounded-2xl border ${
                      msg.isMe 
                        ? 'bg-indigo-600 border-indigo-500 text-white rounded-tr-none shadow-lg' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-200 rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <div className={`mt-1 flex items-center gap-1 ${msg.isMe ? 'mr-1' : 'ml-1'}`}>
                      <span className="text-[10px] text-zinc-600">
                        {msg.timestamp} {msg.isMe && '· Delivered'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-6 pt-0">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus-within:border-indigo-500 transition-colors shadow-2xl">
                <textarea
                  rows={2}
                  placeholder={`Type your reply as ${selectedThread.targetPage}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-transparent border-none text-zinc-200 text-sm focus:ring-0 resize-none min-h-[60px]"
                />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                  <div className="flex gap-3">
                    <button className="text-zinc-500 hover:text-zinc-300 transition-colors" title="Emoji">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button className="text-zinc-500 hover:text-zinc-300 transition-colors" title="Attach Media">
                      <Paperclip className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    disabled={!replyText.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <p className="text-[10px] text-zinc-600 flex items-center gap-1.5">
                  <CheckCheck className="w-3 h-3" />
                  This conversation is managed by MetaCenter
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-600">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
