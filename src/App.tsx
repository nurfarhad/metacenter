import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import UnifiedInbox from './views/UnifiedInbox';
import Publishing from './views/Publishing';
import { View } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<View>('inbox'); // Default as requested
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inbox':
        return <UnifiedInbox />;
      case 'publishing':
        return <Publishing />;
      case 'accounts':
        return (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            <p className="text-xl font-medium">Accounts Management coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            <p className="text-xl font-medium">Settings coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'inbox': return 'Unified Inbox';
      case 'publishing': return 'Post Composer';
      case 'accounts': return 'Connected Accounts';
      case 'settings': return 'System Settings';
      default: return 'MetaCenter';
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-200 overflow-hidden font-sans selection:bg-blue-600/30">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header title={getTitle()} />

        {/* Dynamic View Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {renderView()}
        </main>
      </div>

      {/* Global CSS for Custom Scrollbars */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
    </div>
  );
}
