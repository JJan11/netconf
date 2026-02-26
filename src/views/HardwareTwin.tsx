import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ChevronRight } from 'lucide-react';
import ChassisS7700 from '../components/ChassisS7700';
import ChassisM9000 from '../components/ChassisM9000';
import ChassisS7600 from '../components/ChassisS7600';

export default function HardwareTwin({ setCurrentView, selectedDevice }: { setCurrentView: (view: string) => void, selectedDevice: string }) {
  const [activeTab, setActiveTab] = useState('boards');

  return (
    <div className="flex flex-col h-full w-full bg-[#0a1216]">
      {/* Top Navigation Bar specific to Hardware Twin */}
      <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-surface/50">
        <div className="flex items-center gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-primary mb-1 opacity-80">
              <span>设备管理</span> <ChevronRight className="w-3 h-3" />
              <span className="font-mono">
                {selectedDevice === 'M9000' ? 'M9000-DC-FW-01' : 
                 selectedDevice === 'S7600' ? 'S7600-Core-01' : 'S7700-Core-01'}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl text-white font-display font-bold tracking-tight">
                {selectedDevice === 'M9000' ? '数据中心防火墙 M9000' : 
                 selectedDevice === 'S7600' ? '核心交换机 S7600' : '核心交换机 S7700'}
              </h1>
              <span className="text-sm text-slate-400">
                {selectedDevice === 'M9000' ? 'Data Center Firewall M9000' : 
                 selectedDevice === 'S7600' ? 'Core Switch S7600' : 'Core Switch S7700'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 ml-8 overflow-x-auto">
            {['概览 (Overview)', '拓扑 (Topology)', '板卡 (Boards)', '告警 (Alarms)', '配置 (Config)'].map((tab, i) => {
              const id = ['overview', 'topology', 'boards', 'alarms', 'config'][i];
              const isActive = activeTab === id;
              return (
                <button 
                  key={id}
                  onClick={() => {
                    if (id === 'overview') {
                      setCurrentView('dashboard');
                    } else if (id === 'topology') {
                      setCurrentView('topology');
                    } else {
                      setActiveTab(id);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab.split(' ')[0]} <br/><span className="text-[10px] opacity-70">{tab.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Center - Chassis Visualization */}
        <main className="flex-1 overflow-auto p-8 flex items-center justify-center relative">
          {activeTab === 'boards' ? (
            selectedDevice === 'M9000' ? <ChassisM9000 /> : 
            selectedDevice === 'S7600' ? <ChassisS7600 /> : <ChassisS7700 />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500 gap-4">
              <Activity className="w-12 h-12 opacity-50" />
              <p className="text-lg">
                {{
                  overview: '概览 (Overview)',
                  topology: '拓扑 (Topology)',
                  boards: '板卡 (Boards)',
                  alarms: '告警 (Alarms)',
                  config: '配置 (Config)'
                }[activeTab]} - 模块开发中
              </p>
            </div>
          )}
        </main>

        {/* Right Sidebar - Board Status List */}
        <aside className="w-80 bg-surface border-l border-border flex flex-col z-20">
          <div className="p-5 border-b border-border">
            <h3 className="text-white font-bold text-lg">板卡状态列表</h3>
            <p className="text-slate-400 text-xs mt-1">Board Status List</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Board 1 */}
            <div 
              onClick={() => setActiveTab('boards')}
              className="bg-surface-light/30 border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center text-xs font-mono font-bold">01</div>
                  <div>
                    <div className="text-white font-bold text-sm">MPU Main Control</div>
                    <div className="text-slate-500 text-[10px] font-mono">LSUM1SUP04</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-success/10 text-success border border-success/20 rounded text-[10px]">In-Position</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-slate-500 text-[10px]">Temp</div>
                  <div className="text-slate-300">42°C</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">CPU</div>
                  <div className="text-slate-300">12%</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Memory</div>
                  <div className="text-slate-300">24%</div>
                </div>
              </div>
            </div>

            {/* Board 2 */}
            <div className="bg-background/30 border border-dashed border-border rounded-lg p-4 opacity-50">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-6 h-6 rounded bg-slate-800 text-slate-500 flex items-center justify-center text-xs font-mono font-bold">02</div>
                  <div>
                    <div className="text-slate-400 font-bold text-sm">Empty Slot</div>
                    <div className="text-slate-600 text-[10px]">Reserved</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded text-[10px]">Empty</span>
              </div>
            </div>

            {/* Board 3 */}
            <div className="bg-primary/5 border border-primary/50 rounded-lg p-4 shadow-[0_0_15px_rgba(37,192,244,0.1)] relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-primary text-background flex items-center justify-center text-xs font-mono font-bold">03</div>
                  <div>
                    <div className="text-white font-bold text-sm">48-Port 10G Interface</div>
                    <div className="text-primary text-[10px] font-mono">LSUM1TGS48SC0</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-success/10 text-success border border-success/20 rounded text-[10px]">Normal</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div>
                  <div className="text-slate-500 text-[10px]">Temp</div>
                  <div className="text-slate-300">48°C</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Ports Up</div>
                  <div className="text-slate-300">32/48</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Power</div>
                  <div className="text-slate-300">145W</div>
                </div>
              </div>
              <div className="border-t border-border/50 pt-3">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Traffic Load</span>
                  <span className="text-primary">68%</span>
                </div>
                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[68%] shadow-glow"></div>
                </div>
              </div>
            </div>

            {/* Board 4 */}
            <div 
              onClick={() => setActiveTab('boards')}
              className="bg-surface-light/30 border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center text-xs font-mono font-bold">04</div>
                  <div>
                    <div className="text-white font-bold text-sm">48-Port 10G Interface</div>
                    <div className="text-slate-500 text-[10px] font-mono">LSUM1TGS48SC0</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-warning/10 text-warning border border-warning/20 rounded text-[10px]">High Temp</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-slate-500 text-[10px]">Temp</div>
                  <div className="text-warning font-bold">65°C</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Ports Up</div>
                  <div className="text-slate-300">12/48</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Power</div>
                  <div className="text-slate-300">142W</div>
                </div>
              </div>
            </div>

            {/* Board 5 */}
            <div 
              onClick={() => setActiveTab('boards')}
              className="bg-surface-light/30 border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center text-xs font-mono font-bold">05</div>
                  <div>
                    <div className="text-white font-bold text-sm">4-Port 100G QSFP28</div>
                    <div className="text-slate-500 text-[10px] font-mono">LSUM1CQS4</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-success/10 text-success border border-success/20 rounded text-[10px]">Normal</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-slate-500 text-[10px]">Temp</div>
                  <div className="text-slate-300">51°C</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Ports Up</div>
                  <div className="text-slate-300">2/4</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Power</div>
                  <div className="text-slate-300">85W</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-background font-bold rounded shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4" /> 查看详细报表 (View Reports)
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-10 bg-surface border-t border-border flex items-center justify-between px-6 text-[10px] text-slate-400">
        <div className="flex gap-6">
          <span>System Time: 2023-10-27 14:35:22 UTC</span>
          <span>Uptime: 45d 12h 30m</span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success"></span> Normal</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning"></span> Warning</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger"></span> Critical</span>
        </div>
      </div>
    </div>
  );
}
