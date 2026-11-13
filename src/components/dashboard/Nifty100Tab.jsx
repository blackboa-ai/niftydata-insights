import React from 'react';
import { Search, Filter } from 'lucide-react';

const mockStocks = [
  { ticker: 'RELIANCE', name: 'Reliance Industries', price: '2,950.40', change: '+1.24', isPositive: true, volume: '4.2M' },
  { ticker: 'TCS', name: 'Tata Consultancy', price: '3,920.15', change: '-0.45', isPositive: false, volume: '1.8M' },
  { ticker: 'HDFCBANK', name: 'HDFC Bank', price: '1,640.00', change: '+2.10', isPositive: true, volume: '8.5M' },
  { ticker: 'INFY', name: 'Infosys', price: '1,480.90', change: '+0.85', isPositive: true, volume: '3.1M' },
  { ticker: 'ICICIBANK', name: 'ICICI Bank', price: '1,150.25', change: '-1.15', isPositive: false, volume: '6.4M' },
];

export default function Nifty100Tab() {
  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search tickers or companies..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950/50 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Ticker</th>
                <th className="px-6 py-4 font-medium">Company Name</th>
                <th className="px-6 py-4 font-medium text-right">Price (₹)</th>
                <th className="px-6 py-4 font-medium text-right">24h Change (%)</th>
                <th className="px-6 py-4 font-medium text-right">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockStocks.map((stock) => (
                <tr key={stock.ticker} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-200">{stock.ticker}</td>
                  <td className="px-6 py-4 text-slate-400">{stock.name}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-200">{stock.price}</td>
                  <td className={`px-6 py-4 text-right font-mono ${stock.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stock.change}%
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400">{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}