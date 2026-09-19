import { InfrastructureAsset, CascadeScenario, CascadeNode, CascadeStep, CascadePhaseMetrics } from '../types';

export class CascadeEngine {
  /**
   * Generates a synthetic Cascade Simulation Scenario for a given asset.
   * Model labeled explicitly as: "Prototype cascade model - Synthetic dependency simulation"
   */
  public static generateCascadeScenario(asset: InfrastructureAsset): CascadeScenario {
    const isTransformer = asset.domain === 'Power' || asset.name.toLowerCase().includes('transformer');

    // Default Propagation Chain Path (User Prompt Example)
    const propagationPath = [
      'Transformer Overheating',
      'Cooling Degradation',
      'Power Instability',
      'Control System Degradation',
      'Telecom Monitoring Degradation',
      'Operational Risk'
    ];

    // Nodes affected across the timeline
    const nodeOrigin: CascadeNode = {
      id: `node-01-${asset.id}`,
      name: `${asset.name} (${asset.code})`,
      code: asset.code,
      category: 'Origin',
      domain: asset.domain,
      timeOffset: 'T+0',
      severity: 'Critical',
      healthDrop: 42,
      trustLoss: 18,
      status: 'Active Failure',
      impactDescription: 'Initial thermal breakdown / dielectric winding thermal overload.'
    };

    const nodeCooling: CascadeNode = {
      id: `node-02-${asset.id}`,
      name: 'Auxiliary Radiator Fan & Oil Pump APU-01',
      code: 'RAD-PUMP-01',
      category: 'Thermal',
      domain: asset.domain,
      timeOffset: 'T+5',
      severity: 'High',
      healthDrop: 68,
      trustLoss: 32,
      status: 'Active Failure',
      impactDescription: 'Oil circulation pump trip due to thermal relay trip. Rapid temperature rise.'
    };

    const nodePower: CascadeNode = {
      id: `node-03-${asset.id}`,
      name: 'Substation HV Busbar B-101 & Feeder FC-04',
      code: 'BUSBAR-B101',
      category: 'Power',
      domain: 'Power Grid',
      timeOffset: 'T+10',
      severity: 'Critical',
      healthDrop: 75,
      trustLoss: 48,
      status: 'Degraded',
      impactDescription: 'Severe voltage sag (-18%) and 50Hz frequency jitter across primary feeder.'
    };

    const nodeControl: CascadeNode = {
      id: `node-04-${asset.id}`,
      name: 'SCADA Telecommand Controller Node Alpha',
      code: 'SCADA-CTRL-01',
      category: 'Control',
      domain: 'Cyber & SCADA',
      timeOffset: 'T+10',
      severity: 'High',
      healthDrop: 58,
      trustLoss: 62,
      status: 'Degraded',
      impactDescription: 'Command latency spike to 84ms. Intermittent packet drops on IEC 61850 bus.'
    };

    const nodeTelecom: CascadeNode = {
      id: `node-05-${asset.id}`,
      name: 'Telemetry Optical Transceiver Relay B',
      code: 'OPT-TRX-B',
      category: 'Telecom',
      domain: 'Telecom',
      timeOffset: 'T+15',
      severity: 'High',
      healthDrop: 52,
      trustLoss: 74,
      status: 'Degraded',
      impactDescription: 'Fiber link buffer overflow. Remote RTU telemetry update rate dropped to 10%.'
    };

    const nodeRisk: CascadeNode = {
      id: `node-06-${asset.id}`,
      name: 'Grid Command Operations Risk Matrix',
      code: 'SYS-RISK-01',
      category: 'System Risk',
      domain: 'Operational Governance',
      timeOffset: 'T+15',
      severity: 'Critical',
      healthDrop: 84,
      trustLoss: 88,
      status: 'Active Failure',
      impactDescription: 'Cascading stability breach. Automated load shed interlock armed.'
    };

    // Timeline Steps
    const steps: CascadeStep[] = [
      {
        timeOffset: 'T+0',
        label: 'Initial Anomaly',
        summary: 'Dielectric winding temperature spikes past 98°C threshold. Initial localized anomaly triggered.',
        originNode: nodeOrigin.name,
        activeNodes: [nodeOrigin],
        overallHealth: 82,
        overallTrust: 90,
        overallRisk: 34,
        realityConfidence: 88
      },
      {
        timeOffset: 'T+5',
        label: 'Component Degradation',
        summary: 'Primary radiator cooling pump trips due to thermal lockout. Thermal dissipation efficiency drops by 65%.',
        originNode: nodeOrigin.name,
        activeNodes: [nodeOrigin, nodeCooling],
        overallHealth: 64,
        overallTrust: 76,
        overallRisk: 58,
        realityConfidence: 74
      },
      {
        timeOffset: 'T+10',
        label: 'Dependent Asset Affected',
        summary: 'HV Busbar B-101 experiences frequency jitter & voltage sag. SCADA command node suffers high latency.',
        originNode: nodeOrigin.name,
        activeNodes: [nodeOrigin, nodeCooling, nodePower, nodeControl],
        overallHealth: 42,
        overallTrust: 52,
        overallRisk: 78,
        realityConfidence: 58
      },
      {
        timeOffset: 'T+15',
        label: 'System-Level Impact',
        summary: 'Telecom optical monitoring degrades. Multi-domain cascading failure reaches peak system risk.',
        originNode: nodeOrigin.name,
        activeNodes: [nodeOrigin, nodeCooling, nodePower, nodeControl, nodeTelecom, nodeRisk],
        overallHealth: 24,
        overallTrust: 32,
        overallRisk: 92,
        realityConfidence: 38
      },
      {
        timeOffset: 'T+30',
        label: 'Automated Containment',
        summary: 'Isolator breaker tripped. Auxiliary cooling engaged. Cascading cascade vector locked and contained.',
        originNode: nodeOrigin.name,
        activeNodes: [nodeOrigin, nodeCooling, nodePower, nodeControl],
        overallHealth: 72,
        overallTrust: 84,
        overallRisk: 28,
        realityConfidence: 85
      }
    ];

    // Three Comparison Phases (Before, During, After Recovery)
    const beforePhase: CascadePhaseMetrics = {
      phase: 'Before',
      title: 'Nominal Baseline State',
      health: 94,
      trust: 96,
      realityConfidence: 92,
      failureProbability: 12,
      overallRisk: 14,
      affectedNodesCount: 0,
      affectedNodesList: ['None — Normal Operations'],
      severity: 'Low',
      recoveryTimeMinutes: 0
    };

    const duringPhase: CascadePhaseMetrics = {
      phase: 'During',
      title: 'Peak Cascade Propagation (T+15 min)',
      health: 24,
      trust: 32,
      realityConfidence: 38,
      failureProbability: 92,
      overallRisk: 92,
      affectedNodesCount: 6,
      affectedNodesList: [
        nodeOrigin.name,
        nodeCooling.name,
        nodePower.name,
        nodeControl.name,
        nodeTelecom.name,
        nodeRisk.name
      ],
      severity: 'Critical',
      recoveryTimeMinutes: 45
    };

    const afterRecoveryPhase: CascadePhaseMetrics = {
      phase: 'After Recovery',
      title: 'Post-Remediation Failsafe State',
      health: 88,
      trust: 92,
      realityConfidence: 89,
      failureProbability: 18,
      overallRisk: 22,
      affectedNodesCount: 1,
      affectedNodesList: [`Isolated: ${asset.name} (Bypassed via Auxiliary N+1 Bus)`],
      severity: 'Low',
      recoveryTimeMinutes: 12
    };

    return {
      id: `casc-${asset.id}`,
      title: isTransformer ? 'Transformer Thermal Overload & Grid Cascade' : `${asset.name} Multi-Domain Cascade`,
      originAssetId: asset.id,
      originAssetName: asset.name,
      originAssetCode: asset.code,
      triggerEvent: 'Winding Temperature Spike (>105°C) & Radiator Trip',
      propagationPath,
      steps,
      beforePhase,
      duringPhase,
      afterRecoveryPhase
    };
  }
}
