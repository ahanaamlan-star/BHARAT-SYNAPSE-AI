import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { RealityConfidenceGauge } from '../common/RealityConfidenceGauge';
import {
  ShieldAlert,
  Activity,
  AlertOctagon,
  Zap,
  Globe,
  TrendingDown,
  ChevronRight,
  MapPin,
  Cpu,
  Layers
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { assets, incidents, selectAsset, setActiveTab, selectedDomainFilter } = useSystem();

  const filteredAssets = selectedDomainFilter === 'All'
    ? assets
    : assets.filter((a) => a.domain === selectedDomainFilter);

  const totalAssets = filteredAssets.length;
  const healthyCount = filteredAssets.filter((a) => a.physicalTwin.status === 'Healthy').length;
  const warningCount = filteredAssets.filter((a) => a.physicalTwin.status === 'Warning').length;
  const criticalCount = filteredAssets.filter((a) => a.physicalTwin.status === 'Critical').length;

  const avgHealth = Math.round(filteredAssets.reduce((acc, a) => acc + a.physicalTwin.overallHealth, 0) / (totalAssets || 1));
  const avgDataTrust = Math.round(filteredAssets.reduce((acc, a) => acc + a.trustTwin.overallDataTrust, 0) / (totalAssets || 1));
  const avgRC = Math.round(filteredAssets.reduce((acc, a) => acc + a.realityConfidence.score, 0) / (totalAssets || 1));
  const avgFailureRisk = Math.round(filteredAssets.reduce((acc, a) => acc + a.intelligenceTwin.failureProbability, 0) / (totalAssets || 1));

  // Highest risk asset for hero spotlight
  const highestRiskAsset = [...filteredAssets].sort((a, b) => b.intelligenceTwin.failureProbability - a.intelligenceTwin.failureProbability)[0];

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn">
      {/* Flagship Engine Feature Banner */}
      <div className="p-4 bg-gradient-to-r from-cyan-950/80 via-indigo-950/80 to-slate-900 rounded-2xl border border-cyan-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-300 rounded-xl border border-cyan-400/50">
            <Layers className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">FLAGSHIP FEATURE</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                TWIN-OF-TWINS™ ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Explore the interconnected Physical, Intelligence, and Trust twins with real-time causal flow & interactive sensor inspector.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('twin-engine')}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-950 shrink-0 cursor-pointer"
        >
          <span>OPEN VISUAL ENGINE</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top Banner / Hero Metric Spotlight */}
      {highestRiskAsset && (
        <RealityConfidenceGauge data={highestRiskAsset.realityConfidence} />
      )}

      {/* KPI Command Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-[#0e1424] rounded-xl border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">TOTAL ASSETS</div>
          <div className="text-2xl font-mono font-bold text-slate-100 my-1">{totalAssets}</div>
          <div className="text-[10px] font-mono text-cyan-400">5 Critical Domains</div>
        </div>

        <div className="p-3.5 bg-[#0e1424] rounded-xl border border-slate-800">
          <div className="text-[11px] font-mono text-emerald-400">HEALTHY ASSETS</div>
          <div className="text-2xl font-mono font-bold text-emerald-400 my-1">{healthyCount}</div>
          <div className="text-[10px] font-mono text-slate-400">Optimal Parameters</div>
        </div>

        <div className="p-3.5 bg-[#0e1424] rounded-xl border border-slate-800">
          <div className="text-[11px] font-mono text-amber-400">WARNING ASSETS</div>
          <div className="text-2xl font-mono font-bold text-amber-400 my-1">{warningCount}</div>
          <div className="text-[10px] font-mono text-slate-400">Thermal/Drift Stress</div>
        </div>

        <div className="p-3.5 bg-[#0e1424] rounded-xl border border-slate-800">
          <div className="text-[11px] font-mono text-red-400">CRITICAL ASSETS</div>
          <div className="text-2xl font-mono font-bold text-red-400 my-1">{criticalCount}</div>
          <div className="text-[10px] font-mono text-slate-400">Action Required</div>
        </div>

        <div className="p-3.5 bg-[#0e1424] rounded-xl border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">AVG DATA TRUST</div>
          <div className="text-2xl font-mono font-bold text-amber-300 my-1">{avgDataTrust}%</div>
          <div className="text-[10px] font-mono text-slate-400">Sensor Stream Integrity</div>
        </div>

        <div className="p-3.5 bg-[#0e1424] rounded-xl border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">AVG REALITY CONF.</div>
          <div className="text-2xl font-mono font-bold text-cyan-400 my-1">{avgRC}%</div>
          <div className="text-[10px] font-mono text-slate-400">Verified Twin Consensus</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Asset Command Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-mono tracking-wide text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              CRITICAL INFRASTRUCTURE ASSETS ({filteredAssets.length})
            </h2>
            <button
              onClick={() => setActiveTab('digital-twin')}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              Open Digital Twin Inspector <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map((asset) => {
              const rc = asset.realityConfidence;

              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    selectAsset(asset.id);
                    setActiveTab('digital-twin');
                  }}
                  className="p-4 bg-[#0e1424] hover:bg-[#121a30] border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{asset.code}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                          {asset.domain}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors mt-0.5">
                        {asset.name}
                      </h3>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {asset.location.name}
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                        asset.physicalTwin.status === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : asset.physicalTwin.status === 'Warning'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {asset.physicalTwin.status}
                    </span>
                  </div>

                  {/* Twin Metrics Triad */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                    <div className="bg-slate-900/60 p-2 rounded">
                      <div className="text-[9px] text-slate-400">PHYSICAL HEALTH</div>
                      <div className="font-bold text-slate-200">{asset.physicalTwin.overallHealth}%</div>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded">
                      <div className="text-[9px] text-slate-400">DATA TRUST</div>
                      <div className="font-bold text-amber-400">{asset.trustTwin.overallDataTrust}%</div>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded">
                      <div className="text-[9px] font-bold text-cyan-400">REALITY CONF.™</div>
                      <div className="font-bold text-cyan-300">{rc.score}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (1 Col): Incidents & Interactive Infrastructure Map */}
        <div className="space-y-6">
          {/* Active Incidents Feed */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-red-400" />
                ACTIVE INCIDENTS & REASONING
              </h3>
              <button
                onClick={() => setActiveTab('incidents')}
                className="text-[10px] font-mono text-cyan-400 hover:underline"
              >
                View All ({incidents.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {incidents.slice(0, 3).map((inc) => (
                <div key={inc.id} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-400">{inc.code}</span>
                    <span className="text-[10px] text-slate-400">{inc.detectedAt}</span>
                  </div>
                  <div className="font-bold text-slate-200">{inc.title}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2">{inc.description}</div>
                  <div className="flex items-center justify-between text-[10px] pt-1 text-slate-500">
                    <span>Root Cause: <strong className="text-slate-300">{inc.rootCauseCategory}</strong></span>
                    <span className="text-amber-400">RC Score: {inc.realityConfidenceAtTrigger}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* National Infrastructure Interactive Map Canvas */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-cyan-400" />
              NATIONAL CRITICAL INFRASTRUCTURE GRID (SIMULATED)
            </h3>

            <div className="relative w-full h-48 bg-[#080d19] rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Simulated India Grid Vector Background */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

              {/* Asset Geographic Nodes */}
              {assets.map((a, idx) => {
                const topPos = 20 + (idx * 16) % 65;
                const leftPos = 15 + (idx * 18) % 70;

                return (
                  <div
                    key={a.id}
                    onClick={() => {
                      selectAsset(a.id);
                      setActiveTab('digital-twin');
                    }}
                    style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                    className="absolute cursor-pointer group"
                    title={`${a.code} - ${a.name} (${a.domain})`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${a.physicalTwin.status === 'Critical' ? 'bg-red-500 animate-ping' : a.physicalTwin.status === 'Warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <div className={`absolute w-2 h-2 rounded-full ${a.physicalTwin.status === 'Critical' ? 'bg-red-500' : a.physicalTwin.status === 'Warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    </div>
                    <span className="absolute left-4 -top-1 hidden group-hover:block bg-slate-900 text-[9px] font-mono text-cyan-300 px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap z-20">
                      {a.code}: {a.realityConfidence.score}% RC
                    </span>
                  </div>
                );
              })}

              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                INDIAN NATIONAL GRID • 5 REGIONAL NODES
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
