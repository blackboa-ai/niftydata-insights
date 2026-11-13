import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const sectorData = [
  { name: 'Banking', performance: 2.4, volume: '₹12,450Cr' },
  { name: 'IT', performance: -1.2, volume: '₹8,320Cr' },
  { name: 'Auto', performance: 1.8, volume: '₹5,100Cr' },
  { name: 'Pharma', performance: 0.5, volume: '₹3,200Cr' },
  { name: 'FMCG', performance: -0.3, volume: '₹4,800Cr' },
  { name: 'Energy', performance: 3.1, volume: '₹9,600Cr' },
];

export default function SectorPerformanceTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-6">Sector Wise Performance (%)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} className="dark:stroke-slate-800" />
              <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#1e293b', color: '#f1f5f9', borderRadius: '8px' }}
                cursor={{fill: '#94a3b8', opacity: 0.1}}
              />
              <Bar dataKey="performance" radius={[0, 4, 4, 0]} barSize={32}>
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.performance >= 0 ? '#10b981' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}