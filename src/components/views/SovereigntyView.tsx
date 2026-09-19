import React, { useState } from 'react';
import { SovereigntyEngine } from '../../services/sovereigntyEngine';
import {
  Building2,
  ShieldCheck,
  Key,
  Lock,
  CheckCircle2,
  Cpu,
  Database,
  Cloud,
  Wifi,
  BrainCircuit,
  Layers,
  Activity,
  AlertTriangle,
  Info,
  Server,
  Radio,
  Workflow,
  Sparkles,
  Compass,
  ArrowRight,
  Zap,
  Globe,
  Sliders,
  Award,
  Eye,
  GitFork,
  Check
} from 'lucide-react';

export const SovereigntyView: React.FC = () => {
  const auditLogs = SovereigntyEngine.getAuditLogs();

  // Active Architecture Stage
  const [activeArchStage, setActiveArchStage] = useState<number>(0);

  // Dependency Map Category Filter
  const [dependencyFilter, setDependencyFilter] = useState<
    'ALL' | 'Domestic' | 'External' | 'Mixed' | 'Synthetic'
  >('ALL');

  // Edge Processing Interactive Mode
  const [activeProcessingMode, setActiveProcessingMode] = useState<'EDGE' | 'CENTRAL'>('EDGE');

  // 1. Dashboard Readiness Indicators (8 Required)
  const readinessIndicators = [
    {
      id: 'indigenous-ai',
      title: 'Indigenous AI Readiness',
      score: 78,
      status: 'High Readiness',
      icon: BrainCircuit,
      color: 'text-indigo-400',
      description: 'Custom fine-tuned foundation weights & physics-informed neural surrogates.'
    },
    {
      id: 'data-sovereignty',
      title: 'Data Sovereignty',
      score: 92,
      status: 'Sovereign Enclave',
      icon: Database,
      color: 'text-cyan-400',
      description: 'On-premise encrypted SCADA telemetry with local HSM root signatures.'
    },
    {
      id: 'edge-intelligence',
      title: 'Edge Intelligence Readiness',
      score: 84,
      status: 'Autonomous Edge',
      icon: Cpu,
      color: 'text-emerald-400',
      description: 'Substation FPGA & embedded micro-inference with air-gapped execution.'
    },
    {
      id: 'open-architecture',
      title: 'Open Architecture',
      score: 88,
      status: 'Vendor Neutral',
      icon: Workflow,
      color: 'text-amber-400',
      description: 'Open IEC-61850 & Modbus SCADA protocol compliance with zero vendor lock-in.'
    },
    {
      id: 'dependency-exposure',
      title: 'Dependency Exposure',
      score: 24, // Inverted: lower exposure = better
      status: 'Low Exposure (24%)',
      icon: AlertTriangle,
      color: 'text-rose-400',
      description: 'Minimal reliance on external non-domestic runtime cloud dependencies.'
    },
    {
      id: 'infrastructure-resilience',
      title: 'Infrastructure Resilience',
      score: 91,
      status: 'High Resilience',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      description: 'Multi-region fallback routing & automated topology failover.'
    },
    {
      id: 'explainability',
      title: 'Explainability',
      score: 95,
      status: 'Auditable XAI',
      icon: Sparkles,
      color: 'text-indigo-300',
      description: 'Causal SHAP attribution & mathematical decision cards.'
    },
    {
      id: 'compute-readiness',
      title: 'Compute Readiness',
      score: 72,
      status: 'Progressive Hardware',
      icon: Server,
      color: 'text-cyan-300',
      description: 'Indigenous Shakti/RISC-V & edge TPU accelerator compatibility.'
    }
  ];

  // 2. Architecture 8-Stage Flow
  const architectureStages = [
    {
      stage: 'Sensors',
      title: '1. Sensors',
      icon: Radio,
      detail: 'Multi-modal physical SCADA RTUs, optical fiber RTD temperature sensors, and frequency meters.',
      sovereigntyNote: 'Local hardware sensor signals with direct electrical isolation.'
    },
    {
      stage: 'Edge Intelligence',
      title: '2. Edge Intelligence',
      icon: Cpu,
      detail: 'Local substation FPGA & embedded micro-inference engines executing <2ms anomaly detection.',
      sovereigntyNote: 'Air-gapped execution — zero raw telemetry transmission over public WAN.'
    },
    {
      stage: 'Trust Engine',
      title: '3. Trust Engine',
      icon: ShieldCheck,
      detail: 'Cryptographic HMAC signature verification & 12-node consensus quorum validation.',
      sovereigntyNote: 'Attested with local Hardware Security Module (HSM) root keys.'
    },
    {
      stage: 'Digital Twin',
      title: '4. Digital Twin',
      icon: Layers,
      detail: 'High-fidelity physics sandbox simulating thermal dissipation, winding strain, and busbar voltage.',
      sovereigntyNote: 'Fully self-contained deterministic physics model.'
    },
    {
      stage: 'AI Intelligence',
      title: '5. AI Intelligence',
      icon: BrainCircuit,
      detail: 'Neural surrogate models computing 24-hour failure probabilities and SHAP causal drivers.',
      sovereigntyNote: 'Weights trained on local grid telemetry without external API dependencies.'
    },
    {
      stage: 'Counterfactual Engine',
      title: '6. Counterfactual Engine',
      icon: Sparkles,
      detail: 'Simulates "What-If" scenarios evaluating load shedding, cooling override, and topology rerouting.',
      sovereigntyNote: 'Explores alternate state trajectories safely in memory.'
    },
    {
      stage: 'Resilience Engine',
      title: '7. Resilience Engine',
      icon: Award,
      detail: 'Computes the 8-dimensional BharatSynapse Resilience Score™ (0–100%).',
      sovereigntyNote: 'Synthesizes physical health, data trust, and recovery latency SLA.'
    },
    {
      stage: 'Decision Support',
      title: '8. Decision Support',
      icon: CheckCircle2,
      detail: 'Formulates explicit "AI recommends X because..." decision cards for operator signoff.',
      sovereigntyNote: 'Strict human-in-the-loop governance without autonomous actuator override.'
    }
  ];

  // 3. Dependency Map Taxonomy
  const dependencyItems = [
    { category: 'AI Models', name: 'Physics Neural Surrogate', classification: 'Domestic', details: 'Locally trained physics surrogate on indigenous power grid telemetry.' },
    { category: 'AI Models', name: 'Foundation Model Weights', classification: 'Mixed', details: 'Open-weights architecture fine-tuned on local SCADA datasets.' },
    { category: 'Compute', name: 'Substation Edge FPGAs', classification: 'Domestic', details: 'Indigenous RISC-V / Shakti chip architecture evaluation nodes.' },
    { category: 'Compute', name: 'High-Density Accelerators', classification: 'External', details: 'Imported PCIe GPU/NPU accelerator hardware.' },
    { category: 'Cloud', name: 'On-Premise Private Enclave', classification: 'Domestic', details: 'Air-gapped local server cluster running in state power control room.' },
    { category: 'Cloud', name: 'Backup Cold Storage Cloud', classification: 'Mixed', details: 'Encrypted multi-region cloud backup using local HSM keys.' },
    { category: 'Hardware', name: 'Local SCADA RTU Controllers', classification: 'Domestic', details: 'Custom micro-controllers designed for regional substations.' },
    { category: 'Hardware', name: 'Optical Isolators & Breakers', classification: 'Domestic', details: 'Vacuum circuit breakers manufactured by domestic vendors.' },
    { category: 'Sensors', name: 'Fiber-Optic Winding RTDs', classification: 'Domestic', details: 'Indigenous fiber-optic winding temperature probes.' },
    { category: 'Sensors', name: 'High-Frequency CT/PT Meters', classification: 'Mixed', details: 'Domestic metering units with imported precision ADCs.' },
    { category: 'Connectivity', name: 'NavIC Satellite Telemetry Sync', classification: 'Domestic', details: 'ISRO NavIC precise time synchronization bus.' },
    { category: 'Connectivity', name: 'Dedicated Fiber SCADA Mesh', classification: 'Domestic', details: 'State utility private optical fiber network.' },
    { category: 'Data', name: 'Historical Grid Anomaly Logs', classification: 'Domestic', details: '10+ years of regional utility disturbance data.' },
    { category: 'Data', name: 'Synthetic Disturbances Sandbox', classification: 'Synthetic', details: 'Simulated geomagnetic storm & physical short-circuit test streams.' },
    { category: 'Software', name: 'BharatSynapse Core OS', classification: 'Domestic', details: 'Custom hardened Linux RTOS with embedded trust engine.' },
    { category: 'Software', name: 'Open SCADA Stack (IEC-61850)', classification: 'Mixed', details: 'Open-source industrial protocol stack audited locally.' }
  ];

  const filteredDependencies =
    dependencyFilter === 'ALL'
      ? dependencyItems
      : dependencyItems.filter((item) => item.classification === dependencyFilter);

  // Stats for Dependency Map
  const domesticCount = dependencyItems.filter((i) => i.classification === 'Domestic').length;
  const mixedCount = dependencyItems.filter((i) => i.classification === 'Mixed').length;
  const externalCount = dependencyItems.filter((i) => i.classification === 'External').length;
  const syntheticCount = dependencyItems.filter((i) => i.classification === 'Synthetic').length;
  const totalCount = dependencyItems.length;

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950 via-[#0e1424] to-indigo-950 p-5 rounded-xl border border-amber-800/80 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Building2 className="w-6 h-6 text-amber-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
              BHARAT SOVEREIGNTY LAYER™
            </h2>
            <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Air-Gapped Technology Autonomy
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 font-sans max-w-2xl">
            Demonstrating how an indigenous AI infrastructure intelligence architecture progressively reduces technology dependency while preserving operational resilience.
          </p>
        </div>

        {/* Prototype Indicator Badge */}
        <div className="px-3 py-1.5 bg-slate-950 rounded-lg border border-amber-800/80 shrink-0 text-right">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
            CONCEPTUAL PROTOTYPE
          </span>
          <span className="text-[11px] text-slate-400 font-sans">Illustrative Prototype Indicator</span>
        </div>
      </div>

      {/* CORE SOVEREIGNTY MESSAGE BANNER */}
      <div className="bg-[#0e1424] border-2 border-amber-500/80 rounded-xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> ARCHITECTURAL DIRECTIVE
          </span>
          <span className="text-[10px] text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 font-mono">
            Illustrative Prototype Indicator
          </span>
        </div>

        <blockquote className="text-base sm:text-lg font-bold text-slate-100 italic border-l-4 border-amber-400 pl-4 py-1 font-sans leading-relaxed">
          &quot;Technological sovereignty is not isolation. It is the ability to understand, secure, operate and evolve critical technology systems using indigenous capabilities.&quot;
        </blockquote>

        <p className="text-xs text-slate-400 font-sans pt-1">
          Disclaimer: This layer is a conceptual prototype demonstrating architecture principles for autonomous critical infrastructure. Values displayed are illustrative indicators for framework design and evaluation.
        </p>
      </div>

      {/* DASHBOARD: 8 READINESS INDICATORS */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              SOVEREIGNTY & READINESS DASHBOARD (8 INDICATORS)
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-mono">
            Illustrative Prototype Indicator
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {readinessIndicators.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold flex items-center gap-1.5 ${ind.color}`}>
                    <Icon className="w-4 h-4" /> {ind.title}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-2xl font-black text-slate-100 font-mono">{ind.score}%</span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    {ind.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className={`h-1.5 rounded-full ${
                      ind.id === 'dependency-exposure' ? 'bg-rose-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${ind.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-normal pt-1">
                  {ind.description}
                </p>

                <div className="text-[9px] text-slate-500 font-mono text-right pt-1 border-t border-slate-900">
                  Illustrative Prototype Indicator
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ARCHITECTURE: 8-STAGE PIPELINE FLOW */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              SOVEREIGN ARCHITECTURE FLOW (8-STAGE PIPELINE)
            </h3>
          </div>
          <span className="text-xs text-cyan-400 font-mono">
            Select stage to inspect sovereignty protocol
          </span>
        </div>

        {/* Pipeline Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {architectureStages.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = activeArchStage === idx;
            return (
              <button
                key={st.stage}
                onClick={() => setActiveArchStage(idx)}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between space-y-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-950 to-slate-950 border-amber-500 ring-1 ring-amber-500 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">0{idx + 1}</span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                </div>
                <div className="text-xs font-bold text-slate-100 leading-tight">{st.stage}</div>
                <div className="text-[9px] text-emerald-400 font-mono pt-1 border-t border-slate-800">
                  Verified
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="p-4 bg-slate-950 rounded-xl border border-amber-800/80 space-y-2 font-sans text-xs">
          <div className="flex items-center justify-between font-mono">
            <span className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              STAGE DETAIL: {architectureStages[activeArchStage].title}
            </span>
            <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              Sovereignty Verified
            </span>
          </div>

          <p className="text-slate-200 leading-relaxed">
            {architectureStages[activeArchStage].detail}
          </p>

          <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-amber-300 flex items-center gap-2 font-mono text-[11px]">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Sovereignty Protocol: {architectureStages[activeArchStage].sovereigntyNote}</span>
          </div>
        </div>
      </div>

      {/* EDGE AI COMPARISON: CENTRAL PROCESSING vs EDGE PROCESSING */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              EDGE AI COMPARISON: CENTRAL vs EDGE PROCESSING
            </h3>
          </div>

          {/* Interactive Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0 text-xs">
            <button
              onClick={() => setActiveProcessingMode('EDGE')}
              className={`px-3 py-1 rounded font-bold cursor-pointer transition-all ${
                activeProcessingMode === 'EDGE'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EDGE PROCESSING (AIR-GAPPED)
            </button>
            <button
              onClick={() => setActiveProcessingMode('CENTRAL')}
              className={`px-3 py-1 rounded font-bold cursor-pointer transition-all ${
                activeProcessingMode === 'CENTRAL'
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CENTRAL CLOUD PROCESSING
            </button>
          </div>
        </div>

        {/* 5 Dimensions Comparison Table */}
        <div className="space-y-3 font-sans text-xs">
          {/* 1. Latency */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="font-mono font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> 1. Latency
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'EDGE' ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Edge Processing:</strong> &lt;2ms deterministic FPGA/micro-inference response.
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'CENTRAL' ? 'bg-indigo-950/60 border-indigo-700 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Central Cloud:</strong> ~200ms WAN roundtrip latency with potential network jitter.
            </div>
          </div>

          {/* 2. Bandwidth */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="font-mono font-bold text-slate-200 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-400" /> 2. Bandwidth
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'EDGE' ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Edge Processing:</strong> Delta-only telemetry uplink (&lt;50 KB/s), saving 99.6% bandwidth.
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'CENTRAL' ? 'bg-indigo-950/60 border-indigo-700 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Central Cloud:</strong> Continuous 12.5 MB/s raw telemetry stream WAN saturation.
            </div>
          </div>

          {/* 3. Resilience */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="font-mono font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 3. Resilience
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'EDGE' ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Edge Processing:</strong> 100% operational continuity during air-gapped cyber severance.
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'CENTRAL' ? 'bg-indigo-950/60 border-indigo-700 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Central Cloud:</strong> Vulnerable to fiber cut or central cloud outages.
            </div>
          </div>

          {/* 4. Privacy */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="font-mono font-bold text-slate-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" /> 4. Privacy
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'EDGE' ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Edge Processing:</strong> Cryptographically signed local boundary — zero raw telemetry egress.
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'CENTRAL' ? 'bg-indigo-950/60 border-indigo-700 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Central Cloud:</strong> Raw grid telemetry transmitted across external networks.
            </div>
          </div>

          {/* 5. Availability */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="font-mono font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" /> 5. Availability
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'EDGE' ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Edge Processing:</strong> 99.999% localized hardware availability with dual-redundant DC power.
            </div>
            <div className={`p-2.5 rounded border text-xs ${activeProcessingMode === 'CENTRAL' ? 'bg-indigo-950/60 border-indigo-700 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              <strong>Central Cloud:</strong> Dependent on third-party cloud service SLAs (99.9%).
            </div>
          </div>
        </div>
      </div>

      {/* DEPENDENCY MAP MATRIX */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              TECHNOLOGY DEPENDENCY TAXONOMY MAP
            </h3>
          </div>

          {/* Classification Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            {(['ALL', 'Domestic', 'External', 'Mixed', 'Synthetic'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setDependencyFilter(filter)}
                className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-all ${
                  dependencyFilter === filter
                    ? 'bg-amber-950 text-amber-300 border border-amber-700'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Breakdown Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
          <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
            <span className="text-emerald-400 font-bold">Domestic:</span>
            <strong className="font-mono text-slate-100">{domesticCount} items ({Math.round((domesticCount / totalCount) * 100)}%)</strong>
          </div>
          <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
            <span className="text-amber-300 font-bold">Mixed:</span>
            <strong className="font-mono text-slate-100">{mixedCount} items ({Math.round((mixedCount / totalCount) * 100)}%)</strong>
          </div>
          <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
            <span className="text-rose-400 font-bold">External:</span>
            <strong className="font-mono text-slate-100">{externalCount} items ({Math.round((externalCount / totalCount) * 100)}%)</strong>
          </div>
          <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
            <span className="text-cyan-300 font-bold">Synthetic:</span>
            <strong className="font-mono text-slate-100">{syntheticCount} items ({Math.round((syntheticCount / totalCount) * 100)}%)</strong>
          </div>
        </div>

        {/* Dependency Table */}
        <div className="space-y-2">
          {filteredDependencies.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-400 font-bold font-mono uppercase bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {item.category}
                  </span>
                  <strong className="text-slate-100 font-mono">{item.name}</strong>
                </div>
                <p className="text-slate-400 text-[11px]">{item.details}</p>
              </div>

              <span
                className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono shrink-0 border ${
                  item.classification === 'Domestic'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : item.classification === 'Mixed'
                    ? 'bg-amber-950 text-amber-300 border-amber-700'
                    : item.classification === 'External'
                    ? 'bg-rose-950 text-rose-300 border-rose-700'
                    : 'bg-cyan-950 text-cyan-300 border-cyan-700'
                }`}
              >
                {item.classification}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* LIVE CRYPTOGRAPHIC AUDIT LOG TABLE */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" /> LIVE CRYPTOGRAPHIC SOVEREIGNTY AUDIT LOG
          </h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
            HSM Hardware Signed
          </span>
        </div>

        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 bg-slate-950 rounded border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 font-mono">{log.subsystem}</span>
                <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {log.status}
                </span>
              </div>
              <div className="text-slate-300 font-sans">{log.auditCheck}</div>
              <div className="text-[10px] text-slate-500 font-mono">Checksum: {log.checksumHash}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
