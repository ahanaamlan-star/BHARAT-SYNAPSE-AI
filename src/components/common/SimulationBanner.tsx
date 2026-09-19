import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Cpu, Award } from 'lucide-react';
import { DomainType } from '../../types';

export const SimulationBanner: React.FC = () => {
  const { isLive, toggleLive, resetSimulation, selectedDomainFilter, setSelectedDomainFilter, assets, activeTab, setActiveTab } = useSystem();

  const domains: (DomainType | 'All')[] = ['All', 'Power', 'Telecommunications', 'Water', 'Transportation', 'Industrial'];

  const criticalCount = assets.filter((a) => a.physicalTwin.status === 'Critical').length;
  const warningCount = assets.filter((a) => a.physicalTwin.status === 'Warning').length;

  return (
    <div className="bg-[#0b101d] border-b border-slate-800/80 text-slate-100 px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 via-indigo-600 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0b101d] rounded flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-base bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent">
                BHARATSYNAPSE AI
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                SIMULATION MODE
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 tracking-tight hidden sm:block">
              SENSE. VERIFY. PREDICT. SIMULATE. RECOVER. • Trust-Aware Digital Twin Intelligence Fabric
            </p>
          </div>
        </div>
      </div>

      {/* Domain Filters & Status Summary */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
        <div className="flex items-center bg-[#070a13] p-1 rounded-lg border border-slate-800">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomainFilter(dom)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all whitespace-nowrap ${
                selectedDomainFilter === dom
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {dom === 'All' ? '🌐 All Domains' : dom}
            </button>
          ))}
        </div>
      </div>

      {/* Live Simulation Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-xs font-mono px-2.5 py-1 bg-slate-900/90 rounded border border-slate-800">
          <span className="text-slate-400">STATUS:</span>
          {criticalCount > 0 ? (
            <span className="text-red-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              {criticalCount} CRITICAL
            </span>
          ) : warningCount > 0 ? (
            <span className="text-amber-400 font-semibold">{warningCount} WARNING</span>
          ) : (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              STABLE
            </span>
          )}
        </div>

        <button
          onClick={() => setActiveTab('judge-demo')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'judge-demo'
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-lg shadow-amber-950 font-black'
              : 'bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>🏆 JUDGE DEMO</span>
        </button>

        <button
          onClick={toggleLive}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all ${
            isLive
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
          }`}
        >
          {isLive ? (
            <>
              <Pause className="w-3.5 h-3.5 text-emerald-400" />
              PAUSE STREAM
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-amber-400" />
              RESUME LIVE
            </>
          )}
        </button>

        <button
          onClick={resetSimulation}
          title="Reset Simulation State"
          className="p-1.5 rounded text-slate-400 hover:text-slate-100 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
