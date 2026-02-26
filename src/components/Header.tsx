import React from 'react';
import { Search, Bell, Network } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between z-20 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="text-primary">
          <Network className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-white font-display font-semibold tracking-wide text-sm">网络设备数字孪生平台 <span className="text-slate-500 font-normal ml-2">Network</span></h2>
          <p className="text-slate-400 text-[10px]">Digital Twin Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:flex items-center w-64 h-9 bg-background border border-border rounded-full overflow-hidden focus-within:border-primary transition-colors">
          <div className="pl-3 text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            placeholder="搜索设备/端口 (Search)" 
            className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:ring-0 px-2 outline-none"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white leading-tight">Admin</span>
            <span className="text-[10px] text-success flex items-center gap-1">
              在线 <span className="text-slate-500 scale-75">(Online)</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
