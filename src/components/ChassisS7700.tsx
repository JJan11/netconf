import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const trafficData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  in: Math.random() * 10,
  out: Math.random() * 5,
}));

export default function ChassisS7700() {
  const [selectedInterface, setSelectedInterface] = useState<{slot: number, port: number, speed: string} | null>({slot: 4, port: 1, speed: '10 Gbps'});

  const renderMiniPorts = (slot: number, speed: string, startIndex: number, count: number, activeIndices: number[], warningIndices: number[]) => {
    const ports = [];
    for (let i = 0; i < count; i++) {
      const portNum = startIndex + i;
      let bg = 'bg-black/40 border-slate-700';
      let led = '';
      if (activeIndices.includes(i + 1)) {
        bg = 'bg-primary/20 border-primary/50';
        led = 'bg-primary shadow-[0_0_4px_#25c0f4]';
      } else if (warningIndices.includes(i + 1)) {
        bg = 'bg-warning/20 border-warning/50';
        led = 'bg-warning shadow-[0_0_4px_#f59e0b]';
      }
      
      ports.push(
        <div key={portNum} className={`w-4 h-3 border rounded-[1px] ${bg} relative overflow-hidden cursor-pointer hover:border-white transition-colors z-10`} onClick={() => setSelectedInterface({slot, port: portNum, speed})}>
          {led && <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${led}`}></div>}
        </div>
      );
    }
    return ports;
  };

  return (
    <div className="w-full max-w-3xl relative">
      {/* Chassis Container - 12U Tall Design */}
      <div className="bg-[#132329] rounded-lg border-2 border-slate-700 p-4 shadow-2xl relative flex flex-col gap-2">
        
        {/* Top Header of Chassis */}
        <div className="h-10 bg-[#1a2c33] border border-slate-700 rounded flex items-center justify-between px-6">
          <span className="text-slate-300 font-mono text-sm tracking-widest font-bold">HUAWEI S7700 Core Switch (12U)</span>
          <div className="flex gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success shadow-glow-success"></span> SYS</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success shadow-glow-success"></span> ALM</span>
          </div>
        </div>

        {/* Slot 1: MPU Active */}
        <div className="flex items-center gap-3">
          <div className="text-slate-500 font-mono text-xs w-12 text-right">Slot 1</div>
          <div className="flex-1 h-10 bg-[#1a2c33] border border-primary/30 rounded flex items-center px-4 justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <span className="text-white text-xs font-bold">SRUH (主控板 - Active)</span>
            <div className="flex gap-2">
              <div className="w-8 h-3 bg-black/50 border border-slate-600 rounded-sm flex items-center justify-center">
                <div className="w-4 h-1 bg-success rounded-full shadow-glow-success"></div>
              </div>
              <div className="w-12 h-3 bg-black/50 border border-slate-600 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Slot 2: MPU Standby */}
        <div className="flex items-center gap-3">
          <div className="text-slate-500 font-mono text-xs w-12 text-right">Slot 2</div>
          <div className="flex-1 h-10 bg-[#1a2c33] border border-slate-700 rounded flex items-center px-4 justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-500"></div>
            <span className="text-slate-400 text-xs font-bold">SRUH (主控板 - Standby)</span>
            <div className="flex gap-2">
              <div className="w-8 h-3 bg-black/50 border border-slate-600 rounded-sm flex items-center justify-center">
                <div className="w-4 h-1 bg-warning rounded-full shadow-glow-warning"></div>
              </div>
              <div className="w-12 h-3 bg-black/50 border border-slate-600 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Slot 3: 48x1GE Interface */}
        <div className="flex items-center gap-3 relative">
          <div className="text-primary font-mono text-xs w-12 text-right">Slot 3</div>
          <div className="flex-1 h-14 bg-[#1a2c33] border border-primary/50 rounded flex items-center px-2 gap-4 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50"></div>
            <div className="flex-1 flex justify-between px-4">
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(3, '1 Gbps', 1, 12, [1,2,3,4,5,6,7,8,9,10,11,12], [])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(3, '1 Gbps', 13, 12, [1,2,3,4,5,6,7,8,9,10], [11])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(3, '1 Gbps', 25, 12, [1,2,3,4], [])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(3, '1 Gbps', 37, 12, [1,2,5,6], [])}</div>
            </div>
            <span className="text-slate-400 text-[10px] font-bold font-mono absolute right-2 bottom-1">48x1GE RJ45</span>
          </div>
        </div>

        {/* Slot 4: 48x10GE Interface */}
        <div className="flex items-center gap-3 relative">
          <div className="text-primary font-mono text-xs w-12 text-right">Slot 4</div>
          <div className="flex-1 h-14 bg-[#1a2c33] border border-primary shadow-[0_0_15px_rgba(37,192,244,0.2)] rounded flex items-center px-2 gap-4 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex-1 flex justify-between px-4">
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(4, '10 Gbps', 1, 12, [1,2,4,5,7,8,9,10], [3])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(4, '10 Gbps', 13, 12, [1,2,3,4,5,6,7,8,9,10,11,12], [])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(4, '10 Gbps', 25, 12, [1,2,3,4], [])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(4, '10 Gbps', 37, 12, [1,2,5,6], [])}</div>
            </div>
            <span className="text-primary text-[10px] font-bold font-mono absolute right-2 bottom-1">48x10GE SFP+</span>
          </div>
        </div>

        {/* Slot 5: 48x10GE Interface */}
        <div className="flex items-center gap-3 relative">
          <div className="text-primary font-mono text-xs w-12 text-right">Slot 5</div>
          <div className="flex-1 h-14 bg-[#1a2c33] border border-primary/80 rounded flex items-center px-2 gap-4 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex-1 flex justify-between px-4">
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(5, '10 Gbps', 1, 12, [1,2,3,4], [])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(5, '10 Gbps', 13, 12, [], [])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(5, '10 Gbps', 25, 12, [], [])}</div>
              <div className="grid grid-cols-6 gap-1">{renderMiniPorts(5, '10 Gbps', 37, 12, [], [])}</div>
            </div>
            <span className="text-primary text-[10px] font-bold font-mono absolute right-2 bottom-1">48x10GE SFP+</span>
          </div>
        </div>

        {/* Slot 6: 8x40GE Interface */}
        <div className="flex items-center gap-3">
          <div className="text-primary font-mono text-xs w-12 text-right">Slot 6</div>
          <div className="flex-1 h-14 bg-[#1a2c33] border border-primary/80 rounded flex items-center px-4 justify-between relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex gap-4 ml-2">
              {[1,2,3,4,5,6,7,8].map(p => (
                <div key={p} onClick={() => setSelectedInterface({slot: 6, port: p, speed: '40 Gbps'})} className="w-10 h-6 bg-black/50 border border-primary/50 rounded-sm relative overflow-hidden cursor-pointer hover:border-white transition-colors z-10">
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${[1,2,5].includes(p) ? 'bg-primary shadow-[0_0_4px_#25c0f4]' : 'bg-slate-700'}`}></div>
                </div>
              ))}
            </div>
            <span className="text-white text-[10px] font-bold font-mono">8x40GE QSFP+</span>
          </div>
        </div>

        {/* Slot 7: 8x40GE Interface */}
        <div className="flex items-center gap-3">
          <div className="text-primary font-mono text-xs w-12 text-right">Slot 7</div>
          <div className="flex-1 h-14 bg-[#1a2c33] border border-primary/80 rounded flex items-center px-4 justify-between relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex gap-4 ml-2">
              {[1,2,3,4,5,6,7,8].map(p => (
                <div key={p} onClick={() => setSelectedInterface({slot: 7, port: p, speed: '40 Gbps'})} className="w-10 h-6 bg-black/50 border border-primary/50 rounded-sm relative overflow-hidden cursor-pointer hover:border-white transition-colors z-10">
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${[1,2].includes(p) ? 'bg-primary shadow-[0_0_4px_#25c0f4]' : 'bg-slate-700'}`}></div>
                </div>
              ))}
            </div>
            <span className="text-white text-[10px] font-bold font-mono">8x40GE QSFP+</span>
          </div>
        </div>

        {/* Slot 8: Empty */}
        <div className="flex items-center gap-3">
          <div className="text-slate-600 font-mono text-xs w-12 text-right">Slot 8</div>
          <div className="flex-1 h-14 bg-black/20 border border-dashed border-slate-700 rounded flex items-center justify-center">
            <span className="text-slate-600 text-xs font-mono">Empty / Reserved</span>
          </div>
        </div>

        {/* Telemetry Popup */}
        <AnimatePresence>
          {selectedInterface && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-80 glass-panel rounded-xl border border-primary/30 shadow-2xl overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-surface-light/50">
                <h4 className="text-primary font-bold text-sm">Port 0/{selectedInterface.slot}/{selectedInterface.port} Telemetry</h4>
                <span className="px-2 py-0.5 bg-success/20 text-success text-[10px] rounded border border-success/30">Linked</span>
              </div>
              <div className="p-4 bg-surface/90 backdrop-blur">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="text-[10px] text-slate-400 mb-1">Rate</div>
                    <div className="text-lg font-mono text-white">{selectedInterface.speed}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 mb-1">Optical Power</div>
                    <div className="text-lg font-mono text-white">-2.4 dBm</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 mb-2">Traffic (In/Out)</div>
                  <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trafficData}>
                        <defs>
                          <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="step" dataKey="in" stroke="#25c0f4" strokeWidth={2} fillOpacity={1} fill="url(#colorIn)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Power & Fan Modules at Bottom */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <div className="h-10 bg-[#1a2c33] border border-slate-700 rounded flex items-center px-4 justify-between">
              <span className="text-slate-400 text-xs font-mono">PWR 1 (AC 2200W)</span>
              <div className="w-3 h-3 rounded-full bg-success shadow-glow-success"></div>
            </div>
            <div className="h-10 bg-[#1a2c33] border border-slate-700 rounded flex items-center px-4 justify-between">
              <span className="text-slate-400 text-xs font-mono">PWR 2 (AC 2200W)</span>
              <div className="w-3 h-3 rounded-full bg-success shadow-glow-success"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-10 bg-[#1a2c33] border border-slate-700 rounded flex items-center px-4 justify-between">
              <span className="text-slate-400 text-xs font-mono">FAN TRAY 1</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-success shadow-glow-success"></div>
                <div className="w-2 h-2 rounded-full bg-success shadow-glow-success"></div>
                <div className="w-2 h-2 rounded-full bg-success shadow-glow-success"></div>
              </div>
            </div>
            <div className="h-10 bg-[#1a2c33] border border-slate-700 rounded flex items-center px-4 justify-between">
              <span className="text-slate-400 text-xs font-mono">FAN TRAY 2</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-success shadow-glow-success"></div>
                <div className="w-2 h-2 rounded-full bg-success shadow-glow-success"></div>
                <div className="w-2 h-2 rounded-full bg-success shadow-glow-success"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
