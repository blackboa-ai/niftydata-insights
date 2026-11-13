import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import OverviewTab from './components/dashboard/OverviewTab';
import Nifty100Tab from './components/dashboard/Nifty100Tab';
import SectorPerformanceTab from './components/dashboard/SectorPerformanceTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    if (activeTab === 'overview') return <OverviewTab />;
    if (activeTab === 'nifty100') return <Nifty100Tab />;
    if (activeTab === 'sectors') return <SectorPerformanceTab />;
    return (
      <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-500">
        {activeTab} module in development. Awaiting next PR.
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold capitalize tracking-wide text-slate-200">
            {activeTab.replace(/([A-Z])/g, ' $1')}
          </h2>
          <div className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 font-mono">
            Environment: Local (Dev)
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}