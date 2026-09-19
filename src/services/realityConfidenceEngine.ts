import { RealityConfidence, PhysicalTwinState, TrustTwinState, IntelligenceTwinState } from '../types';

export class RealityConfidenceEngine {
  /**
   * Calculates the FLAGSHIP METRIC: REALITY CONFIDENCE SCORE™
   * Answers: "How confident are we that the Digital Twin accurately represents the physical state?"
   *
   * Inputs:
   * - Data Trust
   * - Sensor Agreement
   * - Data Completeness
   * - Temporal Validity
   * - Model Confidence
   * - State Consistency
   * - Dependency Consistency
   */
  public static calculateRealityConfidence(
    assetId: string,
    physical: PhysicalTwinState,
    trust: TrustTwinState,
    intelligence: IntelligenceTwinState
  ): RealityConfidence {
    const systemHealth = physical.overallHealth;
    const dataTrust = trust.overallDataTrust;
    const predictionConfidence = intelligence.predictionConfidence;
    const sensorAgreement = trust.crossSensorAgreement ?? 100;
    const dataCompleteness = trust.dataCompleteness ?? 100;
    const temporalValidity = trust.temporalConsistency ?? 100;

    // State Consistency: Does physical state (health) logically align with active anomalies & sensor readings?
    let stateConsistency = 100;
    if (physical.status === 'Critical' || physical.status === 'Warning') {
      stateConsistency = Math.max(30, physical.overallHealth);
    }

    // Dependency Consistency: Are co-located or dependent components in expected operational agreement?
    const dependencyConsistency = Math.round((sensorAgreement + dataCompleteness) / 2);

    // Weighted Reality Confidence Calculation:
    // Core Principle: Reality Confidence is strictly bounded by Data Trust & Sensor Agreement.
    // If telemetry cannot be trusted, we CANNOT be confident that the twin represents physical reality!
    const baseTelemetryTrust = (dataTrust * 0.40) + (sensorAgreement * 0.20) + (temporalValidity * 0.15) + (dataCompleteness * 0.10);
    const modelAndStateAlignment = (predictionConfidence * 0.10) + (stateConsistency * 0.05);

    let rawScore = baseTelemetryTrust + modelAndStateAlignment;

    // Penalty if AI prediction confidence is wildly higher than underlying telemetry trust
    const trustModelGap = predictionConfidence - dataTrust;
    if (trustModelGap > 20) {
      const penalty = (trustModelGap / 100) * 18;
      rawScore -= penalty;
    }

    const score = Math.max(5, Math.min(100, Math.round(rawScore)));

    // Generate natural language explanation as specified in core principles
    let explanation = '';
    let twinAlignmentStatus: RealityConfidence['twinAlignmentStatus'] = 'Aligned';

    if (dataTrust < 50) {
      twinAlignmentStatus = 'Trust Breakdown';
      explanation = `The infrastructure may be moderately healthy (${systemHealth}%), but confidence in the available telemetry is low (${dataTrust}% Data Trust). Reality Confidence Score™ is ${score}%. Do not execute unverified autonomous actions.`;
    } else if (trustModelGap > 35) {
      twinAlignmentStatus = 'Severe Hallucination Risk';
      explanation = `AI MODEL DIVERGENCE: Prediction Confidence is ${predictionConfidence}%, but Data Trust is only ${dataTrust}%. The digital twin cannot verify physical reality with high certainty (Reality Confidence: ${score}%).`;
    } else if (score < 70) {
      twinAlignmentStatus = 'Mild Divergence';
      explanation = `MODERATE TELEMETRY DEGRADATION: Infrastructure health stands at ${systemHealth}%, Data Trust at ${dataTrust}%, and Reality Confidence at ${score}%. System requires operator verification.`;
    } else {
      twinAlignmentStatus = 'Aligned';
      explanation = `OPTIMAL REALITY ALIGNMENT: System Health (${systemHealth}%), Data Trust (${dataTrust}%), Prediction Confidence (${predictionConfidence}%), and Reality Confidence (${score}%) are in strong physical consensus.`;
    }

    // Build discrepancy factors table
    const discrepancyFactors: RealityConfidence['discrepancyFactors'] = [];

    if (sensorAgreement < 80) {
      discrepancyFactors.push({
        metric: 'Cross-Sensor Agreement',
        systemValue: `${sensorAgreement}% Consensus`,
        trustObservation: `Sensor conflict detected across adjacent telemetry channels`,
        deltaSeverity: sensorAgreement < 50 ? 'High' : 'Medium'
      });
    }

    if (dataTrust < 70) {
      discrepancyFactors.push({
        metric: 'Data Trust Index',
        systemValue: `${dataTrust}% Trust`,
        trustObservation: `Overall telemetry reliability reduced due to sensor drift or signal noise`,
        deltaSeverity: dataTrust < 45 ? 'High' : 'Medium'
      });
    }

    if (trustModelGap > 25) {
      discrepancyFactors.push({
        metric: 'AI Model vs Data Trust Gap',
        systemValue: `${trustModelGap}% Gap`,
        trustObservation: `AI prediction confidence (${predictionConfidence}%) exceeds telemetry trust (${dataTrust}%)`,
        deltaSeverity: 'High'
      });
    }

    return {
      assetId,
      score,
      systemHealth,
      dataTrust,
      predictionConfidence,
      explanation,
      discrepancyFactors,
      twinAlignmentStatus
    };
  }
}

