import React, { useState, useEffect } from 'react';
import { useSystem } from '../../context/SystemContext';
import { CounterfactualEngine } from '../../services/counterfactualEngine';
import {
  CounterfactualControls,
  RealityStateMetrics,
  SavedCounterfactualScenario
} from '../../types';
import {
  Sparkles,
  Play,
  RotateCcw,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Gauge,
  Clock,
  ShieldCheck,
  Zap,
  Sliders,
  Layers,
  Info,
  Radio,
  ArrowRight,
  Bookmark,
  Building2,
  Server,
  RefreshCw,
  TrendingUp,
  ChevronDown
} from 'lucide-react';

export const CounterfactualEngineView: React.FC = () => {
  const {
    assets,
    selectedAsset,
    selectedAssetId,
    selectAsset,
    savedCounterfactualScenarios,
    saveCounterfactualScenario,
    deleteCounterfactualScenario
  } = useSystem();

  // 1. Controls State initialized from currently selected asset
  const [controls, setControls] = useState<CounterfactualControls>(() =>
    CounterfactualEngine.getInitialControls(selectedAsset)
  );

  // 2. State for Simulation
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationPhase, setSimulationPhase] = useState<string>('');
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [scenarioTitle, setScenarioTitle] = useState<string>('');
  const [scenarioDescription, setScenarioDescription] = useState<string>('');

  // Synchronize controls when user selects a different asset
  useEffect(() => {
    setControls(CounterfactualEngine.getInitialControls(selectedAsset));
  }, [selectedAssetId]);

  // 3. Mathematical Evaluation (Deterministic, Pure, Non-mutating)
  const currentReality: RealityStateMetrics = CounterfactualEngine.calculateCurrentReality(selectedAsset);
  
  const { counterfactualReality, recoveryReality } = CounterfactualEngine.simulateCounterfactual(
    selectedAsset,
    controls
  );

  // Handle Run Counterfactual Animation
  const handleRunCounterfactual = () => {
    setIsSimulating(true);
    setSimulationPhase('Sampling baseline reality & telemetry vectors...');

    setTimeout(() => {
      setSimulationPhase('Propagating thermal-hydraulic & electromagnetic stress curves...');
    }, 350);

    setTimeout(() => {
      setSimulationPhase('Synthesizing Counterfactual Future & Failsafe Recovery States...');
    }, 700);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationPhase('');
    }, 1100);
  };

  // Handle Reset to Reality Baseline
  const handleReset = () => {
    setControls(CounterfactualEngine.getInitialControls(selectedAsset));
  };

  // Handle Quick Presets
  const applyPreset = (presetName: string) => {
    const base = CounterfactualEngine.getInitialControls(selectedAsset);
    switch (presetName) {
      case 'SURGE':
        setControls({ ...base, load: 108, temperature: 94, coolingEfficiency: 35, redundancy: 0 });
        break;
      case 'SPOOF':
        setControls({ ...base, networkLatency: 78, sensorReliability: 30, redundancy: 1 });
        break;
      case 'PRESSURE_LEAK':
        setControls({ ...base, pressure: 1.8, temperature: 86, coolingEfficiency: 45 });
        break;
      case 'FAILSAFE_TEST':
        setControls({ ...base, load: 115, redundancy: 3, recoveryLatency: 15 });
        break;
      default:
        break;
    }
  };

  // Handle Save Scenario
  const handleSaveScenario = () => {
    if (!scenarioTitle.trim()) return;

    const newScenario: SavedCounterfactualScenario = {
      id: `scen-${Date.now()}`,
      title: scenarioTitle.trim(),
      description: scenarioDescription.trim() || `Custom counterfactual for ${selectedAsset.name}`,
      createdAt: new Date().toLocaleTimeString(),
      assetId: selectedAsset.id,
      assetName: selectedAsset.name,
      controls: { ...controls },
      currentReality,
      counterfactualReality,
      recoveryReality
    };

    saveCounterfactualScenario(newScenario);
    setSaveModalOpen(false);
    setScenarioTitle('');
    setScenarioDescription('');
  };

  // Helper for risk pill styles
  const getRiskBadge = (risk: RealityStateMetrics['riskLevel']) => {
    switch (risk) {
      case 'Critical':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-950/90 text-red-300 border border-red-800 flex items-center gap-1 animate-pulse"><AlertTriangle className="w-3 h-3" /> CRITICAL</span>;
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
      {/* HEADER & ASSET SELECTOR */}
      <div className="bg-gradient-to-r from-cyan-950 via-[#0e1424] to-indigo-950 p-5 rounded-xl border border-cyan-800/80 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
              COUNTERFACTUAL INFRASTRUCTURE ENGINE™
            </h2>
            <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-700">
              "WHAT-IF?" ALTERNATIVE FUTURES
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 font-sans max-w-2xl">
            Simulate alternative possible futures without altering current live reality. Interactively adjust stress variables and observe side-by-side deterministic state projections.
          </p>
        </div>

        {/* Asset Selector Dropdown */}
        <div className="flex items-center gap-2 bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 shrink-0 w-full lg:w-auto">
          <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs text-slate-400 font-bold uppercase">Target Asset:</span>
          <select
            value={selectedAssetId}
            onChange={(e) => selectAsset(e.target.value)}
            className="bg-slate-900 text-cyan-300 font-bold text-xs px-2.5 py-1.5 rounded border border-slate-700 focus:outline-none focus:border-cyan-500 cursor-pointer w-full lg:w-auto"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}: {a.name} ({a.domain})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* QUICK PRESETS BANNER */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Sliders className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="font-bold text-slate-200">QUICK SCENARIO PRESETS:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('SURGE')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-800/80 transition text-[11px] font-bold"
          >
            🔥 Monsoon Thermal Overload
          </button>
          <button
            onClick={() => applyPreset('SPOOF')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/80 transition text-[11px] font-bold"
          >
            ⚡ SCADA Latency Attack
          </button>
          <button
            onClick={() => applyPreset('PRESSURE_LEAK')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-red-300 border border-red-800/80 transition text-[11px] font-bold"
          >
            ⚠️ SF6 Gas Pressure Leak
          </button>
          <button
            onClick={() => applyPreset('FAILSAFE_TEST')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-800/80 transition text-[11px] font-bold"
          >
            🛡️ Redundant N+3 Failsafe
          </button>
        </div>
      </div>

      {/* THE 9 CONTROLS PANEL */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              COUNTERFACTUAL CONTROLS (9 PARAMETERS)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-sans">
            Isolated Sandbox Environment — Live current state remains unaffected
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Load */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">1. Operating Load</span>
              <span className="font-bold text-amber-300">{controls.load}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="1"
              value={controls.load}
              onChange={(e) => setControls({ ...controls, load: Number(e.target.value) })}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>10% (Idle)</span>
              <span>Baseline: {Math.round(selectedAsset.physicalTwin.load)}%</span>
              <span>120% (Overload)</span>
            </div>
          </div>

          {/* 2. Temperature */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">2. Thermal Winding Temp</span>
              <span className="font-bold text-red-400">{controls.temperature} °C</span>
            </div>
            <input
              type="range"
              min="20"
              max="120"
              step="1"
              value={controls.temperature}
              onChange={(e) => setControls({ ...controls, temperature: Number(e.target.value) })}
              className="w-full accent-red-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>20°C (Nominal)</span>
              <span>Baseline: {Math.round(selectedAsset.physicalTwin.temperature)}°C</span>
              <span>120°C (Critical)</span>
            </div>
          </div>

          {/* 3. Pressure */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">3. SF6 / Oil Pressure</span>
              <span className="font-bold text-cyan-300">{controls.pressure} bar</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.1"
              value={controls.pressure}
              onChange={(e) => setControls({ ...controls, pressure: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1.0 bar (Leak)</span>
              <span>Baseline: 4.2 bar</span>
              <span>8.0 bar (Overpressure)</span>
            </div>
          </div>

          {/* 4. Voltage */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">4. HV Busbar Voltage</span>
              <span className="font-bold text-indigo-300">{controls.voltage} kV</span>
            </div>
            <input
              type="range"
              min="600"
              max="900"
              step="5"
              value={controls.voltage}
              onChange={(e) => setControls({ ...controls, voltage: Number(e.target.value) })}
              className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>600 kV (Sag)</span>
              <span>Baseline: 760 kV</span>
              <span>900 kV (Swell)</span>
            </div>
          </div>

          {/* 5. Cooling Efficiency */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">5. Cooling Efficiency</span>
              <span className="font-bold text-emerald-400">{controls.coolingEfficiency}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={controls.coolingEfficiency}
              onChange={(e) => setControls({ ...controls, coolingEfficiency: Number(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (Radiator Fail)</span>
              <span>Baseline: 85%</span>
              <span>100% (Optimal)</span>
            </div>
          </div>

          {/* 6. Network Latency */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">6. SCADA Link Latency</span>
              <span className="font-bold text-purple-300">{controls.networkLatency} ms</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={controls.networkLatency}
              onChange={(e) => setControls({ ...controls, networkLatency: Number(e.target.value) })}
              className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 ms (Ultra Fiber)</span>
              <span>Baseline: 4.0 ms</span>
              <span>100 ms (Jammed)</span>
            </div>
          </div>

          {/* 7. Sensor Reliability */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">7. Sensor Reliability</span>
              <span className="font-bold text-cyan-400">{controls.sensorReliability}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={controls.sensorReliability}
              onChange={(e) => setControls({ ...controls, sensorReliability: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>10% (Drifting/Spoofed)</span>
              <span>Baseline: {Math.round(selectedAsset.trustTwin.sensorTrust)}%</span>
              <span>100% (Cryptographic)</span>
            </div>
          </div>

          {/* 8. Redundancy Level */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">8. Redundancy Level</span>
              <span className="font-bold text-indigo-300">N+{controls.redundancy}</span>
            </div>
            <div className="grid grid-cols-4 gap-1 pt-0.5">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setControls({ ...controls, redundancy: num })}
                  className={`py-1 rounded text-xs font-bold transition border ${
                    controls.redundancy === num
                      ? 'bg-indigo-950 text-indigo-300 border-indigo-600'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  N+{num}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 text-center">
              {controls.redundancy === 0 ? 'Single Point of Failure' : `${controls.redundancy} Backup Channels`}
            </div>
          </div>

          {/* 9. Recovery Latency */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">9. Recovery Response Latency</span>
              <span className="font-bold text-amber-400">{controls.recoveryLatency} min</span>
            </div>
            <input
              type="range"
              min="5"
              max="240"
              step="5"
              value={controls.recoveryLatency}
              onChange={(e) => setControls({ ...controls, recoveryLatency: Number(e.target.value) })}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>5 min (Auto Failsafe)</span>
              <span>Baseline: 30 min</span>
              <span>240 min (Manual Dispatch)</span>
            </div>
          </div>
        </div>

        {/* FLAGSHIP ACTION BUTTONS BAR */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" /> RESET TO BASELINE
            </button>

            {/* Save Scenario Button */}
            <button
              onClick={() => setSaveModalOpen(true)}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/80 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4 text-cyan-400" /> SAVE SCENARIO
            </button>
          </div>

          {/* FLAGSHIP RUN COUNTERFACTUAL BUTTON */}
          <button
            onClick={handleRunCounterfactual}
            disabled={isSimulating}
            className={`px-6 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-2 shadow-lg transition-all ${
              isSimulating
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-700 cursor-not-allowed animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 shadow-cyan-500/20 active:scale-98'
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-cyan-300" />
                <span>SIMULATING ALTERNATIVE FUTURE...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>RUN COUNTERFACTUAL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ANIMATED SIMULATION PROGRESS BANNER */}
      {isSimulating && (
        <div className="p-4 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/80 rounded-xl space-y-2 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin text-cyan-400" />
              {simulationPhase}
            </span>
            <span className="animate-pulse">PROCESSING...</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-cyan-800">
            <div className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 h-2 rounded-full animate-pulse w-full" />
          </div>
        </div>
      )}

      {/* THREE STATES SIDE-BY-SIDE VISUALISATION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">
              THREE STATES COMPARISON MATRIX
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-sans">
            CURRENT REALITY vs COUNTERFACTUAL REALITY vs RECOVERY REALITY
          </span>
        </div>

        {/* 3-COLUMN SIDE-BY-SIDE COMPARISON CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* STATE 1: CURRENT REALITY */}
          <div className="bg-[#0e1424] border-2 border-emerald-600/60 rounded-xl p-5 space-y-4 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    STATE 1 / 3
                  </span>
                  <h4 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    CURRENT REALITY
                  </h4>
                </div>
                {getRiskBadge(currentReality.riskLevel)}
              </div>

              <p className="text-xs text-slate-400 font-sans leading-normal">
                Live benchmark telemetry from <strong className="text-cyan-300">{selectedAsset.code}</strong>.
              </p>

              {/* Metrics Grid */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Health</span>
                  <span className="font-bold text-emerald-400 text-sm">{currentReality.health}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Data Trust</span>
                  <span className="font-bold text-cyan-300 text-sm">{currentReality.trust}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Reality Confidence</span>
                  <span className="font-bold text-cyan-400 text-sm">{currentReality.realityConfidence}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Failure Probability</span>
                  <span className={`font-bold text-sm ${currentReality.failureProbability > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {currentReality.failureProbability}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Resilience Index</span>
                  <span className="font-bold text-indigo-300 text-sm">{currentReality.resilience}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Recovery Time</span>
                  <span className="font-bold text-amber-300 text-sm">{currentReality.recoveryTimeMinutes} mins</span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Affected Assets</span>
                    <span className="font-bold text-slate-200">{currentReality.affectedAssetsCount} Asset</span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-sans truncate">
                    {currentReality.affectedAssetsList.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 font-mono text-center border-t border-slate-800">
              OPERATING LOAD: {currentReality.loadPercent}%
            </div>
          </div>

          {/* STATE 2: COUNTERFACTUAL REALITY */}
          <div className="bg-[#0e1424] border-2 border-amber-500/80 rounded-xl p-5 space-y-4 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    STATE 2 / 3
                  </span>
                  <h4 className="text-base font-extrabold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    COUNTERFACTUAL REALITY
                  </h4>
                </div>
                {getRiskBadge(counterfactualReality.riskLevel)}
              </div>

              <p className="text-xs text-slate-400 font-sans leading-normal">
                Simulated future under <strong className="text-amber-300">{controls.load}% Load</strong>, <strong className="text-red-400">{controls.temperature}°C Temp</strong>, and <strong className="text-indigo-300">N+{controls.redundancy} Redundancy</strong>.
              </p>

              {/* Metrics Grid */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Health</span>
                  <span className={`font-bold text-sm ${counterfactualReality.health < 50 ? 'text-red-400' : 'text-amber-300'}`}>
                    {counterfactualReality.health}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Data Trust</span>
                  <span className="font-bold text-cyan-300 text-sm">{counterfactualReality.trust}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Reality Confidence</span>
                  <span className="font-bold text-cyan-400 text-sm">{counterfactualReality.realityConfidence}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Failure Probability</span>
                  <span className={`font-bold text-sm ${counterfactualReality.failureProbability > 65 ? 'text-red-400 font-extrabold animate-pulse' : 'text-amber-300'}`}>
                    {counterfactualReality.failureProbability}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Resilience Index</span>
                  <span className="font-bold text-indigo-300 text-sm">{counterfactualReality.resilience}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Recovery Time</span>
                  <span className="font-bold text-amber-300 text-sm">{counterfactualReality.recoveryTimeMinutes} mins</span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Affected Assets</span>
                    <span className="font-bold text-amber-300">{counterfactualReality.affectedAssetsCount} Assets</span>
                  </div>
                  <div className="text-[11px] text-amber-300/90 font-sans leading-tight">
                    {counterfactualReality.affectedAssetsList.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-amber-400 font-mono text-center border-t border-slate-800">
              SIMULATED LOAD: {counterfactualReality.loadPercent}%
            </div>
          </div>

          {/* STATE 3: RECOVERY REALITY */}
          <div className="bg-[#0e1424] border-2 border-indigo-600/70 rounded-xl p-5 space-y-4 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                    STATE 3 / 3
                  </span>
                  <h4 className="text-base font-extrabold text-indigo-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    RECOVERY REALITY
                  </h4>
                </div>
                {getRiskBadge(recoveryReality.riskLevel)}
              </div>

              <p className="text-xs text-slate-400 font-sans leading-normal">
                Remediated state following active load shed, emergency cooling, & automated failsafe engagement.
              </p>

              {/* Metrics Grid */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Health</span>
                  <span className="font-bold text-emerald-400 text-sm">{recoveryReality.health}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Data Trust</span>
                  <span className="font-bold text-cyan-300 text-sm">{recoveryReality.trust}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Reality Confidence</span>
                  <span className="font-bold text-cyan-400 text-sm">{recoveryReality.realityConfidence}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Failure Probability</span>
                  <span className="font-bold text-emerald-400 text-sm">{recoveryReality.failureProbability}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Resilience Index</span>
                  <span className="font-bold text-indigo-300 text-sm">{recoveryReality.resilience}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400">Recovery Time</span>
                  <span className="font-bold text-emerald-400 text-sm">{recoveryReality.recoveryTimeMinutes} mins</span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Affected Assets</span>
                    <span className="font-bold text-slate-200">{recoveryReality.affectedAssetsCount} Asset</span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-sans truncate">
                    {recoveryReality.affectedAssetsList.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-indigo-300 font-mono text-center border-t border-slate-800">
              REMEDIATED LOAD: {recoveryReality.loadPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* DELTA SUMMARY BANNER (EXACT USER PROMPT SPECIFICATION) */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-3">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" /> THREE-STATE DELTA HIGHLIGHTS
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Load Comparison */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">1. Operating Load</span>
            <div className="flex items-center justify-between font-bold pt-1">
              <span className="text-emerald-400">Current: {currentReality.loadPercent}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-amber-400">CF: {counterfactualReality.loadPercent}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-indigo-300">Rec: {recoveryReality.loadPercent}%</span>
            </div>
          </div>

          {/* Failure Probability / Risk */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">2. Failure Risk</span>
            <div className="flex items-center justify-between font-bold pt-1">
              <span className="text-emerald-400">Current: {currentReality.failureProbability}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-red-400 font-extrabold">CF: {counterfactualReality.failureProbability}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-emerald-400">Rec: {recoveryReality.failureProbability}%</span>
            </div>
          </div>

          {/* Health Index */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">3. Health Index</span>
            <div className="flex items-center justify-between font-bold pt-1">
              <span className="text-emerald-400">Current: {currentReality.health}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-amber-400">CF: {counterfactualReality.health}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-emerald-400">Rec: {recoveryReality.health}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SAVED SCENARIOS DRAWER / LIST */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              SAVED COUNTERFACTUAL SCENARIOS ({savedCounterfactualScenarios.length})
            </h3>
          </div>
        </div>

        {savedCounterfactualScenarios.length === 0 ? (
          <div className="p-6 text-center bg-slate-950/60 rounded-lg border border-slate-800 text-slate-400 text-xs font-sans">
            No saved scenarios yet. Use the <strong className="text-cyan-300">"SAVE SCENARIO"</strong> button above to save custom counterfactual parameters for future recall.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedCounterfactualScenarios.map((scen) => (
              <div key={scen.id} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400">{scen.assetName}</span>
                    <button
                      onClick={() => deleteCounterfactualScenario(scen.id)}
                      className="text-slate-500 hover:text-red-400 transition"
                      title="Delete Scenario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h5 className="text-xs font-bold text-slate-200 mt-0.5">{scen.title}</h5>
                  <p className="text-[11px] text-slate-400 font-sans mt-1 line-clamp-2">{scen.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{scen.createdAt}</span>
                  <button
                    onClick={() => {
                      selectAsset(scen.assetId);
                      setControls(scen.controls);
                    }}
                    className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 rounded text-[10px] font-bold flex items-center gap-1 transition"
                  >
                    <Play className="w-3 h-3" /> LOAD SCENARIO
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SAVE SCENARIO MODAL */}
      {saveModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-cyan-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Save className="w-4 h-4 text-cyan-400" /> SAVE COUNTERFACTUAL SCENARIO
              </h3>
              <button
                onClick={() => setSaveModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Scenario Title</label>
                <input
                  type="text"
                  placeholder="e.g. Extreme Summer Heatwave & High Load"
                  value={scenarioTitle}
                  onChange={(e) => setScenarioTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description (Optional)</label>
                <textarea
                  placeholder="Notes on the counterfactual parameters and simulated impact..."
                  value={scenarioDescription}
                  onChange={(e) => setScenarioDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSaveModalOpen(false)}
                className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded border border-slate-800 hover:bg-slate-800"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveScenario}
                disabled={!scenarioTitle.trim()}
                className="px-4 py-1.5 bg-cyan-500 text-slate-950 font-bold rounded hover:bg-cyan-400 disabled:opacity-50"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
