import { Dependency, InfrastructureAsset } from '../types';

export class DependencyEngine {
  /**
   * Computes cascading downstream risks across critical infrastructure dependencies.
   */
  public static computeCascadingRisks(
    assets: InfrastructureAsset[],
    dependencies: Dependency[]
  ): { assetId: string; cascadeRiskScore: number; failureChain: string[] }[] {
    return assets.map((asset) => {
      // Find all upstream dependencies for this asset
      const assetDeps = dependencies.filter((d) => d.targetAssetId === asset.id);
      let cumulativeRisk = 0;
      const failureChain: string[] = [];

      assetDeps.forEach((dep) => {
        const sourceAsset = assets.find((a) => a.id === dep.sourceAssetId);
        if (sourceAsset) {
          if (sourceAsset.physicalTwin.status === 'Critical') {
            cumulativeRisk += dep.criticalityWeight * 45;
            failureChain.push(`Critical upstream dependency: ${sourceAsset.name} (${sourceAsset.code})`);
          } else if (sourceAsset.physicalTwin.status === 'Warning') {
            cumulativeRisk += dep.criticalityWeight * 20;
            failureChain.push(`Degraded upstream dependency: ${sourceAsset.name} (${sourceAsset.code})`);
          }
        }
      });

      return {
        assetId: asset.id,
        cascadeRiskScore: Math.min(100, Math.round(cumulativeRisk)),
        failureChain
      };
    });
  }
}
