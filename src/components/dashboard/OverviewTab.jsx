import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, DollarSign, TrendingUp, Users, Loader2 } from 'lucide-react';
import MetricCard from './MetricCard';

export default function OverviewTab() {
  // 1. Set up state for our live data and loading status
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. useEffect runs automatically when the component mounts
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        // Fetching real 7-day Bitcoin to INR data from a free, open API
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=7&interval=daily');
        const rawData = await response.json();

        // 3. Transform the raw API data array into the exact format Recharts needs
        const formattedData = rawData.prices.slice(0, 7).map(item => {
          const date = new Date(item[0]);
          return {
            name: date.toLocaleDateString('en-IN', { weekday: 'short' }),
            value: Math.round(item[1]) // Price in INR
          };
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch live data:", error);
      } finally {
        setIsLoading(false); // Turn off the loading spinner
      }
    };

    fetchLiveData();
  }, []); // The empty array ensures this only fetches once when the tab opens

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Nifty 50" value="24,550.00" change={1.2} isPositive={true} icon={TrendingUp} />
        <MetricCard title="Market Cap" value="₹350T" change={0.8} isPositive={true} icon={DollarSign} />
        <MetricCard title="Trading Volume" value="1.2B" change={-2.4} isPositive={false} icon={Activity} />
        <MetricCard title="Active Retail" value="4.5M" change={5.1} isPositive={true} icon={Users} />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center justify-between">
          <span>Live Market Trend (BTC/INR)</span>
          {isLoading && <Loader2 className="animate-spin text-emerald-500" size={20} />}
        </h3>
        
        <div className="h-80">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
              <Loader2 className="animate-spin text-emerald-500" size={32} />
              <p>Fetching live market data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                {/* Formats the massive INR number into a cleaner "Lakh" format on the Y-Axis */}
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fill: '#64748b' }} 
                  axisLine={false} 
                  tickLine={false} 
                  domain={['auto', 'auto']} 
                  tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
                />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}