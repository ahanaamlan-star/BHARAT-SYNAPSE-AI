import React from 'react';
import { useSystem } from '../../context/SystemContext';
import {
  Layers,
  ShieldAlert,
  BrainCircuit,
  Activity,
  Cpu,
  Zap,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Radio,
  Sliders,
  ArrowRight,
  TrendingUp,
  FileText,
  Lock,
  GitFork,
  X,
  Gauge,
  Flame,
  Wifi,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const TwinVisualEngineView: React.FC = () => {
  const {
    assets,
    selectedAsset,
    selectedAssetId,
    selectAsset,
    dependencies,
    selectedSensorId,
    setSelectedSensorId,
    updateSensorReliability,
    updateSensorStatus,
    recalibrateTrust,
    injectAnomaly,
    injectSensorConflict,
    isLive
  } = useSystem();

  const pt = selectedAsset.physicalTwin;
  const it = selectedAsset.intelligenceTwin;
  const tt = selectedAsset.trustTwin;
  const rc = selectedAsset.realityConfidence;

  const allSensors = pt.components.flatMap((c) => c.sensors);
  const activeSensor = allSensors.find((s) => s.id === selectedSensorId) || null;
  const activeComponent = activeSensor
    ? pt.components.find((c) => c.id === activeSensor.componentId)
    : null;

  // Compute Downstream Dependent Assets
  const dependentAssetIds = selectedAsset.dependents || [];
  const downstreamAssets = assets.filter((a) => dependentAssetIds.includes(a.id));

  // Determine overall Visual State
  let visualStateMode: 'NORMAL' | 'SUSPICIOUS' | 'ANOMALY' = 'NORMAL';
  if (pt.overallHealth < 60 || it.failureProbability > 50 || it.anomalies.some((a) => !a.resolved)) {
    visualStateMode = 'ANOMALY';
  } else if (tt.overallDataTrust < 75 || allSensors.some((s) => s.status === 'Drifting' || s.status === 'Faulty')) {
    visualStateMode = 'SUSPICIOUS';
  }

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-[1600px] mx-auto animate-fadeIn font-mono">
      {/* Workspace Header & Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-[#0e1424] p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-100">
                  TWIN-OF-TWINS™ VISUAL ENGINE
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase tracking-widest">
                  INTELLIGENCE WORKSPACE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Unified Three-Twin Architecture: Synchronized Physical System Diagram, Intelligence Belief Model, & Trust Twin Data Engine.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Asset Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-bold">ASSET:</span>
            <select
              value={selectedAssetId}
              onChange={(e) => {
                selectAsset(e.target.value);
                setSelectedSensorId(null);
              }}
              className="bg-transparent text-xs font-bold text-cyan-300 focus:outline-none cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id} className="bg-slate-900 text-slate-200">
                  {a.code}: {a.name} ({a.domain})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Controls */}
          <button
            onClick={() => injectSensorConflict(selectedAsset.id)}
            className="px-3.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-red-950/40"
          >
            <Zap className="w-3.5 h-3.5 text-red-400 animate-pulse" /> INJECT SENSOR ANOMALY
          </button>

          <button
            onClick={() => recalibrateTrust(selectedAsset.id)}
            className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" /> RECALIBRATE TRUST
          </button>
        </div>
      </div>

      {/* VISUAL STATE INDICATOR BADGE */}
      <div
        className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          visualStateMode === 'NORMAL'
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
            : visualStateMode === 'SUSPICIOUS'
            ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
            : 'bg-red-950/40 border-red-500/50 text-red-300 animate-pulse'
        }`}
      >
        <div className="flex items-center gap-3">
          {visualStateMode === 'NORMAL' ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          ) : visualStateMode === 'SUSPICIOUS' ? (
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider">SYSTEM VISUAL STATE:</span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-extrabold uppercase border ${
                  visualStateMode === 'NORMAL'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : visualStateMode === 'SUSPICIOUS'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-red-500/20 border-red-500/50 text-red-300'
                }`}
              >
                {visualStateMode === 'NORMAL'
                  ? 'NORMAL — HIGH TRUST & HEALTH'
                  : visualStateMode === 'SUSPICIOUS'
                  ? 'SUSPICIOUS TELEMETRY — UNCERTAIN REALITY'
                  : 'CONFIRMED ANOMALY — HIGH FAILURE RISK'}
              </span>
            </div>
            <p className="text-xs opacity-90 mt-1">
              {visualStateMode === 'NORMAL' &&
                `High sensor trust (${tt.overallDataTrust}%), healthy physical state (${pt.overallHealth}%), and optimal reality confidence (${rc.score}%).`}
              {visualStateMode === 'SUSPICIOUS' &&
                `Data Trust degraded to ${tt.overallDataTrust}%. Reality confidence dropped to ${rc.score}%. Decision confidence reduced to prevent automated mis-actuation.`}
              {visualStateMode === 'ANOMALY' &&
                `Active failure risk (${it.failureProbability}%). Reality Confidence Score™ is ${rc.score}%. Mandatory Human-in-the-Loop gate active.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0 font-bold">
          <div className="text-right">
            <span className="text-slate-400 text-[10px] block">REALITY CONFIDENCE</span>
            <span
              className={`text-xl font-extrabold ${
                rc.score >= 70 ? 'text-cyan-300' : rc.score >= 45 ? 'text-amber-400' : 'text-red-400'
              }`}
            >
              {rc.score}%
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="text-right">
            <span className="text-slate-400 text-[10px] block">DATA TRUST</span>
            <span
              className={`text-xl font-extrabold ${
                tt.overallDataTrust >= 75 ? 'text-emerald-400' : tt.overallDataTrust >= 50 ? 'text-amber-400' : 'text-red-400'
              }`}
            >
              {tt.overallDataTrust}%
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="text-right">
            <span className="text-slate-400 text-[10px] block">AI PREDICTION CONF.</span>
            <span className="text-xl font-extrabold text-indigo-300">{it.predictionConfidence}%</span>
          </div>
        </div>
      </div>

      {/* CENTRAL SYNAPSE ENGINE (Connector Pipeline) */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
              CENTRAL SYNAPSE ENGINE — CAUSAL DATA & BELIEF PIPELINE
            </h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            FLOW: PHYSICAL REALITY → OBSERVED DATA → TRUST ASSESSMENT → AI INTERPRETATION → DECISION CONFIDENCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
          {/* Stage 1: Physical Reality */}
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">1. PHYSICAL REALITY</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-100">{pt.overallHealth}%</div>
              <div className="text-[10px] text-slate-400">System Health ({pt.status})</div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 flex justify-between">
              <span>{pt.components.length} Components</span>
              <span className="text-emerald-400 font-bold">{pt.activeComponentsCount} Active</span>
            </div>
          </div>

          {/* Stage 2: Observed Data */}
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">2. OBSERVED DATA</span>
              <Radio className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-300">{allSensors.length} Sensors</div>
              <div className="text-[10px] text-slate-400">{isLive ? 'Live 2.5s Pulse' : 'Stream Paused'}</div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 flex justify-between">
              <span>Temp: {pt.temperature}°C</span>
              <span>Load: {pt.load}%</span>
            </div>
          </div>

          {/* Stage 3: Trust Assessment */}
          <div
            className={`p-3 bg-slate-900/90 rounded-xl border flex flex-col justify-between space-y-2 relative group transition-all ${
              tt.overallDataTrust < 60 ? 'border-amber-500/60 shadow-sm shadow-amber-950' : 'border-slate-800 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-400">3. TRUST ASSESSMENT</span>
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div>
              <div
                className={`text-lg font-bold ${
                  tt.overallDataTrust >= 75 ? 'text-emerald-400' : tt.overallDataTrust >= 50 ? 'text-amber-300' : 'text-red-400'
                }`}
              >
                {tt.overallDataTrust}%
              </div>
              <div className="text-[10px] text-slate-400">Data Trust Score</div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 truncate">
              HSM: <strong className="text-slate-300">{tt.provenance.split(' ')[0]}</strong>
            </div>
          </div>

          {/* Stage 4: AI Interpretation */}
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-400">4. AI INTERPRETATION</span>
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div>
              <div
                className={`text-lg font-bold ${
                  it.failureProbability > 50 ? 'text-red-400' : 'text-slate-100'
                }`}
              >
                {it.failureProbability}%
              </div>
              <div className="text-[10px] text-slate-400">Failure Risk (ETTF: {it.estimatedTimeToFailure})</div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 flex justify-between">
              <span>State: <strong className="text-indigo-300">{it.predictedState}</strong></span>
              <span>Conf: <strong className="text-slate-300">{it.predictionConfidence}%</strong></span>
            </div>
          </div>

          {/* Stage 5: Decision Confidence */}
          <div
            className={`p-3 bg-slate-900/90 rounded-xl border flex flex-col justify-between space-y-2 relative group transition-all ${
              rc.score < 60 ? 'border-red-500/60 shadow-sm shadow-red-950' : 'border-cyan-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cyan-400">5. DECISION CONFIDENCE</span>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div>
              <div
                className={`text-xl font-extrabold ${
                  rc.score >= 75 ? 'text-cyan-300' : rc.score >= 50 ? 'text-amber-400' : 'text-red-400'
                }`}
              >
                {rc.score}%
              </div>
              <div className="text-[10px] text-slate-400">Reality Confidence Score™</div>
            </div>
            <div className="text-[10px] pt-1 border-t border-slate-800/60 font-bold">
              {rc.score < 60 ? (
                <span className="text-red-400">🔒 HITL GATE ACTIVE</span>
              ) : (
                <span className="text-emerald-400">⚡ AUTONOMOUS OK</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* THREE INTERCONNECTED TWIN PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==================================================== */}
        {/* PANEL 1: PHYSICAL TWIN (Interactive Diagram) */}
        {/* ==================================================== */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <div>
                  <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                    PHYSICAL TWIN DIAGRAM
                  </h2>
                  <p className="text-[10px] text-slate-400">Interactive hardware, sensors, & topology</p>
                </div>
              </div>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                Health: {pt.overallHealth}%
              </span>
            </div>

            {/* Asset Diagram Box */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block">PRIMARY ASSET NODE</span>
                  <div className="text-sm font-bold text-slate-100">{selectedAsset.code}: {selectedAsset.name}</div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  {selectedAsset.domain} Domain
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                  <span className="text-slate-500 block">TEMP</span>
                  <span className="font-bold text-cyan-300">{pt.temperature}°C</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                  <span className="text-slate-500 block">LOAD</span>
                  <span className="font-bold text-slate-200">{pt.load}%</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                  <span className="text-slate-500 block">VIBRATION</span>
                  <span className="font-bold text-slate-200">{pt.vibration} mm/s</span>
                </div>
              </div>
            </div>

            {/* Components & Sensors Diagram */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>COMPONENTS & SENSORS ({allSensors.length} SENSORS)</span>
                <span className="text-[10px] text-slate-500">Click a sensor to inspect & highlight</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                {pt.components.map((comp) => {
                  const isCompHighlighted = activeComponent?.id === comp.id;

                  return (
                    <div
                      key={comp.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isCompHighlighted
                          ? 'bg-slate-900 border-cyan-400/80 shadow-md shadow-cyan-950/50'
                          : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200">{comp.name}</span>
                          <span className="text-[9px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            {comp.type}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-300">
                          Health: <strong className="text-emerald-400">{comp.health}%</strong>
                        </span>
                      </div>

                      {/* Sensors List inside Component */}
                      <div className="grid grid-cols-2 gap-2">
                        {comp.sensors.map((sensor) => {
                          const isSelected = selectedSensorId === sensor.id;

                          return (
                            <button
                              key={sensor.id}
                              onClick={() => setSelectedSensorId(isSelected ? null : sensor.id)}
                              className={`p-2 rounded-lg border text-left transition-all ${
                                isSelected
                                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/40 shadow-sm shadow-cyan-900'
                                  : sensor.status === 'Faulty'
                                  ? 'bg-red-950/40 border-red-500/50 text-red-300'
                                  : sensor.status === 'Drifting'
                                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-bold truncate">{sensor.name}</span>
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    sensor.status === 'Normal'
                                      ? 'bg-emerald-400'
                                      : sensor.status === 'Drifting'
                                      ? 'bg-amber-400'
                                      : 'bg-red-400'
                                  }`}
                                />
                              </div>

                              <div className="flex items-center justify-between text-[10px] mt-1 text-slate-400">
                                <span>
                                  {sensor.currentValue} {sensor.unit}
                                </span>
                                <span
                                  className={`font-bold ${
                                    sensor.reliabilityScore >= 75
                                      ? 'text-emerald-400'
                                      : sensor.reliabilityScore >= 50
                                      ? 'text-amber-400'
                                      : 'text-red-400'
                                  }`}
                                >
                                  {sensor.reliabilityScore}% Rel.
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Downstream Dependencies Section */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>DOWNSTREAM DEPENDENCIES ({downstreamAssets.length} AFFECTED)</span>
                <GitFork className="w-3.5 h-3.5 text-indigo-400" />
              </div>

              <div className="space-y-1.5">
                {downstreamAssets.length > 0 ? (
                  downstreamAssets.map((dep) => (
                    <div
                      key={dep.id}
                      className={`p-2 bg-slate-950 rounded-lg border text-xs flex items-center justify-between ${
                        activeSensor ? 'border-indigo-500/50 bg-indigo-950/20' : 'border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-200 text-[11px]">{dep.code}: {dep.name}</div>
                        <div className="text-[9px] text-slate-500">{dep.domain} Domain • Health: {dep.physicalTwin.overallHealth}%</div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                        DEPENDENT
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-[10px] text-slate-500 italic p-2 bg-slate-950 rounded border border-slate-800">
                    No active downstream cascade targets registered for this asset.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* PANEL 2: INTELLIGENCE TWIN (AI Belief State) */}
        {/* ==================================================== */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
                <div>
                  <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                    INTELLIGENCE TWIN BELIEF MODEL
                  </h2>
                  <p className="text-[10px] text-slate-400">AI interpretations, risk horizons, & forecast</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                Predicted: {it.predictedState}
              </span>
            </div>

            {/* AI Risk & Confidence Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">FAILURE PROBABILITY</div>
                <div
                  className={`text-2xl font-extrabold ${
                    it.failureProbability > 50 ? 'text-red-400' : 'text-slate-200'
                  }`}
                >
                  {it.failureProbability}%
                </div>
                <div className="text-[9px] text-slate-500">ETTF: {it.estimatedTimeToFailure}</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">PREDICTION CONFIDENCE</div>
                <div className="text-2xl font-extrabold text-indigo-300">{it.predictionConfidence}%</div>
                <div className="text-[9px] text-slate-500">Model Certainty</div>
              </div>
            </div>

            {/* AI Interpretations of Physical Telemetry */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>SUPPORTING EVIDENCE & CAUSAL FACTORS</span>
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              </div>

              <div className="space-y-2 text-xs">
                {it.supportingEvidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-start gap-2 transition-all ${
                      activeSensor
                        ? 'bg-indigo-950/30 border-indigo-500/50 text-indigo-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-[11px]">{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Causal Factor Weight Bars */}
            <div className="space-y-2 pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                NEURAL CAUSAL FACTOR ATTRIBUTION:
              </div>

              <div className="space-y-2 text-xs">
                {it.causalFactors.map((cf, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-300">
                      <span>{cf.factor}</span>
                      <span className="font-bold text-indigo-300">{(cf.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, cf.weight * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forward Scenario Forecast Timeline */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                FORWARD SCENARIO FORECASTS:
              </div>

              <div className="grid grid-cols-3 gap-2">
                {it.scenarioForecasts.map((sc, idx) => (
                  <div key={idx} className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] space-y-1 text-center">
                    <div className="font-bold text-slate-200">{sc.timeAhead}</div>
                    <div className="text-slate-400">Health: {sc.predictedHealth}%</div>
                    <span
                      className={`inline-block px-1.5 py-0.2 rounded font-bold ${
                        sc.riskLevel === 'High' || sc.riskLevel === 'Catastrophic'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                      }`}
                    >
                      {sc.riskLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* PANEL 3: TRUST TWIN (Data Reliability Engine) */}
        {/* ==================================================== */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <div>
                  <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                    TRUST TWIN DATA ENGINE
                  </h2>
                  <p className="text-[10px] text-slate-400">Sensor reliability, temporal checks, & provenance</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                Trust: {tt.overallDataTrust}%
              </span>
            </div>

            {/* Primary Trust Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">SENSOR RELIABILITY</div>
                <div className="text-2xl font-bold text-slate-200">{tt.sensorTrust}%</div>
                <div className="text-[9px] text-slate-500">Avg Hardware Health</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">CROSS-SENSOR CONSISTENCY</div>
                <div className="text-2xl font-bold text-slate-200">{tt.crossSensorAgreement}%</div>
                <div className="text-[9px] text-slate-500">Multi-Stream Consensus</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">TEMPORAL CONSISTENCY</div>
                <div className="text-2xl font-bold text-slate-200">{tt.temporalConsistency}%</div>
                <div className="text-[9px] text-slate-500">Freeze & Jitter Check</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">DATA COMPLETENESS</div>
                <div className="text-2xl font-bold text-slate-200">{tt.dataCompleteness}%</div>
                <div className="text-[9px] text-slate-500">Zero Missing Samples</div>
              </div>
            </div>

            {/* Cryptographic Provenance & Propagation Level */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold">PROVENANCE SEAL:</span>
                <span className="font-bold text-emerald-400">{tt.provenance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px] uppercase font-bold">PROPAGATION STATE:</span>
                <span className="font-bold text-amber-300">{tt.trustPropagationLevel}</span>
              </div>
            </div>

            {/* Evidence Log for Trust Reductions */}
            <div className="space-y-2 pt-1">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                <span>EVIDENCE FOR TRUST PENALTIES ({tt.reductionEvidence.length})</span>
                <FileText className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar">
                {tt.reductionEvidence.length > 0 ? (
                  tt.reductionEvidence.map((ev, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 bg-slate-950 rounded-lg border text-xs space-y-1 ${
                        activeSensor ? 'border-amber-500/60 bg-amber-950/20' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between font-bold text-[10px]">
                        <span className="text-red-400">{ev.source}</span>
                        <span className="text-slate-500">{ev.timestamp}</span>
                      </div>
                      <div className="text-slate-300 text-[11px]">{ev.issue}</div>
                      <div className="text-right text-amber-400 text-[9px] font-bold">
                        Impact: {ev.impactPoints} Trust Pts
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[10px] text-slate-500 text-center">
                    No active trust penalties. Cryptographically clean & temporally consistent telemetry.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SELECTED SENSOR INTERACTIVE INSPECTOR POPOVER / PANEL */}
      {activeSensor && (
        <div className="bg-[#0e1424] border-2 border-cyan-400/80 rounded-2xl p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-400/50">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  INTERACTIVE SENSOR INSPECTOR & RELIABILITY CONTROLLER
                </span>
                <h3 className="text-base font-bold text-slate-100">{activeSensor.name}</h3>
              </div>
            </div>

            <button
              onClick={() => setSelectedSensorId(null)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Sensor Info */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-cyan-300 border-b border-slate-800 pb-1">SENSOR METRICS</div>
              <div className="flex justify-between text-slate-300">
                <span>Metric Type:</span>
                <span className="font-bold text-slate-100">{activeSensor.type}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Current Value:</span>
                <span className="font-bold text-cyan-300">
                  {activeSensor.currentValue} {activeSensor.unit}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Component:</span>
                <span className="font-bold text-slate-200">{activeComponent?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Status:</span>
                <span
                  className={`font-bold ${
                    activeSensor.status === 'Normal'
                      ? 'text-emerald-400'
                      : activeSensor.status === 'Drifting'
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  {activeSensor.status}
                </span>
              </div>
            </div>

            {/* Interactive Reliability Slider */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs md:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="font-bold text-amber-300">SENSOR RELIABILITY CONTROL</span>
                <span className="text-base font-extrabold text-amber-300">
                  {activeSensor.reliabilityScore}%
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={activeSensor.reliabilityScore}
                  onChange={(e) =>
                    updateSensorReliability(selectedAsset.id, activeSensor.id, Number(e.target.value))
                  }
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>0% (Compromised)</span>
                  <span>50% (Drifting)</span>
                  <span>100% (Calibrated)</span>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => updateSensorReliability(selectedAsset.id, activeSensor.id, 98)}
                  className="flex-1 py-1 px-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-bold"
                >
                  SET CALIBRATED (98%)
                </button>
                <button
                  onClick={() => updateSensorReliability(selectedAsset.id, activeSensor.id, 50)}
                  className="flex-1 py-1 px-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-[10px] font-bold"
                >
                  SET DRIFTING (50%)
                </button>
                <button
                  onClick={() => updateSensorReliability(selectedAsset.id, activeSensor.id, 15)}
                  className="flex-1 py-1 px-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded text-[10px] font-bold"
                >
                  SET FAULTY (15%)
                </button>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-indigo-300 border-b border-slate-800 pb-1">
                DEPENDENCY IMPACT
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                • <strong>Affected Component:</strong> {activeComponent?.name}<br />
                • <strong>Affected Asset:</strong> {selectedAsset.code}<br />
                • <strong>Trust Impact:</strong> -{Math.round((100 - activeSensor.reliabilityScore) * 0.4)} Trust Pts<br />
                • <strong>Downstream Cascade:</strong> {downstreamAssets.length} Dependent Asset(s)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
