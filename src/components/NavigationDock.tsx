import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, User, Layers, Briefcase, Cpu, Mail, 
  Volume2, VolumeX, Sparkles, Palette
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const NavigationDock: React.FC = () => {
  const { theme, palette, setTheme, soundEnabled, toggleSound, playGlassSound, themes } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showThemeMenu, setShowThemeMenu] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills Gauge', icon: <Layers className="w-4 h-4" /> },
    { id: 'experience', label: 'Timeline', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playGlassSound('click');
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between gap-1 sm:gap-3 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-white/30 backdrop-blur-3xl' 
            : 'glass-pill border-white/20'
        }`}
      >
        {/* Brand/Logo Pill */}
        <div 
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 pr-2 sm:pr-4 cursor-pointer group border-r border-white/15"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
            style={{ background: `linear-gradient(135deg, ${palette.accentLight}, ${palette.info}, ${palette.accentDark})` }}>
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="hidden md:inline font-bold tracking-tight text-sm text-white/90 group-hover:text-white transition-colors">
            Bhavesh.<span style={{ color: palette.accentLight }}>Glass</span>
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {navItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => playGlassSound('hover')}
                className={`relative px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'text-white scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10 border-transparent'
                }`}
                style={isActive ? {
                  backgroundColor: `${palette.accent}33`,
                  borderColor: `${palette.accent}50`,
                  boxShadow: `0 0 20px ${palette.shadowGlow}`
                } : {}}
              >
                <span style={isActive ? { color: palette.accentLight } : {}}>{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
                
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full" 
                    style={{ 
                      background: `linear-gradient(to right, transparent, ${palette.accentLight}, transparent)`,
                      boxShadow: `0 0 8px ${palette.accent}`
                    }} 
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools */}
        <div className="flex items-center gap-1 sm:gap-2 pl-2 sm:pl-3 border-l border-white/15">
          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => { playGlassSound('click'); setShowThemeMenu(!showThemeMenu); }}
              onMouseEnter={() => playGlassSound('hover')}
              title="Change Liquid Glass Theme"
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all border border-transparent hover:border-white/20"
            >
              <Palette className="w-4 h-4" style={{ color: palette.accentLight }} />
            </button>

            {showThemeMenu && (
              <div className="absolute top-12 right-0 w-64 glass-panel rounded-2xl p-2.5 shadow-2xl flex flex-col gap-1 z-50 border-white/30 animate-in fade-in zoom-in-95 duration-200 max-h-[70vh] overflow-y-auto">
                <div className="text-[11px] font-semibold tracking-wider uppercase text-white/50 px-2 py-1 sticky top-0 bg-black/20 backdrop-blur-md rounded-lg">
                  Select Glass Theme &bull; {themes.length}
                </div>

                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { playGlassSound('warp'); setTheme(t.id); setShowThemeMenu(false); }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                      theme === t.id ? 'text-white' : 'text-white/70 hover:bg-white/10 border-transparent'
                    }`}
                    style={theme === t.id ? {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderColor: 'rgba(255,255,255,0.3)'
                    } : {}}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full shadow shrink-0 border border-white/20" style={{ background: t.swatch }} />
                      <span className="flex flex-col items-start leading-tight">
                        <span>{t.label}</span>
                        <span className="text-[10px] text-white/40 font-normal">{t.description}</span>
                      </span>
                    </span>
                    {theme === t.id && (
                      <span className="text-[10px] font-bold shrink-0" style={{ color: t.accent }}>ACTIVE</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => playGlassSound('hover')}
            title={soundEnabled ? "Mute visionOS Sound FX" : "Enable visionOS Sound FX"}
            className="p-2 rounded-full transition-all border"
            style={soundEnabled 
              ? { color: palette.accentLight, backgroundColor: `${palette.accent}20`, borderColor: `${palette.accent}50`, boxShadow: `0 0 12px ${palette.shadowGlow}` } 
              : { color: 'rgba(255,255,255,0.5)' }
            }
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
