import { InfrastructureAsset, Dependency, Incident, RecoveryPlan, ResilienceMetric, Scenario } from '../types';

export const INITIAL_ASSETS: InfrastructureAsset[] = [
  {
    id: 'asset-ps-1042',
    name: 'Primary Transmission Substation 765kV',
    code: 'PS-1042',
    domain: 'Power',
    location: { name: 'Western Grid Hub, Maharashtra Zone', lat: 19.076, lng: 72.8777, region: 'Western Region' },
    criticality: 'National Core',
    lastMaintenance: '2026-06-15',
    dependencies: ['asset-tc-888'],
    dependents: ['asset-wt-302', 'asset-tr-501', 'asset-ip-900'],
    physicalTwin: {
      assetId: 'asset-ps-1042',
      overallHealth: 78,
      status: 'Warning',
      temperature: 68.4,
      load: 84.2,
      voltage: 761.5,
      pressure: 4.2,
      latency: 14.2,
      errorRate: 0.12,
      vibration: 2.8,
      recoveryReadiness: 92,
      activeComponentsCount: 5,
      criticalComponentsCount: 2,
      lastPhysicalInspection: '2026-07-28',
      components: [
        {
          id: 'comp-ps-1042-tr1',
          name: '765kV Step-Down Autotransformer #1',
          type: 'Transformer',
          assetId: 'asset-ps-1042',
          health: 72,
          status: 'Warning',
          temperature: 82.5,
          load: 88.0,
          vibration: 3.4,
          operatingHours: 42100,
          sensors: [
            {
              id: 'sns-ps-tr1-temp',
              name: 'Winding Temp Sensor A',
              type: 'Temperature',
              componentId: 'comp-ps-1042-tr1',
              unit: '°C',
              currentValue: 82.5,
              expectedRange: [30, 75],
              calibrationDate: '2026-01-10',
              reliabilityScore: 88,
              status: 'Normal',
              firmwareVersion: 'v4.1.2-indigenous',
              lastUpdated: '10s ago',
            },
            {
              id: 'sns-ps-tr1-volt',
              name: 'Primary Voltage Bus Monitor',
              type: 'Voltage',
              componentId: 'comp-ps-1042-tr1',
              unit: 'kV',
              currentValue: 761.5,
              expectedRange: [740, 780],
              calibrationDate: '2026-01-10',
              reliabilityScore: 94,
              status: 'Normal',
              firmwareVersion: 'v4.1.2-indigenous',
              lastUpdated: '10s ago',
            },
            {
              id: 'sns-ps-tr1-vib',
              name: 'Core Vibration Acoustic Transducer',
              type: 'Vibration',
              componentId: 'comp-ps-1042-tr1',
              unit: 'mm/s',
              currentValue: 3.4,
              expectedRange: [0.5, 2.5],
              calibrationDate: '2025-11-04',
              reliabilityScore: 61,
              status: 'Drifting',
              firmwareVersion: 'v2.0.1-legacy',
              lastUpdated: '10s ago',
            }
          ]
        },
        {
          id: 'comp-ps-1042-cool',
          name: 'SF6 Gas Cooling & Insulation Matrix',
          type: 'Cooling System',
          assetId: 'asset-ps-1042',
          health: 85,
          status: 'Healthy',
          temperature: 42.1,
          load: 65.0,
          vibration: 1.1,
          operatingHours: 18400,
          sensors: [
            {
              id: 'sns-ps-cool-press',
              name: 'SF6 Gas Pressure Transducer',
              type: 'Pressure',
              componentId: 'comp-ps-1042-cool',
              unit: 'bar',
              currentValue: 4.2,
              expectedRange: [3.8, 5.0],
              calibrationDate: '2026-03-22',
              reliabilityScore: 99,
              status: 'Normal',
              firmwareVersion: 'v4.1.2-indigenous',
              lastUpdated: '10s ago',
            }
          ]
        },
        {
          id: 'comp-ps-1042-scada',
          name: 'Indigenous Edge SCADA Control Unit',
          type: 'Control Unit',
          assetId: 'asset-ps-1042',
          health: 95,
          status: 'Healthy',
          temperature: 36.2,
          load: 32.0,
          vibration: 0.2,
          operatingHours: 12000,
          sensors: [
            {
              id: 'sns-ps-scada-lat',
              name: 'Fiber Telecommand Latency Sensor',
              type: 'Latency',
              componentId: 'comp-ps-1042-scada',
              unit: 'ms',
              currentValue: 14.2,
              expectedRange: [2, 20],
              calibrationDate: '2026-05-01',
              reliabilityScore: 92,
              status: 'Normal',
              firmwareVersion: 'v5.0-bharatOS',
              lastUpdated: '10s ago',
            }
          ]
        }
      ]
    },
    intelligenceTwin: {
      assetId: 'asset-ps-1042',
      predictedState: 'Warning',
      anomalies: [
        {
          id: 'anom-1042-1',
          assetId: 'asset-ps-1042',
          sensorId: 'sns-ps-tr1-vib',
          title: 'Acoustic Sensor Harmonic Drift Detected',
          description: 'Acoustic vibration reading is reporting 3.4 mm/s while cross-correlated thermal sensors show stable cooling efficiency.',
          type: 'SENSOR_DRIFT',
          severity: 'High',
          detectedAt: '22 mins ago',
          confidence: 89,
          impactedTwin: 'Trust',
          resolved: false
        }
      ],
      failureProbability: 34,
      estimatedTimeToFailure: '18h 45m',
      predictionConfidence: 89,
      potentialImpact: 'Severe',
      supportingEvidence: [
        'Acoustic vibration reading (3.4mm/s) contradicts magnetic core current harmonics',
        'Thermal gradient delta is lower than expected for reported acoustic amplitude',
        'Historical sensor drift signature matches firmware v2.0.1 legacy calibration degradation'
      ],
      causalFactors: [
        { factor: 'Acoustic Transducer Calibration Loss', weight: 0.55 },
        { factor: 'Grid Load Spike during Peak Hours', weight: 0.30 },
        { factor: 'SF6 Gas Pressure Ripple', weight: 0.15 }
      ],
      scenarioForecasts: [
        { timeAhead: '+2 Hours', predictedHealth: 76, riskLevel: 'Moderate' },
        { timeAhead: '+6 Hours', predictedHealth: 69, riskLevel: 'High' },
        { timeAhead: '+12 Hours', predictedHealth: 58, riskLevel: 'Severe' }
      ]
    },
    trustTwin: {
      assetId: 'asset-ps-1042',
      overallDataTrust: 41,
      sensorTrust: 48,
      streamTrust: 38,
      dataReliabilityIndex: 45,
      crossSensorAgreement: 32,
      temporalConsistency: 74,
      dataCompleteness: 98,
      provenance: 'Cryptographically Verified (HSM)',
      missingDataPercent: 2,
      confidenceScore: 41,
      trustPropagationLevel: 'Cascading Trust Loss',
      reductionEvidence: [
        { timestamp: '22m ago', issue: 'Cross-sensor conflict between Vibration (3.4mm/s) and Temperature (82.5°C)', impactPoints: -35, source: 'CrossSensorEngine' },
        { timestamp: '14m ago', issue: 'Legacy sensor firmware v2.0.1 unverified calibration hash', impactPoints: -24, source: 'ProvenanceAuditor' }
      ]
    },
    realityConfidence: {
      assetId: 'asset-ps-1042',
      score: 34,
      systemHealth: 78,
      dataTrust: 41,
      predictionConfidence: 89,
      explanation: 'CRITICAL TRUST DIVERGENCE: AI model prediction confidence is 89%, but underlying sensor trust is only 41%. The AI is highly confident in a prediction based on untrusted/drifting sensor telemetry. Reality Confidence Score™ reduced to 34%.',
      discrepancyFactors: [
        { metric: 'Core Vibration', systemValue: '3.4 mm/s (Warning)', trustObservation: 'Sensor drift detected (-35% trust)', deltaSeverity: 'High' },
        { metric: 'Winding Temp', systemValue: '82.5 °C (Elevated)', trustObservation: 'Consistent with SCADA load telemetry', deltaSeverity: 'Low' }
      ],
      twinAlignmentStatus: 'Severe Hallucination Risk'
    }
  },
  {
    id: 'asset-wt-302',
    name: 'Regional Smart Water Aqueduct & Pump Station',
    code: 'WT-302',
    domain: 'Water',
    location: { name: 'Central Basin Aqueduct, Narmada Grid', lat: 22.1702, lng: 73.8311, region: 'Central Region' },
    criticality: 'Regional Hub',
    lastMaintenance: '2026-05-10',
    dependencies: ['asset-ps-1042'],
    dependents: ['asset-ip-900'],
    physicalTwin: {
      assetId: 'asset-wt-302',
      overallHealth: 91,
      status: 'Healthy',
      temperature: 31.5,
      load: 62.0,
      voltage: 415.0,
      pressure: 12.8,
      latency: 8.5,
      errorRate: 0.02,
      vibration: 0.8,
      recoveryReadiness: 98,
      activeComponentsCount: 4,
      criticalComponentsCount: 1,
      lastPhysicalInspection: '2026-08-01',
      components: [
        {
          id: 'comp-wt-pump1',
          name: 'Primary Variable-Speed Intake Turbine Pump',
          type: 'Pump',
          assetId: 'asset-wt-302',
          health: 92,
          status: 'Healthy',
          temperature: 34.0,
          load: 64.0,
          vibration: 0.9,
          operatingHours: 9400,
          sensors: [
            {
              id: 'sns-wt-press',
              name: 'Aqueduct Discharge Hydrostatic Pressure',
              type: 'Pressure',
              componentId: 'comp-wt-pump1',
              unit: 'bar',
              currentValue: 12.8,
              expectedRange: [10.0, 15.0],
              calibrationDate: '2026-04-12',
              reliabilityScore: 98,
              status: 'Normal',
              firmwareVersion: 'v4.1.2-indigenous',
              lastUpdated: '5s ago'
            }
          ]
        }
      ]
    },
    intelligenceTwin: {
      assetId: 'asset-wt-302',
      predictedState: 'Healthy',
      anomalies: [],
      failureProbability: 6,
      estimatedTimeToFailure: '> 120 Hours',
      predictionConfidence: 96,
      potentialImpact: 'Minor',
      supportingEvidence: ['Flow rates match upstream pump telemetry', 'No pressure fluctuation anomalies detected'],
      causalFactors: [{ factor: 'Optimal Hydraulic Head', weight: 0.85 }],
      scenarioForecasts: [{ timeAhead: '+24 Hours', predictedHealth: 90, riskLevel: 'Low' }]
    },
    trustTwin: {
      assetId: 'asset-wt-302',
      overallDataTrust: 95,
      sensorTrust: 96,
      streamTrust: 94,
      dataReliabilityIndex: 96,
      crossSensorAgreement: 97,
      temporalConsistency: 95,
      dataCompleteness: 100,
      provenance: 'Cryptographically Verified (HSM)',
      missingDataPercent: 0,
      confidenceScore: 95,
      trustPropagationLevel: 'Optimal',
      reductionEvidence: []
    },
    realityConfidence: {
      assetId: 'asset-wt-302',
      score: 93,
      systemHealth: 91,
      dataTrust: 95,
      predictionConfidence: 96,
      explanation: 'HIGH REALITY CONFIDENCE: Physical metrics, sensor trust, and AI predictions are tightly aligned.',
      discrepancyFactors: [],
      twinAlignmentStatus: 'Aligned'
    }
  },
  {
    id: 'asset-tc-888',
    name: 'National 5G Fiber Core & Satellite Exchange',
    code: 'TC-888',
    domain: 'Telecommunications',
    location: { name: 'NCR Strategic Telecom Node, Delhi NCR', lat: 28.6139, lng: 77.209, region: 'Northern Region' },
    criticality: 'National Core',
    lastMaintenance: '2026-07-01',
    dependencies: [],
    dependents: ['asset-ps-1042', 'asset-tr-501'],
    physicalTwin: {
      assetId: 'asset-tc-888',
      overallHealth: 62,
      status: 'Critical',
      temperature: 45.2,
      load: 94.5,
      voltage: 230.0,
      pressure: 1.0,
      latency: 84.1,
      errorRate: 4.8,
      vibration: 0.1,
      recoveryReadiness: 75,
      activeComponentsCount: 6,
      criticalComponentsCount: 3,
      lastPhysicalInspection: '2026-06-20',
      components: [
        {
          id: 'comp-tc-fiber1',
          name: 'Dense Wavelength Multiplexer (DWDM)',
          type: 'Fiber Multiplexer',
          assetId: 'asset-tc-888',
          health: 58,
          status: 'Critical',
          temperature: 48.1,
          load: 96.0,
          vibration: 0.1,
          operatingHours: 31000,
          sensors: [
            {
              id: 'sns-tc-lat',
              name: 'Packet Transit Round-Trip Time',
              type: 'Latency',
              componentId: 'comp-tc-fiber1',
              unit: 'ms',
              currentValue: 84.1,
              expectedRange: [1, 15],
              calibrationDate: '2026-02-18',
              reliabilityScore: 35,
              status: 'Faulty',
              firmwareVersion: 'v1.8.0-unverified',
              lastUpdated: '1s ago'
            },
            {
              id: 'sns-tc-pkt',
              name: 'Ingress Packet Corruption Counter',
              type: 'Packet Loss',
              componentId: 'comp-tc-fiber1',
              unit: '%',
              currentValue: 4.8,
              expectedRange: [0, 0.1],
              calibrationDate: '2026-02-18',
              reliabilityScore: 40,
              status: 'Degraded',
              firmwareVersion: 'v1.8.0-unverified',
              lastUpdated: '1s ago'
            }
          ]
        }
      ]
    },
    intelligenceTwin: {
      assetId: 'asset-tc-888',
      predictedState: 'Critical',
      anomalies: [
        {
          id: 'anom-888-1',
          assetId: 'asset-tc-888',
          sensorId: 'sns-tc-lat',
          title: 'Malformed Packet Flood / Cyber-Physical Spoofing',
          description: 'High latency (84.1ms) combined with packet loss spike and duplicate sequence hashes indicate potential data injection or buffer exhaustion.',
          type: 'CYBER_SPOOF',
          severity: 'Critical',
          detectedAt: '8 mins ago',
          confidence: 94,
          impactedTwin: 'All',
          resolved: false
        }
      ],
      failureProbability: 78,
      estimatedTimeToFailure: '3h 15m',
      predictionConfidence: 91,
      potentialImpact: 'Catastrophic',
      supportingEvidence: ['Unverified optical payload hashes', 'Inter-node heartbeat dropouts on core trunk line B'],
      causalFactors: [
        { factor: 'Buffer Congestion due to Spoofed Telemetry Bursts', weight: 0.65 },
        { factor: 'Optical Switching Thermal Overheating', weight: 0.35 }
      ],
      scenarioForecasts: [{ timeAhead: '+1 Hour', predictedHealth: 45, riskLevel: 'Catastrophic' }]
    },
    trustTwin: {
      assetId: 'asset-tc-888',
      overallDataTrust: 28,
      sensorTrust: 30,
      streamTrust: 22,
      dataReliabilityIndex: 26,
      crossSensorAgreement: 20,
      temporalConsistency: 42,
      dataCompleteness: 81,
      provenance: 'Unverified/Tampered',
      missingDataPercent: 19,
      confidenceScore: 28,
      trustPropagationLevel: 'Cascading Trust Loss',
      reductionEvidence: [
        { timestamp: '8m ago', issue: 'Missing payload digital signature on trunk router', impactPoints: -40, source: 'SovereigntyEngine' },
        { timestamp: '5m ago', issue: 'High packet loss & corrupt sequence frame IDs', impactPoints: -32, source: 'StreamVerifier' }
      ]
    },
    realityConfidence: {
      assetId: 'asset-tc-888',
      score: 22,
      systemHealth: 62,
      dataTrust: 28,
      predictionConfidence: 91,
      explanation: 'EXTREME REALITY RISK: Data streams are unverified/tampered. The system cannot confirm whether the physical asset is degrading or under active cyber-spoofing.',
      discrepancyFactors: [
        { metric: 'Latency', systemValue: '84.1 ms', trustObservation: 'Unverified packet origin (-40% trust)', deltaSeverity: 'High' }
      ],
      twinAlignmentStatus: 'Trust Breakdown'
    }
  },
  {
    id: 'asset-tr-501',
    name: 'High-Speed Rail Signaling & Automatic Train Control',
    code: 'TR-501',
    domain: 'Transportation',
    location: { name: 'Mumbai-Ahmedabad Corridor SCADA, Sector 4', lat: 21.1702, lng: 72.8311, region: 'Western Region' },
    criticality: 'National Core',
    lastMaintenance: '2026-07-20',
    dependencies: ['asset-ps-1042', 'asset-tc-888'],
    dependents: [],
    physicalTwin: {
      assetId: 'asset-tr-501',
      overallHealth: 88,
      status: 'Healthy',
      temperature: 32.1,
      load: 54.0,
      voltage: 230.0,
      pressure: 1.0,
      latency: 4.2,
      errorRate: 0.01,
      vibration: 0.4,
      recoveryReadiness: 95,
      activeComponentsCount: 4,
      criticalComponentsCount: 1,
      lastPhysicalInspection: '2026-08-05',
      components: [
        {
          id: 'comp-tr-sig1',
          name: 'Interlocking Rail Signal Processor',
          type: 'Signal Controller',
          assetId: 'asset-tr-501',
          health: 90,
          status: 'Healthy',
          temperature: 33.0,
          load: 52.0,
          vibration: 0.3,
          operatingHours: 8900,
          sensors: [
            {
              id: 'sns-tr-lat',
              name: 'Track Interlocking Loop Latency',
              type: 'Latency',
              componentId: 'comp-tr-sig1',
              unit: 'ms',
              currentValue: 4.2,
              expectedRange: [1, 10],
              calibrationDate: '2026-06-10',
              reliabilityScore: 97,
              status: 'Normal',
              firmwareVersion: 'v4.1.2-indigenous',
              lastUpdated: '2s ago'
            }
          ]
        }
      ]
    },
    intelligenceTwin: {
      assetId: 'asset-tr-501',
      predictedState: 'Healthy',
      anomalies: [],
      failureProbability: 8,
      estimatedTimeToFailure: '> 100 Hours',
      predictionConfidence: 94,
      potentialImpact: 'Moderate',
      supportingEvidence: ['Dual redundant fiber loops responding within 4.2ms'],
      causalFactors: [{ factor: 'Stable Control Voltage', weight: 0.90 }],
      scenarioForecasts: [{ timeAhead: '+24 Hours', predictedHealth: 87, riskLevel: 'Low' }]
    },
    trustTwin: {
      assetId: 'asset-tr-501',
      overallDataTrust: 91,
      sensorTrust: 92,
      streamTrust: 90,
      dataReliabilityIndex: 92,
      crossSensorAgreement: 93,
      temporalConsistency: 92,
      dataCompleteness: 99,
      provenance: 'Cryptographically Verified (HSM)',
      missingDataPercent: 1,
      confidenceScore: 91,
      trustPropagationLevel: 'Optimal',
      reductionEvidence: []
    },
    realityConfidence: {
      assetId: 'asset-tr-501',
      score: 90,
      systemHealth: 88,
      dataTrust: 91,
      predictionConfidence: 94,
      explanation: 'HIGH REALITY CONFIDENCE: Train control signaling telemetrics verified with high provenance.',
      discrepancyFactors: [],
      twinAlignmentStatus: 'Aligned'
    }
  },
  {
    id: 'asset-ip-900',
    name: 'Petrochemical Refinery Cracker & SCADA Safety Grid',
    code: 'IP-900',
    domain: 'Industrial',
    location: { name: 'Jamnagar Petrochemical Complex, Gujarat', lat: 22.4707, lng: 70.0577, region: 'Western Region' },
    criticality: 'National Core',
    lastMaintenance: '2026-04-18',
    dependencies: ['asset-ps-1042', 'asset-wt-302'],
    dependents: [],
    physicalTwin: {
      assetId: 'asset-ip-900',
      overallHealth: 74,
      status: 'Warning',
      temperature: 112.5,
      load: 89.0,
      voltage: 415.0,
      pressure: 48.5,
      latency: 18.0,
      errorRate: 0.8,
      vibration: 4.1,
      recoveryReadiness: 88,
      activeComponentsCount: 8,
      criticalComponentsCount: 3,
      lastPhysicalInspection: '2026-07-10',
      components: [
        {
          id: 'comp-ip-cracker1',
          name: 'Hydrocracker Pressure Relief Vessel',
          type: 'Turbine',
          assetId: 'asset-ip-900',
          health: 68,
          status: 'Warning',
          temperature: 118.0,
          load: 92.0,
          vibration: 4.8,
          operatingHours: 51000,
          sensors: [
            {
              id: 'sns-ip-press',
              name: 'Chamber Hydrobaric Sensor B',
              type: 'Pressure',
              componentId: 'comp-ip-cracker1',
              unit: 'bar',
              currentValue: 48.5,
              expectedRange: [20, 42],
              calibrationDate: '2026-02-01',
              reliabilityScore: 82,
              status: 'Normal',
              firmwareVersion: 'v3.2.0-indigenous',
              lastUpdated: '3s ago'
            }
          ]
        }
      ]
    },
    intelligenceTwin: {
      assetId: 'asset-ip-900',
      predictedState: 'Warning',
      anomalies: [
        {
          id: 'anom-900-1',
          assetId: 'asset-ip-900',
          sensorId: 'sns-ip-press',
          title: 'Hydrocracker Thermal & Pressure Super-Threshold',
          description: 'Chamber pressure reading (48.5 bar) exceeds 42 bar safety ceiling. Cooling water flow rate from WT-302 is reduced by 12%.',
          type: 'VOLTAGE_SPIKE',
          severity: 'High',
          detectedAt: '15 mins ago',
          confidence: 91,
          impactedTwin: 'Physical',
          resolved: false
        }
      ],
      failureProbability: 42,
      estimatedTimeToFailure: '11h 10m',
      predictionConfidence: 88,
      potentialImpact: 'Catastrophic',
      supportingEvidence: ['Pressure curve slope exceeds safety margin', 'Vibration harmonic matches seal degradation pattern'],
      causalFactors: [
        { factor: 'Upstream Cooling Water Flow Reduction', weight: 0.50 },
        { factor: 'Catalyst Bed Operating Temperature Elevation', weight: 0.35 }
      ],
      scenarioForecasts: [{ timeAhead: '+4 Hours', predictedHealth: 61, riskLevel: 'High' }]
    },
    trustTwin: {
      assetId: 'asset-ip-900',
      overallDataTrust: 82,
      sensorTrust: 84,
      streamTrust: 80,
      dataReliabilityIndex: 83,
      crossSensorAgreement: 85,
      temporalConsistency: 81,
      dataCompleteness: 97,
      provenance: 'Cryptographically Verified (HSM)',
      missingDataPercent: 3,
      confidenceScore: 82,
      trustPropagationLevel: 'Local Degradation',
      reductionEvidence: []
    },
    realityConfidence: {
      assetId: 'asset-ip-900',
      score: 76,
      systemHealth: 74,
      dataTrust: 82,
      predictionConfidence: 88,
      explanation: 'MODERATE REALITY CONFIDENCE: Physical asset is genuinely under pressure thermal stress. Telemetry data trust is solid (82%). Immediate cooling intervention required.',
      discrepancyFactors: [],
      twinAlignmentStatus: 'Aligned'
    }
  }
];

export const INITIAL_DEPENDENCIES: Dependency[] = [
  {
    id: 'dep-1',
    sourceAssetId: 'asset-tc-888',
    targetAssetId: 'asset-ps-1042',
    dependencyType: 'SCADA Telemetry',
    criticalityWeight: 0.95,
    activeState: 'Degraded'
  },
  {
    id: 'dep-2',
    sourceAssetId: 'asset-ps-1042',
    targetAssetId: 'asset-wt-302',
    dependencyType: 'Power Feed',
    criticalityWeight: 0.90,
    activeState: 'Normal'
  },
  {
    id: 'dep-3',
    sourceAssetId: 'asset-ps-1042',
    targetAssetId: 'asset-tr-501',
    dependencyType: 'Power Feed',
    criticalityWeight: 0.98,
    activeState: 'Normal'
  },
  {
    id: 'dep-4',
    sourceAssetId: 'asset-tc-888',
    targetAssetId: 'asset-tr-501',
    dependencyType: 'Data Telecom',
    criticalityWeight: 0.92,
    activeState: 'Throttled'
  },
  {
    id: 'dep-5',
    sourceAssetId: 'asset-ps-1042',
    targetAssetId: 'asset-ip-900',
    dependencyType: 'Power Feed',
    criticalityWeight: 0.88,
    activeState: 'Normal'
  },
  {
    id: 'dep-6',
    sourceAssetId: 'asset-wt-302',
    targetAssetId: 'asset-ip-900',
    dependencyType: 'Cooling Water',
    criticalityWeight: 0.85,
    activeState: 'Normal'
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-101',
    code: 'INC-2026-8881',
    assetId: 'asset-tc-888',
    assetName: 'National 5G Fiber Core & Satellite Exchange',
    domain: 'Telecommunications',
    title: 'Unverified Packet Injection / Trust Breakdown on Optical Core Trunk',
    description: 'High packet latency (84ms) and corrupt frame hashes detected on Northern Core Fiber Node. Data trust dropped to 28%. AI Reality Confidence at 22%.',
    severity: 'Critical',
    status: 'Active',
    detectedAt: '2026-08-11 23:42:10',
    realityConfidenceAtTrigger: 22,
    systemHealthAtTrigger: 62,
    trustScoreAtTrigger: 28,
    rootCauseCategory: 'Cyber/Data Tampering',
    affectedTwins: ['Trust', 'Intelligence', 'Physical']
  },
  {
    id: 'inc-102',
    code: 'INC-2026-1042',
    assetId: 'asset-ps-1042',
    assetName: 'Primary Transmission Substation 765kV',
    domain: 'Power',
    title: 'Acoustic Sensor Drift creating AI Hallucination Risk',
    description: 'Acoustic vibration sensor sns-ps-tr1-vib drifting higher while thermal sensors report normal cooling. AI predicted risk at 89% based on untrusted telemetry.',
    severity: 'High',
    status: 'Investigating',
    detectedAt: '2026-08-11 23:33:05',
    realityConfidenceAtTrigger: 34,
    systemHealthAtTrigger: 78,
    trustScoreAtTrigger: 41,
    rootCauseCategory: 'Sensor Drift',
    affectedTwins: ['Trust', 'Intelligence']
  }
];

export const INITIAL_RECOVERY_PLANS: RecoveryPlan[] = [
  {
    id: 'rec-plan-101',
    incidentId: 'inc-101',
    assetId: 'asset-tc-888',
    title: 'Indigenous Cryptographic Re-Attestation & Edge Mesh Isolation',
    mttrMinutes: 18,
    readinessScore: 94,
    fallbackMode: 'Air-Gapped Local Rulebook',
    verificationRequired: true,
    isolationProtocol: 'Isolate Unverified Optical Line Interface Card B; Failover to Indigenous Dark Fiber Channel 4',
    steps: [
      { stepNumber: 1, action: 'Trigger HSM cryptographic re-keying on DWDM Optical Multiplexer', automated: true, estimatedMinutes: 2, riskIfSkipped: 'Unauthenticated packets continue entering SCADA mesh', status: 'Completed' },
      { stepNumber: 2, action: 'Re-route core traffic to backup indigenous microwave trunk node TC-912', automated: true, estimatedMinutes: 3, riskIfSkipped: 'Network saturation on compromised line B', status: 'In Progress' },
      { stepNumber: 3, action: 'Isolate untrusted sensor array sns-tc-lat from Intelligence Engine input vector', automated: true, estimatedMinutes: 1, riskIfSkipped: 'AI continues hallucinating false breach alerts', status: 'Pending' },
      { stepNumber: 4, action: 'Execute physical sideband OTDR (Optical Time Domain Reflectometer) test', automated: false, estimatedMinutes: 12, riskIfSkipped: 'Unnoticed physical fiber splicing attack', status: 'Pending' }
    ]
  },
  {
    id: 'rec-plan-102',
    incidentId: 'inc-102',
    assetId: 'asset-ps-1042',
    title: 'Trust Twin Recalibration & Sensor Weight Quarantining',
    mttrMinutes: 10,
    readinessScore: 98,
    fallbackMode: 'Edge Mesh Reroute',
    verificationRequired: false,
    isolationProtocol: 'Soft-quarantine Sensor sns-ps-tr1-vib; Recalculate Reality Confidence using cross-correlated thermal vectors',
    steps: [
      { stepNumber: 1, action: 'Apply Trust Twin Penalty to Sensor sns-ps-tr1-vib (Set Trust Weight to 0.0)', automated: true, estimatedMinutes: 1, riskIfSkipped: 'Reality Confidence remains artificially low', status: 'In Progress' },
      { stepNumber: 2, action: 'Dispatch local maintenance team for acoustic transducer recalibration', automated: false, estimatedMinutes: 9, riskIfSkipped: 'Long term physical monitoring blind spot', status: 'Pending' }
    ]
  }
];

export const INITIAL_RESILIENCE_METRICS: ResilienceMetric[] = [
  { domain: 'Power', overallResilienceScore: 84, redundancyIndex: 88, adaptabilityScore: 82, survivabilityIndex: 86, cascadingSusceptibility: 24, hardeningIndex: 90 },
  { domain: 'Telecommunications', overallResilienceScore: 68, redundancyIndex: 72, adaptabilityScore: 65, survivabilityIndex: 70, cascadingSusceptibility: 58, hardeningIndex: 78 },
  { domain: 'Water', overallResilienceScore: 92, redundancyIndex: 95, adaptabilityScore: 90, survivabilityIndex: 94, cascadingSusceptibility: 12, hardeningIndex: 92 },
  { domain: 'Transportation', overallResilienceScore: 89, redundancyIndex: 90, adaptabilityScore: 87, survivabilityIndex: 91, cascadingSusceptibility: 18, hardeningIndex: 94 },
  { domain: 'Industrial', overallResilienceScore: 78, redundancyIndex: 80, adaptabilityScore: 76, survivabilityIndex: 81, cascadingSusceptibility: 35, hardeningIndex: 85 }
];

export const SIMULATION_SCENARIOS: Scenario[] = [
  {
    id: 'scen-cyber-1',
    name: 'Coordinated Cyber-Physical Telemetry Spoofing',
    description: 'Injects synchronized fake pressure & voltage spikes across Power Substation PS-1042 and SCADA nodes while corrupting timestamp signatures.',
    domainTarget: 'All',
    type: 'CYBER_SPOOFING',
    intensity: 'Severe',
    estimatedImpact: 'Trust Twin score drops by 45%. Reality Confidence drops to < 30%. Tests AI ability to reject unverified sensor telemetry.'
  },
  {
    id: 'scen-solar-1',
    name: 'G5-Class Geomagnetic Solar Storm (EMP)',
    description: 'Simulates geomagnetically induced currents (GIC) across 765kV transformers causing harmonic distortion, sensor jitter, and thermal buildup.',
    domainTarget: 'Power',
    type: 'SOLAR_EMP',
    intensity: 'Catastrophic',
    estimatedImpact: 'Physical health drops to 40%. AI calculates 82% failure probability on PS-1042 within 4 hours.'
  },
  {
    id: 'scen-grid-cascade',
    name: 'N-2 Double-Contingency Grid Cascade Collapse',
    description: 'Simulates simultaneous tripling of load on Water Pumping WT-302 and Industrial Hydrocracker IP-900 due to sudden transmission isolation.',
    domainTarget: 'Power',
    type: 'GRID_CASCADE',
    intensity: 'Catastrophic',
    estimatedImpact: 'Tests inter-domain dependency engine and automated load shedding recovery playbooks.'
  },
  {
    id: 'scen-monsoon',
    name: 'Extreme Coastal Flash Flood & Aqueduct Surge',
    description: 'Simulates 300mm/hr rainfall surge impacting coastal water intake pumps and cooling systems with acoustic vibration noise.',
    domainTarget: 'Water',
    type: 'EXTREME_MONSOON',
    intensity: 'Moderate',
    estimatedImpact: 'Sensor noise increases by 300%. Tests Trust Twin temporal smoothing algorithms.'
  }
];
