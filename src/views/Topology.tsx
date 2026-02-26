import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Shield, Server, Router, Activity, Zap } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  type: string;
  model: string;
  x: string;
  y: string;
  status: 'normal' | 'warning' | 'danger';
  icon: React.ElementType;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  status: 'normal' | 'warning' | 'danger';
  traffic: string;
  usage: number;
}

const nodes: Node[] = [
  { id: 'internet', name: 'Internet', type: 'External', model: '', x: '50%', y: '15%', status: 'normal', icon: Cloud },
  { id: 'm9000', name: 'DC Firewall', type: 'Gateway', model: 'M9000', x: '50%', y: '35%', status: 'normal', icon: Shield },
  { id: 's7700', name: 'Core-01', type: 'Core Switch', model: 'S7700', x: '30%', y: '60%', status: 'normal', icon: Server },
  { id: 's7600', name: 'Core-02', type: 'Core Switch', model: 'S7600', x: '70%', y: '60%', status: 'warning', icon: Server },
  { id: 's5500', name: 'Access-01', type: 'Access Switch', model: 'S5500', x: '30%', y: '85%', status: 'normal', icon: Router },
  { id: 'usg6535e', name: 'Branch-FW', type: 'Firewall', model: 'USG6535E', x: '70%', y: '85%', status: 'normal', icon: Shield },
];

const edges: Edge[] = [
  { id: 'e1', source: 'internet', target: 'm9000', status: 'normal', traffic: '1.2 Gbps', usage: 12 },
  { id: 'e2', source: 'm9000', target: 's7700', status: 'normal', traffic: '8.5 Gbps', usage: 45 },
  { id: 'e3', source: 'm9000', target: 's7600', status: 'normal', traffic: '7.2 Gbps', usage: 38 },
  { id: 'e4', source: 's7700', target: 's7600', status: 'warning', traffic: '38.4 Gbps', usage: 92 }, // Heartbeat/Trunk
  { id: 'e5', source: 's7700', target: 's5500', status: 'normal', traffic: '2.1 Gbps', usage: 21 },
  { id: 'e6', source: 's7600', target: 'usg6535e', status: 'normal', traffic: '0.8 Gbps', usage: 8 },
];

export default function Topology({ setCurrentView, setSelectedDevice }: { setCurrentView: (view: string) => void, setSelectedDevice: (device: string) => void }) {
  const [activeEdge, setActiveEdge] = useState<Edge | null>(null);

  // Helper to get node coordinates for SVG lines
  const getNodeCoords = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: '0%', y: '0%' };
  };

  return (
    <div className="h-full w-full flex flex-col p-6">
      <div className="flex justify-between items-center mb-6 z-30 relative">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          全网逻辑拓扑视图 (Logical Topology)
        </h2>
        <div className="flex gap-4">
          <span className="px-3 py-1.5 bg-surface/80 backdrop-blur border border-border rounded-lg text-xs text-slate-300 flex items-center gap-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-success shadow-glow-success"></span> 正常 (Normal)
          </span>
          <span className="px-3 py-1.5 bg-surface/80 backdrop-blur border border-border rounded-lg text-xs text-slate-300 flex items-center gap-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-warning shadow-glow-warning"></span> 高负载 (High Load)
          </span>
          <span className="px-3 py-1.5 bg-surface/80 backdrop-blur border border-border rounded-lg text-xs text-slate-300 flex items-center gap-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-danger shadow-glow-danger"></span> 拥塞 (Congested)
          </span>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-xl relative overflow-hidden flex items-center justify-center border border-primary/20 shadow-[0_0_40px_rgba(37,192,244,0.05)]">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[size:60px_60px] opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #25c0f4 1px, transparent 1px), linear-gradient(to bottom, #25c0f4 1px, transparent 1px)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none"></div>
        
        {/* SVG Topology Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="gradNormal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#25c0f4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gradWarning" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#25c0f4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glowLine">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {edges.map((edge) => {
            const source = getNodeCoords(edge.source);
            const target = getNodeCoords(edge.target);
            const isWarning = edge.status === 'warning';
            const strokeColor = isWarning ? 'url(#gradWarning)' : 'url(#gradNormal)';
            const isHovered = activeEdge?.id === edge.id;
            
            return (
              <g key={edge.id}>
                {/* Invisible wider line for easier hovering if we wanted to make lines interactive */}
                <line 
                  x1={source.x} y1={source.y} 
                  x2={target.x} y2={target.y} 
                  stroke="transparent" strokeWidth="20" 
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setActiveEdge(edge)}
                  onMouseLeave={() => setActiveEdge(null)}
                />
                {/* Actual visible line */}
                <motion.line 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isHovered ? 1 : 0.6 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  x1={source.x} y1={source.y} 
                  x2={target.x} y2={target.y} 
                  stroke={strokeColor} 
                  strokeWidth={isHovered ? "4" : "2"} 
                  strokeDasharray={isWarning ? "8,8" : "none"}
                  className={isWarning ? "animate-[dash_10s_linear_infinite]" : ""}
                  filter={isHovered || isWarning ? "url(#glowLine)" : ""}
                />
                {/* Animated traffic particles */}
                {!isWarning && (
                  <circle r="3" fill="#fff" filter="url(#glowLine)">
                    <animateMotion dur={`${3 - (edge.usage / 50)}s`} repeatCount="indefinite">
                      <mpath href={`#path-${edge.id}`} />
                    </animateMotion>
                  </circle>
                )}
                <path id={`path-${edge.id}`} d={`M ${source.x.replace('%','')} ${source.y.replace('%','')} L ${target.x.replace('%','')} ${target.y.replace('%','')}`} fill="none" className="hidden" />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isClickable = node.model !== '';
          const isWarning = node.status === 'warning';
          
          let ringColor = 'border-primary/30';
          let glowColor = 'shadow-glow';
          let iconColor = 'text-primary';
          
          if (isWarning) {
            ringColor = 'border-warning/50';
            glowColor = 'shadow-glow-warning';
            iconColor = 'text-warning';
          }

          return (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5, type: 'spring' }}
              onClick={() => {
                if (isClickable) {
                  setSelectedDevice(node.model);
                  setCurrentView('hardware');
                }
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-20 ${isClickable ? 'cursor-pointer' : ''}`}
              style={{ left: node.x, top: node.y }}
            >
              {/* Node Circle/Box */}
              <div className={`relative w-16 h-16 rounded-2xl bg-surface-light border ${ringColor} flex items-center justify-center ${glowColor} group-hover:scale-110 transition-all duration-300 backdrop-blur-md`}>
                {isWarning && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-warning border-2 border-surface"></span>
                  </span>
                )}
                <Icon className={`w-8 h-8 ${iconColor} group-hover:text-white transition-colors`} />
              </div>
              
              {/* Node Labels */}
              <div className="mt-3 flex flex-col items-center bg-background/80 backdrop-blur px-3 py-1.5 rounded-lg border border-border/50 shadow-lg">
                <span className="text-sm font-bold text-white whitespace-nowrap">{node.name}</span>
                <span className={`text-[10px] font-mono mt-0.5 ${isWarning ? 'text-warning' : 'text-slate-400'}`}>
                  {node.model || node.type}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Floating Info Panel for Active Edge */}
        <AnimatePresence>
          {activeEdge && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-8 right-8 glass-panel p-5 rounded-xl w-72 z-40 border border-primary/30 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className={`w-4 h-4 ${activeEdge.status === 'warning' ? 'text-warning' : 'text-primary'}`} />
                <h4 className="text-sm font-bold text-white">链路实时状态</h4>
              </div>
              
              <p className="text-xs text-slate-300 font-mono bg-black/30 p-2 rounded mb-4 border border-border">
                {nodes.find(n => n.id === activeEdge.source)?.name} 
                <span className="mx-2 text-primary">↔</span> 
                {nodes.find(n => n.id === activeEdge.target)?.name}
              </p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">带宽占用率 (Usage)</span>
                    <span className={`font-bold ${activeEdge.status === 'warning' ? 'text-warning' : 'text-success'}`}>
                      {activeEdge.usage}%
                    </span>
                  </div>
                  <div className="w-full bg-background h-2 rounded-full overflow-hidden border border-border/50">
                    <div 
                      className={`h-full ${activeEdge.status === 'warning' ? 'bg-warning' : 'bg-success'}`} 
                      style={{ width: `${activeEdge.usage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-border/50">
                  <span className="text-slate-400">实时流量 (Traffic)</span>
                  <span className="text-white font-mono font-bold">{activeEdge.traffic}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
}
