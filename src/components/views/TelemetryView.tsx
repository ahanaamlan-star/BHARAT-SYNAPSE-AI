import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import { TelemetryPoint } from '../../types';
import { Activity, Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Database } from 'lucide-react';

export const TelemetryView: React.FC = () => {
  const {
    selectedAsset,
    telemetryHistory,
    isLive,
    toggleLive,
    resetSimulation,
    injectAnomaly
  } = useSystem();

  const [selectedMetric, setSelectedMetric] = useState<string>('All');

  const filteredHistory = selectedMetric === 'All'
    ? telemetryHistory
    : telemetryHistory.filter((t) => t.metric === selectedMetric);

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0e1424] p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold font-mono text-slate-100">HIGH-FREQUENCY TELEMETRY STREAM</h2>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
              REAL-TIME FEED
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Streaming live synthetic telemetry parameters for asset <strong className="text-cyan-300">{selectedAsset.code}: {selectedAsset.name}</strong>
          </p>
        </div>

        {/* Live Controls Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLive}
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              isLive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {isLive ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            {isLive ? 'PAUSE FEED' : 'RESUME FEED'}
          </button>

          <button
            onClick={resetSimulation}
            className="p-1.5 rounded text-slate-400 hover:text-slate-100 bg-slate-800 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Injected Anomaly Quick Trigger Panel */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          SIMULATION TELEMETRY INJECTION MATRIX
        </h3>
        <p className="text-xs font-mono text-slate-400">
          Inject synthetic anomalies into the live streaming pipeline to observe real-time Trust Twin & Reality Confidence Score™ recalculations.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          <button
            onClick={() => injectAnomaly(selectedAsset.id, 'SPIKE')}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 rounded transition-all"
          >
            + Voltage Spike
          </button>
          <button
            onClick={() => injectAnomaly(selectedAsset.id, 'DRIFT')}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 rounded transition-all"
          >
            + Sensor Drift
          </button>
          <button
            onClick={() => injectAnomaly(selectedAsset.id, 'FROZEN')}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700 rounded transition-all"
          >
            + Frozen Data
          </button>
          <button
            onClick={() => injectAnomaly(selectedAsset.id, 'SPOOFED')}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-700 rounded transition-all"
          >
            + Cyber Spoofing
          </button>
          <button
            onClick={() => injectAnomaly(selectedAsset.id, 'MISSING')}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-700 rounded transition-all"
          >
            + Packet Loss
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Data Table */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-mono font-bold text-slate-200 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            TELEMETRY PACKET LOG ({filteredHistory.length} RECENT TICKS)
          </h3>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">FILTER METRIC:</span>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-slate-900 text-cyan-300 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="All">All Metrics</option>
              <option value="Temperature">Temperature</option>
              <option value="Voltage">Voltage</option>
              <option value="Load">Load</option>
              <option value="Vibration">Vibration</option>
              <option value="Latency">Latency</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Metric</th>
                <th className="py-2.5 px-3">Value</th>
                <th className="py-2.5 px-3">Expected Range</th>
                <th className="py-2.5 px-3">Trust Score</th>
                <th className="py-2.5 px-3">Anomaly Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((pt, idx) => (
                  <tr key={idx} className={`hover:bg-slate-900/60 transition-colors ${pt.isAnomaly ? 'bg-red-950/20' : ''}`}>
                    <td className="py-2 px-3 text-slate-400">{pt.timestamp}</td>
                    <td className="py-2 px-3 font-bold text-cyan-300">{pt.metric}</td>
                    <td className="py-2 px-3 font-bold text-slate-100">
                      {pt.value} {pt.unit}
                    </td>
                    <td className="py-2 px-3 text-slate-500">
                      [{pt.expectedMin} - {pt.expectedMax}]
                    </td>
                    <td className="py-2 px-3">
                      <span className={`font-bold ${pt.trustScore < 50 ? 'text-red-400' : pt.trustScore < 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {pt.trustScore}%
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {pt.isAnomaly ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/40 font-bold">
                          {pt.anomalyType || 'ANOMALY'}
                        </span>
                      ) : (
                        <span className="text-slate-600">NORMAL</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    Awaiting live telemetry packet arrival... (Ensure stream is unpaused)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
