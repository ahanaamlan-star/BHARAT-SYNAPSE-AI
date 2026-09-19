import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { SIMULATION_SCENARIOS } from '../../data/initialData';
import { FlaskConical, Play, AlertTriangle, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export const SimulationLabView: React.FC = () => {
  const { runScenario, activeScenarioResult, clearScenario, setActiveTab } = useSystem();

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* Banner Link to Counterfactual Engine */}
      <div className="bg-gradient-to-r from-cyan-950 via-[#0e1424] to-indigo-950 p-4 rounded-xl border border-cyan-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400 shrink-0 animate-pulse" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-100">COUNTERFACTUAL INFRASTRUCTURE ENGINE™ READY</h3>
            <p className="text-xs text-slate-300 font-sans mt-0.5">
              Interactively adjust 9 stress controls (Load, Temp, Pressure, Voltage, Latency, Redundancy, etc.) and analyze side-by-side Current vs Counterfactual vs Recovery states.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('counterfactual')}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-lg flex items-center gap-1.5 shrink-0 shadow transition-all"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" /> LAUNCH COUNTERFACTUAL ENGINE
        </button>
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0e1424] p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100">COUNTERFACTUAL SIMULATION LAB</h2>
            <span className="text-xs text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
              "WHAT-IF" ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate cyber-physical attacks, solar geomagnetic storms, and grid cascading failures to observe side-by-side Twin deltas.
          </p>
        </div>

        {activeScenarioResult && (
          <button
            onClick={clearScenario}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> CLEAR ACTIVE SCENARIO
          </button>
        )}
      </div>

      {/* Active Scenario Result Spotlight */}
      {activeScenarioResult && (
        <div className="bg-[#0e1424] border border-cyan-500/50 rounded-xl p-5 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">ACTIVE SIMULATION RESULT</span>
              <h3 className="text-base font-bold text-slate-100 mt-0.5">{activeScenarioResult.scenario.name}</h3>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold rounded bg-red-500/20 text-red-400 border border-red-500/40">
              Intensity: {activeScenarioResult.scenario.intensity}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">PHYSICAL HEALTH DELTA</div>
              <div className="text-2xl font-bold text-red-400 my-1">{activeScenarioResult.physicalTwinHealthDelta}%</div>
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">TRUST SCORE DELTA</div>
              <div className="text-2xl font-bold text-amber-400 my-1">{activeScenarioResult.trustTwinScoreDelta}%</div>
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">RISK PROBABILITY INCREASE</div>
              <div className="text-2xl font-bold text-indigo-300 my-1">+{activeScenarioResult.intelligenceRiskIncrease}%</div>
            </div>

            <div className="p-3 bg-slate-900 rounded border border-slate-800">
              <div className="text-[10px] text-cyan-400 font-bold">REALITY CONFIDENCE DELTA</div>
              <div className="text-2xl font-bold text-cyan-300 my-1">{activeScenarioResult.realityConfidenceDelta}%</div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-slate-200">CASCADING IMPACT SUMMARY:</div>
            <p className="text-slate-400">{activeScenarioResult.cascadingImpactSummary}</p>
            <div className="font-bold text-cyan-400 pt-1">RECOMMENDED COUNTERMEASURE:</div>
            <p className="text-emerald-300">{activeScenarioResult.recommendedCountermeasure}</p>
          </div>
        </div>
      )}

      {/* Available Scenario Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SIMULATION_SCENARIOS.map((scen) => (
          <div key={scen.id} className="p-5 bg-[#0e1424] border border-slate-800 hover:border-cyan-500/40 rounded-xl space-y-3 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">{scen.type}</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  {scen.intensity}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-200 mt-1">{scen.name}</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{scen.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Domain: {scen.domainTarget}</span>
              <button
                onClick={() => runScenario(scen.id)}
                className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> EXECUTE SCENARIO
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
