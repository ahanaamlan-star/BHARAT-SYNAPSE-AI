import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import {
  BrainCircuit,
  AlertTriangle,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Activity,
  CheckCircle2,
  HelpCircle,
  Zap,
  Info,
  Clock,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Radio,
  Sliders
} from 'lucide-react';
import { Anomaly, AnomalyCategory } from '../../types';

export const IntelligenceTwinView: React.FC = () => {
  const { selectedAsset, injectAnomaly, recalibrateTrust, injectSensorConflict } = useSystem();
  const it = selectedAsset.intelligenceTwin;
  const pt = selectedAsset.physicalTwin;
  const tt = selectedAsset.trustTwin;
  const rc = selectedAsset.realityConfidence;

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<AnomalyCategory | 'ALL'>('ALL');
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);

  const filteredAnomalies = activeCategoryFilter === 'ALL'
    ? it.anomalies
    : it.anomalies.filter((a) => a.anomalyCategory === activeCategoryFilter);

  // Helper for severity badges
  const getSeverityBadge = (severity: Anomaly['severity']) => {
    switch (severity) {
      case 'Critical':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950/90 text-red-400 border border-red-800 flex items-center gap-1 animate-pulse"><AlertTriangle className="w-3 h-3" /> CRITICAL</span>;
      case 'High':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-950/90 text-amber-300 border border-amber-800">HIGH</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-yellow-950/90 text-yellow-300 border border-yellow-800">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">LOW</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* Disclaimer Banner & Model Label */}
      <div className="bg-gradient-to-r from-indigo-950 via-[#0e1424] to-slate-900 p-4 rounded-xl border border-indigo-800/80 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <BrainCircuit className="w-5 h-5 text-indigo-400 shrink-0" />
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">INTELLIGENCE TWIN ENGINE</h2>
            <span className="text-xs font-bold font-mono text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-700">
              {it.modelLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-amber-300 font-sans">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold">{it.disclaimer}</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing telemetry streams for <strong className="text-cyan-300">{selectedAsset.code}: {selectedAsset.name}</strong>
          </p>
        </div>

        {/* Live Simulation Controls to test Normal vs Anomalous states */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-800 shrink-0">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1">INJECT SCENARIO:</span>
          <button
            onClick={() => recalibrateTrust(selectedAsset.id)}
            className="px-2.5 py-1 text-xs font-bold rounded bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 transition"
          >
            Normal Baseline
          </button>
          <button
            onClick={() => injectAnomaly(selectedAsset.id, 'PHYSICAL_SPIKE')}
            className="px-2.5 py-1 text-xs font-bold rounded bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-700 transition"
          >
            Thermal Spike
          </button>
          <button
            onClick={() => injectSensorConflict(selectedAsset.id)}
            className="px-2.5 py-1 text-xs font-bold rounded bg-red-950/90 hover:bg-red-900 text-red-300 border border-red-700 transition"
          >
            Sensor Disagreement
          </button>
        </div>
      </div>

      {/* Primary Prediction KPI Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Failure Probability */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>FAILURE PROBABILITY</span>
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className={`text-3xl font-extrabold ${it.failureProbability > 65 ? 'text-red-400' : it.failureProbability > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {it.failureProbability}%
          </div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Risk Level:</span>
            <span className="font-bold text-slate-300">{it.riskLevel}</span>
          </div>
        </div>

        {/* Estimated Failure Window */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>EST. FAILURE WINDOW</span>
            <Clock className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div className="text-2xl font-bold text-amber-300 truncate">
            {it.estimatedFailureWindow}
          </div>
          <div className="text-[10px] text-slate-500">Predicted Countdown</div>
        </div>

        {/* Prediction Confidence */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>PREDICTION CONFIDENCE</span>
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-indigo-300">
            {it.predictionConfidence}%
          </div>
          <div className="text-[10px] text-slate-500">AI Model Certainty</div>
        </div>

        {/* Data Trust */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>DATA TRUST</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {it.dataTrust}%
          </div>
          <div className="text-[10px] text-slate-500">Pipeline Integrity</div>
        </div>

        {/* Reality Confidence */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>REALITY CONFIDENCE</span>
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-cyan-300">
            {it.realityConfidence}%
          </div>
          <div className="text-[10px] text-slate-500">Truth Alignment</div>
        </div>

        {/* Potential Impact */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>POTENTIAL IMPACT</span>
            <Zap className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-300 truncate">
            {it.potentialImpact}
          </div>
          <div className="text-[10px] text-slate-500">Grid Scope</div>
        </div>
      </div>

      {/* EXPLAINABILITY SECTION: WHY DID THE RISK INCREASE? */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              EXPLAINABILITY: WHY DID THE RISK INCREASE?
            </h3>
          </div>
          <span className="text-xs text-amber-300 font-mono bg-amber-950/70 px-2.5 py-0.5 rounded border border-amber-800">
            TELEMETRY INFLUENCE BREAKDOWN
          </span>
        </div>

        {/* Formal Causal Equation */}
        <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs leading-relaxed flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-bold uppercase">Causal Formula:</span>
          <span className="text-amber-300 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Temperature ↑ (+31%) + Load ↑ (+18%) + Cooling Efficiency ↓ (-14%) + Error Rate ↑ (+11%)
          </span>
          <span className="text-slate-400">⇒</span>
          <span className="text-red-400 font-extrabold bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
            Failure Probability ↑ ({it.failureProbability}%)
          </span>
        </div>

        {/* Contributing Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {it.contributingFactors.map((cf, idx) => (
            <div key={idx} className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{cf.factorName}</span>
                <span className={`px-2 py-0.5 text-xs font-extrabold rounded flex items-center gap-0.5 ${
                  cf.direction === 'INCREASE' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {cf.direction === 'INCREASE' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {cf.valueChange}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Impact Weight</span>
                  <span className="font-bold text-cyan-300">{cf.impactWeightPercent}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-cyan-500 to-amber-400 h-1.5 rounded-full" style={{ width: `${cf.impactWeightPercent}%` }} />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal font-sans">
                {cf.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ANOMALY DETECTION MATRIX (ALL 10 SIGNAL CATEGORIES) */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                ANOMALY DETECTION MATRIX ({filteredAnomalies.length} DETECTED)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Real-time multi-signal anomaly triggers evaluated against physical baselines and trust thresholds.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <button
              onClick={() => setActiveCategoryFilter('ALL')}
              className={`px-2.5 py-1 rounded transition font-bold ${
                activeCategoryFilter === 'ALL'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Signals ({it.anomalies.length})
            </button>
            {['Temperature Spike', 'Voltage Instability', 'Pressure Deviation', 'Load Surge', 'Sensor Disagreement'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat as AnomalyCategory)}
                className={`px-2 py-1 rounded transition ${
                  activeCategoryFilter === cat
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Anomalies Table / List */}
        {filteredAnomalies.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-bold text-slate-200">NO ACTIVE ANOMALIES DETECTED IN THIS CATEGORY</div>
            <p className="text-xs text-slate-400 font-sans max-w-md mx-auto">
              All physical telemetry signals are operating within expected baseline limits and cross-sensor trust thresholds.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase bg-slate-950/80">
                    <th className="p-2.5 font-bold">ID / Timestamp</th>
                    <th className="p-2.5 font-bold">Asset / Signal</th>
                    <th className="p-2.5 font-bold">Observed vs Expected</th>
                    <th className="p-2.5 font-bold">Deviation</th>
                    <th className="p-2.5 font-bold">Severity</th>
                    <th className="p-2.5 font-bold">AI Confidence</th>
                    <th className="p-2.5 font-bold">Trust Score</th>
                    <th className="p-2.5 font-bold">Potential Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {filteredAnomalies.map((anom) => (
                    <tr key={anom.id} className="hover:bg-slate-900/80 transition group">
                      <td className="p-2.5 font-mono text-cyan-300 font-bold whitespace-nowrap">
                        <div>{anom.id}</div>
                        <div className="text-[10px] text-slate-500 font-sans">{anom.timestamp}</div>
                      </td>
                      <td className="p-2.5">
                        <div className="font-bold text-slate-200">{anom.assetCode}: {anom.assetName}</div>
                        <div className="text-[11px] text-amber-300 flex items-center gap-1 mt-0.5">
                          <Radio className="w-3 h-3 shrink-0" />
                          <span>{anom.signal}</span>
                        </div>
                      </td>
                      <td className="p-2.5 whitespace-nowrap">
                        <div className="text-red-400 font-bold">{anom.observedValue}</div>
                        <div className="text-[10px] text-slate-400 font-sans">Baseline: {anom.expectedValue}</div>
                      </td>
                      <td className="p-2.5 font-bold text-amber-400 whitespace-nowrap">
                        {anom.deviation}
                      </td>
                      <td className="p-2.5 whitespace-nowrap">
                        {getSeverityBadge(anom.severity)}
                      </td>
                      <td className="p-2.5 font-bold text-indigo-300 whitespace-nowrap">
                        {anom.confidence}%
                      </td>
                      <td className="p-2.5 font-bold text-emerald-400 whitespace-nowrap">
                        {anom.trustScore}%
                      </td>
                      <td className="p-2.5 text-slate-300 font-sans text-[11px] max-w-xs">
                        {anom.potentialImpact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Supporting Evidence & Scenario Forecasts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supporting Evidence */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3 uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-cyan-400" /> SUPPORTING EVIDENCE & CAUSAL EVIDENCE
          </h3>

          <div className="space-y-2.5 text-xs">
            {it.supportingEvidence.map((ev, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{ev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Forward Scenario Forecasts */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2 border-b border-slate-800 pb-3 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-indigo-400" /> FORWARD SCENARIO FORECASTS
          </h3>

          <div className="space-y-2.5 text-xs">
            {it.scenarioForecasts.map((sc, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-200">{sc.timeAhead} Forecast Window</div>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">Predicted Asset Health: <strong className="text-cyan-300">{sc.predictedHealth}%</strong></div>
                </div>
                <span className="px-3 py-1 rounded font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs">
                  Risk: {sc.riskLevel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
