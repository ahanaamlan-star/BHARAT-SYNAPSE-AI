import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import { RealityConfidenceGauge } from '../common/RealityConfidenceGauge';
import {
  Box,
  Thermometer,
  Zap,
  Activity,
  Gauge,
  Wifi,
  Radio,
  Cpu,
  AlertTriangle,
  RefreshCw,
  Layers,
  Wrench
} from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const { assets, selectedAsset, selectAsset, injectAnomaly, recalibrateTrust } = useSystem();
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const pt = selectedAsset.physicalTwin;
  const it = selectedAsset.intelligenceTwin;
  const tt = selectedAsset.trustTwin;
  const rc = selectedAsset.realityConfidence;

  const selectedComponent = pt.components.find((c) => c.id === selectedComponentId) || pt.components[0];

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto animate-fadeIn">
      {/* Asset Selector Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0e1424] p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-cyan-400">{selectedAsset.code}</span>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {selectedAsset.domain}
            </span>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
              {selectedAsset.criticality}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">{selectedAsset.name}</h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedAsset.location.name} • Region: {selectedAsset.location.region}</p>
        </div>

        {/* Switch Asset Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-slate-400">SELECT ASSET:</label>
          <select
            value={selectedAsset.id}
            onChange={(e) => selectAsset(e.target.value)}
            className="bg-slate-900 text-cyan-300 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}: {a.name} ({a.domain})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Flagship Reality Confidence Metric */}
      <RealityConfidenceGauge data={rc} />

      {/* Main Digital Twin Visual Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Component Diagram & Physical Schematic */}
        <div className="lg:col-span-2 space-y-6">
          {/* Component Diagram / Schematic Canvas */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-slate-200 flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-400" />
                PHYSICAL TWIN SCHEMATIC & COMPONENT MAP
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Active Components: <strong className="text-slate-200">{pt.activeComponentsCount}</strong>
              </span>
            </div>

            {/* Interactive Component Nodes Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pt.components.map((comp) => {
                const isSelected = selectedComponent?.id === comp.id;

                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-300">{comp.type}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          comp.status === 'Critical'
                            ? 'bg-red-500/20 text-red-400'
                            : comp.status === 'Warning'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {comp.status}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-100">{comp.name}</div>

                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono pt-1 text-slate-400">
                      <div>Health: <strong className="text-slate-200">{comp.health}%</strong></div>
                      <div>Temp: <strong className="text-amber-400">{comp.temperature}°C</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Component Deep Dive */}
            {selectedComponent && (
              <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    COMPONENT SENSOR TELEMETRY: {selectedComponent.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    Operating Hours: {selectedComponent.operatingHours} hrs
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedComponent.sensors.map((sns) => (
                    <div
                      key={sns.id}
                      className="p-2.5 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <div className="font-bold text-slate-200">{sns.name}</div>
                        <div className="text-[10px] text-slate-500">
                          Firmware: {sns.firmwareVersion} • Calibrated: {sns.calibrationDate}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-cyan-300">
                          {sns.currentValue} {sns.unit}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Reliability: <span className={sns.reliabilityScore < 70 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>{sns.reliabilityScore}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Physical Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#0e1424] rounded-xl border border-slate-800 font-mono">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" /> TEMPERATURE
              </div>
              <div className="text-xl font-bold text-amber-300 mt-1">{pt.temperature}°C</div>
            </div>

            <div className="p-3 bg-[#0e1424] rounded-xl border border-slate-800 font-mono">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> VOLTAGE
              </div>
              <div className="text-xl font-bold text-cyan-300 mt-1">{pt.voltage} {selectedAsset.domain === 'Power' ? 'kV' : 'V'}</div>
            </div>

            <div className="p-3 bg-[#0e1424] rounded-xl border border-slate-800 font-mono">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-indigo-400" /> LOAD
              </div>
              <div className="text-xl font-bold text-indigo-300 mt-1">{pt.load}%</div>
            </div>

            <div className="p-3 bg-[#0e1424] rounded-xl border border-slate-800 font-mono">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" /> LATENCY
              </div>
              <div className="text-xl font-bold text-emerald-300 mt-1">{pt.latency} ms</div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Trust Twin & Intelligence Twin Action Panel */}
        <div className="space-y-6">
          {/* Trust Twin Breakdown */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-amber-400" />
                TRUST TWIN RELIABILITY
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Score: {tt.overallDataTrust}%</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Sensor Trust:</span>
                <span className="font-bold text-slate-100">{tt.sensorTrust}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Cross-Sensor Agreement:</span>
                <span className="font-bold text-slate-100">{tt.crossSensorAgreement}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Temporal Consistency:</span>
                <span className="font-bold text-slate-100">{tt.temporalConsistency}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Provenance:</span>
                <span className="font-bold text-emerald-400">{tt.provenance}</span>
              </div>
            </div>

            <button
              onClick={() => recalibrateTrust(selectedAsset.id)}
              className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all mt-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> RECALIBRATE TRUST TWIN
            </button>
          </div>

          {/* Anomaly Controls & Manual Injections */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              INJECT ANOMALY SIMULATION
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Test how the Trust Twin and Reality Confidence Score™ respond to data corruption or sensor drift.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => injectAnomaly(selectedAsset.id, 'DRIFT')}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 rounded text-left transition-all"
              >
                + Sensor Drift
              </button>
              <button
                onClick={() => injectAnomaly(selectedAsset.id, 'FROZEN')}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700 rounded text-left transition-all"
              >
                + Frozen Stream
              </button>
              <button
                onClick={() => injectAnomaly(selectedAsset.id, 'SPOOFED')}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-700 rounded text-left transition-all"
              >
                + Cyber Spoofing
              </button>
              <button
                onClick={() => injectAnomaly(selectedAsset.id, 'SPIKE')}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 rounded text-left transition-all"
              >
                + Thermal Spike
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
