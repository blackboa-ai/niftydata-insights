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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-6">Sector Wise Performance (%)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                cursor={{fill: '#1e293b', opacity: 0.4}}
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