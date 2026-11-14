import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LiquidBackground } from './components/LiquidBackground';
import { NavigationDock } from './components/NavigationDock';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ArchitectureSandbox } from './components/ArchitectureSandbox';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Palette, Sparkles, Volume2, VolumeX } from 'lucide-react';

const FloatingQuickTools: React.FC = () => {
  const { theme, setTheme, soundEnabled, toggleSound, playGlassSound, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {open && (
        <div className="glass-panel rounded-3xl p-3 border-white/30 shadow-2xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-4 duration-300 w-[240px] max-h-[70vh] overflow-y-auto">
          <div className="text-[10px] font-mono text-white/50 uppercase px-2 py-1 border-b border-white/10 flex items-center justify-between sticky top-0 bg-black/30 backdrop-blur-md rounded-lg">
            <span>Glass Themes · {themes.length}</span>
            <Sparkles className="w-3 h-3 text-sky-400" />
          </div>

          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                playGlassSound('warp');
                setTheme(t.id);
                setOpen(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                theme === t.id
                  ? 'bg-white/25 text-white border border-white/40'
                  : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shadow shrink-0 border border-white/20"
                  style={{ background: t.swatch }}
                />
                <span className="flex flex-col items-start leading-tight">
                  <span>{t.label}</span>
                  <span className="text-[10px] text-white/40 font-normal normal-case tracking-normal">
                    {t.description}
                  </span>
                </span>
              </span>
              {theme === t.id && (
                <span className="text-[10px] font-mono shrink-0" style={{ color: t.accent }}>
                  ON
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/70 px-2 font-mono">visionOS Audio</span>
            <button
              onClick={() => toggleSound()}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-sky-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-400" />
              )}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          playGlassSound('click');
          setOpen(!open);
        }}
        onMouseEnter={() => playGlassSound('hover')}
        title="Liquid Glass Theme Controller"
        className="glass-pill p-3.5 rounded-full border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-white hover:scale-110 active:scale-95 transition-all group flex items-center gap-2"
      >
        <Palette className="w-5 h-5 text-sky-300 group-hover:rotate-45 transition-transform" />
        <span className="text-xs font-bold hidden sm:inline pr-1">Glass Control</span>
      </button>
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-white relative selection:bg-sky-400/30 selection:text-white font-sans">
        <LiquidBackground />
        <NavigationDock />

        <main className="relative z-10 overflow-hidden">
          <HeroSection />
          <AboutSection />
          <SkillsMatrix />
          <ExperienceTimeline />
          <ArchitectureSandbox />
          <ContactSection />
        </main>

        <Footer />
        <FloatingQuickTools />
      </div>
    </ThemeProvider>
  );
}

export default App;
