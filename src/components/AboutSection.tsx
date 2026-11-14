import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { 
  User, MapPin, GraduationCap, Sparkles, Heart, Code2, Terminal, Server
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { palette, playGlassSound, theme } = useTheme();
  const { personal } = PORTFOLIO_DATA;

  const domainCards = [
    { icon: <Terminal className="w-3.5 h-3.5" />, label: 'Frontend', title: 'Angular & React SPAs', sub: '100% HTML/CSS Precision', color: palette.accent },
    { icon: <Server className="w-3.5 h-3.5" />, label: 'Backend', title: '.NET Core & Node.js', sub: 'Microservices Architecture', color: palette.info },
    { icon: <Heart className="w-3.5 h-3.5" />, label: 'Desktop', title: 'WPF & Telerik Grid', sub: 'High-Speed Data Binding', color: palette.success },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill font-mono text-xs uppercase tracking-widest mb-4 border-white/20" style={{ color: palette.accentLight }}>
          <User className="w-3.5 h-3.5" /> About Bhavesh Ladva
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Architecting Systems, <br />
          <span className={`glass-glow-text-${theme}`}>Elevating Experiences.</span>
        </h2>
        <p className="text-white/70 text-base sm:text-lg">
          Full stack software engineer based in Gandhinagar, GJ, INDIA with a relentless drive for robust software craftsmanship and scalable microservices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Bio Glass Panel */}
        <div className="lg:col-span-7 glass-panel rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-white/20 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: `${palette.info}18` }} />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl border flex items-center justify-center" style={{ backgroundColor: `${palette.accent}15`, borderColor: `${palette.accent}30`, color: palette.accent }}>
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Full Stack Engineering Leadership</h3>
                <p className="text-xs font-mono" style={{ color: palette.accentLight }}>10+ Years of Proven SaaS Delivery</p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
              I&rsquo;m a full stack software engineer located in <strong style={{ color: palette.accentLight }}>Gandhinagar, GJ, INDIA</strong>. I have a serious passion for <strong className="text-white">system designs</strong> and creating intuitive, dynamic user experiences across both enterprise web and desktop software suites.
            </p>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              Interested in the entire full spectrum of web applications and working on ambitious, mission-critical projects with positive, driven engineering squads. As a <strong style={{ color: palette.success }}>Team Lead &amp; Problem Solver at TechAvidus</strong>, I delegate tasks to 20+ engineers while directing distributed Microservices architectures that power high-availability cloud solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15">
            {domainCards.map((card, i) => (
              <div key={i} className="p-4 rounded-2xl border text-left" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs font-mono mb-1 uppercase tracking-wider flex items-center gap-1.5" style={{ color: card.color }}>
                  {card.icon} {card.label}
                </div>
                <div className="text-sm font-semibold text-white">{card.title}</div>
                <div className="text-xs text-white/60 mt-1">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Details Grid */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick Identity Card */}
          <div 
            onMouseEnter={() => playGlassSound('hover')}
            className="glass-panel-interactive rounded-[2.5rem] p-8 border-white/20 shadow-xl flex-1 flex flex-col justify-center"
          >
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: palette.warning }} /> Executive Profile
            </h4>

            <div className="space-y-3">
              {[
                { label: 'Full Name', value: personal.name, icon: null, color: 'white' },
                { label: 'Location', value: <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Gandhinagar, GJ, INDIA</span>, icon: null, color: 'white' },
                { label: 'Phone', value: personal.phone, icon: null, color: palette.success },
                { label: 'Email', value: personal.email, icon: null, color: palette.accentLight },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <span className="text-xs font-mono text-white/60 uppercase">{row.label}</span>
                  <span className="text-sm font-bold font-mono truncate max-w-[200px]" style={{ color: row.color }}>{row.value}</span>
                </div>
              ))}

              <div className="flex items-center justify-between p-3.5 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <span className="text-xs font-mono text-white/60 uppercase">Freelance</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ backgroundColor: `${palette.success}1a`, borderColor: `${palette.success}4d`, color: palette.success }}>
                  AVAILABLE
                </span>
              </div>
            </div>
          </div>

          {/* Education Mini Glass Panel */}
          <div 
            onMouseEnter={() => playGlassSound('hover')}
            className="glass-panel-interactive rounded-[2.5rem] p-6 sm:p-8 border-white/20 shadow-xl flex items-center gap-5"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${palette.info}, ${palette.accentDark})` }}>
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: palette.accentLight }}>Education Highlights</div>
              <h4 className="text-base font-bold text-white mt-0.5">Bachelor of Engineering (2011 &ndash; 2015)</h4>
              <p className="text-xs text-white/70 mt-1">L. D. College of Engineering, Ahmedabad, GJ</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
