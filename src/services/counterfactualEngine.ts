import { InfrastructureAsset, CounterfactualControls, RealityStateMetrics } from '../types';

export class CounterfactualEngine {
  /**
   * Calculates Default Baseline Controls derived from live asset telemetry.
   */
  public static getInitialControls(asset: InfrastructureAsset): CounterfactualControls {
    const pt = asset.physicalTwin;
    const tt = asset.trustTwin;

    return {
      load: Math.round(pt.load || 72),
      temperature: Math.round(pt.temperature || 68),
      pressure: Number((pt.pressure || 4.2).toFixed(1)),
      voltage: Math.round(pt.voltage || 760),
      coolingEfficiency: 85,
      networkLatency: Number((pt.latency || 4.0).toFixed(1)),
      sensorReliability: Math.round(tt.sensorTrust || 95),
      redundancy: 1, // N+1 by default
      recoveryLatency: 30 // 30 minutes default
    };
  }

  /**
   * Calculates CURRENT REALITY metrics from live asset twins.
   * Does NOT modify any underlying state.
   */
  public static calculateCurrentReality(asset: InfrastructureAsset): RealityStateMetrics {
    const pt = asset.physicalTwin;
    const tt = asset.trustTwin;
    const it = asset.intelligenceTwin;
    const rc = asset.realityConfidence;

    const health = Math.round(pt.overallHealth || 88);
    const trust = Math.round(tt.overallDataTrust || 94);
    const failureProb = Math.round(it.failureProbability || 18);
    const realityConf = Math.round(rc.score || 89);
    const resilience = Math.max(10, Math.min(100, Math.round(health * 0.35 + trust * 0.35 + (100 - failureProb) * 0.30)));
    const recoveryTime = Math.round(20 + (100 - health) * 1.4 + failureProb * 0.8);
    const affectedCount = failureProb > 65 ? 3 : failureProb > 35 ? 2 : 1;

    let riskLevel: RealityStateMetrics['riskLevel'] = 'Low';
    if (failureProb >= 70) riskLevel = 'Critical';
    else if (failureProb >= 45) riskLevel = 'High';
    else if (failureProb >= 25) riskLevel = 'Medium';

    const downstreamPool = [
      asset.name,
      'Substation HV Busbar B-101',
      'SCADA Telecommand Node Alpha',
      'Feeder Circuit Breaker FC-04',
      'Auxiliary Power Unit APU-2'
    ];

    return {
      health,
      trust,
      realityConfidence: realityConf,
      failureProbability: failureProb,
      resilience,
      recoveryTimeMinutes: recoveryTime,
      affectedAssetsCount: affectedCount,
      affectedAssetsList: downstreamPool.slice(0, affectedCount),
      loadPercent: Math.round(pt.load || 72),
      riskLevel
    };
  }

  /**
   * Calculates COUNTERFACTUAL REALITY & RECOVERY REALITY metrics.
   * Deterministic mathematical evaluation based strictly on input controls.
   * Pure function: Zero side effects or mutations to live current reality state.
   */
  public static simulateCounterfactual(
    asset: InfrastructureAsset,
    controls: CounterfactualControls
  ): {
    counterfactualReality: RealityStateMetrics;
    recoveryReality: RealityStateMetrics;
  } {
    // 1. Calculate Stress Factors from Controls
    const tempStress = Math.max(0, (controls.temperature - 65) / 55);
    const loadStress = Math.max(0, (controls.load - 65) / 55);
    const pressureDev = Math.abs(controls.pressure - 4.2) / 3.8;
    const voltageDev = Math.abs(controls.voltage - 760) / 140;
    const coolingLoss = (100 - controls.coolingEfficiency) / 100;
    const latencyStress = Math.max(0, (controls.networkLatency - 4) / 96);
    const sensorDefect = (100 - controls.sensorReliability) / 100;
    const redundancyMitigation = controls.redundancy * 0.12; // N+1 = -12%, N+2 = -24%, N+3 = -36%

    // 2. COUNTERFACTUAL REALITY METRICS
    const rawStressScore = (
      tempStress * 30 +
      loadStress * 28 +
      pressureDev * 15 +
      voltageDev * 15 +
      coolingLoss * 20 +
      latencyStress * 12 +
      sensorDefect * 22
    );

    const cfFailureProb = Math.min(98, Math.max(3, Math.round(rawStressScore * (1 - redundancyMitigation))));

    const cfHealth = Math.max(
      5,
      Math.min(100, Math.round(100 - (tempStress * 38 + loadStress * 32 + coolingLoss * 22 + pressureDev * 14 + voltageDev * 12)))
    );

    const cfTrust = Math.max(
      10,
      Math.min(100, Math.round(controls.sensorReliability - (latencyStress * 28 + sensorDefect * 15)))
    );

    const cfRealityConf = Math.max(
      10,
      Math.min(100, Math.round(cfTrust * 0.5 + (100 - cfFailureProb) * 0.4 + 10))
    );

    const cfResilience = Math.max(
      5,
      Math.min(100, Math.round((cfHealth * 0.35 + cfTrust * 0.35 + (100 - cfFailureProb) * 0.30) * (1 + controls.redundancy * 0.10)))
    );

    const cfRecoveryTime = Math.round(controls.recoveryLatency * 0.5 + (100 - cfHealth) * 2.4 + cfFailureProb * 2.0);

    const cfAffectedCount = Math.max(
      1,
      Math.min(10, Math.floor(1 + (cfFailureProb / 100) * 6 + (1 - controls.redundancy * 0.25) * 3))
    );

    let cfRiskLevel: RealityStateMetrics['riskLevel'] = 'Low';
    if (cfFailureProb >= 70) cfRiskLevel = 'Critical';
    else if (cfFailureProb >= 45) cfRiskLevel = 'High';
    else if (cfFailureProb >= 25) cfRiskLevel = 'Medium';

    const cascadingAssetPool = [
      asset.name,
      'Substation HV Busbar B-101',
      'Step-Down Transformer TR-02',
      'SCADA Telecommand Node Alpha',
      'Feeder Circuit Breaker FC-04',
      'Auxiliary Power Transformer APU-2',
      'Regional Transmission Interconnect',
      'City Grid Zone 4 Distribution Line',
      'Substation Backup Generator Unit',
      'Telemetry Optical Transceiver B'
    ];

    const counterfactualReality: RealityStateMetrics = {
      health: cfHealth,
      trust: cfTrust,
      realityConfidence: cfRealityConf,
      failureProbability: cfFailureProb,
      resilience: cfResilience,
      recoveryTimeMinutes: cfRecoveryTime,
      affectedAssetsCount: cfAffectedCount,
      affectedAssetsList: cascadingAssetPool.slice(0, cfAffectedCount),
      loadPercent: Math.round(controls.load),
      riskLevel: cfRiskLevel
    };

    // 3. RECOVERY REALITY METRICS (Simulated Failsafe & Mitigation State)
    const recFailureProb = Math.max(2, Math.round(cfFailureProb * 0.28 - controls.redundancy * 6));
    const recHealth = Math.min(98, Math.round(cfHealth + (100 - cfHealth) * 0.72));
    const recTrust = Math.min(98, Math.round(cfTrust + 18));
    const recRealityConf = Math.min(98, Math.round(recTrust * 0.50 + (100 - recFailureProb) * 0.42 + 8));
    const recResilience = Math.min(98, Math.round(cfResilience + 36));
    const recRecoveryTime = Math.round(controls.recoveryLatency * 0.35 + 8);
    const recLoadPercent = Math.min(controls.load, 78);

    let recRiskLevel: RealityStateMetrics['riskLevel'] = 'Low';
    if (recFailureProb >= 70) recRiskLevel = 'Critical';
    else if (recFailureProb >= 45) recRiskLevel = 'High';
    else if (recFailureProb >= 25) recRiskLevel = 'Medium';

    const recoveryReality: RealityStateMetrics = {
      health: recHealth,
      trust: recTrust,
      realityConfidence: recRealityConf,
      failureProbability: recFailureProb,
      resilience: recResilience,
      recoveryTimeMinutes: recRecoveryTime,
      affectedAssetsCount: 1,
      affectedAssetsList: [asset.name],
      loadPercent: recLoadPercent,
      riskLevel: recRiskLevel
    };

    return {
      counterfactualReality,
      recoveryReality
    };
  }
}
