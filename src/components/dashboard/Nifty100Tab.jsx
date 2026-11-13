import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';

export default function Nifty100Tab() {
  const [marketData, setMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=5&page=1&sparkline=false');
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search live markets..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors shadow-sm dark:shadow-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm dark:shadow-none">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden min-h-[300px] relative shadow-sm dark:shadow-none transition-colors">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
            <Loader2 className="animate-spin text-emerald-500" size={32} />
            <p>Loading live order books...</p>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
              <tr>
                <th className="px-6 py-4 font-medium">Asset</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium text-right">Price (₹)</th>
                <th className="px-6 py-4 font-medium text-right">24h Change (%)</th>
                <th className="px-6 py-4 font-medium text-right">24h Volume (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50 transition-colors">
              {marketData.map((asset) => {
                const isPositive = asset.price_change_percentage_24h >= 0;
                return (
                  <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-200 uppercase flex items-center gap-3">
                      <img src={asset.image} alt={asset.name} className="w-6 h-6 rounded-full" />
                      {asset.symbol}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{asset.name}</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-900 dark:text-slate-200">
                      {asset.current_price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className={`px-6 py-4 text-right font-mono ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {isPositive ? '+' : ''}{asset.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400 font-mono">
                      {(asset.total_volume / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}