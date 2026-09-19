/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SystemProvider, useSystem } from './context/SystemContext';
import { SimulationBanner } from './components/common/SimulationBanner';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewView } from './components/views/OverviewView';
import { TwinVisualEngineView } from './components/views/TwinVisualEngineView';
import { DigitalTwinView } from './components/views/DigitalTwinView';
import { TelemetryView } from './components/views/TelemetryView';
import { TrustTwinView } from './components/views/TrustTwinView';
import { IntelligenceTwinView } from './components/views/IntelligenceTwinView';
import { SimulationLabView } from './components/views/SimulationLabView';
import { CounterfactualEngineView } from './components/views/CounterfactualEngineView';
import { CascadeEngineView } from './components/views/CascadeEngineView';
import { DependencyGraphView } from './components/views/DependencyGraphView';
import { IncidentsView } from './components/views/IncidentsView';
import { RecoveryView } from './components/views/RecoveryView';
import { ResilienceView } from './components/views/ResilienceView';
import { SovereigntyView } from './components/views/SovereigntyView';
import { ExplainableAiView } from './components/views/ExplainableAiView';
import { JudgeDemoView } from './components/views/JudgeDemoView';
import { GovernanceView } from './components/views/GovernanceView';
import { SettingsView } from './components/views/SettingsView';

const MainContent: React.FC = () => {
  const { activeTab } = useSystem();

  return (
    <main className="flex-1 bg-[#070a13] min-h-[calc(100vh-53px)] overflow-y-auto">
      {activeTab === 'judge-demo' && <JudgeDemoView />}
      {activeTab === 'overview' && <OverviewView />}
      {activeTab === 'twin-engine' && <TwinVisualEngineView />}
      {activeTab === 'digital-twin' && <DigitalTwinView />}
      {activeTab === 'telemetry' && <TelemetryView />}
      {activeTab === 'trust-twin' && <TrustTwinView />}
      {activeTab === 'intelligence-twin' && <IntelligenceTwinView />}
      {activeTab === 'simulation-lab' && <SimulationLabView />}
      {activeTab === 'counterfactual' && <CounterfactualEngineView />}
      {activeTab === 'cascade' && <CascadeEngineView />}
      {activeTab === 'dependency-graph' && <DependencyGraphView />}
      {activeTab === 'incidents' && <IncidentsView />}
      {activeTab === 'recovery' && <RecoveryView />}
      {activeTab === 'resilience' && <ResilienceView />}
      {activeTab === 'sovereignty' && <SovereigntyView />}
      {activeTab === 'explainable-ai' && <ExplainableAiView />}
      {activeTab === 'governance' && <GovernanceView />}
      {activeTab === 'settings' && <SettingsView />}
    </main>
  );
};

export default function App() {
  return (
    <SystemProvider>
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
        {/* Top Simulation Banner */}
        <SimulationBanner />

        {/* Workspace Layout */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </SystemProvider>
  );
}
