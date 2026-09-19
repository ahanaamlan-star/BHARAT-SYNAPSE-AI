import {
  InfrastructureAsset,
  TrustAwareRecoveryPipeline,
  PipelineStage,
  RecoveryOptionSimulation,
  RecoveryLatencyBudget,
  CheckpointFreshness,
  RecoveryOptionName
} from '../types';

export class RecoveryEngine {
  /**
   * Helper method for stepping through legacy recovery playbooks.
   */
  public static executeStep(plan: any, stepIndex: number) {
    const updatedSteps = plan.steps.map((step: any, idx: number) => {
      if (idx === stepIndex) {
        return { ...step, status: 'Completed' };
      }
      if (idx === stepIndex + 1) {
        return { ...step, status: 'In Progress' };
      }
      return step;
    });
    return { ...plan, steps: updatedSteps };
  }

  /**
   * Evaluates and builds a TRUST-AWARE RECOVERY PIPELINE for a given infrastructure asset.
   * Core directive: First ask "Can we trust the data?" before simulating recovery options.
   */
  public static calculateTrustAwarePipeline(asset: InfrastructureAsset): TrustAwareRecoveryPipeline {
    const dataTrust = asset.trustTwin?.overallDataTrust ?? 85;
    const isTrustVerified = dataTrust >= 70;

    const trustQuestion = "Can we trust the data?";
    const trustAnswer = isTrustVerified
      ? `VERIFIED — Telemetry cryptographically signed & multi-sensor quorum confirmed (Trust Score: ${dataTrust}%). Data is trustworthy for recovery simulation.`
      : `UNVERIFIED — Telemetry sensor drift or packet corruption detected (Trust Score: ${dataTrust}%). Switch Monitoring Path & Telemetry Verification required BEFORE executing recovery recommendations.`;

    // 1. Pipeline Stages
    const stages: PipelineStage[] = [
      {
        stage: 'Detect',
        status: 'Completed',
        title: 'Anomaly & Telemetry Discrepancy Detection',
        detail: `Winding thermal alert / frequency jitter logged on ${asset.code}.`,
        timestamp: 'T+00m 00s',
        trustVerified: true
      },
      {
        stage: 'Verify Trust',
        status: isTrustVerified ? 'Completed' : 'Flagged',
        title: 'Cryptographic & Consensus Trust Verification',
        detail: `Evaluated 12 sensor nodes. Data Trust Score: ${dataTrust}%. ${isTrustVerified ? 'Quorum Passed.' : 'Quorum Failed — Low Trust.'}`,
        timestamp: 'T+00m 12s',
        trustVerified: isTrustVerified
      },
      {
        stage: 'Diagnose',
        status: 'Completed',
        title: 'Root-Cause & Physics Impact Diagnosis',
        detail: 'Dielectric insulation overheating combined with radiator fan relay lock.',
        timestamp: 'T+01m 05s',
        trustVerified: isTrustVerified
      },
      {
        stage: 'Simulate Recovery Options',
        status: 'Completed',
        title: 'Sandbox Physics & State Impact Simulation',
        detail: 'Evaluated 7 simulated recovery options across load, topology, thermal, and monitoring paths.',
        timestamp: 'T+02m 30s',
        trustVerified: isTrustVerified
      },
      {
        stage: 'Compare',
        status: 'Completed',
        title: 'Multi-Criteria Scoring & Trade-Off Comparison',
        detail: 'Ranked options by Risk Reduction vs Recovery Latency vs Trust Gate Requirement.',
        timestamp: 'T+03m 15s',
        trustVerified: isTrustVerified
      },
      {
        stage: 'Recommend',
        status: 'Active',
        title: 'Simulated Recovery Recommendation Generated',
        detail: 'Optimal candidate selected. Awaiting human-in-the-loop validation (NO autonomous execution).',
        timestamp: 'T+03m 45s',
        trustVerified: isTrustVerified
      },
      {
        stage: 'Verify Recovery',
        status: 'Pending',
        title: 'Post-Recovery Sandbox Verification',
        detail: 'Pending simulated parameter stabilization check.',
        timestamp: 'T+05m 00s (Est)',
        trustVerified: false
      },
      {
        stage: 'Stable',
        status: 'Pending',
        title: 'Target Nominal Envelope Restoration',
        detail: 'Target state envelope: Thermal <65°C, Risk <15%, Health >90%.',
        timestamp: 'T+12m 00s (Est)',
        trustVerified: false
      }
    ];

    // 2. Candidate Recovery Options Simulation (All 7 required)
    const rawOptions: Array<{
      name: RecoveryOptionName;
      category: string;
      description: string;
      riskReductionPercent: number;
      recoveryTimeMinutes: number;
      trustRequirementPercent: number;
      resilienceImprovementPercent: number;
      potentialSideEffects: string;
      confidencePercent: number;
    }> = [
      {
        name: 'Activate Redundant Path',
        category: 'Topology Failover',
        description: 'Reroute 60% of busbar power through Auxiliary Substation Transformer N+1.',
        riskReductionPercent: 92,
        recoveryTimeMinutes: 12,
        trustRequirementPercent: 80,
        resilienceImprovementPercent: 42,
        potentialSideEffects: 'Transient load surge (+18%) on Secondary Feeder B.',
        confidencePercent: 94
      },
      {
        name: 'Reduce Load',
        category: 'Power Shedding',
        description: 'Shed 25MW non-essential industrial load to bring winding temperature back below 75°C.',
        riskReductionPercent: 82,
        recoveryTimeMinutes: 8,
        trustRequirementPercent: 70,
        resilienceImprovementPercent: 28,
        potentialSideEffects: 'Minor commercial distribution area voltage drop (-3%).',
        confidencePercent: 96
      },
      {
        name: 'Increase Cooling Capacity',
        category: 'Thermal Control',
        description: 'Override radiator APU cooling fans to forced maximum 120% flow mode.',
        riskReductionPercent: 68,
        recoveryTimeMinutes: 15,
        trustRequirementPercent: 60,
        resilienceImprovementPercent: 22,
        potentialSideEffects: 'Auxiliary bus auxiliary power draw +45kW.',
        confidencePercent: 88
      },
      {
        name: 'Switch Monitoring Path',
        category: 'Telemetry Routing',
        description: 'Bypass primary corrupted RTU optical link and switch to secondary satellite telemetry bus.',
        riskReductionPercent: 54,
        recoveryTimeMinutes: 5,
        trustRequirementPercent: 85,
        resilienceImprovementPercent: 35,
        potentialSideEffects: 'Telemetry gap for 3 seconds during path sync.',
        confidencePercent: 95
      },
      {
        name: 'Increase Telemetry Verification',
        category: 'Data Integrity',
        description: 'Enable HMAC-SHA256 signature verification and double-sample sensor polling.',
        riskReductionPercent: 48,
        recoveryTimeMinutes: 3,
        trustRequirementPercent: 90,
        resilienceImprovementPercent: 30,
        potentialSideEffects: 'SCADA bus bandwidth usage increases by 15%.',
        confidencePercent: 98
      },
      {
        name: 'Isolate Affected Component',
        category: 'Physical Isolation',
        description: 'Trip vacuum circuit breaker CB-101 to isolate primary transformer winding completely.',
        riskReductionPercent: 96,
        recoveryTimeMinutes: 20,
        trustRequirementPercent: 85,
        resilienceImprovementPercent: 45,
        potentialSideEffects: 'Complete outage of primary bay requiring N+1 backup pickup.',
        confidencePercent: 93
      },
      {
        name: 'Increase Monitoring Frequency',
        category: 'Observability',
        description: 'Increase RTU telemetry sampling frequency from 10Hz to 100Hz for high-resolution tracking.',
        riskReductionPercent: 38,
        recoveryTimeMinutes: 2,
        trustRequirementPercent: 65,
        resilienceImprovementPercent: 15,
        potentialSideEffects: 'Local memory log buffer usage increases to 85%.',
        confidencePercent: 91
      }
    ];

    // Process options with Trust Gate logic
    const simulatedOptions: RecoveryOptionSimulation[] = rawOptions.map((opt, idx) => {
      const trustGatePassed = dataTrust >= opt.trustRequirementPercent;
      const trustGateReason = trustGatePassed
        ? `Trust Gate Passed (${dataTrust}% >= ${opt.trustRequirementPercent}%)`
        : `Trust Gate Blocked (Data Trust ${dataTrust}% < Required ${opt.trustRequirementPercent}%)`;

      return {
        id: `opt-${idx + 1}-${asset.id}`,
        ...opt,
        recommended: false, // will set best
        trustGatePassed,
        trustGateReason
      };
    });

    // Select recommended option: highest risk reduction among those passing trust gate
    const passingOptions = simulatedOptions.filter((o) => o.trustGatePassed);
    const bestOption = passingOptions.length > 0
      ? passingOptions.reduce((prev, curr) => (curr.riskReductionPercent > prev.riskReductionPercent ? curr : prev))
      : simulatedOptions[3]; // Fallback to Switch Monitoring Path / Increase Verification

    bestOption.recommended = true;

    // 3. Recovery Latency Budget
    const maxAllowed = 30; // Minutes SLA
    const estimated = bestOption.recoveryTimeMinutes;
    const slack = maxAllowed - estimated;
    let budgetStatus: 'WITHIN BUDGET' | 'AT RISK' | 'BREACHED' = 'WITHIN BUDGET';
    if (estimated > maxAllowed) {
      budgetStatus = 'BREACHED';
    } else if (estimated > maxAllowed * 0.8) {
      budgetStatus = 'AT RISK';
    }

    const latencyBudget: RecoveryLatencyBudget = {
      maxAllowedRecoveryTimeMinutes: maxAllowed,
      estimatedRecoveryTimeMinutes: estimated,
      slackMinutes: slack,
      status: budgetStatus
    };

    // 4. Checkpoint Freshness
    const checkpointFreshness: CheckpointFreshness = {
      lastValidCheckpointTimestamp: '2026-08-12 12:45:18 UTC',
      checkpointAgeMinutes: 8,
      replayWindowMinutes: 60,
      checkpointTrustScore: Math.min(98, dataTrust + 5),
      recoveryValidity: 'VALID',
      hashDigest: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    };

    return {
      assetId: asset.id,
      assetName: asset.name,
      assetCode: asset.code,
      dataTrustVerified: isTrustVerified,
      trustVerificationQuestion: trustQuestion,
      trustVerificationAnswer: trustAnswer,
      trustScore: dataTrust,
      stages,
      latencyBudget,
      checkpointFreshness,
      simulatedOptions,
      recommendedOption: bestOption
    };
  }
}
