import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  InfrastructureAsset,
  Dependency,
  Incident,
  RecoveryPlan,
  ResilienceMetric,
  TelemetryPoint,
  SystemEvent,
  Sensor,
  ActiveTab,
  Scenario,
  DomainType,
  SavedCounterfactualScenario
} from '../types';
import {
  INITIAL_ASSETS,
  INITIAL_DEPENDENCIES,
  INITIAL_INCIDENTS,
  INITIAL_RECOVERY_PLANS,
  INITIAL_RESILIENCE_METRICS,
  SIMULATION_SCENARIOS
} from '../data/initialData';
import { TelemetryService } from '../services/telemetryService';
import { TrustEngine } from '../services/trustEngine';
import { PhysicalTwinService } from '../services/physicalTwinService';
import { IntelligenceEngine } from '../services/intelligenceEngine';
import { RealityConfidenceEngine } from '../services/realityConfidenceEngine';
import { SimulationEngine, SimulationResult } from '../services/simulationEngine';
import { RecoveryEngine } from '../services/recoveryEngine';
import { ResilienceEngine } from '../services/resilienceEngine';

interface SystemContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  assets: InfrastructureAsset[];
  selectedAsset: InfrastructureAsset;
  selectedAssetId: string;
  selectAsset: (assetId: string) => void;
  dependencies: Dependency[];
  incidents: Incident[];
  recoveryPlans: RecoveryPlan[];
  resilienceMetrics: ResilienceMetric[];
  telemetryHistory: TelemetryPoint[];
  systemEvents: SystemEvent[];
  isLive: boolean;
  toggleLive: () => void;
  resetSimulation: () => void;
  injectAnomaly: (assetId: string, anomalyType: NonNullable<TelemetryPoint['anomalyType']>) => void;
  recalibrateTrust: (assetId: string) => void;
  activeScenarioResult: SimulationResult | null;
  runScenario: (scenarioId: string) => void;
  clearScenario: () => void;
  advanceRecoveryStep: (planId: string, stepIndex: number) => void;
  resolveIncident: (incidentId: string) => void;
  selectedDomainFilter: DomainType | 'All';
  setSelectedDomainFilter: (domain: DomainType | 'All') => void;
  selectedSensorId: string | null;
  setSelectedSensorId: (sensorId: string | null) => void;
  updateSensorReliability: (assetId: string, sensorId: string, reliabilityScore: number) => void;
  updateSensorStatus: (assetId: string, sensorId: string, status: Sensor['status']) => void;
  injectSensorConflict: (assetId: string) => void;
  savedCounterfactualScenarios: SavedCounterfactualScenario[];
  saveCounterfactualScenario: (scenario: SavedCounterfactualScenario) => void;
  deleteCounterfactualScenario: (scenarioId: string) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [assets, setAssets] = useState<InfrastructureAsset[]>(INITIAL_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(INITIAL_ASSETS[0].id);
  const [dependencies] = useState<Dependency[]>(INITIAL_DEPENDENCIES);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [recoveryPlans, setRecoveryPlans] = useState<RecoveryPlan[]>(INITIAL_RECOVERY_PLANS);
  const [resilienceMetrics, setResilienceMetrics] = useState<ResilienceMetric[]>(INITIAL_RESILIENCE_METRICS);
  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryPoint[]>([]);
  const [systemEvents, setSystemEvents] = useState<SystemEvent[]>([
    { id: 'evt-1', timestamp: new Date().toLocaleTimeString(), type: 'INFO', message: 'BharatSynapse AI Intelligence Engine Initialized in SIMULATION MODE' },
    { id: 'evt-2', timestamp: new Date().toLocaleTimeString(), type: 'WARNING', message: 'Trust Twin flagged cross-sensor disagreement on PS-1042 Acoustic Transducer' },
    { id: 'evt-3', timestamp: new Date().toLocaleTimeString(), type: 'ALERT', message: 'Reality Confidence dropped to 22% on TC-888 Fiber Core Node' }
  ]);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [activeScenarioResult, setActiveScenarioResult] = useState<SimulationResult | null>(null);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<DomainType | 'All'>('All');
  const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null);
  const [savedCounterfactualScenarios, setSavedCounterfactualScenarios] = useState<SavedCounterfactualScenario[]>([]);

  const saveCounterfactualScenario = useCallback((scenario: SavedCounterfactualScenario) => {
    setSavedCounterfactualScenarios((prev) => [scenario, ...prev.filter((s) => s.id !== scenario.id)]);
    setSystemEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'INFO',
        message: `Saved Counterfactual Scenario: "${scenario.title}" for asset ${scenario.assetName}.`
      },
      ...prev
    ]);
  }, []);

  const deleteCounterfactualScenario = useCallback((scenarioId: string) => {
    setSavedCounterfactualScenarios((prev) => prev.filter((s) => s.id !== scenarioId));
    setSystemEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'INFO',
        message: `Deleted Counterfactual Scenario ID: ${scenarioId}.`
      },
      ...prev
    ]);
  }, []);

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  const selectAsset = useCallback((id: string) => {
    setSelectedAssetId(id);
  }, []);

  const toggleLive = useCallback(() => {
    setIsLive((prev) => !prev);
  }, []);

  const resetSimulation = useCallback(() => {
    setAssets(INITIAL_ASSETS);
    setIncidents(INITIAL_INCIDENTS);
    setRecoveryPlans(INITIAL_RECOVERY_PLANS);
    setResilienceMetrics(INITIAL_RESILIENCE_METRICS);
    setTelemetryHistory([]);
    setActiveScenarioResult(null);
    setSystemEvents([
      { id: `evt-${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: 'INFO', message: 'Simulation state reset to default benchmark parameters.' }
    ]);
  }, []);

  // Periodic Telemetry Tick Engine (Runs every 2.5 seconds when isLive = true)
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setAssets((prevAssets) => {
        const updated = prevAssets.map((asset) => {
          // Generate a new telemetry point
          const metricToSample = ['Temperature', 'Voltage', 'Load', 'Vibration', 'Latency'][Math.floor(Math.random() * 5)] as any;
          const tick = TelemetryService.generateTick(asset, metricToSample);

          setTelemetryHistory((prev) => [tick, ...prev.slice(0, 49)]);

          // Micro thermal/load movement
          const tempDelta = (Math.random() - 0.48) * 0.4;
          const loadDelta = (Math.random() - 0.48) * 0.5;

          const updatedPhysical = PhysicalTwinService.updatePhysicalTwin(asset, tempDelta, loadDelta);
          const updatedTrust = TrustEngine.calculateTrustState(asset.id, updatedPhysical.components.flatMap((c) => c.sensors), [], asset.trustTwin.provenance);
          const updatedIntelligence = IntelligenceEngine.calculateIntelligenceState(asset.id, updatedPhysical, updatedTrust, asset.name, asset.code);
          const updatedRealityConfidence = RealityConfidenceEngine.calculateRealityConfidence(asset.id, updatedPhysical, updatedTrust, updatedIntelligence);

          return {
            ...asset,
            physicalTwin: updatedPhysical,
            trustTwin: updatedTrust,
            intelligenceTwin: updatedIntelligence,
            realityConfidence: updatedRealityConfidence
          };
        });

        // Update resilience scores dynamically
        setResilienceMetrics((prev) =>
          prev.map((r) => ResilienceEngine.calculateDomainResilience(r.domain, updated))
        );

        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  // Inject Anomaly Action
  const injectAnomaly = useCallback((assetId: string, anomalyType: NonNullable<TelemetryPoint['anomalyType']>) => {
    setAssets((prevAssets) => {
      const targetAsset = prevAssets.find((a) => a.id === assetId);
      const assetName = targetAsset ? targetAsset.name : assetId;

      setSystemEvents((prev) => [
        {
          id: `evt-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'ANOMALY_INJECTED',
          message: `Injected synthetic anomaly (${anomalyType}) into ${assetName}. Trust Twin recalculated.`,
          assetCode: targetAsset?.code
        },
        ...prev
      ]);

      return prevAssets.map((asset) => {
        if (asset.id !== assetId) return asset;

        const updatedTrust = {
          ...asset.trustTwin,
          overallDataTrust: Math.max(10, asset.trustTwin.overallDataTrust - 40),
          sensorTrust: Math.max(15, asset.trustTwin.sensorTrust - 35),
          provenance: anomalyType === 'SPOOFED' ? ('Unverified/Tampered' as const) : asset.trustTwin.provenance,
          reductionEvidence: [
            {
              timestamp: new Date().toLocaleTimeString(),
              issue: `MANUAL ANOMALY INJECTED: ${anomalyType} on telemetry pipeline`,
              impactPoints: -40,
              source: 'UserSimulationControl'
            },
            ...asset.trustTwin.reductionEvidence
          ]
        };

        const updatedRealityConfidence = RealityConfidenceEngine.calculateRealityConfidence(
          asset.id,
          asset.physicalTwin,
          updatedTrust,
          asset.intelligenceTwin
        );

        return {
          ...asset,
          trustTwin: updatedTrust,
          realityConfidence: updatedRealityConfidence
        };
      });
    });
  }, []);

  // Recalibrate Trust
  const recalibrateTrust = useCallback((assetId: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id !== assetId) return asset;

        const updatedTrust = {
          ...asset.trustTwin,
          overallDataTrust: 95,
          sensorTrust: 96,
          streamTrust: 94,
          provenance: 'Cryptographically Verified (HSM)' as const,
          reductionEvidence: []
        };

        const updatedRealityConfidence = RealityConfidenceEngine.calculateRealityConfidence(
          asset.id,
          asset.physicalTwin,
          updatedTrust,
          asset.intelligenceTwin
        );

        return {
          ...asset,
          trustTwin: updatedTrust,
          realityConfidence: updatedRealityConfidence
        };
      })
    );

    setSystemEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'INFO',
        message: `Trust Twin recalibration executed on asset ${assetId}. HSM attestations re-verified.`
      },
      ...prev
    ]);
  }, []);

  // Update Sensor Reliability Score & Recalculate Twins
  const updateSensorReliability = useCallback((assetId: string, sensorId: string, reliabilityScore: number) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id !== assetId) return asset;

        let sensorName = 'Sensor';
        const updatedComponents = asset.physicalTwin.components.map((comp) => ({
          ...comp,
          sensors: comp.sensors.map((s) => {
            if (s.id !== sensorId) return s;
            sensorName = s.name;
            const newStatus: Sensor['status'] =
              reliabilityScore < 40 ? 'Faulty' : reliabilityScore < 70 ? 'Drifting' : 'Normal';
            return { ...s, reliabilityScore, status: newStatus };
          })
        }));

        const updatedPhysical = {
          ...asset.physicalTwin,
          components: updatedComponents
        };

        const allSensors = updatedComponents.flatMap((c) => c.sensors);
        const updatedTrust = TrustEngine.calculateTrustState(
          asset.id,
          allSensors,
          telemetryHistory,
          asset.trustTwin.provenance
        );

        const updatedIntelligence = IntelligenceEngine.calculateIntelligenceState(
          asset.id,
          updatedPhysical,
          updatedTrust,
          asset.name,
          asset.code
        );

        const updatedRealityConfidence = RealityConfidenceEngine.calculateRealityConfidence(
          asset.id,
          updatedPhysical,
          updatedTrust,
          updatedIntelligence
        );

        return {
          ...asset,
          physicalTwin: updatedPhysical,
          trustTwin: updatedTrust,
          intelligenceTwin: updatedIntelligence,
          realityConfidence: updatedRealityConfidence
        };
      })
    );

    setSystemEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: reliabilityScore < 50 ? 'TRUST_DROP' : 'INFO',
        message: `Sensor reliability updated to ${reliabilityScore}% on sensor ${sensorId}. Trust Twin & Reality Confidence recalculated.`
      },
      ...prev
    ]);
  }, [telemetryHistory]);

  // Update Sensor Status directly
  const updateSensorStatus = useCallback((assetId: string, sensorId: string, status: Sensor['status']) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id !== assetId) return asset;

        const updatedComponents = asset.physicalTwin.components.map((comp) => ({
          ...comp,
          sensors: comp.sensors.map((s) => {
            if (s.id !== sensorId) return s;
            let reliabilityScore = s.reliabilityScore;
            if (status === 'Faulty' || status === 'Unresponsive') reliabilityScore = 20;
            else if (status === 'Drifting' || status === 'Degraded') reliabilityScore = 50;
            else if (status === 'Normal') reliabilityScore = 96;
            return { ...s, status, reliabilityScore };
          })
        }));

        const updatedPhysical = {
          ...asset.physicalTwin,
          components: updatedComponents
        };

        const allSensors = updatedComponents.flatMap((c) => c.sensors);
        const updatedTrust = TrustEngine.calculateTrustState(
          asset.id,
          allSensors,
          telemetryHistory,
          asset.trustTwin.provenance
        );

        const updatedIntelligence = IntelligenceEngine.calculateIntelligenceState(
          asset.id,
          updatedPhysical,
          updatedTrust,
          asset.name,
          asset.code
        );

        const updatedRealityConfidence = RealityConfidenceEngine.calculateRealityConfidence(
          asset.id,
          updatedPhysical,
          updatedTrust,
          updatedIntelligence
        );

        return {
          ...asset,
          physicalTwin: updatedPhysical,
          trustTwin: updatedTrust,
          intelligenceTwin: updatedIntelligence,
          realityConfidence: updatedRealityConfidence
        };
      })
    );
  }, [telemetryHistory]);

  // FLAGSHIP SCENARIO: Inject Sensor Conflict (Sensor A = 82°C, Sensor B = 43°C, Sensor C = 80°C)
  const injectSensorConflict = useCallback((assetId: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id !== assetId) return asset;

        // Mutate sensors on the first component or across components to set up the exact conflict
        const components = [...asset.physicalTwin.components];
        if (components.length > 0) {
          const comp = { ...components[0] };
          const sensors = [...comp.sensors];

          // Ensure we have 3 sensors with the prompt's exact conflict values
          if (sensors.length >= 3) {
            sensors[0] = { ...sensors[0], name: 'Sensor A (Core Thermal #1)', currentValue: 82, status: 'Normal', reliabilityScore: 98, unit: '°C', type: 'Temperature' };
            sensors[1] = { ...sensors[1], name: 'Sensor B (Core Thermal #2)', currentValue: 43, status: 'Drifting', reliabilityScore: 15, unit: '°C', type: 'Temperature' };
            sensors[2] = { ...sensors[2], name: 'Sensor C (Oil Thermal #3)', currentValue: 80, status: 'Normal', reliabilityScore: 96, unit: '°C', type: 'Temperature' };
          } else if (sensors.length >= 1) {
            sensors[0] = { ...sensors[0], name: 'Sensor A (Core Thermal #1)', currentValue: 82, status: 'Normal', reliabilityScore: 98, unit: '°C', type: 'Temperature' };
            sensors.push({
              id: `sns-conflict-b-${Date.now()}`,
              name: 'Sensor B (Core Thermal #2)',
              type: 'Temperature',
              componentId: comp.id,
              unit: '°C',
              currentValue: 43,
              expectedRange: [30, 95],
              calibrationDate: '2026-01-10',
              reliabilityScore: 15,
              status: 'Drifting',
              firmwareVersion: 'v2.1',
              lastUpdated: new Date().toLocaleTimeString()
            });
            sensors.push({
              id: `sns-conflict-c-${Date.now()}`,
              name: 'Sensor C (Oil Thermal #3)',
              type: 'Temperature',
              componentId: comp.id,
              unit: '°C',
              currentValue: 80,
              expectedRange: [30, 95],
              calibrationDate: '2026-02-15',
              reliabilityScore: 96,
              status: 'Normal',
              firmwareVersion: 'v2.1',
              lastUpdated: new Date().toLocaleTimeString()
            });
          }
          comp.sensors = sensors;
          components[0] = comp;
        }

        const updatedPhysical = {
          ...asset.physicalTwin,
          components
        };

        const allSensors = components.flatMap((c) => c.sensors);

        const updatedTrust = TrustEngine.calculateTrustState(
          asset.id,
          allSensors,
          telemetryHistory,
          asset.trustTwin.provenance
        );

        const updatedIntelligence = IntelligenceEngine.calculateIntelligenceState(
          asset.id,
          updatedPhysical,
          updatedTrust,
          asset.name,
          asset.code
        );

        const updatedRealityConfidence = RealityConfidenceEngine.calculateRealityConfidence(
          asset.id,
          updatedPhysical,
          updatedTrust,
          updatedIntelligence
        );

        return {
          ...asset,
          physicalTwin: updatedPhysical,
          trustTwin: updatedTrust,
          intelligenceTwin: updatedIntelligence,
          realityConfidence: updatedRealityConfidence
        };
      })
    );

    setSystemEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'TRUST_DROP',
        message: `FLAGSHIP ANOMALY INJECTED: Sensor Conflict (Sensor A = 82°C, Sensor B = 43°C, Sensor C = 80°C). Engine identified Sensor B as inconsistent. Data Trust & Reality Confidence reduced.`
      },
      ...prev
    ]);
  }, [telemetryHistory]);

  // Run Counterfactual Scenario
  const runScenario = useCallback((scenarioId: string) => {
    const scenario = SIMULATION_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setAssets((prevAssets) => {
      const result = SimulationEngine.runScenario(scenario, prevAssets);
      setActiveScenarioResult(result);

      setSystemEvents((prev) => [
        {
          id: `evt-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'ALERT',
          message: `Executed Counterfactual Scenario: "${scenario.name}". Impacting ${result.affectedAssetCodes.length} critical assets.`
        },
        ...prev
      ]);

      return prevAssets.map((asset) => {
        if (!result.affectedAssetCodes.includes(asset.code)) return asset;

        const updatedPhysical = {
          ...asset.physicalTwin,
          overallHealth: Math.max(10, asset.physicalTwin.overallHealth + result.physicalTwinHealthDelta),
          status: asset.physicalTwin.overallHealth + result.physicalTwinHealthDelta < 60 ? ('Critical' as const) : ('Warning' as const)
        };

        const updatedTrust = {
          ...asset.trustTwin,
          overallDataTrust: Math.max(10, asset.trustTwin.overallDataTrust + result.trustTwinScoreDelta)
        };

        const updatedIntelligence = {
          ...asset.intelligenceTwin,
          failureProbability: Math.min(99, asset.intelligenceTwin.failureProbability + result.intelligenceRiskIncrease)
        };

        const updatedRealityConfidence = RealityConfidenceEngine.calculateRealityConfidence(
          asset.id,
          updatedPhysical,
          updatedTrust,
          updatedIntelligence
        );

        return {
          ...asset,
          physicalTwin: updatedPhysical,
          trustTwin: updatedTrust,
          intelligenceTwin: updatedIntelligence,
          realityConfidence: updatedRealityConfidence
        };
      });
    });
  }, []);

  const clearScenario = useCallback(() => {
    setActiveScenarioResult(null);
  }, []);

  // Advance Recovery Step
  const advanceRecoveryStep = useCallback((planId: string, stepIndex: number) => {
    setRecoveryPlans((prev) =>
      prev.map((plan) => {
        if (plan.id !== planId) return plan;
        return RecoveryEngine.executeStep(plan, stepIndex);
      })
    );

    setSystemEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'RECOVERY_EXEC',
        message: `Advanced step #${stepIndex + 1} in recovery plan ${planId}.`
      },
      ...prev
    ]);
  }, []);

  // Resolve Incident
  const resolveIncident = useCallback((incidentId: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incidentId ? { ...inc, status: 'Resolved' as const } : inc))
    );

    setSystemEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'INFO',
        message: `Incident ${incidentId} marked as Resolved following operator mitigation.`
      },
      ...prev
    ]);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        activeTab,
        setActiveTab,
        assets,
        selectedAsset,
        selectedAssetId,
        selectAsset,
        dependencies,
        incidents,
        recoveryPlans,
        resilienceMetrics,
        telemetryHistory,
        systemEvents,
        isLive,
        toggleLive,
        resetSimulation,
        injectAnomaly,
        recalibrateTrust,
        activeScenarioResult,
        runScenario,
        clearScenario,
        advanceRecoveryStep,
        resolveIncident,
        selectedDomainFilter,
        setSelectedDomainFilter,
        selectedSensorId,
        setSelectedSensorId,
        updateSensorReliability,
        updateSensorStatus,
        injectSensorConflict,
        savedCounterfactualScenarios,
        saveCounterfactualScenario,
        deleteCounterfactualScenario
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
