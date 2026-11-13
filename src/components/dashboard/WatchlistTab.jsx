import React, { useState } from 'react';
import { Plus, X, TrendingUp, TrendingDown, Check } from 'lucide-react';

const initialWatchlist = [
  { ticker: 'ZOMATO', price: '254.50', change: 4.2, isPositive: true },
  { ticker: 'PAYTM', price: '450.80', change: -1.5, isPositive: false },
  { ticker: 'JIOFIN', price: '345.15', change: 2.1, isPositive: true },
  { ticker: 'TATAMOTORS', price: '980.00', change: 0.8, isPositive: true },
];

export default function WatchlistTab() {
  // 1. State to hold our list of assets
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  // 2. State to toggle the input form
  const [isFormOpen, setIsFormOpen] = useState(false);
  // 3. State to capture what the user types
  const [newTicker, setNewTicker] = useState('');

  const handleAddTicker = (e) => {
    e.preventDefault();
    if (!newTicker.trim()) return;

    // Create a new asset with some mock live data
    const mockChange = (Math.random() * 10 - 5).toFixed(2);
    const newAsset = {
      ticker: newTicker.toUpperCase(),
      price: (Math.random() * 2000 + 50).toFixed(2),
      change: parseFloat(mockChange),
      isPositive: mockChange >= 0
    };

    // Add the new asset to the beginning of the array
    setWatchlist([newAsset, ...watchlist]);
    
    // Reset the form
    setNewTicker('');
    setIsFormOpen(false);
  };

  const handleRemoveTicker = (tickerToRemove) => {
    // Filter out the one we clicked on
    setWatchlist(watchlist.filter(asset => asset.ticker !== tickerToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center h-10">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">My Tracked Assets</h3>
        
        {/* The Form / Button Toggle */}
        {isFormOpen ? (
          <form onSubmit={handleAddTicker} className="flex items-center gap-2">
            <input 
              type="text" 
              autoFocus
              placeholder="e.g. RELIANCE" 
              value={newTicker}
              onChange={(e) => setNewTicker(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 uppercase w-32 sm:w-48 shadow-sm dark:shadow-none"
            />
            <button type="submit" className="p-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 rounded-lg transition-colors shadow-sm">
              <Check size={18} />
            </button>
            <button type="button" onClick={() => setIsFormOpen(false)} className="p-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </form>
        ) : (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Ticker
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {watchlist.map((stock) => (
          <div key={stock.ticker} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 relative group hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm dark:shadow-none animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => handleRemoveTicker(stock.ticker)}
              className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              title="Remove from watchlist"
            >
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
        
        {/* Empty State */}
        {watchlist.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500">
            <p>Your watchlist is empty.</p>
            <button onClick={() => setIsFormOpen(true)} className="mt-2 text-emerald-600 dark:text-emerald-400 hover:underline">
              Add a ticker to track it here.
            </button>
          </div>
        )}
      </div>
    </div>
  );
}