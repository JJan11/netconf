import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import HardwareTwin from './views/HardwareTwin';
import Topology from './views/Topology';
import Performance from './views/Performance';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDevice, setSelectedDevice] = useState('S7700');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} setSelectedDevice={setSelectedDevice} />;
      case 'hardware': return <HardwareTwin setCurrentView={setCurrentView} selectedDevice={selectedDevice} />;
      case 'topology': return <Topology setCurrentView={setCurrentView} setSelectedDevice={setSelectedDevice} />;
      case 'performance': return <Performance />;
      default: return <Dashboard setCurrentView={setCurrentView} setSelectedDevice={setSelectedDevice} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-slate-300 overflow-hidden selection:bg-primary/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[size:40px_40px] opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)' }}></div>
      
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <Header />
        <main className="flex-1 overflow-hidden relative">
          {renderView()}
        </main>
      </div>
    </div>
  );
}