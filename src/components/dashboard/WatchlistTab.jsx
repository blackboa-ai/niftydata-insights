import React from 'react';
import { Plus, X, TrendingUp, TrendingDown } from 'lucide-react';

const initialWatchlist = [
  { ticker: 'ZOMATO', price: '254.50', change: 4.2, isPositive: true },
  { ticker: 'PAYTM', price: '450.80', change: -1.5, isPositive: false },
  { ticker: 'JIOFIN', price: '345.15', change: 2.1, isPositive: true },
  { ticker: 'TATAMOTORS', price: '980.00', change: 0.8, isPositive: true },
];

export default function WatchlistTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">My Tracked Assets</h3>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Plus size={16} /> Add Ticker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {initialWatchlist.map((stock) => (
          <div key={stock.ticker} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 relative group hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm dark:shadow-none">
            <button className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <X size={16} />
            </button>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-200 mb-4">{stock.ticker}</h4>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-mono text-slate-900 dark:text-slate-100">₹{stock.price}</span>
              <div className={`flex items-center gap-1 text-sm font-medium ${stock.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {stock.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(stock.change)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}