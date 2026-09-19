import { InfrastructureAsset, PhysicalTwinState } from '../types';

export class PhysicalTwinService {
  /**
   * Recalculates the Physical Twin state based on component metrics.
   */
  public static updatePhysicalTwin(
    asset: InfrastructureAsset,
    temperatureDelta: number = 0,
    loadDelta: number = 0
  ): PhysicalTwinState {
    const pt = asset.physicalTwin;

    const newTemp = Math.max(15, Math.min(140, Number((pt.temperature + temperatureDelta).toFixed(1))));
    const newLoad = Math.max(5, Math.min(100, Number((pt.load + loadDelta).toFixed(1))));

    // Calculate component health
    const updatedComponents = pt.components.map((comp) => {
      let compHealth = comp.health;
      if (newTemp > 80) compHealth -= 2;
      if (newLoad > 90) compHealth -= 3;
      compHealth = Math.max(10, Math.min(100, compHealth));

      return {
        ...comp,
        health: compHealth,
        status: compHealth < 50 ? ('Critical' as const) : compHealth < 75 ? ('Warning' as const) : ('Healthy' as const),
        temperature: newTemp
      };
    });

    const avgComponentHealth = Math.round(
      updatedComponents.reduce((acc, c) => acc + c.health, 0) / (updatedComponents.length || 1)
    );

    let status: PhysicalTwinState['status'] = 'Healthy';
    if (avgComponentHealth < 65) status = 'Critical';
    else if (avgComponentHealth < 80) status = 'Warning';

    return {
      ...pt,
      overallHealth: avgComponentHealth,
      status,
      temperature: newTemp,
      load: newLoad,
      components: updatedComponents
    };
  }
}
