import { IntelligenceTwinState, PhysicalTwinState, TrustTwinState, Anomaly, AnomalyCategory, PredictionContributingFactor } from '../types';

export class IntelligenceEngine {
  /**
   * Transparent Prototype Failure Prediction & Anomaly Detection Engine
   * Strictly calculates deterministic prediction metrics from physical telemetry and trust twins.
   * Prominently labeled as 'Synthetic prototype prediction'.
   */
  public static calculateIntelligenceState(
    assetId: string,
    physical: PhysicalTwinState,
    trust: TrustTwinState,
    assetName: string = 'Substation Infrastructure Asset',
    assetCode: string = 'ASSET-101'
  ): IntelligenceTwinState {
    const timestamp = new Date().toLocaleTimeString();

    // 1. ANOMALY DETECTION Across 10 Simulated Categories
    const anomalies: Anomaly[] = [];

    // Category 1: Temperature Spike
    if (physical.temperature > 72) {
      const devPercent = ((physical.temperature - 70) / 70) * 100;
      anomalies.push({
        id: `anom-temp-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Winding & Oil Thermal Sensor Array',
        observedValue: `${physical.temperature.toFixed(1)} °C`,
        expectedValue: '70.0 °C ± 2.5 °C',
        deviation: `+${devPercent.toFixed(1)}%`,
        severity: physical.temperature > 80 ? 'Critical' : 'High',
        confidence: 95.2,
        trustScore: trust.sensorTrust,
        timestamp,
        potentialImpact: 'Winding thermal insulation breakdown, accelerated oil oxidation, and localized transformer thermal trip.',
        anomalyCategory: 'Temperature Spike'
      });
    }

    // Category 2: Voltage Instability
    if (Math.abs(physical.voltage - 760) > 12) {
      const devPercent = ((physical.voltage - 760) / 760) * 100;
      anomalies.push({
        id: `anom-volt-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Primary HV Busbar Voltage Monitor',
        observedValue: `${physical.voltage.toFixed(1)} kV`,
        expectedValue: '760.0 kV ± 10.0 kV',
        deviation: `${devPercent > 0 ? '+' : ''}${devPercent.toFixed(1)}%`,
        severity: Math.abs(devPercent) > 3 ? 'Critical' : 'High',
        confidence: 92.4,
        trustScore: trust.sensorTrust,
        timestamp,
        potentialImpact: 'Busbar voltage imbalance, harmonic resonance, and tripping of primary protection relays.',
        anomalyCategory: 'Voltage Instability'
      });
    }

    // Category 3: Pressure Deviation
    if (Math.abs(physical.pressure - 4.2) > 0.4) {
      const devPercent = ((physical.pressure - 4.2) / 4.2) * 100;
      anomalies.push({
        id: `anom-press-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'SF6 Gas / Cooling Oil Pressure Transducer',
        observedValue: `${physical.pressure.toFixed(2)} bar`,
        expectedValue: '4.20 bar ± 0.30 bar',
        deviation: `${devPercent > 0 ? '+' : ''}${devPercent.toFixed(1)}%`,
        severity: Math.abs(devPercent) > 15 ? 'Critical' : 'Medium',
        confidence: 96.1,
        trustScore: trust.sensorTrust,
        timestamp,
        potentialImpact: 'SF6 gas insulation dielectric degradation and internal arc discharge susceptibility.',
        anomalyCategory: 'Pressure Deviation'
      });
    }

    // Category 4: Load Surge
    if (physical.load > 80) {
      const devPercent = ((physical.load - 65) / 65) * 100;
      anomalies.push({
        id: `anom-load-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Substation Busbar Current & Operating Load',
        observedValue: `${physical.load.toFixed(1)}%`,
        expectedValue: '65.0% ± 10.0%',
        deviation: `+${devPercent.toFixed(1)}%`,
        severity: physical.load > 88 ? 'Critical' : 'High',
        confidence: 98.4,
        trustScore: trust.sensorTrust,
        timestamp,
        potentialImpact: 'Excessive thermal dissipation, conductor thermal expansion, and cascading load shedding.',
        anomalyCategory: 'Load Surge'
      });
    }

    // Category 5: Latency Spike
    if (physical.latency > 10) {
      const devPercent = ((physical.latency - 4) / 4) * 100;
      anomalies.push({
        id: `anom-lat-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Fiber Optical SCADA Telecommand Link',
        observedValue: `${physical.latency.toFixed(1)} ms`,
        expectedValue: '4.0 ms ± 1.5 ms',
        deviation: `+${devPercent.toFixed(1)}%`,
        severity: physical.latency > 20 ? 'High' : 'Medium',
        confidence: 91.0,
        trustScore: trust.overallDataTrust,
        timestamp,
        potentialImpact: 'Telecommand buffer queue buildup, delayed sub-second circuit breaker trip response.',
        anomalyCategory: 'Latency Spike'
      });
    }

    // Category 6: Packet Loss
    if (trust.dataCompleteness < 90) {
      const droppedPercent = (100 - trust.dataCompleteness);
      anomalies.push({
        id: `anom-pkt-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Edge Optical Network Transceiver Stream',
        observedValue: `${droppedPercent.toFixed(1)}% Dropped Packets`,
        expectedValue: '< 0.05% Packet Loss',
        deviation: `+${(droppedPercent * 200).toFixed(0)}%`,
        severity: trust.dataCompleteness < 70 ? 'Critical' : 'High',
        confidence: 94.8,
        trustScore: trust.dataCompleteness,
        timestamp,
        potentialImpact: 'Telemetry frame gaps, corrupted state estimation, and dropped emergency trip signals.',
        anomalyCategory: 'Packet Loss'
      });
    }

    // Category 7: Error-Rate Jump
    if (physical.errorRate > 0.2) {
      const devPercent = (physical.errorRate / 0.05) * 100;
      anomalies.push({
        id: `anom-err-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Digital Gateway Bit Error Rate (BER)',
        observedValue: `${physical.errorRate.toFixed(2)}%`,
        expectedValue: '< 0.05%',
        deviation: `+${devPercent.toFixed(0)}%`,
        severity: physical.errorRate > 1.0 ? 'Critical' : 'High',
        confidence: 93.7,
        trustScore: trust.overallDataTrust,
        timestamp,
        potentialImpact: 'Digital message corruption, CRC checksum rejection, and communication lockouts.',
        anomalyCategory: 'Error-Rate Jump'
      });
    }

    // Category 8: Sensor Disagreement
    if (trust.crossSensorAgreement < 75 || trust.sensorTrust < 60) {
      anomalies.push({
        id: `anom-sens-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Cross-Sensor Correlation Array (Sensors A, B, C)',
        observedValue: `Sensor B: 43.0°C vs Peer Consensus: 82.0°C`,
        expectedValue: 'Cross-Sensor Delta < 2.5 °C',
        deviation: `-${(100 - trust.crossSensorAgreement).toFixed(1)}% Agreement`,
        severity: 'Critical',
        confidence: 97.8,
        trustScore: trust.crossSensorAgreement,
        timestamp,
        potentialImpact: 'Unreliable physical twin telemetry stream, risk of AI hallucination, triggering safety air-gap lockout.',
        anomalyCategory: 'Sensor Disagreement'
      });
    }

    // Category 9: Resource Saturation
    if (physical.load > 75 || physical.temperature > 75) {
      const cpuLoad = Math.min(98, Math.round(65 + physical.load * 0.3));
      anomalies.push({
        id: `anom-res-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Edge SCADA Control Node CPU & Memory',
        observedValue: `${cpuLoad}% CPU / ${(cpuLoad - 3)}% RAM`,
        expectedValue: '< 65.0% Utilization',
        deviation: `+${(((cpuLoad - 65) / 65) * 100).toFixed(1)}%`,
        severity: cpuLoad > 90 ? 'High' : 'Medium',
        confidence: 89.9,
        trustScore: 92,
        timestamp,
        potentialImpact: 'Thread queue exhaustion, delayed polling loops, and watchdog hardware reset.',
        anomalyCategory: 'Resource Saturation'
      });
    }

    // Category 10: Vibration Anomalies
    if (physical.vibration > 2.0) {
      const devPercent = ((physical.vibration - 1.2) / 1.2) * 100;
      anomalies.push({
        id: `anom-vibr-${assetId}`,
        assetId,
        assetName,
        assetCode,
        signal: 'Acoustic & Mechanical Vibration Transducer',
        observedValue: `${physical.vibration.toFixed(2)} mm/s`,
        expectedValue: '< 1.20 mm/s',
        deviation: `+${devPercent.toFixed(1)}%`,
        severity: physical.vibration > 3.2 ? 'Critical' : 'Medium',
        confidence: 91.5,
        trustScore: trust.sensorTrust,
        timestamp,
        potentialImpact: 'Transformer core loose clamping, acoustic harmonic resonance, and mechanical fatigue failure.',
        anomalyCategory: 'Vibration Anomaly'
      });
    }

    // 2. TRANSPARENT PROTOTYPE FAILURE PREDICTION MODEL
    // Calculate deterministic weights from telemetry state
    const tempDev = Math.max(0, Math.round(((physical.temperature - 70) / 70) * 100));
    const loadDev = Math.max(0, Math.round(((physical.load - 65) / 65) * 100));
    const coolingDev = Math.max(0, Math.round((100 - (100 - (physical.temperature - 60) * 1.5))));
    const errorDev = Math.max(0, Math.round(physical.errorRate * 50));
    const vibrDev = Math.max(0, Math.round(((physical.vibration - 1.2) / 1.2) * 100));
    const trustPenalty = Math.max(0, Math.round(100 - trust.overallDataTrust));

    // Formulate Contributing Factors (Explainability: WHY DID THE RISK INCREASE?)
    const contributingFactors: PredictionContributingFactor[] = [
      {
        factorName: 'Temperature Deviation',
        valueChange: `+${tempDev}%`,
        impactWeightPercent: 31,
        direction: 'INCREASE',
        explanation: 'Elevated thermal stress on winding insulation accelerates dielectric aging.'
      },
      {
        factorName: 'Operating Load Surge',
        valueChange: `+${loadDev}%`,
        impactWeightPercent: 18,
        direction: 'INCREASE',
        explanation: 'Operating current exceeding baseline increases continuous resistive heating.'
      },
      {
        factorName: 'Cooling Efficiency Loss',
        valueChange: `-${coolingDev > 0 ? coolingDev : 14}%`,
        impactWeightPercent: 14,
        direction: 'DECREASE',
        explanation: 'Radiator SF6 / oil circulation throughput operating below optimal rating.'
      },
      {
        factorName: 'Telemetry Error Rate Jump',
        valueChange: `+${errorDev > 0 ? errorDev : 11}%`,
        impactWeightPercent: 11,
        direction: 'INCREASE',
        explanation: 'Elevated bit error rate introduces SCADA command frame retransmissions.'
      }
    ];

    if (trustPenalty > 20) {
      contributingFactors.push({
        factorName: 'Sensor Disagreement / Drift',
        valueChange: `-${trustPenalty}% Trust`,
        impactWeightPercent: 26,
        direction: 'DECREASE',
        explanation: 'Cross-sensor divergence detected between thermal sensors A, B, and C.'
      });
    }

    // Deterministic Failure Probability Formula
    let rawFailureProb = Math.round(
      5 +
      tempDev * 0.40 +
      loadDev * 0.25 +
      coolingDev * 0.20 +
      errorDev * 0.15 +
      vibrDev * 0.20 +
      trustPenalty * 0.30
    );

    const failureProbability = Math.min(98, Math.max(2, rawFailureProb));

    // Estimated Failure Window Countdown
    let estimatedFailureWindow = '> 100 Hours (Stable)';
    if (failureProbability >= 80) {
      estimatedFailureWindow = '1h 45m';
    } else if (failureProbability >= 65) {
      estimatedFailureWindow = '4h 20m';
    } else if (failureProbability >= 45) {
      estimatedFailureWindow = '14h 30m';
    } else if (failureProbability >= 25) {
      estimatedFailureWindow = '38h 15m';
    }

    // Risk Level Classification
    let riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' = 'Low';
    if (failureProbability >= 70) riskLevel = 'Critical';
    else if (failureProbability >= 45) riskLevel = 'High';
    else if (failureProbability >= 25) riskLevel = 'Medium';

    // Prediction Confidence vs Data Trust
    const dataTrust = trust.overallDataTrust;
    const realityConfidence = Math.round(dataTrust * 0.5 + (100 - failureProbability) * 0.3 + 20);
    const predictionConfidence = Math.round(Math.min(96, Math.max(60, 92 - (100 - trust.crossSensorAgreement) * 0.3)));

    // Potential Impact Scope
    let potentialImpact: IntelligenceTwinState['potentialImpact'] = 'Minor';
    if (failureProbability > 75) potentialImpact = 'Catastrophic';
    else if (failureProbability > 50) potentialImpact = 'Severe';
    else if (failureProbability > 30) potentialImpact = 'Moderate';

    // Supporting Evidence Text
    const supportingEvidence: string[] = [
      `Temperature deviation (+${tempDev}%) and current load (+${loadDev}%) drive thermal stress model.`,
      `Telemetry Data Trust evaluated at ${dataTrust}% with ${anomalies.length} active signal anomaly detection triggers.`,
      `Cross-stream sensor correlation agreement is currently at ${trust.crossSensorAgreement}%.`
    ];

    if (trustPenalty > 20) {
      supportingEvidence.push(`Sensor disagreement flagged on Thermal Transducer Array. Sensor B reliability penalized.`);
    }

    return {
      assetId,
      modelLabel: 'Synthetic prototype prediction',
      disclaimer: 'Synthetic prototype prediction - Do not claim real predictive accuracy.',
      predictedState: failureProbability > 65 ? 'Critical' : failureProbability > 30 ? 'Warning' : 'Healthy',
      anomalies,
      failureProbability,
      estimatedFailureWindow,
      riskLevel,
      predictionConfidence,
      dataTrust,
      realityConfidence,
      potentialImpact,
      contributingFactors,
      supportingEvidence,
      causalFactors: [
        { factor: 'Thermal Deviation (+31%)', weight: tempDev > 0 ? 0.35 : 0.15 },
        { factor: 'Operating Load Surge (+18%)', weight: loadDev > 0 ? 0.25 : 0.15 },
        { factor: 'Cooling Efficiency Loss (-14%)', weight: 0.20 },
        { factor: 'Bit Error Rate (+11%)', weight: 0.15 }
      ],
      scenarioForecasts: [
        { timeAhead: '+2 Hours', predictedHealth: Math.max(10, physical.overallHealth - 4), riskLevel: failureProbability > 50 ? 'High' : 'Moderate' },
        { timeAhead: '+6 Hours', predictedHealth: Math.max(10, physical.overallHealth - 12), riskLevel: failureProbability > 50 ? 'Severe' : 'High' },
        { timeAhead: '+12 Hours', predictedHealth: Math.max(10, physical.overallHealth - 22), riskLevel: failureProbability > 50 ? 'Catastrophic' : 'Severe' }
      ],
      estimatedTimeToFailure: estimatedFailureWindow
    };
  }
}
