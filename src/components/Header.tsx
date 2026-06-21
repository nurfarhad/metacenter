import React from 'react';
import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-8 z-10" id="app-header">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-semibold text-zinc-100">{title}</h1>
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          <input 
            type="text" 
            placeholder="Search threads..." 
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-md py-1.5 pl-10 pr-4 w-64 focus:outline-none focus:border-zinc-600 transition-all"
            id="global-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all" id="noti-btn">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-zinc-950"></span>
        </button>
      </div>
    </header>
  );
}
