import React from 'react';
import { TrendingUp, Users, MessageSquare, Send, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Reach', value: '1.2M', growth: '+12.5%', isUp: true, icon: Users, color: 'bg-indigo-600' },
    { label: 'Engagement Rate', value: '4.8%', growth: '+2.1%', isUp: true, icon: TrendingUp, color: 'bg-green-600' },
    { label: 'Unread Messages', value: '42', growth: '-5', isUp: false, icon: MessageSquare, color: 'bg-pink-600' },
    { label: 'Posts Published', value: '128', growth: '+18', isUp: true, icon: Send, color: 'bg-purple-600' },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-zinc-950" id="dashboard-view">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-zinc-100">Welcome back, Admin</h2>
            <p className="text-zinc-500 mt-1">Here's what's happening across your accounts today.</p>
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-2 rounded-xl hover:bg-zinc-800 transition-colors">
            <Calendar className="w-4 h-4 text-zinc-500" />
            Last 30 Days
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.growth}
                  {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </div>
              </div>
              <h4 className="text-zinc-500 text-sm font-medium">{stat.label}</h4>
              <p className="text-2xl font-bold text-zinc-100 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-zinc-100">Performance Over Time</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    <span className="text-xs text-zinc-400">Facebook</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-600 rounded-full" />
                    <span className="text-xs text-zinc-400">Instagram</span>
                 </div>
              </div>
            </div>
            <div className="h-64 flex items-end gap-2 px-2">
               {/* Mock Chart Rails */}
               {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col gap-1 items-center group cursor-pointer">
                    <div className="w-full bg-indigo-500/20 rounded-t-md group-hover:bg-indigo-500/40 transition-all overflow-hidden relative flex flex-col justify-end" style={{ height: `${h}%` }}>
                       <div className="absolute inset-x-0 bottom-0 bg-indigo-600 rounded-t-sm" style={{ height: '30%' }} />
                    </div>
                    <span className="text-[10px] text-zinc-600 mt-2 font-medium">Day {i+1}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
             <h3 className="text-xl font-bold text-zinc-100 mb-6">Recent Activity</h3>
             <div className="space-y-6">
                {[
                  { user: 'Alex Rivera', action: 'sent a direct message', time: '2m ago', icon: MessageSquare, color: 'text-indigo-500' },
                  { user: 'Sarah Chen', action: 'commented on a post', time: '15m ago', icon: BarChart3, color: 'text-green-500' },
                  { user: 'Marcus Bell', action: 'liked your latest reel', time: '1h ago', icon: Users, color: 'text-purple-500' },
                  { user: 'Admin', action: 'scheduled a new post', time: '3h ago', icon: Send, color: 'text-zinc-400' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                     <div className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0`}>
                        <act.icon className={`w-4 h-4 ${act.color}`} />
                     </div>
                     <div>
                        <p className="text-sm text-zinc-200">
                           <span className="font-bold">{act.user}</span> {act.action}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">{act.time}</p>
                     </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-xl transition-colors text-sm">
                View All Activity
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to make Calendar accessible in this file
import { Calendar } from 'lucide-react';
