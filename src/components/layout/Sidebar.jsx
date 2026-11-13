import React from 'react';
import { TrendingUp, BarChart2, PieChart, Home } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Market Overview', icon: Home },
    { id: 'nifty100', label: 'Nifty 100 Analytics', icon: TrendingUp },
    { id: 'sectors', label: 'Sector Performance', icon: BarChart2 },
    { id: 'portfolio', label: 'Custom Watchlist', icon: PieChart },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
            <TrendingUp className="text-emerald-500" /> NiftyData
          </h1>
          <p className="text-xs text-slate-500 mt-1">Financial Market Analytics</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
        <span>Tech Lead Mode</span>
        <span className="text-emerald-400 font-mono">v0.1.0</span>
      </div>
    </aside>
  );
}