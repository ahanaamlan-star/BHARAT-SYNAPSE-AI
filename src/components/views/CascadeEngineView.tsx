import React, { useState, useEffect } from 'react';
import { useSystem } from '../../context/SystemContext';
import { CascadeEngine } from '../../services/cascadeEngine';
import { CascadeScenario, CascadeStep } from '../../types';
import {
  Workflow,
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Layers,
  Info,
  ArrowRight,
  Building2,
  RefreshCw,
  TrendingUp,
  Flame,
  Activity,
  Server,
  Radio,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const CascadeEngineView: React.FC = () => {
  const { assets, selectedAsset, selectedAssetId, selectAsset } = useSystem();

  // Generate current cascade scenario from selected asset
  const [scenario, setScenario] = useState<CascadeScenario>(() =>
    CascadeEngine.generateCascadeScenario(selectedAsset)
  );

  // Simulation state
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default at T+15 Peak
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStatusText, setSimulationStatusText] = useState<string>('');

  // Synchronize scenario when user picks a different asset
  useEffect(() => {
    setScenario(CascadeEngine.generateCascadeScenario(selectedAsset));
    setActiveStepIndex(3);
  }, [selectedAssetId]);

  const currentStep: CascadeStep = scenario.steps[activeStepIndex] || scenario.steps[0];

  // FLAGSHIP ACTION: SIMULATE CASCADE ANIMATION
  const handleSimulateCascade = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);
    setSimulationStatusText('T+0: Detecting initial thermal anomaly & dielectric stress...');

    // Step T+5
    setTimeout(() => {
      setActiveStepIndex(1);
      setSimulationStatusText('T+5: Cooling pump trip! Thermal dissipation efficiency degraded...');
    }, 800);

    // Step T+10
    setTimeout(() => {
      setActiveStepIndex(2);
      setSimulationStatusText('T+10: HV Busbar voltage sag & SCADA command latency surge...');
    }, 1600);

    // Step T+15
    setTimeout(() => {
      setActiveStepIndex(3);
      setSimulationStatusText('T+15: Telecom optical monitoring degraded. Peak operational risk reached!');
    }, 2400);

    // Step T+30
    setTimeout(() => {
      setActiveStepIndex(4);
      setSimulationStatusText('T+30: Failsafe interlock activated. Cascade vector contained.');
    }, 3200);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationStatusText('');
    }, 3800);
  };

  const getSeverityBadge = (severity: 'Critical' | 'High' | 'Medium' | 'Low') => {
    switch (severity) {
      case 'Critical':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950/90 text-red-300 border border-red-800 flex items-center gap-1 animate-pulse">
            <AlertTriangle className="w-3 h-3" /> CRITICAL
          </span>
        );
      case 'High':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-950/90 text-amber-300 border border-amber-800">HIGH</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-yellow-950/90 text-yellow-300 border border-yellow-800">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950/90 text-emerald-300 border border-emerald-800">LOW</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* HEADER & MANDATORY PROTOTYPE DISCLAIMER */}
      <div className="bg-gradient-to-r from-red-950 via-[#0e1424] to-indigo-950 p-5 rounded-xl border border-red-800/80 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Workflow className="w-6 h-6 text-red-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
              CASCADE ENGINE™
            </h2>
            <span className="text-xs font-bold text-red-300 bg-red-950 px-2.5 py-0.5 rounded border border-red-700 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-300" /> Prototype cascade model
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 font-sans max-w-2xl">
            Simulates multi-domain dependency propagation from single-point component failures.
          </p>
        </div>

        {/* Mandatory Disclaimer Badge & Asset Picker */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
          <div className="bg-slate-950 px-3 py-1.5 rounded border border-amber-800/80 text-[11px] text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Synthetic dependency simulation — Do not imply real infrastructure behaviour.</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/90 p-2.5 rounded-lg border border-slate-800">
            <Building2 className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-xs text-slate-400 font-bold uppercase">Origin:</span>
            <select
              value={selectedAssetId}
              onChange={(e) => selectAsset(e.target.value)}
              className="bg-slate-900 text-red-300 font-bold text-xs px-2.5 py-1.5 rounded border border-slate-700 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code}: {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FLAGSHIP CONTROL BANNER */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2 justify-center sm:justify-start">
            <Flame className="w-4 h-4 text-red-500" /> CASCADE ORIGIN TRIGGER
          </div>
          <div className="text-sm font-extrabold text-slate-100">
            {scenario.originAssetCode}: {scenario.originAssetName} ({scenario.triggerEvent})
          </div>
        </div>

        {/* FLAGSHIP ACTION BUTTON */}
        <button
          onClick={handleSimulateCascade}
          disabled={isSimulating}
          className={`px-7 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2.5 shadow-xl transition-all ${
            isSimulating
              ? 'bg-red-950 text-red-400 border border-red-700 cursor-not-allowed animate-pulse'
              : 'bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-slate-950 shadow-red-500/20 active:scale-98 cursor-pointer'
          }`}
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-red-300" />
              <span>PROPAGATING CASCADE VECTOR...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-slate-950" />
              <span>SIMULATE CASCADE</span>
            </>
          )}
        </button>
      </div>

      {/* ANIMATED SIMULATION STATUS BAR */}
      {isSimulating && (
        <div className="p-4 bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 border border-red-500/80 rounded-xl space-y-2 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between text-xs text-red-300 font-bold">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin text-red-400" />
              {simulationStatusText}
            </span>
            <span className="animate-pulse">CASCADE IN PROGRESS...</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-red-800">
            <div className="bg-gradient-to-r from-red-500 via-amber-400 to-indigo-500 h-2.5 rounded-full animate-pulse w-full" />
          </div>
        </div>
      )}

      {/* PROPAGATION CHAIN FLOW DIAGRAM */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              MULTI-DOMAIN PROPAGATION VECTOR
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-sans">
            6-Stage Cascading Degradation Vector
          </span>
        </div>

        {/* Chain Badges Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {scenario.propagationPath.map((nodeTitle, idx) => {
            const isActive = idx <= activeStepIndex + 1;
            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-b from-red-950/80 to-slate-950 border-red-800 text-red-200 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">STAGE 0{idx + 1}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />}
                </div>
                <div className="text-xs font-bold leading-tight flex items-center gap-1">
                  {nodeTitle}
                </div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                  <span>Step {idx + 1}</span>
                  <ChevronRight className="w-3 h-3 text-red-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TIMELINE CONTROLS & TIMELINE METRICS */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              CASCADE TIMELINE PROGRESSION
            </h3>
          </div>
          <span className="text-xs text-amber-300 font-bold">
            CURRENT STEP: {currentStep.timeOffset} — {currentStep.label}
          </span>
        </div>

        {/* Timeline Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {scenario.steps.map((step, idx) => (
            <button
              key={step.timeOffset}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                activeStepIndex === idx
                  ? 'bg-red-950 text-red-200 border-red-500 shadow-lg ring-1 ring-red-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">{step.timeOffset}</span>
                <span className="text-[10px] text-slate-400">Risk: {step.overallRisk}%</span>
              </div>
              <div className="text-xs font-bold mt-1 text-slate-100">{step.label}</div>
            </button>
          ))}
        </div>

        {/* Selected Step Summary Banner */}
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-red-950 text-red-300 border border-red-800">
                {currentStep.timeOffset}
              </span>
              <h4 className="text-sm font-bold text-slate-100">{currentStep.label}</h4>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400">
                Health: <strong className="text-emerald-400">{currentStep.overallHealth}%</strong>
              </span>
              <span className="text-slate-400">
                Trust: <strong className="text-cyan-400">{currentStep.overallTrust}%</strong>
              </span>
              <span className="text-slate-400">
                Risk: <strong className="text-red-400">{currentStep.overallRisk}%</strong>
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {currentStep.summary}
          </p>
        </div>
      </div>

      {/* THREE STATES COMPARISON: BEFORE vs DURING vs AFTER RECOVERY */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">
              CASCADE COMPARISON: BEFORE vs DURING vs AFTER RECOVERY
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PHASE 1: BEFORE */}
          <div className="bg-[#0e1424] border-2 border-emerald-600/70 rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    PHASE 1 / 3
                  </span>
                  <h4 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    BEFORE
                  </h4>
                </div>
                {getSeverityBadge(scenario.beforePhase.severity)}
              </div>

              <p className="text-xs text-slate-400 font-sans leading-normal">
                {scenario.beforePhase.title}
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Health</span>
                  <span className="font-bold text-emerald-400 text-sm">{scenario.beforePhase.health}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Data Trust</span>
                  <span className="font-bold text-cyan-300 text-sm">{scenario.beforePhase.trust}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Reality Confidence</span>
                  <span className="font-bold text-cyan-400 text-sm">{scenario.beforePhase.realityConfidence}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Operational Risk</span>
                  <span className="font-bold text-emerald-400 text-sm">{scenario.beforePhase.overallRisk}%</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Affected Nodes</span>
                    <span className="font-bold text-slate-200">{scenario.beforePhase.affectedNodesCount} Nodes</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-sans">
                    {scenario.beforePhase.affectedNodesList.join(', ')}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-emerald-400 text-center border-t border-slate-800 font-mono">
              STATUS: STABLE & OPTIMAL
            </div>
          </div>

          {/* PHASE 2: DURING */}
          <div className="bg-[#0e1424] border-2 border-red-600/80 rounded-xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                    PHASE 2 / 3
                  </span>
                  <h4 className="text-base font-extrabold text-red-300 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                    DURING (PEAK CASCADE)
                  </h4>
                </div>
                {getSeverityBadge(scenario.duringPhase.severity)}
              </div>

              <p className="text-xs text-slate-400 font-sans leading-normal">
                {scenario.duringPhase.title}
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Health</span>
                  <span className="font-bold text-red-400 text-sm">{scenario.duringPhase.health}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Data Trust</span>
                  <span className="font-bold text-amber-300 text-sm">{scenario.duringPhase.trust}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Reality Confidence</span>
                  <span className="font-bold text-amber-400 text-sm">{scenario.duringPhase.realityConfidence}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Operational Risk</span>
                  <span className="font-extrabold text-red-400 text-sm animate-pulse">{scenario.duringPhase.overallRisk}%</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Affected Nodes</span>
                    <span className="font-bold text-red-400">{scenario.duringPhase.affectedNodesCount} Nodes</span>
                  </div>
                  <div className="text-[11px] text-red-300/90 font-sans leading-tight">
                    {scenario.duringPhase.affectedNodesList.join(' • ')}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-red-400 text-center border-t border-slate-800 font-mono">
              MAX RECOVERY LATENCY: {scenario.duringPhase.recoveryTimeMinutes} MINS
            </div>
          </div>

          {/* PHASE 3: AFTER RECOVERY */}
          <div className="bg-[#0e1424] border-2 border-indigo-600/80 rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                    PHASE 3 / 3
                  </span>
                  <h4 className="text-base font-extrabold text-indigo-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    AFTER RECOVERY
                  </h4>
                </div>
                {getSeverityBadge(scenario.afterRecoveryPhase.severity)}
              </div>

              <p className="text-xs text-slate-400 font-sans leading-normal">
                {scenario.afterRecoveryPhase.title}
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Health</span>
                  <span className="font-bold text-emerald-400 text-sm">{scenario.afterRecoveryPhase.health}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Data Trust</span>
                  <span className="font-bold text-cyan-300 text-sm">{scenario.afterRecoveryPhase.trust}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Reality Confidence</span>
                  <span className="font-bold text-cyan-400 text-sm">{scenario.afterRecoveryPhase.realityConfidence}%</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Operational Risk</span>
                  <span className="font-bold text-emerald-400 text-sm">{scenario.afterRecoveryPhase.overallRisk}%</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Affected Nodes</span>
                    <span className="font-bold text-slate-200">{scenario.afterRecoveryPhase.affectedNodesCount} Node</span>
                  </div>
                  <div className="text-[11px] text-indigo-300 font-sans">
                    {scenario.afterRecoveryPhase.affectedNodesList.join(', ')}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-indigo-300 text-center border-t border-slate-800 font-mono">
              CONTAINED IN {scenario.afterRecoveryPhase.recoveryTimeMinutes} MINS
            </div>
          </div>
        </div>
      </div>

      {/* AFFECTED NODES DETAILED TABLE */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-red-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              AFFECTED INFRASTRUCTURE NODES ({currentStep.activeNodes.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-sans">
            Active at stage {currentStep.timeOffset}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3">Node Name & Code</th>
                <th className="p-3">Category</th>
                <th className="p-3">Time Offset</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Impact Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {currentStep.activeNodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-900/60 transition">
                  <td className="p-3 font-bold text-slate-100">
                    {node.name}
                    <div className="text-[10px] text-slate-400 font-normal">{node.domain}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] rounded bg-slate-900 text-cyan-300 border border-slate-700">
                      {node.category}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-amber-300">{node.timeOffset}</td>
                  <td className="p-3">{getSeverityBadge(node.severity)}</td>
                  <td className="p-3 font-bold text-red-300">{node.status}</td>
                  <td className="p-3 font-sans text-slate-300 text-[11px] leading-relaxed max-w-xs">
                    {node.impactDescription}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
