import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Server, Shield, Activity, Cpu } from 'lucide-react';
import DeviceImage from '../components/DeviceImage';

const stats = [
  { label: '设备总量 (Total Assets)', value: '1,248', trend: '+12', icon: Server, color: 'text-primary', bg: 'bg-primary' },
  { label: 'H3C 设备 (H3C Devices)', value: '850', trend: '+8', icon: Activity, color: 'text-success', bg: 'bg-success' },
  { label: 'Huawei 设备 (Huawei)', value: '398', trend: '+4', icon: Shield, color: 'text-warning', bg: 'bg-warning' },
  { label: '在线率 (Uptime)', value: '99.8%', trend: '正常', icon: Cpu, color: 'text-success', bg: 'bg-success' },
];

const devices = [
  { id: '1', name: 'H3C S7600', type: 'Core Switch', ip: '192.168.10.1', status: 'ONLINE', cpu: 45, mem: 62, model: 'S7600' },
  { id: '2', name: 'Huawei USG6535E', type: 'Firewall', ip: '192.168.10.254', status: 'ONLINE', cpu: 25, mem: 30, model: 'USG6535E' },
  { id: '3', name: 'H3C S5500', type: 'Access Switch', ip: '192.168.10.105', status: 'WARNING', cpu: 85, mem: 40, model: 'S5500' },
  { id: '4', name: 'Huawei S7700', type: 'Core Switch', ip: '192.168.20.1', status: 'ONLINE', cpu: 32, mem: 55, model: 'S7700' },
  { id: '5', name: 'H3C M9000', type: 'Firewall', ip: '10.0.0.1', status: 'ONLINE', cpu: 15, mem: 20, model: 'M9000' },
  { id: '6', name: 'H3C L5030', type: 'Load Balancer', ip: '192.168.30.5', status: 'OFFLINE', cpu: 0, mem: 0, model: 'L5030' },
];

export default function Dashboard({ setCurrentView, setSelectedDevice }: { setCurrentView: (view: string) => void, setSelectedDevice: (device: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('全部厂商');

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="glass-panel p-5 rounded-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className={`w-12 h-12 ${stat.color}`} />
              </div>
              <p className="text-slate-400 text-xs mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-display font-bold text-white">{stat.value}</span>
                <span className={`text-xs ${stat.color} flex items-center`}>
                  {stat.trend.startsWith('+') ? '↗' : ''} {stat.trend}
                </span>
              </div>
              <div className="w-full bg-background h-1 mt-4 rounded-full overflow-hidden">
                <div className={`${stat.bg} h-full w-[70%] opacity-80`} style={{ boxShadow: `0 0 8px var(--color-${stat.bg.replace('bg-', '')})` }}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {['全部厂商', 'H3C', 'Huawei', '交换机 (Switch)', '防火墙 (Firewall)'].map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
              activeFilter === filter 
                ? 'bg-primary text-background font-medium shadow-glow' 
                : 'bg-surface border border-border text-slate-300 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
        {devices.map((device, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 + 0.2 }}
            key={device.id} 
            onClick={() => {
              setSelectedDevice(device.model);
              setCurrentView('hardware');
            }}
            className="glass-panel rounded-xl overflow-hidden flex flex-col border border-border hover:border-primary/50 transition-colors group cursor-pointer relative z-10"
          >
            <div className="h-40 relative bg-background/50 flex items-center justify-center p-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface z-10 pointer-events-none"></div>
              <DeviceImage model={device.model} type={device.type} />
              
              <div className="absolute top-3 right-3 z-20">
                {device.status === 'ONLINE' && <span className="px-2 py-1 bg-success/20 border border-success/50 text-success text-[10px] font-bold rounded shadow-glow-success">ONLINE</span>}
                {device.status === 'WARNING' && <span className="px-2 py-1 bg-warning/20 border border-warning/50 text-warning text-[10px] font-bold rounded shadow-glow-warning">WARNING</span>}
                {device.status === 'OFFLINE' && <span className="px-2 py-1 bg-danger/20 border border-danger/50 text-danger text-[10px] font-bold rounded shadow-glow-danger">OFFLINE</span>}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-white font-bold text-lg font-display">{device.name}</h3>
                <span className="text-[10px] px-2 py-0.5 bg-surface-light border border-border rounded text-slate-400">{device.type}</span>
              </div>
              <p className="text-xs text-slate-500 font-mono mb-4">IP: {device.ip}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>CPU LOAD</span>
                    <span className={device.cpu > 80 ? 'text-danger' : 'text-primary'}>{device.cpu}%</span>
                  </div>
                  <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${device.cpu > 80 ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${device.cpu}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>MEMORY</span>
                    <span className="text-purple-400">{device.mem}%</span>
                  </div>
                  <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${device.mem}%` }}></div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDevice(device.model);
                  setCurrentView('hardware');
                }}
                className="w-full mt-5 py-2 bg-surface-light hover:bg-primary/20 border border-border hover:border-primary/50 text-slate-300 hover:text-primary transition-all rounded text-sm font-medium relative z-20"
              >
                查看详情
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
