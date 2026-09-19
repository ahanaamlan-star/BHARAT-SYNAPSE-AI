import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { ResilienceEngine } from '../../services/resilienceEngine';
import {
  ShieldCheck,
  Award,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Lock,
  GitFork,
  ArrowRight,
  Building2,
  Zap,
  Info,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const ResilienceView: React.FC = () => {
  const { selectedAsset, selectedAssetId, selectAsset, assets, setActiveTab } = useSystem();

  // Compute BHARATSYNAPSE RESILIENCE SCORE™
  const scoreCard = ResilienceEngine.calculateResilienceScore(selectedAsset);

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0e1424] to-indigo-950 p-5 rounded-xl border border-emerald-800/80 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <ShieldCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
              RESILIENCE ENGINE™
            </h2>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-700 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-300" /> BHARATSYNAPSE RESILIENCE SCORE™
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 font-sans max-w-2xl">
            Synthesizes 8 weighted dimensions across physical health, data trust, risk, redundancy, recovery latency, and checkpoint freshness.
          </p>
        </div>

        {/* Asset Switcher */}
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

      {/* FLAGSHIP HERO SCORE DIAL & STATUS GRADE */}
      <div className="bg-[#0e1424] border-2 border-emerald-500/80 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
            <Award className="w-4 h-4 text-amber-400" /> OFFICIAL SYSTEM AUDIT
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-100">
            BHARATSYNAPSE RESILIENCE SCORE™
          </h3>
          <p className="text-xs text-slate-300 font-sans max-w-xl">
            Target Asset: <strong className="text-emerald-300">{selectedAsset.code} ({selectedAsset.name})</strong>
          </p>
          <div className="pt-2 flex items-center gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-lg text-xs font-bold">
              {scoreCard.statusGrade}
            </span>
          </div>
        </div>

        {/* Big Numeric Gauge */}
        <div className="p-6 bg-slate-950 rounded-2xl border-2 border-emerald-500/80 text-center shrink-0 min-w-[200px] shadow-inner space-y-1">
          <div className="text-5xl font-black text-emerald-400 font-mono tracking-tighter">
            {scoreCard.overallScore}%
          </div>
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            SYNTHETIC RESILIENCE INDEX
          </div>
        </div>
      </div>

      {/* 8 WEIGHTED COMPONENTS GRID */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              8-DIMENSIONAL WEIGHTED BREAKDOWN
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-sans">
            Total Weight: 100%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. System Health */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Activity className="w-4 h-4 text-emerald-400" /> 1. System Health
              </span>
              <span className="text-[10px] text-slate-500">15% Wt</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {scoreCard.components.systemHealth.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-emerald-300 font-bold">{scoreCard.components.systemHealth.status}</span>
            </div>
          </div>

          {/* 2. Data Trust */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> 2. Data Trust
              </span>
              <span className="text-[10px] text-slate-500">15% Wt</span>
            </div>
            <div className="text-2xl font-bold text-cyan-300 font-mono">
              {scoreCard.components.dataTrust.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-cyan-300 font-bold">{scoreCard.components.dataTrust.status}</span>
            </div>
          </div>

          {/* 3. Failure Risk */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> 3. Failure Risk
              </span>
              <span className="text-[10px] text-slate-500">15% Wt</span>
            </div>
            <div className="text-2xl font-bold text-amber-300 font-mono">
              {scoreCard.components.failureRisk.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-amber-300 font-bold">{scoreCard.components.failureRisk.status}</span>
            </div>
          </div>

          {/* 4. Redundancy */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Layers className="w-4 h-4 text-indigo-400" /> 4. Redundancy
              </span>
              <span className="text-[10px] text-slate-500">15% Wt</span>
            </div>
            <div className="text-2xl font-bold text-indigo-300 font-mono">
              {scoreCard.components.redundancy.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-indigo-300 font-bold">{scoreCard.components.redundancy.status}</span>
            </div>
          </div>

          {/* 5. Recovery Readiness */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Zap className="w-4 h-4 text-emerald-400" /> 5. Recovery Readiness
              </span>
              <span className="text-[10px] text-slate-500">10% Wt</span>
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {scoreCard.components.recoveryReadiness.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-emerald-300 font-bold">{scoreCard.components.recoveryReadiness.status}</span>
            </div>
          </div>

          {/* 6. Recovery Latency */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Clock className="w-4 h-4 text-amber-400" /> 6. Recovery Latency
              </span>
              <span className="text-[10px] text-slate-500">10% Wt</span>
            </div>
            <div className="text-2xl font-bold text-amber-300 font-mono">
              {scoreCard.components.recoveryLatency.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-amber-300 font-bold">{scoreCard.components.recoveryLatency.status}</span>
            </div>
          </div>

          {/* 7. Checkpoint Freshness */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Lock className="w-4 h-4 text-cyan-400" /> 7. Checkpoint Freshness
              </span>
              <span className="text-[10px] text-slate-500">10% Wt</span>
            </div>
            <div className="text-2xl font-bold text-cyan-300 font-mono">
              {scoreCard.components.checkpointFreshness.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-cyan-300 font-bold">{scoreCard.components.checkpointFreshness.status}</span>
            </div>
          </div>

          {/* 8. Dependency Risk */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <GitFork className="w-4 h-4 text-indigo-400" /> 8. Dependency Risk
              </span>
              <span className="text-[10px] text-slate-500">10% Wt</span>
            </div>
            <div className="text-2xl font-bold text-indigo-300 font-mono">
              {scoreCard.components.dependencyRisk.score}%
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>Status:</span>
              <span className="text-indigo-300 font-bold">{scoreCard.components.dependencyRisk.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* WEAKNESS ANALYSIS & HARDENING RECOMMENDATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              PRIMARY VULNERABILITY ANALYSIS
            </h3>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-lg border border-amber-800/80 text-xs text-amber-200 font-sans">
            {scoreCard.keyWeakness}
          </div>
        </div>

        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                RECOMMENDED HARDENINGS
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('recovery')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              LAUNCH RECOVERY ENGINE <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 text-xs font-sans text-slate-300">
            {scoreCard.recommendedHardenings.map((rec, i) => (
              <div key={i} className="p-2.5 bg-slate-950 rounded border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
