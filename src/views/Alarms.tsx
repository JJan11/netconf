import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, Filter, Search } from 'lucide-react';

interface Alarm {
  id: string;
  level: 'critical' | 'major' | 'minor' | 'info';
  device: string;
  message: string;
  time: string;
  status: 'active' | 'acknowledged' | 'cleared';
}

const initialAlarms: Alarm[] = [
  { id: 'ALM-001', level: 'critical', device: 'S7600-Core-02', message: 'Trunk Interface 10GE 0/4/1 Link Down', time: '10 mins ago', status: 'active' },
  { id: 'ALM-002', level: 'major', device: 'M9000-DC-FW-01', message: 'CPU Utilization Exceeds 85% Threshold', time: '25 mins ago', status: 'active' },
  { id: 'ALM-003', level: 'minor', device: 'S7700-Core-01', message: 'BGP Peer 192.168.10.2 State Changed to Idle', time: '1 hour ago', status: 'acknowledged' },
  { id: 'ALM-004', level: 'critical', device: 'USG6535E-Branch', message: 'IPSec VPN Tunnel Down (Site-to-Site)', time: '2 hours ago', status: 'active' },
  { id: 'ALM-005', level: 'info', device: 'S5500-Access-01', message: 'Configuration Saved by admin', time: '5 hours ago', status: 'cleared' },
  { id: 'ALM-006', level: 'major', device: 'M9000-DC-FW-01', message: 'High number of dropped packets on interface 40GE 0/6/1', time: '1 day ago', status: 'cleared' },
];

export default function Alarms() {
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);
  const [filter, setFilter] = useState<'all' | 'critical' | 'major' | 'minor' | 'info'>('all');
  const [search, setSearch] = useState('');

  const filteredAlarms = alarms.filter(alarm => {
    if (filter !== 'all' && alarm.level !== filter) return false;
    if (search && !alarm.device.toLowerCase().includes(search.toLowerCase()) && !alarm.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return <ShieldAlert className="w-5 h-5 text-danger" />;
      case 'major': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'minor': return <Info className="w-5 h-5 text-primary" />;
      case 'info': return <CheckCircle2 className="w-5 h-5 text-success" />;
      default: return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-danger bg-danger/10 border-danger/30';
      case 'major': return 'text-warning bg-warning/10 border-warning/30';
      case 'minor': return 'text-primary bg-primary/10 border-primary/30';
      case 'info': return 'text-success bg-success/10 border-success/30';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  const acknowledgeAlarm = (id: string) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, status: 'acknowledged' } : a));
  };

  return (
    <div className="h-full w-full flex flex-col p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-danger" />
          告警通知 (Alarm Notifications)
        </h2>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search alarms..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-surface border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50 w-64"
            />
          </div>
          <div className="flex gap-2 bg-surface border border-border rounded-lg p-1">
            {['all', 'critical', 'major', 'minor', 'info'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1 text-xs rounded-md transition-colors capitalize ${
                  filter === f ? 'bg-primary text-background font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-xl border border-border overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-surface-light/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1">Level</div>
          <div className="col-span-2">Device</div>
          <div className="col-span-5">Message</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredAlarms.map((alarm, i) => (
            <motion.div 
              key={alarm.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`grid grid-cols-12 gap-4 p-4 rounded-lg items-center border ${
                alarm.status === 'active' ? 'bg-surface border-border hover:border-primary/50' : 'bg-background/50 border-transparent opacity-60'
              } transition-colors`}
            >
              <div className="col-span-1 flex items-center gap-2">
                {getLevelIcon(alarm.level)}
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getLevelColor(alarm.level)}`}>
                  {alarm.level}
                </span>
              </div>
              <div className="col-span-2 font-mono text-sm text-slate-300">{alarm.device}</div>
              <div className="col-span-5 text-sm text-white">{alarm.message}</div>
              <div className="col-span-2 text-xs text-slate-400">{alarm.time}</div>
              <div className="col-span-1">
                <span className={`text-xs capitalize ${
                  alarm.status === 'active' ? 'text-danger' : 
                  alarm.status === 'acknowledged' ? 'text-warning' : 'text-success'
                }`}>
                  {alarm.status}
                </span>
              </div>
              <div className="col-span-1 text-right">
                {alarm.status === 'active' && (
                  <button 
                    onClick={() => acknowledgeAlarm(alarm.id)}
                    className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded text-xs transition-colors"
                  >
                    Ack
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          
          {filteredAlarms.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <CheckCircle2 className="w-12 h-12 mb-4 opacity-20" />
              <p>No alarms found matching the current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
