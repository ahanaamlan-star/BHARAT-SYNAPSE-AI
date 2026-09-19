import { TelemetryPoint, InfrastructureAsset, SensorType } from '../types';

export class TelemetryService {
  /**
   * Generates a realistic live telemetry tick for a given asset and sensor metric.
   */
  public static generateTick(
    asset: InfrastructureAsset,
    metric: SensorType,
    anomalyType?: TelemetryPoint['anomalyType']
  ): TelemetryPoint {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    let baseVal = 50;
    let unit = '%';
    let expectedMin = 0;
    let expectedMax = 100;

    switch (metric) {
      case 'Temperature':
        baseVal = asset.physicalTwin.temperature;
        unit = '°C';
        expectedMin = 20;
        expectedMax = 75;
        break;
      case 'Voltage':
        baseVal = asset.physicalTwin.voltage;
        unit = asset.domain === 'Power' ? 'kV' : 'V';
        expectedMin = baseVal * 0.95;
        expectedMax = baseVal * 1.05;
        break;
      case 'Load':
        baseVal = asset.physicalTwin.load;
        unit = '%';
        expectedMin = 10;
        expectedMax = 85;
        break;
      case 'Latency':
        baseVal = asset.physicalTwin.latency;
        unit = 'ms';
        expectedMin = 1;
        expectedMax = 20;
        break;
      case 'Packet Loss':
        baseVal = asset.physicalTwin.errorRate;
        unit = '%';
        expectedMin = 0;
        expectedMax = 0.5;
        break;
      case 'Pressure':
        baseVal = asset.physicalTwin.pressure;
        unit = 'bar';
        expectedMin = 1.0;
        expectedMax = 15.0;
        break;
      case 'Vibration':
        baseVal = asset.physicalTwin.vibration;
        unit = 'mm/s';
        expectedMin = 0.1;
        expectedMax = 2.5;
        break;
      default:
        baseVal = 50;
    }

    // Apply standard micro-jitter
    let jitter = (Math.random() - 0.5) * (baseVal * 0.02);
    let isAnomaly = false;
    let trustScore = asset.trustTwin.overallDataTrust;

    // Apply injected anomaly behavior
    if (anomalyType) {
      isAnomaly = true;
      switch (anomalyType) {
        case 'SPIKE':
          jitter = baseVal * 0.8;
          trustScore = Math.max(10, trustScore - 35);
          break;
        case 'DRIFT':
          jitter = baseVal * 0.35;
          trustScore = Math.max(15, trustScore - 25);
          break;
        case 'FROZEN':
          jitter = 0; // Exactly static reading
          trustScore = Math.max(20, trustScore - 40);
          break;
        case 'SPOOFED':
          jitter = (Math.random() - 0.5) * baseVal * 0.9;
          trustScore = Math.max(5, trustScore - 60);
          break;
        case 'MISSING':
          baseVal = 0;
          jitter = 0;
          trustScore = 0;
          break;
      }
    }

    const value = Number((baseVal + jitter).toFixed(2));

    return {
      timestamp,
      sensorId: `sns-${asset.code.toLowerCase()}-${metric.toLowerCase().replace(/\s+/g, '')}`,
      assetId: asset.id,
      metric,
      value,
      unit,
      expectedMin,
      expectedMax,
      isAnomaly,
      anomalyType,
      trustScore
    };
  }
}
