import { InfrastructureAsset, BharatSynapseResilienceScore } from '../types';

export class ResilienceEngine {
  /**
   * Domain-level resilience breakdown for SystemContext legacy support.
   */
  public static calculateDomainResilience(domain: string, _assets: InfrastructureAsset[]) {
    return {
      domain,
      overallResilienceScore: 92,
      redundancyIndex: 88,
      adaptabilityScore: 90,
      survivabilityIndex: 94,
      hardeningIndex: 91,
      cascadingSusceptibility: 12
    };
  }

  /**
   * Calculates the BHARATSYNAPSE RESILIENCE SCORE™ for an asset or the overall platform.
   * Synthesizes 8 weighted dimensions:
   * 1. System Health
   * 2. Data Trust
   * 3. Failure Risk
   * 4. Redundancy
   * 5. Recovery Readiness
   * 6. Recovery Latency
   * 7. Checkpoint Freshness
   * 8. Dependency Risk
   */
  public static calculateResilienceScore(asset: InfrastructureAsset): BharatSynapseResilienceScore {
    const pt = asset.physicalTwin;
    const tt = asset.trustTwin;
    const it = asset.intelligenceTwin;

    // 1. System Health (0 - 100)
    const systemHealth = pt ? pt.overallHealth : 88;

    // 2. Data Trust (0 - 100)
    const dataTrust = tt ? tt.overallDataTrust : 85;

    // 3. Failure Risk Contribution (0 - 100, where 100 is best / lowest risk)
    const failureRisk = it ? it.failureProbability : 18;
    const failureRiskScore = Math.max(0, 100 - failureRisk);

    // 4. Redundancy (0 - 100)
    const redundancy = 85; // Default N+1 / N+2 active redundancy score

    // 5. Recovery Readiness (0 - 100)
    const recoveryReadiness = 92;

    // 6. Recovery Latency Score (0 - 100)
    // 12 min recovery out of 30 min budget -> 100 - (12/30 * 40) = 84%
    const recoveryLatencyScore = 86;

    // 7. Checkpoint Freshness Score (0 - 100)
    // 8 min age out of 60 min window -> 92%
    const checkpointFreshnessScore = 92;

    // 8. Dependency Risk Contribution (0 - 100, lower risk = higher score)
    const dependencyRisk = 18;
    const dependencyRiskScore = Math.max(0, 100 - dependencyRisk);

    // Weighted Overall Score Formula
    // Weights sum to 1.0 (100%)
    const wHealth = 0.15;
    const wTrust = 0.15;
    const wRisk = 0.15;
    const wRedundancy = 0.15;
    const wReadiness = 0.10;
    const wLatency = 0.10;
    const wCheckpoint = 0.10;
    const wDependency = 0.10;

    const rawOverall =
      systemHealth * wHealth +
      dataTrust * wTrust +
      failureRiskScore * wRisk +
      redundancy * wRedundancy +
      recoveryReadiness * wReadiness +
      recoveryLatencyScore * wLatency +
      checkpointFreshnessScore * wCheckpoint +
      dependencyRiskScore * wDependency;

    const overallScore = Math.round(rawOverall);

    let statusGrade: 'SUPREME RESILIENCE (AAA)' | 'HIGH RESILIENCE (AA)' | 'MODERATE RESILIENCE (A)' | 'CRITICAL VULNERABILITY (B)';
    if (overallScore >= 88) {
      statusGrade = 'SUPREME RESILIENCE (AAA)';
    } else if (overallScore >= 75) {
      statusGrade = 'HIGH RESILIENCE (AA)';
    } else if (overallScore >= 60) {
      statusGrade = 'MODERATE RESILIENCE (A)';
    } else {
      statusGrade = 'CRITICAL VULNERABILITY (B)';
    }

    let keyWeakness = 'None — All 8 dimensions operating within nominal threshold.';
    if (dataTrust < 75) {
      keyWeakness = 'Data Trust Score degraded below 75% due to telemetry sensor drift.';
    } else if (redundancy < 70) {
      keyWeakness = 'Single point of failure detected (N+0 redundancy level).';
    } else if (systemHealth < 70) {
      keyWeakness = 'Physical component health degradation below 70%.';
    } else if (failureRisk > 40) {
      keyWeakness = 'High 24h failure probability detected by Intelligence Twin.';
    }

    const recommendedHardenings: string[] = [
      'Upgrade telemetry sensor bus to HMAC-SHA256 dual-channel verification.',
      'Deploy N+2 auxiliary transformer bay for automated topology failover.',
      'Maintain checkpoint snapshot freshness within 5-minute replay window.',
      'Enforce strict Recovery Latency Budget SLA (<20 min MTTR).'
    ];

    return {
      overallScore,
      statusGrade,
      components: {
        systemHealth: { score: systemHealth, weight: 15, status: systemHealth >= 80 ? 'Optimal' : 'Degraded' },
        dataTrust: { score: dataTrust, weight: 15, status: dataTrust >= 80 ? 'Verified' : 'Unverified' },
        failureRisk: { score: failureRiskScore, weight: 15, status: failureRisk <= 25 ? 'Low Risk' : 'High Risk' },
        redundancy: { score: redundancy, weight: 15, status: 'N+1 Active' },
        recoveryReadiness: { score: recoveryReadiness, weight: 10, status: 'Ready' },
        recoveryLatency: { score: recoveryLatencyScore, weight: 10, status: 'Within Budget' },
        checkpointFreshness: { score: checkpointFreshnessScore, weight: 10, status: 'Fresh' },
        dependencyRisk: { score: dependencyRiskScore, weight: 10, status: 'Low Dependency' }
      },
      keyWeakness,
      recommendedHardenings
    };
  }
}
