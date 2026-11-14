import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { 
  Briefcase, GraduationCap, Calendar, MapPin, CheckCircle
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { palette, playGlassSound, theme } = useTheme();
  const [filter, setFilter] = useState<'all' | 'Professional' | 'Education'>('all');

  const filteredTimeline = filter === 'all'
    ? PORTFOLIO_DATA.timeline
    : PORTFOLIO_DATA.timeline.filter(item => item.type === filter);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill font-mono text-xs uppercase tracking-widest mb-4 border-white/20" style={{ color: palette.accentLight }}>
          <Briefcase className="w-3.5 h-3.5" /> Career Journey &amp; Trajectory
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Professional Progression, <br />
          <span className={`glass-glow-text-${theme}`}>From Genesis to Team Lead.</span>
        </h2>
        <p className="text-white/70 text-base sm:text-lg">
          Over 10+ years of rigorous software delivery, leadership, and architectural problem-solving across complex enterprise SaaS environments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-3 mb-16">
        <div className="glass-pill p-1.5 rounded-full flex items-center gap-1.5 border-white/20">
          {(['all', 'Professional', 'Education'] as const).map(f => (
            <button
              key={f}
              onClick={() => { playGlassSound('click'); setFilter(f); }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all border ${
                filter === f ? 'text-white border-white/30' : 'text-white/70 hover:text-white border-transparent'
              }`}
              style={filter === f ? { backgroundColor: `${palette.accent}33`, boxShadow: `0 0 15px ${palette.shadowGlow}` } : {}}
            >
              {f === 'Professional' && <Briefcase className="w-3.5 h-3.5" />}
              {f === 'Education' && <GraduationCap className="w-3.5 h-3.5" />}
              {f === 'all' ? 'All History' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Tree */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central glowing optical beam */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 opacity-60"
          style={{
            background: `linear-gradient(to bottom, ${palette.accent}, ${palette.info}, transparent)`,
            boxShadow: `0 0 12px ${palette.shadowGlow}`
          }} 
        />

        <div className="space-y-12 relative">
          {filteredTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={item.id}
                onMouseEnter={() => playGlassSound('hover')}
                className={`relative flex flex-col sm:flex-row items-start ${isLeft ? 'sm:flex-row-reverse' : ''} group`}
              >
                {/* Center Node Orb */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 w-9 h-9 rounded-full border-2 flex items-center justify-center z-20 group-hover:scale-125 transition-transform duration-300"
                  style={{ 
                    backgroundColor: palette.base,
                    borderColor: palette.accent,
                    boxShadow: `0 0 20px ${palette.shadowGlow}`
                  }}>
                  {item.type === 'Professional' ? (
                    <Briefcase className="w-4 h-4" style={{ color: palette.accent }} />
                  ) : (
                    <GraduationCap className="w-4 h-4" style={{ color: palette.info }} />
                  )}
                </div>

                <div className={`w-full sm:w-[46%] pl-12 sm:pl-0 ${isLeft ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                  
                  <div className="glass-panel-interactive rounded-[2rem] p-6 sm:p-8 border-white/20 shadow-xl relative overflow-hidden group-hover:border-white/40">
                    
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono mb-3 border ${isLeft ? 'sm:ml-auto' : ''}`}
                      style={{ backgroundColor: `${palette.accent}14`, color: palette.accentLight, borderColor: `${palette.accent}2a` }}>
                      <Calendar className="w-3 h-3" /> {item.period}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{item.role}</h3>
                    
                    <div className={`flex flex-wrap items-center gap-3 mt-1 mb-4 text-sm font-medium text-white/80 ${isLeft ? 'sm:justify-end' : ''}`}>
                      <span style={{ color: palette.info }}>{item.company}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-xs text-white/60">
                        <MapPin className="w-3.5 h-3.5" style={{ color: palette.danger }} /> {item.location}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mb-6 text-left">
                      {item.highlights.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: palette.success }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`flex flex-wrap gap-1.5 pt-4 border-t border-white/15 ${isLeft ? 'sm:justify-end' : ''}`}>
                      {item.skillsUsed.map(skill => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono hover:bg-white/15 transition-colors border"
                          style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
