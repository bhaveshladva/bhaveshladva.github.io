import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type LiquidTheme =
  | 'cyber'
  | 'prism'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'arctic'
  | 'violet'
  | 'midnight'
  | 'sunset'
  | 'aurora'
  | 'ocean'
  | 'sapphire';

export interface ThemePalette {
  // Brand colors
  primary: string;       // Main brand gradient
  secondary: string;     // Secondary gradient
  accent: string;        // Accent color (single hex)
  accentLight: string;   // Lighter accent variant
  accentDark: string;    // Darker accent variant
  // Functional
  success: string;
  warning: string;
  danger: string;
  info: string;
  // UI chrome
  borderDefault: string;
  borderAccent: string;
  shadowGlow: string;
  // Background
  base: string;
  blob1: string;
  blob2: string;
  blob3: string;
  cursor: string;
  // Text (used in Tailwind)
  textAccent: string;    // hex for inline style
  // CSS gradient strings
  gradientPrimary: string;
  gradientSecondary: string;
  gradientHero: string;
  gradientText: string;   // for glass-glow-text
  gradientBar: string;    // for skill bars
}

export interface ThemeMeta {
  id: LiquidTheme;
  label: string;
  description: string;
  swatch: string;
  accent: string;
  palette: ThemePalette;
}

const PALETTES: Record<LiquidTheme, Omit<ThemePalette, 'primary' | 'secondary'>> = {
  cyber: {
    accent: '#38bdf8', accentLight: '#7dd3fc', accentDark: '#0284c7',
    success: '#34d399', warning: '#fbbf24', danger: '#fb7185', info: '#818cf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(56,189,248,0.4)',
    shadowGlow: 'rgba(56,189,248,0.25)',
    base: '#060b18',
    blob1: 'bg-gradient-to-tr from-sky-500/35 via-indigo-500/35 to-purple-600/30',
    blob2: 'bg-gradient-to-br from-blue-600/35 via-violet-600/35 to-cyan-400/30',
    blob3: 'bg-gradient-to-tl from-indigo-500/30 via-fuchsia-500/30 to-sky-400/30',
    cursor: 'radial-gradient(600px circle at center, rgba(56,189,248,0.18), transparent 70%)',
    textAccent: '#38bdf8',
    gradientPrimary: 'from-sky-400 via-indigo-500 to-purple-500',
    gradientSecondary: 'from-cyan-400 via-blue-500 to-indigo-500',
    gradientHero: 'from-sky-400 via-indigo-500 to-purple-500',
    gradientText: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 50%, #38bdf8 100%)',
    gradientBar: 'from-sky-400 via-indigo-500 to-purple-500',
  },
  prism: {
    accent: '#f472b6', accentLight: '#f9a8d4', accentDark: '#db2777',
    success: '#a78bfa', warning: '#fcd34d', danger: '#fb7185', info: '#38bdf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(244,114,182,0.4)',
    shadowGlow: 'rgba(244,114,182,0.25)',
    base: '#120814',
    blob1: 'bg-gradient-to-tr from-pink-500/35 via-purple-500/35 to-amber-300/30',
    blob2: 'bg-gradient-to-br from-cyan-400/35 via-fuchsia-500/35 to-rose-400/30',
    blob3: 'bg-gradient-to-tl from-violet-500/30 via-indigo-400/30 to-teal-300/30',
    cursor: 'radial-gradient(600px circle at center, rgba(244,114,182,0.18), transparent 70%)',
    textAccent: '#f472b6',
    gradientPrimary: 'from-pink-400 via-purple-500 to-amber-300',
    gradientSecondary: 'from-fuchsia-400 via-pink-500 to-rose-400',
    gradientHero: 'from-pink-400 via-purple-500 to-amber-300',
    gradientText: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 30%, #a1c4fd 65%, #c2e9fb 100%)',
    gradientBar: 'from-pink-500 via-purple-500 to-amber-300',
  },
  emerald: {
    accent: '#34d399', accentLight: '#6ee7b7', accentDark: '#059669',
    success: '#34d399', warning: '#fcd34d', danger: '#fb7185', info: '#38bdf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(52,211,153,0.4)',
    shadowGlow: 'rgba(52,211,153,0.25)',
    base: '#04120f',
    blob1: 'bg-gradient-to-tr from-emerald-500/35 via-teal-500/35 to-cyan-400/30',
    blob2: 'bg-gradient-to-br from-cyan-500/35 via-blue-500/35 to-emerald-400/30',
    blob3: 'bg-gradient-to-tl from-teal-400/30 via-green-500/30 to-blue-400/30',
    cursor: 'radial-gradient(600px circle at center, rgba(16,185,129,0.18), transparent 70%)',
    textAccent: '#34d399',
    gradientPrimary: 'from-emerald-400 via-teal-400 to-cyan-300',
    gradientSecondary: 'from-green-400 via-emerald-500 to-teal-400',
    gradientHero: 'from-emerald-400 via-teal-400 to-cyan-300',
    gradientText: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 50%, #00f2fe 100%)',
    gradientBar: 'from-emerald-500 via-teal-400 to-cyan-300',
  },
  amber: {
    accent: '#fbbf24', accentLight: '#fcd34d', accentDark: '#d97706',
    success: '#34d399', warning: '#fbbf24', danger: '#fb7185', info: '#60a5fa',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(251,191,36,0.4)',
    shadowGlow: 'rgba(251,191,36,0.25)',
    base: '#120c04',
    blob1: 'bg-gradient-to-tr from-amber-400/40 via-orange-500/35 to-yellow-300/30',
    blob2: 'bg-gradient-to-br from-orange-500/35 via-amber-400/35 to-rose-400/25',
    blob3: 'bg-gradient-to-tl from-yellow-400/30 via-orange-400/30 to-red-400/25',
    cursor: 'radial-gradient(600px circle at center, rgba(251,191,36,0.2), transparent 70%)',
    textAccent: '#fbbf24',
    gradientPrimary: 'from-amber-300 via-orange-400 to-yellow-300',
    gradientSecondary: 'from-orange-400 via-amber-500 to-red-300',
    gradientHero: 'from-amber-300 via-orange-400 to-yellow-300',
    gradientText: 'linear-gradient(135deg, #fff7ed 0%, #fcd34d 40%, #f59e0b 100%)',
    gradientBar: 'from-amber-400 via-orange-500 to-yellow-300',
  },
  rose: {
    accent: '#fb7185', accentLight: '#fda4af', accentDark: '#e11d48',
    success: '#a78bfa', warning: '#fbbf24', danger: '#fb7185', info: '#38bdf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(251,113,133,0.4)',
    shadowGlow: 'rgba(251,113,133,0.25)',
    base: '#14060c',
    blob1: 'bg-gradient-to-tr from-rose-500/40 via-pink-500/35 to-fuchsia-500/30',
    blob2: 'bg-gradient-to-br from-red-500/35 via-rose-400/35 to-purple-500/30',
    blob3: 'bg-gradient-to-tl from-pink-400/30 via-rose-500/30 to-orange-400/25',
    cursor: 'radial-gradient(600px circle at center, rgba(251,113,133,0.2), transparent 70%)',
    textAccent: '#fb7185',
    gradientPrimary: 'from-rose-400 via-pink-500 to-fuchsia-500',
    gradientSecondary: 'from-red-400 via-rose-500 to-pink-400',
    gradientHero: 'from-rose-400 via-pink-500 to-fuchsia-500',
    gradientText: 'linear-gradient(135deg, #fff1f2 0%, #fb7185 45%, #e11d48 100%)',
    gradientBar: 'from-rose-500 via-pink-500 to-fuchsia-500',
  },
  arctic: {
    accent: '#67e8f9', accentLight: '#a5f3fc', accentDark: '#06b6d4',
    success: '#34d399', warning: '#fcd34d', danger: '#fb7185', info: '#818cf8',
    borderDefault: 'rgba(255,255,255,0.18)', borderAccent: 'rgba(103,232,249,0.4)',
    shadowGlow: 'rgba(103,232,249,0.25)',
    base: '#071018',
    blob1: 'bg-gradient-to-tr from-cyan-300/35 via-sky-400/35 to-indigo-300/30',
    blob2: 'bg-gradient-to-br from-blue-300/30 via-cyan-400/35 to-slate-300/25',
    blob3: 'bg-gradient-to-tl from-sky-200/25 via-indigo-300/30 to-cyan-300/30',
    cursor: 'radial-gradient(600px circle at center, rgba(103,232,249,0.2), transparent 70%)',
    textAccent: '#67e8f9',
    gradientPrimary: 'from-cyan-300 via-sky-400 to-indigo-300',
    gradientSecondary: 'from-blue-300 via-cyan-400 to-teal-300',
    gradientHero: 'from-cyan-300 via-sky-400 to-indigo-300',
    gradientText: 'linear-gradient(135deg, #f0f9ff 0%, #67e8f9 45%, #38bdf8 100%)',
    gradientBar: 'from-cyan-300 via-sky-400 to-indigo-300',
  },
  violet: {
    accent: '#a78bfa', accentLight: '#c4b5fd', accentDark: '#7c3aed',
    success: '#34d399', warning: '#fcd34d', danger: '#fb7185', info: '#38bdf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(167,139,250,0.4)',
    shadowGlow: 'rgba(167,139,250,0.25)',
    base: '#0a0614',
    blob1: 'bg-gradient-to-tr from-violet-500/40 via-purple-500/35 to-fuchsia-500/30',
    blob2: 'bg-gradient-to-br from-indigo-500/35 via-violet-600/35 to-pink-500/30',
    blob3: 'bg-gradient-to-tl from-purple-400/30 via-fuchsia-500/30 to-blue-500/25',
    cursor: 'radial-gradient(600px circle at center, rgba(167,139,250,0.2), transparent 70%)',
    textAccent: '#a78bfa',
    gradientPrimary: 'from-violet-400 via-purple-500 to-fuchsia-500',
    gradientSecondary: 'from-indigo-400 via-violet-500 to-pink-400',
    gradientHero: 'from-violet-400 via-purple-500 to-fuchsia-500',
    gradientText: 'linear-gradient(135deg, #f5f3ff 0%, #c4b5fd 40%, #a855f7 100%)',
    gradientBar: 'from-violet-500 via-purple-500 to-fuchsia-400',
  },
  midnight: {
    accent: '#94a3b8', accentLight: '#cbd5e1', accentDark: '#64748b',
    success: '#6ee7b7', warning: '#fbbf24', danger: '#fca5a5', info: '#93c5fd',
    borderDefault: 'rgba(255,255,255,0.12)', borderAccent: 'rgba(148,163,184,0.35)',
    shadowGlow: 'rgba(148,163,184,0.15)',
    base: '#050508',
    blob1: 'bg-gradient-to-tr from-slate-400/25 via-zinc-500/20 to-slate-600/20',
    blob2: 'bg-gradient-to-br from-zinc-500/25 via-slate-400/20 to-neutral-500/20',
    blob3: 'bg-gradient-to-tl from-slate-300/15 via-zinc-400/20 to-slate-500/20',
    cursor: 'radial-gradient(600px circle at center, rgba(148,163,184,0.15), transparent 70%)',
    textAccent: '#94a3b8',
    gradientPrimary: 'from-slate-300 via-zinc-400 to-slate-500',
    gradientSecondary: 'from-zinc-400 via-slate-500 to-neutral-400',
    gradientHero: 'from-slate-300 via-zinc-400 to-slate-500',
    gradientText: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 45%, #94a3b8 100%)',
    gradientBar: 'from-slate-300 via-zinc-400 to-slate-500',
  },
  sunset: {
    accent: '#fb923c', accentLight: '#fdba74', accentDark: '#ea580c',
    success: '#a78bfa', warning: '#fbbf24', danger: '#fb7185', info: '#38bdf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(251,146,60,0.4)',
    shadowGlow: 'rgba(251,146,60,0.25)',
    base: '#140a04',
    blob1: 'bg-gradient-to-tr from-orange-500/40 via-red-400/35 to-amber-400/30',
    blob2: 'bg-gradient-to-br from-rose-500/35 via-orange-500/35 to-yellow-400/30',
    blob3: 'bg-gradient-to-tl from-red-400/30 via-rose-500/30 to-orange-400/25',
    cursor: 'radial-gradient(600px circle at center, rgba(251,146,60,0.2), transparent 70%)',
    textAccent: '#fb923c',
    gradientPrimary: 'from-orange-400 via-red-400 to-amber-400',
    gradientSecondary: 'from-rose-400 via-orange-500 to-red-400',
    gradientHero: 'from-orange-400 via-red-400 to-amber-400',
    gradientText: 'linear-gradient(135deg, #fff7ed 0%, #fb923c 45%, #ea580c 100%)',
    gradientBar: 'from-orange-400 via-red-500 to-amber-400',
  },
  aurora: {
    accent: '#4ade80', accentLight: '#86efac', accentDark: '#16a34a',
    success: '#4ade80', warning: '#fcd34d', danger: '#fb7185', info: '#38bdf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(74,222,128,0.4)',
    shadowGlow: 'rgba(74,222,128,0.25)',
    base: '#04100a',
    blob1: 'bg-gradient-to-tr from-green-400/40 via-lime-500/35 to-emerald-400/30',
    blob2: 'bg-gradient-to-br from-teal-400/35 via-green-500/35 to-yellow-400/25',
    blob3: 'bg-gradient-to-tl from-emerald-400/30 via-green-500/30 to-lime-400/25',
    cursor: 'radial-gradient(600px circle at center, rgba(74,222,128,0.18), transparent 70%)',
    textAccent: '#4ade80',
    gradientPrimary: 'from-green-400 via-lime-400 to-emerald-300',
    gradientSecondary: 'from-teal-400 via-green-500 to-lime-400',
    gradientHero: 'from-green-400 via-lime-400 to-emerald-300',
    gradientText: 'linear-gradient(135deg, #f0fdf4 0%, #4ade80 45%, #16a34a 100%)',
    gradientBar: 'from-green-400 via-lime-500 to-emerald-400',
  },
  ocean: {
    accent: '#38bdf8', accentLight: '#7dd3fc', accentDark: '#0284c7',
    success: '#2dd4bf', warning: '#fbbf24', danger: '#fb7185', info: '#6366f1',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(56,189,248,0.4)',
    shadowGlow: 'rgba(56,189,248,0.25)',
    base: '#040e1a',
    blob1: 'bg-gradient-to-tr from-blue-500/35 via-sky-500/35 to-cyan-400/30',
    blob2: 'bg-gradient-to-br from-indigo-500/35 via-blue-500/35 to-teal-400/30',
    blob3: 'bg-gradient-to-tl from-cyan-500/30 via-blue-500/30 to-sky-400/25',
    cursor: 'radial-gradient(600px circle at center, rgba(56,189,248,0.18), transparent 70%)',
    textAccent: '#38bdf8',
    gradientPrimary: 'from-blue-400 via-sky-500 to-cyan-400',
    gradientSecondary: 'from-indigo-400 via-blue-500 to-teal-400',
    gradientHero: 'from-blue-400 via-sky-500 to-cyan-400',
    gradientText: 'linear-gradient(135deg, #eff6ff 0%, #38bdf8 45%, #0284c7 100%)',
    gradientBar: 'from-blue-500 via-sky-500 to-cyan-400',
  },
  sapphire: {
    accent: '#6366f1', accentLight: '#a5b4fc', accentDark: '#4338ca',
    success: '#34d399', warning: '#fbbf24', danger: '#fb7185', info: '#38bdf8',
    borderDefault: 'rgba(255,255,255,0.15)', borderAccent: 'rgba(99,102,241,0.4)',
    shadowGlow: 'rgba(99,102,241,0.25)',
    base: '#080814',
    blob1: 'bg-gradient-to-tr from-indigo-500/40 via-blue-500/35 to-violet-500/30',
    blob2: 'bg-gradient-to-br from-blue-600/35 via-indigo-600/35 to-sky-400/30',
    blob3: 'bg-gradient-to-tl from-violet-500/30 via-blue-500/30 to-indigo-400/25',
    cursor: 'radial-gradient(600px circle at center, rgba(99,102,241,0.18), transparent 70%)',
    textAccent: '#6366f1',
    gradientPrimary: 'from-indigo-400 via-blue-500 to-violet-500',
    gradientSecondary: 'from-blue-400 via-indigo-500 to-violet-400',
    gradientHero: 'from-indigo-400 via-blue-500 to-violet-500',
    gradientText: 'linear-gradient(135deg, #eef2ff 0%, #818cf8 45%, #6366f1 100%)',
    gradientBar: 'from-indigo-400 via-blue-500 to-violet-500',
  },
};

const buildSwatch = (p: Omit<ThemePalette, 'primary' | 'secondary'>) => {
  const colors = [p.accentLight, p.accent, p.accentDark];
  return `linear-gradient(135deg, ${colors.join(', ')})`;
};

export const THEME_CATALOG: ThemeMeta[] = (Object.keys(PALETTES) as LiquidTheme[]).map(id => {
  const p = PALETTES[id];
  return {
    id,
    label: getLabel(id),
    description: getDesc(id),
    swatch: buildSwatch(p),
    accent: p.accent,
    palette: { primary: p.gradientHero, secondary: p.gradientSecondary, ...p },
  };
});

function getLabel(id: LiquidTheme): string {
  const m: Record<LiquidTheme, string> = {
    cyber: 'Obsidian Cyber', prism: 'Iridescent Prism', emerald: 'Deep Ocean Emerald',
    amber: 'Solar Amber', rose: 'Crimson Rose', arctic: 'Arctic Frost',
    violet: 'Nebula Violet', midnight: 'Midnight Noir', sunset: 'Tropic Sunset',
    aurora: 'Aurora Borealis', ocean: 'Deep Sea Sapphire', sapphire: 'Royal Sapphire',
  };
  return m[id];
}

function getDesc(id: LiquidTheme): string {
  const m: Record<LiquidTheme, string> = {
    cyber: 'Sky-indigo deep space glass',
    prism: 'Pink-to-amber holographic',
    emerald: 'Teal-cyan liquid depths',
    amber: 'Warm honey & golden glow',
    rose: 'Velvet rose & magenta frost',
    arctic: 'Ice-white & glacial cyan',
    violet: 'Deep violet cosmic haze',
    midnight: 'Ultra-dark monochrome',
    sunset: 'Tropic orange & fire red',
    aurora: 'Northern lights green',
    ocean: 'Deep sea blue & teal',
    sapphire: 'Royal indigo & cobalt',
  };
  return m[id];
}

// ─── Theme Context ───

interface ThemeContextType {
  theme: LiquidTheme;
  setTheme: (theme: LiquidTheme) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playGlassSound: (type?: 'click' | 'hover' | 'chime' | 'warp') => void;
  themes: ThemeMeta[];
  palette: ThemePalette;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<LiquidTheme>('cyber');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const palette = useMemo(() => {
    const found = THEME_CATALOG.find(t => t.id === theme);
    return found?.palette ?? THEME_CATALOG[0].palette;
  }, [theme]);

  const playGlassSound = (type: 'click' | 'hover' | 'chime' | 'warp' = 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now); osc.stop(now + 0.06);
      } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.05);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now); osc.stop(now + 0.05);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now); osc.stop(now + 0.35);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      }
    } catch { /* ignore */ }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) setTimeout(() => playGlassSound('chime'), 50);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, soundEnabled, toggleSound, playGlassSound, themes: THEME_CATALOG, palette }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
