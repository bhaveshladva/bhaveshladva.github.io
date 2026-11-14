import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, ArrowUp, Code2, Mail, Phone, Terminal
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { theme, themes, palette, playGlassSound } = useTheme();
  const { personal } = PORTFOLIO_DATA;
  const activeTheme = themes.find(t => t.id === theme);

  const scrollToTop = () => {
    playGlassSound('warp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/10 mt-12">
      <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 border-white/15 shadow-2xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-white/10">
          
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: `linear-gradient(135deg, ${palette.accentLight}, ${palette.info}, ${palette.accentDark})` }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                {personal.name} <span className="font-mono text-sm uppercase" style={{ color: palette.accentLight }}>| Liquid Glass</span>
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-md">
              {personal.title} located in Gandhinagar, GJ, INDIA. Dedicated to enterprise SaaS architectures, robust microservices, and dynamic SPAs.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col md:items-end justify-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => playGlassSound('click')}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                style={{ color: palette.info }}
                title="Code Repository"
              >
                <Code2 className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${personal.email}`}
                onClick={() => playGlassSound('click')}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                title="Email Bhavesh"
              >
                <Mail className="w-5 h-5" style={{ color: palette.accentLight }} />
              </a>

              <a
                href={`tel:${personal.phone}`}
                onClick={() => playGlassSound('click')}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
                title="Call Phone"
              >
                <Phone className="w-5 h-5" style={{ color: palette.success }} />
              </a>

              <button
                onClick={scrollToTop}
                onMouseEnter={() => playGlassSound('hover')}
                className="glass-button px-4 py-3 rounded-2xl text-white text-xs font-mono font-bold flex items-center gap-2 border-white/30"
              >
                <span>Top</span>
                <ArrowUp className="w-4 h-4" style={{ color: palette.accentLight }} />
              </button>
            </div>

            <div className="text-xs font-mono text-white/50 flex items-center gap-2">
              Active Theme:
              <span className="w-2.5 h-2.5 rounded-full border border-white/30" style={{ background: activeTheme?.swatch }} />
              <strong className="text-white">{activeTheme?.label ?? theme}</strong>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div>
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Engineered with React 19, Tailwind CSS v4 &amp;</span>
            <span className="font-semibold flex items-center gap-1" style={{ color: palette.accentLight }}>
              <Terminal className="w-3.5 h-3.5" /> Apple visionOS Liquid Glass Aesthetics
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
