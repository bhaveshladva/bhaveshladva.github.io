import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, MapPin, Phone, Mail, Download, ArrowRight, 
  Check, Terminal, Clock, Cpu, Award, Users, Globe, Star
} from 'lucide-react';

const STAT_ICONS = [Award, Users, Globe, Star];

export const HeroSection: React.FC = () => {
  const { theme, palette, playGlassSound } = useTheme();
  const { personal } = PORTFOLIO_DATA;
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    playGlassSound('chime');
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  // Build dynamic palette styles
  const accent = palette.accent;
  const accentLight = palette.accentLight;
  const gradientHero = palette.gradientHero;
  const shadowGlow = palette.shadowGlow;

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Status & Live Clock Bar */}
      <div className="w-full max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2.5 border-white/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: palette.success }}></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: palette.success }}></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wide">
            {personal.freelance}
          </span>
        </div>

        <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm text-white/80 border-white/20">
          <Clock className="w-3.5 h-3.5 animate-spin-slow" style={{ color: accent }} />
          <span>India Standard Time (IST):</span>
          <span className="font-mono font-bold text-white tracking-wider">{istTime || 'Loading...'}</span>
        </div>
      </div>

      {/* Main Liquid Glass Hero Card */}
      <div className="w-full max-w-5xl glass-panel rounded-[2.5rem] p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.6)] border-white/25 animate-in fade-in zoom-in-95 duration-1000">
        
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70 pointer-events-none" />
        
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${accent}18` }} />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${palette.info}18` }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Text & Bio */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 font-mono text-xs mb-6 uppercase tracking-widest backdrop-blur-md" style={{ color: accentLight }}>
              <Terminal className="w-3.5 h-3.5" /> System Architect &bull; Full Stack Developer
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1]">
              Hi, I&rsquo;m <br />
              <span className={`font-black glass-glow-text-${theme}`}>
                {personal.name}
              </span>
            </h1>

            <p className="text-lg sm:text-2xl font-medium text-white/90 mb-6 max-w-2xl leading-relaxed font-sans">
              {personal.title} with{' '}
              <span className="underline decoration-2 underline-offset-4 font-bold" style={{ color: accent, textDecorationColor: `${accent}66` }}>
                10+ years of experience
              </span>{' '}
              crafting enterprise SaaS, dynamic SPAs &amp; distributed microservices.
            </p>

            <p className="text-sm sm:text-base text-white/70 mb-8 max-w-2xl leading-relaxed">
              Based in <span className="text-white font-semibold inline-flex items-center gap-1"><MapPin className="w-4 h-4" style={{ color: palette.danger }} /> {personal.location}</span>. I transform complex architectural workflows into crystal-clear, high-speed applications.
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#architecture"
                onClick={() => playGlassSound('click')}
                className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${gradientHero} text-white font-bold text-sm sm:text-base flex items-center gap-2.5 hover:scale-105 transition-all duration-300`}
                style={{ boxShadow: `0 10px 30px ${shadowGlow}` }}
              >
                <Cpu className="w-4 h-4" />
                Explore Architecture
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => copyToClipboard(personal.email, 'email')}
                onMouseEnter={() => playGlassSound('hover')}
                className="glass-button px-5 py-3.5 rounded-2xl text-white font-medium text-sm flex items-center gap-2 border-white/25 hover:border-white/40"
              >
                {copiedType === 'email' ? (
                  <><Check className="w-4 h-4" style={{ color: palette.success }} /><span style={{ color: palette.success }} className="font-semibold">Email Copied!</span></>
                ) : (
                  <><Mail className="w-4 h-4" style={{ color: accent }} /><span>Copy Email</span></>
                )}
              </button>

              <button
                onClick={() => copyToClipboard(personal.phone, 'phone')}
                onMouseEnter={() => playGlassSound('hover')}
                className="glass-button px-5 py-3.5 rounded-2xl text-white font-medium text-sm flex items-center gap-2 border-white/25 hover:border-white/40"
              >
                {copiedType === 'phone' ? (
                  <><Check className="w-4 h-4" style={{ color: palette.success }} /><span style={{ color: palette.success }} className="font-semibold">Phone Copied!</span></>
                ) : (
                  <><Phone className="w-4 h-4" style={{ color: palette.info }} /><span>Copy Phone</span></>
                )}
              </button>

              <a
                href="#about"
                onClick={() => playGlassSound('click')}
                className="glass-button px-5 py-3.5 rounded-2xl text-white/80 hover:text-white font-medium text-sm flex items-center gap-2 border-white/20"
              >
                <Download className="w-4 h-4" style={{ color: palette.warning }} />
                <span>View Full Bio</span>
              </a>
            </div>
          </div>

          {/* Right Floating Glass Orb Card / Profile Visualizer */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-64 sm:w-72 aspect-square">
              
              {/* Spinning Liquid Glass Border Rings — theme-aware */}
              <div className="absolute inset-0 rounded-full border animate-spin-slow pointer-events-none" style={{ borderColor: `${accent}4d` }} />
              <div className="absolute -inset-4 rounded-full border animate-reverse-spin pointer-events-none" style={{ borderColor: `${palette.info}33` }} />

              {/* Profile Card inside glass sphere */}
              <div className="w-full h-full rounded-[3rem] glass-panel p-4 flex flex-col items-center justify-center text-center relative overflow-hidden border-white/30 shadow-2xl group hover:scale-105 transition-transform duration-500">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/40 shadow-inner mb-4 relative">
                  <img 
                    src={personal.avatar} 
                    alt={personal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">{personal.name}</h3>
                <p className="text-xs font-mono font-medium mt-1" style={{ color: accentLight }}>Full Stack Team Lead</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] text-white/80 border border-white/15">
                  <Sparkles className="w-3 h-3" style={{ color: palette.warning }} /> 10+ Years Exp &bull; TechAvidus
                </div>
              </div>

              {/* Floating Mini Glass Badge: Phone */}
              <div 
                onClick={() => copyToClipboard(personal.phone, 'phone')}
                className="absolute -bottom-4 -right-4 glass-pill px-3.5 py-2 rounded-2xl text-xs font-mono font-bold text-white border-white/30 shadow-xl cursor-pointer hover:scale-110 transition-transform flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" style={{ color: palette.success }} />
                <span>{personal.phone}</span>
              </div>

              {/* Floating Mini Glass Badge: Email */}
              <div 
                onClick={() => copyToClipboard(personal.email, 'email')}
                className="absolute -top-4 -left-4 glass-pill px-3.5 py-2 rounded-2xl text-xs font-mono font-bold text-white border-white/30 shadow-xl cursor-pointer hover:scale-110 transition-transform flex items-center gap-1.5 max-w-[210px] truncate"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                <span className="truncate">{personal.email}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Floating Liquid Stats Cards */}
      <div className="w-full max-w-5xl mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {personal.stats.map((stat, i) => {
          const Icon = STAT_ICONS[i % STAT_ICONS.length];
          const statAccents = [accent, palette.info, palette.warning, palette.success];
          const iconColor = statAccents[i % statAccents.length];
          return (
            <div 
              key={i}
              onMouseEnter={() => playGlassSound('hover')}
              className="glass-panel-interactive rounded-3xl p-5 sm:p-6 text-center border-white/20 flex flex-col items-center justify-center relative overflow-hidden group"
            >
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: iconColor }} />
              
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 border transition-colors group-hover:scale-110" 
                style={{ backgroundColor: `${iconColor}15`, borderColor: `${iconColor}30`, color: iconColor }}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="text-3xl sm:text-4xl font-black font-sans mb-1" style={{ 
                background: `linear-gradient(135deg, #ffffff 0%, ${iconColor} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-white/70 uppercase tracking-wider font-mono">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
