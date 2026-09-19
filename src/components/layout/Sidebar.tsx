import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Layers,
  Box,
  Activity,
  ShieldAlert,
  BrainCircuit,
  FlaskConical,
  Sparkles,
  GitFork,
  Workflow,
  AlertOctagon,
  LifeBuoy,
  ShieldCheck,
  Building2,
  HelpCircle,
  FileText,
  Settings,
  ChevronRight,
  Award
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: number;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, incidents } = useSystem();

  const activeIncidentsCount = incidents.filter((i) => i.status !== 'Resolved').length;

  const navItems: NavItem[] = [
    { id: 'judge-demo', label: '🏆 JUDGE DEMO MODE', icon: Award, highlight: true },
    { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
    { id: 'twin-engine', label: '2. Twin Visual Engine', icon: Layers, highlight: true },
    { id: 'digital-twin', label: '3. Digital Twin Inspector', icon: Box },
    { id: 'telemetry', label: '4. Telemetry Stream', icon: Activity },
    { id: 'trust-twin', label: '5. Trust Twin', icon: ShieldAlert },
    { id: 'intelligence-twin', label: '6. Intelligence Twin', icon: BrainCircuit },
    { id: 'simulation-lab', label: '7. Simulation Lab', icon: FlaskConical },
    { id: 'counterfactual', label: '8. Counterfactual Engine', icon: Sparkles, highlight: true },
    { id: 'cascade', label: '9. Cascade Engine', icon: Workflow, highlight: true },
    { id: 'dependency-graph', label: '10. Dependency Graph', icon: GitFork },
    { id: 'incidents', label: '11. Incidents', icon: AlertOctagon, badge: activeIncidentsCount },
    { id: 'recovery', label: '12. Recovery Engine', icon: LifeBuoy, highlight: true },
    { id: 'resilience', label: '13. Resilience Engine', icon: ShieldCheck, highlight: true },
    { id: 'sovereignty', label: '14. Bharat Sovereignty Layer', icon: Building2, highlight: true },
    { id: 'explainable-ai', label: '15. Explainable AI Center', icon: HelpCircle, highlight: true },
    { id: 'governance', label: '16. Safety Governance', icon: FileText },
    { id: 'settings', label: '17. System Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#090d16] border-r border-slate-800/80 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-53px)] select-none">
      {/* JUDGE DEMO PROMINENT TOP ENTRY */}
      <div className="p-2 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/80 to-indigo-950/80">
        <button
          onClick={() => setActiveTab('judge-demo')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'judge-demo'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950 ring-2 ring-amber-300'
              : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
          }`}
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span className="tracking-tight">🏆 JUDGE DEMO MODE</span>
          </div>
          <span className="text-[10px] font-mono bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-700/50">
            3-MIN
          </span>
        </button>
      </div>

      <div className="p-3 text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider flex items-center justify-between border-b border-slate-800/60">
        <span>NAVIGATION MATRIX</span>
        <span className="text-[10px] text-cyan-400/80 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
          17 MODULES
        </span>
      </div>

      <nav className="flex-1 py-2 px-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/90 to-indigo-950/80 text-cyan-300 border-l-2 border-cyan-400 font-semibold shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-cyan-400'
                      : item.highlight
                      ? 'text-amber-400 group-hover:text-amber-300'
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1">
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Branding & Sovereignty Badge */}
      <div className="p-3 border-t border-slate-800/80 bg-[#060911] text-[11px] font-mono text-slate-500 space-y-1">
        <div className="flex items-center justify-between text-slate-400">
          <span>FABRIC REVISION:</span>
          <span className="text-cyan-400 font-semibold">v3.8-INDIGENOUS</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span>AIR-GAPPED HSM:</span>
          <span className="text-emerald-400 font-bold">VERIFIED</span>
        </div>
      </div>
    </aside>
  );
};
