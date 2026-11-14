import React, { useState } from 'react';
import { PORTFOLIO_DATA, Skill } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { 
  Layers, Code2, Server, Database, Monitor, Cpu, 
  CheckCircle2, Sparkles, ChevronRight, Info
} from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const { theme, palette, playGlassSound } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories = [
    { id: 'all', label: 'All Capabilities', icon: <Layers className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend & SPAs', icon: <Code2 className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend & APIs', icon: <Server className="w-4 h-4" /> },
    { id: 'database', label: 'Databases & Storage', icon: <Database className="w-4 h-4" /> },
    { id: 'desktop', label: 'Desktop & Grid Controls', icon: <Monitor className="w-4 h-4" /> },
  ];

  const filteredSkills = activeCategory === 'all'
    ? PORTFOLIO_DATA.skills
    : PORTFOLIO_DATA.skills.filter(s => s.category === activeCategory || (activeCategory === 'backend' && s.category === 'architecture'));

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill font-mono text-xs uppercase tracking-widest mb-4 border-white/20" style={{ color: palette.accentLight }}>
          <Layers className="w-3.5 h-3.5" /> Technical Matrix &amp; Liquid Gauge
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Enterprise Expertise, <br />
          <span className={`glass-glow-text-${theme}`}>Calibrated to 100%.</span>
        </h2>
        <p className="text-white/70 text-base sm:text-lg">
          Click any skill to inspect deep architectural proficiencies across frontend SPAs, backend .NET/Node engines, and desktop systems.
        </p>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { playGlassSound('click'); setActiveCategory(cat.id); setSelectedSkill(null); }}
              onMouseEnter={() => playGlassSound('hover')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                isActive
                  ? 'text-white border-white/40 scale-105'
                  : 'glass-pill text-white/70 hover:text-white hover:border-white/30'
              }`}
              style={isActive ? { backgroundColor: `${palette.accent}33`, boxShadow: `0 10px 25px ${palette.shadowGlow}` } : {}}
            >
              <span style={isActive ? { color: palette.accentLight } : {}}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => {
          const isSelected = selectedSkill?.name === skill.name;
          const barGradient = palette.gradientBar;
          return (
            <div
              key={skill.name}
              onClick={() => { playGlassSound('chime'); setSelectedSkill(isSelected ? null : skill); }}
              onMouseEnter={() => playGlassSound('hover')}
              className={`glass-panel-interactive rounded-3xl p-6 border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                isSelected ? 'scale-[1.03]' : 'border-white/20 hover:border-white/35'
              }`}
              style={{
                ...(isSelected ? {
                  borderColor: palette.borderAccent,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  boxShadow: `0 20px 60px ${palette.shadowGlow}`
                } : {}),
                animationDelay: `${index * 80}ms`
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />

              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl border flex items-center justify-center shadow-md" 
                    style={{ backgroundColor: `${palette.accent}14`, borderColor: `${palette.accent}30`, color: palette.accentLight }}>
                    {skill.category === 'frontend' && <Code2 className="w-5 h-5" />}
                    {skill.category === 'backend' && <Server className="w-5 h-5" />}
                    {skill.category === 'database' && <Database className="w-5 h-5" />}
                    {skill.category === 'desktop' && <Monitor className="w-5 h-5" />}
                    {skill.category === 'architecture' && <Cpu className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">{skill.name}</h4>
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: `${palette.accentLight}cc` }}>{skill.category}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-white tracking-tight">{skill.level}%</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5 min-h-[38px]">
                {skill.description}
              </p>

              {/* Liquid Fill Gauge Progress Bar */}
              <div className="w-full h-3 rounded-full border overflow-hidden p-[2px] relative" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)' }}>
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden bg-gradient-to-r ${barGradient}`}
                  style={{ width: `${skill.level}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: palette.success }} /> Enterprise Production
                </span>
                <span className="flex items-center gap-1" style={{ color: palette.accentLight }}>
                  Click to inspect <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Inspector */}
      {selectedSkill && (
        <div className="mt-12 glass-panel rounded-[2rem] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300 relative"
          style={{ borderColor: palette.borderAccent, boxShadow: `0 25px 80px ${palette.shadowGlow}` }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl border" style={{ backgroundColor: `${palette.accent}20`, color: palette.accentLight, borderColor: `${palette.accent}4d` }}>
                <Info className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: palette.accentLight }}>Deep Dive Inspection</span>
                <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
              </div>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="glass-button px-4 py-2 rounded-xl text-xs font-mono text-white/80 hover:text-white"
            >
              Close Inspector &times;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="text-xs font-mono text-white/60 uppercase mb-2">Proficiency Calibration</div>
              <div className="text-4xl font-black font-mono mb-1" style={{ color: palette.accentLight }}>{selectedSkill.level}%</div>
              <div className="text-xs text-white/70">Benchmark verified across 10+ years of full stack deployment.</div>
            </div>

            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="text-xs font-mono text-white/60 uppercase mb-2">Primary Domain</div>
              <div className="text-lg font-bold text-white capitalize mb-1">{selectedSkill.category} Architecture</div>
              <div className="text-xs text-white/70">Integrated into microservice data pipelines and responsive SPAs.</div>
            </div>

            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="text-xs font-mono text-white/60 uppercase mb-2">Production Footprint</div>
              <div className="text-lg font-bold mb-1 flex items-center gap-1.5" style={{ color: palette.success }}>
                <Sparkles className="w-4 h-4" /> Active @ TechAvidus
              </div>
              <div className="text-xs text-white/70">Used in enterprise SaaS layouts, grid controls &amp; CI/CD workflows.</div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
