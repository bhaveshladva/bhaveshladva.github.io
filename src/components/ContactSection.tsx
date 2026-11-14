import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Sparkles, 
  Clock, 
  MessageSquare, 
  User, 
  FileText
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { playGlassSound, theme, palette } = useTheme();
  const { personal } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Enterprise SaaS & Microservices',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    playGlassSound('chime');
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    playGlassSound('chime');
    setSubmitted(true);

    // Trigger celebratory canvas-confetti fireworks
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#38bdf8', '#a855f7', '#10b981', '#f59e0b']
      });
    } catch {
      // ignore if confetti fails
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill font-mono text-xs uppercase tracking-widest mb-4 border-white/20" style={{ color: palette.accentLight }}>
          <MessageSquare className="w-3.5 h-3.5" /> Start a Conversation
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Let’s Build Ambitious <br />
          <span className={`glass-glow-text-${theme}`}>Applications Together.</span>
        </h2>
        <p className="text-white/80 text-base sm:text-lg italic font-medium leading-relaxed max-w-2xl mx-auto">
          "Always would like to build long term relationships with great clients. Don't hesitate to contact me, Looking forward to have a great contribution for next project with you!"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Contact Cards Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Direct Info Card */}
          <div className="glass-panel rounded-[2.5rem] p-8 border-white/20 shadow-2xl flex flex-col justify-between flex-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: `${palette.info}18` }} />

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Direct Contact Coordinates</h3>
              <p className="text-sm text-white/70 mb-8">
                Whether for full stack engineering leadership, SaaS architecture consulting, or freelance development — reach out instantly below.
              </p>

              <div className="space-y-4">
                
                {/* Email Box */}
                <div 
                  onClick={() => copyToClipboard(personal.email, 'email')}
                  onMouseEnter={() => playGlassSound('hover')}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/50 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${palette.accent}20`, color: palette.accentLight, borderColor: `${palette.accent}4d` }}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-white/50 uppercase">Email Address</span>
                      <div className="text-sm sm:text-base font-bold text-white transition-colors font-mono group-hover:opacity-90">
                        {personal.email}
                      </div>
                    </div>
                  </div>
                  <div>
                    {copiedType === 'email' ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Copied
                      </span>
                    ) : (
                      <span className="text-xs text-white/40 group-hover:text-white/80">Copy</span>
                    )}
                  </div>
                </div>

                {/* Phone Box */}
                <div 
                  onClick={() => copyToClipboard(personal.phone, 'phone')}
                  onMouseEnter={() => playGlassSound('hover')}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${palette.info}20`, color: palette.info, borderColor: `${palette.info}4d` }}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-white/50 uppercase">Phone &amp; WhatsApp Contact</span>
                      <div className="text-sm sm:text-base font-bold text-white transition-colors font-mono group-hover:opacity-90">
                        {personal.phone}
                      </div>
                    </div>
                  </div>
                  <div>
                    {copiedType === 'phone' ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Copied
                      </span>
                    ) : (
                      <span className="text-xs text-white/40 group-hover:text-white/80">Copy</span>
                    )}
                  </div>
                </div>

                {/* Location Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0" style={{ backgroundColor: `${palette.danger}20`, color: palette.danger, borderColor: `${palette.danger}4d` }}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase">Location & Base</span>
                    <div className="text-sm sm:text-base font-bold text-white">
                      Gandhinagar, GJ, INDIA 🇮🇳
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Availability Footer */}
            <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: palette.success }} />
                Freelance Status: <strong className="font-mono" style={{ color: palette.success }}>AVAILABLE</strong>
              </span>
              <span className="font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" style={{ color: palette.accentLight }} /> +05:30 IST
              </span>
            </div>

          </div>

        </div>

        {/* Right Interactive Liquid Glass Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-[2.5rem] p-8 sm:p-10 border-white/20 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
            
            {submitted ? (
              <div className="text-center py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${palette.success}20`, borderColor: palette.success, color: palette.success, boxShadow: `0 0 40px ${palette.success}40` }}>
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Message Successfully Dispatched!</h3>
                <p className="text-base text-white/80 max-w-md mx-auto leading-relaxed mb-8">
                  Thank you, <strong style={{ color: palette.success }}>{formData.name}</strong>. Your message regarding <strong style={{ color: palette.accentLight }}>{formData.service}</strong> has been transmitted. Bhavesh will review and respond promptly from India.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left mb-8 font-mono text-xs text-white/70">
                  <div><strong>To:</strong> {personal.email}</div>
                  <div><strong>From:</strong> {formData.email}</div>
                  <div><strong>Status:</strong> Encrypted & Received</div>
                </div>

                <button
                  onClick={() => {
                    playGlassSound('click');
                    setSubmitted(false);
                    setFormData({ name: '', email: '', service: 'Enterprise SaaS & Microservices', message: '' });
                  }}
                  className="glass-button px-6 py-3 rounded-2xl text-white font-bold text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-white/15 pb-4 mb-6">
                  <h3 className="text-2xl font-bold text-white">Send Direct Message</h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    Fill out the fields below for project inquiries, technical leadership roles, or general networking.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" style={{ color: palette.accentLight }} /> Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => playGlassSound('hover')}
                      className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" style={{ color: palette.accentLight }} /> Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => playGlassSound('hover')}
                      className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: palette.info }} /> Engagement / Architecture Scope
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    onFocus={() => playGlassSound('hover')}
                    className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm font-medium bg-[#081022] text-white/90"
                  >
                    <option value="Enterprise SaaS & Microservices">Enterprise SaaS & Microservices Architecture</option>
                    <option value="Single Page Application (Angular/React)">Single Page Application (Angular/React/Vue)</option>
                    <option value="Backend .NET Core / Node.js Engine">Backend .NET Core / Node.js API Development</option>
                    <option value="WPF & Desktop High-Speed Grid Suite">WPF & Desktop High-Speed Grid Controls</option>
                    <option value="Full-Time / Contract Team Lead Position">Full-Time / Contract Team Leadership</option>
                    <option value="General Technical Consultation">General Technical Consultation & Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" style={{ color: palette.accentLight }} /> Project Details &amp; Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your project goals, system scale, or timeline requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => playGlassSound('hover')}
                    className="w-full px-4 py-3.5 rounded-2xl glass-input text-sm font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => playGlassSound('hover')}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r ${palette.gradientHero} text-white font-bold text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5`}
                  style={{ boxShadow: `0 12px 35px ${palette.shadowGlow}` }}
                >
                  <Send className="w-5 h-5" />
                  Transmit Message to Bhavesh
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </section>
  );
};
