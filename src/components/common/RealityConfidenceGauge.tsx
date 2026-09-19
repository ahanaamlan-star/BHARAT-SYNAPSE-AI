import React, { useState } from 'react';
import { RealityConfidence } from '../../types';
import { ShieldAlert, HelpCircle, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: RealityConfidence;
  compact?: boolean;
}

export const RealityConfidenceGauge: React.FC<Props> = ({ data, compact = false }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', ring: '#10b981' };
    if (score >= 50) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', ring: '#f59e0b' };
    return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', ring: '#ef4444' };
  };

  const rcStyle = getScoreColor(data.score);

  if (compact) {
    return (
      <div className={`p-2.5 rounded-lg border ${rcStyle.bg} ${rcStyle.border} flex items-center justify-between`}>
        <div>
          <div className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
            REALITY CONFIDENCE SCORE™
          </div>
          <div className={`text-xl font-mono font-extrabold ${rcStyle.text}`}>
            {data.score}%
          </div>
        </div>
        <div className="text-right text-[11px] font-mono">
          <div className="text-slate-400">System Health: <span className="text-slate-200 font-semibold">{data.systemHealth}%</span></div>
          <div className="text-slate-400">Data Trust: <span className="text-amber-400 font-semibold">{data.dataTrust}%</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0e1424] border border-indigo-900/50 rounded-xl p-5 shadow-lg relative overflow-hidden">
      {/* Glow aura */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-5 h-5 ${rcStyle.text}`} />
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-100 flex items-center gap-1.5">
              REALITY CONFIDENCE SCORE™
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                FLAGSHIP METRIC
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Answers: "Can the AI trust its own representation of physical reality?"
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/80 transition-all"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showExplanation ? 'Hide Reasoning' : 'Why this score?'}</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Core Comparison Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Reality Confidence (Main Hero) */}
        <div className={`p-3.5 rounded-lg border ${rcStyle.bg} ${rcStyle.border} flex flex-col justify-between relative`}>
          <div className="text-[11px] font-mono text-slate-300 font-bold tracking-wider">
            REALITY CONFIDENCE™
          </div>
          <div className={`text-3xl font-mono font-extrabold my-1 ${rcStyle.text}`}>
            {data.score}%
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            {data.score < 50 ? (
              <span className="text-red-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> TRUST DIVERGENCE
              </span>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED REALITY
              </span>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] font-mono text-slate-400 font-medium">SYSTEM HEALTH</div>
          <div className="text-2xl font-mono font-bold text-slate-100 my-1">
            {data.systemHealth}%
          </div>
          <div className="text-[10px] font-mono text-slate-500">Physical Asset State</div>
        </div>

        {/* Data Trust */}
        <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] font-mono text-amber-400 font-medium">DATA TRUST</div>
          <div className="text-2xl font-mono font-bold text-amber-300 my-1">
            {data.dataTrust}%
          </div>
          <div className="text-[10px] font-mono text-slate-500">Sensor Stream Integrity</div>
        </div>

        {/* Prediction Confidence */}
        <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] font-mono text-indigo-400 font-medium">PREDICTION CONFIDENCE</div>
          <div className="text-2xl font-mono font-bold text-indigo-300 my-1">
            {data.predictionConfidence}%
          </div>
          <div className="text-[10px] font-mono text-slate-500">AI Model Certainty</div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-3 bg-slate-950/90 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-start gap-2.5">
        <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${rcStyle.text}`} />
        <div className="flex-1">
          <div className="font-bold text-slate-200 mb-0.5 flex items-center justify-between">
            <span>REALITY CONFIDENCE DIAGNOSTIC:</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${rcStyle.bg} ${rcStyle.text} border ${rcStyle.border}`}>
              STATUS: {data.twinAlignmentStatus}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">{data.explanation}</p>
        </div>
      </div>

      {/* Detailed Discrepancy Factors Breakdown (Expandable) */}
      {showExplanation && (
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
          <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            WHY REALITY CONFIDENCE DISAGREES WITH AI MODEL CONFIDENCE:
          </h4>
          <div className="space-y-1.5">
            {data.discrepancyFactors.length > 0 ? (
              data.discrepancyFactors.map((factor, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/90 rounded border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="font-bold text-slate-200">{factor.metric}:</span>{' '}
                    <span className="text-amber-300">{factor.systemValue}</span>
                  </div>
                  <div className="text-slate-400 text-right">
                    <span>{factor.trustObservation}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800 text-xs font-mono text-emerald-400">
                No active trust discrepancies found. Sensor telemetry mathematically validates physical model equations.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
