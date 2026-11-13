import React from 'react';

export default function MetricCard({ title, value, change, isPositive, icon: Icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm dark:shadow-none transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</h3>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-slate-600 dark:text-slate-300">
          <Icon size={20} />
        </div>
      </div>
      <div className={`mt-4 text-sm flex items-center gap-1 ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{Math.abs(change)}%</span>
        <span className="text-slate-400 dark:text-slate-500 ml-1">vs last week</span>
      </div>
    </div>
  );
}