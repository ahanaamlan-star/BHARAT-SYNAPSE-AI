import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import { RecoveryEngine } from '../../services/recoveryEngine';
import {
  LifeBuoy,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  RotateCcw,
  Zap,
  Activity,
  Server,
  Lock,
  Building2,
  Check,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const RecoveryView: React.FC = () => {
  const { selectedAsset, selectedAssetId, selectAsset, assets } = useSystem();

  // Compute Trust-Aware Pipeline
  const pipeline = RecoveryEngine.calculateTrustAwarePipeline(selectedAsset);

  // Active view tab for recovery simulation
  const [selectedOptionId, setSelectedOptionId] = useState<string>(pipeline.recommendedOption.id);
  const [simulationActive, setSimulationActive] = useState<boolean>(false);
  const [simulationProgressText, setSimulationProgressText] = useState<string>('');

  const activeOption =
    pipeline.simulatedOptions.find((o) => o.id === selectedOptionId) || pipeline.recommendedOption;

  const handleRunSimulation = () => {
    setSimulationActive(true);
    setSimulationProgressText('Initialising Sandbox Physics Model...');

    setTimeout(() => {
      setSimulationProgressText('Verifying Data Trust Quorum & Sensor Signatures...');
    }, 700);

    setTimeout(() => {
      setSimulationProgressText('Evaluating Thermal & Electrical Load Redistribution...');
    }, 1400);

    setTimeout(() => {
      setSimulationProgressText('Simulating Recovery Latency & Checkpoint Replay...');
    }, 2100);

    setTimeout(() => {
      setSimulationActive(false);
      setSimulationProgressText('');
    }, 2800);
  };

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* HEADER & CORE PRINCIPLE DISCLAIMER BANNER */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0e1424] to-indigo-950 p-5 rounded-xl border border-emerald-800/80 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <LifeBuoy className="w-6 h-6 text-emerald-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
              TRUST-AWARE RECOVERY ENGINE™
            </h2>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Human-in-the-Loop Simulation
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 font-sans max-w-2xl">
            Multi-stage recovery pipeline with cryptographic data trust validation before simulating remediation options.
          </p>
        </div>

        {/* Asset Selector */}
        <div className="flex items-center gap-2 bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 shrink-0">
          <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-slate-400 font-bold uppercase">Asset:</span>
          <select
            value={selectedAssetId}
            onChange={(e) => selectAsset(e.target.value)}
            className="bg-slate-900 text-emerald-300 font-bold text-xs px-2.5 py-1.5 rounded border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}: {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CORE PRINCIPLE QUESTION & VERIFICATION PANEL */}
      <div className="bg-[#0e1424] border-2 border-emerald-500/80 rounded-xl p-5 space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400 animate-bounce" />
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
              CORE GOVERNANCE PRINCIPLE
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Rule: Do not automatically recommend recovery merely because an anomaly exists.
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg border border-amber-800/80 space-y-2">
          <div className="text-base font-extrabold text-amber-300 flex items-center gap-2">
            <span>Question:</span> &quot;{pipeline.trustVerificationQuestion}&quot;
          </div>
          <div className="text-xs text-slate-200 font-sans leading-relaxed flex items-start gap-2">
            {pipeline.dataTrustVerified ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <span>{pipeline.trustVerificationAnswer}</span>
          </div>
        </div>
      </div>

      {/* PIPELINE FLOW (8 STAGES) */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              TRUST-AWARE RECOVERY PIPELINE FLOW
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-bold">
            8-STAGE AUDITED SEQUENCE
          </span>
        </div>

        {/* Pipeline Flow Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {pipeline.stages.map((stageItem, idx) => (
            <div
              key={stageItem.stage}
              className={`p-3 rounded-lg border text-left flex flex-col justify-between space-y-2 transition-all ${
                stageItem.status === 'Completed'
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                  : stageItem.status === 'Active'
                  ? 'bg-amber-950/80 border-amber-500 text-amber-200 ring-1 ring-amber-500 animate-pulse'
                  : stageItem.status === 'Flagged'
                  ? 'bg-red-950/80 border-red-800 text-red-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">0{idx + 1}</span>
                {stageItem.status === 'Completed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : stageItem.status === 'Active' ? (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <div className="text-xs font-bold leading-tight">{stageItem.stage}</div>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                {stageItem.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LATENCY BUDGET & CHECKPOINT FRESHNESS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RECOVERY LATENCY BUDGET */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                RECOVERY LATENCY BUDGET
              </h3>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-bold rounded ${
                pipeline.latencyBudget.status === 'WITHIN BUDGET'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-red-950 text-red-300 border border-red-800'
              }`}
            >
              {pipeline.latencyBudget.status}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Maximum Allowed Recovery Time:</span>
              <strong className="text-amber-300 font-mono text-sm">
                {pipeline.latencyBudget.maxAllowedRecoveryTimeMinutes} mins
              </strong>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Estimated Recovery Time:</span>
              <strong className="text-emerald-400 font-mono text-sm">
                {pipeline.latencyBudget.estimatedRecoveryTimeMinutes} mins
              </strong>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Recovery Slack Margin:</span>
              <strong className="text-cyan-300 font-mono text-sm">
                +{pipeline.latencyBudget.slackMinutes} mins
              </strong>
            </div>
          </div>
        </div>

        {/* CHECKPOINT FRESHNESS */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                CHECKPOINT FRESHNESS
              </h3>
            </div>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {pipeline.checkpointFreshness.recoveryValidity}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Last Valid Checkpoint:</span>
              <strong className="text-slate-200 font-mono">
                {pipeline.checkpointFreshness.lastValidCheckpointTimestamp}
              </strong>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Checkpoint Age:</span>
              <strong className="text-emerald-400 font-mono">
                {pipeline.checkpointFreshness.checkpointAgeMinutes} mins ago
              </strong>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-400">Replay Window & Trust:</span>
              <strong className="text-cyan-300 font-mono">
                {pipeline.checkpointFreshness.replayWindowMinutes}m window ({pipeline.checkpointFreshness.checkpointTrustScore}% trust)
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULATED RECOVERY OPTIONS MATRIX (7 CANDIDATES) */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              SIMULATED RECOVERY OPTIONS SCORING MATRIX
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-sans">
            Select option to view detailed sandbox evaluation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pipeline.simulatedOptions.map((opt) => {
            const isSelected = opt.id === selectedOptionId;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedOptionId(opt.id)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-950 to-slate-950 border-indigo-500 shadow-xl ring-1 ring-indigo-500'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase">{opt.category}</span>
                    {opt.recommended && (
                      <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-100">{opt.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Risk Reduction:</span>
                    <strong className="text-emerald-400">{opt.riskReductionPercent}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Recovery Latency:</span>
                    <strong className="text-amber-300">{opt.recoveryTimeMinutes}m</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Trust Req:</span>
                    <strong className="text-cyan-300">{opt.trustRequirementPercent}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Resilience:</span>
                    <strong className="text-indigo-300">+{opt.resilienceImprovementPercent}%</strong>
                  </div>
                </div>

                <div className="text-[10px] flex items-center justify-between pt-1">
                  <span className={opt.trustGatePassed ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {opt.trustGatePassed ? '✓ Trust Gate Passed' : '⚠ Trust Gate Blocked'}
                  </span>
                  <span className="text-slate-400">Conf: {opt.confidencePercent}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED OPTION DETAIL & SIMULATED RECOMMENDATION PANEL */}
      <div className="bg-[#0e1424] border-2 border-indigo-500/80 rounded-xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
              DETAILED RECOVERY OPTION EVALUATION
            </span>
            <h3 className="text-lg font-extrabold text-slate-100 flex items-center gap-2 mt-0.5">
              {activeOption.name}
            </h3>
          </div>

          {/* SIMULATED ACTION BUTTON - MANDATORY "Simulated Recovery Recommendation" LABEL */}
          <button
            onClick={handleRunSimulation}
            disabled={simulationActive}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-lg transition-all ${
              simulationActive
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-700 animate-pulse'
                : 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-slate-950'
            }`}
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>
              {simulationActive ? 'SIMULATING RECOVERY IMPACT...' : 'Simulated Recovery Recommendation'}
            </span>
          </button>
        </div>

        {/* Animation feedback */}
        {simulationActive && (
          <div className="p-3 bg-slate-950 border border-indigo-500/80 rounded-lg text-xs text-indigo-300 font-bold flex items-center gap-2 animate-fadeIn">
            <Activity className="w-4 h-4 animate-spin text-emerald-400" />
            <span>{simulationProgressText}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">
              Action Description:
            </span>
            <p className="text-slate-200">{activeOption.description}</p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">
              Potential Side Effects:
            </span>
            <p className="text-amber-300">{activeOption.potentialSideEffects}</p>
          </div>
        </div>

        {/* Mandatory Safety Footer */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2 font-sans">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Safety Notice: This engine generates <strong>Simulated Recovery Recommendations</strong> only. No autonomous real-world control or automated actuation is executed without explicit human operator confirmation.
          </span>
        </div>
      </div>
    </div>
  );
};
