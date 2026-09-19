export type DomainType = 'Power' | 'Telecommunications' | 'Water' | 'Transportation' | 'Industrial';

export type AssetStatus = 'Healthy' | 'Warning' | 'Critical' | 'Offline';

export type ComponentType = 
  | 'Transformer' 
  | 'Cooling System' 
  | 'Control Unit' 
  | 'Sensors' 
  | 'Network Node' 
  | 'Turbine' 
  | 'Pump' 
  | 'Fiber Multiplexer' 
  | 'Signal Controller' 
  | 'SCADA Gateway';

export type SensorType = 
  | 'Temperature' 
  | 'Voltage' 
  | 'Current' 
  | 'Pressure' 
  | 'Load' 
  | 'Latency' 
  | 'Packet Loss' 
  | 'CPU' 
  | 'Memory' 
  | 'Error Rate' 
  | 'Vibration' 
  | 'Acoustic Leak';

export interface TelemetryPoint {
  timestamp: string; // ISO string or format HH:mm:ss
  sensorId: string;
  assetId: string;
  metric: SensorType;
  value: number;
  unit: string;
  expectedMin: number;
  expectedMax: number;
  isAnomaly: boolean;
  anomalyType?: 'SPIKE' | 'DRIFT' | 'FROZEN' | 'NOISE' | 'SPOOFED' | 'MISSING';
  trustScore: number; // 0 - 100
}

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  componentId: string;
  unit: string;
  currentValue: number;
  expectedRange: [number, number];
  calibrationDate: string;
  reliabilityScore: number; // 0 - 100%
  status: 'Normal' | 'Drifting' | 'Degraded' | 'Faulty' | 'Unresponsive';
  firmwareVersion: string;
  lastUpdated: string;
}

export interface InfrastructureComponent {
  id: string;
  name: string;
  type: ComponentType;
  assetId: string;
  health: number; // 0 - 100
  status: AssetStatus;
  sensors: Sensor[];
  temperature: number; // °C
  load: number; // %
  vibration: number; // mm/s
  operatingHours: number;
}

export interface PhysicalTwinState {
  assetId: string;
  overallHealth: number; // 0 - 100
  status: AssetStatus;
  temperature: number; // °C
  load: number; // %
  voltage: number; // kV or V
  pressure: number; // bar
  latency: number; // ms
  errorRate: number; // %
  vibration: number; // mm/s
  recoveryReadiness: number; // 0 - 100
  activeComponentsCount: number;
  criticalComponentsCount: number;
  components: InfrastructureComponent[];
  lastPhysicalInspection: string;
}

export type AnomalyCategory = 
  | 'Temperature Spike' 
  | 'Voltage Instability' 
  | 'Pressure Deviation' 
  | 'Load Surge' 
  | 'Latency Spike' 
  | 'Packet Loss' 
  | 'Error-Rate Jump' 
  | 'Sensor Disagreement' 
  | 'Resource Saturation' 
  | 'Vibration Anomaly';

export interface Anomaly {
  id: string;
  assetId: string;
  assetName?: string;
  assetCode?: string;
  signal?: string;
  observedValue?: string;
  expectedValue?: string;
  deviation?: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  confidence: number; // AI detection confidence % (0-100)
  trustScore?: number; // Sensor / Data trust score % (0-100)
  timestamp?: string;
  detectedAt?: string;
  potentialImpact?: string;
  anomalyCategory?: AnomalyCategory;
  title?: string;
  description?: string;
  type?: string;
  sensorId?: string;
  impactedTwin?: 'Physical' | 'Trust' | 'Intelligence' | 'All';
  resolved?: boolean;
}

export interface PredictionContributingFactor {
  factorName: string;
  valueChange: string; // e.g. "+31%", "+18%", "-14%", "+11%"
  impactWeightPercent: number; // e.g. 35
  direction: 'INCREASE' | 'DECREASE';
  explanation: string;
}

export interface Prediction {
  id: string;
  assetId: string;
  failureProbability: number; // 0 - 100 %
  estimatedTimeToFailureHours: number;
  predictionConfidence: number; // 0 - 100 %
  probableFailureMode: string;
  supportingEvidence: string[];
  recommendedAction: string;
  timestamp: string;
}

export interface IntelligenceTwinState {
  assetId: string;
  modelLabel?: 'Synthetic prototype prediction';
  disclaimer?: 'Synthetic prototype prediction - Do not claim real predictive accuracy.';
  predictedState: AssetStatus;
  anomalies: Anomaly[];
  failureProbability: number; // % (0 - 100)
  estimatedFailureWindow?: string; // e.g. "2h 15m", "14h 30m", "> 100 Hours"
  riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low';
  predictionConfidence: number; // % (0 - 100)
  dataTrust?: number; // % (0 - 100)
  realityConfidence?: number; // % (0 - 100)
  potentialImpact: 'Catastrophic' | 'Severe' | 'Moderate' | 'Minor';
  supportingEvidence: string[];
  contributingFactors?: PredictionContributingFactor[];
  causalFactors: { factor: string; weight: number }[];
  scenarioForecasts: { timeAhead: string; predictedHealth: number; riskLevel: string }[];
  estimatedTimeToFailure?: string; // Backwards compatibility alias
}

export interface TrustAssessment {
  sensorReliability: number; // %
  dataConsistency: number; // %
  temporalConsistency: number; // %
  crossSensorAgreement: number; // %
  dataCompleteness: number; // %
  provenanceVerified: boolean;
  trustPenaltyReasons: string[];
}

export interface SignalExplanation {
  signal: string;
  observedValue: string;
  expectedValue: string;
  deviation: string;
  impact: string;
  impactPoints: number;
  confidence: number; // 0 - 100 %
  status: 'Normal' | 'Inconsistent' | 'Drifting' | 'Faulty' | 'Frozen';
}

export interface TrustScoringFactor {
  factor: string;
  weightPercent: number; // e.g. 20 for 20%
  score: number; // 0 - 100
  weightedContribution: number; // score * (weightPercent / 100)
  description: string;
}

export interface TrustTwinState {
  assetId: string;
  modelName?: 'BharatSynapse Prototype Trust Model';
  overallDataTrust: number; // 0 - 100 %
  sensorTrust: number; // Sensor Reliability
  historicalConsistency?: number; // Historical Stability / Consistency
  crossSensorAgreement: number; // Correlation with related sensors
  temporalConsistency: number; // Freeze / Jitter Check
  dataCompleteness: number; // Missing Data / Dropped packets
  noiseAndSuddenChanges?: number; // Noise & Rate-of-change checks
  timestampValidity?: number; // Timestamp drift & sequence checks
  streamTrust: number;
  dataReliabilityIndex: number;
  provenance: 'Cryptographically Verified (HSM)' | 'Standard Payload' | 'Unverified/Tampered' | 'Synthetic Stream';
  missingDataPercent: number;
  confidenceScore: number;
  trustPropagationLevel?: 'High Isolation' | 'Cascading Trust Loss' | 'Local Degradation' | 'Optimal';
  reductionEvidence: { timestamp: string; issue: string; impactPoints: number; source: string }[];
  scoringWeights?: TrustScoringFactor[];
  signalExplanations?: SignalExplanation[];
}

export interface RealityConfidence {
  assetId: string;
  score: number; // Reality Confidence Score™ (0 - 100)
  systemHealth: number; // System Health %
  dataTrust: number; // Data Trust %
  predictionConfidence: number; // Prediction Confidence %
  explanation: string;
  discrepancyFactors: { metric: string; systemValue: string; trustObservation: string; deltaSeverity: 'Low' | 'Medium' | 'High' }[];
  twinAlignmentStatus: 'Aligned' | 'Mild Divergence' | 'Severe Hallucination Risk' | 'Trust Breakdown';
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  code: string; // e.g. PS-1042
  domain: DomainType;
  location: { name: string; lat: number; lng: number; region: string };
  criticality: 'National Core' | 'Regional Hub' | 'Local Distribution';
  physicalTwin: PhysicalTwinState;
  intelligenceTwin: IntelligenceTwinState;
  trustTwin: TrustTwinState;
  realityConfidence: RealityConfidence;
  dependencies: string[]; // Asset IDs this depends on
  dependents: string[]; // Asset IDs that depend on this
  lastMaintenance: string;
}

export interface Dependency {
  id: string;
  sourceAssetId: string;
  targetAssetId: string;
  dependencyType: 'Power Feed' | 'Data Telecom' | 'Cooling Water' | 'SCADA Telemetry' | 'Control Signal';
  criticalityWeight: number; // 0 - 1.0
  activeState: 'Normal' | 'Degraded' | 'Failed' | 'Throttled';
}

export interface Incident {
  id: string;
  code: string;
  assetId: string;
  assetName: string;
  domain: DomainType;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Investigating' | 'Mitigated' | 'Resolved';
  detectedAt: string;
  realityConfidenceAtTrigger: number;
  systemHealthAtTrigger: number;
  trustScoreAtTrigger: number;
  rootCauseCategory: 'Physical Damage' | 'Cyber/Data Tampering' | 'Sensor Drift' | 'Grid Overload' | 'Communication Loss';
  affectedTwins: ('Physical' | 'Trust' | 'Intelligence')[];
}

export interface RecoveryStep {
  stepNumber: number;
  action: string;
  automated: boolean;
  estimatedMinutes: number;
  riskIfSkipped: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Skipped';
}

export interface RecoveryPlan {
  id: string;
  incidentId: string;
  assetId: string;
  title: string;
  mttrMinutes: number; // Mean Time to Recover
  readinessScore: number; // %
  steps: RecoveryStep[];
  isolationProtocol: string;
  fallbackMode: 'Air-Gapped Local Rulebook' | 'Edge Mesh Reroute' | 'Manual Operator Failover';
  verificationRequired: boolean;
}

export interface ResilienceMetric {
  domain: DomainType;
  overallResilienceScore: number; // 0 - 100
  redundancyIndex: number;
  adaptabilityScore: number;
  survivabilityIndex: number;
  cascadingSusceptibility: number; // Lower is better
  hardeningIndex: number;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  domainTarget: DomainType | 'All';
  type: 'CYBER_ATTACK' | 'SOLAR_EMP' | 'GRID_CASCADE' | 'EXTREME_MONSOON' | 'SCADA_SPOOFING' | 'SUBSTATION_FIRE' | 'CYBER_SPOOFING';
  intensity: 'Moderate' | 'Severe' | 'Catastrophic';
  estimatedImpact: string;
}

export interface SystemEvent {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARNING' | 'ALERT' | 'TRUST_DROP' | 'ANOMALY_INJECTED' | 'RECOVERY_EXEC';
  message: string;
  assetCode?: string;
}

export type GraphNodeType = 'Sensor' | 'Component' | 'Asset' | 'System' | 'Prediction' | 'Decision';
export type GraphEdgeRelation = 'MONITORS' | 'PART_OF' | 'DEPENDS_ON' | 'AFFECTS' | 'INFLUENCES';

export interface GraphNode {
  id: string;
  name: string;
  type: GraphNodeType;
  tier: number; // 0: Sensor, 1: Component, 2: Asset, 3: System, 4: Prediction, 5: Decision
  health: number; // 0 - 100
  trust: number; // 0 - 100
  status: 'Healthy' | 'Normal' | 'Drifting' | 'Faulty' | 'Degraded' | 'Critical' | 'Inconsistent' | 'Locked';
  description: string;
  observedValue?: string;
  expectedValue?: string;
  impactExplanation: string;
  evidence: string[];
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relation: GraphEdgeRelation;
  isLowTrustPath: boolean;
  trustImpactPoints: number;
}

export type ActiveTab = 
  | 'judge-demo'
  | 'overview' 
  | 'twin-engine'
  | 'digital-twin' 
  | 'telemetry' 
  | 'trust-twin' 
  | 'intelligence-twin' 
  | 'simulation-lab' 
  | 'counterfactual'
  | 'cascade'
  | 'dependency-graph' 
  | 'incidents' 
  | 'recovery' 
  | 'resilience' 
  | 'sovereignty' 
  | 'explainable-ai' 
  | 'governance' 
  | 'settings';

export interface CounterfactualControls {
  load: number; // % (10 - 120)
  temperature: number; // °C (20 - 120)
  pressure: number; // bar (1.0 - 8.0)
  voltage: number; // kV (600 - 900)
  coolingEfficiency: number; // % (0 - 100)
  networkLatency: number; // ms (1 - 100)
  sensorReliability: number; // % (10 - 100)
  redundancy: number; // 0 (N+0), 1 (N+1), 2 (N+2), 3 (N+3)
  recoveryLatency: number; // minutes (5 - 240)
}

export interface RealityStateMetrics {
  health: number; // %
  trust: number; // %
  realityConfidence: number; // %
  failureProbability: number; // %
  resilience: number; // %
  recoveryTimeMinutes: number; // mins
  affectedAssetsCount: number; // count
  affectedAssetsList: string[]; // names of impacted assets
  loadPercent: number; // %
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface SavedCounterfactualScenario {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  assetId: string;
  assetName: string;
  controls: CounterfactualControls;
  currentReality: RealityStateMetrics;
  counterfactualReality: RealityStateMetrics;
  recoveryReality: RealityStateMetrics;
}

export interface CascadeNode {
  id: string;
  name: string;
  code: string;
  category: 'Origin' | 'Thermal' | 'Power' | 'Control' | 'Telecom' | 'System Risk';
  domain: string;
  timeOffset: string; // e.g. "T+0", "T+5", "T+10", "T+15"
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  healthDrop: number; // e.g. -45%
  trustLoss: number; // e.g. -35%
  status: 'Active Failure' | 'Degraded' | 'Isolated' | 'Normal';
  impactDescription: string;
}

export interface CascadeStep {
  timeOffset: 'T+0' | 'T+5' | 'T+10' | 'T+15' | 'T+30';
  label: string; // e.g. "Initial Anomaly"
  summary: string;
  originNode: string;
  activeNodes: CascadeNode[];
  overallHealth: number; // %
  overallTrust: number; // %
  overallRisk: number; // %
  realityConfidence: number; // %
}

export interface CascadePhaseMetrics {
  phase: 'Before' | 'During' | 'After Recovery';
  title: string;
  health: number; // %
  trust: number; // %
  realityConfidence: number; // %
  failureProbability: number; // %
  overallRisk: number; // %
  affectedNodesCount: number; // count
  affectedNodesList: string[];
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  recoveryTimeMinutes: number;
}

export interface CascadeScenario {
  id: string;
  title: string;
  originAssetId: string;
  originAssetName: string;
  originAssetCode: string;
  triggerEvent: string;
  propagationPath: string[]; // e.g. ["Transformer Overheating", "Cooling Degradation", "Power Instability", "Control System Degradation", "Telecom Monitoring Degradation", "Operational Risk"]
  steps: CascadeStep[];
  beforePhase: CascadePhaseMetrics;
  duringPhase: CascadePhaseMetrics;
  afterRecoveryPhase: CascadePhaseMetrics;
}

export type RecoveryOptionName =
  | 'Reduce Load'
  | 'Activate Redundant Path'
  | 'Increase Cooling Capacity'
  | 'Switch Monitoring Path'
  | 'Increase Telemetry Verification'
  | 'Isolate Affected Component'
  | 'Increase Monitoring Frequency';

export interface RecoveryOptionSimulation {
  id: string;
  name: RecoveryOptionName;
  category: string;
  description: string;
  riskReductionPercent: number; // e.g. 78%
  recoveryTimeMinutes: number; // e.g. 12 min
  trustRequirementPercent: number; // e.g. 85%
  resilienceImprovementPercent: number; // e.g. +34%
  potentialSideEffects: string;
  confidencePercent: number; // e.g. 92%
  recommended: boolean;
  trustGatePassed: boolean;
  trustGateReason: string;
}

export interface RecoveryLatencyBudget {
  maxAllowedRecoveryTimeMinutes: number; // e.g. 30 min
  estimatedRecoveryTimeMinutes: number; // e.g. 14 min
  slackMinutes: number; // e.g. 16 min
  status: 'WITHIN BUDGET' | 'AT RISK' | 'BREACHED';
}

export interface CheckpointFreshness {
  lastValidCheckpointTimestamp: string; // e.g. "2026-08-12 12:45:00 UTC"
  checkpointAgeMinutes: number; // e.g. 8 min
  replayWindowMinutes: number; // e.g. 60 min
  checkpointTrustScore: number; // e.g. 96%
  recoveryValidity: 'VALID' | 'DEGRADED' | 'INVALID / STALE';
  hashDigest: string;
}

export type PipelineStageName =
  | 'Detect'
  | 'Verify Trust'
  | 'Diagnose'
  | 'Simulate Recovery Options'
  | 'Compare'
  | 'Recommend'
  | 'Verify Recovery'
  | 'Stable';

export interface PipelineStage {
  stage: PipelineStageName;
  status: 'Completed' | 'Active' | 'Pending' | 'Flagged';
  title: string;
  detail: string;
  timestamp: string;
  trustVerified: boolean;
}

export interface TrustAwareRecoveryPipeline {
  assetId: string;
  assetName: string;
  assetCode: string;
  dataTrustVerified: boolean;
  trustVerificationQuestion: string; // "Can we trust the data?"
  trustVerificationAnswer: string;
  trustScore: number;
  stages: PipelineStage[];
  latencyBudget: RecoveryLatencyBudget;
  checkpointFreshness: CheckpointFreshness;
  simulatedOptions: RecoveryOptionSimulation[];
  recommendedOption: RecoveryOptionSimulation;
}

export interface BharatSynapseResilienceScore {
  overallScore: number; // 0 - 100
  statusGrade: 'SUPREME RESILIENCE (AAA)' | 'HIGH RESILIENCE (AA)' | 'MODERATE RESILIENCE (A)' | 'CRITICAL VULNERABILITY (B)';
  components: {
    systemHealth: { score: number; weight: number; status: string };
    dataTrust: { score: number; weight: number; status: string };
    failureRisk: { score: number; weight: number; status: string }; // Inverted (low risk = high score)
    redundancy: { score: number; weight: number; status: string };
    recoveryReadiness: { score: number; weight: number; status: string };
    recoveryLatency: { score: number; weight: number; status: string };
    checkpointFreshness: { score: number; weight: number; status: string };
    dependencyRisk: { score: number; weight: number; status: string };
  };
  keyWeakness: string;
  recommendedHardenings: string[];
}

