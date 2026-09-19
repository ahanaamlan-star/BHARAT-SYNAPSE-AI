import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { ShieldAlert, CheckCircle2, AlertTriangle, Radio, RefreshCw, FileText, Zap, Cpu, Activity, BarChart3, Info } from 'lucide-react';

export const TrustTwinView: React.FC = () => {
  const { selectedAsset, recalibrateTrust, injectSensorConflict } = useSystem();
  const tt = selectedAsset.trustTwin;
  const rc = selectedAsset.realityConfidence;
  const it = selectedAsset.intelligenceTwin;
  const pt = selectedAsset.physicalTwin;

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0e1424] p-5 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold font-mono text-slate-100">TRUST ENGINE™ & REALITY CONFIDENCE</h2>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/80 font-bold">
              BHARATSYNAPSE PROTOTYPE TRUST MODEL
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Evaluating telemetry reliability vs reality representation for <strong className="text-cyan-300">{selectedAsset.code}: {selectedAsset.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => injectSensorConflict(selectedAsset.id)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-950/40"
          >
            <Zap className="w-4 h-4 text-red-400 animate-pulse" /> INJECT SENSOR ANOMALY
          </button>

          <button
            onClick={() => recalibrateTrust(selectedAsset.id)}
            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> RECALIBRATE TRUST
          </button>
        </div>
      </div>

      {/* CORE INDEPENDENT METRICS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* System Health */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-400" /> SYSTEM HEALTH</span>
            <span className="text-[10px] text-slate-500">Physical State</span>
          </div>
          <div className="text-3xl font-mono font-extrabold text-emerald-400">{pt.overallHealth}%</div>
          <div className="text-[11px] font-mono text-slate-400">Hardware & Thermal Condition</div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${pt.overallHealth}%` }} />
          </div>
        </div>

        {/* Data Trust */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> DATA TRUST</span>
            <span className="text-[10px] text-slate-500">Telemetry Trust</span>
          </div>
          <div className={`text-3xl font-mono font-extrabold ${tt.overallDataTrust < 50 ? 'text-red-400' : tt.overallDataTrust < 75 ? 'text-amber-400' : 'text-cyan-400'}`}>
            {tt.overallDataTrust}%
          </div>
          <div className="text-[11px] font-mono text-slate-400">Weighted Sensor Integrity</div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div className={`h-full rounded-full ${tt.overallDataTrust < 50 ? 'bg-red-400' : tt.overallDataTrust < 75 ? 'bg-amber-400' : 'bg-cyan-400'}`} style={{ width: `${tt.overallDataTrust}%` }} />
          </div>
        </div>

        {/* Prediction Confidence */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-purple-400" /> MODEL CONFIDENCE</span>
            <span className="text-[10px] text-slate-500">AI Certainty</span>
          </div>
          <div className="text-3xl font-mono font-extrabold text-purple-300">{it.predictionConfidence}%</div>
          <div className="text-[11px] font-mono text-slate-400">Neural Network Model Index</div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-400 h-full rounded-full" style={{ width: `${it.predictionConfidence}%` }} />
          </div>
        </div>

        {/* Reality Confidence */}
        <div className="p-4 bg-[#0e1424] rounded-xl border border-cyan-500/40 space-y-2 relative overflow-hidden bg-gradient-to-br from-[#0e1424] to-cyan-950/30">
          <div className="flex justify-between items-center text-xs font-mono text-cyan-300 font-bold">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-cyan-400" /> REALITY CONFIDENCE™</span>
            <span className="text-[10px] text-cyan-400/80">Flagship Metric</span>
          </div>
          <div className={`text-3xl font-mono font-extrabold ${rc.score < 50 ? 'text-red-400' : rc.score < 75 ? 'text-amber-300' : 'text-cyan-300'}`}>
            {rc.score}%
          </div>
          <div className="text-[11px] font-mono text-slate-300">Representation Verification</div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div className={`h-full rounded-full ${rc.score < 50 ? 'bg-red-400' : rc.score < 75 ? 'bg-amber-400' : 'bg-cyan-400'}`} style={{ width: `${rc.score}%` }} />
          </div>
        </div>
      </div>

      {/* DYNAMIC REALITY CONFIDENCE EXPLANATION CALLOUT */}
      <div className={`p-4 rounded-xl border font-mono text-xs flex items-start gap-3 transition-all ${
        rc.score < 50 ? 'bg-red-950/40 border-red-800/80 text-red-200' : rc.score < 75 ? 'bg-amber-950/40 border-amber-800/80 text-amber-200' : 'bg-cyan-950/40 border-cyan-800/80 text-cyan-200'
      }`}>
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-cyan-400" />
        <div className="space-y-1">
          <div className="font-bold text-sm tracking-wide flex items-center gap-2">
            <span>REALITY CONFIDENCE VERDICT:</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900/80 border border-current font-extrabold">
              {rc.twinAlignmentStatus}
            </span>
          </div>
          <p className="leading-relaxed">{rc.explanation}</p>
        </div>
      </div>

      {/* TRANSPARENT WEIGHTED SCORING BREAKDOWN */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" /> TRANSPARENT WEIGHTED TRUST ENGINE MODEL
          </h3>
          <span className="text-[11px] text-slate-400">Model: <strong className="text-cyan-300 font-bold">BharatSynapse Prototype Trust Model</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-2 px-3">EVALUATION FACTOR</th>
                <th className="py-2 px-3">WEIGHT</th>
                <th className="py-2 px-3">FACTOR SCORE</th>
                <th className="py-2 px-3">WEIGHTED CONTRIBUTION</th>
                <th className="py-2 px-3">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {tt.scoringWeights && tt.scoringWeights.length > 0 ? (
                tt.scoringWeights.map((w, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-200">{w.factor}</td>
                    <td className="py-2.5 px-3 text-cyan-400 font-bold">{w.weightPercent}%</td>
                    <td className="py-2.5 px-3">
                      <span className={`font-bold ${w.score < 50 ? 'text-red-400' : w.score < 75 ? 'text-amber-300' : 'text-emerald-400'}`}>
                        {w.score}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-extrabold text-amber-300">+{w.weightedContribution} pts</td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px]">{w.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-500">Loading scoring weights model...</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900/80 border-t border-slate-700 font-bold text-slate-100">
                <td className="py-3 px-3" colSpan={3}>COMPOSITE DERIVED TELEMETRY TRUST SCORE</td>
                <td className="py-3 px-3 text-cyan-300 font-extrabold text-sm" colSpan={2}>
                  {tt.overallDataTrust}% <span className="text-[10px] text-slate-400 font-normal ml-2">(Derived mathematically from weighted inputs)</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* GRANULAR SIGNAL EXPLANATION MATRIX ("WHY?") */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" /> GRANULAR SIGNAL EXPLANATION MATRIX ("WHY?")
          </h3>
          <span className="text-[10px] text-slate-400">Signal-by-signal physical discrepancy breakdown</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-2 px-3">SIGNAL CHANNEL</th>
                <th className="py-2 px-3">OBSERVED VALUE</th>
                <th className="py-2 px-3">EXPECTED BASELINE</th>
                <th className="py-2 px-3">DEVIATION / DISCREPANCY</th>
                <th className="py-2 px-3">SCORE PENALTY</th>
                <th className="py-2 px-3">CERTAINTY</th>
                <th className="py-2 px-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {tt.signalExplanations && tt.signalExplanations.length > 0 ? (
                tt.signalExplanations.map((sig, idx) => (
                  <tr key={idx} className={`hover:bg-slate-900/40 transition-colors ${sig.status !== 'Normal' ? 'bg-amber-950/10' : ''}`}>
                    <td className="py-2.5 px-3 font-bold text-slate-200">{sig.signal}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-100">{sig.observedValue}</td>
                    <td className="py-2.5 px-3 text-cyan-400">{sig.expectedValue}</td>
                    <td className="py-2.5 px-3">
                      <span className={sig.status !== 'Normal' ? 'text-red-400 font-bold' : 'text-slate-400'}>
                        {sig.deviation}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-red-400">{sig.impact}</td>
                    <td className="py-2.5 px-3 text-purple-300">{sig.confidence}%</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sig.status === 'Normal' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        {sig.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-slate-500">All sensor telemetry streams aligned with physical baseline expectations.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROVENANCE & EVIDENCE LOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        {/* Provenance */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Radio className="w-4 h-4 text-cyan-400" /> CRYPTOGRAPHIC PROVENANCE & ATTESTATION
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900/90 rounded border border-slate-800 flex justify-between items-center">
              <span>HSM Cryptographic Attestation:</span>
              <span className="font-bold text-emerald-400">{tt.provenance}</span>
            </div>

            <div className="p-3 bg-slate-900/90 rounded border border-slate-800 flex justify-between items-center">
              <span>Data Stream Completeness:</span>
              <span className="font-bold text-slate-200">{tt.dataCompleteness}%</span>
            </div>

            <div className="p-3 bg-slate-900/90 rounded border border-slate-800 flex justify-between items-center">
              <span>Trust Isolation Level:</span>
              <span className="font-bold text-amber-300">{tt.trustPropagationLevel}</span>
            </div>
          </div>
        </div>

        {/* Evidence Log */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldAlert className="w-4 h-4 text-amber-400" /> ACTIVE TRUST PENALTY LOG
          </h3>

          <div className="space-y-2 text-xs max-h-48 overflow-y-auto">
            {tt.reductionEvidence && tt.reductionEvidence.length > 0 ? (
              tt.reductionEvidence.map((ev, idx) => (
                <div key={idx} className="p-3 bg-slate-950/80 rounded border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-red-400">{ev.source}</span>
                    <span className="text-slate-500 text-[10px]">{ev.timestamp}</span>
                  </div>
                  <div className="text-slate-300">{ev.issue}</div>
                  <div className="text-right text-amber-400 text-[10px] font-bold">Impact: {ev.impactPoints} Trust Pts</div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-slate-900/60 rounded border border-slate-800 text-slate-400 text-center">
                No active trust penalties. Telemetry streams are cryptographically clean and temporally consistent.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
