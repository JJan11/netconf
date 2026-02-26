import React from 'react';
import { LayoutDashboard, Server, Network, ShieldAlert, Settings, Activity, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: '资源总览' },
    { id: 'hardware', icon: Server, label: '设备孪生' },
    { id: 'topology', icon: Network, label: '拓扑管理' },
    { id: 'performance', icon: Activity, label: '性能监控' },
  ];

  return (
    <aside className="w-16 bg-surface border-r border-border flex flex-col items-center relative z-20 py-4">
      <div className="mb-8 text-primary">
        <Network className="w-8 h-8" />
      </div>

      <nav className="flex-1 w-full flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all relative group ${
                isActive ? 'text-primary bg-primary/10 shadow-glow' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>

      <div className="w-full flex flex-col items-center gap-4 mt-auto">
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
          <Settings className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
