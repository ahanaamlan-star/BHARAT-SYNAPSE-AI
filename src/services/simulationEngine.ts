import { Scenario, InfrastructureAsset, DomainType } from '../types';

export interface SimulationResult {
  scenario: Scenario;
  affectedAssetCodes: string[];
  physicalTwinHealthDelta: number;
  trustTwinScoreDelta: number;
  intelligenceRiskIncrease: number;
  realityConfidenceDelta: number;
  cascadingImpactSummary: string;
  recommendedCountermeasure: string;
}

export class SimulationEngine {
  /**
   * Runs counterfactual simulation scenarios and predicts side-by-side twin collapse or stability.
   */
  public static runScenario(
    scenario: Scenario,
    assets: InfrastructureAsset[]
  ): SimulationResult {
    let affectedAssets = assets;
    if (scenario.domainTarget !== 'All') {
      affectedAssets = assets.filter((a) => a.domain === (scenario.domainTarget as DomainType));
    }

    const affectedAssetCodes = affectedAssets.map((a) => a.code);

    let healthDelta = -10;
    let trustDelta = -15;
    let riskIncrease = 25;
    let rcDelta = -20;
    let summary = '';
    let countermeasure = '';

    switch (scenario.type) {
      case 'CYBER_ATTACK':
        healthDelta = -8;
        trustDelta = -55;
        riskIncrease = 45;
        rcDelta = -50;
        summary = 'Unverified packet stream triggers severe Data Trust collapse. Physical infrastructure remains operating but AI is completely blind to real physical parameters.';
        countermeasure = 'Initiate HSM Cryptographic Air-Gap Isolation Protocol. Freeze automated SCADA actuations.';
        break;

      case 'SOLAR_EMP':
        healthDelta = -42;
        trustDelta = -30;
        riskIncrease = 60;
        rcDelta = -38;
        summary = 'Geomagnetically induced current causes thermal surge on primary autotransformers, inducing acoustic harmonics and sensor noise.';
        countermeasure = 'Trigger automated load-shedding relays on Western Grid and engage static VAR compensators.';
        break;

      case 'GRID_CASCADE':
        healthDelta = -28;
        trustDelta = -20;
        riskIncrease = 50;
        rcDelta = -30;
        summary = 'Primary transmission trip propagates N-2 contingency load spikes to water aqueduct pumps and industrial crackers.';
        countermeasure = 'Activate regional edge mesh islanding; failover to local hydro storage turbines.';
        break;

      case 'EXTREME_MONSOON':
        healthDelta = -15;
        trustDelta = -25;
        riskIncrease = 20;
        rcDelta = -18;
        summary = 'Acoustic vibration noise from high-head hydrostatic surge causes minor sensor drift.';
        countermeasure = 'Engage low-pass temporal smoothing filter on Trust Engine telemetry ingestion pipeline.';
        break;
    }

    return {
      scenario,
      affectedAssetCodes,
      physicalTwinHealthDelta: healthDelta,
      trustTwinScoreDelta: trustDelta,
      intelligenceRiskIncrease: riskIncrease,
      realityConfidenceDelta: rcDelta,
      cascadingImpactSummary: summary,
      recommendedCountermeasure: countermeasure
    };
  }
}
