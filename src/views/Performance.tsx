import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  traffic: Math.floor(Math.random() * 800) + 200,
  latency: Math.floor(Math.random() * 40) + 10,
}));

export default function Performance() {
  return (
    <div className="p-6 h-full flex flex-col overflow-y-auto">
      <h2 className="text-xl font-display font-bold text-white mb-6">全网性能监控</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="glass-panel p-6 rounded-xl flex flex-col min-h-[400px]">
          <h3 className="text-sm font-bold text-slate-300 mb-4">全网流量趋势 (Gbps)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f3640" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#132329', borderColor: '#1f3640', color: '#fff' }} />
                <Area type="monotone" dataKey="traffic" stroke="#25c0f4" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl flex flex-col min-h-[400px]">
          <h3 className="text-sm font-bold text-slate-300 mb-4">平均延迟趋势 (ms)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f3640" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#132329', borderColor: '#1f3640', color: '#fff' }} />
                <Area type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
