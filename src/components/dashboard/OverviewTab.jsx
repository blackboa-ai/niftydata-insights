import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, DollarSign, TrendingUp, Users, Loader2 } from 'lucide-react';
import MetricCard from './MetricCard';

export default function OverviewTab() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=7&interval=daily');
        const rawData = await response.json();

        const formattedData = rawData.prices.slice(0, 7).map(item => {
          const date = new Date(item[0]);
          return {
            name: date.toLocaleDateString('en-IN', { weekday: 'short' }),
            value: Math.round(item[1])
          };
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch live data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Nifty 50" value="24,550.00" change={1.2} isPositive={true} icon={TrendingUp} />
        <MetricCard title="Market Cap" value="₹350T" change={0.8} isPositive={true} icon={DollarSign} />
        <MetricCard title="Trading Volume" value="1.2B" change={-2.4} isPositive={false} icon={Activity} />
        <MetricCard title="Active Retail" value="4.5M" change={5.1} isPositive={true} icon={Users} />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-6 flex items-center justify-between">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fill: '#64748b' }} 
                  axisLine={false} 
                  tickLine={false} 
                  domain={['auto', 'auto']} 
                  tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#1e293b', color: '#f1f5f9', borderRadius: '8px' }}
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