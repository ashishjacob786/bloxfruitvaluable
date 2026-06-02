"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatValue } from "@/lib/calculator";

// Mock history data
const MOCK_HISTORY = [
  { date: 'Jan 1', value: 80000000 },
  { date: 'Jan 15', value: 95000000 },
  { date: 'Feb 1', value: 110000000 },
  { date: 'Feb 15', value: 105000000 },
  { date: 'Mar 1', value: 115000000 },
];

export default function PriceTrendChart() {
  return (
    <div className="w-full h-[300px] mt-6 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-4 relative">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 absolute top-4 left-4">Value History (30 Days)</h3>
      <div className="w-full h-full pt-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_HISTORY} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.4)" 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.4)" 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
              tickFormatter={(value) => formatValue(value)}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(10,10,10,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(4px)' }}
              itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
              labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}
              formatter={(value: any) => [formatValue(value || 0), 'Value']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#60a5fa', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
