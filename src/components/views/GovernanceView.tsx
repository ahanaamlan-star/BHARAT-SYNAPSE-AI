import React from 'react';
import { FileText, ShieldAlert, CheckCircle2, Lock, UserCheck } from 'lucide-react';

export const GovernanceView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0e1424] p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100">GOVERNANCE & AI SAFETY GUARDRAILS</h2>
            <span className="text-xs text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
              HUMAN-IN-THE-LOOP (HITL)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enforcing policy guardrails preventing autonomous SCADA actuation when Reality Confidence Score™ drops below 60%.
          </p>
        </div>
      </div>

      {/* Governance Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-[#0e1424] border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> GUARDRAIL RULE #1
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              ACTIVE
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-200">Mandatory Human-in-the-Loop Override Gate</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            If Reality Confidence Score™ &lt; 60%, autonomous AI actuation is strictly disabled. Physical breaker trips require human operator verification.
          </p>
        </div>

        <div className="p-5 bg-[#0e1424] border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> GUARDRAIL RULE #2
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              ACTIVE
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-200">Unverified Telemetry Quarantining</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Telemetry streams lacking cryptographic HSM provenance signatures are automatically assigned zero weight in Intelligence Engine inputs.
          </p>
        </div>
      </div>
    </div>
  );
};
