import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { Settings, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { isLive, toggleLive, resetSimulation } = useSystem();

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0e1424] p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-300" />
            <h2 className="text-xl font-bold text-slate-100">SIMULATION ENGINE CONFIGURATION</h2>
            <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              SYSTEM SETTINGS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure synthetic simulation frequency, anomaly thresholds, and system state resets.
          </p>
        </div>
      </div>

      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">SIMULATION CONTROLS</h3>

        <div className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800">
          <div>
            <div className="font-bold text-slate-200 text-xs">Live Telemetry Packet Stream</div>
            <div className="text-[10px] text-slate-500">Automatically generates realistic micro-jitter and updates Twin states every 2.5s</div>
          </div>
          <button
            onClick={toggleLive}
            className={`px-3 py-1.5 rounded text-xs font-bold ${
              isLive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}
          >
            {isLive ? 'ACTIVE (STREAMING)' : 'PAUSED'}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800">
          <div>
            <div className="font-bold text-slate-200 text-xs">Reset All Synthetic Data & Incidents</div>
            <div className="text-[10px] text-slate-500">Restores all 5 domains to clean benchmark initial conditions</div>
          </div>
          <button
            onClick={resetSimulation}
            className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 rounded text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> RESET SIMULATION STATE
          </button>
        </div>
      </div>
    </div>
  );
};
