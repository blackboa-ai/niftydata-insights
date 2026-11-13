import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, DollarSign, TrendingUp, Users } from 'lucide-react';
import MetricCard from './MetricCard';

const mockData = [
  { name: 'Mon', value: 24100 },
  { name: 'Tue', value: 24250 },
  { name: 'Wed', value: 24180 },
  { name: 'Thu', value: 24400 },
  { name: 'Fri', value: 24550 },
];

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Nifty 50" value="24,550.00" change={1.2} isPositive={true} icon={TrendingUp} />
        <MetricCard title="Market Cap" value="₹350T" change={0.8} isPositive={true} icon={DollarSign} />
        <MetricCard title="Trading Volume" value="1.2B" change={-2.4} isPositive={false} icon={Activity} />
        <MetricCard title="Active Retail" value="4.5M" change={5.1} isPositive={true} icon={Users} />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-6">Market Trend (Nifty 50)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}