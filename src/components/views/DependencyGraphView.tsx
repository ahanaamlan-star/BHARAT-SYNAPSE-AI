import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import { TrustPropagationGraph } from './TrustPropagationGraph';
import { GitFork, ArrowRight, Layers, ShieldAlert, Network, Workflow } from 'lucide-react';

export const DependencyGraphView: React.FC = () => {
  const { assets, dependencies, setActiveTab } = useSystem();
  const [activeSubTab, setActiveSubTab] = useState<'propagation' | 'matrix'>('propagation');

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* Cascade Engine Quick Launch Banner */}
      <div className="bg-gradient-to-r from-red-950 via-[#0e1424] to-indigo-950 p-3.5 rounded-xl border border-red-800/80 flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2.5">
          <Workflow className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
          <span className="text-xs font-bold text-slate-100">
            CASCADE ENGINE™ — Model synthetic failure propagation through dependent infrastructure.
          </span>
        </div>
        <button
          onClick={() => setActiveTab('cascade')}
          className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-lg flex items-center gap-1 shrink-0 cursor-pointer"
        >
          SIMULATE CASCADE <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sub-navigation Switcher */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('propagation')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'propagation'
              ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
              : 'bg-[#0e1424] text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <GitFork className="w-4 h-4 text-cyan-400" /> TRUST PROPAGATION GRAPH™
        </button>

        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'matrix'
              ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
              : 'bg-[#0e1424] text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Network className="w-4 h-4 text-indigo-400" /> INTER-DOMAIN DEPENDENCY MATRIX
        </button>
      </div>

      {activeSubTab === 'propagation' ? (
        <TrustPropagationGraph />
      ) : (
        <div className="space-y-6">
          {/* Matrix Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0e1424] p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-slate-100">INTER-DOMAIN DEPENDENCY MATRIX</h2>
                <span className="text-xs text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                  CASCADE RISKS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing inter-domain critical infrastructure coupling (Power → Telecom → SCADA → Water → Industry).
              </p>
            </div>
          </div>

          {/* Dependency Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dependencies.map((dep) => {
              const sourceAsset = assets.find((a) => a.id === dep.sourceAssetId);
              const targetAsset = assets.find((a) => a.id === dep.targetAssetId);

              if (!sourceAsset || !targetAsset) return null;

              return (
                <div key={dep.id} className="p-4 bg-[#0e1424] border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-400">{dep.dependencyType}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dep.activeState === 'Normal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      State: {dep.activeState}
                    </span>
                  </div>

                  {/* Source -> Target Chain */}
                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800 text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{sourceAsset.code}</div>
                      <div className="text-[10px] text-slate-400">{sourceAsset.domain}</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-cyan-400" />

                    <div className="text-right">
                      <div className="font-bold text-slate-200">{targetAsset.code}</div>
                      <div className="text-[10px] text-slate-400">{targetAsset.domain}</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>Criticality Weight: <strong className="text-slate-200">{(dep.criticalityWeight * 100).toFixed(0)}%</strong></span>
                    <span>Cascade Collapse Index: <strong className="text-amber-400">{dep.activeState === 'Normal' ? 'Low' : 'Elevated'}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
