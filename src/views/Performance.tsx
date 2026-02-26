import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Cpu, HardDrive, Network, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const cpuData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  core1: Math.random() * 40 + 20,
  core2: Math.random() * 50 + 10,
  core3: Math.random() * 30 + 40,
  core4: Math.random() * 60 + 20,
}));

const networkData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  in: Math.random() * 800 + 200,
  out: Math.random() * 600 + 100,
}));

const memoryData = [
  { name: 'System', value: 45, fill: '#25c0f4' },
  { name: 'Cache', value: 25, fill: '#10b981' },
  { name: 'Buffers', value: 15, fill: '#f59e0b' },
  { name: 'Free', value: 15, fill: '#334155' },
];

export default function Performance() {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="h-full w-full flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          性能监控 (Performance Monitoring)
        </h2>
        <div className="flex gap-2 bg-surface border border-border rounded-lg p-1">
          {['1h', '6h', '24h', '7d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                timeRange === range ? 'bg-primary text-background font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* CPU Usage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5 rounded-xl border border-primary/20 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> CPU 负载趋势 (CPU Load Trend)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Avg: 42%</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCore1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCore2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                  labelStyle={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="core1" stroke="#25c0f4" fillOpacity={1} fill="url(#colorCore1)" strokeWidth={2} />
                <Area type="monotone" dataKey="core2" stroke="#10b981" fillOpacity={1} fill="url(#colorCore2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Memory Usage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-5 rounded-xl border border-border"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-success" /> 内存使用分布 (Memory Usage)
            </h3>
          </div>
          <div className="h-48 flex items-center justify-center relative">
            {/* Custom Donut Chart visualization */}
            <div className="relative w-40 h-40 rounded-full flex items-center justify-center" style={{
              background: `conic-gradient(
                #25c0f4 0% 45%, 
                #10b981 45% 70%, 
                #f59e0b 70% 85%, 
                #334155 85% 100%
              )`
            }}>
              <div className="w-32 h-32 bg-[#0f172a] rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">85%</span>
                <span className="text-[10px] text-slate-400">Used</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {memoryData.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></span>
                <span className="text-slate-400">{item.name}</span>
                <span className="ml-auto text-white font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Traffic */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-5 rounded-xl border border-border"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-warning" /> 核心骨干网流量 (Core Network Traffic)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Peak: 1.2 Tbps</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={networkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                  cursor={{ fill: '#1e293b' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                <Bar dataKey="in" name="Inbound (Gbps)" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                <Bar dataKey="out" name="Outbound (Gbps)" fill="#25c0f4" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Talkers / Power Consumption */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-5 rounded-xl border border-border flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" /> 设备能耗排行 (Power Consumption Top 5)
            </h3>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            {[
              { name: 'S7600-Core-02', power: 2150, max: 2500 },
              { name: 'M9000-DC-FW-01', power: 1850, max: 2500 },
              { name: 'S7700-Core-01', power: 1620, max: 2200 },
              { name: 'S5500-Access-01', power: 450, max: 600 },
              { name: 'USG6535E-Branch', power: 120, max: 200 },
            ].map((device, i) => (
              <div key={device.name} className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{device.name}</span>
                  <span className="text-slate-400 font-mono">{device.power}W / {device.max}W</span>
                </div>
                <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${device.power / device.max > 0.8 ? 'bg-warning' : 'bg-purple-500'}`} 
                    style={{ width: `${(device.power / device.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
