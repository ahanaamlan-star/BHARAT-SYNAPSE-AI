import React, { useState, useEffect } from 'react';
import { useSystem } from '../../context/SystemContext';
import {
  Award,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  BrainCircuit,
  Sparkles,
  Workflow,
  LifeBuoy,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Info,
  Clock,
  ArrowRight,
  Flame,
  Cpu,
  Lock,
  Compass,
  Check
} from 'lucide-react';

export const JudgeDemoView: React.FC = () => {
  const {
    selectedAsset,
    selectedAssetId,
    selectAsset,
    assets,
    setActiveTab,
    injectAnomaly,
    recalibrateTrust,
    runScenario,
    resetSimulation
  } = useSystem();

  // Demo step 1 through 10
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedRecoveryOption, setSelectedRecoveryOption] = useState<'A' | 'B' | 'C'>('B');
  const [recoveryExecuted, setRecoveryExecuted] = useState<boolean>(false);

  // Ref to track last executed step and prevent infinite re-render loops
  const lastExecutedStepRef = React.useRef<number | null>(null);

  // Auto-play timer (9 seconds per step if auto-playing)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 10) {
            setIsPlaying(false);
            return 10;
          }
          return prev + 1;
        });
      }, 9000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Execute actual state mutations based on step
  useEffect(() => {
    if (lastExecutedStepRef.current === currentStep) return;
    lastExecutedStepRef.current = currentStep;

    switch (currentStep) {
      case 1:
        // Step 1: Healthy benchmark state
        recalibrateTrust(selectedAssetId);
        setRecoveryExecuted(false);
        break;
      case 2:
        // Step 2: Inject sensor anomaly (Trust drops, Reality drops)
        injectAnomaly(selectedAssetId, 'DRIFT');
        break;
      case 3:
        // Step 3: Refusal / Safety Hold (Trust stays low, AI holds back)
        break;
      case 4:
        // Step 4: Verify reality (Recalibrate trust, prove Sensor B faulty)
        recalibrateTrust(selectedAssetId);
        break;
      case 5:
        // Step 5: Inject real physical cooling failure (Trust stays high, Health drops)
        runScenario('scenario-cooling-loss');
        break;
      case 6:
        // Step 6: Counterfactual (+20% load)
        runScenario('scenario-overload-cascade');
        break;
      case 7:
        // Step 7: Simulate Cascade
        runScenario('scenario-overload-cascade');
        break;
      case 8:
        // Step 8: Recovery Options Display
        break;
      case 9:
        // Step 9: Recovery Execution
        setRecoveryExecuted(true);
        recalibrateTrust(selectedAssetId);
        break;
      case 10:
        // Step 10: Final Decision Message
        break;
      default:
        break;
    }
  }, [currentStep, selectedAssetId, injectAnomaly, recalibrateTrust, runScenario]);

  const handleStepClick = (stepNum: number) => {
    setCurrentStep(stepNum);
    setIsPlaying(false);
  };

  const handleResetDemo = () => {
    lastExecutedStepRef.current = null;
    resetSimulation();
    setCurrentStep(1);
    setIsPlaying(false);
    setRecoveryExecuted(false);
  };

  // Step Metadata definitions
  const stepsMeta = [
    {
      step: 1,
      title: '1. HEALTHY STATE',
      subtitle: 'Baseline High-Confidence Operational View',
      badge: 'STABLE BENCHMARK',
      badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800',
      icon: ShieldCheck,
      narration:
        'At first, BharatSynapse has a high-confidence representation of the infrastructure. All 12 SCADA sensor streams are cryptographically verified and fully aligned.'
    },
    {
      step: 2,
      title: '2. INJECT SENSOR ANOMALY',
      subtitle: 'Cross-Sensor Disagreement Introduced',
      badge: 'TRUST BREAKDOWN',
      badgeColor: 'text-amber-400 bg-amber-950 border-amber-800',
      icon: ShieldAlert,
      narration:
        'Sensor A reports 82°C, Sensor C reports 80°C, but Sensor B suddenly drops to 43°C. The Trust Twin detects severe cross-sensor disagreement. Data Trust and Reality Confidence plummet.'
    },
    {
      step: 3,
      title: '3. AI DOES NOT BLINDLY ACT',
      subtitle: 'Safety Refusal Membrane Active',
      badge: 'KEY MOMENT — AUTONOMOUS REFUSAL',
      badgeColor: 'text-indigo-300 bg-indigo-950 border-indigo-700',
      icon: Lock,
      narration:
        'System health may be deteriorating, but confidence in telemetry is insufficient for a high-impact intervention. BharatSynapse explicitly refuses to trigger costly automated trips on corrupt data.'
    },
    {
      step: 4,
      title: '4. VERIFY REALITY',
      subtitle: 'Cross-Correlated Sensor Consensus',
      badge: 'TELEMETRY RECALIBRATED',
      badgeColor: 'text-cyan-300 bg-cyan-950 border-cyan-800',
      icon: CheckCircle2,
      narration:
        'Cross-checking acoustic transducers, fiber RTDs, and primary bus current draw isolates Sensor B as a drifting sensor payload. Data Trust is restored to 96% and Reality Confidence to 94%.'
    },
    {
      step: 5,
      title: '5. INJECT REAL FAILURE',
      subtitle: 'Physical Cooling System Degradation',
      badge: 'CONFIRMED PHYSICAL FAILURE',
      badgeColor: 'text-rose-400 bg-rose-950 border-rose-800',
      icon: Flame,
      narration:
        'Primary coolant circulation pump trips. System Health drops to 42% and Failure Probability rises to 88%. Data Trust remains HIGH (96%), giving the AI 94% Reality Confidence that the failure is real.'
    },
    {
      step: 6,
      title: '6. COUNTERFACTUAL ENGINE',
      subtitle: 'Simulating +20% Load Surge Trajectory',
      badge: 'COUNTERFACTUAL FORECAST',
      badgeColor: 'text-amber-300 bg-amber-950 border-amber-800',
      icon: Sparkles,
      narration:
        'Before taking action, the AI simulates an alternative reality: "What if grid demand spikes +20%?" Counterfactual sandbox reveals catastrophic thermal runaway in 18 minutes.'
    },
    {
      step: 7,
      title: '7. CASCADE SIMULATION',
      subtitle: 'Multi-Tier Failure Propagation Mapping',
      badge: 'CASCADE PATH MAPPED',
      badgeColor: 'text-purple-300 bg-purple-950 border-purple-800',
      icon: Workflow,
      narration:
        'Propagating thermal stress across the dependency graph maps a multi-tier cascade: Substation Transformer → Cooling System → SCADA Control Unit → Fiber Multiplexer → Regional Grid.'
    },
    {
      step: 8,
      title: '8. RECOVERY OPTIONS',
      subtitle: 'Multi-Criteria Strategy Comparison',
      badge: '3 CANDIDATE STRATEGIES',
      badgeColor: 'text-cyan-300 bg-cyan-950 border-cyan-800',
      icon: LifeBuoy,
      narration:
        'Evaluated 3 recovery strategies: Option A (Reduce Load -30%), Option B (Activate Redundant N+1 Cooling), and Option C (Status Quo). Option B minimizes MTTR and maximizes resilience.'
    },
    {
      step: 9,
      title: '9. SIMULATED RECOVERY',
      subtitle: 'Executing Optimal Action Strategy',
      badge: 'RECOVERY EXECUTED',
      badgeColor: 'text-emerald-300 bg-emerald-950 border-emerald-800',
      icon: Zap,
      narration:
        'Auxiliary Redundant Cooling N+1 activated. Winding temperature drops to 48°C, System Health restores to 92%, Failure Probability drops to 12%, and Resilience Score jumps to 94%.'
    },
    {
      step: 10,
      title: '10. BHARATSYNAPSE DECISION',
      subtitle: 'Final Innovation Summary',
      badge: 'DECISION COMPLETE',
      badgeColor: 'text-amber-400 bg-amber-950 border-amber-700',
      icon: Award,
      narration:
        'We did not simply predict the failure. We first established whether our view of reality could be trusted, simulated possible futures, evaluated cascading consequences, and selected the most resilient response.'
    }
  ];

  const currentMeta = stepsMeta[currentStep - 1];

  // Dynamic values calculated for current step
  let healthValue = 94;
  let dataTrustValue = 96;
  let realityConfidenceValue = 94;
  let resilienceValue = 92;
  let failureProbValue = 8;

  if (currentStep === 2) {
    dataTrustValue = 38;
    realityConfidenceValue = 32;
    healthValue = 94;
    resilienceValue = 72;
  } else if (currentStep === 3) {
    dataTrustValue = 38;
    realityConfidenceValue = 32;
    healthValue = 94;
    resilienceValue = 72;
  } else if (currentStep === 4) {
    dataTrustValue = 96;
    realityConfidenceValue = 94;
    healthValue = 94;
    resilienceValue = 92;
  } else if (currentStep === 5) {
    dataTrustValue = 96;
    realityConfidenceValue = 94;
    healthValue = 42;
    failureProbValue = 88;
    resilienceValue = 58;
  } else if (currentStep === 6) {
    dataTrustValue = 96;
    realityConfidenceValue = 94;
    healthValue = 42;
    failureProbValue = 88;
    resilienceValue = 58;
  } else if (currentStep === 7) {
    dataTrustValue = 96;
    realityConfidenceValue = 94;
    healthValue = 34;
    failureProbValue = 94;
    resilienceValue = 41;
  } else if (currentStep === 8) {
    dataTrustValue = 96;
    realityConfidenceValue = 94;
    healthValue = 42;
    failureProbValue = 88;
    resilienceValue = 58;
  } else if (currentStep === 9 || currentStep === 10) {
    dataTrustValue = 96;
    realityConfidenceValue = 96;
    healthValue = 92;
    failureProbValue = 12;
    resilienceValue = 94;
  }

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn font-mono">
      {/* JUDGE DEMO HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950 via-[#0e1424] to-indigo-950 p-5 rounded-xl border-2 border-amber-500/80 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Award className="w-7 h-7 text-amber-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">
              🏆 JUDGE DEMO MODE — 3-MINUTE INNOVATION WALKTHROUGH
            </h2>
            <span className="text-xs font-extrabold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-700">
              Guided 10-Step Interactive Executive Demo
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 font-sans max-w-2xl">
            Demonstrating how BharatSynapse AI verifies telemetry reality, prevents false actions, simulates counterfactuals, maps cascading risk, and executes resilient recovery.
          </p>
        </div>

        {/* Demo Playback Controller */}
        <div className="flex items-center gap-2 bg-slate-950/90 p-2.5 rounded-lg border border-amber-800/80 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-emerald-600 text-slate-950 hover:bg-emerald-500'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> PAUSE WALKTHROUGH
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> AUTO-PLAY WALKTHROUGH
              </>
            )}
          </button>

          <button
            onClick={handleResetDemo}
            title="Reset Demo to Step 1"
            className="p-1.5 rounded text-slate-400 hover:text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* STEP PROGRESS BAR CONTROLLER (STEPS 1 - 10) */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-bold uppercase flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            SELECT DEMO STEP ({currentStep} OF 10)
          </span>
          <span className="text-amber-400 font-bold">
            {currentStep === 10 ? 'FINAL STEP' : `NEXT: STEP ${currentStep + 1}`}
          </span>
        </div>

        {/* 10 Step Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5">
          {stepsMeta.map((s) => {
            const isActive = currentStep === s.step;
            const isPassed = currentStep > s.step;
            return (
              <button
                key={s.step}
                onClick={() => handleStepClick(s.step)}
                className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-950 to-slate-950 border-amber-400 text-amber-300 ring-2 ring-amber-500 shadow-lg'
                    : isPassed
                    ? 'bg-slate-950/80 border-emerald-800/80 text-emerald-400 hover:border-emerald-600'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-black font-mono">STEP {s.step}</span>
                <div className="text-[9px] font-bold truncate max-w-full font-sans">
                  {s.title.split('. ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Navigation Prev / Next Buttons */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs">
          <button
            onClick={() => handleStepClick(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-3 py-1 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40 rounded border border-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Step
          </button>

          <span className="text-slate-300 font-bold">
            STEP {currentStep}: <strong className="text-amber-400">{currentMeta.title}</strong>
          </span>

          <button
            onClick={() => handleStepClick(Math.min(10, currentStep + 1))}
            disabled={currentStep === 10}
            className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-slate-950 font-extrabold hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 rounded flex items-center gap-1 cursor-pointer shadow"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* STEP NARRATION BANNER */}
      <div className="bg-[#0e1424] border-2 border-indigo-500/80 rounded-xl p-5 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <currentMeta.icon className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
              {currentMeta.title} — {currentMeta.subtitle}
            </h3>
          </div>
          <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded border ${currentMeta.badgeColor}`}>
            {currentMeta.badge}
          </span>
        </div>

        <blockquote className="text-sm sm:text-base font-bold text-slate-100 italic border-l-4 border-amber-400 pl-4 py-1 font-sans leading-relaxed">
          &quot;{currentMeta.narration}&quot;
        </blockquote>
      </div>

      {/* CORE METRICS DASHBOARD (UPDATED BY STEP STATE) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1 shadow">
          <span className="text-slate-400 text-[10px] uppercase block">System Health</span>
          <div className="flex items-baseline justify-between">
            <strong className={`text-xl font-extrabold ${healthValue > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {healthValue}%
            </strong>
            <span className="text-[10px] text-slate-500">Target &gt;90%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full ${healthValue > 70 ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${healthValue}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1 shadow">
          <span className="text-slate-400 text-[10px] uppercase block">Data Trust Score</span>
          <div className="flex items-baseline justify-between">
            <strong className={`text-xl font-extrabold ${dataTrustValue > 70 ? 'text-cyan-300' : 'text-rose-400'}`}>
              {dataTrustValue}%
            </strong>
            <span className="text-[10px] text-slate-500">Sensor Quorum</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full ${dataTrustValue > 70 ? 'bg-cyan-400' : 'bg-rose-400'}`}
              style={{ width: `${dataTrustValue}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1 shadow">
          <span className="text-slate-400 text-[10px] uppercase block">Reality Confidence</span>
          <div className="flex items-baseline justify-between">
            <strong className={`text-xl font-extrabold ${realityConfidenceValue > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {realityConfidenceValue}%
            </strong>
            <span className="text-[10px] text-slate-500">Alignment</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full ${realityConfidenceValue > 70 ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${realityConfidenceValue}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-[#0e1424] rounded-xl border border-slate-800 space-y-1 shadow">
          <span className="text-slate-400 text-[10px] uppercase block">Resilience Index</span>
          <div className="flex items-baseline justify-between">
            <strong className={`text-xl font-extrabold ${resilienceValue > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {resilienceValue}%
            </strong>
            <span className="text-[10px] text-slate-500">8-Domain</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full ${resilienceValue > 70 ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${resilienceValue}%` }}
            />
          </div>
        </div>
      </div>

      {/* STEP-SPECIFIC WORKSPACE INTERACTIVE CONTENT */}
      <div className="space-y-6">
        {/* STEP 1: HEALTHY STATE */}
        {currentStep === 1 && (
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                STEP 1: HEALTHY BENCHMARK STATE
              </h3>
              <span className="text-xs text-emerald-400 font-bold">12/12 Telemetry Streams Aligned</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px]">Winding Temperature:</span>
                <strong className="text-emerald-400 font-mono block text-sm">68.4°C (Nominal)</strong>
                <p className="text-[11px] text-slate-400">Normal operating thermal envelope within 30°C–75°C safety margin.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px]">Cross-Sensor Agreement:</span>
                <strong className="text-cyan-300 font-mono block text-sm">98.2% Consensus</strong>
                <p className="text-[11px] text-slate-400">All temperature, vibration, and acoustic transducers correlate perfectly.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px]">Cryptographic Provenance:</span>
                <strong className="text-emerald-400 font-mono block text-sm">HSM Root Verified</strong>
                <p className="text-[11px] text-slate-400">Substation Hardware Security Module signatures validated.</p>
              </div>
            </div>

            <button
              onClick={() => handleStepClick(2)}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>TRIGGER STEP 2: INJECT SENSOR ANOMALY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: INJECT SENSOR ANOMALY */}
        {currentStep === 2 && (
          <div className="bg-[#0e1424] border-2 border-amber-500/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400 animate-pulse" />
                STEP 2: SENSOR DISAGREEMENT DETECTED
              </h3>
              <span className="text-xs text-rose-400 font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                Data Trust Dropped to 38%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded border border-rose-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Sensor A (Winding Temp A):</span>
                <strong className="text-amber-400 text-sm block">82°C (ELEVATED)</strong>
                <span className="text-[10px] text-slate-400 font-sans">Primary thermal probe</span>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-rose-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Sensor B (Acoustic & Vibration B):</span>
                <strong className="text-rose-400 text-sm block">43°C (DISAGREEMENT)</strong>
                <span className="text-[10px] text-slate-400 font-sans">Sudden drift / unverified payload</span>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-rose-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Sensor C (Optical Fiber RTD C):</span>
                <strong className="text-amber-400 text-sm block">80°C (ELEVATED)</strong>
                <span className="text-[10px] text-slate-400 font-sans">Direct fiber core sensor</span>
              </div>
            </div>

            <div className="p-3 bg-amber-950/60 rounded-lg border border-amber-800 text-amber-300 font-sans text-xs space-y-1">
              <strong>Trust Twin Assessment:</strong>
              <p>
                Severe cross-sensor correlation conflict detected between Sensor A/C (80°C–82°C) and Sensor B (43°C). Reality Confidence dropped to 32% due to payload ambiguity.
              </p>
            </div>

            <button
              onClick={() => handleStepClick(3)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>PROCEED TO STEP 3: INSPECT AI REFUSAL MOMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: AI DOES NOT BLINDLY ACT */}
        {currentStep === 3 && (
          <div className="bg-[#0e1424] border-2 border-indigo-500/90 rounded-xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-400 animate-pulse" />
                STEP 3: KEY INNOVATION MOMENT — AI AUTONOMOUS REFUSAL
              </h3>
              <span className="text-xs text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-700 font-bold">
                HOLD ACTION MEMBRANE
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border-2 border-amber-500/80 space-y-2 text-xs font-sans">
              <div className="text-sm font-black text-amber-400 font-mono flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                REFUSAL DIRECTIVE EXECUTED:
              </div>
              <blockquote className="text-slate-100 font-bold text-sm leading-relaxed italic bg-slate-900 p-3 rounded border border-slate-800">
                &quot;System health may be deteriorating, but confidence in telemetry is insufficient for a high-impact intervention.&quot;
              </blockquote>
              <p className="text-slate-300 leading-normal">
                Traditional AI systems trigger false automated tripping on bad data, leading to costly unneeded grid blackouts. BharatSynapse explicitly gates autonomous actuators behind the Telemetry Trust Quorum (Minimum 80% Trust required).
              </p>
            </div>

            <button
              onClick={() => handleStepClick(4)}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>PROCEED TO STEP 4: VERIFY REALITY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 4: VERIFY REALITY */}
        {currentStep === 4 && (
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                STEP 4: CROSS-CORRELATION & REALITY VERIFICATION
              </h3>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Trust Restored to 96%
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-cyan-800 space-y-2 text-xs font-sans">
              <span className="font-mono text-cyan-300 font-bold text-xs block">
                CORRELATED SENSORY EVIDENCE ANALYSIS:
              </span>
              <ul className="space-y-1.5 text-slate-200 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Optical Fiber RTD Probe C confirms true winding temperature at 81.2°C.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Primary HV Current Draw (84.2A) correlates with 81°C thermal dissipate.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Sensor B identified as faulty transducer payload (analog ADC drift). Isolated.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleStepClick(5)}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>PROCEED TO STEP 5: SIMULATE REAL COOLING FAILURE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 5: INJECT REAL FAILURE */}
        {currentStep === 5 && (
          <div className="bg-[#0e1424] border-2 border-rose-500/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400 animate-bounce" />
                STEP 5: CONFIRMED PHYSICAL COOLING FAILURE
              </h3>
              <span className="text-xs text-rose-400 font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                Failure Probability: 88%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px]">Physical Status:</span>
                <strong className="text-rose-400 font-mono block text-sm">System Health: 42% (Warning)</strong>
                <p className="text-slate-300">Coolant circulation pump trippped. Winding temp spiking at +1.8°C/min.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px]">Reality Alignment:</span>
                <strong className="text-emerald-400 font-mono block text-sm">Reality Confidence: 94% (HIGH)</strong>
                <p className="text-slate-300">Telemetry trust is HIGH (96%). The AI knows with 94% certainty that failure is real.</p>
              </div>
            </div>

            <button
              onClick={() => handleStepClick(6)}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>PROCEED TO STEP 6: COUNTERFACTUAL SIMULATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 6: COUNTERFACTUAL ENGINE */}
        {currentStep === 6 && (
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                STEP 6: COUNTERFACTUAL COMPARISON (&quot;WHAT IF LOAD +20%?&quot;)
              </h3>
              <span className="text-xs text-amber-300 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Sandbox Simulation
              </span>
            </div>

            {/* Side by side comparison table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* CURRENT REALITY */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-300 uppercase block border-b border-slate-800 pb-1">
                  1. CURRENT REALITY
                </span>
                <div className="space-y-1.5 text-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">System Risk:</span>
                    <strong className="text-amber-400">High (68%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">System Health:</span>
                    <strong className="text-amber-300">42%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Failure Probability:</span>
                    <strong className="text-rose-400">88% (in 2h 15m)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resilience Index:</span>
                    <strong className="text-amber-300">58%</strong>
                  </div>
                </div>
              </div>

              {/* COUNTERFACTUAL LOAD +20% */}
              <div className="p-4 bg-slate-950 rounded-xl border-2 border-amber-500/80 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase block border-b border-slate-800 pb-1 flex items-center justify-between">
                  <span>2. COUNTERFACTUAL (LOAD +20%)</span>
                  <span className="text-[10px] text-rose-400 bg-rose-950 px-1.5 py-0.2 rounded border border-rose-800">
                    CRITICAL RUNAWAY
                  </span>
                </span>
                <div className="space-y-1.5 text-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">System Risk:</span>
                    <strong className="text-rose-400 font-extrabold">Critical (96%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">System Health:</span>
                    <strong className="text-rose-400 font-extrabold">14%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Failure Probability:</span>
                    <strong className="text-rose-400 font-extrabold">99% (in 18m)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resilience Index:</span>
                    <strong className="text-rose-400 font-extrabold">21%</strong>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStepClick(7)}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>PROCEED TO STEP 7: SIMULATE CASCADE PATH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 7: CASCADE ENGINE */}
        {currentStep === 7 && (
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <Workflow className="w-5 h-5 text-purple-400" />
                STEP 7: CASCADE PROPAGATION MAP
              </h3>
              <span className="text-xs text-purple-300 font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                Multi-Domain Risk
              </span>
            </div>

            {/* Cascade Flow Chain */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded border border-rose-800 text-center w-full">
                <span className="text-rose-400 font-bold block">1. Transformer</span>
                <span className="text-[10px] text-slate-400">Thermal Overload</span>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400 shrink-0 rotate-90 md:rotate-0" />

              <div className="p-3 bg-slate-900 rounded border border-amber-800 text-center w-full">
                <span className="text-amber-400 font-bold block">2. Cooling</span>
                <span className="text-[10px] text-slate-400">Vapor Lock</span>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400 shrink-0 rotate-90 md:rotate-0" />

              <div className="p-3 bg-slate-900 rounded border border-amber-800 text-center w-full">
                <span className="text-amber-400 font-bold block">3. Control</span>
                <span className="text-[10px] text-slate-400">Buffer Overflow</span>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400 shrink-0 rotate-90 md:rotate-0" />

              <div className="p-3 bg-slate-900 rounded border border-indigo-800 text-center w-full">
                <span className="text-indigo-300 font-bold block">4. Telecom</span>
                <span className="text-[10px] text-slate-400">Fiber Mux Power Drop</span>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400 shrink-0 rotate-90 md:rotate-0" />

              <div className="p-3 bg-slate-900 rounded border border-rose-800 text-center w-full">
                <span className="text-rose-400 font-bold block">5. System Risk</span>
                <span className="text-[10px] text-slate-400">Regional Blackout</span>
              </div>
            </div>

            <button
              onClick={() => handleStepClick(8)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>PROCEED TO STEP 8: EVALUATE RECOVERY OPTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 8: RECOVERY OPTIONS */}
        {currentStep === 8 && (
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-cyan-400" />
                STEP 8: RECOVERY STRATEGY SELECTION
              </h3>
              <span className="text-xs text-emerald-400 font-bold">Multi-Criteria Optimization</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              {/* OPTION A */}
              <button
                onClick={() => setSelectedRecoveryOption('A')}
                className={`p-4 rounded-xl border text-left space-y-2 cursor-pointer transition-all ${
                  selectedRecoveryOption === 'A'
                    ? 'bg-indigo-950 border-indigo-500 ring-1 ring-indigo-500'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300">OPTION A</span>
                  <span className="text-[10px] text-slate-400">Reduce Load (-30%)</span>
                </div>
                <div className="space-y-1 text-slate-300 font-sans text-[11px]">
                  <div>Risk: <strong className="text-amber-400 font-mono">32%</strong></div>
                  <div>Recovery Time: <strong className="text-cyan-300 font-mono">25 mins</strong></div>
                  <div>Resilience Score: <strong className="text-emerald-400 font-mono">78%</strong></div>
                </div>
              </button>

              {/* OPTION B (RECOMMENDED) */}
              <button
                onClick={() => setSelectedRecoveryOption('B')}
                className={`p-4 rounded-xl border text-left space-y-2 cursor-pointer transition-all ${
                  selectedRecoveryOption === 'B'
                    ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> OPTION B (RECOMMENDED)
                  </span>
                  <span className="text-[10px] text-amber-300 font-bold bg-amber-950 px-1.5 py-0.2 rounded border border-amber-800">
                    BEST SLA
                  </span>
                </div>
                <div className="space-y-1 text-slate-200 font-sans text-[11px]">
                  <div>Activate Redundant Auxiliary Cooling N+1</div>
                  <div>Risk: <strong className="text-emerald-400 font-mono">12%</strong></div>
                  <div>Recovery Time: <strong className="text-emerald-400 font-mono">12 mins</strong></div>
                  <div>Resilience Score: <strong className="text-emerald-400 font-mono">94%</strong></div>
                </div>
              </button>

              {/* OPTION C */}
              <button
                onClick={() => setSelectedRecoveryOption('C')}
                className={`p-4 rounded-xl border text-left space-y-2 cursor-pointer transition-all ${
                  selectedRecoveryOption === 'C'
                    ? 'bg-rose-950 border-rose-500 ring-1 ring-rose-500'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400">OPTION C</span>
                  <span className="text-[10px] text-slate-400">Continue Operation (Status Quo)</span>
                </div>
                <div className="space-y-1 text-slate-300 font-sans text-[11px]">
                  <div>Risk: <strong className="text-rose-400 font-mono">96%</strong></div>
                  <div>Recovery Time: <strong className="text-rose-400 font-mono">&gt;180 mins</strong></div>
                  <div>Resilience Score: <strong className="text-rose-400 font-mono">14%</strong></div>
                </div>
              </button>
            </div>

            <button
              onClick={() => handleStepClick(9)}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>RUN SIMULATED RECOVERY (OPTION B)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 9: SIMULATED RECOVERY */}
        {currentStep === 9 && (
          <div className="bg-[#0e1424] border-2 border-emerald-500/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                STEP 9: RECOVERY EXECUTED SUCCESSFULLY
              </h3>
              <span className="text-xs text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Grid Restored to High Resilience
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Winding Temperature:</span>
                <strong className="text-emerald-400 text-base block">48.2°C (STABLE)</strong>
                <span className="text-[10px] text-slate-400 font-sans">-34°C Thermal dissipation drop</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-800 space-y-1">
                <span className="text-slate-400 text-[10px]">System Risk:</span>
                <strong className="text-emerald-400 text-base block">12% (LOW)</strong>
                <span className="text-[10px] text-slate-400 font-sans">-76% Risk reduction</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Resilience Index:</span>
                <strong className="text-emerald-400 text-base block">94% (OPTIMAL)</strong>
                <span className="text-[10px] text-slate-400 font-sans">Full SLA compliance restored</span>
              </div>
            </div>

            <button
              onClick={() => handleStepClick(10)}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>PROCEED TO STEP 10: BHARATSYNAPSE DECISION MESSAGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 10: BHARATSYNAPSE DECISION */}
        {currentStep === 10 && (
          <div className="bg-gradient-to-br from-amber-950 via-[#0e1424] to-indigo-950 border-2 border-amber-400 rounded-xl p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-amber-500/40 pb-3">
              <div className="flex items-center gap-2.5">
                <Award className="w-7 h-7 text-amber-400 animate-pulse" />
                <h3 className="text-lg sm:text-xl font-black text-amber-400 tracking-wider">
                  BHARATSYNAPSE DECISION
                </h3>
              </div>
              <span className="text-xs font-extrabold text-amber-300 bg-amber-950 px-3 py-1 rounded border border-amber-700">
                CORE INNOVATION VERIFIED
              </span>
            </div>

            {/* MANDATORY EXACT QUOTE */}
            <div className="p-5 bg-slate-950/90 rounded-xl border-2 border-amber-500/80 shadow-2xl">
              <blockquote className="text-base sm:text-lg font-extrabold text-slate-100 italic border-l-4 border-amber-400 pl-4 py-2 font-sans leading-relaxed">
                &quot;We did not simply predict the failure. We first established whether our view of reality could be trusted, simulated possible futures, evaluated cascading consequences, and selected the most resilient response.&quot;
              </blockquote>
            </div>

            {/* SUMMARY CHECKLIST OF INNOVATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 font-mono block">1. Telemetry Trust Verification</strong>
                  <span className="text-slate-300 text-[11px]">
                    Cryptographic HMAC signatures and 12-sensor consensus quorum prevent AI hallucination and false tripping.
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 font-mono block">2. Autonomous Refusal Membrane</strong>
                  <span className="text-slate-300 text-[11px]">
                    Explicit safety hold gates high-impact interventions when data trust is compromised.
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 font-mono block">3. Counterfactual & Cascade Physics</strong>
                  <span className="text-slate-300 text-[11px]">
                    Simulates alternative load realities and maps multi-tier cross-domain failure propagation paths.
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 font-mono block">4. Multi-Criteria Resilient Recovery</strong>
                  <span className="text-slate-300 text-[11px]">
                    Ranks strategies by Risk Reduction %, SLA latency, and 8-domain resilience metrics.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-amber-500/30">
              <span className="text-xs text-slate-400 font-mono">
                Judge Demo Complete • All 10 Steps Verified
              </span>

              <button
                onClick={handleResetDemo}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
              >
                <RotateCcw className="w-4 h-4" /> RESTART JUDGE DEMO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
