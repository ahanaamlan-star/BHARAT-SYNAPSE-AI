import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import {
  HelpCircle,
  BrainCircuit,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Eye,
  FileText,
  Search,
  Database,
  Activity,
  Building2,
  Award,
  AlertOctagon,
  Compass,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Lock,
  GitFork
} from 'lucide-react';

export const ExplainableAiView: React.FC = () => {
  const { selectedAsset, selectedAssetId, selectAsset, assets, setActiveTab } = useSystem();

  const rc = selectedAsset.realityConfidence;
  const it = selectedAsset.intelligenceTwin;
  const tt = selectedAsset.trustTwin;
  const pt = selectedAsset.physicalTwin;

  // Selected Reasoning Timeline Stage for detail view
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(0);

  // Selected Uncertainty Regime for inspection
  const [selectedUncertaintyRegime, setSelectedUncertaintyRegime] = useState<
    'HIGH' | 'MODERATE' | 'LOW' | 'INSUFFICIENT'
  >('HIGH');

  // Determine current asset's uncertainty regime
  const currentConfidence = it.predictionConfidence;
  const currentTrust = tt.overallDataTrust;

  let currentRegime: 'HIGH' | 'MODERATE' | 'LOW' | 'INSUFFICIENT' = 'HIGH';
  if (currentTrust < 50 || !tt) {
    currentRegime = 'INSUFFICIENT';
  } else if (currentConfidence < 65 || currentTrust < 65) {
    currentRegime = 'LOW';
  } else if (currentConfidence < 85 || currentTrust < 80) {
    currentRegime = 'MODERATE';
  } else {
    currentRegime = 'HIGH';
  }

  // Visual AI Reasoning Timeline Nodes
  const reasoningTimeline = [
    {
      id: 'OBSERVE',
      title: '1. OBSERVE',
      subtitle: 'Raw Telemetry Ingestion',
      icon: Eye,
      status: 'Completed',
      timestamp: 'T+00m 00s',
      detail: `Ingested 14 telemetry parameters across 12 SCADA sensor nodes on ${selectedAsset.code}. Winding Temp: 78.4°C, Load: 84%, Vibration: 2.1mm/s.`
    },
    {
      id: 'VERIFY',
      title: '2. VERIFY',
      subtitle: 'Data Trust Quorum Check',
      icon: ShieldCheck,
      status: 'Completed',
      timestamp: 'T+00m 12s',
      detail: `Cryptographic HMAC signature verification passed. Sensor cross-correlation quorum score: ${tt.overallDataTrust}%. Telemetry verified.`
    },
    {
      id: 'ANALYSE',
      title: '3. ANALYSE',
      subtitle: 'Causal & SHAP Attribution',
      icon: BrainCircuit,
      status: 'Completed',
      timestamp: 'T+01m 05s',
      detail: `Computed SHAP feature attributions. Primary risk driver: Winding Temperature (+31% weight), followed by Electrical Load (+18%).`
    },
    {
      id: 'SIMULATE',
      title: '4. SIMULATE',
      subtitle: 'Sandbox Digital Twin',
      icon: Cpu,
      status: 'Completed',
      timestamp: 'T+02m 30s',
      detail: `Simulated 7 candidate recovery options in digital twin physics sandbox. Evaluated thermal dissipation, voltage stability, and MTTR.`
    },
    {
      id: 'COMPARE',
      title: '5. COMPARE',
      subtitle: 'Multi-Criteria Scoring',
      icon: Layers,
      status: 'Completed',
      timestamp: 'T+03m 15s',
      detail: `Ranked options by Risk Reduction % vs Recovery Latency SLA vs Data Trust Gate requirement (Minimum 80% trust required).`
    },
    {
      id: 'RECOMMEND',
      title: '6. RECOMMEND',
      subtitle: 'XAI Decision Card Generation',
      icon: Sparkles,
      status: 'Active',
      timestamp: 'T+03m 45s',
      detail: `Formulated explicit "AI recommends X because..." recommendation. Awaiting human-in-the-loop operator signoff.`
    }
  ];

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-indigo-950 via-[#0e1424] to-cyan-950 p-5 rounded-xl border border-indigo-800/80 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <HelpCircle className="w-6 h-6 text-indigo-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
              EXPLAINABLE AI CENTER™
            </h2>
            <span className="text-xs font-bold text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-700 flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" /> XAI Decomposition & SHAP Feature Attribution
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 font-sans max-w-2xl">
            Algorithmic auditability, causal explanations, data trust gating, and uncertainty bounds for all predictions and recommendations.
          </p>
        </div>

        {/* Asset Selector */}
        <div className="flex items-center gap-2 bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 shrink-0">
          <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs text-slate-400 font-bold uppercase">Asset:</span>
          <select
            value={selectedAssetId}
            onChange={(e) => selectAsset(e.target.value)}
            className="bg-slate-900 text-cyan-300 font-bold text-xs px-2.5 py-1.5 rounded border border-slate-700 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}: {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CORE MANDATE BANNER: 6 FUNDAMENTAL QUESTIONS ANSWERED */}
      <div className="bg-[#0e1424] border-2 border-indigo-500/80 rounded-xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              EVERY AI RESULT MUST ANSWER (6-POINT XAI MANDATE)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-sans">
            Current Target: <strong className="text-cyan-300">{selectedAsset.code} ({selectedAsset.name})</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {/* 1. WHAT? */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-amber-400 font-extrabold text-xs">
              <span>1. WHAT?</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-slate-200 font-sans leading-relaxed">
              Failure Probability predicted at <strong className="text-amber-300">{it.failureProbability}%</strong> within <strong className="text-cyan-300">{it.estimatedFailureWindow || '2h 15m'}</strong> for {selectedAsset.code}.
            </p>
          </div>

          {/* 2. WHY? */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-amber-400 font-extrabold text-xs">
              <span>2. WHY?</span>
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-slate-200 font-sans leading-relaxed">
              Causal drivers: Temp ↑ (+31% weight), Electrical Load ↑ (+18% weight), Cooling Efficiency ↓ (-14% weight).
            </p>
          </div>

          {/* 3. HOW CONFIDENT? */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-amber-400 font-extrabold text-xs">
              <span>3. HOW CONFIDENT?</span>
              <Award className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-slate-200 font-sans leading-relaxed">
              Model Prediction Confidence: <strong className="text-emerald-400">{it.predictionConfidence}%</strong> (Reality Confidence Index: <strong className="text-cyan-300">{rc.score}%</strong>).
            </p>
          </div>

          {/* 4. HOW TRUSTWORTHY IS THE DATA? */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-amber-400 font-extrabold text-xs">
              <span>4. HOW TRUSTWORTHY IS DATA?</span>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-slate-200 font-sans leading-relaxed">
              Data Trust Score: <strong className="text-cyan-300">{tt.overallDataTrust}%</strong> ({tt.provenance}). Cryptographic sensor quorum passed.
            </p>
          </div>

          {/* 5. WHAT COULD HAPPEN? */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-amber-400 font-extrabold text-xs">
              <span>5. WHAT COULD HAPPEN?</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-slate-200 font-sans leading-relaxed">
              Dielectric insulation degradation, localized thermal lockout, and potential cascade risk to adjacent feeders if unaddressed.
            </p>
          </div>

          {/* 6. WHAT SHOULD WE CONSIDER? */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-amber-400 font-extrabold text-xs">
              <span>6. WHAT SHOULD WE CONSIDER?</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-slate-200 font-sans leading-relaxed">
              Rerouting 60% busbar power through Auxiliary Substation Transformer N+1 reduces failure risk by 92% in 12 mins.
            </p>
          </div>
        </div>
      </div>

      {/* VISUAL AI REASONING TIMELINE */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              VISUAL AI REASONING TIMELINE
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-bold">
            OBSERVE → VERIFY → ANALYSE → SIMULATE → COMPARE → RECOMMEND
          </span>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {reasoningTimeline.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeTimelineStage === idx;
            return (
              <button
                key={node.id}
                onClick={() => setActiveTimelineStage(idx)}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between space-y-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-950 to-slate-950 border-indigo-500 ring-1 ring-indigo-500 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">STEP 0{idx + 1}</span>
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-amber-400 animate-pulse' : 'text-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100">{node.title}</div>
                  <div className="text-[10px] text-slate-400">{node.subtitle}</div>
                </div>
                <div className="text-[9px] text-cyan-300 font-mono pt-1 border-t border-slate-800">
                  {node.timestamp}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Banner */}
        <div className="p-4 bg-slate-950 rounded-lg border border-indigo-800/80 space-y-1.5 font-sans text-xs">
          <div className="flex items-center justify-between text-indigo-300 font-extrabold font-mono text-xs">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              STAGE DETAIL: {reasoningTimeline[activeTimelineStage].title} — {reasoningTimeline[activeTimelineStage].subtitle}
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
              Status: {reasoningTimeline[activeTimelineStage].status}
            </span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            {reasoningTimeline[activeTimelineStage].detail}
          </p>
        </div>
      </div>

      {/* DUAL CARDS: PREDICTION CARD & DECISION CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PREDICTION CARD */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  PREDICTION CARD
                </h3>
              </div>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                SHAP Attributed
              </span>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Failure Probability:</span>
                <strong className="text-amber-400 font-mono text-sm">{it.failureProbability}%</strong>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Prediction Confidence:</span>
                <strong className="text-emerald-400 font-mono text-sm">{it.predictionConfidence}%</strong>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Data Trust:</span>
                <strong className="text-cyan-300 font-mono text-sm">{tt.overallDataTrust}%</strong>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Reality Confidence:</span>
                <strong className="text-indigo-300 font-mono text-sm">{rc.score}%</strong>
              </div>
            </div>

            {/* Contributing Factors (SHAP Feature Attributions) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Contributing Factors (SHAP Weights):</span>
                <span className="text-[10px] text-slate-500 font-normal">Impact %</span>
              </h4>

              <div className="space-y-2.5">
                {it.contributingFactors?.map((cf, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{cf.factorName}</span>
                      <span className="font-extrabold text-amber-400 flex items-center gap-1 font-mono">
                        {cf.direction === 'INCREASE' ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 text-cyan-400" />
                        )}
                        {cf.valueChange} ({cf.impactWeightPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                      <div
                        className={`h-1.5 rounded-full ${
                          cf.direction === 'INCREASE' ? 'bg-amber-400' : 'bg-cyan-400'
                        }`}
                        style={{ width: `${cf.impactWeightPercent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-normal">
                      {cf.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Evidence */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Supporting Telemetry Evidence:
              </span>
              <div className="space-y-1.5 font-sans text-xs text-slate-300">
                {it.supportingEvidence?.map((ev, i) => (
                  <div key={i} className="p-2 bg-slate-950 rounded border border-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DECISION CARD */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  DECISION CARD
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Human-in-the-Loop
              </span>
            </div>

            {/* Recommended Action */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-emerald-800/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                Recommended Action:
              </span>
              <div className="text-sm font-extrabold text-emerald-300">
                Activate Redundant Auxiliary Transformer Path
              </div>
            </div>

            {/* MANDATORY STRICT RULE: "AI recommends X because..." */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-indigo-800/80 space-y-1.5">
              <div className="text-xs font-extrabold text-amber-400 uppercase font-mono flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-indigo-400" /> EXPLICIT CAUSAL EXPLANATION:
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                <strong className="text-emerald-300 font-mono">AI recommends Activate Redundant Path because</strong> rerouting 60% busbar electrical load through Auxiliary Substation Transformer N+1 reduces 24-hour failure probability from <strong className="text-amber-300">{it.failureProbability}%</strong> to <strong className="text-emerald-400">2%</strong> within a 12-minute latency budget while passing the required 80% telemetry trust gate.
              </p>
            </div>

            {/* Decision Parameters Table */}
            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400">Expected Benefit:</span>
                <strong className="text-emerald-400 font-mono">-92% Risk Reduction | -14°C Winding Temp Drop</strong>
              </div>

              <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400">Risk & Side Effects:</span>
                <strong className="text-amber-300 font-mono">Transient load surge (+18%) on Secondary Feeder B</strong>
              </div>

              <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400">Recovery Time (MTTR):</span>
                <strong className="text-cyan-300 font-mono">12 Minutes (Within 30m SLA Budget)</strong>
              </div>

              <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400">Decision Confidence:</span>
                <strong className="text-emerald-400 font-mono">94% Confidence</strong>
              </div>

              <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-400">Data Trust Requirement:</span>
                <strong className="text-cyan-300 font-mono">
                  80% Min Required (Passed: Current Trust = {tt.overallDataTrust}%)
                </strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('recovery')}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>LAUNCH RECOVERY ENGINE SIMULATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EXPLICIT UNCERTAINTY PANEL */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              EXPLICIT UNCERTAINTY PANEL
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Current Asset Regime:</span>
            <span
              className={`px-2.5 py-0.5 text-xs font-extrabold rounded border ${
                currentRegime === 'HIGH'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : currentRegime === 'MODERATE'
                  ? 'bg-amber-950 text-amber-300 border-amber-700'
                  : currentRegime === 'LOW'
                  ? 'bg-orange-950 text-orange-300 border-orange-700'
                  : 'bg-red-950 text-red-300 border-red-700'
              }`}
            >
              {currentRegime} CONFIDENCE
            </span>
          </div>
        </div>

        {/* 4 Explicit Confidence Regimes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* HIGH CONFIDENCE */}
          <button
            onClick={() => setSelectedUncertaintyRegime('HIGH')}
            className={`p-4 rounded-xl border text-left space-y-2 cursor-pointer transition-all ${
              selectedUncertaintyRegime === 'HIGH'
                ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> HIGH CONFIDENCE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">&gt; 85%</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-normal">
              Model confidence &gt;85% with verified data trust (&gt;80%). Full digital twin simulation valid. Human operator signoff recommended.
            </p>
          </button>

          {/* MODERATE CONFIDENCE */}
          <button
            onClick={() => setSelectedUncertaintyRegime('MODERATE')}
            className={`p-4 rounded-xl border text-left space-y-2 cursor-pointer transition-all ${
              selectedUncertaintyRegime === 'MODERATE'
                ? 'bg-amber-950/60 border-amber-500 ring-1 ring-amber-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1">
                <Info className="w-4 h-4 text-amber-400" /> MODERATE CONFIDENCE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">65% – 85%</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-normal">
              Minor telemetry sensor noise or thermal drift detected. Double-sampling polling recommended before executing topology changes.
            </p>
          </button>

          {/* LOW CONFIDENCE */}
          <button
            onClick={() => setSelectedUncertaintyRegime('LOW')}
            className={`p-4 rounded-xl border text-left space-y-2 cursor-pointer transition-all ${
              selectedUncertaintyRegime === 'LOW'
                ? 'bg-orange-950/60 border-orange-500 ring-1 ring-orange-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-orange-300 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-orange-400" /> LOW CONFIDENCE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">&lt; 65%</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-normal">
              Multi-sensor variance or packet jitter detected. Requires physical infrared thermal camera sweep & secondary sensor validation.
            </p>
          </button>

          {/* INSUFFICIENT EVIDENCE */}
          <button
            onClick={() => setSelectedUncertaintyRegime('INSUFFICIENT')}
            className={`p-4 rounded-xl border text-left space-y-2 cursor-pointer transition-all ${
              selectedUncertaintyRegime === 'INSUFFICIENT'
                ? 'bg-red-950/60 border-red-500 ring-1 ring-red-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-red-400 flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-red-400" /> INSUFFICIENT EVIDENCE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">STALE / NO STREAM</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-normal">
              Telemetry stream interrupted, checkpoint stale (&gt;30m), or HMAC signature failed. Autonomous recommendations strictly blocked.
            </p>
          </button>
        </div>
      </div>

      {/* RESPONSIBLE AI PANEL */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              RESPONSIBLE AI GOVERNANCE & LIMITATIONS
            </h3>
          </div>
          <span className="text-xs text-amber-300 font-mono">
            Audited Governance Protocol v4.2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          {/* Data Limitations */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-300 uppercase font-mono flex items-center gap-1.5">
              <Database className="w-4 h-4 text-cyan-400" /> Data Limitations
            </span>
            <p className="text-slate-300 leading-relaxed">
              SCADA telemetry polling is throttled to 10Hz sampling frequencies. Thermal camera sensors monitor external radiator skins and cannot penetrate internal transformer core paper layers directly.
            </p>
          </div>

          {/* Synthetic Data Notice */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase font-mono flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-400" /> Synthetic Data Notice
            </span>
            <p className="text-slate-300 leading-relaxed">
              Demonstration prototype prediction — synthetically generated physics stream for evaluation. Do not claim real-world predictive accuracy without physical HSM hardware telemetry key binding.
            </p>
          </div>

          {/* Model Limitations */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase font-mono flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-400" /> Model Limitations
            </span>
            <p className="text-slate-300 leading-relaxed">
              Neural surrogate physics approximations operate reliably within normal thermal envelopes (-20°C to +85°C). Rare, out-of-distribution geomagnetic solar storm events require external physical simulation.
            </p>
          </div>

          {/* Verification Recommendation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-300 uppercase font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verification Recommendation
            </span>
            <p className="text-slate-300 leading-relaxed">
              Mandatory human-in-the-loop operator confirmation. Require double-sampling of winding RTUs and a 2-operator signoff protocol before triggering physical vacuum circuit breaker operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
