import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { 
  Cpu, 
  Network, 
  Database, 
  Server, 
  Layers, 
  Play, 
  CheckCircle, 
  Activity, 
  Sparkles,
  ShieldCheck,
  Zap,
  RotateCw
} from 'lucide-react';

export const ArchitectureSandbox: React.FC = () => {
  const { playGlassSound, theme, palette } = useTheme();
  const [activeTab, setActiveTab] = useState<'projects' | 'simulator'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project>(PORTFOLIO_DATA.projects[0]);

  // Microservices Simulator State
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0); // 0: idle, 1: gateway, 2: microservice, 3: database, 4: response
  const [latency, setLatency] = useState<number>(24);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM READY] Microservice mesh initialized across 4 distributed Kubernetes nodes.",
    "[GATEWAY ACTIVE] Ocelot API Gateway listening on SSL/TLS port 443 with JWT RBAC verification."
  ]);

  const runSimulation = () => {
    if (simulating) return;
    playGlassSound('warp');
    setSimulating(true);
    setSimStep(1);
    
    const reqId = Math.floor(10000 + Math.random() * 90000);
    setLogs(prev => [`[REQ #${reqId}] Client initiated HTTP GET /api/v2/enterprise/telemetry`, ...prev.slice(0, 7)]);

    setTimeout(() => {
      playGlassSound('click');
      setSimStep(2);
      setLogs(prev => [`[GATEWAY #${reqId}] Auth verified. Route balanced -> .NET Core Inventory Microservice [Node-B]`, ...prev.slice(0, 7)]);
    }, 600);

    setTimeout(() => {
      playGlassSound('click');
      setSimStep(3);
      setLogs(prev => [`[DB QUERY #${reqId}] MS-SQL Shard-01 executed stored proc in 8.4ms (Timescale cache HIT)`, ...prev.slice(0, 7)]);
    }, 1300);

    setTimeout(() => {
      playGlassSound('chime');
      setSimStep(4);
      const randomLat = Math.floor(18 + Math.random() * 22);
      setLatency(randomLat);
      setLogs(prev => [`[SUCCESS #${reqId}] Payload compressed (GZIP) and returned to client with HTTP 200 OK (${randomLat}ms total)`, ...prev.slice(0, 7)]);
      setSimulating(false);
    }, 2000);
  };

  const resetSimulation = () => {
    playGlassSound('click');
    setSimStep(0);
    setLogs([
      "[SYSTEM READY] Microservice mesh initialized across 4 distributed Kubernetes nodes.",
      "[GATEWAY ACTIVE] Ocelot API Gateway listening on SSL/TLS port 443 with JWT RBAC verification."
    ]);
  };

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill font-mono text-xs uppercase tracking-widest mb-4 border-white/20" style={{ color: palette.accentLight }}>
          <Cpu className="w-3.5 h-3.5" /> Architecture Showcase &amp; Sandbox
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Enterprise Projects & <br />
          <span className={`glass-glow-text-${theme}`}>Microservices Simulator.</span>
        </h2>
        <p className="text-white/70 text-base sm:text-lg">
          Explore production blueprints or interactive real-time simulation of high-throughput distributed SaaS systems.
        </p>
      </div>

      {/* Main Switch Tabs */}
      <div className="flex justify-center mb-12">
        <div className="glass-pill p-1.5 rounded-full flex items-center gap-2 border-white/20">
          <button
            onClick={() => { playGlassSound('click'); setActiveTab('projects'); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'projects' ? 'bg-white/25 text-white shadow-xl scale-105 border border-white/30' : 'text-white/70 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" style={{ color: palette.accentLight }} />
            Enterprise Projects Case Studies
          </button>
          <button
            onClick={() => { playGlassSound('click'); setActiveTab('simulator'); }}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'simulator' ? 'bg-white/25 text-white shadow-xl scale-105 border border-white/30' : 'text-white/70 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" style={{ color: palette.success }} />
            Live Microservice Request Simulator
            <span className="px-2 py-0.5 rounded-full text-[10px] border font-mono animate-pulse" style={{ backgroundColor: `${palette.success}30`, color: palette.success, borderColor: `${palette.success}50` }}>LIVE</span>
          </button>
        </div>
      </div>

      {activeTab === 'projects' ? (
        /* PROJECTS VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Project Selection Tabs (Left Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {PORTFOLIO_DATA.projects.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    playGlassSound('click');
                    setSelectedProject(proj);
                  }}
                  onMouseEnter={() => playGlassSound('hover')}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-400 relative overflow-hidden ${
                    isSelected
                      ? 'glass-panel border-sky-400 shadow-[0_15px_40px_rgba(56,189,248,0.25)] scale-[1.02]'
                      : 'glass-pill border-white/15 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 rounded-full" style={{ background: `linear-gradient(to bottom, ${palette.accentLight}, ${palette.accent}, ${palette.accentDark})` }} />
                  )}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: palette.accentLight }}>{proj.category}</span>
                    {isSelected && <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full border font-mono" style={{ backgroundColor: `${palette.accent}30`, borderColor: `${palette.accent}50` }}>SELECTED</span>}
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">{proj.title}</h4>
                  <p className="text-xs text-white/60 mt-1 truncate">{proj.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Selected Project Detailed Architectural Panel (Right Panel) */}
          <div className="lg:col-span-8 glass-panel rounded-[2.5rem] p-8 sm:p-10 border-white/20 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${palette.accent}18` }} />

            <div className="border-b border-white/15 pb-6 mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: palette.info }}>{selectedProject.category}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{selectedProject.title}</h3>
                <p className="text-sm font-medium mt-1" style={{ color: `${palette.accentLight}e6` }}>{selectedProject.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.metrics.map((metric, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full border text-xs font-mono font-semibold flex items-center gap-1.5" style={{ backgroundColor: `${palette.success}18`, borderColor: `${palette.success}4d`, color: palette.success }}>
                    <Zap className="w-3.5 h-3.5" /> {metric}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              {selectedProject.description}
            </p>

            {/* Architecture Stack Breakdown */}
            <div className="mb-8">
              <h4 className="text-sm font-mono uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                <Network className="w-4 h-4" style={{ color: palette.accentLight }} /> System Architecture Matrix
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${palette.accent}20`, color: palette.accentLight }}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase">Frontend Tier</span>
                    <div className="text-sm font-bold text-white mt-0.5">{selectedProject.architecture.frontend}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${palette.info}20`, color: palette.info }}>
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase">Backend Microservices</span>
                    <div className="text-sm font-bold text-white mt-0.5">{selectedProject.architecture.backend}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${palette.success}20`, color: palette.success }}>
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase">Database & Cache</span>
                    <div className="text-sm font-bold text-white mt-0.5">{selectedProject.architecture.database}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${palette.warning}20`, color: palette.warning }}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase">Cloud & DevOps</span>
                    <div className="text-sm font-bold text-white mt-0.5">{selectedProject.architecture.cloud}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Features */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-white/60 mb-3">Key Architectural Features</h4>
              <ul className="space-y-2.5">
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: palette.accentLight }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      ) : (
        /* LIVE MICROSERVICE REQUEST SIMULATOR */
        <div className="glass-panel rounded-[2.5rem] p-6 sm:p-10 border-white/20 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/15">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: palette.success }}>
                <Sparkles className="w-3.5 h-3.5" /> Interactive Microservice Blueprint
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">SaaS Distributed Pipeline Simulation</h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Simulate a real-time client transaction passing through Ocelot API Gateway, Load Balancer, .NET Core Microservices, and MS-SQL Cluster.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetSimulation}
                disabled={simulating}
                className="glass-button px-4 py-2.5 rounded-xl text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 disabled:opacity-50"
              >
                <RotateCw className="w-3.5 h-3.5" /> Reset
              </button>

              <button
                onClick={runSimulation}
                disabled={simulating}
                className={`px-6 py-2.5 rounded-xl bg-gradient-to-r text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50`}
                style={{ background: `linear-gradient(135deg, ${palette.success}, ${palette.accentDark})`, boxShadow: `0 0 20px ${palette.success}40` }}
              >
                <Play className="w-4 h-4 fill-white" />
                {simulating ? 'Processing Request...' : 'Simulate Client Request'}
              </button>
            </div>
          </div>

          {/* Animated Pipeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mb-10">
            
            {/* Step 1: Client & API Gateway */}
            <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center relative ${
              simStep === 1 
                ? 'border-sky-400 bg-sky-500/20 shadow-[0_0_30px_rgba(56,189,248,0.4)] scale-105' 
                : simStep > 1 
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' 
                  : 'bg-white/5 border-white/10 text-white/60'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform ${simStep === 1 ? 'scale-110 bg-sky-500 text-white animate-bounce' : 'bg-white/10 text-white'}`}>
                <Network className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400">Step 1: Ingress</span>
              <h4 className="text-base font-bold text-white mt-1">Ocelot API Gateway</h4>
              <p className="text-xs text-white/70 mt-1">JWT Auth, SSL termination, and rate-limiting enforcement.</p>
              {simStep === 1 && <span className="mt-3 px-2.5 py-0.5 rounded-full bg-sky-400 text-black text-[10px] font-bold animate-pulse font-mono">VERIFYING JWT...</span>}
            </div>

            {/* Step 2: Load Balancer -> Microservice */}
            <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center relative ${
              simStep === 2 
                ? 'border-purple-400 bg-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.4)] scale-105' 
                : simStep > 2 
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' 
                  : 'bg-white/5 border-white/10 text-white/60'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform ${simStep === 2 ? 'scale-110 bg-purple-500 text-white animate-bounce' : 'bg-white/10 text-white'}`}>
                <Server className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400">Step 2: Processing</span>
              <h4 className="text-base font-bold text-white mt-1">.NET Core 8 API Node</h4>
              <p className="text-xs text-white/70 mt-1">Clean CQRS command processing across multi-tenant container.</p>
              {simStep === 2 && <span className="mt-3 px-2.5 py-0.5 rounded-full bg-purple-400 text-black text-[10px] font-bold animate-pulse font-mono">EXECUTING COMMAND...</span>}
            </div>

            {/* Step 3: MS SQL & Redis Cache */}
            <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center relative ${
              simStep === 3 
                ? 'border-amber-400 bg-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.4)] scale-105' 
                : simStep > 3 
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' 
                  : 'bg-white/5 border-white/10 text-white/60'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform ${simStep === 3 ? 'scale-110 bg-amber-500 text-white animate-bounce' : 'bg-white/10 text-white'}`}>
                <Database className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">Step 3: Storage</span>
              <h4 className="text-base font-bold text-white mt-1">MS-SQL / PostgreSQL</h4>
              <p className="text-xs text-white/70 mt-1">Sharded index query execution with Redis in-memory cache check.</p>
              {simStep === 3 && <span className="mt-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-bold animate-pulse font-mono">SHARD QUERY...</span>}
            </div>

            {/* Step 4: Response Response */}
            <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center relative ${
              simStep === 4 
                ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-105' 
                : 'bg-white/5 border-white/10 text-white/60'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform ${simStep === 4 ? 'scale-110 bg-emerald-500 text-white animate-bounce' : 'bg-white/10 text-white'}`}>
                <CheckCircle className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">Step 4: Delivery</span>
              <h4 className="text-base font-bold text-white mt-1">HTTP 200 Response</h4>
              <p className="text-xs text-white/70 mt-1">Response compressed and transmitted back in ~{latency}ms average.</p>
              {simStep === 4 && <span className="mt-3 px-2.5 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-bold animate-pulse font-mono">COMPLETED ({latency}ms)</span>}
            </div>

          </div>

          {/* Live System Log Console */}
          <div className="p-5 rounded-2xl bg-[#03060e] border border-white/15 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="font-bold flex items-center gap-2" style={{ color: palette.accentLight }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: palette.success }} />
                DISTRIBUTED TELEMETRY STREAM & LOGS
              </span>
              <span className="text-white/50">Simulated Latency: <strong className="text-white">{latency}ms</strong></span>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
              {logs.map((log, i) => (
                <div key={i} className={`flex items-start gap-2`} style={{ color: i === 0 ? palette.success : 'rgba(255,255,255,0.7)', fontWeight: i === 0 ? 600 : 400 }}>
                  <span className="text-white/40 shrink-0">›</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
