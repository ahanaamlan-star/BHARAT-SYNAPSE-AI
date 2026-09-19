import React, { useState, useMemo } from 'react';
import { useSystem } from '../../context/SystemContext';
import { TrustPropagationService } from '../../services/trustPropagationService';
import { GraphNode, GraphEdge, GraphNodeType, GraphEdgeRelation } from '../../types';
import {
  GitFork,
  ShieldAlert,
  Zap,
  RefreshCw,
  Info,
  Activity,
  Cpu,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Database,
  Box,
  Layers,
  Radio,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

export const TrustPropagationGraph: React.FC = () => {
  const { selectedAsset, assets, selectAsset, injectSensorConflict, recalibrateTrust } = useSystem();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Synchronized graph data generated directly from SystemContext state
  const graphData = useMemo(() => {
    return TrustPropagationService.generateGraphData(selectedAsset, assets);
  }, [selectedAsset, assets]);

  const { nodes, edges, summary } = graphData;

  // Selected node for inspector drawer
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return nodes[0];
    return nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  }, [selectedNodeId, nodes]);

  // Find incoming & outgoing edges for selected node
  const incomingEdges = useMemo(() => {
    if (!selectedNode) return [];
    return edges.filter((e) => e.targetId === selectedNode.id);
  }, [selectedNode, edges]);

  const outgoingEdges = useMemo(() => {
    if (!selectedNode) return [];
    return edges.filter((e) => e.sourceId === selectedNode.id);
  }, [selectedNode, edges]);

  // Helper icons by node type
  const getNodeIcon = (type: GraphNodeType) => {
    switch (type) {
      case 'Sensor':
        return Activity;
      case 'Component':
        return Layers;
      case 'Asset':
        return Box;
      case 'System':
        return Database;
      case 'Prediction':
        return Cpu;
      case 'Decision':
        return ShieldAlert;
      default:
        return Box;
    }
  };

  // Helper colors by node type & trust
  const getNodeColorClass = (node: GraphNode) => {
    if (node.status === 'Locked' || node.trust < 45) {
      return {
        border: 'border-red-500/80 shadow-red-950/60 bg-red-950/30',
        badge: 'bg-red-500/20 text-red-400 border-red-500/40',
        text: 'text-red-400'
      };
    }
    if (node.trust < 65 || node.status === 'Drifting' || node.status === 'Inconsistent' || node.status === 'Degraded') {
      return {
        border: 'border-amber-500/80 shadow-amber-950/60 bg-amber-950/30',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        text: 'text-amber-300'
      };
    }
    return {
      border: 'border-cyan-500/40 shadow-cyan-950/40 bg-[#0e1424]',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      text: 'text-cyan-300'
    };
  };

  return (
    <div className="space-y-6 font-mono text-slate-100">
      {/* Top Controls & Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-[#0e1424] p-5 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <GitFork className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h2 className="text-xl font-bold tracking-tight text-slate-100">TRUST PROPAGATION GRAPH™</h2>
            <span className="text-xs text-cyan-300 bg-cyan-950/90 px-2.5 py-1 rounded border border-cyan-800 font-bold">
              REAL-TIME SYNCHRONIZED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing downstream trust decay across <strong className="text-cyan-300">Sensor → Component → Asset → System → Prediction → Decision</strong>
          </p>
        </div>

        {/* Asset Selector & Anomaly Triggers */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select
            value={selectedAsset.id}
            onChange={(e) => selectAsset(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 font-mono focus:border-cyan-500 focus:outline-none"
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}: {a.name} ({a.domain})
              </option>
            ))}
          </select>

          <button
            onClick={() => injectSensorConflict(selectedAsset.id)}
            className="px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-950/40"
          >
            <Zap className="w-4 h-4 text-red-400 animate-pulse" /> INJECT SENSOR ANOMALY
          </button>

          <button
            onClick={() => recalibrateTrust(selectedAsset.id)}
            className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> RECALIBRATE
          </button>
        </div>
      </div>

      {/* SYNTHETIC PROPAGATED TRUST CHAIN BAR */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
          <span className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" /> PROPAGATED TRUST CASCADE CHAIN
          </span>
          <span className="text-[11px] text-amber-400">
            Root Anomaly Origin: <strong className="text-red-400">{summary.rootAnomalySensorName}</strong>
          </span>
        </div>

        {/* Chain Flow Badges */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 custom-scrollbar text-xs">
          {/* Sensor Trust */}
          <div className="flex items-center gap-2 shrink-0 p-2.5 rounded-lg bg-slate-900 border border-red-500/50">
            <Activity className="w-4 h-4 text-red-400" />
            <div>
              <div className="text-[10px] text-slate-400">SENSOR TRUST</div>
              <div className="font-extrabold text-red-400">{summary.rootSensorTrust}%</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* Cooling/Component Trust */}
          <div className="flex items-center gap-2 shrink-0 p-2.5 rounded-lg bg-slate-900 border border-amber-500/50">
            <Layers className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400">COOLING / COMPONENT</div>
              <div className="font-extrabold text-amber-300">48%</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* Transformer Asset Trust */}
          <div className="flex items-center gap-2 shrink-0 p-2.5 rounded-lg bg-slate-900 border border-amber-500/40">
            <Box className="w-4 h-4 text-amber-300" />
            <div>
              <div className="text-[10px] text-slate-400">TRANSFORMER ASSET</div>
              <div className="font-extrabold text-amber-300">55%</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* System Grid Trust */}
          <div className="flex items-center gap-2 shrink-0 p-2.5 rounded-lg bg-slate-900 border border-slate-700">
            <Database className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] text-slate-400">POWER SUBSTATION</div>
              <div className="font-extrabold text-cyan-300">61%</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* Decision Confidence */}
          <div className={`flex items-center gap-2 shrink-0 p-2.5 rounded-lg bg-slate-900 border ${summary.isAutonomousActionLocked ? 'border-red-500 bg-red-950/30' : 'border-emerald-500/50'}`}>
            {summary.isAutonomousActionLocked ? <Lock className="w-4 h-4 text-red-400" /> : <ShieldAlert className="w-4 h-4 text-emerald-400" />}
            <div>
              <div className="text-[10px] text-slate-400">DECISION CONFIDENCE</div>
              <div className={`font-extrabold ${summary.isAutonomousActionLocked ? 'text-red-400' : 'text-emerald-400'}`}>
                {summary.decisionConfidence}%
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Explanation Text Box */}
        <div className={`p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 ${summary.isAutonomousActionLocked ? 'bg-red-950/30 border-red-800/80 text-red-200' : 'bg-cyan-950/30 border-cyan-800/80 text-cyan-200'}`}>
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
          <div>
            <strong className="font-bold">PROPAGATION VERDICT & CAUSAL ANALYSIS: </strong>
            {summary.propagationExplanation}
          </div>
        </div>
      </div>

      {/* GRAPH CANVAS & INSPECTOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* GRAPH CANVAS CONTAINER (2 Columns on large screens) */}
        <div className="lg:col-span-2 bg-[#0a0e1a] border border-slate-800 rounded-xl p-5 relative overflow-hidden min-h-[580px] space-y-4">
          <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> GRAPH CANVAS
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Click any node to inspect dependencies
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Healthy</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Low Trust / Warning</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Critical / Locked</span>
            </div>
          </div>

          {/* INTERACTIVE GRAPH CANVAS MATRIX (By Tiers: 0 to 5) */}
          <div className="space-y-6 overflow-x-auto py-2 custom-scrollbar">
            {[0, 1, 2, 3, 4, 5].map((tierIdx) => {
              const tierNodes = nodes.filter((n) => n.tier === tierIdx);
              if (tierNodes.length === 0) return null;

              const tierLabels = [
                'TIER 0: SENSOR TRANSDUCERS (MONITORS)',
                'TIER 1: SUBSYSTEM COMPONENTS (PART OF)',
                'TIER 2: PHYSICAL ASSET TWIN (PART OF)',
                'TIER 3: INTER-DOMAIN GRID SYSTEM (DEPENDS ON)',
                'TIER 4: AI PREDICTIVE MODELS (INFLUENCES)',
                'TIER 5: AUTONOMOUS DECISION MODULES (ACTION)'
              ];

              return (
                <div key={tierIdx} className="space-y-2">
                  <div className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {tierLabels[tierIdx]}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tierNodes.map((node) => {
                      const Icon = getNodeIcon(node.type);
                      const colors = getNodeColorClass(node);
                      const isSelected = selectedNode?.id === node.id;

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden shadow-md hover:scale-[1.01] ${colors.border} ${
                            isSelected ? 'ring-2 ring-cyan-400 bg-slate-900/90' : 'hover:border-slate-600'
                          }`}
                        >
                          {/* Node Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg ${colors.badge}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-100">{node.name}</div>
                                <div className="text-[10px] text-slate-400">{node.type} • Tier {node.tier}</div>
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors.badge}`}>
                              {node.status}
                            </span>
                          </div>

                          {/* Gauge Metrics */}
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60">
                            <div>
                              <div className="text-[10px] text-slate-400">HEALTH</div>
                              <div className="font-bold text-emerald-400">{node.health}%</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-400">PROPAGATED TRUST</div>
                              <div className={`font-extrabold ${node.trust < 50 ? 'text-red-400' : node.trust < 70 ? 'text-amber-300' : 'text-cyan-300'}`}>
                                {node.trust}%
                              </div>
                            </div>
                          </div>

                          {/* Downstream warning pulse overlay */}
                          {node.trust < 60 && (
                            <div className="mt-2 text-[10px] font-bold text-amber-300 bg-amber-950/60 p-1.5 rounded border border-amber-800/80 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-bounce" />
                              <span className="truncate">Downstream Trust Degradation Active</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INSPECTOR SIDE DRAWER (NODE DETAILS & DEPENDENCY IMPACT) */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-5 space-y-5 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" /> NODE INSPECTOR PANEL
            </h3>
            <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {selectedNode.type} NODE
            </span>
          </div>

          {/* Selected Node Summary */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-cyan-300">{selectedNode.name}</h4>
                <div className="text-xs text-slate-400 mt-0.5">{selectedNode.description}</div>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${selectedNode.trust < 50 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'}`}>
                Trust: {selectedNode.trust}%
              </span>
            </div>

            {/* Value Check */}
            {selectedNode.observedValue && (
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500">OBSERVED VALUE:</span>
                  <div className="font-bold text-slate-100">{selectedNode.observedValue}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">EXPECTED BASELINE:</span>
                  <div className="font-bold text-cyan-400">{selectedNode.expectedValue}</div>
                </div>
              </div>
            )}
          </div>

          {/* Quantified Impact Explanation */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> QUANTIFIED TRUST IMPACT EXPLANATION
            </label>
            <div className="p-3 bg-amber-950/20 border border-amber-800/80 rounded-lg text-xs text-amber-200 leading-relaxed">
              {selectedNode.impactExplanation}
            </div>
          </div>

          {/* Incoming Dependencies */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 rotate-180" /> UPSTREAM DEPENDENCY SOURCES ({incomingEdges.length})
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs custom-scrollbar">
              {incomingEdges.length > 0 ? (
                incomingEdges.map((e) => {
                  const src = nodes.find((n) => n.id === e.sourceId);
                  return (
                    <div key={e.id} className="p-2.5 bg-slate-900 rounded border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-200">{src?.name || e.sourceId}</div>
                        <div className="text-[10px] text-cyan-400">Relation: {e.relation}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${e.isLowTrustPath ? 'bg-red-950 text-red-400' : 'bg-emerald-950 text-emerald-400'}`}>
                        {e.isLowTrustPath ? `-${e.trustImpactPoints} pts` : 'Clean'}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 bg-slate-950 text-slate-500 rounded text-center text-[11px]">
                  Root node — no upstream dependency inputs.
                </div>
              )}
            </div>
          </div>

          {/* Outbound Impacted Targets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" /> DOWNSTREAM IMPACTED TARGETS ({outgoingEdges.length})
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs custom-scrollbar">
              {outgoingEdges.length > 0 ? (
                outgoingEdges.map((e) => {
                  const tgt = nodes.find((n) => n.id === e.targetId);
                  return (
                    <div key={e.id} className="p-2.5 bg-slate-900 rounded border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-200">{tgt?.name || e.targetId}</div>
                        <div className="text-[10px] text-amber-400">Relation: {e.relation}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${e.isLowTrustPath ? 'bg-red-950 text-red-400' : 'bg-emerald-950 text-emerald-400'}`}>
                        {e.isLowTrustPath ? 'Affected' : 'Aligned'}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 bg-slate-950 text-slate-500 rounded text-center text-[11px]">
                  Terminal node — no further downstream dependencies.
                </div>
              )}
            </div>
          </div>

          {/* Evidence Logs */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-400">EVIDENCE & ATTESTATION LOGS</label>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] space-y-1 text-slate-300">
              {selectedNode.evidence.map((ev, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
