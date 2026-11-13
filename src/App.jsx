import React, { useState } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import OverviewTab from './components/dashboard/OverviewTab';
import Nifty100Tab from './components/dashboard/Nifty100Tab';
import SectorPerformanceTab from './components/dashboard/SectorPerformanceTab';
import WatchlistTab from './components/dashboard/WatchlistTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Defaulting to true so we don't blind you immediately
  const [isDarkMode, setIsDarkMode] = useState(true);

  const renderContent = () => {
    if (activeTab === 'overview') return <OverviewTab />;
    if (activeTab === 'nifty100') return <Nifty100Tab />;
    if (activeTab === 'sectors') return <SectorPerformanceTab />;
    if (activeTab === 'portfolio') return <WatchlistTab />;
    return null;
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-200">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen} 
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden p-2 -ml-2 text-slate-500 dark:text-slate-400" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg font-semibold capitalize tracking-wide text-slate-800 dark:text-slate-200">
                {activeTab === 'nifty100' ? 'Nifty 100 Analytics' : activeTab.replace(/([A-Z])/g, ' $1')}
              </h2>
            </div>
            
            {/* Theme Toggle & Environment Badge */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="hidden sm:block text-xs bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 font-mono">
                Environment: Local
              </div>
            </div>
          </header>

          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}